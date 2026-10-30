import { eq, isNull } from "drizzle-orm";
import { db, pool } from "@/db";
import { cities, members, regions } from "@/db/schema";
import { marketSeed } from "@/db/seed-content";
import { isCoordinatorRole, isGeneralSecretaryRole } from "@/lib/format";

const women = [
  "Aïcha",
  "Akissi",
  "Amoin",
  "Assetou",
  "Bintou",
  "Adjoua",
  "Affoué",
  "Amenan",
  "Mariam",
  "Massandjé",
  "Naminata",
  "Pélagie",
  "Rokia",
  "Salimata",
  "Téné",
  "Awa",
  "Fanta",
  "Madjara",
  "Odette",
  "Justine",
];

const men = [
  "Adama",
  "Amara",
  "Bakary",
  "Daouda",
  "Drissa",
  "Ibrahim",
  "Issa",
  "Lacina",
  "Losseni",
  "Mamadou",
  "Oumar",
  "Seydou",
  "Siaka",
  "Souleymane",
  "Vamara",
  "Yacouba",
  "Zoumana",
  "Brahima",
  "Karim",
  "Abdoulaye",
];

const lasts = [
  "Bamba",
  "Cissé",
  "Coulibaly",
  "Dembélé",
  "Diabaté",
  "Diallo",
  "Fofana",
  "Kamagaté",
  "Keita",
  "Konaté",
  "Koné",
  "Ouattara",
  "Sanogo",
  "Soro",
  "Traoré",
  "Touré",
  "Silué",
  "Dosso",
  "Yeo",
  "Barro",
  "Dao",
  "Tuo",
  "Hien",
  "Goré",
  "Méité",
];

const sectors = ["Vivriers", "Céréales", "Poisson et viande", "Maraîchers", "Commerce général", "Produits de grande consommation", "Tubercules", "Épicerie"];

function normalizeName(value: string) {
  return Array.from(value.normalize("NFD"))
    .filter((character) => {
      const code = character.codePointAt(0) ?? 0;
      return code < 768 || code > 879;
    })
    .join("")
    .toLowerCase();
}

const portraitSets = {
  masculine: [1, 3, 5, 7, 10, 12, 13, 15],
  feminine: [2, 4, 6, 8, 9, 11, 14, 16],
} as const;
const feminineNames = new Set(
  [
    "aicha", "akissi", "amoin", "assetou", "awa", "adjoua", "affoue", "amenan", "mariam", "massandje",
    "naminata", "pelagie", "rokia", "salimata", "tene", "fanta", "odette", "justine", "fatoumata",
    "chantal", "ahou", "edwige", "madjara", "esther", "brigitte", "blanche", "leonie", "lou", "naferima",
    "ouma", "oumou", "mariatou", "aya", "elise", "bintou", "aminata", "adjoua",
  ].map(normalizeName),
);

function hash(value: string) {
  let h = 0;
  for (const char of value) h = (h * 33 + char.charCodeAt(0)) >>> 0;
  return h;
}

async function assignIllustrativePortraits() {
  const missing = await db
    .select({ id: members.id, badgeNumber: members.badgeNumber, firstName: members.firstName })
    .from(members)
    .where(isNull(members.portrait));
  if (missing.length === 0) return;

  await db.transaction(async (tx) => {
    for (const member of missing) {
      const firstName = normalizeName(member.firstName);
      const set = feminineNames.has(firstName) ? portraitSets.feminine : portraitSets.masculine;
      const image = set[hash(member.badgeNumber) % set.length];
      const portrait = `/images/members/portraits/portrait-${String(image).padStart(2, "0")}.jpg`;
      await tx.update(members).set({ portrait }).where(eq(members.id, member.id));
    }
  });
}

function person(key: string, taken: Set<string>) {
  for (let offset = 0; offset < 48; offset += 1) {
    const h = hash(`${key}:${offset}`);
    const female = h % 2 === 0;
    const first = (female ? women : men)[h % women.length];
    const last = lasts[(h >>> 4) % lasts.length];
    const id = `${first}|${last}`;
    if (taken.has(id)) continue;
    taken.add(id);
    return { first, last, female };
  }
  const fallback = hash(key);
  return { first: women[fallback % women.length], last: lasts[fallback % lasts.length], female: true };
}

