"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { MemberCard } from "@/lib/types";

function optimizePortrait(file: File) {
  return new Promise<Blob>((resolve, reject) => {
    const source = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const side = Math.min(image.naturalWidth, image.naturalHeight);
      const left = (image.naturalWidth - side) / 2;
      const top = (image.naturalHeight - side) * 0.2;
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(source);
        reject(new Error("Le navigateur ne peut pas recadrer cette image."));
        return;
      }
      context.drawImage(image, left, top, side, side, 0, 0, 512, 512);
      URL.revokeObjectURL(source);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("La conversion de la photo a échoué."))),
        "image/jpeg",
        0.82,
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(source);
      reject(new Error("Impossible de lire cette photo."));
    };
    image.src = source;
  });
}

function portraitLabel(path: string | null) {
  if (path?.startsWith("/images/members/portraits/") || path === "/images/president.jpg") return "Portrait d’illustration";
  if (path?.startsWith("/api/membres/")) return "Photo ajoutée au dossier";
  return "Photo manquante";
}

export function MemberPhotoManager({ members }: { members: MemberCard[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState("");
  const [feedback, setFeedback] = useState<{ badge: string; message: string; error: boolean } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return [...members]
      .filter((member) => {
        if (!search) return true;
        return `${member.firstName} ${member.lastName} ${member.badgeNumber} ${member.role} ${member.cityName} ${member.regionName}`
          .toLowerCase()
          .includes(search);
      })
      .sort((a, b) => {
        const rank = { national: 0, regional: 1, communal: 2, membre: 3 };
        return rank[a.bureauLevel as keyof typeof rank] - rank[b.bureauLevel as keyof typeof rank] || a.lastName.localeCompare(b.lastName, "fr");
      });
  }, [members, query]);
  const visible = showAll || query ? filtered : filtered.slice(0, 24);

  async function upload(member: MemberCard, file: File | undefined) {
    if (!file) return;
    setPending(member.badgeNumber);
    setFeedback(null);
    try {
      const photo = await optimizePortrait(file);
      if (photo.size > 1_000_000) throw new Error("La photo optimisée dépasse 1 Mo. Choisissez une image plus légère.");
      const body = new FormData();
      body.append("badgeNumber", member.badgeNumber);
      body.append("photo", photo, "portrait.jpg");
      const response = await fetch("/api/secretariat/photos", { method: "POST", body });
      const json = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(json.error || "Enregistrement impossible.");
      setFeedback({ badge: member.badgeNumber, message: "Photo enregistrée et visible dans l’annuaire.", error: false });
      router.refresh();
    } catch (error) {
      setFeedback({
        badge: member.badgeNumber,
        message: error instanceof Error ? error.message : "Une erreur est survenue.",
        error: true,
      });
    } finally {
      setPending("");
    }
  }

  return (
    <section className="panel photo-manager">
      <div className="section-head">
        <div>
          <p className="kicker dark">Registre membres</p>
          <h2>Photos des membres</h2>
          <p className="muted">Remplacez les portraits d’illustration par la photo du titulaire, avec son accord. L’image est recadrée en carré et optimisée avant enregistrement.</p>
        </div>
        <span className="tag green">{members.length} fiches</span>
      </div>
      <div className="filters">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un nom, une ville ou un numéro de badge…"
          aria-label="Rechercher un membre pour modifier sa photo"
        />
        {!query && filtered.length > 24 ? (
          <button className="chip" type="button" onClick={() => setShowAll((value) => !value)}>
            {showAll ? "Réduire la liste" : `Afficher les ${filtered.length} membres`}
          </button>
        ) : null}
      </div>
      <div className="member-photo-list">
        {visible.map((member) => (
          <article key={member.badgeNumber} className="member-photo-row">
            <div className="member-photo-preview">
              {member.portrait ? <img src={member.portrait} alt={`Portrait de ${member.firstName} ${member.lastName}`} /> : <span>{member.firstName.charAt(0)}{member.lastName.charAt(0)}</span>}
            </div>
            <div className="member-photo-info">
              <b>{member.firstName} {member.lastName}</b>
              <span>{member.role}</span>
              <small>{member.badgeNumber} · {member.cityName}, {member.regionName}</small>
              <small className={member.portrait?.startsWith("/api/membres/") ? "up" : "muted"}>{portraitLabel(member.portrait)}</small>
            </div>
            <label className={`btn btn-line btn-small photo-upload ${pending === member.badgeNumber ? "disabled" : ""}`}>
              {pending === member.badgeNumber ? "Enregistrement…" : member.portrait?.startsWith("/api/membres/") ? "Remplacer" : "Ajouter une photo"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                aria-label={`Ajouter ou remplacer la photo de ${member.firstName} ${member.lastName}`}
                disabled={pending === member.badgeNumber}
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  void upload(member, file);
                  event.currentTarget.value = "";
                }}
              />
            </label>
            {feedback?.badge === member.badgeNumber ? (
              <span className={feedback.error ? "error photo-feedback" : "success photo-feedback"}>{feedback.message}</span>
            ) : null}
          </article>
        ))}
      </div>
      {filtered.length === 0 ? <p className="note">Aucun membre ne correspond à cette recherche.</p> : null}
      {!query && !showAll && filtered.length > 24 ? <p className="muted">Les membres du Bureau national et des coordinations territoriales sont affichés en premier.</p> : null}
    </section>
  );
}
