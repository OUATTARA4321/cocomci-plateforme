import type { Metadata } from "next";
import Link from "next/link";
import { OfficialBadge } from "@/components/official-badge";
import { getBureau, getMemberByBadge } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Mot du Président",
  description: "Message de KAMAGATÉ Lamine, président du Bureau national exécutif de la COCOMCI.",
};

export default async function PresidentPage() {
  const [president, bureau] = await Promise.all([getMemberByBadge("COC-GBK-2019-0001"), getBureau()]);
  return (
    <article className="wrap page-hero" style={{ paddingBottom: "3rem" }}>
      <p className="crumbs">
        <Link href="/">Accueil</Link> · Bureau national exécutif
      </p>
      <p className="kicker dark">Bouaké, au nom de la coordination</p>
      <h1>Mot du Président</h1>
      <div className="split" style={{ marginTop: 18 }}>
        <div className="prose">
          <p>Mesdames, Messieurs les opérateurs de commerce, chères sœurs et chers frères des marchés de Côte d&apos;Ivoire,</p>
          <p>
            Le 7 septembre 2019, à Bouaké, nous avons transformé un collectif en coordination. Ce jour-là, vous m&apos;avez confié, par quarante-quatre voix, la présidence du Bureau national exécutif. Ce n&apos;était pas un honneur personnel. C&apos;était un mandat : faire en sorte que le gouvernement ait enfin un regard clair sur les commerçants de Côte d&apos;Ivoire, et que les commerçants aient, eux, une voix unique, organisée, respectable.
          </p>
          <blockquote>Nous voulons l&apos;union sacrée de tous les commerçants du pays autour de leur coordination. Pas une union de façade. Une union de terrain, marché par marché, ville par ville, région par région.</blockquote>
          <p>
            Depuis ce premier congrès ordinaire, notre ligne n&apos;a pas changé. Fulbert Koffi tient le secrétariat général. Les vice-présidences, la trésorerie et les charges de l&apos;observatoire, de la carte et des affaires féminines sont occupées par des opérateurs qui ont encore un étal, pas par des permanents éloignés du tas.
          </p>
          <p>
            J&apos;invite chaque opérateur à s&apos;approprier la carte de commerçant et le badge officiel COCOMCI. Ce badge n&apos;est pas un ornement. C&apos;est la preuve que vous êtes identifié, que votre activité est reconnue, et que vous participez à une discipline commune : des prix lisibles, des étals tenus, un dialogue loyal avec les mairies, les services du commerce et les consommateurs.
          </p>
          <p>
            Les difficultés sont réelles. Le coût du transport, la volatilité des vivriers, la tension sur l&apos;oignon, la tomate ou le poisson fumé, les écarts entre prix plafonds et prix de détail, l&apos;accès aux points de vente dans les marchés reconstruits : nous les portons, nous les mesurons, nous les disons. L&apos;observatoire des cours n&apos;a qu&apos;une ambition — donner aux opérateurs, aux ménages et aux autorités les mêmes chiffres, relevés sur les marchés locaux.
          </p>
          <p>
            Nous installerons et consoliderons les coordinations sur toute l&apos;étendue du territoire. Aucune région ne doit rester sans relais. Le commerce intérieur n&apos;est pas une activité de seconde zone. Il nourrit les villes, fait vivre les familles et tient le lien entre le producteur et l&apos;assiette.
          </p>
          <p>Je compte sur vous. Restez unis. Portez votre badge. Remontez les cours. Parlez d&apos;une seule voix.</p>
          <p>
            <b>KAMAGATÉ Lamine</b>
            <br />
            Président du Bureau national exécutif
            <br />
            Bouaké
          </p>
        </div>
        <aside>
          {president ? <OfficialBadge member={president} /> : null}
          <div className="note" style={{ marginTop: 12 }}>
            Élu au premier congrès ordinaire face à Oumar Daouda, 44 voix contre 2. Le secrétariat général national est assuré par Fulbert Koffi depuis cette même séance, tenue en présence du représentant du ministre des Transports.
          </div>
        </aside>
      </div>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="kicker dark">Collège exécutif</p>
            <h2>Le Bureau national</h2>
          </div>
        </div>
        <div className="badge-grid">
          {bureau.map((member) => (
            <Link key={member.badgeNumber} href={`/membres/${member.badgeNumber}`}>
              <OfficialBadge member={member} />
            </Link>
          ))}
        </div>
        <div className="note" style={{ marginTop: 16 }}>
          La même règle vaut pour le territoire : chaque région, ville et commune a un coordinateur et un secrétaire général, badge validé.{" "}
          <Link href="/bureaux">Voir les bureaux territoriaux.</Link>
        </div>
      </section>
    </article>
  );
}
