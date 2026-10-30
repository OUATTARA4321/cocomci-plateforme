export const categoryLabels: Record<string, string> = {
  "commerce-interieur": "Commerce intérieur",
  economie: "Économie",
  activites: "Activités COCOMCI",
  informations: "Informations",
};

export const productCategoryLabels: Record<string, string> = {
  vivrier: "Vivriers",
  cereale: "Céréales",
  maraicher: "Maraîchers",
  proteine: "Poisson & viande",
  "matiere-premiere": "Matières premières",
};

export const levelLabels: Record<string, string> = {
  national: "Bureau national",
  regional: "Bureau régional",
  communal: "Ville / commune",
  membre: "Membre",
};

export function isCoordinatorRole(role: string) {
  return role
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .includes("coordinat");
}

export function isGeneralSecretaryRole(role: string) {
  const value = role
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return value.startsWith("secretaire general") && !value.includes("adjoint");
}

export function isTerritorialOffice(member: { role: string; bureauLevel: string }) {
  return member.bureauLevel !== "national" && member.bureauLevel !== "membre" && (isCoordinatorRole(member.role) || isGeneralSecretaryRole(member.role));
}

export const activityTypeLabels: Record<string, string> = {
  assemblee: "Assemblée",
  formation: "Formation",
  foire: "Foire",
  audience: "Audience",
  sensibilisation: "Sensibilisation",
  installation: "Installation",
  observatoire: "Observatoire",
};

export const statusLabels: Record<string, string> = {
  actif: "Badge valide",
  suspendu: "Badge suspendu",
  a_venir: "À venir",
  en_cours: "En cours",
  termine: "Tenu",
  recue: "Reçue",
  en_instruction: "En instruction",
  badge_en_preparation: "Badge en préparation",
  close: "Clôturée",
  a_verifier: "À vérifier",
  retenu: "Retenu",
  ecarte: "Écarté",
};

export function formatFcfa(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(Math.round(value))}\u00A0F`;
}

export function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatDay(value: string | Date) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(y, m - 1, d)));
  }
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Abidjan",
  }).format(date);
}

export function formatDayTime(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Abidjan",
  }).format(date);
}

export function variation(price: number, previous: number) {
  if (!previous) return 0;
  return ((price - previous) / previous) * 100;
}

export function formatVariation(value: number) {
  const sign = value > 0.05 ? "+" : "";
  return `${sign}${value.toFixed(1).replace(".", ",")}\u00A0%`;
}

export function initials(firstName: string, lastName: string) {
  const a = firstName.trim().charAt(0);
  const b = lastName.trim().charAt(0);
  return `${a}${b}`.toUpperCase();
}

export function maskPhone(phone: string | null) {
  if (!phone) return "Non publié";
  const digits = phone.replace(/\D/g, "");
  return `+225 ··· ${digits.slice(-4)}`;
}

export function phoneDigits(phone: string | null) {
  if (!phone) return "";
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (!digits.startsWith("225")) digits = `225${digits}`;
  return digits;
}

export function telLink(phone: string | null) {
  const digits = phoneDigits(phone);
  return digits ? `tel:+${digits}` : "";
}

export function whatsappLink(phone: string | null, message?: string) {
  const digits = phoneDigits(phone);
  if (!digits) return "";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function activityStatus(startsAt: Date, endsAt: Date | null) {
  const now = Date.now();
  const start = startsAt.getTime();
  const end = (endsAt ?? startsAt).getTime();
  if (now < start) return "a_venir";
  if (now <= end) return "en_cours";
  return "termine";
}
