import type { Metadata } from "next";
import Link from "next/link";
import { getRegions } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Régions et villes",
  description: "Maillage territorial de la COCOMCI sur les districts et régions de Côte d'Ivoire.",
};

export default async function RegionsPage() {
  const regions = await getRegions();
  const districts = [...new Set(regions.map((region) => region.district))];
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · Territoire
      </p>
      <p className="kicker dark">Deux districts autonomes · trente et une régions</p>
      <h1>Le commerce a une adresse dans chaque chef-lieu.</h1>
      <p className="lede" style={{ color: "var(--muted)", maxWidth: 680 }}>
        Chaque territoire a un coordinateur et un secrétaire général, badge validé, ainsi que le binôme de chaque ville ou commune.{" "}
        <Link href="/bureaux">Voir les bureaux.</Link>
      </p>
      {districts.map((district) => (
        <section key={district} style={{ marginTop: 22 }}>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 560 }}>{district}</h2>
          <div className="region-grid">
            {regions
              .filter((region) => region.district === district)
              .map((region) => (
                <Link key={region.slug} href={`/regions/${region.slug}`} className="region-card">
                  <small>
                    {region.code} · {region.kind === "district" ? "District" : "Région"}
                  </small>
                  <b>{region.name}</b>
                  <span className="muted">Chef-lieu {region.chefLieu}</span>
                  <span className="count-dot">
                    {region.memberCount > 0 ? `${region.memberCount} badge${region.memberCount > 1 ? "s" : ""}` : "Relais à installer"}
                  </span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
