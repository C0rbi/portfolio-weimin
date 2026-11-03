import { ArticleVeille, SourceVeille } from '../models';

// ────────────────────────────────────────────────────────────────
//  Ma veille technologique. Ajoute une fiche par actualité marquante
//  (idéalement au moins une par mois), la plus récente en premier.
//  Le champ « analyse » doit être TON avis : c'est ce que le jury regarde.
// ────────────────────────────────────────────────────────────────

export const SUJET_VEILLE = {
  titre: 'Les passkeys : vers la fin des mots de passe ?',
  zh: '通行密钥',
  pinyin: 'tōngxíng mìyào',
  problematique:
    "Les passkeys (clés d'accès) peuvent-elles remplacer les mots de passe, et qu'est-ce que cela change pour les utilisateurs et pour les développeurs d'applications ?",
  pourquoi: [
    "La cybersécurité est au programme du BTS (bloc 3, épreuve E7) et les mots de passe volés restent une des premières causes d'attaques.",
    "C'est un sujet de développeur : les passkeys reposent sur une API du navigateur, WebAuthn, que l'on peut intégrer dans ses propres applications.",
    'L’actualité est régulière et facile à suivre : Apple, Google, Microsoft et la FIDO Alliance publient souvent des annonces.',
  ],
};

export const METHODE_VEILLE = [
  {
    zh: '集',
    titre: 'Collecter',
    texte: 'Des flux RSS rassemblés dans un agrégateur (Feedly) et des Google Alertes sur quelques mots-clés.',
  },
  {
    zh: '选',
    titre: 'Trier',
    texte: 'Je garde les informations datées et vérifiables, en remontant si possible à la source officielle.',
  },
  {
    zh: '析',
    titre: 'Analyser',
    texte: 'Pour chaque actualité retenue : une fiche avec la date, la source, un résumé et mon avis.',
  },
  {
    zh: '享',
    titre: 'Partager',
    texte: 'Les fiches sont publiées ici, de la plus récente à la plus ancienne, avec une synthèse.',
  },
];

export const MOTS_CLES_ALERTES = [
  'passkey OR passkeys',
  '"clé d\'accès" "mot de passe"',
  'FIDO2 OR WebAuthn',
  '"FIDO Alliance"',
  'passwordless OR "sans mot de passe"',
  'CNIL authentification',
];

export const SOURCES_VEILLE: SourceVeille[] = [
  {
    nom: 'FIDO Alliance',
    url: 'https://fidoalliance.org/feed/',
    type: 'Flux RSS',
    langue: 'EN',
    pourquoi: "L'organisme qui écrit les standards des passkeys : chiffres officiels et annonces.",
  },
  {
    nom: 'CNIL — actualités',
    url: 'https://www.cnil.fr/fr/rss.xml',
    type: 'Flux RSS',
    langue: 'FR',
    pourquoi: 'Le point de vue juridique et les recommandations sur l’authentification.',
  },
  {
    nom: 'CERT-FR (ANSSI)',
    url: 'https://cert.cyber.gouv.fr/feed/',
    type: 'Flux RSS',
    langue: 'FR',
    pourquoi: 'Les alertes et rapports de l’agence française de cybersécurité.',
  },
  {
    nom: 'Next',
    url: 'https://next.ink/feed/',
    type: 'Flux RSS',
    langue: 'FR',
    pourquoi: 'Média tech français sérieux, qui reprend souvent les annonces sur les passkeys.',
  },
  {
    nom: 'IT-Connect',
    url: 'https://www.it-connect.fr/feed/',
    type: 'Flux RSS',
    langue: 'FR',
    pourquoi: 'Tutoriels et actualités d’administration système, accessibles au niveau BTS.',
  },
  {
    nom: 'Microsoft Security Blog',
    url: 'https://www.microsoft.com/en-us/security/blog/feed/',
    type: 'Flux RSS',
    langue: 'EN',
    pourquoi: 'Source officielle pour Windows, les comptes Microsoft et Entra ID.',
  },
  {
    nom: 'Google Online Security Blog',
    url: 'https://security.googleblog.com/feeds/posts/default',
    type: 'Flux RSS',
    langue: 'EN',
    pourquoi: 'Source officielle pour Android, Chrome et les comptes Google.',
  },
  {
    nom: 'passkeys.dev',
    url: 'https://passkeys.dev',
    type: 'Documentation',
    langue: 'EN',
    pourquoi: 'La documentation technique de référence pour les développeurs.',
  },
];

