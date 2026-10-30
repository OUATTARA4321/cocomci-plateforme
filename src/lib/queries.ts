import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  activities,
  adhesions,
  articles,
  cities,
  contacts,
  exchangeRates,
  markets,
  members,
  priceQuotes,
  priceReports,
  products,
  regions,
} from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { activityStatus } from "@/lib/format";
import type {
  ActivityCard,
  ArticleCard,
  MemberCard,
  QuoteRow,
  RatePoint,
  RegionCard,
  SubmissionRow,
} from "@/lib/types";

const memberSelect = {
  id: members.id,
  badgeNumber: members.badgeNumber,
  firstName: members.firstName,
  lastName: members.lastName,
  role: members.role,
  bureauLevel: members.bureauLevel,
  sector: members.sector,
  marketName: members.marketName,
  shopName: members.shopName,
  phone: members.phone,
  email: members.email,
  sinceYear: members.sinceYear,
  status: members.status,
  bio: members.bio,
  portrait: members.portrait,
  cityName: cities.name,
  citySlug: cities.slug,
  regionName: regions.name,
  regionSlug: regions.slug,
  regionCode: regions.code,
  district: regions.district,
};

export async function getMembers(): Promise<MemberCard[]> {
  await ensureSeeded();
  const rows = await db
    .select(memberSelect)
    .from(members)
    .innerJoin(cities, eq(members.cityId, cities.id))
    .innerJoin(regions, eq(members.regionId, regions.id))
    .orderBy(asc(members.lastName), asc(members.firstName));
  return rows;
}

export async function getMemberByBadge(badge: string): Promise<MemberCard | null> {
  await ensureSeeded();
  const rows = await db
    .select(memberSelect)
    .from(members)
    .innerJoin(cities, eq(members.cityId, cities.id))
    .innerJoin(regions, eq(members.regionId, regions.id))
    .where(eq(members.badgeNumber, badge.trim().toUpperCase()))
    .limit(1);
  return rows[0] ?? null;
}

export async function getBureau() {
  const all = await getMembers();
  return all.filter((member) => member.bureauLevel === "national");
}

export async function getCities() {
  await ensureSeeded();
  return db
    .select({
      slug: cities.slug,
      name: cities.name,
      isChefLieu: cities.isChefLieu,
      regionSlug: regions.slug,
    })
    .from(cities)
    .innerJoin(regions, eq(cities.regionId, regions.id))
    .orderBy(asc(cities.name));
}

export async function getRegions(): Promise<RegionCard[]> {
  await ensureSeeded();
  const regionRows = await db.select().from(regions).orderBy(asc(regions.name));
  const cityRows = await db.select().from(cities);
  const memberRows = await db.select({ regionId: members.regionId }).from(members);
  return regionRows.map((region) => ({
    id: region.id,
    slug: region.slug,
    name: region.name,
    code: region.code,
    district: region.district,
    chefLieu: region.chefLieu,
    kind: region.kind,
    description: region.description,
    memberCount: memberRows.filter((member) => member.regionId === region.id).length,
    cityCount: cityRows.filter((city) => city.regionId === region.id).length,
  }));
}

export async function getRegion(slug: string) {
  const all = await getRegions();
  const region = all.find((item) => item.slug === slug);
  if (!region) return null;
  const cityRows = await db.select().from(cities).where(eq(cities.regionId, region.id)).orderBy(asc(cities.name));
  const people = (await getMembers()).filter((member) => member.regionSlug === slug);
  return { region, cities: cityRows, members: people };
}

export async function getArticles(): Promise<ArticleCard[]> {
  await ensureSeeded();
  const rows = await db.select().from(articles).orderBy(desc(articles.publishedAt));
  return rows.map((article) => ({
    ...article,
    publishedAt: article.publishedAt.toISOString(),
  }));
}

export async function getArticle(slug: string) {
  const all = await getArticles();
  return all.find((article) => article.slug === slug) ?? null;
}

