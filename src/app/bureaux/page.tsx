import type { Metadata } from "next";
import Link from "next/link";
import { BureauxBoard } from "@/components/bureaux-board";
import { isCoordinatorRole, isGeneralSecretaryRole, isTerritorialOffice } from "@/lib/format";
import { getCities, getMembers, getRegions } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Coordinateurs et secrétaires généraux",
  description: "Bureaux régionaux, de district, de ville et de commune de la COCOMCI, avec badges validés.",
};

export default async function BureauxPage() {
  const [people, regions, cities] = await Promise.all([getMembers(), getRegions(), getCities()]);
  const offices = people.filter((member) => isTerritorialOffice(member) && member.status === "actif");
  const regionalCoords = offices.filter((member) => member.bureauLevel === "regional" && isCoordinatorRole(member.role)).length;
  const regionalSg = offices.filter((member) => member.bureauLevel === "regional" && isGeneralSecretaryRole(member.role)).length;
  const localCoords = offices.filter((member) => member.bureauLevel === "communal" && isCoordinatorRole(member.role)).length;
  const localSg = offices.filter((member) => member.bureauLevel === "communal" && isGeneralSecretaryRole(member.role)).length;

  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · <Link href="/organisation">Organisation</Link> · Territoire
      </p>
      <p className="kicker dark">Même règle que le Bureau national exécutif</p>
      <h1>Coordinateurs et secrétaires généraux.</h1>
      <p className="lede" style={{ color: "var(--muted)", maxWidth: 740 }}>
        Chaque région, chaque district, chaque ville et chaque commune a son binôme : un coordinateur et un secrétaire général. Leurs badges sont validés par le secrétariat général. Un titre suspendu ne peut pas représenter la place.
      </p>
      <div className="currency-strip" style={{ margin: "1rem 0 1.4rem" }}>
        <div className="rate-pill">
          <span>Coordinateurs régionaux et de district</span>
          <strong>{regionalCoords}</strong>
        </div>
        <div className="rate-pill">
          <span>Secrétaires généraux régionaux</span>
          <strong>{regionalSg}</strong>
        </div>
        <div className="rate-pill">
          <span>Coordinateurs de ville ou de commune</span>
          <strong>{localCoords}</strong>
        </div>
        <div className="rate-pill">
          <span>Secrétaires généraux locaux</span>
          <strong>{localSg}</strong>
        </div>
      </div>
      <BureauxBoard
        members={people}
        regions={regions.map((region) => ({
          slug: region.slug,
          name: region.name,
          code: region.code,
          district: region.district,
          kind: region.kind,
          chefLieu: region.chefLieu,
        }))}
        cities={cities}
      />
    </div>
  );
}
