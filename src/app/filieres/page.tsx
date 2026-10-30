import type { Metadata } from "next";
import Link from "next/link";
import { sectorCatalog } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "Filières représentées",
  description: "Filières de commerce, de distribution et de services ouvertes à l'adhésion à la COCOMCI.",
};

export default function SectorsPage() {
  const families = [...new Set(sectorCatalog.map((sector) => sector.family))];
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · Organisation
      </p>
      <p className="kicker dark">Une coordination ouverte à tous les opérateurs</p>
      <h1>Les filières de la COCOMCI.</h1>
      <p className="lede" style={{ color: "var(--muted)", maxWidth: 760 }}>
        Des marchés de vivriers aux commerces d&apos;équipement, du textile aux prestations de services : les opérateurs peuvent choisir leur filière lors de la demande d&apos;adhésion. Le rattachement au registre et la validation du badge restent instruits par le secrétariat général.
      </p>
      {families.map((family) => (
        <section key={family} style={{ marginTop: 28 }}>
          <div className="section-head">
            <div>
              <p className="kicker dark">Filières professionnelles</p>
              <h2>{family}</h2>
            </div>
          </div>
          <div className="sector-grid">
            {sectorCatalog
              .filter((sector) => sector.family === family)
              .map((sector) => (
                <article key={sector.value} className="sector-card">
                  <span className="sector-mark" aria-hidden="true">✳</span>
                  <h3>{sector.value}</h3>
                  <p>{sector.description}</p>
                  <Link className="more" href={`/adherer?filiere=${encodeURIComponent(sector.value)}`}>
                    Choisir cette filière →
                  </Link>
                </article>
              ))}
          </div>
        </section>
      ))}
      <div className="cta-band" style={{ marginTop: 30 }}>
        <div>
          <p className="kicker">Badge officiel · adhésion</p>
          <h2>Votre filière n&apos;est pas un détail.</h2>
          <p>Elle rattache votre activité à la coordination régionale et rend votre profil consultable dans l&apos;annuaire.</p>
        </div>
        <Link className="btn btn-primary" href="/adherer">
          Déposer une demande
        </Link>
      </div>
    </div>
  );
}
