import { telLink, whatsappLink } from "@/lib/format";
import type { MemberCard } from "@/lib/types";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.57 14.87L2 22l5.27-1.38A9.9 9.9 0 1 0 12.04 2Zm0 1.67a8.23 8.23 0 1 1-4.2 15.3l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1 7-12.59Zm-3.5 4.4c-.19 0-.5.07-.76.36-.26.28-1 .97-1 2.37s1.02 2.75 1.16 2.94c.14.19 1.97 3.01 4.78 4.22 2.33 1 2.81.8 3.31.75.51-.05 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.19.28-.72.9-.88 1.09-.16.19-.33.21-.6.07a7.5 7.5 0 0 1-2.22-1.37 8.32 8.32 0 0 1-1.54-1.91c-.16-.28-.02-.43.12-.57.13-.12.28-.32.42-.49.14-.16.19-.28.28-.46.1-.19.05-.35-.02-.5-.07-.14-.6-1.48-.85-2.03-.22-.47-.45-.49-.62-.5h-.55Z" />
    </svg>
  );
}

export function ContactLinks({
  member,
  compact = false,
}: {
  member: MemberCard;
  compact?: boolean;
}) {
  if (!member.phone && !member.email) {
    return <p className="muted office-contact-empty">Coordonnées au secrétariat régional.</p>;
  }
  const greeting = `Bonjour ${member.firstName} ${member.lastName}, je vous contacte via la plateforme COCOMCI.`;
  return (
    <div className={compact ? "office-contacts compact" : "office-contacts"}>
      {member.phone ? (
        <a className="contact-chip" href={telLink(member.phone)} aria-label={`Appeler ${member.firstName} ${member.lastName}`}>
          ✆ {member.phone}
        </a>
      ) : null}
      {member.phone ? (
        <a
          className="contact-chip whatsapp"
          href={whatsappLink(member.phone, greeting)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Écrire à ${member.firstName} ${member.lastName} sur WhatsApp`}
        >
          <WhatsAppIcon /> WhatsApp
        </a>
      ) : null}
      {member.email && !compact ? (
        <a className="contact-chip" href={`mailto:${member.email}`} aria-label={`Écrire à ${member.email}`}>
          ✉ {member.email}
        </a>
      ) : null}
    </div>
  );
}
