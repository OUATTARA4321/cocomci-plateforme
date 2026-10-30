import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/rich-text";
import { categoryLabels, formatDay } from "@/lib/format";
import { getArticle, getArticles } from "@/lib/queries";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article introuvable" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const related = (await getArticles())
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 2);

  return (
    <article className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/actualites">Actualités</Link> · {categoryLabels[article.category]}
      </p>
      <span className="tag">{categoryLabels[article.category]}</span>
      <h1 style={{ maxWidth: "18ch" }}>{article.title}</h1>
      <p className="muted">
        {article.author} · {article.location} · {formatDay(article.publishedAt)}
      </p>
      <div className="article-hero">
        <img src={article.image} alt="" />
      </div>
      <div className="split" style={{ marginTop: 18 }}>
        <RichText content={article.content} />
        <aside>
          <div className="panel">
            <p className="kicker dark">Dans la même rubrique</p>
            {related.length === 0 ? <p>Aucun autre article pour le moment.</p> : null}
            {related.map((item) => (
              <p key={item.slug}>
                <Link href={`/actualites/${item.slug}`}>
                  <b>{item.title}</b>
                </Link>
                <br />
                <span className="muted">{formatDay(item.publishedAt)}</span>
              </p>
            ))}
            <Link className="btn btn-line btn-small" href="/marches">
              Voir les cours
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
