import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "4rem" }}>
      <p className="kicker dark">Registre</p>
      <h1>Cette page n&apos;est pas dans l&apos;annuaire.</h1>
      <p>Le lien est périmé, ou le badge demandé n&apos;a pas été délivré.</p>
      <div className="hero-actions">
        <Link className="btn btn-primary" href="/">
          Retour au portail
        </Link>
        <Link className="btn btn-line" href="/verifier">
          Vérifier un badge
        </Link>
      </div>
    </div>
  );
}
