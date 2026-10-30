import Link from "next/link";
import { ContactLinks } from "@/components/contact-links";
import { OfficialBadge } from "@/components/official-badge";
import { isCoordinatorRole } from "@/lib/format";
import type { MemberCard } from "@/lib/types";

export function OfficePair({ members, size = "md" }: { members: MemberCard[]; size?: "md" | "sm" }) {
  const ordered = [...members].sort((a, b) => Number(isCoordinatorRole(b.role)) - Number(isCoordinatorRole(a.role)));
  if (ordered.length === 0) {
    return <p className="muted">Bureau en cours d&apos;installation.</p>;
  }
  return (
    <div className={size === "sm" ? "office-pair compact" : "office-pair"}>
      {ordered.map((member) => (
        <div key={member.badgeNumber} className="office-slot">
          <Link href={`/membres/${member.badgeNumber}`}>
            <OfficialBadge member={member} size={size} />
          </Link>
          <p className={member.status === "actif" ? "validated-caption" : "validated-caption down"}>
            {member.status === "actif" ? "Badge validé" : "Badge suspendu"} · {member.role}
          </p>
          <ContactLinks member={member} compact={size === "sm"} />
        </div>
      ))}
    </div>
  );
}
