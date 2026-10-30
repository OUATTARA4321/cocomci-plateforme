"use client";

export function PrintButton() {
  return (
    <button className="btn btn-line btn-small no-print" type="button" onClick={() => window.print()}>
      Imprimer le badge
    </button>
  );
}
