export const regionSeed = [
  { slug: "abidjan", name: "Abidjan", code: "ABJ", district: "District autonome d'Abidjan", chefLieu: "Abidjan", kind: "district" },
  { slug: "yamoussoukro", name: "Yamoussoukro", code: "YAK", district: "District autonome de Yamoussoukro", chefLieu: "Yamoussoukro", kind: "district" },
  { slug: "gbokle", name: "Gbôklé", code: "GBO", district: "Bas-Sassandra", chefLieu: "Sassandra", kind: "region" },
  { slug: "nawa", name: "Nawa", code: "NAW", district: "Bas-Sassandra", chefLieu: "Soubré", kind: "region" },
  { slug: "san-pedro", name: "San-Pédro", code: "SPE", district: "Bas-Sassandra", chefLieu: "San-Pédro", kind: "region" },
  { slug: "indenie-djuablin", name: "Indénié-Djuablin", code: "IDJ", district: "Comoé", chefLieu: "Abengourou", kind: "region" },
  { slug: "sud-comoe", name: "Sud-Comoé", code: "SCO", district: "Comoé", chefLieu: "Aboisso", kind: "region" },
  { slug: "folon", name: "Folon", code: "FOL", district: "Denguélé", chefLieu: "Minignan", kind: "region" },
  { slug: "kabadougou", name: "Kabadougou", code: "KAB", district: "Denguélé", chefLieu: "Odienné", kind: "region" },
  { slug: "goh", name: "Gôh", code: "GOH", district: "Gôh-Djiboua", chefLieu: "Gagnoa", kind: "region" },
  { slug: "loh-djiboua", name: "Lôh-Djiboua", code: "LDJ", district: "Gôh-Djiboua", chefLieu: "Divo", kind: "region" },
  { slug: "belier", name: "Bélier", code: "BEL", district: "Lacs", chefLieu: "Toumodi", kind: "region" },
  { slug: "iffou", name: "Iffou", code: "IFF", district: "Lacs", chefLieu: "Daoukro", kind: "region" },
  { slug: "moronou", name: "Moronou", code: "MOR", district: "Lacs", chefLieu: "Bongouanou", kind: "region" },
  { slug: "nzi", name: "N'Zi", code: "NZI", district: "Lacs", chefLieu: "Dimbokro", kind: "region" },
  { slug: "agneby-tiassa", name: "Agnéby-Tiassa", code: "AGT", district: "Lagunes", chefLieu: "Agboville", kind: "region" },
  { slug: "grands-ponts", name: "Grands-Ponts", code: "GRP", district: "Lagunes", chefLieu: "Dabou", kind: "region" },
  { slug: "la-me", name: "La Mé", code: "LME", district: "Lagunes", chefLieu: "Adzopé", kind: "region" },
  { slug: "cavally", name: "Cavally", code: "CAV", district: "Montagnes", chefLieu: "Guiglo", kind: "region" },
  { slug: "guemon", name: "Guémon", code: "GUE", district: "Montagnes", chefLieu: "Duékoué", kind: "region" },
  { slug: "tonkpi", name: "Tonkpi", code: "TON", district: "Montagnes", chefLieu: "Man", kind: "region" },
  { slug: "haut-sassandra", name: "Haut-Sassandra", code: "HSA", district: "Sassandra-Marahoué", chefLieu: "Daloa", kind: "region" },
  { slug: "marahoue", name: "Marahoué", code: "MAR", district: "Sassandra-Marahoué", chefLieu: "Bouaflé", kind: "region" },
  { slug: "bagoue", name: "Bagoué", code: "BGE", district: "Savanes", chefLieu: "Boundiali", kind: "region" },
  { slug: "poro", name: "Poro", code: "POR", district: "Savanes", chefLieu: "Korhogo", kind: "region" },
  { slug: "tchologo", name: "Tchologo", code: "TCH", district: "Savanes", chefLieu: "Ferkessédougou", kind: "region" },
  { slug: "gbeke", name: "Gbêkê", code: "GBK", district: "Vallée du Bandama", chefLieu: "Bouaké", kind: "region" },
  { slug: "hambol", name: "Hambol", code: "HBL", district: "Vallée du Bandama", chefLieu: "Katiola", kind: "region" },
  { slug: "bafing", name: "Bafing", code: "BAF", district: "Woroba", chefLieu: "Touba", kind: "region" },
  { slug: "bere", name: "Béré", code: "BER", district: "Woroba", chefLieu: "Mankono", kind: "region" },
  { slug: "worodougou", name: "Worodougou", code: "WOR", district: "Woroba", chefLieu: "Séguéla", kind: "region" },
  { slug: "bounkani", name: "Bounkani", code: "BKN", district: "Zanzan", chefLieu: "Bouna", kind: "region" },
  { slug: "gontougo", name: "Gontougo", code: "GON", district: "Zanzan", chefLieu: "Bondoukou", kind: "region" },
] as const;

export const citySeed: { region: string; name: string; chef?: boolean }[] = [
  { region: "abidjan", name: "Plateau", chef: true },
  { region: "abidjan", name: "Adjamé" },
  { region: "abidjan", name: "Abobo" },
  { region: "abidjan", name: "Yopougon" },
  { region: "abidjan", name: "Cocody" },
  { region: "abidjan", name: "Treichville" },
  { region: "abidjan", name: "Marcory" },
  { region: "abidjan", name: "Koumassi" },
  { region: "abidjan", name: "Port-Bouët" },
  { region: "abidjan", name: "Attécoubé" },
  { region: "abidjan", name: "Bingerville" },
  { region: "abidjan", name: "Anyama" },
  { region: "yamoussoukro", name: "Yamoussoukro", chef: true },
  { region: "gbokle", name: "Sassandra", chef: true },
  { region: "nawa", name: "Soubré", chef: true },
  { region: "san-pedro", name: "San-Pédro", chef: true },
  { region: "indenie-djuablin", name: "Abengourou", chef: true },
  { region: "indenie-djuablin", name: "Agnibilékrou" },
  { region: "sud-comoe", name: "Aboisso", chef: true },
  { region: "sud-comoe", name: "Grand-Bassam" },
  { region: "folon", name: "Minignan", chef: true },
  { region: "kabadougou", name: "Odienné", chef: true },
  { region: "goh", name: "Gagnoa", chef: true },
  { region: "loh-djiboua", name: "Divo", chef: true },
  { region: "belier", name: "Toumodi", chef: true },
  { region: "iffou", name: "Daoukro", chef: true },
  { region: "moronou", name: "Bongouanou", chef: true },
  { region: "nzi", name: "Dimbokro", chef: true },
  { region: "agneby-tiassa", name: "Agboville", chef: true },
  { region: "grands-ponts", name: "Dabou", chef: true },
  { region: "la-me", name: "Adzopé", chef: true },
  { region: "cavally", name: "Guiglo", chef: true },
  { region: "guemon", name: "Duékoué", chef: true },
  { region: "tonkpi", name: "Man", chef: true },
  { region: "haut-sassandra", name: "Daloa", chef: true },
  { region: "haut-sassandra", name: "Issia" },
  { region: "marahoue", name: "Bouaflé", chef: true },
  { region: "bagoue", name: "Boundiali", chef: true },
  { region: "poro", name: "Korhogo", chef: true },
  { region: "tchologo", name: "Ferkessédougou", chef: true },
  { region: "gbeke", name: "Bouaké", chef: true },
  { region: "gbeke", name: "Béoumi" },
  { region: "hambol", name: "Katiola", chef: true },
  { region: "bafing", name: "Touba", chef: true },
  { region: "bere", name: "Mankono", chef: true },
  { region: "worodougou", name: "Séguéla", chef: true },
  { region: "bounkani", name: "Bouna", chef: true },
  { region: "gontougo", name: "Bondoukou", chef: true },
];

