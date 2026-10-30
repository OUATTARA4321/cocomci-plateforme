import Link from "next/link";
import { OfficialBadge } from "@/components/official-badge";
import { OfficePair } from "@/components/office-pair";
import { Partners } from "@/components/partners";
import {
  categoryLabels,
  formatDay,
  formatFcfa,
  formatNumber,
  formatVariation,
  isCoordinatorRole,
  isGeneralSecretaryRole,
  variation,
} from "@/lib/format";
import {
  getActivities,
  getArticles,
  getMemberByBadge,
  getMembers,
  getQuotes,
  getRates,
  getRegions,
  getStats,
} from "@/lib/queries";

const rubriques = [
  {
    href: "/membres",
    title: "Annuaire & badges",
    text: "Les opérateurs identifiés, par région, ville et marché. Chaque badge est vérifiable publiquement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2.5" />
        <circle cx="12" cy="10" r="2.6" />
        <path d="M8 17c.8-2 2.3-3 4-3s3.2 1 4 3" />
      </svg>
    ),
  },
  {
    href: "/bureaux",
    title: "Bureaux territoriaux",
    text: "Coordinateurs et secrétaires généraux des régions, villes et communes, avec contacts directs et WhatsApp.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-6.5-5.3-6.5-10a6.5 6.5 0 0 1 13 0c0 4.7-6.5 10-6.5 10Z" />
        <circle cx="12" cy="10.6" r="2.4" />
      </svg>
    ),
  },
  {
    href: "/marches",
    title: "Cours des marchés",
    text: "Sucre, huile, farine, riz, poisson, viande, lait, céréales et maraîchers : le relevé daté, place par place.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M7.5 15.5 11 11l3 2.6 4.5-5.6" />
      </svg>
    ),
  },
  {
    href: "/devises",
    title: "Cours des devises",
    text: "Euro, dollar, livre, yuan, naira, cedi : le change indicatif du franc CFA et le convertisseur des opérateurs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.2 9.3c.5-1 1.6-1.7 2.8-1.7 1.8 0 3.2 1.2 3.2 2.7s-1.4 2.6-3.2 2.7c-1.8 0-3.2 1.1-3.2 2.6S10.2 18 12 18c1.2 0 2.3-.6 2.8-1.6" />
        <path d="M12 5.5v13" />
      </svg>
    ),
  },
  {
    href: "/actualites",
    title: "Actualités",
    text: "Commerce intérieur, économie, informations et activités : le journal officiel de la coordination.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M7.5 9.5h9M7.5 13h9M7.5 16.5h5" />
      </svg>
    ),
  },
  {
    href: "/adherer",
    title: "Adhésion & filières",
    text: "Vivriers, quincaillerie, textile, électronique, services… Déposez votre demande et recevez le badge officiel.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="8.5" r="3.2" />
        <path d="M4.5 19c.9-3 3-4.6 5.5-4.6s4.6 1.6 5.5 4.6" />
        <path d="M17.5 7.5v5M20 10h-5" />
      </svg>
    ),
  },
];

