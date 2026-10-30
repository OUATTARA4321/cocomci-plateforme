"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { activityTypeLabels, formatDay, statusLabels } from "@/lib/format";
import type { ActivityCard } from "@/lib/types";

type Slide = ActivityCard & { image: string };

export function ActivitiesCarousel({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const next = useCallback(() => {
    setCurrent((index) => (index + 1) % slides.length);
  }, [slides.length]);

  const previous = useCallback(() => {
    setCurrent((index) => (index - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing || hovered || reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(next, 6500);
    return () => window.clearInterval(timer);
  }, [hovered, next, playing, reducedMotion, slides.length]);

  if (slides.length === 0) return null;
  const active = slides[current];

  return (
    <section className="activity-gallery" aria-label="Activités COCOMCI en images">
      <div className="section-head">
        <div>
          <p className="kicker dark">Reportage · sur le terrain</p>
          <h2>La coordination en images.</h2>
        </div>
        <div className="carousel-actions">
          <button
            className="carousel-control"
            type="button"
            aria-label="Image précédente"
            onClick={previous}
            disabled={slides.length < 2}
          >
            ←
          </button>
          <button
            className="carousel-control"
            type="button"
            aria-label={playing ? "Mettre le carrousel en pause" : "Reprendre le défilement"}
            onClick={() => setPlaying((value) => !value)}
            disabled={slides.length < 2}
          >
            {playing ? "Ⅱ" : "▶"}
          </button>
          <button
            className="carousel-control"
            type="button"
            aria-label="Image suivante"
            onClick={next}
            disabled={slides.length < 2}
          >
            →
          </button>
        </div>
      </div>

      <div
        className="activity-carousel"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Activités de la coordination en images"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") previous();
          if (event.key === "ArrowRight") next();
        }}
        tabIndex={0}
      >
        <div className="carousel-window">
          <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, index) => (
              <article
                key={slide.id}
                className="carousel-slide"
                aria-roledescription="diapositive"
                aria-label={`${index + 1} sur ${slides.length} : ${slide.title}`}
                aria-hidden={current !== index}
              >
                <img
                  src={slide.image}
                  alt={`Illustration de l’activité ${slide.title}, à ${slide.location}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="carousel-shade" />
                <div className="carousel-brand" aria-label="Logo de la COCOMCI">
                  <img src="/api/logo" alt="Logo COCOMCI" />
                  <span>
                    <b>COCOMCI</b>
                    <small>Commerce · Côte d’Ivoire</small>
                  </span>
                </div>
                <div className="carousel-copy">
                  <div className="carousel-tags">
                    <span className="tag gold">{activityTypeLabels[slide.type] ?? slide.type}</span>
                    <span className={`tag ${slide.status === "en_cours" ? "green" : "light-tag"}`}>
                      {statusLabels[slide.status] ?? slide.status}
                    </span>
                  </div>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  <div className="carousel-meta">
                    <span>{formatDay(slide.startsAt)}</span>
                    <span className="meta-dot" aria-hidden="true">·</span>
                    <span>{slide.location}</span>
                  </div>
                  <Link href="#agenda" className="carousel-link" tabIndex={current === index ? 0 : -1}>
                    Voir l’agenda <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="carousel-footer">
          <div className="carousel-dots" aria-label="Choisir une image">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={current === index ? "carousel-dot active" : "carousel-dot"}
                aria-label={`Afficher l’image ${index + 1} : ${slide.title}`}
                aria-current={current === index ? "true" : undefined}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
          <span className="carousel-count">{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        </div>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {active.title}, {formatDay(active.startsAt)}, {active.location}
        </span>
      </div>
    </section>
  );
}
