import { readFile } from "fs/promises";
import path from "path";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteAssets } from "@/db/schema";

export const dynamic = "force-dynamic";

const allowed = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

export async function GET() {
  try {
    const rows = await db
      .select({ mimeType: siteAssets.mimeType, imageData: siteAssets.imageData })
      .from(siteAssets)
      .where(eq(siteAssets.key, "logo"))
      .limit(1);
    const asset = rows[0];
    if (asset && allowed.includes(asset.mimeType)) {
      return new Response(Buffer.from(asset.imageData, "base64"), {
        headers: {
          "Content-Type": asset.mimeType,
          "Cache-Control": "public, max-age=60, stale-while-revalidate=600",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
  } catch {
    // retombe sur le fichier statique
  }

  const fallback = await readFile(path.join(process.cwd(), "public/images/emblem.jpg"));
  return new Response(new Uint8Array(fallback), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=60, stale-while-revalidate=600",
    },
  });
}
