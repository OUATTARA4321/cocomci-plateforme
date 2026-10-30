import {
  boolean,
  date,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const regions = pgTable("regions", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 140 }).notNull(),
  code: varchar("code", { length: 8 }).notNull().unique(),
  district: varchar("district", { length: 140 }).notNull(),
  chefLieu: varchar("chef_lieu", { length: 120 }).notNull(),
  kind: varchar("kind", { length: 24 }).notNull().default("region"),
  description: text("description").notNull(),
});

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  regionId: integer("region_id")
    .notNull()
    .references(() => regions.id),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  isChefLieu: boolean("is_chef_lieu").notNull().default(false),
});

export const markets = pgTable("markets", {
  id: serial("id").primaryKey(),
  cityId: integer("city_id")
    .notNull()
    .references(() => cities.id),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 180 }).notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  zone: varchar("zone", { length: 40 }).notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 140 }).notNull(),
  category: varchar("category", { length: 40 }).notNull(),
  unit: varchar("unit", { length: 40 }).notNull(),
  note: text("note"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  badgeNumber: varchar("badge_number", { length: 40 }).notNull().unique(),
  firstName: varchar("first_name", { length: 80 }).notNull(),
  lastName: varchar("last_name", { length: 80 }).notNull(),
  role: varchar("role", { length: 180 }).notNull(),
  bureauLevel: varchar("bureau_level", { length: 32 }).notNull(),
  sector: varchar("sector", { length: 140 }).notNull(),
  marketName: varchar("market_name", { length: 180 }),
  shopName: varchar("shop_name", { length: 180 }),
  cityId: integer("city_id")
    .notNull()
    .references(() => cities.id),
  regionId: integer("region_id")
    .notNull()
    .references(() => regions.id),
  phone: varchar("phone", { length: 40 }),
  email: varchar("email", { length: 160 }),
  sinceYear: integer("since_year").notNull(),
  status: varchar("status", { length: 32 }).notNull().default("actif"),
  bio: text("bio"),
  portrait: text("portrait"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteAssets = pgTable("site_assets", {
  key: varchar("key", { length: 40 }).primaryKey(),
  mimeType: varchar("mime_type", { length: 60 }).notNull(),
  imageData: text("image_data").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const memberPhotos = pgTable("member_photos", {
  memberId: integer("member_id")
    .primaryKey()
    .references(() => members.id, { onDelete: "cascade" }),
  mimeType: varchar("mime_type", { length: 40 }).notNull(),
  imageData: text("image_data").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: varchar("title", { length: 240 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 48 }).notNull(),
  author: varchar("author", { length: 140 }).notNull(),
  location: varchar("location", { length: 140 }),
  image: varchar("image", { length: 240 }).notNull(),
  publishedAt: timestamp("published_at").notNull(),
  featured: boolean("featured").notNull().default(false),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 220 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 180 }).notNull(),
  startsAt: timestamp("starts_at").notNull(),
  endsAt: timestamp("ends_at"),
  type: varchar("type", { length: 48 }).notNull(),
  status: varchar("status", { length: 32 }).notNull(),
});

export const priceQuotes = pgTable("price_quotes", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  marketId: integer("market_id")
    .notNull()
    .references(() => markets.id),
  price: integer("price").notNull(),
  previousPrice: integer("previous_price").notNull(),
  minPrice: integer("min_price").notNull(),
  maxPrice: integer("max_price").notNull(),
  recordedOn: date("recorded_on").notNull(),
  source: varchar("source", { length: 160 }).notNull(),
});

export const exchangeRates = pgTable("exchange_rates", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 8 }).notNull(),
  name: varchar("name", { length: 80 }).notNull(),
  symbol: varchar("symbol", { length: 8 }).notNull(),
  rate: numeric("rate", { precision: 14, scale: 4 }).notNull(),
  recordedOn: date("recorded_on").notNull(),
});

export const adhesions = pgTable("adhesions", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 32 }).notNull().unique(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: varchar("email", { length: 160 }),
  city: varchar("city", { length: 120 }).notNull(),
  region: varchar("region", { length: 140 }).notNull(),
  sector: varchar("sector", { length: 140 }).notNull(),
  shopName: varchar("shop_name", { length: 180 }),
  message: text("message"),
  status: varchar("status", { length: 32 }).notNull().default("recue"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const priceReports = pgTable("price_reports", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 32 }).notNull().unique(),
  reporterName: varchar("reporter_name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  marketName: varchar("market_name", { length: 180 }).notNull(),
  productName: varchar("product_name", { length: 140 }).notNull(),
  price: integer("price").notNull(),
  unit: varchar("unit", { length: 40 }).notNull(),
  note: text("note"),
  status: varchar("status", { length: 32 }).notNull().default("a_verifier"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