export const FONCTIONNEMENT = [
  {
    titre: 'Inscription',
    texte:
      "Le site envoie un défi. L'appareil crée une paire de clés propre à ce site : la clé privée reste chez moi, le serveur ne garde que la clé publique.",
  },
  {
    titre: 'Connexion',
    texte:
      "Le serveur envoie un nouveau défi. Je déverrouille mon appareil (empreinte, visage ou code) et il signe le défi avec la clé privée. Le serveur vérifie la signature avec la clé publique.",
  },
  {
    titre: 'Anti-hameçonnage',
    texte:
      'La passkey est liée au nom de domaine du site : un faux site ne peut rien obtenir. Et si la base du serveur fuit, elle ne contient que des clés publiques, inutiles pour se connecter.',
  },
];

export const LIMITES = [
  {
    titre: 'Dépendance aux écosystèmes',
    texte:
      "Les passkeys synchronisées sont stockées chez Apple, Google, Microsoft ou un gestionnaire de mots de passe. Le transfert de l'un à l'autre n'arrive qu'en 2025-2026 et n'est pas encore partout.",
  },
  {
    titre: 'La récupération de compte',
    texte:
      "Si l'on perd ses appareils, on revient au mot de passe, au SMS ou à l'e-mail. Ces solutions de secours deviennent la cible des attaquants.",
  },
  {
    titre: "La sécurité de l'appareil",
    texte:
      "Une passkey protège la connexion, pas la session ouverte ensuite. Pour la CNIL, elle n'est pas forcément multifacteur : tout dépend du verrouillage de l'appareil.",
  },
];

