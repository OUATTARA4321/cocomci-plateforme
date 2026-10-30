import { sql } from "drizzle-orm";
import { db, pool } from "@/db";
import {
  activities,
  articles,
  cities,
  exchangeRates,
  markets,
  members,
  priceQuotes,
  products,
  regions,
} from "@/db/schema";
import {
  activitySeed,
  articleSeed,
  citySeed,
  currencySeed,
  marketSeed,
  memberSeed,
  productSeed,
  regionSeed,
} from "@/db/seed-content";
import { syncTerritorialOffices } from "@/db/offices";
import { slugify } from "@/lib/format";

const RELEVE = "2026-10-29";

function hash(value: string) {
  let h = 0;
  for (const char of value) h = (h * 33 + char.charCodeAt(0)) >>> 0;
  return h;
}

function describeRegion(name: string, chefLieu: string, district: string) {
  return `La coordination de ${name} relie les opérateurs du chef-lieu ${chefLieu} et des marchés du district ${district}. Elle délivre le relais du badge officiel, accompagne la carte de commerçant et remonte les cours vers le Bureau national exécutif.`;
}

function quoteFor(base: number, product: string, market: { slug: string; zone: string; type: string }) {
  let factor = 1;
  if (market.type === "gros") factor *= 0.94;
  if (market.type === "detail") factor *= 1.08;
  if (market.zone === "nord" && ["mais", "mil", "sorgho", "riz-local", "arachide", "karite", "anacarde"].includes(product)) {
    factor *= 0.9;
  }
  if (market.zone === "nord" && product.startsWith("poisson")) factor *= 1.18;
  if (market.zone === "littoral" && product.startsWith("poisson")) factor *= 0.84;
  if (market.zone === "littoral" && ["mais", "mil", "riz-local", "igname"].includes(product)) factor *= 1.07;
  if (market.zone === "ouest" && ["plantain", "igname", "manioc"].includes(product)) factor *= 0.9;
  if (market.zone === "est" && product === "cafe") factor *= 0.94;
  if (market.zone === "centre-ouest" && product === "cacao") factor *= 0.96;
  if (market.slug === "bouake" && product === "riz-local") factor *= 0.93;
  if (market.slug === "cocody") factor *= 1.05;
  if (market.slug === "bondoukou" && product === "anacarde") factor *= 0.92;

  const jitter = 1 + ((hash(product + market.slug) % 11) - 5) / 100;
  const price = Math.max(5, Math.round((base * factor * jitter) / 5) * 5);
  const swing = ((hash(`${product}:${market.slug}:prev`) % 15) - 6) / 100;
  let previous = Math.max(5, Math.round((price / (1 + swing)) / 5) * 5);
  if (previous === price) previous = Math.max(5, price + (hash(product) % 2 === 0 ? -10 : 15));
  const minPrice = Math.min(price, previous, Math.round((price * 0.93) / 5) * 5);
  const maxPrice = Math.max(price, previous, Math.round((price * 1.08) / 5) * 5);
  return { price, previousPrice: previous, minPrice, maxPrice };
}

const basePrices: Record<string, number> = {
  "sucre-blanc": 875,
  "sucre-roux": 825,
  "huile-raffinee": 1380,
  "huile-palme": 980,
  farine: 0,
  "farine-ble": 650,
  "riz-local": 520,
  "riz-importe": 470,
  "riz-parfume": 740,
  mais: 280,
  mil: 400,
  sorgho: 350,
  "poisson-fume": 3400,
  "poisson-frais": 3900,
  "viande-boeuf": 4300,
  "viande-poulet": 2650,
  "lait-poudre": 3700,
  "lait-caille": 780,
  tomate: 750,
  oignon: 560,
  piment: 1150,
  gombo: 680,
  aubergine: 520,
  chou: 420,
  plantain: 460,
  igname: 410,
  manioc: 260,
  arachide: 920,
  cacao: 1850,
  cafe: 1280,
  anacarde: 640,
  coton: 325,
  karite: 2300,
};

