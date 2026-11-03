import { BlocReferentiel, CompetenceB1 } from '../models';

// Référentiel du BTS SIO (bloc 1, commun aux options SISR et SLAM).
// Elles sont évaluées à l'épreuve E5, à partir du portfolio.
// Attention : depuis la session 2025, les épreuves sont renumérotées
// (bloc 1 = E5, bloc 2 = E6, bloc 3 = E7 ; E4 = culture économique, juridique et managériale).
// Les codes B1.1 à B1.6 sont une convention d'usage : le tableau officiel n'affiche que les intitulés.
export const COMPETENCES_B1: CompetenceB1[] = [
  {
    code: 'B1.1',
    titre: 'Gérer le patrimoine informatique',
    court: 'Patrimoine informatique',
    zh: '资产',
    description: 'Recenser les ressources numériques, gérer les habilitations, les sauvegardes et la continuité de service.',
    sousCompetences: [
      'Recenser et identifier les ressources numériques',
      'Exploiter des référentiels, normes et standards adoptés par le prestataire informatique',
      "Mettre en place et vérifier les niveaux d'habilitation associés à un service",
      "Vérifier les conditions de la continuité d'un service informatique",
      'Gérer des sauvegardes',
      "Vérifier le respect des règles d'utilisation des ressources numériques",
    ],
  },
  {
    code: 'B1.2',
    titre: "Répondre aux incidents et aux demandes d'assistance et d'évolution",
    court: 'Incidents et assistance',
    zh: '支援',
    description: 'Collecter, suivre et traiter les demandes des utilisateurs, qu’il s’agisse d’un incident ou d’une évolution.',
    sousCompetences: [
      'Collecter, suivre et orienter des demandes',
      'Traiter des demandes concernant les services réseau et système, applicatifs',
      'Traiter des demandes concernant les applications',
    ],
  },
  {
    code: 'B1.3',
    titre: "Développer la présence en ligne de l'organisation",
    court: 'Présence en ligne',
    zh: '在线',
    description: 'Valoriser l’image de l’organisation sur le web, référencer ses services et faire évoluer son site.',
    sousCompetences: [
      "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques",
      "Référencer les services en ligne de l'organisation et mesurer leur visibilité",
      "Participer à l'évolution d'un site Web exploitant les données de l'organisation",
    ],
  },
  {
    code: 'B1.4',
    titre: 'Travailler en mode projet',
    court: 'Mode projet',
    zh: '项目',
    description: 'Analyser les objectifs d’un projet, planifier les activités et suivre l’avancement.',
    sousCompetences: [
      "Analyser les objectifs et les modalités d'organisation d'un projet",
      'Planifier les activités',
      "Évaluer les indicateurs de suivi d'un projet et analyser les écarts",
    ],
  },
  {
    code: 'B1.5',
    titre: 'Mettre à disposition des utilisateurs un service informatique',
    court: 'Mise à disposition',
    zh: '部署',
    description: 'Tester, déployer un service et accompagner les utilisateurs dans sa prise en main.',
    sousCompetences: [
      "Réaliser les tests d'intégration et d'acceptation d'un service",
      'Déployer un service',
      "Accompagner les utilisateurs dans la mise en place d'un service",
    ],
  },
  {
    code: 'B1.6',
    titre: 'Organiser son développement professionnel',
    court: 'Développement professionnel',
    zh: '成长',
    description: 'Apprendre en continu, faire sa veille, gérer son identité professionnelle et son projet.',
    sousCompetences: [
      "Mettre en place son environnement d'apprentissage personnel",
      'Mettre en œuvre des outils et stratégies de veille informationnelle',
      'Gérer son identité professionnelle',
      'Développer son projet professionnel',
    ],
  },
];

export const BLOCS: BlocReferentiel[] = [
  {
    numero: 1,
    titre: 'Support et mise à disposition de services informatiques',
    epreuve: 'Épreuve E5 — oral de 40 min sur le portfolio',
    competences: COMPETENCES_B1.map((c) => c.titre),
  },
  {
    numero: 2,
    titre: "Conception et développement d'applications (option SLAM)",
    epreuve: 'Épreuve E6 — pratique et orale, sur deux réalisations',
    competences: [
      'Concevoir et développer une solution applicative',
      "Assurer la maintenance corrective ou évolutive d'une solution applicative",
      'Gérer les données',
    ],
  },
  {
    numero: 3,
    titre: 'Cybersécurité des services informatiques',
    epreuve: 'Épreuve E7 — écrit de 4 heures',
    competences: [
      'Protéger les données à caractère personnel',
      "Préserver l'identité numérique de l'organisation",
      'Sécuriser les équipements et les usages des utilisateurs',
      "Garantir la disponibilité, l'intégrité et la confidentialité des services et des données face à des cyberattaques",
      "Assurer la cybersécurité d'une solution applicative et de son développement",
    ],
  },
];