export const ARTICLES_VEILLE: ArticleVeille[] = [
  {
    date: '2026-10-20',
    titre: 'Amazon : plus de 500 millions de clients utilisent une passkey',
    source: 'Amazon',
    url: 'https://www.aboutamazon.com/news/retail/amazon-passwordless-sign-in-passkey',
    resume:
      'Amazon met à jour son bilan : plus d’un demi-milliard de clients se connectent avec une passkey, et la connexion serait six fois plus rapide qu’avec un mot de passe.',
    analyse:
      'Un site de commerce aussi grand public montre que les passkeys ne sont plus réservées aux experts.',
    tags: ['Adoption', 'E-commerce'],
  },
  {
    date: '2026-10-15',
    titre: 'Passkey Index 2026 : plus d’une connexion sur trois passe par une passkey',
    source: 'FIDO Alliance',
    url: 'https://fidoalliance.org/7-billion-passkeys-and-counting-the-next-chapter-of-passwordless-authentication/',
    resume:
      'Sur 15 grands services, 36 % des connexions réussies utilisent une passkey (26 % en 2025). Elles aboutissent dans 93 % des cas, contre 78 % pour un mot de passe avec double authentification. La FIDO Alliance estime à 7 milliards le nombre de passkeys.',
    analyse:
      'Les chiffres progressent vite et l’argument n’est pas seulement la sécurité : la connexion échoue moins souvent, donc moins d’appels au support.',
    tags: ['Chiffres', 'FIDO Alliance'],
  },
  {
    date: '2026-07-13',
    titre: 'Microsoft Entra ID : la passkey devient la méthode par défaut, le SMS est abandonné',
    source: 'Microsoft Security Blog',
    url: 'https://www.microsoft.com/en-us/security/blog/2026/07/13/microsoft-entra-id-security-updates-passkeys-are-the-default-authentication-method-in-entra-id/',
    resume:
      'Depuis septembre 2026, les comptes professionnels qui se connectent par SMS ou appel sont invités à créer une passkey. En février 2027, Microsoft cessera d’envoyer lui-même ces SMS.',
    analyse:
      'C’est un signal fort pour les entreprises : le SMS, facile à détourner, est en train de disparaître. Les techniciens support vont devoir accompagner ce changement.',
    tags: ['Entreprise', 'Microsoft'],
  },
  {
    date: '2026-06-01',
    titre: 'Android : import et export des passkeys entre gestionnaires',
    source: 'Google (notes de version Play services)',
    url: 'https://support.google.com/product-documentation/answer/14343500',
    resume:
      'Le gestionnaire de mots de passe de Google peut échanger mots de passe et passkeys avec d’autres gestionnaires (Bitwarden, 1Password…), grâce au standard Credential Exchange de la FIDO Alliance.',
    analyse:
      'Cela répond à une vraie critique : on n’est plus « enfermé » chez un seul fournisseur. Le transfert se fait sans fichier CSV en clair, ce qui est plus sûr.',
    tags: ['Portabilité', 'Android'],
  },
  {
    date: '2026-05-07',
    titre: 'Journée mondiale de la passkey : 75 % des internautes en ont activé une',
    source: 'FIDO Alliance',
    url: 'https://fidoalliance.org/fido-alliance-reports-accelerating-global-passkey-adoption-on-world-passkey-day-2026/',
    resume:
      'Selon une enquête dans 10 pays, 90 % des internautes connaissent les passkeys et 75 % en ont activé au moins une. Mais 57 % des entreprises utilisent encore des méthodes vulnérables au phishing pour leurs salariés.',
    analyse:
      'Le grand public avance plus vite que les entreprises. Pour un développeur, proposer les passkeys dans une application métier devient une attente des utilisateurs.',
    tags: ['Chiffres', 'Entreprise'],
  },
  {
    date: '2025-11-11',
    titre: 'Windows 11 accepte les gestionnaires de passkeys tiers',
    source: 'Windows IT Pro Blog (Microsoft)',
    url: 'https://techcommunity.microsoft.com/blog/windows-itpro-blog/-/4467572',
    resume:
      'Depuis la mise à jour de novembre 2025, on peut stocker ses passkeys dans 1Password, Bitwarden ou le gestionnaire de Microsoft, avec une validation par Windows Hello.',
    analyse: 'Windows rattrape Apple et Google : les passkeys deviennent utilisables sur tous les systèmes courants.',
    tags: ['Windows', 'Gestionnaires'],
  },
  {
    date: '2025-07-31',
    titre: 'Le NIST accepte les passkeys synchronisées',
    source: 'NIST (SP 800-63-4)',
    url: 'https://csrc.nist.gov/pubs/sp/800/63/4/final',
    resume:
      'Les nouvelles lignes directrices américaines sur l’identité numérique reconnaissent les passkeys synchronisées dans le cloud comme une authentification forte (niveau AAL2), si elles sont chiffrées et protégées.',
    analyse:
      'Une référence officielle rassure les entreprises et les administrations, qui s’appuient sur ces normes pour choisir leurs solutions.',
    tags: ['Normes', 'NIST'],
  },
  {
    date: '2025-06',
    titre: 'Apple ouvre le transfert sécurisé des passkeys (iOS 26)',
    source: 'Apple — WWDC25',
    url: 'https://developer.apple.com/videos/play/wwdc2025/279/',
    resume:
      'Apple annonce qu’iOS, iPadOS et macOS 26 permettront de transférer passkeys et mots de passe d’un gestionnaire à un autre, directement d’application à application, selon un format standardisé avec la FIDO Alliance.',
    analyse: 'Apple, Google et la FIDO Alliance avancent dans la même direction : c’est rare et bon signe pour un standard.',
    tags: ['Portabilité', 'Apple'],
  },
  {
    date: '2025-05-01',
    titre: 'Les nouveaux comptes Microsoft sont sans mot de passe par défaut',
    source: 'Microsoft Security Blog',
    url: 'https://www.microsoft.com/en-us/security/blog/2025/05/01/pushing-passkeys-forward-microsofts-latest-updates-for-simpler-safer-sign-ins/',
    resume:
      'Microsoft ne demande plus de mot de passe à la création d’un compte et permet aux anciens comptes de supprimer le leur. Les connexions par passkey réussissent 98 % du temps, contre 32 % avec un mot de passe.',
    analyse: 'C’est le point de départ de ma veille : un géant du logiciel qui considère le mot de passe comme un problème.',
    tags: ['Grand public', 'Microsoft'],
  },
  {
    date: '2025-04-01',
    titre: 'La CNIL publie sa recommandation sur l’authentification multifacteur',
    source: 'CNIL',
    url: 'https://www.cnil.fr/fr/recommandation-mfa',
    resume:
      'La CNIL explique comment mettre en place la double authentification en respectant le RGPD. Elle classe la passkey parmi les méthodes robustes, sans la considérer automatiquement comme multifacteur.',
    analyse:
      'Utile pour l’épreuve de cybersécurité : un développeur doit choisir une authentification adaptée aux données qu’il protège.',
    tags: ['Juridique', 'CNIL'],
  },
];

export const BILAN_VEILLE = [
  "En un an et demi, les passkeys sont passées de la promesse à l'usage : Microsoft, Google, Apple et Amazon les proposent par défaut et plus d'un tiers des connexions les utilisent sur les grands services.",
  "Elles ne font pas disparaître le mot de passe tout de suite : il reste en secours, et c'est justement ce secours qui devient le point faible. Le prochain enjeu est donc la récupération de compte.",
  "Pour moi, futur développeur, la leçon est claire : une nouvelle application devrait proposer les passkeys (API WebAuthn) et traiter la récupération de compte avec autant de soin que la connexion.",
];

/** Autres sujets de veille possibles (présentés dans le guide). */
export const AUTRES_SUJETS = [
  'Les assistants IA de programmation (Copilot, Claude Code…)',
  "Les nouveautés d'Angular (Signals, mode sans zone.js)",
  "Les attaques de la chaîne d'approvisionnement npm",
  "Les modèles d'IA open source chinois (DeepSeek, Qwen)",
];
