import type { Metadata } from "next";
import Link from "next/link";
import { categoryLabels, formatDay } from "@/lib/format";
import { getArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Informations, économie et activités de la COCOMCI et du commerce intérieur ivoirien.",
};

const filters = [
  { href: "/actualites", label: "Tout", key: "" },
  { href: "/actualites?rubrique=commerce-interieur", label: "Commerce intérieur", key: "commerce-interieur" },
  { href: "/actualites?rubrique=economie", label: "Économie", key: "economie" },
  { href: "/actualites?rubrique=activites", label: "Activités", key: "activites" },
  { href: "/actualites?rubrique=informations", label: "Informations", key: "informations" },
];

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ rubrique?: string }> }) {
  const { rubrique } = await searchParams;
  const articles = (await getArticles()).filter((article) => !rubrique || article.category === rubrique);
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · Journal
      </p>
      <p className="kicker dark">Commerce intérieur · économie · coordination</p>
      <h1>L&apos;actualité du métier.</h1>
      <div className="chip-row" style={{ margin: "1rem 0" }}>
        {filters.map((filter) => (
          <Link key={filter.key || "tout"} href={filter.href} className={`chip ${ (rubrique ?? "") === filter.key ? "active" : ""}`}>
            {filter.label}
          </Link>
        ))}
      </div>
      <div className="news-grid">
        {articles.map((article) => (
          <Link key={article.slug} href={`/actualites/${article.slug}`} className="news-card">
            <div className="news-media">
              <img src={article.image} alt="" />
            </div>
            <div>
              <span className="tag">{categoryLabels[article.category]}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <span className="more">
                {article.location} · {formatDay(article.publishedAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