export const marketSeed = [
  { slug: "adjame", name: "Marché d'Adjamé", city: "adjame", type: "gros", zone: "abidjan" },
  { slug: "treichville", name: "Marché de Treichville", city: "treichville", type: "mixte", zone: "abidjan" },
  { slug: "yopougon", name: "Grand Marché de Yopougon", city: "yopougon", type: "detail", zone: "abidjan" },
  { slug: "cocody", name: "Marché de Cocody", city: "cocody", type: "detail", zone: "abidjan" },
  { slug: "koumassi", name: "Marché de Koumassi", city: "koumassi", type: "mixte", zone: "abidjan" },
  { slug: "bouake", name: "Grand Marché de Bouaké", city: "bouake", type: "gros", zone: "centre" },
  { slug: "yamoussoukro", name: "Marché de Yamoussoukro", city: "yamoussoukro", type: "mixte", zone: "centre" },
  { slug: "korhogo", name: "Grand Marché de Korhogo", city: "korhogo", type: "gros", zone: "nord" },
  { slug: "daloa", name: "Marché de Daloa", city: "daloa", type: "mixte", zone: "ouest" },
  { slug: "san-pedro", name: "Marché de San-Pédro", city: "san-pedro", type: "mixte", zone: "littoral" },
  { slug: "man", name: "Grand Marché de Man", city: "man", type: "mixte", zone: "ouest" },
  { slug: "abengourou", name: "Marché d'Abengourou", city: "abengourou", type: "mixte", zone: "est" },
  { slug: "gagnoa", name: "Marché de Gagnoa", city: "gagnoa", type: "mixte", zone: "centre-ouest" },
  { slug: "bondoukou", name: "Marché de Bondoukou", city: "bondoukou", type: "mixte", zone: "nord" },
];

export const productSeed = [
  { slug: "sucre-blanc", name: "Sucre granulé blanc", category: "vivrier", unit: "kg", sortOrder: 1, note: "Repère de plafond souvent cité pour Abidjan et un rayon de 30 km : 875 F/kg. Les marchés de gros peuvent coter en dessous, le détail de quartier au-dessus." },
  { slug: "sucre-roux", name: "Sucre roux", category: "vivrier", unit: "kg", sortOrder: 2, note: "Repère indicatif voisin de 825 F/kg sur le bassin d'Abidjan. Écarts selon le conditionnement en vrac ou en sachet." },
  { slug: "huile-raffinee", name: "Huile raffinée", category: "vivrier", unit: "litre", sortOrder: 3, note: "Cours au litre, ramené des bidons de 0,9 L, 1,5 L et 3 L. Le plafond du format 90 cl a été communiqué autour de 1 200 F." },
  { slug: "huile-palme", name: "Huile de palme rouge", category: "matiere-premiere", unit: "litre", sortOrder: 4, note: "Huile rouge de marché, distincte de l'huile raffinée. Très sensible au transport depuis les bassins de production." },
  { slug: "farine-ble", name: "Farine de blé", category: "cereale", unit: "kg", sortOrder: 5, note: "Farine boulangère et ménagère, sac ramené au kilogramme. Les boulangeries négocient souvent un cours de gros inférieur." },
  { slug: "riz-local", name: "Riz local étuvé", category: "cereale", unit: "kg", sortOrder: 6, note: "Riz local étuvé, apprécié pour le grain. Bouaké et le centre cotent souvent plus bas que le cordon littoral." },
  { slug: "riz-importe", name: "Riz importé brisé 25 %", category: "cereale", unit: "kg", sortOrder: 7, note: "Grande consommation. Le sac de 25 kg ou 50 kg reste l'unité réelle du gros ; le cours est ramené au kilo." },
  { slug: "riz-parfume", name: "Riz parfumé", category: "cereale", unit: "kg", sortOrder: 8, note: "Segment plus cher, jasmin ou parfumé importé. Peu représentatif du panier populaire." },
  { slug: "mais", name: "Maïs grain", category: "cereale", unit: "kg", sortOrder: 9, note: "Grain sec de marché. Le nord et l'ouest offrent généralement les meilleurs cours en période de récolte." },
  { slug: "mil", name: "Mil", category: "cereale", unit: "kg", sortOrder: 10, note: "Céréale des savanes. Korhogo, Boundiali et Ferkessédougou font le prix directeur." },
  { slug: "sorgho", name: "Sorgho", category: "cereale", unit: "kg", sortOrder: 11, note: "Suivi avec le mil. La demande urbaine reste plus faible que pour le riz." },
  { slug: "poisson-fume", name: "Poisson fumé", category: "proteine", unit: "kg", sortOrder: 12, note: "Machoiron, maquereau et espèces fumées mélangées selon l'étal. Unité très hétérogène : le relevé retient le kilo trié." },
  { slug: "poisson-frais", name: "Poisson frais", category: "proteine", unit: "kg", sortOrder: 13, note: "Poisson de mer ou de lagune selon la place. San-Pédro et Abidjan tirent le cours vers le bas." },
  { slug: "viande-boeuf", name: "Viande de bœuf", category: "proteine", unit: "kg", sortOrder: 14, note: "Viande avec os, découpe courante de marché. Le filet et la viande sans os se négocient bien au-dessus." },
  { slug: "viande-poulet", name: "Poulet de chair", category: "proteine", unit: "kg", sortOrder: 15, note: "Poulet local ou importé congelé selon l'étal. Le relevé indique la pièce dominante du jour, ramenée au kilo." },
  { slug: "lait-poudre", name: "Lait en poudre", category: "vivrier", unit: "boîte 400 g", sortOrder: 16, note: "Boîte de 400 g, segment familial. Les marques premium dépassent nettement les marques d'entrée de gamme." },
  { slug: "lait-caille", name: "Lait caillé", category: "vivrier", unit: "litre", sortOrder: 17, note: "Lait caillé artisanal ou semi-industriel vendu au litre ou au sachet ramené au litre." },
  { slug: "tomate", name: "Tomate", category: "maraicher", unit: "kg", sortOrder: 18, note: "Produit le plus volatil du panier. Une semaine de pluie ou une rupture de camion peut doubler le tas." },
  { slug: "oignon", name: "Oignon", category: "maraicher", unit: "kg", sortOrder: 19, note: "Largement importé du Sahel et d'Europe selon la saison. Le filet de 25 kg fait le prix du gros." },
  { slug: "piment", name: "Piment frais", category: "maraicher", unit: "kg", sortOrder: 20, note: "Vendu souvent au tas. Le relevé convertit au kilogramme pour comparer les places." },
  { slug: "gombo", name: "Gombo", category: "maraicher", unit: "kg", sortOrder: 21, note: "Fortement saisonnier. Les marchés de l'intérieur cotent mieux en pleine production." },
  { slug: "aubergine", name: "Aubergine", category: "maraicher", unit: "kg", sortOrder: 22, note: "Aubergine africaine et variété longue selon les étals. Cours de détail dominant." },
  { slug: "chou", name: "Chou pommé", category: "maraicher", unit: "kg", sortOrder: 23, note: "Maraîcher de contre-saison, plus stable que la tomate mais sensible au transport." },
  { slug: "plantain", name: "Banane plantain", category: "vivrier", unit: "kg", sortOrder: 24, note: "Régime ramené au kilo. L'ouest forestier, notamment Man et Daloa, reste compétitif." },
  { slug: "igname", name: "Igname", category: "vivrier", unit: "kg", sortOrder: 25, note: "Igname bêtê ou kponan selon la place. Le cours au tas est converti au kilogramme." },
  { slug: "manioc", name: "Manioc frais", category: "vivrier", unit: "kg", sortOrder: 26, note: "Racine fraîche, distincte de l'attiéké et du placali déjà transformés." },
  { slug: "arachide", name: "Arachide décortiquée", category: "vivrier", unit: "kg", sortOrder: 27, note: "Arachide décortiquée de consommation. Le nord fait référence en début de campagne." },
  { slug: "cacao", name: "Cacao fèves", category: "matiere-premiere", unit: "kg", sortOrder: 28, note: "Cours indicatif de fèves marchandes, distinct du prix bord-champ garanti. Utile aux opérateurs qui financent la campagne." },
  { slug: "cafe", name: "Café robusta", category: "matiere-premiere", unit: "kg", sortOrder: 29, note: "Robusta marchand. Abengourou et l'ouest restent les places de référence intérieure." },
  { slug: "anacarde", name: "Noix de cajou brute", category: "matiere-premiere", unit: "kg", sortOrder: 30, note: "Noix brute, hors amande transformée. Bondoukou, Korhogo et le nord-est animent la campagne." },
  { slug: "coton", name: "Coton graine", category: "matiere-premiere", unit: "kg", sortOrder: 31, note: "Cours indicatif de campagne, suivi pour le pouvoir d'achat des bassins cotonniers." },
  { slug: "karite", name: "Beurre de karité", category: "matiere-premiere", unit: "kg", sortOrder: 32, note: "Beurre artisanal de marché, pas le karité raffiné d'exportation." },
];

