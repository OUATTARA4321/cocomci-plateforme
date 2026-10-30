import type { Metadata } from "next";
import Link from "next/link";
import { MarketsBoard } from "@/components/markets-board";
import { PriceReportForm } from "@/components/forms";
import { formatDay } from "@/lib/format";
import { getQuotes } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Cours des marchés",
  description: "Cours des vivriers, céréales, maraîchers, poisson, viande, riz, lait et matières premières sur les marchés ivoiriens.",
};

export default async function MarketsPage() {
  const quotes = await getQuotes();
  const markets = [...new Set(quotes.map((quote) => quote.marketName))];
  const products = [...new Set(quotes.map((quote) => quote.productName))];
  const releve = quotes[0]?.recordedOn;
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · Observatoire
      </p>
      <p className="kicker dark">Vivriers · céréales · maraîchers · matières premières</p>
      <h1>Les cours des marchés locaux.</h1>
      <p className="lede" style={{ color: "var(--muted)", maxWidth: 720 }}>
        Sucre, huile, farine, poisson, viande, riz, lait, maïs, mil, sorgho, tomate, oignon et les grandes matières premières. Relevé du {releve ? formatDay(releve) : "jour"} par les délégués COCOMCI. Prix en francs CFA, arrondis à 5 francs.
      </p>
      <div className="note" style={{ margin: "1rem 0" }}>
        Méthode : un étal de référence par place, unité déclarée, gros et détail distingués. La fourchette est celle observée dans la semaine. Un cours national unique n&apos;est pas publié quand le produit voyage mal.
      </div>
      <MarketsBoard quotes={quotes} />
      <section className="section">
        <PriceReportForm markets={markets} products={products} />
      </section>
    </div>
  );
}
