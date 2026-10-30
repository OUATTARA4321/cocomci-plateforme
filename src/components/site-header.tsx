"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const launcherLinks = [
  { href: "/", label: "Accueil", icon: "🏛️" },
  { href: "/president", label: "Mot du Président", icon: "🎙️" },
  { href: "/organisation", label: "Organisation", icon: "🏢" },
  { href: "/membres", label: "Membres & badges", icon: "🪪" },
  { href: "/bureaux", label: "Bureaux territoriaux", icon: "📍" },
  { href: "/regions", label: "Régions & villes", icon: "🗺️" },
  { href: "/filieres", label: "Filières", icon: "🧺" },
  { href: "/actualites", label: "Actualités", icon: "📰" },
  { href: "/marches", label: "Cours des marchés", icon: "📊" },
  { href: "/devises", label: "Cours des devises", icon: "💱" },
  { href: "/activites", label: "Activités", icon: "📅" },
  { href: "/verifier", label: "Vérifier un badge", icon: "✅" },
  { href: "/adherer", label: "Adhérer", icon: "✍🏾" },
  { href: "/contact", label: "Contact", icon: "📮" },
  { href: "/secretariat", label: "Secrétariat", icon: "🔐" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [launcher, setLauncher] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setLauncher(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setLauncher(false);
  }, [pathname]);

  return (
    <header className="site-header no-print">
      <div className="flagbar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="wrap header-row">
        <Link href="/" className="brand">
          <img src="/api/logo" alt="Logo de la COCOMCI" />
          <span>
            <strong>COCOMCI</strong>
            <small>Coordination des Opérateurs de Commerce de Côte d&apos;Ivoire</small>
          </span>
        </Link>
        <div className="header-actions">
          <Link className="btn btn-line btn-small hide-sm" href="/verifier">
            Vérifier
          </Link>
          <Link className="btn btn-primary btn-small hide-sm" href="/adherer">
            Adhérer
          </Link>
          <div className="launcher">
            <button
              className="launcher-btn"
              type="button"
              aria-expanded={launcher}
              aria-haspopup="true"
              aria-label={launcher ? "Fermer le sommaire" : "Ouvrir le sommaire"}
              onClick={() => setLauncher((value) => !value)}
            >
              <span className="launcher-dots" aria-hidden="true">
                {Array.from({ length: 9 }).map((_, index) => (
                  <i key={index} />
                ))}
              </span>
            </button>
            <span className="launcher-hint" aria-hidden="true">
              Sommaire
            </span>
            {launcher ? (
              <>
                <button className="launcher-backdrop" aria-label="Fermer le sommaire" onClick={() => setLauncher(false)} />
                <div className="launcher-panel" role="menu" aria-label="Sommaire de la plateforme">
                  <p className="launcher-title">Sommaire</p>
                  <div className="launcher-grid">
                    {launcherLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className={pathname === item.href ? "launcher-item active" : "launcher-item"}
                        onClick={() => setLauncher(false)}
                      >
                        <span className="launcher-icon" aria-hidden="true">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
