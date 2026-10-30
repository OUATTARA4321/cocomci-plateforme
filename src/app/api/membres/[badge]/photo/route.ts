import { eq } from "drizzle-orm";
import { db } from "@/db";
import { memberPhotos, members } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ badge: string }> }) {
  const { badge } = await params;
  const rows = await db
    .select({ mimeType: memberPhotos.mimeType, imageData: memberPhotos.imageData })
    .from(memberPhotos)
    .innerJoin(members, eq(memberPhotos.memberId, members.id))
    .where(eq(members.badgeNumber, decodeURIComponent(badge).trim().toUpperCase()))
    .limit(1);
  const photo = rows[0];
  if (!photo || !["image/jpeg", "image/png", "image/webp"].includes(photo.mimeType)) {
    return new Response("Photo introuvable", { status: 404 });
  }

  return new Response(Buffer.from(photo.imageData, "base64"), {
    headers: {
      "Content-Type": photo.mimeType,
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Disposition": "inline",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
