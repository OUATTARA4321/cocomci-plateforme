"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { OfficialBadge } from "@/components/official-badge";
import { isCoordinatorRole, isGeneralSecretaryRole, levelLabels } from "@/lib/format";
import { sectorOptions } from "@/lib/sectors";
import type { MemberCard } from "@/lib/types";

export function MembersExplorer({
  members,
  initialRegion = "",
  initialQuery = "",
  initialOffice = "",
}: {
  members: MemberCard[];
  initialRegion?: string;
  initialQuery?: string;
  initialOffice?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState(initialRegion);
  const [city, setCity] = useState("");
  const [level, setLevel] = useState("");
  const [sector, setSector] = useState("");
  const [office, setOffice] = useState(initialOffice);
  const [onlyActive, setOnlyActive] = useState(initialOffice !== "");

  const regions = useMemo(() => {
    const map = new Map<string, string>();
    members.forEach((member) => map.set(member.regionSlug, member.regionName));
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1], "fr"));
  }, [members]);

  const cities = useMemo(() => {
    const pool = region ? members.filter((member) => member.regionSlug === region) : members;
    return [...new Set(pool.map((member) => member.cityName))].sort((a, b) => a.localeCompare(b, "fr"));
  }, [members, region]);

  const sectors = useMemo(
    () => [...new Set([...sectorOptions, ...members.map((member) => member.sector)])].sort((a, b) => a.localeCompare(b, "fr")),
    [members],
  );

  const filtered = members.filter((member) => {
    const haystack = `${member.firstName} ${member.lastName} ${member.badgeNumber} ${member.role} ${member.marketName ?? ""} ${member.cityName} ${member.sector}`.toLowerCase();
    if (query && !haystack.includes(query.toLowerCase().trim())) return false;
    if (region && member.regionSlug !== region) return false;
    if (city && member.cityName !== city) return false;
    if (level && member.bureauLevel !== level) return false;
    if (sector && member.sector !== sector) return false;
    if (office === "coordinateur" && !isCoordinatorRole(member.role)) return false;
    if (office === "secretaire" && !isGeneralSecretaryRole(member.role)) return false;
    if (onlyActive && member.status !== "actif") return false;
    return true;
  });

  return (
    <div>
      <div className="filters">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Nom, badge, marché, fonction…"
          aria-label="Rechercher un membre"
        />
        <select
          value={region}
          aria-label="Région"
          onChange={(event) => {
            setRegion(event.target.value);
            setCity("");
          }}
        >
          <option value="">Toutes les régions</option>
          {regions.map(([slug, name]) => (
            <option key={slug} value={slug}>
              {name}
            </option>
          ))}
        </select>
        <select value={city} aria-label="Ville" onChange={(event) => setCity(event.target.value)}>
          <option value="">Toutes les villes</option>
          {cities.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <select value={level} aria-label="Niveau" onChange={(event) => setLevel(event.target.value)}>
          <option value="">Tous les niveaux</option>
          {Object.entries(levelLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select value={sector} aria-label="Filière" onChange={(event) => setSector(event.target.value)}>
          <option value="">Toutes les filières</option>
          {sectors.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <button className={`chip ${office === "coordinateur" ? "active" : ""}`} type="button" aria-pressed={office === "coordinateur"} onClick={() => setOffice((value) => (value === "coordinateur" ? "" : "coordinateur"))}>
          Coordinateurs
        </button>
        <button className={`chip ${office === "secretaire" ? "active" : ""}`} type="button" aria-pressed={office === "secretaire"} onClick={() => setOffice((value) => (value === "secretaire" ? "" : "secretaire"))}>
          Secrétaires généraux
        </button>
        <button className={`chip ${onlyActive ? "active" : ""}`} type="button" aria-pressed={onlyActive} onClick={() => setOnlyActive((value) => !value)}>
          Badges validés
        </button>
      </div>
      <p className="muted">
        {filtered.length} badge{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""} sur {members.length}. Cliquez une carte pour le détail et la vérification.
      </p>
      <div className="badge-grid">
        {filtered.map((member) => (
          <Link key={member.badgeNumber} href={`/membres/${member.badgeNumber}`} style={{ display: "block" }}>
            <OfficialBadge member={member} />
          </Link>
        ))}
      </div>
      {filtered.length === 0 ? <div className="note">Aucun opérateur ne correspond à ces filtres.</div> : null}
    </div>
  );
}
