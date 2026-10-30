# Plateforme COCOMCI

Portail officiel de la **Coordination des Opérateurs de Commerce de Côte d'Ivoire** : annuaire des membres et badges officiels, bureaux territoriaux (coordinateurs et secrétaires généraux), cours des marchés locaux, cours des devises, actualités, activités et espace secrétariat.

Construit avec **Next.js (App Router)**, **PostgreSQL** et **Drizzle ORM**.

---

## Déploiement rapide (Vercel + Neon — gratuit)

### 1. La base de données (Neon)

1. Créez un compte sur [neon.tech](https://neon.tech) (gratuit).
2. Créez un projet `cocomci` → copiez la **chaîne de connexion** (`postgresql://...sslmode=require`).

### 2. L'application (Vercel)

1. Créez un compte sur [vercel.com](https://vercel.com) avec votre compte GitHub.
2. **Add New → Project** → importez ce dépôt GitHub.
3. Dans **Environment Variables**, ajoutez :
   - `DATABASE_URL` = la chaîne de connexion Neon
   - `SECRETARIAT_CODE` = un code fort de votre choix (ne gardez pas `BNE-2019`)
4. Cliquez **Deploy**. C'est tout.

Au premier chargement, la plateforme **crée ses tables et ses données de démarrage automatiquement** (régions, villes, marchés, produits, bureau national). Aucune migration manuelle n'est requise.

### 3. Après la mise en ligne

- Ouvrez `/secretariat` avec votre nouveau code pour : téléverser le **logo officiel**, ajouter les **photos réelles des membres**, instruire les adhésions et les signalements de prix.
- Reliez ensuite votre domaine (ex. `cocomci.ci`) dans Vercel → **Settings → Domains**.

---

## Développement local

```bash
npm install
cp .env.example .env        # puis renseignez DATABASE_URL
npm run dev                 # http://localhost:3000
```

Appliquer le schéma à une base vierge (optionnel, sinon automatique au premier accès) :

```bash
npx drizzle-kit push
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run typecheck` | Vérification TypeScript |

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | Connexion PostgreSQL (obligatoire) |
| `SECRETARIAT_CODE` | Code d'accès à l'espace secrétariat (`/secretariat`) |

## Structure

```
src/
  app/            Pages (accueil, président, membres, bureaux, marchés, devises…)
  app/api/        Routes API (adhésions, contact, signalements, photos, logo…)
  components/     Composants (badges, carrousel, formulaires, partenaires…)
  db/             Schéma Drizzle, amorçage des données
  lib/            Requêtes, formats, filières, authentification secrétariat
public/images/    Logo, photos des marchés, portraits d'illustration
```

## Notes importantes

- Les **portraits des membres** et certains **numéros de téléphone** sont des données d'illustration : remplacez-les depuis l'espace secrétariat.
- Les cours des marchés et des devises sont des **relevés indicatifs datés**.
- Changez impérativement `SECRETARIAT_CODE` avant toute diffusion publique.
