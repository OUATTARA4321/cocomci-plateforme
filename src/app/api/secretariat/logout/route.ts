import { cookies } from "next/headers";
import { SECRETARIAT_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const jar = await cookies();
  jar.set(SECRETARIAT_COOKIE, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return Response.json({ ok: true });
}