function shiftDate(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

const bootstrapSql = [
  `CREATE TABLE IF NOT EXISTS regions (
    id serial PRIMARY KEY,
    slug varchar(80) NOT NULL UNIQUE,
    name varchar(140) NOT NULL,
    code varchar(8) NOT NULL UNIQUE,
    district varchar(140) NOT NULL,
    chef_lieu varchar(120) NOT NULL,
    kind varchar(24) NOT NULL DEFAULT 'region',
    description text NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS cities (
    id serial PRIMARY KEY,
    region_id integer NOT NULL REFERENCES regions(id),
    name varchar(120) NOT NULL,
    slug varchar(120) NOT NULL UNIQUE,
    is_chef_lieu boolean NOT NULL DEFAULT false
  )`,
  `CREATE TABLE IF NOT EXISTS markets (
    id serial PRIMARY KEY,
    city_id integer NOT NULL REFERENCES cities(id),
    slug varchar(120) NOT NULL UNIQUE,
    name varchar(180) NOT NULL,
    type varchar(32) NOT NULL,
    zone varchar(40) NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS products (
    id serial PRIMARY KEY,
    slug varchar(80) NOT NULL UNIQUE,
    name varchar(140) NOT NULL,
    category varchar(40) NOT NULL,
    unit varchar(40) NOT NULL,
    note text,
    sort_order integer NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS members (
    id serial PRIMARY KEY,
    badge_number varchar(40) NOT NULL UNIQUE,
    first_name varchar(80) NOT NULL,
    last_name varchar(80) NOT NULL,
    role varchar(180) NOT NULL,
    bureau_level varchar(32) NOT NULL,
    sector varchar(140) NOT NULL,
    market_name varchar(180),
    shop_name varchar(180),
    city_id integer NOT NULL REFERENCES cities(id),
    region_id integer NOT NULL REFERENCES regions(id),
    phone varchar(40),
    email varchar(160),
    since_year integer NOT NULL,
    status varchar(32) NOT NULL DEFAULT 'actif',
    bio text,
    portrait text,
    created_at timestamp NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS site_assets (
    key varchar(40) PRIMARY KEY,
    mime_type varchar(60) NOT NULL,
    image_data text NOT NULL,
    updated_at timestamp NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS member_photos (
    member_id integer PRIMARY KEY REFERENCES members(id) ON DELETE CASCADE,
    mime_type varchar(40) NOT NULL,
    image_data text NOT NULL,
    updated_at timestamp NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS articles (
    id serial PRIMARY KEY,
    slug varchar(180) NOT NULL UNIQUE,
    title varchar(240) NOT NULL,
    excerpt text NOT NULL,
    content text NOT NULL,
    category varchar(48) NOT NULL,
    author varchar(140) NOT NULL,
    location varchar(140),
    image varchar(240) NOT NULL,
    published_at timestamp NOT NULL,
    featured boolean NOT NULL DEFAULT false
  )`,
  `CREATE TABLE IF NOT EXISTS activities (
    id serial PRIMARY KEY,
    title varchar(220) NOT NULL,
    description text NOT NULL,
    location varchar(180) NOT NULL,
    starts_at timestamp NOT NULL,
    ends_at timestamp,
    type varchar(48) NOT NULL,
    status varchar(32) NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS price_quotes (
    id serial PRIMARY KEY,
    product_id integer NOT NULL REFERENCES products(id),
    market_id integer NOT NULL REFERENCES markets(id),
    price integer NOT NULL,
    previous_price integer NOT NULL,
    min_price integer NOT NULL,
    max_price integer NOT NULL,
    recorded_on date NOT NULL,
    source varchar(160) NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS exchange_rates (
    id serial PRIMARY KEY,
    code varchar(8) NOT NULL,
    name varchar(80) NOT NULL,
    symbol varchar(8) NOT NULL,
    rate numeric(14,4) NOT NULL,
    recorded_on date NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS adhesions (
    id serial PRIMARY KEY,
    reference varchar(32) NOT NULL UNIQUE,
    full_name varchar(160) NOT NULL,
    phone varchar(40) NOT NULL,
    email varchar(160),
    city varchar(120) NOT NULL,
    region varchar(140) NOT NULL,
    sector varchar(140) NOT NULL,
    shop_name varchar(180),
    message text,
    status varchar(32) NOT NULL DEFAULT 'recue',
    created_at timestamp NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS contacts (
    id serial PRIMARY KEY,
    full_name varchar(160) NOT NULL,
    email varchar(160) NOT NULL,
    subject varchar(200) NOT NULL,
    message text NOT NULL,
    created_at timestamp NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS price_reports (
    id serial PRIMARY KEY,
    reference varchar(32) NOT NULL UNIQUE,
    reporter_name varchar(160) NOT NULL,
    phone varchar(40),
    market_name varchar(180) NOT NULL,
    product_name varchar(140) NOT NULL,
    price integer NOT NULL,
    unit varchar(40) NOT NULL,
    note text,
    status varchar(32) NOT NULL DEFAULT 'a_verifier',
    created_at timestamp NOT NULL DEFAULT now()
  )`,
];

async function ensureSchema() {
  for (const statement of bootstrapSql) {
    await pool.query(statement);
  }
}

let seeding: Promise<void> | null = null;

export function ensureSeeded() {
  if (!seeding) {
    seeding = runSeed().catch((error) => {
      seeding = null;
      throw error;
    });
  }
  return seeding;
}

async function runSeed() {
  await ensureSchema();
  await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(842019)`);
    const existing = await tx.select({ id: regions.id }).from(regions).limit(1);
    if (existing.length > 0) return;

    const insertedRegions = await tx
      .insert(regions)
      .values(
        regionSeed.map((region) => ({
          slug: region.slug,
          name: region.name,
          code: region.code,
          district: region.district,
          chefLieu: region.chefLieu,
          kind: region.kind,
          description: describeRegion(region.name, region.chefLieu, region.district),
        })),
      )
      .returning();
    const regionId = new Map(insertedRegions.map((region) => [region.slug, region.id]));

    const insertedCities = await tx
      .insert(cities)
      .values(
        citySeed.map((city) => ({
          regionId: regionId.get(city.region)!,
          name: city.name,
          slug: slugify(city.name),
          isChefLieu: Boolean(city.chef),
        })),
      )
      .returning();
    const cityBySlug = new Map(insertedCities.map((city) => [city.slug, city]));

    const insertedMarkets = await tx
      .insert(markets)
      .values(
        marketSeed.map((market) => ({
          cityId: cityBySlug.get(market.city)!.id,
          slug: market.slug,
          name: market.name,
          type: market.type,
          zone: market.zone,
        })),
      )
      .returning();
    const marketBySlug = new Map(insertedMarkets.map((market) => [market.slug, market]));

    const insertedProducts = await tx
      .insert(products)
      .values(
        productSeed.map((product) => ({
          slug: product.slug,
          name: product.name,
          category: product.category,
          unit: product.unit,
          note: product.note,
          sortOrder: product.sortOrder,
        })),
      )
      .returning();

    await tx.insert(members).values(
      memberSeed.map((member) => {
        const city = cityBySlug.get(member.city);
        if (!city) throw new Error(`Ville inconnue pour ${member.badge}: ${member.city}`);
        return {
          badgeNumber: member.badge,
          firstName: member.firstName,
          lastName: member.lastName,
          role: member.role,
          bureauLevel: member.level,
          sector: member.sector,
          marketName: member.market ?? null,
          shopName: member.shop ?? null,
          cityId: city.id,
          regionId: city.regionId,
          phone: member.phone,
          email: member.email ?? null,
          sinceYear: member.since,
          status: member.status ?? "actif",
          bio: member.bio,
          portrait: member.portrait ?? null,
        };
      }),
    );

    await tx.insert(articles).values(
      articleSeed.map((article) => ({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        author: article.author,
        location: article.location,
        image: article.image,
        publishedAt: new Date(article.publishedAt),
        featured: article.featured,
      })),
    );

    await tx.insert(activities).values(
      activitySeed.map((activity) => ({
        title: activity.title,
        description: activity.description,
        location: activity.location,
        startsAt: new Date(activity.startsAt),
        endsAt: activity.endsAt ? new Date(activity.endsAt) : null,
        type: activity.type,
        status: "a_venir",
      })),
    );

    const quoteRows = insertedProducts.flatMap((product) =>
      marketSeed.map((market) => {
        const base = basePrices[product.slug];
        if (!base) throw new Error(`Prix de base manquant: ${product.slug}`);
        const figures = quoteFor(base, product.slug, market);
        return {
          productId: product.id,
          marketId: marketBySlug.get(market.slug)!.id,
          price: figures.price,
          previousPrice: figures.previousPrice,
          minPrice: figures.minPrice,
          maxPrice: figures.maxPrice,
          recordedOn: RELEVE,
          source: "Observatoire COCOMCI",
        };
      }),
    );
    await tx.insert(priceQuotes).values(quoteRows);

    const rateRows = currencySeed.flatMap((currency) =>
      Array.from({ length: 10 }, (_, index) => {
        const dayOffset = index - 9;
        const recordedOn = shiftDate(RELEVE, dayOffset);
        let rate = currency.rate;
        if (currency.code !== "EUR" && currency.code !== "XAF") {
          const wave = Math.sin((index + hash(currency.code)) / 3) * 0.012;
          const drift = (index - 9) * 0.0015;
          rate = Number((currency.rate * (1 + wave + drift)).toFixed(4));
        }
        return {
          code: currency.code,
          name: currency.name,
          symbol: currency.symbol,
          rate: rate.toFixed(4),
          recordedOn,
        };
      }),
    );
    await tx.insert(exchangeRates).values(rateRows);
  });
  await syncTerritorialOffices();
}
