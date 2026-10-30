import { cookies } from "next/headers";
import { SECRETARIAT_COOKIE, secretariatCode, secretariatToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { code?: string } | null;
  if (!body?.code || body.code.trim() !== secretariatCode()) {
    return Response.json({ error: "Code refusé." }, { status: 401 });
  }
  const jar = await cookies();
  jar.set(SECRETARIAT_COOKIE, secretariatToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return Response.json({ ok: true });
}
