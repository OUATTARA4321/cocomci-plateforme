import { db } from "@/db";
import { contacts } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export const dynamic = "force-dynamic";

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Formulaire illisible." }, { status: 400 });

  const fullName = clip(body.fullName, 160);
  const email = clip(body.email, 160);
  const subject = clip(body.subject, 200);
  const message = clip(body.message, 4000);

  if (fullName.length < 3 || subject.length < 3 || message.length < 12) {
    return Response.json({ error: "Nom, objet et message sont requis." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Courriel invalide." }, { status: 400 });
  }

  await ensureSeeded();
  await db.insert(contacts).values({ fullName, email, subject, message });
  return Response.json({ ok: true });
}
