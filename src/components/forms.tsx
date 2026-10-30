"use client";

import { useState } from "react";
import { sectorCatalog } from "@/lib/sectors";

type FormState = { status: "idle" | "loading" | "ok" | "error"; message: string; reference?: string };

function useSubmit(url: string) {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setState({ status: "loading", message: "" });
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await response.json()) as { error?: string; reference?: string };
      if (!response.ok) {
        setState({ status: "error", message: json.error || "Envoi impossible." });
        return;
      }
      form.reset();
      setState({ status: "ok", message: "Enregistré.", reference: json.reference });
    } catch {
      setState({ status: "error", message: "Le réseau n'a pas répondu. Réessayez." });
    }
  }

  return { state, onSubmit };
}

export function AdhesionForm({ regions, initialSector = "" }: { regions: string[]; initialSector?: string }) {
  const { state, onSubmit } = useSubmit("/api/adhesions");
  return (
    <form className="form-card" onSubmit={onSubmit}>
      <p className="kicker dark">Guichet d&apos;adhésion</p>
      <h2 style={{ fontFamily: "var(--display)", fontWeight: 560, marginTop: 4 }}>Demander le badge</h2>
      <div className="form-grid" style={{ marginTop: 12 }}>
        <div className="field">
          <label htmlFor="fullName">Nom et prénoms</label>
          <input id="fullName" name="fullName" required minLength={3} placeholder="Awa Koné" />
        </div>
        <div className="field">
          <label htmlFor="phone">Téléphone</label>
          <input id="phone" name="phone" required minLength={8} placeholder="+225 07 …" />
        </div>
        <div className="field">
          <label htmlFor="email">Courriel</label>
          <input id="email" name="email" type="email" placeholder="optionnel" />
        </div>
        <div className="field">
          <label htmlFor="shopName">Étal ou enseigne</label>
          <input id="shopName" name="shopName" placeholder="Nom commercial" />
        </div>
        <div className="field">
          <label htmlFor="region">Région</label>
          <select id="region" name="region" required defaultValue="">
            <option value="" disabled>
              Choisir
            </option>
            {regions.map((region) => (
              <option key={region}>{region}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="city">Ville</label>
          <input id="city" name="city" required placeholder="Bouaké, Adjamé…" />
        </div>
        <div className="field full">
          <label htmlFor="sector">Filière principale</label>
          <select id="sector" name="sector" required defaultValue={initialSector}>
            <option value="" disabled>
              Choisir une filière
            </option>
            {[...new Set(sectorCatalog.map((item) => item.family))].map((family) => (
              <optgroup key={family} label={family}>
                {sectorCatalog
                  .filter((item) => item.family === family)
                  .map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.value}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="field full">
          <label htmlFor="message">Précisions</label>
          <textarea id="message" name="message" placeholder="Marché de rattachement, ancienneté, besoin particulier" />
        </div>
      </div>
      {state.status === "error" ? <p className="error">{state.message}</p> : null}
      {state.status === "ok" ? (
        <div className="success">
          Demande enregistrée sous la référence <b>{state.reference}</b>. Le secrétariat général instruit le dossier avant édition du badge.
        </div>
      ) : (
        <button className="btn btn-primary" style={{ marginTop: 12 }} disabled={state.status === "loading"}>
          {state.status === "loading" ? "Envoi…" : "Déposer la demande"}
        </button>
      )}
    </form>
  );
}

export function ContactForm() {
  const { state, onSubmit } = useSubmit("/api/contact");
  return (
    <form className="form-card" onSubmit={onSubmit}>
      <p className="kicker dark">Secrétariat</p>
      <h2 style={{ fontFamily: "var(--display)", fontWeight: 560, marginTop: 4 }}>Nous contacter</h2>
      <p className="muted req-note">
        Les champs marqués d&apos;un <span className="req">*</span> sont obligatoires.
      </p>
      <div className="form-grid contact-stack" style={{ marginTop: 10 }}>
        <div className="field full">
          <label htmlFor="cname">
            Nom et prénoms <span className="req">*</span>
          </label>
          <input id="cname" name="fullName" required minLength={3} placeholder="Ex. KONÉ Awa" />
        </div>
        <div className="field full">
          <label htmlFor="cemail">
            Courriel <span className="req">*</span>
          </label>
          <input id="cemail" name="email" type="email" required placeholder="votre.adresse@exemple.ci" />
        </div>
        <div className="field full">
          <label htmlFor="subject">
            Objet <span className="req">*</span>
          </label>
          <input id="subject" name="subject" required minLength={3} placeholder="Badge, prix, assemblée, partenariat…" />
        </div>
        <div className="field full">
          <label htmlFor="cmessage">
            Votre message <span className="req">*</span>
          </label>
          <textarea
            id="cmessage"
            name="message"
            required
            minLength={12}
            placeholder="Décrivez votre demande : situation, marché concerné, numéro de badge éventuel, et ce que vous attendez du secrétariat."
          />
          <small className="muted">Minimum 12 caractères. Le secrétariat répond depuis Bouaké ou l&apos;antenne d&apos;Adjamé.</small>
        </div>
      </div>
      {state.status === "error" ? <p className="error">{state.message}</p> : null}
      {state.status === "ok" ? (
        <div className="success">Message reçu. Le secrétariat y répond depuis Bouaké ou l&apos;antenne d&apos;Adjamé.</div>
      ) : (
        <button className="btn btn-dark" style={{ marginTop: 12 }} disabled={state.status === "loading"}>
          {state.status === "loading" ? "Envoi…" : "Envoyer"}
        </button>
      )}
    </form>
  );
}

export function PriceReportForm({ markets, products }: { markets: string[]; products: string[] }) {
  const { state, onSubmit } = useSubmit("/api/signalements");
  return (
    <form className="form-card" onSubmit={onSubmit}>
      <p className="kicker dark">Signalement</p>
      <h2 style={{ fontFamily: "var(--display)", fontWeight: 560, marginTop: 4 }}>Remonter un cours</h2>
      <p className="muted">Un signalement n&apos;entre pas seul dans le relevé officiel. La cellule prix le confronte aux étals de référence.</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="reporterName">Votre nom</label>
          <input id="reporterName" name="reporterName" required minLength={3} />
        </div>
        <div className="field">
          <label htmlFor="rphone">Téléphone</label>
          <input id="rphone" name="phone" placeholder="optionnel" />
        </div>
        <div className="field">
          <label htmlFor="marketName">Marché</label>
          <input id="marketName" name="marketName" list="market-list" required placeholder="Marché d'Adjamé" />
          <datalist id="market-list">
            {markets.map((market) => (
              <option key={market} value={market} />
            ))}
          </datalist>
        </div>
        <div className="field">
          <label htmlFor="productName">Produit</label>
          <input id="productName" name="productName" list="product-list" required />
          <datalist id="product-list">
            {products.map((product) => (
              <option key={product} value={product} />
            ))}
          </datalist>
        </div>
        <div className="field">
          <label htmlFor="price">Prix observé (FCFA)</label>
          <input id="price" name="price" type="number" min={1} required />
        </div>
        <div className="field">
          <label htmlFor="unit">Unité</label>
          <select id="unit" name="unit" defaultValue="kg">
            <option value="kg">kg</option>
            <option value="litre">litre</option>
            <option value="boîte 400 g">boîte 400 g</option>
            <option value="sac 25 kg">sac 25 kg</option>
            <option value="sac 50 kg">sac 50 kg</option>
            <option value="tas">tas</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="note">Observation</label>
          <textarea id="note" name="note" placeholder="Gros ou détail, qualité, rupture…" />
        </div>
      </div>
      {state.status === "error" ? <p className="error">{state.message}</p> : null}
      {state.status === "ok" ? (
        <div className="success">
          Signalement <b>{state.reference}</b> transmis à l&apos;observatoire.
        </div>
      ) : (
        <button className="btn btn-primary" style={{ marginTop: 12 }} disabled={state.status === "loading"}>
          {state.status === "loading" ? "Envoi…" : "Transmettre"}
        </button>
      )}
    </form>
  );
}
