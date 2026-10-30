import { createHash } from "crypto";
import { cookies } from "next/headers";

export const SECRETARIAT_COOKIE = "cocomci_sg";

export function secretariatCode() {
  return process.env.SECRETARIAT_CODE || "BNE-2019";
}

export function secretariatToken() {
  return createHash("sha256").update(`cocomci-sg:${secretariatCode()}`).digest("hex");
}

export async function isSecretariat() {
  const jar = await cookies();
  return jar.get(SECRETARIAT_COOKIE)?.value === secretariatToken();
}
