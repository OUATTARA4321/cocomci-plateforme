import type { Metadata } from "next";
import Link from "next/link";
import { MembersExplorer } from "@/components/members-explorer";
import { getMembers } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Membres et badges",
  description: "Annuaire officiel des opérateurs COCOMCI, badges par région, ville et marché.",
};

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; q?: string; fonction?: string }>;
}) {
  const params = await searchParams;
  const members = await getMembers();
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · Annuaire
      </p>
      <p className="kicker dark">Badge officiel</p>
      <h1>Les membres, par région et par ville.</h1>
      <p className="lede" style={{ color: "var(--muted)", maxWidth: 680 }}>
        Chaque carte est un titre de la coordination. Les coordinateurs et secrétaires généraux des régions, villes et communes portent un badge validé. Le numéro se lit ainsi : COC, code de région, année, ordre. Un badge suspendu reste consultable, il n&apos;est plus valable.
      </p>
      <div className="note photo-notice">
        Les portraits de démonstration sont illustratifs. Le secrétariat les remplace par la photo du titulaire avec son accord.
      </div>
      <MembersExplorer members={members} initialRegion={params.region ?? ""} initialQuery={params.q ?? ""} initialOffice={params.fonction ?? ""} />
    </div>
  );
}
