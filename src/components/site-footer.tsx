import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer no-print">
      <div className="kente" />
      <div className="wrap footer-grid">
        <div>
          <img
            src="/api/logo"
            alt=""
            width={56}
            height={56}
            style={{
              borderRadius: "50%",
              marginBottom: 10,
              background: "white",
              padding: 4,
              objectFit: "contain",
              border: "1px solid rgba(237,217,168,.45)",
            }}
          />
          <strong style={{ color: "white", fontFamily: "var(--display)", fontSize: "1.4rem" }}>COCOMCI</strong>
          <p>
            Coordination des Opérateurs de Commerce de Côte d&apos;Ivoire. Née à Bouaké le 7 septembre 2019,
            elle organise les commerçants, délivre le badge officiel et publie les cours des marchés locaux.
          </p>
        </div>
        <div>
          <h3>La coordination</h3>
          <Link href="/president">Mot du Président</Link>
          <Link href="/organisation">Bureau national</Link>
          <Link href="/filieres">Filières professionnelles</Link>
          <Link href="/bureaux">Coordinateurs et SG</Link>
          <Link href="/regions">Régions et villes</Link>
          <Link href="/activites">Activités</Link>
          <Link href="/adherer">Demande d&apos;adhésion</Link>
        </div>
        <div>
          <h3>Observatoire</h3>
          <Link href="/marches">Cours des marchés</Link>
          <Link href="/devises">Cours des devises</Link>
          <Link href="/actualites">Actualités</Link>
          <Link href="/verifier">Vérifier un badge</Link>
          <Link href="/contact">Écrire au secrétariat</Link>
        </div>
        <div>
          <h3>Siège</h3>
          <p>
            Boulevard de la Paix, quartier Commerce
            <br />
            Bouaké, région du Gbêkê
            <br />
            Antenne : Marché d&apos;Adjamé, Abidjan
          </p>
          <p>
            +225 27 31 63 40 12
            <br />
            contact@cocomci.ci
          </p>
        </div>
      </div>
      <div className="wrap legal">
        <span>Plateforme institutionnelle · exercice {new Date().getFullYear()} · secrétariat général</span>
        <Link href="/secretariat">Espace secrétariat</Link>
      </div>
    </footer>
  );
}
