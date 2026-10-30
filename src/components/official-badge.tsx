import { initials, levelLabels } from "@/lib/format";
import type { MemberCard } from "@/lib/types";

function bureauLabel(role: string, level: string) {
  const value = role.toLowerCase();
  if (value.includes("district")) return "Bureau de district";
  if (value.includes("communal")) return "Bureau communal";
  if (value.includes("de ville")) return "Bureau de ville";
  if (value.includes("régional")) return "Bureau régional";
  return levelLabels[level] ?? level;
}

export function OfficialBadge({
  member,
  size = "md",
}: {
  member: MemberCard;
  size?: "md" | "sm";
}) {
  const active = member.status === "actif";
  return (
    <article className={`id-card ${size === "sm" ? "size-sm" : ""} ${active ? "" : "suspended"}`} aria-label={`Badge ${member.badgeNumber}`}>
      <div className={active ? "ribbon ok" : "ribbon"}>{active ? "Validé" : "Suspendu"}</div>
      <div className="id-top">
        <div>
          <div className="id-kicker">République de Côte d&apos;Ivoire</div>
          <strong style={{ letterSpacing: "0.12em", fontSize: "0.78rem" }}>COCOMCI</strong>
        </div>
        <img src="/api/logo" alt="" />
      </div>
      <div className="id-photo">
        {member.portrait ? (
          <img src={member.portrait} alt={`Portrait de ${member.firstName} ${member.lastName}`} loading="lazy" decoding="async" />
        ) : (
          initials(member.firstName, member.lastName)
        )}
      </div>
      <h3>
        <span className="surname">{member.lastName}</span> {member.firstName}
      </h3>
      <div className="id-role">{member.role}</div>
      <div className="id-number">{member.badgeNumber}</div>
      <div className="id-meta">
        {member.regionName} · {member.cityName}
      </div>
      <div className="id-meta">{active ? "Badge validé" : "Badge non valable"}</div>
      {member.portrait ? (
        <div className="id-photo-caption">
          {member.portrait.startsWith("/images/members/portraits/") || member.portrait === "/images/president.jpg"
            ? "Portrait d’illustration"
            : member.portrait.startsWith("/api/membres/")
              ? "Photo ajoutée au dossier"
              : "Photo du membre"}
        </div>
      ) : null}
      <div className="id-foot">
        <span>{bureauLabel(member.role, member.bureauLevel)}</span>
        <span className="holo" aria-hidden="true" />
        <span>Depuis {member.sinceYear}</span>
      </div>
    </article>
  );
}
