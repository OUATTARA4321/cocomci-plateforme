import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adhesions, priceReports } from "@/db/schema";
import { isSecretariat } from "@/lib/auth";

export const dynamic = "force-dynamic";

const allowed = {
  adhesion: ["recue", "en_instruction", "badge_en_preparation", "close"],
  report: ["a_verifier", "retenu", "ecarte"],
};

export async function POST(request: Request) {
  if (!(await isSecretariat())) {
    return Response.json({ error: "Session requise." }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { kind?: string; id?: number; status?: string } | null;
  if (!body?.kind || !body.status || !body.id) {
    return Response.json({ error: "Dossier incomplet." }, { status: 400 });
  }
  if (body.kind === "adhesion" && allowed.adhesion.includes(body.status)) {
    await db.update(adhesions).set({ status: body.status }).where(eq(adhesions.id, body.id));
    return Response.json({ ok: true });
  }
  if (body.kind === "report" && allowed.report.includes(body.status)) {
    await db.update(priceReports).set({ status: body.status }).where(eq(priceReports.id, body.id));
    return Response.json({ ok: true });
  }
  return Response.json({ error: "Mise à jour refusée." }, { status: 400 });
}
