export type ToolHelp = {
  title: string;
  eyebrow: string;
  value: string;
  how: string[];
  output: string;
  businessCase: string;
};

export const toolHelpByPath: Record<string, ToolHelp> = {
  "/dashboard": {
    title: "Tableau de bord",
    eyebrow: "Vue executive",
    value: "Centralise les modules IA, les signaux importants et les parcours de demonstration pour presenter la plateforme sans improviser.",
    how: [
      "Regroupe les indicateurs, alertes et raccourcis les plus utiles.",
      "Sert de point d'entree vers chaque assistant metier.",
      "Met en avant les scenarios qui racontent la valeur en rendez-vous client.",
    ],
    output: "Une lecture instantanee de l'activite, des modules disponibles et des prochaines actions.",
    businessCase:
      "Pendant un rendez-vous, le dirigeant voit en quelques secondes comment l'IA relie leads, offres, reunions, documents et actions.",
  },
  "/dashboard/demo": {
    title: "Parcours demo",
    eyebrow: "Support rendez-vous",
    value: "Raconte la plateforme comme une histoire client : une demande arrive, l'IA qualifie, produit une offre, prepare les messages puis transforme les decisions en actions.",
    how: [
      "Guide le presenter et le client etape par etape.",
      "Relie les modules dans un scenario business coherent.",
      "Met en evidence les livrables concrets a chaque etape.",
    ],
    output: "Un script de demonstration clair avec modules, resultats attendus et angles de pitch.",
    businessCase:
      "En rendez-vous, cette page sert de support pour montrer la valeur globale sans naviguer au hasard entre les outils.",
  },
  "/dashboard/taches": {
    title: "File des taches",
    eyebrow: "Execution quotidienne",
    value: "Transforme les sorties IA en actions lisibles : relances, validations, suivis commerciaux ou decisions de reunion.",
    how: [
      "Agrege les taches issues des autres modules.",
      "Classe les actions par priorite, statut et source.",
      "Permet de revenir au module d'origine pour traiter le sujet.",
    ],
    output: "Une liste d'actions priorisees et exploitable par l'equipe.",
    businessCase:
      "Evite que les decisions importantes restent dans un email, un compte-rendu ou une conversation informelle.",
  },
  "/dashboard/facturation": {
    title: "Creation facture",
    eyebrow: "Finance operationnelle",
    value: "Accelere la preparation de factures a partir d'un brief, de lignes commerciales et d'un apercu structure.",
    how: [
      "Convertit les informations projet en lignes facture.",
      "Calcule et presente les montants dans un format lisible.",
      "Prepare un apercu exploitable avant validation humaine.",
    ],
    output: "Une facture brouillon claire, prete a verifier puis exporter.",
    businessCase:
      "Reduit le temps passe a recopier les donnees et limite les oublis entre offre, livraison et facturation.",
  },
  "/dashboard/linkedin": {
    title: "LinkedIn entreprise",
    eyebrow: "Social selling",
    value: "Aide a transformer une actualite, un projet ou une expertise en post LinkedIn professionnel.",
    how: [
      "Part d'un contexte business ou technique.",
      "Genere un brouillon structure avec ton professionnel.",
      "Permet de valider, ajuster puis simuler la publication.",
    ],
    output: "Un post LinkedIn coherent avec la voix de l'entreprise.",
    businessCase:
      "Valorise les realisations techniques et nourrit la presence commerciale sans repartir de zero a chaque publication.",
  },
  "/dashboard/demandes-entrantes": {
    title: "Demandes entrantes",
    eyebrow: "Qualification leads",
    value: "Analyse les demandes web, extrait les informations utiles et prepare une reponse exploitable rapidement.",
    how: [
      "Lit le message brut et en extrait l'intention.",
      "Attribue un score, une urgence et une recommandation.",
      "Prepare une reponse et une relance adaptees.",
    ],
    output: "Une demande qualifiee avec action proposee et message pret a envoyer.",
    businessCase:
      "Aide l'equipe commerciale a repondre vite, avec le bon angle, sans perdre les leads chauds.",
  },
  "/dashboard/recherche-docs": {
    title: "Recherche docs",
    eyebrow: "Assistant documentaire",
    value: "Permet d'interroger des catalogues, notices et documents techniques comme une base de connaissance conversationnelle.",
    how: [
      "Prend une question produit ou technique.",
      "Recherche les passages pertinents dans les documents.",
      "Retourne une reponse synthetique avec reference exploitable.",
    ],
    output: "Une reponse documentee, plus rapide qu'une recherche manuelle dans les PDF.",
    businessCase:
      "Un technicien ou commercial trouve rapidement la bonne reference pour repondre a un client ou preparer une offre.",
  },
  "/dashboard/redaction-offres": {
    title: "Redaction offres",
    eyebrow: "Offres commerciales",
    value: "Structure les informations projet et genere un brouillon d'offre lisible, coherent et presentable.",
    how: [
      "Collecte le contexte client et les besoins.",
      "Organise les sections de l'offre.",
      "Produit un apercu pret pour validation ou export.",
    ],
    output: "Une offre brouillon avec structure, arguments et details projet.",
    businessCase:
      "Standardise la qualite des offres et reduit le temps de preparation avant envoi client.",
  },
  "/dashboard/reunion-ia": {
    title: "Reunion IA",
    eyebrow: "Compte-rendu intelligent",
    value: "Transforme une reunion en resume clair, decisions, actions et messages de suivi.",
    how: [
      "Simule la captation d'une reunion.",
      "Isole les decisions et points d'action.",
      "Relie les actions aux taches et emails de suivi.",
    ],
    output: "Un compte-rendu operationnel, avec taches et prochaine communication.",
    businessCase:
      "Evite la perte d'information apres les reunions et accelere le passage de la discussion a l'execution.",
  },
  "/dashboard/redaction-emails": {
    title: "Redaction emails",
    eyebrow: "Communication metier",
    value: "Genere des emails professionnels pour relance, offre, confirmation ou suivi client.",
    how: [
      "Part d'un objectif et d'un contexte.",
      "Adapte le ton a l'entreprise.",
      "Produit un message pret a relire et envoyer.",
    ],
    output: "Un email structure, clair et coherent avec la relation client.",
    businessCase:
      "Gagne du temps sur les messages repetitifs tout en gardant un niveau de qualite constant.",
  },
  "/dashboard/triage-emails": {
    title: "Triage emails",
    eyebrow: "Inbox intelligente",
    value: "Classe les emails entrants pour identifier ce qui est urgent, utile ou simplement informatif.",
    how: [
      "Analyse les messages et leur intention.",
      "Classe par priorite et categorie.",
      "Propose une action ou un statut de traitement.",
    ],
    output: "Une boite de reception triee avec priorites claires.",
    businessCase:
      "Permet a l'equipe de se concentrer sur les messages qui ont un impact business immediat.",
  },
  "/dashboard/studio-visuel": {
    title: "Studio 3D",
    eyebrow: "Visual intelligence",
    value: "Affiche et prepare des modeles 3D pour illustrer des produits, concepts ou offres client.",
    how: [
      "Charge des fichiers GLB de demonstration.",
      "Permet de basculer entre vues et modes de rendu.",
      "Simule un flux futur de generation visuelle assistee.",
    ],
    output: "Un viewer 3D presentable pour appuyer un devis, une offre ou une reunion technique.",
    businessCase:
      "Aide un client a comprendre rapidement une solution produit sans attendre une maquette finale.",
  },
  "/dashboard/studio-marketing": {
    title: "Studio marketing",
    eyebrow: "Creation visuelle",
    value: "Transforme un brief en pistes visuelles marketing pour catalogue, LinkedIn ou support commercial.",
    how: [
      "Collecte l'objectif de communication.",
      "Propose des variantes de visuels et angles creatifs.",
      "Relie les creations aux actions commerciales.",
    ],
    output: "Des concepts visuels coherents avec la marque et les usages commerciaux.",
    businessCase:
      "Accellere la creation de supports sans bloquer l'equipe sur une page blanche.",
  },
  "/dashboard/veille": {
    title: "Veille",
    eyebrow: "Intelligence marche",
    value: "Synthese les informations marche, salons et signaux sectoriels utiles a la direction.",
    how: [
      "Regroupe des sources et sujets de veille.",
      "Resume ce qui change et pourquoi c'est important.",
      "Met en avant les opportunites ou risques.",
    ],
    output: "Un brief de veille lisible, oriente decision.",
    businessCase:
      "Donne a la direction une vision rapide des tendances et signaux faibles a surveiller.",
  },
  "/dashboard/gestion-roles": {
    title: "Gestion des roles",
    eyebrow: "Administration",
    value: "Controle les profils d'acces et montre quels modules sont visibles selon le role utilisateur.",
    how: [
      "Liste les roles et permissions.",
      "Montre les modules accessibles ou restreints.",
      "Aide a valider la gouvernance de la plateforme.",
    ],
    output: "Une matrice claire des acces par profil.",
    businessCase:
      "Rassure sur la securite et permet de presenter une plateforme adaptee aux responsabilites de chacun.",
  },
  "/dashboard/parametres": {
    title: "Parametres workspace",
    eyebrow: "Configuration",
    value: "Centralise les preferences et reglages de demonstration du workspace.",
    how: [
      "Expose les options de personnalisation.",
      "Permet de tester les preferences d'interface.",
      "Rassemble les reglages transverses.",
    ],
    output: "Un espace de configuration clair pour ajuster l'experience.",
    businessCase:
      "Montre que la plateforme peut etre adaptee au contexte, aux equipes et aux usages client.",
  },
};

export function getToolHelp(pathname: string): ToolHelp | undefined {
  if (toolHelpByPath[pathname]) return toolHelpByPath[pathname];
  const normalized = pathname.replace(/\/$/, "");
  return toolHelpByPath[normalized];
}
