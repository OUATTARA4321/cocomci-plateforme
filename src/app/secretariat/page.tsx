import type { Metadata } from "next";
import { SecretariatDesk, SecretariatLogin } from "@/components/secretariat-desk";
import { isSecretariat } from "@/lib/auth";
import { getMembers, getSubmissions } from "@/lib/queries";

export const metadata: Metadata = { title: "Secrétariat" };

export default async function SecretariatPage() {
  const allowed = await isSecretariat();
  if (!allowed) return <SecretariatLogin />;
  const [data, members] = await Promise.all([getSubmissions(), getMembers()]);
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <SecretariatDesk adhesions={data.adhesions} contacts={data.contacts} reports={data.reports} members={members} />
    </div>
  );
}
