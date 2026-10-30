import { eq } from "drizzle-orm";
import { db } from "@/db";
import { memberPhotos, members } from "@/db/schema";
import { isSecretariat } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_PHOTO_BYTES = 1_000_000;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function matchesFileSignature(type: string, bytes: Buffer) {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (type === "image/webp") return bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  return false;
}

export async function POST(request: Request) {
  if (!(await isSecretariat())) {
    return Response.json({ error: "Session secrétariat requise." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) return Response.json({ error: "Formulaire photo invalide." }, { status: 400 });

  const badgeNumber = String(form.get("badgeNumber") ?? "").trim().toUpperCase();
  const file = form.get("photo");
  if (!badgeNumber || !(file instanceof File)) {
    return Response.json({ error: "Badge et photo requis." }, { status: 400 });
  }
  if (!allowedTypes.has(file.type)) {
    return Response.json({ error: "Formats acceptés : JPEG, PNG ou WebP." }, { status: 400 });
  }
  if (file.size === 0 || file.size > MAX_PHOTO_BYTES) {
    return Response.json({ error: "La photo doit peser au maximum 1 Mo." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (!matchesFileSignature(file.type, bytes)) {
    return Response.json({ error: "Le fichier ne correspond pas au format annoncé." }, { status: 400 });
  }

  const [member] = await db
    .select({ id: members.id, badgeNumber: members.badgeNumber })
    .from(members)
    .where(eq(members.badgeNumber, badgeNumber))
    .limit(1);
  if (!member) return Response.json({ error: "Badge inconnu." }, { status: 404 });

  await db.transaction(async (tx) => {
    await tx
      .insert(memberPhotos)
      .values({ memberId: member.id, mimeType: file.type, imageData: bytes.toString("base64") })
      .onConflictDoUpdate({
        target: memberPhotos.memberId,
        set: { mimeType: file.type, imageData: bytes.toString("base64"), updatedAt: new Date() },
      });
    await tx
      .update(members)
      .set({ portrait: `/api/membres/${encodeURIComponent(member.badgeNumber)}/photo` })
      .where(eq(members.id, member.id));
  });

  return Response.json({ ok: true, badgeNumber: member.badgeNumber });
}
