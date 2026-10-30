"use client";

import { useMemo, useState } from "react";
import { formatFcfa, formatVariation, productCategoryLabels, variation } from "@/lib/format";
import type { QuoteRow } from "@/lib/types";

const categories = ["", "vivrier", "cereale", "maraicher", "proteine", "matiere-premiere"];

export function MarketsBoard({ quotes }: { quotes: QuoteRow[] }) {
  const [category, setCategory] = useState("");
  const [market, setMarket] = useState("adjame");
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState("riz-importe");
  const [mode, setMode] = useState<"place" | "comparer">("place");

  const markets = useMemo(() => {
    const map = new Map<string, string>();
    quotes.forEach((quote) => map.set(quote.marketSlug, quote.marketName));
    return [...map.entries()];
  }, [quotes]);

  const products = useMemo(() => {
    const map = new Map<string, QuoteRow>();
    quotes.forEach((quote) => {
      if (!map.has(quote.productSlug)) map.set(quote.productSlug, quote);
    });
    return [...map.values()];
  }, [quotes]);

  const placeRows = quotes
    .filter((quote) => quote.marketSlug === market)
    .filter((quote) => !category || quote.category === category)
    .filter((quote) => quote.productName.toLowerCase().includes(query.toLowerCase().trim()));

  const compareRows = quotes
    .filter((quote) => quote.productSlug === product)
    .slice()
    .sort((a, b) => a.price - b.price);

  const selected = products.find((item) => item.productSlug === product);
  const maxCompare = Math.max(...compareRows.map((row) => row.price), 1);
  const releve = quotes[0]?.recordedOn;

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: 12 }}>
        <button className={`chip ${mode === "place" ? "active" : ""}`} aria-pressed={mode === "place"} onClick={() => setMode("place")}>
          Une place de marché
        </button>
        <button className={`chip ${mode === "comparer" ? "active" : ""}`} aria-pressed={mode === "comparer"} onClick={() => setMode("comparer")}>
          Comparer un produit
        </button>
      </div>

      {mode === "place" ? (
        <>
          <div className="filters">
            <select value={market} aria-label="Marché" onChange={(event) => setMarket(event.target.value)}>
              {markets.map(([slug, name]) => (
                <option key={slug} value={slug}>
                  {name}
                </option>
              ))}
            </select>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Sucre, riz, poisson…" aria-label="Filtrer les produits" />
          </div>
          <div className="chip-row" style={{ marginBottom: 12 }}>
            {categories.map((item) => (
              <button key={item || "tous"} className={`chip ${category === item ? "active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}>
                {item ? productCategoryLabels[item] : "Tout le panier"}
              </button>
            ))}
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Famille</th>
                  <th>Unité</th>
                  <th>Cours</th>
                  <th>Écart</th>
                  <th>Fourchette</th>
                </tr>
              </thead>
              <tbody>
                {placeRows.map((row) => {
                  const delta = variation(row.price, row.previousPrice);
                  return (
                    <tr key={row.productSlug}>
                      <td>
                        <b>{row.productName}</b>
                      </td>
                      <td>{productCategoryLabels[row.category]}</td>
                      <td>{row.unit}</td>
                      <td>{formatFcfa(row.price)}</td>
                      <td className={delta > 0.4 ? "up" : delta < -0.4 ? "down" : "flat"}>{formatVariation(delta)}</td>
                      <td>
                        {formatFcfa(row.minPrice)} – {formatFcfa(row.maxPrice)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="split">
          <div>
            <div className="filters">
              <select value={product} aria-label="Produit" onChange={(event) => setProduct(event.target.value)}>
                {products.map((item) => (
                  <option key={item.productSlug} value={item.productSlug}>
                    {item.productName}
                  </option>
                ))}
              </select>
            </div>
            <div className="bars">
              {compareRows.map((row) => (
                <div className="bar-row" key={row.marketSlug}>
                  <span>
                    {row.marketName}
                    <br />
                    <small className="muted">
                      {row.cityName} · {row.marketType}
                    </small>
                  </span>
                  <div className="bar" aria-hidden="true">
                    <span style={{ width: `${(row.price / maxCompare) * 100}%` }} />
                  </div>
                  <b>{formatFcfa(row.price)}</b>
                </div>
              ))}
            </div>
          </div>
          <aside className="panel">
            <p className="kicker dark">Lecture du cours</p>
            <h3 style={{ fontFamily: "var(--display)", fontWeight: 560, marginTop: 6 }}>{selected?.productName}</h3>
            <p className="muted">Unité suivie : {selected?.unit}. Relevé du {releve?.split("-").reverse().join("/")}.</p>
            <p>{selected?.note}</p>
            <p className="muted">Le marché de gros cote en principe sous le détail. Un écart plus large signale le transport, la saison ou une rupture de camion.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
