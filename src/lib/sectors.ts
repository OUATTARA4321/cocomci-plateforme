export const sectorCatalog = [
  {
    value: "Produits vivriers",
    family: "Commerce alimentaire",
    description: "Produits vivriers, tubercules, plantain et denrées de consommation courante.",
  },
  {
    value: "Riz, sucre, huile et farine",
    family: "Commerce alimentaire",
    description: "Importation, gros et détail des produits de grande consommation du panier quotidien.",
  },
  {
    value: "Céréales",
    family: "Commerce alimentaire",
    description: "Riz, maïs, mil, sorgho, arachide et autres grains.",
  },
  {
    value: "Maraîchers",
    family: "Commerce alimentaire",
    description: "Tomate, oignon, piment, gombo, aubergine, chou et autres légumes frais.",
  },
  {
    value: "Poisson et mareyage",
    family: "Commerce alimentaire",
    description: "Poisson frais ou fumé, débarquement, mareyage, transformation et distribution.",
  },
  {
    value: "Viande et boucherie",
    family: "Commerce alimentaire",
    description: "Boucherie, volaille, viande et produits carnés.",
  },
  {
    value: "Épicerie et produits de grande consommation",
    family: "Commerce alimentaire",
    description: "Épiceries de quartier, lait, conserves, boissons et produits ménagers.",
  },
  {
    value: "Matières premières agricoles",
    family: "Commerce alimentaire",
    description: "Cacao, café, anacarde, coton, karité et produits de campagne.",
  },
  {
    value: "Quincaillerie",
    family: "Équipement et construction",
    description: "Matériaux, outillage, plomberie, électricité et fournitures de chantier.",
  },
  {
    value: "Textile et Habillement",
    family: "Textile et mode",
    description: "Tissus, pagnes, vêtements, chaussures, accessoires et confection.",
  },
  {
    value: "Appareils et Électroménagers",
    family: "Équipement et maison",
    description: "Appareils électriques, électroménager, équipement domestique et pièces associées.",
  },
  {
    value: "Téléphones et Électronique",
    family: "Électronique et numérique",
    description: "Téléphones, informatique, électronique grand public et accessoires.",
  },
  {
    value: "Pièces Détachées",
    family: "Automobile et mécanique",
    description: "Pièces automobiles, motos, accessoires et composants mécaniques.",
  },
  {
    value: "Prestations de Services",
    family: "Services",
    description: "Transport, logistique, réparation, conseil et autres prestations aux opérateurs.",
  },
  {
    value: "Cosmétiques",
    family: "Beauté et bien-être",
    description: "Cosmétiques, produits de beauté, hygiène et soins personnels.",
  },
  {
    value: "Commerce général",
    family: "Commerce et distribution",
    description: "Activités de commerce et de distribution ne relevant pas d'une filière spécifique.",
  },
] as const;

export const sectorOptions = sectorCatalog.map((sector) => sector.value);

export function isKnownSector(value: string) {
  return sectorOptions.includes(value as (typeof sectorOptions)[number]);
}
