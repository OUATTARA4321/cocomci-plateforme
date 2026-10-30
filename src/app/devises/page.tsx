import type { Metadata } from "next";
import Link from "next/link";
import { CurrencyDesk } from "@/components/currency-desk";
import { formatDay } from "@/lib/format";
import { getRates } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Cours des devises",
  description: "Cours indicatifs du franc CFA face à l'euro, au dollar et aux devises du commerce régional.",
};

export default async function RatesPage() {
  const rates = await getRates();
  const day = rates.at(-1)?.recordedOn;
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · Observatoire
      </p>
      <p className="kicker dark">Franc CFA · importateurs · commerce de bordure</p>
      <h1>Les devises du commerce.</h1>
      <p className="lede" style={{ color: "var(--muted)", maxWidth: 720 }}>
        Relevé indicatif du {day ? formatDay(day) : "jour"}. L&apos;euro reste arrimé à 655,957 FCFA. Le dollar, la livre, le yuan, le naira et le cedi servent aux opérateurs qui achètent le riz, l&apos;huile, le lait ou l&apos;oignon hors de la zone.
      </p>
      <CurrencyDesk rates={rates} />
      <div className="note" style={{ marginTop: 16 }}>
        Ces cours ne sont pas une publication de la BCEAO ni un engagement de change. Ils donnent aux membres un ordre de grandeur commun, daté, pour lire une facture avant de fixer le prix du sac.
      </div>
    </div>
  );
}
