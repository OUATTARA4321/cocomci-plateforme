"use client";

import { useState } from "react";

export function LogoManager() {
  const [state, setState] = useState<{ status: "idle" | "loading" | "ok" | "error"; message: string }>({
    status: "idle",
    message: "",
  });
  const [stamp, setStamp] = useState(() => Date.now());

  async function upload(file: File | undefined) {
    if (!file) return;
    setState({ status: "loading", message: "" });
    try {
      const body = new FormData();
      body.append("logo", file, file.name);
      const response = await fetch("/api/secretariat/logo", { method: "POST", body });
      const json = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(json.error || "Téléversement impossible.");
      setStamp(Date.now());
      setState({ status: "ok", message: "Logo officiel enregistré. Il est désormais affiché sur toute la plateforme." });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Une erreur est survenue." });
    }
  }

  async function restore() {
    setState({ status: "loading", message: "" });
    const response = await fetch("/api/secretariat/logo", { method: "DELETE" });
    if (response.ok) {
      setStamp(Date.now());
      setState({ status: "ok", message: "Logo par défaut restauré." });
    } else {
      setState({ status: "error", message: "Restauration impossible." });
    }
  }

  return (
    <section className="panel logo-manager">
      <div className="section-head">
        <div>
          <p className="kicker dark">Identité visuelle</p>
          <h2>Logo officiel</h2>
          <p className="muted">
            Téléversez ici le fichier original du logo COCOMCI (PNG, JPEG, WebP ou SVG, 2 Mo max). Il remplace immédiatement le logo
            de l’en-tête, du pied de page, des badges et du carrousel. Privilégiez un fichier carré ou l’emblème seul, en haute résolution.
          </p>
        </div>
        <img
          key={stamp}
          src={`/api/logo?v=${stamp}`}
          alt="Logo actuellement affiché sur la plateforme"
          className="logo-preview"
        />
      </div>
      <div className="logo-actions">
        <label className={`btn btn-primary btn-small photo-upload ${state.status === "loading" ? "disabled" : ""}`}>
          {state.status === "loading" ? "Enregistrement…" : "Téléverser le logo original"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            aria-label="Téléverser le logo officiel de la COCOMCI"
            disabled={state.status === "loading"}
            onChange={(event) => {
              void upload(event.currentTarget.files?.[0]);
              event.currentTarget.value = "";
            }}
          />
        </label>
        <button className="btn btn-line btn-small" type="button" onClick={restore} disabled={state.status === "loading"}>
          Restaurer le logo par défaut
        </button>
      </div>
      {state.status === "ok" ? <div className="success" style={{ marginTop: 10 }}>{state.message}</div> : null}
      {state.status === "error" ? <p className="error" style={{ marginTop: 10 }}>{state.message}</p> : null}
    </section>
  );
}
