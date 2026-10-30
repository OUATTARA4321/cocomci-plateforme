import type { Metadata } from "next";
import Link from "next/link";
import { AdhesionForm } from "@/components/forms";
import { isKnownSector } from "@/lib/sectors";
import { getRegions } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Adhérer",
  description: "Demande d'adhésion à la COCOMCI et d'édition du badge officiel.",
};

export default async function JoinPage() {
  const regions = (await getRegions()).map((region) => region.name).sort((a, b) => a.localeCompare(b, "fr"));
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · Guichet
      </p>
      <p className="kicker dark">Carte de commerçant · badge COCOMCI</p>
      <h1>Rejoindre les opérateurs organisés.</h1>
      <div className="split" style={{ marginTop: 8 }}>
        <div>
          <div className="mission-grid" style={{ gridTemplateColumns: "1fr", marginBottom: 12 }}>
            <article className="card">
              <h3>Ce que l&apos;adhésion ouvre</h3>
              <p>Un numéro dans l&apos;annuaire, le droit de remonter un cours, l&apos;accès aux formations de releveurs, et une voix dans la coordination de votre région.</p>
            </article>
            <article className="card">
              <h3>Ce qu&apos;elle n&apos;ouvre pas</h3>
              <p>Ni une boutique dans un marché neuf, ni une exemption de prix plafond, ni un titre immédiat. Le secrétariat instruit, puis prépare le badge.</p>
            </article>
          </div>
          <AdhesionForm regions={regions} />
        </div>
        <aside className="panel">
          <p className="kicker dark">Pièces utiles</p>
          <ol>
            <li>Identité et téléphone joignable.</li>
            <li>Ville, région et marché de rattachement.</li>
            <li>Choisir une filière réelle : vivriers, quincaillerie, textile, électroménager, électronique, pièces détachées, services, cosmétiques et autres métiers du commerce.</li>
            <li>La carte de commerçant, si vous l&apos;avez déjà. Sinon, le guichet de Drissa Coulibaly vous oriente.</li>
          </ol>
          <p className="muted">Siège : Boulevard de la Paix, Bouaké. Antenne : marché d&apos;Adjamé. +225 27 31 63 40 12.</p>
          <Link href="/verifier">Déjà titulaire ? Vérifier un badge.</Link>
        </aside>
      </div>
    </div>
  );
}
