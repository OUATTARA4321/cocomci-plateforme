const partners = [
  { name: "Commission de la Concurrence", short: "CC", type: "institutionnel" },
  { name: "Commission Contre la Cherté de la Vie", short: "CCCV", type: "institutionnel" },
  { name: "Ministère du Commerce et de l'Industrie", short: "MCI", type: "institutionnel" },
  { name: "Chambre de Commerce et d'Industrie de Côte d'Ivoire", short: "CCI-CI", type: "institutionnel" },
  { name: "Office d'aide à la Commercialisation des Produits Vivriers", short: "OCPV", type: "institutionnel" },
  { name: "Mairie de Bouaké", short: "MB", type: "public" },
  { name: "District Autonome d'Abidjan", short: "DAA", type: "public" },
  { name: "Port Autonome d'Abidjan", short: "PAA", type: "public" },
  { name: "Agence Nationale d'Appui au Développement Rural", short: "ANADER", type: "public" },
  { name: "Mutuelle des Commerçants de Côte d'Ivoire", short: "MCCI", type: "prive" },
  { name: "Banque des Opérateurs du Commerce", short: "BOC", type: "prive" },
  { name: "Compagnie Ivoirienne de Transport & Logistique", short: "CITL", type: "prive" },
  { name: "Assurance des Marchés et Étals", short: "AME", type: "prive" },
  { name: "Mobile Money des Commerçants", short: "MMC", type: "prive" },
];

const typeLabels: Record<string, string> = {
  institutionnel: "Institutionnel",
  public: "Public",
  prive: "Privé",
};

export function Partners({ title = "Ils accompagnent la coordination" }: { title?: string }) {
  const loop = [...partners, ...partners];
  return (
    <section className="partners-section" aria-label="Partenaires de la COCOMCI">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker dark">Partenaires privés, publics et institutionnels</p>
            <h2>{title}</h2>
          </div>
          <div className="partner-legend" aria-hidden="true">
            <span className="partner-tag institutionnel">Institutionnel</span>
            <span className="partner-tag public">Public</span>
            <span className="partner-tag prive">Privé</span>
          </div>
        </div>
      </div>
      <div className="partners-band">
        <div className="partners-track">
          {loop.map((partner, index) => (
            <article className="partner-card" key={`${partner.short}-${index}`} aria-hidden={index >= partners.length}>
              <span className={`partner-mono ${partner.type}`}>{partner.short}</span>
              <span className="partner-name">{partner.name}</span>
              <span className={`partner-tag ${partner.type}`}>{typeLabels[partner.type]}</span>
            </article>
          ))}
        </div>
      </div>
      <div className="wrap">
        <p className="muted partner-note">Cadre de partenariat illustratif — les conventions officielles sont publiées par le secrétariat général.</p>
      </div>
    </section>
  );
}
