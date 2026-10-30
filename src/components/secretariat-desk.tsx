"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogoManager } from "@/components/logo-manager";
import { MemberPhotoManager } from "@/components/member-photo-manager";
import { formatDayTime, statusLabels } from "@/lib/format";
import type { MemberCard, SubmissionRow } from "@/lib/types";

const adhesionStatuses = ["recue", "en_instruction", "badge_en_preparation", "close"];
const reportStatuses = ["a_verifier", "retenu", "ecarte"];

export function SecretariatLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const code = String(new FormData(event.currentTarget).get("code") || "");
    const response = await fetch("/api/secretariat/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    setLoading(false);
    if (!response.ok) {
      setError("Code refusé.");
      return;
    }
    router.refresh();
  }

  return (
    <form className="form-card login-card" onSubmit={onSubmit}>
      <p className="kicker dark">Bureau national exécutif</p>
      <h1 style={{ fontFamily: "var(--display)", fontSize: "2.2rem", margin: "0.3rem 0" }}>Secrétariat</h1>
      <p className="muted">Accès réservé à l&apos;instruction des adhésions, des messages et des signalements de prix. Démonstration : code BNE-2019.</p>
      <div className="field">
        <label htmlFor="code">Code du secrétariat</label>
        <input id="code" name="code" type="password" required autoComplete="current-password" />
      </div>
      {error ? <p className="error">{error}</p> : null}
      <button className="btn btn-dark" style={{ marginTop: 12 }} disabled={loading}>
        {loading ? "Vérification…" : "Ouvrir le registre"}
      </button>
    </form>
  );
}

function Table({
  rows,
  kind,
  statuses,
}: {
  rows: SubmissionRow[];
  kind: "adhesion" | "report" | "contact";
  statuses?: string[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState<number | null>(null);

  async function update(id: number, status: string) {
    setPending(id);
    await fetch("/api/secretariat/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, id, status }),
    });
    setPending(null);
    router.refresh();
  }

  if (rows.length === 0) return <p className="muted">Aucune pièce pour le moment.</p>;

  return (
    <div className="table-wrap">
      <table className="desk-table">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Dossier</th>
            <th>Détail</th>
            <th>Reçu</th>
            {statuses ? <th>Instruction</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${kind}-${row.id}`}>
              <td>{row.reference ?? "—"}</td>
              <td>
                <b>{row.title}</b>
                <div className="muted">{row.detail}</div>
              </td>
              <td>{row.meta}</td>
              <td>{formatDayTime(row.createdAt)}</td>
              {statuses ? (
                <td>
                  <select
                    className="status-select"
                    value={row.status}
                    disabled={pending === row.id}
                    aria-label={`Statut ${row.reference ?? row.title}`}
                    onChange={(event) => update(row.id, event.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status] ?? status}
                      </option>
                    ))}
                  </select>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SecretariatDesk({
  adhesions,
  contacts,
  reports,
  members,
}: {
  adhesions: SubmissionRow[];
  contacts: SubmissionRow[];
  reports: SubmissionRow[];
  members: MemberCard[];
}) {
  const router = useRouter();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "end" }}>
        <div>
          <p className="kicker dark">Registre vivant</p>
          <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(2rem,4vw,3.4rem)", margin: "0.2rem 0" }}>Secrétariat général</h1>
        </div>
        <button
          className="btn btn-line btn-small"
          onClick={async () => {
            await fetch("/api/secretariat/logout", { method: "POST" });
            router.refresh();
          }}
        >
          Fermer la session
        </button>
      </div>
      <section className="section" style={{ paddingTop: 18 }}>
        <LogoManager />
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <MemberPhotoManager members={members} />
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <h2>Adhésions</h2>
        <Table rows={adhesions} kind="adhesion" statuses={adhesionStatuses} />
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <h2>Signalements de prix</h2>
        <Table rows={reports} kind="report" statuses={reportStatuses} />
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <h2>Messages</h2>
        <Table rows={contacts} kind="contact" />
      </section>
    </div>
  );
}
