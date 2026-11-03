import { Realisation } from '../models';

// ────────────────────────────────────────────────────────────────
//  Mes réalisations professionnelles.
//  Chaque réalisation alimente la section « Réalisations » et sa page de détail.
//  contexte : 'formation' (en cours), 'stage1' (stage de 1re année) ou 'stage2' (stage de 2e année).
//  L'ordre de cette liste est l'ordre d'affichage sur le site.
//  Pour en ajouter une : copie un bloc { ... } et change le slug (l'adresse de la page).
// ────────────────────────────────────────────────────────────────

export const REALISATIONS: Realisation[] = [
  {
    slug: 'stocks-en-ligne-marine-corail',
    titre: 'Stocks en ligne et chatbot pour Marine Corail',
    zh: '库存',
    contexte: 'stage2',
    lieu: 'Marine Corail',
    periode: '2026',
    resume:
      "Stage de deuxième année : mise en ligne des stocks sur le site de l'entreprise, et essai d'un chatbot pour répondre aux visiteurs.",
    technologies: ['Site web', 'Gestion des stocks', 'Chatbot'],
    competences: ['B1.2', 'B1.3'],
    preuves: {
      'B1.2': "J'ai pris en charge une demande d'évolution de l'entreprise : afficher ses stocks sur son site.",
      'B1.3': "J'ai fait évoluer le site de l'entreprise pour y publier ses données de stock, et j'ai testé un chatbot pour ses visiteurs.",
    },
    autresCompetences: [
      "Bloc 2 — Assurer la maintenance évolutive d'une solution applicative (le site de l'entreprise)",
      'Bloc 2 — Identifier, développer, utiliser ou adapter des composants logiciels (le chatbot)',
    ],
    contexteDetail:
      "Pour mon stage de deuxième année, j'étais chez Marine Corail. L'entreprise voulait que ses stocks soient consultables sur son site web.",
    objectifs: [
      'Mettre les stocks de l’entreprise en ligne, sur son site',
      'Étudier l’ajout d’un chatbot pour répondre aux questions des visiteurs',
    ],
    etapes: [
      'Analyse de la demande : quelles informations de stock afficher sur le site',
      'Mise en ligne des stocks sur le site de l’entreprise',
      "Essais d'intégration d'un chatbot sur le site",
    ],
    bilan:
      "Ce stage m'a fait travailler sur le site d'une vraie entreprise et sur ses données. Avec le chatbot, j'ai découvert comment on ajoute un service à un site existant.",
    liens: [],
  },
  {
    slug: 'affichage-dynamique-xibo',
    titre: 'Affichage dynamique avec Xibo',
    zh: '屏幕',
    contexte: 'stage1',
    lieu: 'Lycée Jules Garnier',
    periode: '2025',
    resume:
      "Stage de première année : mise en place de l'affichage dynamique Xibo pour diffuser des informations sur les téléviseurs du lycée.",
    technologies: ['Xibo (logiciel libre)', 'CMS Xibo', 'Lecteurs Xibo'],
    competences: ['B1.1', 'B1.5'],
    preuves: {
      'B1.1': "Les téléviseurs sont des ressources du lycée : dans Xibo, chaque écran doit être enregistré et autorisé dans le CMS avant d'afficher quoi que ce soit.",
      'B1.5': "J'ai mis en service l'affichage pour le lycée : contenus programmés, puis affichage vérifié sur les écrans.",
    },
    autresCompetences: [],
    contexteDetail:
      "Pour mon stage de première année, j'étais au lycée Jules Garnier. Le lycée voulait diffuser des informations sur des téléviseurs : c'est le rôle de Xibo, une solution libre d'affichage dynamique.",
    objectifs: [
      'Diffuser des informations sur les téléviseurs du lycée',
      "Utiliser Xibo : on crée les contenus dans une interface web (le CMS), et chaque écran les affiche grâce à un lecteur",
    ],
    etapes: [
      'Prise en main de Xibo : le CMS (interface web) et le lecteur installé pour chaque écran',
      'Connexion des téléviseurs au CMS',
      'Création et programmation des contenus à afficher',
      "Vérification de l'affichage sur les écrans",
    ],
    bilan:
      "C'était ma première mission en informatique : mettre en service un outil pour de vrais utilisateurs, du paramétrage jusqu'à l'affichage sur les écrans.",
    liens: [{ label: 'Site officiel de Xibo', url: 'https://xibosignage.com/' }],
  },
  {
    slug: 'portfolio-au-fil-du-li',
    titre: 'Portfolio « Au fil du Li »',
    zh: '画卷',
    contexte: 'formation',
    lieu: 'BTS SIO — Lycée Dick Ukeiwë',
    periode: '2026',
    modalite: 'Seul',
    resume:
      'Ce site : une application Angular animée avec GSAP, inspirée des paysages du Guangxi, testée automatiquement sur GitHub et hébergée sur un serveur.',
    technologies: ['Angular 21', 'TypeScript', 'SCSS', 'GSAP', 'Lenis', 'Vitest', 'GitHub', 'GitHub Actions'],
    competences: ['B1.3', 'B1.4', 'B1.5', 'B1.6'],
    preuves: {
      'B1.3': 'Site public, référencé (titre, description, plan du site) et conforme au cadre légal : mentions légales, aucun cookie.',
      'B1.4': 'Projet découpé en étapes (thème, structure, animations, tests, mise en ligne) et versionné avec Git.',
      'B1.5': 'Tests automatiques à chaque envoi sur GitHub (GitHub Actions), puis mise en ligne sur un serveur web (VPS).',
      'B1.6': 'Identité professionnelle en ligne (portfolio, LinkedIn, GitHub) et veille technologique présentée sur le site.',
    },
    autresCompetences: [
      'Bloc 2 — Exploiter les ressources du cadre applicatif (framework Angular)',
      'Bloc 2 — Identifier, développer, utiliser ou adapter des composants logiciels',
      'Bloc 2 — Réaliser les tests nécessaires à la mise en production (Vitest)',
      'Bloc 3 — Protéger les données à caractère personnel (aucun cookie, polices hébergées sur le site)',
    ],
    contexteDetail:
      "Pour le BTS SIO, je dois présenter un portfolio en ligne qui regroupe mon parcours, mes réalisations et ma veille technologique. Je voulais un site qui me ressemble : il raconte une descente de la rivière Li, dans le Guangxi, ma région d'origine.",
    objectifs: [
      'Présenter clairement mon parcours et mes réalisations au jury',
      'Rendre le site accessible : navigation au clavier, contrastes, respect du réglage « réduire les animations »',
      'Vérifier automatiquement le site à chaque modification (intégration continue), puis le mettre en ligne sur un serveur',
      'Respecter la vie privée des visiteurs : aucun cookie, aucun traceur, aucune police chargée chez un tiers',
    ],
    etapes: [
      'Choix du thème et de la charte : encre, papier de riz, sceaux rouges, montagnes de Guilin',
      'Création du projet Angular 21 : composants autonomes, signals, routage avec chargement à la demande',
      'Séparation du contenu dans des fichiers de données (src/app/data) pour le modifier sans toucher aux composants',
      'Animations GSAP (ScrollTrigger, SplitText, DrawSVG, MotionPath) et défilement doux avec Lenis',
      'Bouton pour couper les animations, mode nuit, mise en page adaptée au mobile',
      'Tests unitaires (Vitest) lancés automatiquement par GitHub Actions, puis mise en ligne sur un serveur (VPS)',
    ],
    bilan:
      "J'ai découvert Angular et TypeScript, l'organisation d'une application en composants et l'importance de l'accessibilité. La suite : compléter ma veille chaque mois.",
    liens: [
      { label: 'Code source du portfolio', url: 'https://github.com/C0rbi/portfolio-weimin' },
      { label: 'Mon profil GitHub', url: 'https://github.com/LWM07' },
    ],
  },
  {
    slug: 'premiers-pas-git-github',
    titre: 'Premiers pas avec Git et GitHub',
    zh: '版本',
    contexte: 'formation',
    lieu: 'BTS SIO — Lycée Dick Ukeiwë',
    periode: '2025 — 2026',
    modalite: 'Seul',
    resume:
      'Mes premiers dépôts : une page HTML/CSS développée sur une branche puis fusionnée par pull request, et un dépôt pour m’entraîner aux commits.',
    technologies: ['Git', 'GitHub', 'HTML', 'CSS', 'Visual Studio Code'],
    competences: ['B1.4', 'B1.6'],
    preuves: {
      'B1.4': 'Travail sur une branche et fusion par pull request : la base du travail en équipe sur un projet.',
      'B1.6': "Mes premiers dépôts GitHub font partie de mon environnement d'apprentissage : je m'y entraîne.",
    },
    autresCompetences: [
      "Bloc 2 — Exploiter les fonctionnalités d'un environnement de développement et de tests",
      "Bloc 2 — Intégrer en continu les versions d'une solution applicative",
    ],
    contexteDetail:
      "Un développeur doit savoir versionner son code pour travailler en équipe et revenir en arrière en cas d'erreur. J'ai créé mes premiers dépôts GitHub pour apprendre ces bases.",
    objectifs: [
      'Créer un dépôt et enregistrer mon travail par commits',
      'Travailler sur une branche, puis la fusionner avec une pull request',
      "Lire l'historique d'un projet",
    ],
    etapes: [
      '2025 — dépôt « portfolio » : création de la page index.html',
      'Création de la feuille de style main.css sur une branche « css »',
      'Fusion de la branche dans main par deux pull requests (n°1 et n°2)',
      '2026 — dépôt « TEST-SIO-WJ » : commits successifs sur une page HTML',
    ],
    bilan:
      "J'ai compris le cycle commit → push → pull request. Je l'utilise maintenant pour mon portfolio, et c'est ce qui permet de déployer le site automatiquement.",
    liens: [
      { label: 'Dépôt « portfolio » (2025)', url: 'https://github.com/LWM07/portfolio' },
      { label: 'Dépôt « TEST-SIO-WJ » (2026)', url: 'https://github.com/LWM07/TEST-SIO-WJ' },
    ],
  },
];