export type MemberSeed = {
  badge: string;
  firstName: string;
  lastName: string;
  role: string;
  level: "national" | "regional" | "communal" | "membre";
  sector: string;
  market?: string;
  shop?: string;
  city: string;
  since: number;
  status?: string;
  bio: string;
  portrait?: string;
  phone: string;
  email?: string;
};

export const memberSeed: MemberSeed[] = [
  { badge: "COC-GBK-2019-0001", firstName: "Lamine", lastName: "Kamagaté", role: "Président du Bureau national exécutif", level: "national", sector: "Céréales et commerce général", market: "Grand Marché de Bouaké", shop: "Établissements Kamagaté & Fils", city: "bouake", since: 2019, portrait: "/images/president.jpg", phone: "+225 07 48 21 06 19", email: "presidence@cocomci.ci", bio: "Élu le 7 septembre 2019 à Bouaké, au premier congrès ordinaire, par 44 voix. Il porte l'union des opérateurs et l'installation des coordinations sur tout le territoire." },
  { badge: "COC-ABJ-2019-0002", firstName: "Awa", lastName: "Touré", role: "1ère vice-présidente", level: "national", sector: "Produits vivriers", market: "Marché d'Adjamé", shop: "Magasin Awa Vivriers", city: "adjame", since: 2019, phone: "+225 07 12 44 90 31", email: "awa.toure@cocomci.ci", bio: "Grossiste en riz, huile et sucre à Adjamé. Elle relie le Bureau national aux places de gros d'Abidjan." },
  { badge: "COC-HSA-2020-0003", firstName: "Jean-Baptiste", lastName: "Kouadio", role: "2e vice-président", level: "national", sector: "Tubercules et plantain", market: "Marché de Daloa", shop: "Comptoir Kouadio", city: "daloa", since: 2020, phone: "+225 05 44 18 73 02", email: "jb.kouadio@cocomci.ci", bio: "Opérateur du Haut-Sassandra, chargé du dialogue avec les bassins de production de l'ouest." },
  { badge: "COC-GBK-2019-0004", firstName: "Fulbert", lastName: "Koffi", role: "Secrétaire général national", level: "national", sector: "Organisation professionnelle", market: "Grand Marché de Bouaké", shop: "Secrétariat général", city: "bouake", since: 2019, phone: "+225 07 09 55 18 44", email: "sg@cocomci.ci", bio: "Secrétaire général depuis le congrès constitutif. Il tient l'annuaire, les badges et le calendrier des coordinations." },
  { badge: "COC-POR-2021-0005", firstName: "Mariam", lastName: "Bamba", role: "Secrétaire générale adjointe", level: "national", sector: "Céréales des savanes", market: "Grand Marché de Korhogo", shop: "Bamba Céréales", city: "korhogo", since: 2021, phone: "+225 07 67 21 08 55", email: "mariam.bamba@cocomci.ci", bio: "Elle couvre le district des Savanes et remonte les cours du mil, du sorgho et de l'anacarde." },
  { badge: "COC-ABJ-2019-0006", firstName: "Issouf", lastName: "Diabaté", role: "Trésorier général", level: "national", sector: "Grossiste riz et sucre", market: "Marché d'Adjamé", shop: "Diabaté Import", city: "adjame", since: 2019, phone: "+225 01 03 28 66 41", email: "tresorerie@cocomci.ci", bio: "Tient les cotisations, les frais de badge et le fonds de solidarité des opérateurs en difficulté." },
  { badge: "COC-SPE-2021-0007", firstName: "Affoué", lastName: "N'Guessan", role: "Trésorière adjointe", level: "national", sector: "Poisson et mareyage", market: "Marché de San-Pédro", shop: "Criée Affoué", city: "san-pedro", since: 2021, phone: "+225 07 22 90 14 73", email: "affoue.nguessan@cocomci.ci", bio: "Mareyeuse à San-Pédro, elle suit les écarts entre le littoral et les marchés intérieurs." },
  { badge: "COC-YAK-2022-0008", firstName: "Salimata", lastName: "Ouattara", role: "Chargée de l'organisation", level: "national", sector: "Commerce de détail", market: "Marché de Yamoussoukro", shop: "Maison Salimata", city: "yamoussoukro", since: 2022, phone: "+225 05 18 42 77 09", email: "organisation@cocomci.ci", bio: "Coordonne l'installation des bureaux communaux et le protocole des assemblées." },
  { badge: "COC-ABJ-2020-0009", firstName: "Patrice", lastName: "Yao Kouamé", role: "Chargé des marchés et des prix", level: "national", sector: "Observatoire des prix", market: "Marché de Treichville", shop: "Cellule observatoire", city: "treichville", since: 2020, phone: "+225 07 58 11 36 20", email: "observatoire@cocomci.ci", bio: "Anime le relevé hebdomadaire des vivriers, céréales, maraîchers et matières premières." },
  { badge: "COC-ABJ-2022-0010", firstName: "Fatoumata", lastName: "Koné", role: "Chargée de la communication", level: "national", sector: "Information des opérateurs", market: "Marché de Cocody", shop: "Bureau communication", city: "cocody", since: 2022, phone: "+225 07 41 63 28 90", email: "communication@cocomci.ci", bio: "Porte la parole du Bureau et publie les notes de conjoncture du commerce intérieur." },
  { badge: "COC-GBK-2019-0011", firstName: "Drissa", lastName: "Coulibaly", role: "Chargé de la carte de commerçant", level: "national", sector: "Formalisation", market: "Grand Marché de Bouaké", shop: "Guichet carte", city: "bouake", since: 2019, phone: "+225 05 76 04 19 88", email: "carte@cocomci.ci", bio: "Accompagne les opérateurs vers la carte de commerçant et le badge officiel COCOMCI." },
  { badge: "COC-TON-2021-0012", firstName: "Chantal", lastName: "Soro", role: "Chargée des affaires féminines", level: "national", sector: "Commerce féminin", market: "Grand Marché de Man", shop: "Collectif des commerçantes", city: "man", since: 2021, phone: "+225 07 33 80 15 62", email: "femmes@cocomci.ci", bio: "Veille à la place des commerçantes dans les bureaux régionaux et les négociations de places." },
  { badge: "COC-GBK-2021-0101", firstName: "Siaka", lastName: "Konaté", role: "Coordinateur régional", level: "regional", sector: "Céréales", market: "Grand Marché de Bouaké", shop: "Konaté Frères", city: "bouake", since: 2021, phone: "+225 07 19 28 44 51", email: "gbeke@cocomci.ci", bio: "Préside la coordination du Gbêkê et relaie les dossiers du Grand Marché de Bouaké." },
  { badge: "COC-POR-2021-0102", firstName: "Assetou", lastName: "Bamba", role: "Coordinatrice régionale", level: "regional", sector: "Céréales et karité", market: "Grand Marché de Korhogo", shop: "Assetou Savanes", city: "korhogo", since: 2021, phone: "+225 05 62 17 40 33", email: "poro@cocomci.ci", bio: "Tient la coordination du Poro et la foire vivrière du Nord." },
  { badge: "COC-HSA-2021-0103", firstName: "Ahou", lastName: "Koffi", role: "Coordinatrice régionale", level: "regional", sector: "Vivriers", market: "Marché de Daloa", shop: "Étal Ahou", city: "daloa", since: 2021, phone: "+225 07 84 22 09 17", email: "haut-sassandra@cocomci.ci", bio: "Représente les opérateurs du Haut-Sassandra auprès de la municipalité de Daloa." },
  { badge: "COC-SPE-2022-0104", firstName: "Ibrahim", lastName: "Méité", role: "Coordinateur régional", level: "regional", sector: "Poisson et import", market: "Marché de San-Pédro", shop: "Méité Port", city: "san-pedro", since: 2022, phone: "+225 07 26 53 81 04", email: "san-pedro@cocomci.ci", bio: "Installé avec la coordination portuaire, il suit le poisson frais et les denrées débarquées." },
  { badge: "COC-TON-2021-0105", firstName: "Antoine", lastName: "Gueï", role: "Coordinateur régional", level: "regional", sector: "Plantain et café", market: "Grand Marché de Man", shop: "Gueï Montagnes", city: "man", since: 2021, phone: "+225 05 11 47 62 80", email: "tonkpi@cocomci.ci", bio: "Porte les dossiers de transport depuis les pistes de l'ouest jusqu'aux marchés urbains." },
  { badge: "COC-IDJ-2022-0106", firstName: "Edwige", lastName: "Assi", role: "Coordinatrice régionale", level: "regional", sector: "Café et vivriers", market: "Marché d'Abengourou", shop: "Assi Commerce", city: "abengourou", since: 2022, phone: "+225 07 70 15 28 46", email: "indenie@cocomci.ci", bio: "Anime l'Indénié-Djuablin et le relevé du café robusta de marché." },
  { badge: "COC-GOH-2022-0107", firstName: "Serge", lastName: "Gnahoré", role: "Coordinateur régional", level: "regional", sector: "Vivriers", market: "Marché de Gagnoa", shop: "Gnahoré Fils", city: "gagnoa", since: 2022, phone: "+225 07 36 08 91 25", email: "goh@cocomci.ci", bio: "Coordonne le Gôh et les flux de plantain, d'igname et de légumes vers Abidjan." },
  { badge: "COC-TCH-2023-0108", firstName: "Madjara", lastName: "Coulibaly", role: "Coordinatrice régionale", level: "regional", sector: "Céréales", market: "Marché de Ferkessédougou", shop: "Madjara Nord", city: "ferkessedougou", since: 2023, phone: "+225 05 28 64 13 77", email: "tchologo@cocomci.ci", bio: "Relais du Tchologo pour le mil, le karité et le commerce transfrontalier de proximité." },
  { badge: "COC-SCO-2022-0109", firstName: "Yves", lastName: "N'Goran", role: "Coordinateur régional", level: "regional", sector: "Produits de grande consommation", market: "Marché d'Aboisso", shop: "N'Goran Distribution", city: "aboisso", since: 2022, phone: "+225 07 14 82 50 63", email: "sud-comoe@cocomci.ci", bio: "Couvre Aboisso, Grand-Bassam et le cordon du Sud-Comoé." },
  { badge: "COC-HBL-2021-0110", firstName: "Lacina", lastName: "Ouattara", role: "Coordinateur régional", level: "regional", sector: "Igname et céréales", market: "Marché de Katiola", shop: "Ouattara Hambol", city: "katiola", since: 2021, phone: "+225 07 53 19 40 28", email: "hambol@cocomci.ci", bio: "Préside l'Hambol et suit les convois entre Katiola et Bouaké." },
  { badge: "COC-BGE-2023-0111", firstName: "Fanta", lastName: "Traoré", role: "Coordinatrice régionale", level: "regional", sector: "Céréales sèches", market: "Marché de Boundiali", shop: "Traoré Bagoué", city: "boundiali", since: 2023, phone: "+225 05 47 21 86 10", email: "bagoue@cocomci.ci", bio: "Installe la discipline de relevé dans la Bagoué, en lien avec Korhogo." },
  { badge: "COC-GRP-2022-0112", firstName: "Michel", lastName: "Aké", role: "Coordinateur régional", level: "regional", sector: "Poisson lagunaire", market: "Marché de Dabou", shop: "Aké Lagune", city: "dabou", since: 2022, phone: "+225 07 61 08 33 54", email: "grands-ponts@cocomci.ci", bio: "Représente les Grands-Ponts et les opérateurs de la lagune vers Abidjan." },
  { badge: "COC-GON-2023-0113", firstName: "Navaro", lastName: "Soro", role: "Coordinateur régional", level: "regional", sector: "Anacarde et vivriers", market: "Marché de Bondoukou", shop: "Soro Gontougo", city: "bondoukou", since: 2023, phone: "+225 07 29 74 16 08", email: "gontougo@cocomci.ci", bio: "Porte la coordination du Gontougo et la campagne anacarde." },
  { badge: "COC-ABJ-2020-0114", firstName: "Esther", lastName: "Dago", role: "Coordinatrice de district", level: "regional", sector: "Commerce de détail", market: "Grand Marché de Yopougon", shop: "Dago Commerce", city: "yopougon", since: 2020, phone: "+225 07 08 45 62 19", email: "abidjan@cocomci.ci", bio: "Fait le lien entre les communes d'Abidjan et le Bureau national exécutif." },
  { badge: "COC-SCO-2023-0218", firstName: "Brigitte", lastName: "Aman", role: "Coordinatrice de ville", level: "communal", sector: "Épicerie et vivriers", market: "Marché de Grand-Bassam", shop: "Chez Brigitte", city: "grand-bassam", since: 2023, phone: "+225 05 36 90 21 48", email: "bassam@cocomci.ci", bio: "Relais communal de Grand-Bassam pour la carte de commerçant et les relevés du week-end." },
  { badge: "COC-ABJ-2023-0201", firstName: "Blanche", lastName: "Adjoua", role: "Opératrice de commerce", level: "membre", sector: "Maraîchers", market: "Grand Marché de Yopougon", shop: "Tas Blanche", city: "yopougon", since: 2023, phone: "+225 07 77 14 28 63", bio: "Vend tomate, oignon, piment et gombo. Elle remonte chaque jeudi le cours de son allée." },
  { badge: "COC-ABJ-2019-0202", firstName: "Moussa", lastName: "Cissé", role: "Grossiste", level: "membre", sector: "Riz importé", market: "Marché d'Adjamé", shop: "Cissé Riz", city: "adjame", since: 2019, phone: "+225 07 02 66 81 45", email: "moussa.cisse@cocomci.ci", bio: "Grossiste historique du riz brisé. Ses sacs de 25 et 50 kg servent de référence au relevé d'Adjamé." },
  { badge: "COC-ABJ-2021-0203", firstName: "Brigitte", lastName: "Tanoh", role: "Opératrice de commerce", level: "membre", sector: "Huile et produits d'épicerie", market: "Marché de Treichville", shop: "Tanoh Huiles", city: "treichville", since: 2021, phone: "+225 05 55 18 72 30", bio: "Spécialisée dans l'huile raffinée et l'huile de palme rouge, au détail et au bidon." },
  { badge: "COC-GBK-2020-0204", firstName: "Firmin", lastName: "Kouassi", role: "Opérateur de commerce", level: "membre", sector: "Viande", market: "Grand Marché de Bouaké", shop: "Boucherie Firmin", city: "bouake", since: 2020, phone: "+225 07 18 93 40 27", bio: "Tient un étal de bœuf et de poulet. Il signale les ruptures de froid et les écarts de découpe." },
  { badge: "COC-SPE-2022-0205", firstName: "Awa", lastName: "Diomandé", role: "Mareyeuse", level: "membre", sector: "Poisson fumé", market: "Marché de San-Pédro", shop: "Fumoir Awa", city: "san-pedro", since: 2022, phone: "+225 07 64 31 09 58", bio: "Transforme et vend le poisson fumé destiné à l'intérieur du pays." },
  { badge: "COC-POR-2020-0206", firstName: "Yacouba", lastName: "Bamba", role: "Grossiste céréalier", level: "membre", sector: "Mil, sorgho, maïs", market: "Grand Marché de Korhogo", shop: "Bamba Grains", city: "korhogo", since: 2020, phone: "+225 05 09 47 21 86", bio: "Ses tas de mil et de maïs servent de point de relevé pour les Savanes." },
  { badge: "COC-HSA-2023-0207", firstName: "Léonie", lastName: "Aka", role: "Opératrice de commerce", level: "membre", sector: "Maraîchers", market: "Marché de Daloa", shop: "Jardin Léonie", city: "daloa", since: 2023, phone: "+225 07 45 20 68 13", bio: "Regroupe des productrices maraîchères et vend aubergine, chou et gombo." },
  { badge: "COC-ABJ-2024-0208", firstName: "Salif", lastName: "Koné", role: "Distributeur", level: "membre", sector: "Farine", market: "Marché d'Abobo", shop: "Koné Farine", city: "abobo", since: 2024, phone: "+225 01 72 35 48 90", bio: "Livre la farine aux boulangeries de quartier et au détail familial." },
  { badge: "COC-ABJ-2022-0209", firstName: "Pascal", lastName: "Ehui", role: "Opérateur de commerce", level: "membre", sector: "Sucre", market: "Marché de Koumassi", shop: "Ehui Sucre", city: "koumassi", since: 2022, status: "suspendu", phone: "+225 07 88 12 46 03", bio: "Badge suspendu pour défaut de relevé et litige sur l'affichage des prix. La réintégration est à l'instruction du secrétariat." },
  { badge: "COC-ABJ-2023-0210", firstName: "Rokia", lastName: "Touré", role: "Épicière", level: "membre", sector: "Lait et épicerie", market: "Marché de Cocody", shop: "Épicerie Rokia", city: "cocody", since: 2023, phone: "+225 05 63 28 17 44", bio: "Suit le lait en poudre et le lait caillé sur la place de Cocody." },
  { badge: "COC-GOH-2024-0211", firstName: "Lou", lastName: "Goué", role: "Opératrice de commerce", level: "membre", sector: "Plantain", market: "Marché de Gagnoa", shop: "Régimes Goué", city: "gagnoa", since: 2024, phone: "+225 07 21 56 83 40", bio: "Collecte les régimes de plantain et les expédie vers le bassin d'Abidjan." },
  { badge: "COC-GBK-2021-0212", firstName: "Inza", lastName: "Dosso", role: "Grossiste", level: "membre", sector: "Oignon", market: "Grand Marché de Bouaké", shop: "Dosso Oignons", city: "bouake", since: 2021, phone: "+225 07 39 04 71 26", bio: "Importe et redistribue l'oignon vers le centre et le nord." },
  { badge: "COC-TON-2024-0213", firstName: "Amoin", lastName: "Kobenan", role: "Opératrice de commerce", level: "membre", sector: "Piment et légumes", market: "Grand Marché de Man", shop: "Amoin Légumes", city: "man", since: 2024, phone: "+225 05 82 16 49 37", bio: "Tient un étal de piment, gombo et aubergine à Man." },
  { badge: "COC-TCH-2022-0214", firstName: "Naférima", lastName: "Silué", role: "Transformatrice", level: "membre", sector: "Karité", market: "Marché de Ferkessédougou", shop: "Beurre Naférima", city: "ferkessedougou", since: 2022, phone: "+225 07 50 27 63 18", bio: "Produit et vend le beurre de karité artisanal suivi par l'observatoire." },
  { badge: "COC-IDJ-2020-0215", firstName: "Jean", lastName: "Bohoussou", role: "Opérateur de commerce", level: "membre", sector: "Café", market: "Marché d'Abengourou", shop: "Bohoussou Café", city: "abengourou", since: 2020, phone: "+225 07 16 48 92 05", bio: "Collecteur de café robusta, il éclaire le Bureau sur la campagne intérieure." },
  { badge: "COC-YAK-2023-0216", firstName: "Oumou", lastName: "Coulibaly", role: "Opératrice de commerce", level: "membre", sector: "Vivriers et tissu", market: "Marché de Yamoussoukro", shop: "Oumou Mixte", city: "yamoussoukro", since: 2023, phone: "+225 05 24 73 10 69", bio: "Commerce mixte au marché de la capitale politique, relais des relevés du mercredi." },
  { badge: "COC-GON-2024-0217", firstName: "Serge", lastName: "N'Dri", role: "Opérateur de commerce", level: "membre", sector: "Anacarde", market: "Marché de Bondoukou", shop: "N'Dri Cajou", city: "bondoukou", since: 2024, phone: "+225 07 43 19 80 52", bio: "Suit la noix brute pendant la campagne et les vivriers le reste de l'année." },
  { badge: "COC-GBO-2022-0219", firstName: "Paul", lastName: "Zahui", role: "Mareyeur", level: "membre", sector: "Poisson frais", market: "Débarcadère de Sassandra", shop: "Zahui Mer", city: "sassandra", since: 2022, phone: "+225 07 91 26 34 70", bio: "Relais du Gbôklé pour le poisson frais expédié vers Daloa et Gagnoa." },
  { badge: "COC-KAB-2021-0220", firstName: "Mariatou", lastName: "Fofana", role: "Opératrice de commerce", level: "membre", sector: "Mil et sorgho", market: "Marché d'Odienné", shop: "Fofana Grains", city: "odienne", since: 2021, phone: "+225 05 38 64 17 22", bio: "Tient la place céréalière du Kabadougou et forme les releveuses du mardi." },
  { badge: "COC-NAW-2023-0221", firstName: "Aya", lastName: "Kouadio", role: "Opératrice de commerce", level: "membre", sector: "Cacao et vivriers", market: "Marché de Soubré", shop: "Aya Nawa", city: "soubre", since: 2023, phone: "+225 07 27 51 84 06", bio: "Au cœur du bassin cacaoyer, elle suit aussi l'igname et la banane." },
  { badge: "COC-WOR-2022-0222", firstName: "Lamine", lastName: "Camara", role: "Opérateur de commerce", level: "membre", sector: "Commerce général", market: "Marché de Séguéla", shop: "Camara Woroba", city: "seguela", since: 2022, phone: "+225 07 66 03 49 81", bio: "Point focal du Worodougou pour le badge et les cotisations." },
  { badge: "COC-MAR-2024-0223", firstName: "Élise", lastName: "Tape", role: "Opératrice de commerce", level: "membre", sector: "Maraîchers", market: "Marché de Bouaflé", shop: "Élise Maraîcher", city: "bouafle", since: 2024, phone: "+225 05 19 82 46 37", bio: "Nouvelle adhérente de la Marahoué, spécialisée dans le chou et la tomate." },
  { badge: "COC-BEL-2023-0224", firstName: "Koffi", lastName: "N'Guessan", role: "Opérateur de commerce", level: "membre", sector: "Igname", market: "Marché de Toumodi", shop: "N'Guessan Tubercules", city: "toumodi", since: 2023, phone: "+225 07 34 70 15 28", bio: "Grossiste en igname sur l'axe Toumodi–Yamoussoukro–Abidjan." },
];

