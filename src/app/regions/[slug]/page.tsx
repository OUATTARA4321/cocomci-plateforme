import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OfficialBadge } from "@/components/official-badge";
import { OfficePair } from "@/components/office-pair";
import { isCoordinatorRole, isGeneralSecretaryRole, isTerritorialOffice } from "@/lib/format";
import { getRegion } from "@/lib/queries";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getRegion(slug);
  if (!data) return { title: "Région introuvable" };
  return { title: data.region.name, description: data.region.description };
}

export default async function RegionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = await getRegion(slug);
  if (!data) notFound();
  const { region, cities, members } = data;
  const regionalOffice = members.filter(
    (member) => member.bureauLevel === "regional" && (isCoordinatorRole(member.role) || isGeneralSecretaryRole(member.role)),
  );
  const others = members.filter((member) => !isTerritorialOffice(member));
  const localCities = [...cities].sort((a, b) => Number(b.isChefLieu) - Number(a.isChefLieu) || a.name.localeCompare(b.name, "fr"));

  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/regions">Territoire</Link> · {region.district}
      </p>
      <p className="kicker dark">
        {region.code} · {region.kind === "district" ? "District autonome" : "Région"}
      </p>
      <h1>{region.name}</h1>
      <p className="lede" style={{ color: "var(--muted)", maxWidth: 680 }}>
        {region.description}
      </p>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <div>
            <p className="kicker dark">Comme le Bureau national</p>
            <h2>Coordinateur et secrétaire général</h2>
          </div>
          <Link className="btn btn-line btn-small" href="/bureaux">
            Tous les bureaux
          </Link>
        </div>
        <OfficePair members={regionalOffice} />
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="kicker dark">Villes et communes</p>
            <h2>Bureaux locaux à badges validés</h2>
          </div>
        </div>
        <div className="local-offices">
          {localCities.map((city) => {
            const local = members.filter(
              (member) => member.citySlug === city.slug && member.bureauLevel === "communal" && (isCoordinatorRole(member.role) || isGeneralSecretaryRole(member.role)),
            );
            return (
              <section key={city.slug} className="office-region">
                <h3 style={{ fontSize: "1.35rem" }}>
                  {city.name}
                  <span className="muted" style={{ fontFamily: "var(--sans)", fontSize: "0.85rem", marginLeft: 8 }}>
                    {city.isChefLieu ? "chef-lieu" : region.slug === "abidjan" ? "commune" : "ville"}
                  </span>
                </h3>
                <OfficePair members={local} size="sm" />
              </section>
            );
          })}
        </div>
      </section>

      {others.length > 0 ? (
        <section>
          <h2>Autres opérateurs de {region.name}</h2>
          <div className="badge-grid">
            {others.map((member) => (
              <Link key={member.badgeNumber} href={`/membres/${member.badgeNumber}`}>
                <OfficialBadge member={member} />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