export async function getActivities(): Promise<ActivityCard[]> {
  await ensureSeeded();
  const rows = await db.select().from(activities).orderBy(asc(activities.startsAt));
  return rows.map((activity) => ({
    id: activity.id,
    title: activity.title,
    description: activity.description,
    location: activity.location,
    startsAt: activity.startsAt.toISOString(),
    endsAt: activity.endsAt ? activity.endsAt.toISOString() : null,
    type: activity.type,
    status: activityStatus(activity.startsAt, activity.endsAt),
  }));
}

export async function getQuotes(): Promise<QuoteRow[]> {
  await ensureSeeded();
  const rows = await db
    .select({
      productSlug: products.slug,
      productName: products.name,
      category: products.category,
      unit: products.unit,
      note: products.note,
      sortOrder: products.sortOrder,
      marketSlug: markets.slug,
      marketName: markets.name,
      marketType: markets.type,
      cityName: cities.name,
      regionName: regions.name,
      price: priceQuotes.price,
      previousPrice: priceQuotes.previousPrice,
      minPrice: priceQuotes.minPrice,
      maxPrice: priceQuotes.maxPrice,
      recordedOn: priceQuotes.recordedOn,
    })
    .from(priceQuotes)
    .innerJoin(products, eq(priceQuotes.productId, products.id))
    .innerJoin(markets, eq(priceQuotes.marketId, markets.id))
    .innerJoin(cities, eq(markets.cityId, cities.id))
    .innerJoin(regions, eq(cities.regionId, regions.id))
    .orderBy(asc(products.sortOrder), asc(markets.name));
  return rows;
}

export async function getRates(): Promise<RatePoint[]> {
  await ensureSeeded();
  const rows = await db.select().from(exchangeRates).orderBy(asc(exchangeRates.recordedOn));
  return rows.map((row) => ({
    code: row.code,
    name: row.name,
    symbol: row.symbol,
    rate: Number(row.rate),
    recordedOn: row.recordedOn,
  }));
}

export async function getStats() {
  const [people, regionRows, quoteRows, rateRows] = await Promise.all([
    getMembers(),
    getRegions(),
    getQuotes(),
    getRates(),
  ]);
  const marketsCovered = new Set(quoteRows.map((quote) => quote.marketSlug)).size;
  const productsCovered = new Set(quoteRows.map((quote) => quote.productSlug)).size;
  return {
    members: people.filter((member) => member.status === "actif").length,
    regionsWithMembers: regionRows.filter((region) => region.memberCount > 0).length,
    regions: regionRows.length,
    markets: marketsCovered,
    products: productsCovered,
    releve: quoteRows[0]?.recordedOn ?? "",
    rateDay: rateRows.at(-1)?.recordedOn ?? "",
  };
}

export async function getSubmissions() {
  await ensureSeeded();
  const [adh, msgs, reports] = await Promise.all([
    db.select().from(adhesions).orderBy(desc(adhesions.createdAt)),
    db.select().from(contacts).orderBy(desc(contacts.createdAt)),
    db.select().from(priceReports).orderBy(desc(priceReports.createdAt)),
  ]);
  const adhesionRows: SubmissionRow[] = adh.map((row) => ({
    id: row.id,
    reference: row.reference,
    title: row.fullName,
    detail: `${row.sector} · ${row.city} · ${row.region}${row.shopName ? ` · ${row.shopName}` : ""}`,
    meta: row.phone + (row.email ? ` · ${row.email}` : "") + (row.message ? ` — ${row.message}` : ""),
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  }));
  const contactRows: SubmissionRow[] = msgs.map((row) => ({
    id: row.id,
    title: row.subject,
    detail: row.fullName,
    meta: `${row.email} — ${row.message}`,
    status: "recue",
    createdAt: row.createdAt.toISOString(),
  }));
  const reportRows: SubmissionRow[] = reports.map((row) => ({
    id: row.id,
    reference: row.reference,
    title: `${row.productName} · ${row.price.toLocaleString("fr-FR")} F / ${row.unit}`,
    detail: row.marketName,
    meta: `${row.reporterName}${row.phone ? ` · ${row.phone}` : ""}${row.note ? ` — ${row.note}` : ""}`,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  }));
  return { adhesions: adhesionRows, contacts: contactRows, reports: reportRows };
}
