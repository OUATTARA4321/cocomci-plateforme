"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { OfficePair } from "@/components/office-pair";
import { isCoordinatorRole, isGeneralSecretaryRole } from "@/lib/format";
import type { MemberCard } from "@/lib/types";

type RegionInfo = {
  slug: string;
  name: string;
  code: string;
  district: string;
  kind: string;
  chefLieu: string;
};

type CityInfo = {
  slug: string;
  name: string;
  regionSlug: string;
  isChefLieu: boolean;
};

export function BureauxBoard({
  members,
  regions,
  cities,
}: {
  members: MemberCard[];
  regions: RegionInfo[];
  cities: CityInfo[];
}) {
  const [district, setDistrict] = useState("");
  const [query, setQuery] = useState("");
  const [showLocal, setShowLocal] = useState(true);

  const districts = useMemo(
    () => [...new Set(regions.map((region) => region.district))],
    [regions],
  );

  const visible = regions.filter((region) => {
    if (district && region.district !== district) return false;
    if (!query.trim()) return true;
    const needle = query.toLowerCase().trim();
    const localNames = cities.filter((city) => city.regionSlug === region.slug).map((city) => city.name.toLowerCase());
    const people = members
      .filter((member) => member.regionSlug === region.slug)
      .map((member) => `${member.firstName} ${member.lastName} ${member.role} ${member.badgeNumber}`.toLowerCase());
    return (
      region.name.toLowerCase().includes(needle) ||
      region.chefLieu.toLowerCase().includes(needle) ||
      localNames.some((name) => name.includes(needle)) ||
      people.some((name) => name.includes(needle))
    );
  });

  return (
    <div>
      <div className="filters">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Région, ville, nom, badge…" aria-label="Rechercher un bureau" />
        <select value={district} aria-label="District" onChange={(event) => setDistrict(event.target.value)}>
          <option value="">Tous les districts</option>
          {districts.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <button className={`chip ${showLocal ? "active" : ""}`} aria-pressed={showLocal} type="button" onClick={() => setShowLocal((value) => !value)}>
          Villes et communes
        </button>
      </div>
      <p className="muted">
        {visible.length} territoire{visible.length > 1 ? "s" : ""}. Chaque bureau affiche son coordinateur et son secrétaire général, badge validé par le secrétariat général.
      </p>
      {visible.map((region) => {
        const regional = members.filter(
          (member) =>
            member.regionSlug === region.slug &&
            member.bureauLevel === "regional" &&
            (isCoordinatorRole(member.role) || isGeneralSecretaryRole(member.role)),
        );
        const localCities = cities
          .filter((city) => city.regionSlug === region.slug)
          .sort((a, b) => Number(b.isChefLieu) - Number(a.isChefLieu) || a.name.localeCompare(b.name, "fr"));
        return (
          <article key={region.slug} className="office-region">
            <div className="section-head">
              <div>
                <p className="kicker dark">
                  {region.code} · {region.district}
                </p>
                <h3>
                  {region.kind === "district" ? "District" : "Région"} {region.name}
                </h3>
                <p className="muted">Chef-lieu {region.chefLieu} · même discipline que le Bureau national exécutif</p>
              </div>
              <Link className="btn btn-line btn-small" href={`/regions/${region.slug}`}>
                Fiche territoire
              </Link>
            </div>
            <OfficePair members={regional} />
            {showLocal ? (
              <div className="local-offices">
                {localCities.map((city) => {
                  const local = members.filter(
                    (member) =>
                      member.citySlug === city.slug &&
                      member.bureauLevel === "communal" &&
                      (isCoordinatorRole(member.role) || isGeneralSecretaryRole(member.role)),
                  );
                  return (
                    <section key={city.slug} className="commune-office">
                      <h4>
                        {city.name}
                        <span>{city.isChefLieu ? " · chef-lieu" : region.slug === "abidjan" ? " · commune" : " · ville"}</span>
                      </h4>
                      <OfficePair members={local} size="sm" />
                    </section>
                  );
                })}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
