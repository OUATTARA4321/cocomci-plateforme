import { db } from "@/db";
import { siteAssets } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { isSecretariat } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_LOGO_BYTES = 2_000_000;
const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml"]);

function matchesSignature(type: string, bytes: Buffer) {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (type === "image/webp") return bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  if (type === "image/svg+xml") {
    const head = bytes.toString("utf8", 0, 300).trimStart().toLowerCase();
    return head.startsWith("<svg") || head.startsWith("<?xml");
  }
  return false;
}

export async function POST(request: Request) {
  if (!(await isSecretariat())) {
    return Response.json({ error: "Session secrétariat requise." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("logo");
  if (!(file instanceof File)) {
    return Response.json({ error: "Fichier du logo requis." }, { status: 400 });
  }
  if (!allowedTypes.has(file.type)) {
    return Response.json({ error: "Formats acceptés : PNG, JPEG, WebP ou SVG." }, { status: 400 });
  }
  if (file.size === 0 || file.size > MAX_LOGO_BYTES) {
    return Response.json({ error: "Le logo doit peser au maximum 2 Mo." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (!matchesSignature(file.type, bytes)) {
    return Response.json({ error: "Le fichier ne correspond pas au format annoncé." }, { status: 400 });
  }
  if (file.type === "image/svg+xml") {
    const content = bytes.toString("utf8").toLowerCase();
    if (content.includes("<script") || content.includes("javascript:") || content.includes("onload=")) {
      return Response.json({ error: "SVG refusé : contenu actif détecté." }, { status: 400 });
    }
  }

  await ensureSeeded();
  await db
    .insert(siteAssets)
    .values({ key: "logo", mimeType: file.type, imageData: bytes.toString("base64") })
    .onConflictDoUpdate({
      target: siteAssets.key,
      set: { mimeType: file.type, imageData: bytes.toString("base64"), updatedAt: new Date() },
    });

  return Response.json({ ok: true });
}

export async function DELETE() {
  if (!(await isSecretariat())) {
    return Response.json({ error: "Session secrétariat requise." }, { status: 401 });
  }
  const { eq } = await import("drizzle-orm");
  await db.delete(siteAssets).where(eq(siteAssets.key, "logo"));
  return Response.json({ ok: true });
}
