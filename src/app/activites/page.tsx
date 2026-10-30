import type { Metadata } from "next";
import Link from "next/link";
import { ActivitiesCarousel } from "@/components/activities-carousel";
import { activityTypeLabels, formatDay, statusLabels } from "@/lib/format";
import { getActivities } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Activités",
  description: "Assemblées, formations, foires et campagnes de la COCOMCI.",
};

const activityImages = [
  "/images/pattern-hero.jpg",
  "/images/marche-epices.jpg",
  "/images/marche-vivrier.jpg",
  "/images/vendeuse.jpg",
  "/images/etal-tomates.jpg",
  "/images/piment.jpg",
  "/images/poivrons.jpg",
];

export default async function ActivitiesPage() {
  const activities = await getActivities();
  const ordered = [...activities].sort((a, b) => {
    const rank = { en_cours: 0, a_venir: 1, termine: 2 };
    return rank[a.status as keyof typeof rank] - rank[b.status as keyof typeof rank] || a.startsAt.localeCompare(b.startsAt);
  });
  const slides = ordered.slice(0, activityImages.length).map((activity, index) => ({
    ...activity,
    image: activityImages[index],
  }));
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · Agenda
      </p>
      <p className="kicker dark">Assemblées, formations, foires</p>
      <h1>Les activités de la coordination.</h1>
      <ActivitiesCarousel slides={slides} />
      <div className="activity-list" id="agenda" style={{ marginTop: 16, scrollMarginTop: 100 }}>
        {ordered.map((activity) => (
          <article key={activity.id} className="activity-card" style={{ alignItems: "start" }}>
            <div>
              <div className="when">{formatDay(activity.startsAt)}</div>
              {activity.endsAt && activity.endsAt.slice(0, 10) !== activity.startsAt.slice(0, 10) ? (
                <div className="muted">au {formatDay(activity.endsAt)}</div>
              ) : null}
            </div>
            <div>
              <span className="tag gold">{activityTypeLabels[activity.type] ?? activity.type}</span>
              <h3>{activity.title}</h3>
              <p style={{ margin: "0.2rem 0" }}>{activity.description}</p>
              <p className="muted" style={{ margin: 0 }}>
                {activity.location}
              </p>
            </div>
            <span className={`tag ${activity.status === "en_cours" ? "green" : ""}`}>{statusLabels[activity.status]}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