function phone(key: string) {
  const n = String(10000000 + (hash(key) % 90000000)).padStart(8, "0");
  return `+225 07 ${n.slice(0, 2)} ${n.slice(2, 4)} ${n.slice(4, 6)} ${n.slice(6, 8)}`;
}

function marketName(citySlug: string, cityName: string) {
  return marketSeed.find((market) => market.city === citySlug)?.name ?? `Marché de ${cityName}`;
}

type OfficeDraft = {
  badgeNumber: string;
  firstName: string;
  lastName: string;
  role: string;
  bureauLevel: "regional" | "communal";
  sector: string;
  marketName: string;
  shopName: string;
  cityId: number;
  regionId: number;
  phone: string;
  email: string;
  sinceYear: number;
  status: "actif";
  bio: string;
};

export async function syncTerritorialOffices() {
  await pool.query(`UPDATE members SET role = 'Coordinateur régional' WHERE role = 'Président régional'`);
  await pool.query(`UPDATE members SET role = 'Coordinatrice régionale' WHERE role = 'Présidente régionale'`);
  await pool.query(`UPDATE members SET role = 'Coordinatrice de district' WHERE role ILIKE 'Présidente du district%'`);
  await pool.query(
    `UPDATE members SET role = 'Coordinatrice de ville', bureau_level = 'communal' WHERE badge_number = 'COC-SCO-2023-0218'`,
  );
  await pool.query(
    `UPDATE articles SET content = replace(content, 'président régional', 'coordinateur régional') WHERE content ILIKE '%président régional%'`,
  );
  await pool.query(
    `UPDATE articles SET content = replace(content, 'présidents régionaux', 'coordinateurs régionaux') WHERE content ILIKE '%présidents régionaux%'`,
  );
  await pool.query(
    `UPDATE activities SET description = replace(description, 'président régional', 'coordinateur régional') WHERE description ILIKE '%président régional%'`,
  );

  const regionRows = await db.select().from(regions);
  const cityRows = await db.select().from(cities);
  const current = await db
    .select({
      badgeNumber: members.badgeNumber,
      role: members.role,
      bureauLevel: members.bureauLevel,
      regionId: members.regionId,
      cityId: members.cityId,
      firstName: members.firstName,
      lastName: members.lastName,
    })
    .from(members);

  const taken = new Set(current.map((member) => `${member.firstName}|${member.lastName}`));
  const drafts: OfficeDraft[] = [];

  for (const region of regionRows) {
    const chef = cityRows.find((city) => city.regionId === region.id && city.isChefLieu) ?? cityRows.find((city) => city.regionId === region.id);
    if (!chef) continue;
    const district = region.kind === "district";
    const place = district ? region.name : `la région ${region.name}`;
    const hasCoord = current.some(
      (member) => member.regionId === region.id && member.bureauLevel === "regional" && isCoordinatorRole(member.role),
    );
    const hasSg = current.some(
      (member) => member.regionId === region.id && member.bureauLevel === "regional" && isGeneralSecretaryRole(member.role),
    );
    if (!hasCoord) {
      drafts.push(
        draftOffice({
          key: `region-coord-${region.slug}`,
          badgeNumber: `COC-${region.code}-2022-RC01`,
          level: "regional",
          place,
          city: chef,
          region,
          kind: district ? "district-coord" : "region-coord",
          taken,
        }),
      );
    }
    if (!hasSg) {
      drafts.push(
        draftOffice({
          key: `region-sg-${region.slug}`,
          badgeNumber: `COC-${region.code}-2023-RS01`,
          level: "regional",
          place,
          city: chef,
          region,
          kind: district ? "district-sg" : "region-sg",
          taken,
        }),
      );
    }
  }

  const citiesByRegion = new Map<number, typeof cityRows>();
  for (const city of cityRows) {
    const list = citiesByRegion.get(city.regionId) ?? [];
    list.push(city);
    citiesByRegion.set(city.regionId, list);
  }

  for (const region of regionRows) {
    const localCities = (citiesByRegion.get(region.id) ?? []).slice().sort((a, b) => a.name.localeCompare(b.name, "fr"));
    localCities.forEach((city, index) => {
      const seq = String(index + 1).padStart(2, "0");
      const communal = region.slug === "abidjan";
      const place = communal ? `la commune ${city.name}` : `la ville de ${city.name}`;
      const hasCoord = current.some(
        (member) => member.cityId === city.id && member.bureauLevel === "communal" && isCoordinatorRole(member.role),
      );
      const hasSg = current.some(
        (member) => member.cityId === city.id && member.bureauLevel === "communal" && isGeneralSecretaryRole(member.role),
      );
      if (!hasCoord) {
        drafts.push(
          draftOffice({
            key: `city-coord-${city.slug}`,
            badgeNumber: `COC-${region.code}-2024-C${seq}1`,
            level: "communal",
            place,
            city,
            region,
            kind: communal ? "commune-coord" : "ville-coord",
            taken,
          }),
        );
      }
      if (!hasSg) {
        drafts.push(
          draftOffice({
            key: `city-sg-${city.slug}`,
            badgeNumber: `COC-${region.code}-2024-S${seq}2`,
            level: "communal",
            place,
            city,
            region,
            kind: communal ? "commune-sg" : "ville-sg",
            taken,
          }),
        );
      }
    });
  }

  if (drafts.length > 0) {
    await db.insert(members).values(drafts).onConflictDoNothing({ target: members.badgeNumber });
  }
  await assignIllustrativePortraits();
}

