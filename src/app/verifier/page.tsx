import type { Metadata } from "next";
import Link from "next/link";
import { OfficialBadge } from "@/components/official-badge";
import { getMemberByBadge } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Vérifier un badge",
  description: "Contrôle public d'un badge officiel COCOMCI.",
};

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ badge?: string }> }) {
  const { badge } = await searchParams;
  const query = badge?.trim() ?? "";
  const member = query ? await getMemberByBadge(query) : null;

  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · Contrôle
      </p>
      <p className="kicker dark">Registre public</p>
      <h1>Vérifier un badge officiel.</h1>
      <p className="lede" style={{ color: "var(--muted)", maxWidth: 640 }}>
        Saisissez le numéro tel qu&apos;il est gravé, par exemple COC-GBK-2019-0001. La réponse dit si le titre est actif, suspendu, ou inconnu du secrétariat.
      </p>
      <form className="filters" action="/verifier">
        <input name="badge" defaultValue={query} placeholder="COC-ABJ-2019-0002" aria-label="Numéro de badge" required />
        <button className="btn btn-dark" type="submit">
          Contrôler
        </button>
      </form>
      {query && member ? (
        <div className="split">
          <OfficialBadge member={member} />
          <div className="panel">
            <h2 style={{ marginTop: 0 }}>
              {member.firstName} {member.lastName}
            </h2>
            <p>
              {member.role}
              <br />
              {member.cityName}, {member.regionName}
              <br />
              {member.marketName}
            </p>
            <div className={member.status === "actif" ? "success" : "error"}>
              {member.status === "actif"
                ? "Titre actif. Il peut être présenté aux autorités de marché et aux partenaires."
                : "Titre suspendu. Ne pas le reconnaître comme valable."}
            </div>
            <Link className="btn btn-line btn-small" href={`/membres/${member.badgeNumber}`} style={{ marginTop: 12 }}>
              Ouvrir la fiche
            </Link>
          </div>
        </div>
      ) : null}
      {query && !member ? (
        <div className="error">Aucun badge {query.toUpperCase()} dans le registre. Vérifiez les tirets et le code de région, ou écrivez au secrétariat.</div>
      ) : null}
    </div>
  );
}
