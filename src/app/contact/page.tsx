import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms";
import { Partners } from "@/components/partners";

export const metadata: Metadata = {
  title: "Contact",
  description: "Écrire au secrétariat général de la COCOMCI.",
};

export default function ContactPage() {
  return (
    <>
      <div className="wrap page-hero" style={{ paddingBottom: "1.5rem" }}>
        <p className="crumbs">
          <Link href="/">Accueil</Link> · Secrétariat
        </p>
        <p className="kicker dark">Bouaké et Adjamé</p>
        <h1>Nous contacter.</h1>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="panel">
              <h2 style={{ marginTop: 0 }}>Siège national</h2>
              <p>
                Boulevard de la Paix, quartier Commerce
                <br />
                Bouaké, région du Gbêkê
              </p>
              <p>
                <b>+225 27 31 63 40 12</b>
                <br />
                contact@cocomci.ci
              </p>
            </div>
            <div className="panel">
              <h2 style={{ marginTop: 0 }}>Antenne d&apos;Abidjan</h2>
              <p>
                Immeuble des opérateurs
                <br />
                Marché d&apos;Adjamé
              </p>
              <p>
                sg@cocomci.ci
                <br />
                Permanences du mardi au samedi
              </p>
            </div>
            <div className="panel">
              <h2 style={{ marginTop: 0 }}>Avant d&apos;écrire</h2>
              <p className="muted">
                Pour un cours aberrant, préférez le signalement de la page Marchés : il entre directement dans le registre de
                l&apos;observatoire. Pour une adhésion, utilisez le guichet dédié.
              </p>
              <div className="chip-row">
                <Link className="chip" href="/marches">
                  Signaler un prix
                </Link>
                <Link className="chip" href="/adherer">
                  Demander un badge
                </Link>
                <Link className="chip" href="/verifier">
                  Vérifier un badge
                </Link>
              </div>
            </div>
          </div>
          <div className="contact-form-col">
            <ContactForm />
          </div>
        </div>
      </div>
      <Partners title="Nos partenaires aux côtés des opérateurs" />
    </>
  );
}