export const articleSeed = [
  {
    slug: "union-des-commercants-carte-et-badge",
    title: "Carte de commerçant et badge COCOMCI : ce que change l'identification",
    excerpt: "Le Bureau national rappelle que l'union des opérateurs passe par une pièce lisible : la carte de commerçant, et par le badge officiel qui ouvre l'annuaire de la coordination.",
    category: "informations",
    author: "Secrétariat général",
    location: "Bouaké",
    image: "/images/vendeuse.jpg",
    publishedAt: "2026-10-20T08:30:00.000Z",
    featured: true,
    content: `Depuis le congrès constitutif du 7 septembre 2019, la COCOMCI répète la même exigence : un commerçant identifié est un commerçant que l'administration peut entendre. La carte de commerçant n'est pas un papier de plus. C'est le moyen, pour les services du commerce et pour les mairies, de distinguer l'opérateur installé du passage anonyme.

Le badge officiel COCOMCI vient compléter cette carte. Il porte un numéro unique, la région, la ville, le marché et la fonction. Un grossiste d'Adjamé, une mareyeuse de San-Pédro et un président régional du Poro n'ont pas le même rôle, mais ils relèvent du même registre. Le badge se vérifie publiquement : toute personne peut saisir le numéro et savoir si le titre est actif ou suspendu.

> Nous voulons nous organiser pour que le gouvernement ait un regard sur les commerçants de Côte d'Ivoire. Le badge rend ce regard possible, sans confondre l'opérateur avec la foule du marché.

Le secrétariat général, tenu par Fulbert Koffi, instruit les demandes d'adhésion reçues sur la plateforme. Le badge n'est pas délivré au guichet du site : il est préparé après vérification de l'activité, de la ville et du marché de rattachement. Un numéro suspendu, comme celui ouvert à Koumassi pour défaut de relevé, reste visible. La discipline fait partie du pacte.

Les coordinations régionales sont invitées à organiser, avant la fin de l'année, des permanences de formalisation. L'objectif n'est pas de tout centraliser à Bouaké. Il est que chaque chef-lieu puisse dire, liste en main, qui parle au nom des opérateurs.`,
  },
  {
    slug: "observatoire-octobre-oignon-tomate",
    title: "Observatoire d'octobre : l'oignon et la tomate écartent les étals",
    excerpt: "Le relevé du 29 octobre 2026 montre une tension nette sur les maraîchers, pendant que le riz importé et le sucre restent dans un couloir plus étroit.",
    category: "commerce-interieur",
    author: "Cellule observatoire",
    location: "Abidjan — Bouaké — Korhogo",
    image: "/images/etal-tomates.jpg",
    publishedAt: "2026-10-29T07:00:00.000Z",
    featured: true,
    content: `Le relevé de ce jeudi, consolidé par les délégués de quatorze marchés, confirme ce que les ménagères disent depuis deux semaines : le tas de tomate et le filet d'oignon ne se comportent pas comme le sac de riz. Sur les places de détail d'Abidjan, la tomate s'affiche nettement au-dessus du gros d'Adjamé. À Cocody, l'écart avec le marché de gros dépasse souvent le simple coût du transport.

L'oignon, largement approvisionné depuis le Sahel, reste le produit dont le cours bouge avec le camion. Bouaké, place de redistribution, cote en dessous de plusieurs marchés du littoral, mais le détaillant de quartier ne voit pas toujours ce prix. La COCOMCI publie donc le minimum, le maximum et le cours retenu, pas une moyenne qui n'existe sur aucun étal.

> Un prix unique national n'a pas de sens pour le gombo ou le piment. Un prix caché n'en a pas davantage. L'observatoire compare des places, il ne décrète pas un tarif.

Le sucre granulé blanc demeure proche de son repère de 875 F le kilo sur le bassin d'Abidjan, avec un avantage au gros. L'huile raffinée, ramenée au litre, se tient dans un canal plus large selon le format du bidon. Le poisson fumé continue de pénaliser l'intérieur : Korhogo et Bondoukou paient le trajet, San-Pédro reste la place la plus compétitive.

Les opérateurs sont invités à signaler un cours aberrant depuis la page Marchés. Un signalement n'entre pas automatiquement dans le relevé officiel. Il est instruit par la cellule prix avant d'éventuellement corriger la série.`,
  },
  {
    slug: "coordinations-sur-tout-le-territoire",
    title: "Les coordinations avancent, région par région",
    excerpt: "Du Gbêkê au Gontougo, le Bureau national exécutif poursuit l'installation promise en 2019 : une coordination là où il y a un marché, pas seulement là où il y a une capitale.",
    category: "activites",
    author: "Salimata Ouattara",
    location: "Territoire national",
    image: "/images/pattern-hero.jpg",
    publishedAt: "2026-10-08T09:00:00.000Z",
    featured: true,
    content: `En ouvrant le premier congrès, le président Kamagaté Lamine avait fixé une méthode simple : installer des coordinations sur toute l'étendue du territoire. Sept ans plus tard, l'annuaire compte des relais dans les deux districts autonomes et dans chacune des grandes places commerciales, des Savanes au Bas-Sassandra.

Cela ne veut pas dire que le maillage est achevé. Plusieurs chefs-lieux ont un président régional ou un point focal, mais pas encore une permanence hebdomadaire. Le secrétariat distingue donc trois niveaux sur le badge : bureau national, coordination régionale, relais communal, et membre opérateur. La clarté du niveau évite qu'un détaillant parle au nom d'une région, ou qu'une région ignore ses communes.

> L'union sacrée n'est pas un slogan de congrès. C'est une liste de noms, de marchés et de numéros que l'on peut vérifier.

La prochaine assemblée des coordinations régionales est convoquée à Bouaké le 14 novembre 2026. Chaque président régional viendra avec trois chiffres : le nombre de badges actifs, le nombre de relevés remontés en octobre, et le principal blocage avec la municipalité. Sans ces trois chiffres, la prise de parole ne sera pas inscrite à l'ordre du jour.

Les régions encore peu dotées — Folon, Bafing, Béré, Moronou, Iffou — seront appelées nommément. Le Bureau préfère un relais honnête à une présidence fictive.`,
  },
  {
    slug: "bouake-points-de-vente-transparence",
    title: "Bouaké : les opérateurs tiennent à la transparence des points de vente",
    excerpt: "Autour du Grand Marché, la coordination du Gbêkê redit une exigence ancienne : pas d'attribution opaque, pas d'ultimatum de quarante-huit heures, une liste que les commerçants peuvent lire.",
    category: "activites",
    author: "Coordination du Gbêkê",
    location: "Bouaké",
    image: "/images/marche-vivrier.jpg",
    publishedAt: "2026-09-16T10:00:00.000Z",
    featured: false,
    content: `Le Grand Marché de Bouaké reste, pour la COCOMCI, à la fois le berceau et le test. C'est là que le collectif est devenu coordination. C'est là aussi que la question des points de vente a montré, ces dernières années, combien un marché neuf peut diviser ceux qui doivent l'occuper.

La coordination ne refuse pas le principe d'une contribution pour une place. Elle refuse l'opacité. Un opérateur analphabète ne peut pas signer, sous la menace de perdre son étal, un engagement qu'on ne lui a pas lu. Le président régional Siaka Konaté demande que les listes, les prix de pas-de-porte et les critères soient affichés, expliqués en langue locale, et opposables.

> Nous épousons l'idée d'un marché moderne. Nous n'épousons pas l'idée qu'un coup de téléphone vaille règlement.

Le Bureau national exécutif accompagnera la coordination du Gbêkê dans les concertations avec la municipalité. La même discipline sera proposée aux autres villes qui reconstruisent ou réorganisent leurs marchés : Daloa, Korhogo, Man, San-Pédro. Un badge COCOMCI ne donne pas droit à une boutique. Il donne droit à être dans la salle quand la liste se discute.

Les commerçants qui ont un litige de place peuvent l'écrire au secrétariat. Le dossier sera versé à la note que le Bureau transmettra avant l'assemblée du 14 novembre.`,
  },
  {
    slug: "cacao-cafe-et-pouvoir-dachat",
    title: "Cacao, café, anacarde : ce que le marché intérieur doit surveiller",
    excerpt: "Les matières premières ne se vendent pas au tas comme la tomate, mais leur campagne décide du pouvoir d'achat qui entre ensuite dans les marchés de vivriers.",
    category: "economie",
    author: "Cellule observatoire",
    location: "Soubré — Abengourou — Bondoukou",
    image: "/images/marche-epices.jpg",
    publishedAt: "2026-10-02T08:00:00.000Z",
    featured: false,
    content: `La COCOMCI n'est pas une interprofession du cacao. Elle est la coordination de ceux qui vendent le riz, l'huile, le poisson et le pagne à ceux qui, une partie de l'année, vivent de la fève, de la cerise ou de la noix. Quand la campagne est fluide, les marchés de Soubré, d'Abengourou et de Bondoukou tournent. Quand elle se grippe, le détaillant le voit avant le communiqué.

L'observatoire publie donc un cours indicatif de la fève marchande, du robusta et de la noix brute. Ce n'est pas le prix bord-champ officiel, ni le cours de la bourse. C'est le niveau autour duquel les opérateurs de ces places disent négocier cette semaine. L'écart est assumé et daté.

> Un commerçant de Gagnoa qui ignore la campagne cacao lit mal son propre marché. Le client qui achète l'igname est souvent le même qui a vendu le cacao.

Le coton graine et le beurre de karité complètent la série, surtout pour les Savanes et le Tchologo. Naférima Silué, à Ferkessédougou, rappelle que le karité artisanal de marché n'a rien à voir avec le beurre raffiné d'exportation : le mélanger dans une seule ligne fausserait le relevé.

La note complète, marché par marché, est sur la page des cours. Les présidents régionaux du Nawa, de l'Indénié-Djuablin et du Gontougo sont les référents de cette série.`,
  },
  {
    slug: "prix-plafonds-reperes-de-lecture",
    title: "Sucre, huile, riz, lait : comment lire un prix plafond sans se tromper de format",
    excerpt: "La coordination relaie les repères publics, mais elle demande aux opérateurs d'afficher l'unité réelle : le kilo, le litre, la boîte, pas un slogan.",
    category: "commerce-interieur",
    author: "Yao Kouamé Patrice",
    location: "Abidjan",
    image: "/images/piment.jpg",
    publishedAt: "2026-09-28T11:30:00.000Z",
    featured: false,
    content: `Les prix plafonds communiqués pour le sucre, le riz de grande consommation, l'huile de table et certaines boîtes de lait sont des repères utiles. Ils deviennent trompeurs dès qu'on compare un sachet de 230 grammes à un kilo de vrac, ou un bidon de 90 centilitres à un litre d'huile de palme rouge.

La cellule marchés et prix demande à chaque relais d'afficher trois mentions : le produit exact, l'unité, le prix. Le sucre granulé blanc n'est pas le sucre en morceaux. Le riz brisé à 25 % n'est pas le riz parfumé. Le lait en poudre de 400 grammes n'est pas le lait caillé au litre. L'observatoire COCOMCI sépare ces lignes pour que la comparaison entre Adjamé, Bouaké et Korhogo ait un sens.

> Afficher un prix sans l'unité, c'est déjà une dispute. L'afficher avec la mauvaise unité, c'est une dispute que personne ne peut trancher.

Sur le riz, le sac reste l'unité du gros. Le relevé le ramène au kilogramme pour les ménages, tout en conservant le type : local étuvé, importé brisé, parfumé. Un opérateur qui vend les trois doit les déclarer séparément dans un signalement.

La COCOMCI ne se substitue pas à l'administration du commerce. Elle donne à ses membres le vocabulaire commun pour ne pas être accusés d'un dépassement qu'une simple différence de format expliquerait.`,
  },
  {
    slug: "dollar-ferme-euro-arrime",
    title: "Devises : l'euro reste arrimé, le dollar se raffermit face au franc CFA",
    excerpt: "Pour les importateurs de riz, d'huile, de lait et d'oignon, la parité fixe avec l'euro ne protège pas des factures libellées en dollar.",
    category: "economie",
    author: "Cellule observatoire",
    location: "Abidjan",
    image: "/images/emblem.jpg",
    publishedAt: "2026-10-27T16:00:00.000Z",
    featured: false,
    content: `Le franc CFA reste arrimé à l'euro au pair fixe de 655,957. Cette ancre, connue de tous les opérateurs, ne dit rien du dollar, de la livre, du yuan ou du cedi. Or une part décisive du riz, du lait en poudre et de certains intrants arrive sur des factures en dollar.

Le relevé indicatif du 27 octobre place le dollar au-dessus de son niveau de la semaine précédente. La livre sterling suit. Le naira et le cedi, suivis pour le commerce de proximité avec le Nigeria et le Ghana, bougent dans l'autre sens et compliquent les arbitrages de bordure, notamment dans le Tchologo et le Gontougo.

> L'importateur qui raisonne seulement en euro se trompe de risque. Celui qui raisonne seulement en dollar oublie que son client, lui, paie en franc CFA.

La page Devises de la plateforme convertit un montant d'une devise à l'autre via le franc CFA. Les cours sont indicatifs, datés, alignés sur les ordres de grandeur des références publiques. Ils ne remplacent ni le cours bancaire du jour ni le change de rue, souvent moins favorable.

Issouf Diabaté, trésorier général, invite les grossistes à déclarer dans leurs assemblées de place la devise réelle de leur dernier contrat, pas seulement le prix de revente en francs. C'est ainsi que l'observatoire pourra, au prochain trimestre, relier le cours du dollar au cours du sac de riz.`,
  },
  {
    slug: "commercantes-au-bureau",
    title: "Les commerçantes ne sont plus un comité annexe",
    excerpt: "De la vice-présidence nationale aux coordinations du Poro, du Haut-Sassandra et du Tchologo, les opératrices tiennent des fonctions exécutives, pas seulement des sièges d'honneur.",
    category: "informations",
    author: "Chantal Soro",
    location: "Man — Abidjan",
    image: "/images/vendeuse.jpg",
    publishedAt: "2026-08-19T09:30:00.000Z",
    featured: false,
    content: `Sur un marché ivoirien, la majorité des étals de vivriers et de maraîchers est tenue par des femmes. Pendant longtemps, les bureaux qui parlaient en leur nom étaient composés autrement. Le Bureau national exécutif de la COCOMCI a choisi l'inverse sur plusieurs postes clés.

Awa Touré porte la vice-présidence depuis Adjamé. Mariam Bamba tient le secrétariat général adjoint depuis Korhogo. Affoué N'Guessan suit la trésorerie adjointe depuis la criée de San-Pédro. Chantal Soro, à Man, a la charge explicite des affaires féminines, non pour isoler les commerçantes, mais pour empêcher que leurs dossiers — places, sécurité, garde d'enfants pendant les assemblées, accès au froid — sortent de l'ordre du jour.

> Une coordination qui ne sait pas dire le nom de ses commerçantes ne sait pas dire le prix de la tomate. Ce sont souvent les mêmes personnes.

Les présidentes régionales du Poro, du Haut-Sassandra, de l'Indénié-Djuablin, du Tchologo et de la Bagoué siègent avec les mêmes obligations de relevé que leurs homologues. Le badge ne change pas de couleur. Il change, parfois, la façon dont une mairie reçoit une délégation.

La session de novembre à Bouaké réservera une séquence aux permanences du matin, horaires où les commerçantes peuvent venir sans fermer l'étal toute la journée. Le détail paraît petit. C'est souvent lui qui décide qui est vraiment dans la salle.`,
  },
  {
    slug: "lire-un-cours-de-marche",
    title: "Adjamé accueille la session sur la lecture des cours",
    excerpt: "Avant de contester un prix, encore faut-il savoir ce qui a été mesuré. La cellule observatoire ouvre une formation aux délégués de marché.",
    category: "activites",
    author: "Cellule observatoire",
    location: "Adjamé",
    image: "/images/marche-epices.jpg",
    publishedAt: "2026-10-14T12:00:00.000Z",
    featured: false,
    content: `Le 21 novembre 2026, au marché d'Adjamé, la COCOMCI forme ses releveurs. Le programme tient en une matinée : choisir l'étal de référence, nommer le produit sans ambiguïté, peser ou convertir le tas, noter le gros et le détail, et ne jamais inventer un cours « pour que la série continue ».

Patrice Yao Kouamé, chargé des marchés et des prix, le dit sans détour : un trou dans la série vaut mieux qu'un chiffre faux. Le badge d'un releveur qui répète trois relevés identiques au franc près sera réexaminé. Les marchés bougent. Une série immobile est suspecte.

> Le métier de releveur n'est pas de faire plaisir au Bureau. Il est de permettre à un opérateur de Korhogo de comprendre un opérateur d'Adjamé.

La session est ouverte aux membres actifs. Les présidents régionaux peuvent désigner deux délégués, en privilégiant celles et ceux qui tiennent déjà un étal. Le badge sera contrôlé à l'entrée. Un numéro suspendu ne donne pas accès à la formation, jusqu'à régularisation.

Les supports resteront ensuite sur la page Marchés, dans la note de méthode. L'observatoire n'a de valeur que si n'importe quel membre peut refaire le geste.`,
  },
];

