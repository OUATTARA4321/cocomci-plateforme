import { eq } from "drizzle-orm";
import { db } from "@/db";
import { priceReports } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export const dynamic = "force-dynamic";

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Formulaire illisible." }, { status: 400 });

  const reporterName = clip(body.reporterName, 160);
  const phone = clip(body.phone, 40);
  const marketName = clip(body.marketName, 180);
  const productName = clip(body.productName, 140);
  const unit = clip(body.unit, 40) || "kg";
  const note = clip(body.note, 2000);
  const price = Number(body.price);

  if (reporterName.length < 3 || marketName.length < 2 || productName.length < 2) {
    return Response.json({ error: "Nom, marché et produit sont requis." }, { status: 400 });
  }
  if (!Number.isFinite(price) || price < 1 || price > 10_000_000) {
    return Response.json({ error: "Prix invalide." }, { status: 400 });
  }

  await ensureSeeded();
  const [row] = await db
    .insert(priceReports)
    .values({
      reference: `TMP-${Date.now()}`,
      reporterName,
      phone: phone || null,
      marketName,
      productName,
      price: Math.round(price),
      unit,
      note: note || null,
    })
    .returning();
  const reference = `PRX-${new Date().getFullYear()}-${String(row.id).padStart(4, "0")}`;
  await db.update(priceReports).set({ reference }).where(eq(priceReports.id, row.id));
  return Response.json({ ok: true, reference });
}
