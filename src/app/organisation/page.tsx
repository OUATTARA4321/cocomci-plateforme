import type { Metadata } from "next";
import Link from "next/link";
import { OfficialBadge } from "@/components/official-badge";
import { getBureau, getStats } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Organisation",
  description: "Histoire, missions et Bureau national exécutif de la COCOMCI.",
};

export default async function OrganisationPage() {
  const [bureau, stats] = await Promise.all([getBureau(), getStats()]);
  return (
    <div className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · La coordination
      </p>
      <p className="kicker dark">Depuis le congrès de Bouaké</p>
      <h1>Une coordination, pas un collectif dispersé.</h1>
      <div className="split" style={{ marginTop: 12 }}>
        <div className="prose">
          <p>
            Le 7 septembre 2019, les opérateurs du Collectif des opérateurs de commerce de Côte d&apos;Ivoire se réunissent à Bouaké pour leur premier congrès ordinaire. Ils transforment le collectif en Coordination des opérateurs de commerce de Côte d&apos;Ivoire, la COCOMCI. KAMAGATÉ Lamine, de Bouaké, est élu président avec 44 voix contre 2 pour DAOUDA Oumar. KOFFI Fulbert devient secrétaire général national.
          </p>
          <p>
            La séance se tient en présence du représentant du ministre des Transports. Le président élu fixe alors trois gestes : l&apos;union des commerçants, l&apos;installation de coordinations sur tout le territoire, et l&apos;appropriation de la carte de commerçant. Le portail reprend ces trois gestes, et y ajoute l&apos;observatoire des cours.
          </p>
          <p>
            La COCOMCI n&apos;est ni la Chambre de commerce et d&apos;industrie, ni une administration. Elle est l&apos;organisation des gens de marché : grossistes, détaillants, mareyeurs, céréaliers, transformatrices. Elle parle au nom de ceux qui tiennent un étal, à condition qu&apos;ils acceptent d&apos;être identifiés.
          </p>
        </div>
        <div className="panel">
          <p className="kicker dark">En chiffres</p>
          <p>
            <b>{stats.members}</b> badges actifs
          </p>
          <p>
            <b>{stats.regionsWithMembers}</b> territoires déjà pourvus d&apos;un relais nommé
          </p>
          <p>
            <b>{stats.markets}</b> marchés dans l&apos;observatoire
          </p>
          <p>
            <b>{stats.products}</b> lignes de produits, du sucre au cacao
          </p>
          <Link className="btn btn-primary btn-small" href="/adherer">
            Demander un badge
          </Link>
          <Link className="btn btn-line btn-small" href="/filieres" style={{ marginLeft: 8 }}>
            Voir les filières
          </Link>
        </div>
      </div>

      <section className="section">
        <div className="mission-grid">
          <article className="card">
            <h3>Représenter</h3>
            <p>Porter devant les mairies et les services du commerce les difficultés réelles : transport, places, prix plafonds mal lus, sécurité des étals.</p>
          </article>
          <article className="card">
            <h3>Identifier</h3>
            <p>La carte de commerçant ouvre la porte administrative. Le badge COCOMCI dit la fonction dans la coordination : national, régional, communal ou membre.</p>
          </article>
          <article className="card">
            <h3>Mesurer</h3>
            <p>Un relevé daté, par marché, avec l&apos;unité. Pas de moyenne nationale qui n&apos;existe sur aucun tas.</p>
          </article>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <p className="kicker dark">Collège</p>
            <h2>Bureau national exécutif</h2>
          </div>
        </div>
        <div className="badge-grid">
          {bureau.map((member) => (
            <Link key={member.badgeNumber} href={`/membres/${member.badgeNumber}`}>
              <OfficialBadge member={member} />
            </Link>
          ))}
        </div>
        <div className="cta-band" style={{ marginTop: 18 }}>
          <div>
            <p className="kicker">Territoire</p>
            <h2>Coordinateurs et secrétaires généraux, badges validés.</h2>
            <p>Le Bureau national n&apos;est pas seul. Chaque région, chaque ville et chaque commune a son binôme, avec un badge que l&apos;on peut vérifier.</p>
          </div>
          <Link className="btn btn-gold" href="/bureaux">
            Ouvrir les bureaux
          </Link>
        </div>
      </section>
    </div>
  );
}