function draftOffice(input: {
  key: string;
  badgeNumber: string;
  level: "regional" | "communal";
  place: string;
  city: { id: number; name: string; slug: string };
  region: { id: number; name: string; code: string; slug: string };
  kind: "region-coord" | "region-sg" | "district-coord" | "district-sg" | "ville-coord" | "ville-sg" | "commune-coord" | "commune-sg";
  taken: Set<string>;
}): OfficeDraft {
  const who = person(input.key, input.taken);
  const role = roleFor(input.kind, who.female);
  const able = who.female ? "habilitée" : "habilité";
  const year = 2021 + (hash(input.key) % 4);
  return {
    badgeNumber: input.badgeNumber,
    firstName: who.first,
    lastName: who.last,
    role,
    bureauLevel: input.level,
    sector: sectors[hash(input.key + "sector") % sectors.length],
    marketName: marketName(input.city.slug, input.city.name),
    shopName: input.level === "regional" ? `Bureau COCOMCI · ${input.region.name}` : `Bureau COCOMCI · ${input.city.name}`,
    cityId: input.city.id,
    regionId: input.region.id,
    phone: phone(input.badgeNumber),
    email: `${input.kind.includes("sg") ? "sg" : "coord"}.${input.level === "regional" ? input.region.slug : input.city.slug}@cocomci.ci`,
    sinceYear: year,
    status: "actif",
    bio: `${role} pour ${input.place}. Badge validé par le secrétariat général : ${who.female ? "elle est" : "il est"} ${able} à représenter les opérateurs, à convoquer le bureau et à contresigner les relevés de la place.`,
  };
}

function roleFor(kind: string, female: boolean) {
  const map: Record<string, [string, string]> = {
    "region-coord": ["Coordinateur régional", "Coordinatrice régionale"],
    "region-sg": ["Secrétaire général régional", "Secrétaire générale régionale"],
    "district-coord": ["Coordinateur de district", "Coordinatrice de district"],
    "district-sg": ["Secrétaire général de district", "Secrétaire générale de district"],
    "ville-coord": ["Coordinateur de ville", "Coordinatrice de ville"],
    "ville-sg": ["Secrétaire général de ville", "Secrétaire générale de ville"],
    "commune-coord": ["Coordinateur communal", "Coordinatrice communale"],
    "commune-sg": ["Secrétaire général communal", "Secrétaire générale communale"],
  };
  const pair = map[kind] ?? ["Coordinateur", "Coordinatrice"];
  return female ? pair[1] : pair[0];
}
