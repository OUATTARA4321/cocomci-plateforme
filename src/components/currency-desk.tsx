"use client";

import { useMemo, useState } from "react";
import { formatNumber, formatVariation, variation } from "@/lib/format";
import type { RatePoint } from "@/lib/types";

export function CurrencyDesk({ rates }: { rates: RatePoint[] }) {
  const latestDay = rates.at(-1)?.recordedOn ?? "";
  const codes = useMemo(() => {
    const map = new Map<string, RatePoint>();
    rates.filter((rate) => rate.recordedOn === latestDay).forEach((rate) => map.set(rate.code, rate));
    return [...map.values()];
  }, [rates, latestDay]);

  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("XOF");

  function rateOf(code: string) {
    if (code === "XOF") return 1;
    return codes.find((item) => item.code === code)?.rate ?? 1;
  }

  const numeric = Number(amount.replace(",", ".")) || 0;
  const inXof = numeric * rateOf(from);
  const converted = to === "XOF" ? inXof : inXof / rateOf(to);

  return (
    <div className="split">
      <div className="form-card">
        <p className="kicker dark">Convertisseur</p>
        <h2 style={{ fontFamily: "var(--display)", fontWeight: 560, marginTop: 4 }}>Via le franc CFA</h2>
        <div className="form-grid" style={{ marginTop: 12 }}>
          <div className="field">
            <label htmlFor="amount">Montant</label>
            <input id="amount" inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="from">De</label>
            <select id="from" value={from} onChange={(event) => setFrom(event.target.value)}>
              <option value="XOF">Franc CFA (XOF)</option>
              {codes.map((rate) => (
                <option key={rate.code} value={rate.code}>
                  {rate.code} — {rate.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="to">Vers</label>
            <select id="to" value={to} onChange={(event) => setTo(event.target.value)}>
              <option value="XOF">Franc CFA (XOF)</option>
              {codes.map((rate) => (
                <option key={rate.code} value={rate.code}>
                  {rate.code} — {rate.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="quote" style={{ color: "var(--forest)", marginTop: 16 }}>
          {formatNumber(converted, to === "XOF" || from === "NGN" ? 0 : 2)} {to === "XOF" ? "FCFA" : to}
        </p>
        <p className="muted">
          {formatNumber(numeric, 2)} {from} = {formatNumber(inXof, 0)} FCFA. L&apos;euro est arrimé à 655,957 FCFA. Les autres cours sont indicatifs, datés du relevé, et ne remplacent pas le guichet bancaire.
        </p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Devise</th>
              <th>1 unité en FCFA</th>
              <th>7 jours</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {codes.map((rate) => {
              const history = rates.filter((item) => item.code === rate.code);
              const previous = history.at(-2)?.rate ?? rate.rate;
              const delta = variation(rate.rate, previous);
              const points = history.map((item) => item.rate);
              const min = Math.min(...points);
              const max = Math.max(...points);
              const path = points
                .map((point, index) => {
                  const x = (index / Math.max(points.length - 1, 1)) * 92;
                  const y = max === min ? 14 : 26 - ((point - min) / (max - min)) * 22;
                  return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
                })
                .join(" ");
              return (
                <tr key={rate.code}>
                  <td>
                    <b>{rate.code}</b>
                    <div className="muted">{rate.name}</div>
                  </td>
                  <td>{formatNumber(rate.rate, rate.rate < 1 ? 3 : 3)}</td>
                  <td className={delta > 0.05 ? "up" : delta < -0.05 ? "down" : "flat"}>{formatVariation(delta)}</td>
                  <td>
                    <svg className="spark" viewBox="0 0 92 28" aria-hidden="true">
                      <path d={path} />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
