import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adhesions } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { isKnownSector } from "@/lib/sectors";

export const dynamic = "force-dynamic";

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Formulaire illisible." }, { status: 400 });

  const fullName = clip(body.fullName, 160);
  const phone = clip(body.phone, 40);
  const email = clip(body.email, 160);
  const city = clip(body.city, 120);
  const region = clip(body.region, 140);
  const sector = clip(body.sector, 140);
  const shopName = clip(body.shopName, 180);
  const message = clip(body.message, 2000);

  if (fullName.length < 3 || phone.length < 8 || city.length < 2 || region.length < 2 || sector.length < 2) {
    return Response.json({ error: "Nom, téléphone, ville, région et filière sont requis." }, { status: 400 });
  }
  if (!isKnownSector(sector)) {
    return Response.json({ error: "Choisissez une filière du catalogue COCOMCI." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Courriel invalide." }, { status: 400 });
  }

  await ensureSeeded();
  const [row] = await db
    .insert(adhesions)
    .values({
      reference: `TMP-${Date.now()}`,
      fullName,
      phone,
      email: email || null,
      city,
      region,
      sector,
      shopName: shopName || null,
      message: message || null,
    })
    .returning();

  const reference = `ADH-${new Date().getFullYear()}-${String(row.id).padStart(4, "0")}`;
  await db.update(adhesions).set({ reference }).where(eq(adhesions.id, row.id));

  return Response.json({ ok: true, reference });
}