export const activitySeed = [
  {
    title: "Semaine de l'observatoire des prix",
    description: "Relevé simultané du sucre, de l'huile, de la farine, du poisson, de la viande, du riz, du lait, des céréales et des maraîchers sur les quatorze marchés suivis. Les délégués déposent leurs fiches avant vendredi soir.",
    location: "Quatorze marchés du territoire",
    startsAt: "2026-10-26T08:00:00.000Z",
    endsAt: "2026-11-02T18:00:00.000Z",
    type: "observatoire",
  },
  {
    title: "Assemblée des coordinations régionales",
    description: "Chaque président régional présente ses badges actifs, ses relevés d'octobre et le principal blocage municipal. Séance présidée par Kamagaté Lamine, secrétariat assuré par Fulbert Koffi.",
    location: "Siège national, Bouaké",
    startsAt: "2026-11-14T09:00:00.000Z",
    endsAt: "2026-11-14T17:00:00.000Z",
    type: "assemblee",
  },
  {
    title: "Formation : lire et remonter un cours de marché",
    description: "Session pratique au marché d'Adjamé pour les délégués désignés. Badge actif exigé. Au programme : unité, étal de référence, gros contre détail, signalement d'un cours aberrant.",
    location: "Marché d'Adjamé, Abidjan",
    startsAt: "2026-11-21T08:30:00.000Z",
    endsAt: "2026-11-21T13:00:00.000Z",
    type: "formation",
  },
  {
    title: "Permanences carte de commerçant",
    description: "Guichet itinérant du chargé de la carte, Drissa Coulibaly, pour les opérateurs non encore identifiés. Pièce d'identité, preuve d'activité et photo simples suffisent à ouvrir le dossier.",
    location: "Grand Marché de Bouaké, puis antenne d'Adjamé",
    startsAt: "2026-11-24T09:00:00.000Z",
    endsAt: "2026-11-27T16:00:00.000Z",
    type: "sensibilisation",
  },
  {
    title: "Foire vivrière du Nord",
    description: "Rencontre des céréaliers et des commerçantes du Poro, de la Bagoué et du Tchologo. Exposition de mil, sorgho, maïs, arachide et beurre de karité, avec relevé public des cours.",
    location: "Grand Marché de Korhogo",
    startsAt: "2026-12-06T09:00:00.000Z",
    endsAt: "2026-12-07T18:00:00.000Z",
    type: "foire",
  },
  {
    title: "Revue des prix de fin d'année",
    description: "Note de conjoncture avant les fêtes : riz, huile, sucre, viande, poisson et lait. Présentation aux opérateurs d'Abidjan et transmission aux autorités du commerce intérieur.",
    location: "Antenne d'Abidjan, Adjamé",
    startsAt: "2026-12-16T10:00:00.000Z",
    endsAt: "2026-12-16T15:30:00.000Z",
    type: "audience",
  },
  {
    title: "Campagne « Prix lisibles »",
    description: "Tournée d'affichage de l'unité de vente dans les allées de vivriers. Les relais communaux accompagnent les opératrices pour écrire le prix au kilo ou au litre, pas seulement au tas.",
    location: "Yopougon, Treichville, Daloa, Man",
    startsAt: "2026-09-18T08:00:00.000Z",
    endsAt: "2026-09-30T18:00:00.000Z",
    type: "sensibilisation",
  },
  {
    title: "Installation de la coordination de San-Pédro",
    description: "Mise en place du bureau régional portuaire autour d'Ibrahim Méité et d'Affoué N'Guessan. Première série de relevés poisson frais et poisson fumé vers l'intérieur.",
    location: "San-Pédro",
    startsAt: "2026-06-04T09:00:00.000Z",
    endsAt: "2026-06-04T16:00:00.000Z",
    type: "installation",
  },
];

export const currencySeed = [
  { code: "EUR", name: "Euro", symbol: "€", rate: 655.957 },
  { code: "USD", name: "Dollar américain", symbol: "$", rate: 588.3 },
  { code: "GBP", name: "Livre sterling", symbol: "£", rate: 784.09 },
  { code: "CHF", name: "Franc suisse", symbol: "Fr", rate: 692.4 },
  { code: "CAD", name: "Dollar canadien", symbol: "C$", rate: 421.8 },
  { code: "CNY", name: "Yuan chinois", symbol: "¥", rate: 82.15 },
  { code: "JPY", name: "Yen japonais", symbol: "¥", rate: 3.926 },
  { code: "NGN", name: "Naira nigérian", symbol: "₦", rate: 0.385 },
  { code: "GHS", name: "Cedi ghanéen", symbol: "₵", rate: 46.2 },
  { code: "MAD", name: "Dirham marocain", symbol: "DH", rate: 63.4 },
  { code: "XAF", name: "Franc CFA BEAC", symbol: "F", rate: 1 },
  { code: "ZAR", name: "Rand sud-africain", symbol: "R", rate: 33.85 },
];
