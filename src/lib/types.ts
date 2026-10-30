export type MemberCard = {
  id: number;
  badgeNumber: string;
  firstName: string;
  lastName: string;
  role: string;
  bureauLevel: string;
  sector: string;
  marketName: string | null;
  shopName: string | null;
  phone: string | null;
  email: string | null;
  sinceYear: number;
  status: string;
  bio: string | null;
  portrait: string | null;
  cityName: string;
  citySlug: string;
  regionName: string;
  regionSlug: string;
  regionCode: string;
  district: string;
};

export type RegionCard = {
  id: number;
  slug: string;
  name: string;
  code: string;
  district: string;
  chefLieu: string;
  kind: string;
  description: string;
  memberCount: number;
  cityCount: number;
};

export type ArticleCard = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  location: string | null;
  image: string;
  publishedAt: string;
  featured: boolean;
};

export type ActivityCard = {
  id: number;
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string | null;
  type: string;
  status: string;
};

export type QuoteRow = {
  productSlug: string;
  productName: string;
  category: string;
  unit: string;
  note: string | null;
  sortOrder: number;
  marketSlug: string;
  marketName: string;
  marketType: string;
  cityName: string;
  regionName: string;
  price: number;
  previousPrice: number;
  minPrice: number;
  maxPrice: number;
  recordedOn: string;
};

export type RatePoint = {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  recordedOn: string;
};

export type SubmissionRow = {
  id: number;
  reference?: string;
  title: string;
  detail: string;
  meta: string;
  status: string;
  createdAt: string;
};
