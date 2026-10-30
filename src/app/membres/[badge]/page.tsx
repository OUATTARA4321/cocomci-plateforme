import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactLinks } from "@/components/contact-links";
import { OfficialBadge } from "@/components/official-badge";
import { PrintButton } from "@/components/print-button";
import { levelLabels } from "@/lib/format";
import { getMemberByBadge, getMembers } from "@/lib/queries";

type Params = { badge: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { badge } = await params;
  const member = await getMemberByBadge(decodeURIComponent(badge));
  if (!member) return { title: "Badge introuvable" };
  return {
    title: `${member.firstName} ${member.lastName}`,
    description: `${member.role} · ${member.cityName} · ${member.badgeNumber}`,
  };
}

export default async function MemberPage({ params }: { params: Promise<Params> }) {
  const { badge } = await params;
  const member = await getMemberByBadge(decodeURIComponent(badge));
  if (!member) notFound();
  const peers = (await getMembers())
    .filter((item) => item.regionSlug === member.regionSlug && item.badgeNumber !== member.badgeNumber)
    .slice(0, 3);
  const active = member.status === "actif";

  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/membres">Annuaire</Link> · {member.regionName} · {member.cityName}
      </p>
      <div className="split">
        <div className="print-badge">
          <OfficialBadge member={member} />
          {member.portrait?.startsWith("/images/members/portraits/") || member.portrait === "/images/president.jpg" ? (
            <p className="note photo-notice">Portrait d’illustration de démonstration. Le secrétariat peut le remplacer par la photo du membre avec son accord.</p>
          ) : null}
          <p className="muted no-print" style={{ marginTop: 8 }}>
            Titre délivré par le secrétariat général. <PrintButton />
          </p>
        </div>
        <div>
          <p className="kicker dark">{levelLabels[member.bureauLevel]}</p>
          <h1>
            <span className="surname">{member.lastName}</span> {member.firstName}
          </h1>
          <p className="lede" style={{ color: "var(--ink)" }}>
            {member.role} · {member.sector}
          </p>
          <div className={`note ${active ? "" : "error"}`}>
            {active
              ? `Badge valide pour l'exercice ${new Date().getFullYear()}. Numéro ${member.badgeNumber}.`
              : "Badge suspendu. Il ne doit pas être présenté comme un titre actif tant que le secrétariat n'a pas levé la mesure."}
          </div>
          <p>{member.bio}</p>
          <div className="card-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 12 }}>
            <div className="panel">
              <div className="muted">Rattachement</div>
              <b>{member.marketName ?? "Marché non précisé"}</b>
              <div>
                {member.cityName}, {member.regionName}
              </div>
              <div className="muted">{member.district}</div>
            </div>
            <div className="panel">
              <div className="muted">Contact professionnel</div>
              <div>{member.shopName ?? "Enseigne non déclarée"}</div>
              <ContactLinks member={member} />
            </div>
          </div>
          <div className="hero-actions no-print">
            <Link className="btn btn-primary" href={`/regions/${member.regionSlug}`}>
              Coordination de {member.regionName}
            </Link>
            <Link className="btn btn-line" href={`/verifier?badge=${member.badgeNumber}`}>
              Fiche de vérification
            </Link>
          </div>
        </div>
      </div>
      {peers.length > 0 ? (
        <section className="section">
          <h2>Autres badges · {member.regionName}</h2>
          <div className="badge-grid">
            {peers.map((peer) => (
              <Link key={peer.badgeNumber} href={`/membres/${peer.badgeNumber}`}>
                <OfficialBadge member={peer} />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