export default async function HomePage() {
  const [stats, articles, quotes, rates, activities, regions, president, people] = await Promise.all([
    getStats(),
    getArticles(),
    getQuotes(),
    getRates(),
    getActivities(),
    getRegions(),
    getMemberByBadge("COC-GBK-2019-0001"),
    getMembers(),
  ]);

  const staples = ["sucre-blanc", "huile-raffinee", "farine-ble", "riz-importe", "poisson-fume", "viande-boeuf", "lait-poudre", "tomate", "oignon"];
  const ticker = quotes.filter((quote) => quote.marketSlug === "adjame" && staples.includes(quote.productSlug));
  const tickerLoop = [...ticker, ...ticker];
  const movers = quotes
    .filter((quote) => quote.marketSlug === "adjame")
    .map((quote) => ({ ...quote, delta: variation(quote.price, quote.previousPrice) }))
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, 6);
  const latestRates = ["USD", "EUR", "GBP", "CNY"].map((code) => rates.filter((rate) => rate.code === code).at(-1)).filter(Boolean);
  const previewOffices = ["gbeke", "abidjan"].map((slug) => ({
    slug,
    name: regions.find((region) => region.slug === slug)?.name ?? slug,
    members: people.filter(
      (member) => member.regionSlug === slug && member.bureauLevel === "regional" && (isCoordinatorRole(member.role) || isGeneralSecretaryRole(member.role)),
    ),
  }));
  const upcoming = activities.filter((activity) => activity.status !== "termine").slice(0, 3);
  const featured = articles.filter((article) => article.featured).slice(0, 3);
  const covered = regions.filter((region) => region.memberCount > 0).slice(0, 8);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker">Bouaké · 7 septembre 2019 · Bureau national exécutif</p>
            <h1>La voix organisée des marchés de Côte d&apos;Ivoire.</h1>
            <p className="lede">
              La COCOMCI fédère les opérateurs de commerce, délivre le badge officiel par région et par ville, et publie les cours des vivriers, des céréales, des maraîchers et des devises.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/membres">
                Annuaire des badges
              </Link>
              <Link className="btn btn-ghost" href="/marches">
                Cours du jour
              </Link>
            </div>
            <div className="hero-metrics">
              <div>
                <strong>{stats.members}</strong>
                <span>badges actifs</span>
              </div>
              <div>
                <strong>{stats.regions}</strong>
                <span>régions & districts</span>
              </div>
              <div>
                <strong>{stats.markets}</strong>
                <span>marchés suivis</span>
              </div>
              <div>
                <strong>{stats.products}</strong>
                <span>produits cotés</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img className="cover" src="/images/pattern-hero.jpg" alt="Grand marché au soleil couchant, étals de tomates, riz, maïs et poisson fumé" />
            {president ? (
              <div className="float-card">
                <OfficialBadge member={president} size="sm" />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="ticker-wrap" aria-label="Cours du marché d'Adjamé">
          <div className="ticker-label">Adjamé · {stats.releve ? formatDay(stats.releve) : "relevé"}</div>
          <div className="ticker">
            <div className="ticker-track">
              {tickerLoop.map((quote, index) => {
                const delta = variation(quote.price, quote.previousPrice);
                return (
                  <span className="tick" key={`${quote.productSlug}-${index}`}>
                    <b>{quote.productName}</b>
                    <span>{formatFcfa(quote.price)}</span>
                    <span className={delta > 0.4 ? "up" : delta < -0.4 ? "down" : "flat"}>{formatVariation(delta)}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker dark">Nos rubriques</p>
              <h2>Tout le service public du commerce, en six portes.</h2>
            </div>
          </div>
          <div className="rubrique-grid">
            {rubriques.map((rubrique, index) => (
              <Link key={rubrique.href} href={rubrique.href} className="rubrique-card">
                <span className="rubrique-icon">{rubrique.icon}</span>
                <span className="rubrique-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{rubrique.title}</h3>
                <p>{rubrique.text}</p>
                <span className="rubrique-go" aria-hidden="true">
                  Consulter →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="band president-grid">
            <img src="/images/president.jpg" alt="Portrait institutionnel de KAMAGATÉ Lamine, président du Bureau national exécutif" />
            <div>
              <p className="kicker">Mot du Président</p>
              <p className="quote">« Nous voulons l&apos;union sacrée de tous les commerçants du pays autour de leur coordination. »</p>
              <p>
                Le 7 septembre 2019, le congrès de Bouaké a transformé le collectif en coordination. Le mandat n&apos;a pas changé : installer des relais sur tout le territoire, faire approprier la carte de commerçant, et donner aux autorités un regard clair sur celles et ceux qui tiennent les marchés.
              </p>
              <p className="signature">KAMAGATÉ Lamine · Président du Bureau national exécutif · Bouaké</p>
              <Link className="btn btn-gold" href="/president">
                Lire le message
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker dark">Journal de la coordination</p>
              <h2>Commerce intérieur, économie, activités.</h2>
            </div>
            <Link href="/actualites" className="btn btn-line btn-small">
              Toutes les actualités
            </Link>
          </div>
          <div className="news-grid">
            {featured.map((article, index) => (
              <Link key={article.slug} href={`/actualites/${article.slug}`} className={`news-card ${index === 0 ? "feature" : ""}`}>
                <div className="news-media">
                  <img src={article.image} alt="" />
                </div>
                <div>
                  <span className="tag">{categoryLabels[article.category]}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <span className="more">Lire · {formatDay(article.publishedAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap observatory-grid">
          <div>
            <div className="section-head">
              <div>
                <p className="kicker dark">Observatoire · gros d&apos;Adjamé</p>
                <h2>Les mouvements du relevé.</h2>
              </div>
              <Link href="/marches" className="btn btn-line btn-small">
                Les marchés
              </Link>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Cours</th>
                    <th>Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {movers.map((row) => (
                    <tr key={row.productSlug}>
                      <td>
                        <b>{row.productName}</b>
                        <div className="muted">{row.unit}</div>
                      </td>
                      <td>{formatFcfa(row.price)}</td>
                      <td className={row.delta > 0.4 ? "up" : row.delta < -0.4 ? "down" : "flat"}>{formatVariation(row.delta)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="section-head">
              <div>
                <p className="kicker dark">Change indicatif</p>
                <h2>Le franc CFA face aux devises.</h2>
              </div>
              <Link href="/devises" className="btn btn-line btn-small">
                Convertir
              </Link>
            </div>
            <div className="rate-stack">
              {latestRates.map((rate) =>
                rate ? (
                  <div className="rate-pill" key={rate.code}>
                    <span>
                      1 {rate.code} · {rate.name}
                    </span>
                    <strong>{formatNumber(rate.rate, rate.rate < 20 ? 3 : 2)} F</strong>
                  </div>
                ) : null,
              )}
            </div>
            <p className="muted" style={{ marginTop: 10 }}>
              L&apos;euro reste arrimé à 655,957 FCFA. Relevé indicatif de l&apos;observatoire, daté et non contractuel.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker dark">Bureaux territoriaux</p>
              <h2>Coordinateurs et secrétaires généraux, badges validés.</h2>
            </div>
            <Link href="/bureaux" className="btn btn-line btn-small">
              Tous les bureaux
            </Link>
          </div>
          <div className="split">
            {previewOffices.map((office) => (
              <article key={office.slug} className="office-region">
                <h3>{office.name}</h3>
                <p className="muted">Binôme régional, même discipline que le Bureau national exécutif.</p>
                <OfficePair members={office.members} size="sm" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <div>
            <div className="section-head">
              <div>
                <p className="kicker dark">Agenda</p>
                <h2>Ce que la coordination prépare.</h2>
              </div>
              <Link href="/activites" className="btn btn-line btn-small">
                Activités
              </Link>
            </div>
            <div className="activity-list">
              {upcoming.map((activity) => (
                <article key={activity.id} className="activity-card">
                  <div className="when">{formatDay(activity.startsAt)}</div>
                  <div>
                    <h3>{activity.title}</h3>
                    <p className="muted" style={{ margin: 0 }}>
                      {activity.location}
                    </p>
                  </div>
                  <span className={`tag ${activity.status === "en_cours" ? "green" : ""}`}>
                    {activity.status === "en_cours" ? "En cours" : "À venir"}
                  </span>
                </article>
              ))}
            </div>
          </div>
          <div>
            <div className="section-head">
              <div>
                <p className="kicker dark">Maillage</p>
                <h2>Des relais déjà nommés.</h2>
              </div>
              <Link href="/regions" className="btn btn-line btn-small">
                Territoire
              </Link>
            </div>
            <div className="region-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {covered.map((region) => (
                <Link key={region.slug} href={`/regions/${region.slug}`} className="region-card">
                  <small>{region.district}</small>
                  <b>{region.name}</b>
                  <span className="count-dot">
                    {region.memberCount} badge{region.memberCount > 1 ? "s" : ""}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Partners />

      <section className="section" style={{ paddingTop: "1.4rem" }}>
        <div className="wrap cta-band">
          <div>
            <p className="kicker">Carte de commerçant · badge officiel</p>
            <h2>Rejoindre la coordination, ou vérifier un titre.</h2>
            <p>L&apos;adhésion est instruite par le secrétariat général. Le badge n&apos;est pas automatique : il atteste une activité, une ville et un marché.</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="btn btn-primary" href="/adherer">
              Déposer une demande
            </Link>
            <Link className="btn btn-ghost" href="/verifier">
              Vérifier un badge
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
