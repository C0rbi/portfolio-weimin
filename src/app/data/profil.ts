import { GroupeSavoirFaire, Langue, PisteAvenir } from '../models';

// ────────────────────────────────────────────────────────────────
//  Mes informations. Modifie ce fichier pour mettre à jour le site.
// ────────────────────────────────────────────────────────────────

export const PROFIL = {
  prenom: 'Weimin',
  nom: 'LIU',
  age: 21,
  titre: 'Étudiant en BTS SIO, option SLAM',
  ecole: 'Lycée Dick Ukeiwë',
  ville: 'Nouméa, Nouvelle-Calédonie',
  origine: 'Guangxi, Chine',
  email: 'liuwm0716@gmail.com',
  github: 'https://github.com/LWM07',
  /** Laisser vide pour masquer le lien. */
  linkedin: 'https://www.linkedin.com/in/weimin-liu-2a73332b6/',
  photo: 'images/weimin-liu.jpg',
  cv: 'documents/cv-weimin-liu.pdf',
} as const;

/**
 * Hébergeur affiché dans les mentions légales : obligatoire.
 * À remplir par la personne qui met le site sur son serveur (voir DEPLOIEMENT.md).
 */
export const HEBERGEUR: { nom: string; adresse: string; site?: string } = {
  nom: 'À compléter : nom de l’hébergeur du serveur',
  adresse: 'À compléter : adresse de l’hébergeur',
};

export const PRESENTATION = [
  "Je m'appelle Weimin, j'ai 21 ans et je suis en deuxième année de BTS SIO, option SLAM (solutions logicielles et applications métiers), au lycée Dick Ukeiwë à Nouméa.",
  "Je suis originaire du Guangxi, une région du sud de la Chine connue pour les montagnes de Guilin et la rivière Li. C'est ce paysage qui a inspiré ce portfolio : on le parcourt comme on descend le fleuve, étape par étape.",
  "J'aime l'informatique, les jeux vidéo et la musique. En BTS, j'apprends à concevoir des applications, du site web à la base de données, en pensant à leurs utilisateurs et à leur sécurité.",
];

export const LANGUES: Langue[] = [
  { nom: 'Chinois', natif: '中文', niveau: 'Langue maternelle', jauge: 5 },
  { nom: 'Français', natif: 'Français', niveau: 'Niveau professionnel', jauge: 3 },
  { nom: 'Anglais', natif: 'English', niveau: 'Bases solides, en progrès', jauge: 2 },
  { nom: 'Japonais', natif: '日本語', niveau: 'Bases scolaires', jauge: 1 },
];

export const CENTRES_INTERET = [
  { nom: 'Informatique', zh: '电脑', detail: 'Comprendre comment fonctionnent les logiciels et les créer.' },
  { nom: 'Jeux vidéo', zh: '游戏', detail: "Ce qui m'a donné envie de voir l'envers du décor." },
  { nom: 'Musique', zh: '音乐', detail: 'Pour se concentrer… ou faire une pause.' },
];

export const SAVOIR_FAIRE: GroupeSavoirFaire[] = [
  {
    titre: 'Langages',
    zh: '语言',
    items: [
      { nom: 'HTML', sigle: 'HTML', couleur: '#c8532b', detail: 'Structure des pages web' },
      { nom: 'CSS', sigle: 'CSS', couleur: '#2f63a8', detail: 'Mise en page, responsive' },
      { nom: 'Python', sigle: 'Py', couleur: '#3d6e99', detail: 'Programmation, algorithmes' },
      { nom: 'SQL', sigle: 'SQL', couleur: '#2f6b5e', detail: 'Requêtes sur une base de données' },
      { nom: 'TypeScript', sigle: 'TS', couleur: '#2f6fb5', detail: 'Découvert avec ce portfolio' },
    ],
  },
  {
    titre: 'Frameworks',
    zh: '框架',
    items: [
      { nom: 'Angular', sigle: 'Ng', couleur: '#b8321f', detail: 'Découvert avec ce portfolio' },
      { nom: 'GSAP', sigle: 'GS', couleur: '#4d7a2a', detail: 'Animations au défilement' },
    ],
  },
  {
    titre: 'Outils',
    zh: '工具',
    items: [
      { nom: 'Visual Studio Code', sigle: 'VS', couleur: '#2e6ea6', detail: 'Mon éditeur de code' },
      { nom: 'Git & GitHub', sigle: 'Git', couleur: '#b8442b', detail: 'Commits, branches, pull requests' },
      { nom: 'XAMPP', sigle: 'XA', couleur: '#c06a1c', detail: 'Serveur web local (Apache, MySQL)' },
    ],
  },
];

// « Mettre en place son environnement d'apprentissage personnel » (compétence B1.6) :
// le jury attend un environnement « délimité et expliqué ». Adapte cette liste à ta façon de travailler.
export const ENVIRONNEMENT_APPRENTISSAGE = [
  {
    titre: 'Mes outils',
    zh: '器',
    elements: ['Visual Studio Code', 'Git et GitHub pour versionner chaque projet', 'XAMPP pour tester en local'],
  },
  {
    titre: 'Où j’apprends',
    zh: '书',
    elements: [
      'Les cours et TP du BTS SIO',
      'La documentation officielle : MDN Web Docs, angular.dev, docs.python.org',
      'Les sites francophones de veille (voir ma page Veille)',
    ],
  },
  {
    titre: 'Comment je progresse',
    zh: '练',
    elements: [
      'Un projet concret pour chaque nouvelle notion (comme ce portfolio)',
      "L'entraide avec mes camarades de promotion",
      'Des assistants IA pour expliquer du code, en vérifiant toujours ce qu’ils proposent',
    ],
  },
];

// Besoins de formation identifiés (également évalués en B1.6).
export const BESOINS_FORMATION = [
  'Un framework côté serveur (PHP/Symfony ou Java/Spring)',
  'Les tests automatisés et la qualité du code',
  'La sécurité des applications web (recommandations OWASP)',
  "L'anglais technique, pour lire la documentation plus vite",
];

export const PISTES_AVENIR: PisteAvenir[] = [
  {
    titre: 'Continuer mes études',
    zh: '深造',
    pinyin: 'shēnzào',
    description:
      'Une licence professionnelle ou un bachelor (Bac+3) pour aller plus loin en développement, en formation initiale ou en alternance.',
    exemples: ['Licence pro en développement web', 'Bachelor / BUT informatique (3e année)', 'Alternance pour gagner en expérience'],
  },
  {
    titre: 'Entrer dans la vie active',
    zh: '就业',
    pinyin: 'jiùyè',
    description:
      'Un premier poste après le BTS, en Nouvelle-Calédonie ou ailleurs, pour apprendre au contact d’une équipe.',
    exemples: ['Développeur web junior', 'Technicien support applicatif', 'Intégrateur web'],
  },
  {
    titre: 'Miser sur mes langues',
    zh: '语言',
    pinyin: 'yǔyán',
    description:
      'Je parle chinois et français : un vrai atout pour les entreprises tournées vers l’Asie-Pacifique.',
    exemples: ['Projets internationaux', 'Applications multilingues', 'Clients et partenaires sinophones'],
  },
];
