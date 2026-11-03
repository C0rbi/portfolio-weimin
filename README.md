# Portfolio de Weimin LIU — « Au fil du Li »

Portfolio de BTS SIO option SLAM (session 2026), sur le thème des paysages du Guangxi : on le parcourt comme une
descente de la rivière Li, de la source (mes origines) jusqu'au contact.

- **Angular 21** (TypeScript, composants autonomes, signals, sans zone.js)
- **GSAP 3.15** (ScrollTrigger, SplitText, DrawSVG, MotionPath) et **Lenis** pour le défilement doux
- Mode jour / nuit, bouton pour couper les animations, adapté au mobile
- Aucun cookie, aucun traceur, aucune police chargée chez un tiers

---

## 1. Lancer le site sur ton ordinateur

Il faut **Node.js 22 LTS** (ou 20.19+ / 24). Dans un terminal, dans ce dossier :

```bash
npm install
npm start
```

Ouvre ensuite http://localhost:4200.

- Un élément marqué `aCompleter: true` dans les données (bordure pointillée) s'affiche seulement en local,
  jamais sur le site en ligne.
- `npm test` lance les tests, `npm run build` construit la version en ligne (dossier `dist/`).
- Si ton Windows a « réduire les animations » activé, le site s'affiche sans animation : clique sur le bouton
  « vagues » de l'en-tête pour les forcer.

## 2. Modifier le contenu (sans toucher au code)

Tout le texte est dans `src/app/data/` :

| Fichier | Contenu |
|---|---|
| `profil.ts` | Identité (dont LinkedIn), présentation, langues, centres d'intérêt, savoir-faire, environnement d'apprentissage, pistes après le BTS, hébergeur |
| `parcours.ts` | Les étapes de la frise (collège, lycées, BTS, stages…) |
| `realisations.ts` | Les réalisations (stages Marine Corail et Xibo, portfolio, Git) : fiche complète + compétences B1.1 à B1.6 |
| `referentiel.ts` | Les compétences du référentiel (ne pas modifier) |
| `veille.ts` | Le sujet de veille, la méthode, les sources et les fiches d'actualité |

Fichiers à remplacer dans `public/` : `images/weimin-liu.jpg` (photo), `documents/cv-weimin-liu.pdf` (CV).

### Ajouter une réalisation

1. Dans `realisations.ts`, copie un bloc `{ ... }` et change le `slug` (il devient l'adresse : `/realisations/mon-slug`).
2. `contexte` : `'formation'`, `'stage1'` (stage de 1re année) ou `'stage2'` (stage de 2e année).
3. `periode` : l'année seule, `'2026'`, ou deux années, `'2025 — 2026'` (un test vérifie le format).
4. Coche les compétences dans `competences: ['B1.2', 'B1.5']` et explique chacune dans `preuves` (une phrase : en quoi cette réalisation la montre). Un test vérifie qu'aucune n'est oubliée.
5. Facultatif : `modalite: 'Seul'` ou `'En équipe'` ; pour un travail d'équipe, remplis `maContribution` : le jury veut savoir ce que **tu** as fait.
6. L'ordre de la liste est l'ordre d'affichage sur le site.

Les cartes de compétences se mettent à jour toutes seules.

## 3. Ce qu'il te reste à faire avant l'oral (par priorité)

Les oraux E5 et E6 ont lieu **entre le 10 et le 25 novembre 2026** (calendrier du vice-rectorat ; seule ta convocation fait foi).

1. **Demande tout de suite à tes professeurs la date et la forme de remise du dossier E5 / E6**. Elle n'est publiée nulle part en ligne et elle est peut-être déjà passée.
2. **Quand ton ami a mis le site sur son serveur, vérifie qu'il s'ouvre** sur un autre ordinateur et sur ton téléphone. Un portfolio inaccessible le jour de l'épreuve coûte **10 points**.
3. **Complète les fiches de tes deux stages** (`realisations.ts`) : je n'ai écrit que ce que tu m'as dit.
   - Marine Corail : outils ou site utilisés (CMS, base de données…), ce qui a marché avec le chatbot.
   - Xibo : où était installé le CMS, combien d'écrans, quels contenus.
   - Vérifie les compétences cochées et leurs explications dans `preuves` (B1.1 et B1.5 pour Xibo, B1.2 et B1.3 pour Marine Corail).
4. **Fais vraiment ta veille.**
   - Abonne-toi aux flux RSS dans Feedly et crée les Google Alertes listées dans `veille.ts`.
   - Réécris les « analyses » avec tes mots.
   - Ajoute une fiche par mois.
5. **Mets ton CV à jour** :
   - indique 21 ans ;
   - retire la recherche de stage, et ajoute tes stages Xibo et Marine Corail ;
   - ajoute Git, Angular et TypeScript.
6. **Relis tous les textes écrits à la première personne** (présentation, bilans, avenir, environnement d'apprentissage) et adapte-les : ce doit être ta voix.
7. Prépare tes **attestations de stage signées**.

## 4. Code et mise en ligne

Le code est sur le dépôt public https://github.com/C0rbi/portfolio-weimin. Le site est hébergé sur un serveur (VPS) : la marche à suivre est dans [DEPLOIEMENT.md](DEPLOIEMENT.md).

Pour envoyer une modification sur GitHub :

```bash
git add .
git commit -m "Ce que j'ai changé"
git push
```

À chaque envoi, l'onglet **Actions** du dépôt lance le workflow « Tests et construction » : il installe le projet, lance les tests et construit le site. Une coche verte veut dire que tout va bien. Le site en ligne, lui, ne change que quand il est reconstruit sur le serveur.

Pense aussi à garder une copie de secours : ce dossier sur une clé USB, pour lancer `npm start` sur ton ordinateur si internet ne marche pas.

## 5. Comprendre le code (le jury peut te poser des questions)

Conseil : le jury peut te demander comment tu as fait ce site. Sois transparent sur la façon dont il a été conçu, par exemple avec l'aide d'un assistant IA. Surtout, montre que tu le comprends : fais toi-même plusieurs modifications avant l'oral (une couleur, un texte, une nouvelle réalisation).

```
src/app/
├── data/       le contenu (voir partie 2)
├── models.ts   les types TypeScript du contenu
├── core/       la logique commune
│   ├── motion.service.ts   chef d'orchestre des animations (GSAP + Lenis)
│   ├── animations.ts       directives appReveal, appStagger, appSplit, appMagnetic
│   ├── theme.service.ts    mode jour / nuit
│   ├── sections.service.ts quelle section est à l'écran, liens vers les sections
│   └── contenu.ts          filtre des brouillons, dates en français
├── decor/      les dessins SVG : montagnes, radeau, sceau, tambour de bronze, lanterne, fleurs d'osmanthus
├── layout/     en-tête, pied de page, intro, titres de section
└── pages/      accueil (8 sections), fiche réalisation, veille, mentions légales, 404
```

Points à savoir expliquer :

- **Angular moderne**
  - Composants autonomes (sans module) et `signal()` pour l'état (filtre des réalisations, thème…).
  - Routage avec chargement à la demande (`loadComponent`) et transitions entre pages (API View Transitions).
- **Animations**
  - Chaque composant déclare une « scène » auprès de `MotionService`. Le service crée les animations dans un `gsap.context()`, et les annule toutes d'un coup avec `revert()` quand on coupe les animations ou qu'on quitte la page.
  - Lenis gère le défilement doux ; il est synchronisé avec ScrollTrigger.
- **Le fleuve du parcours**
  - `decor/fleuve.ts` calcule une courbe de Bézier qui passe par chaque lanterne.
  - DrawSVG la dessine au défilement et MotionPath y fait glisser le radeau.
- **Accessibilité**
  - Le réglage système « réduire les animations » est respecté, avec un bouton pour changer d'avis.
  - Lien « Aller au contenu », navigation au clavier, textes alternatifs, chinois balisé `lang="zh-Hans"`, contrastes vérifiés.
- **Performance et sobriété**
  - `scripts/subset-font.mjs` ne garde de la police chinoise (2,7 Mo) que les caractères utilisés (~53 Ko).
  - Environ 160 Ko transférés au premier chargement.
- **Données personnelles (bloc 3)**
  - Aucun cookie et aucune mesure d'audience.
  - Le formulaire ouvre la messagerie du visiteur au lieu d'envoyer des données.
  - Les polices sont hébergées sur le site (pas de Google Fonts) et les mentions légales sont complètes.
- **Tests et déploiement continu**
  - 16 tests Vitest : données, dates, tracés, application.
  - GitHub Actions les lance à chaque envoi sur GitHub, avec la construction du site.

## 6. Les symboles du thème

| Élément | Signification |
|---|---|
| 桂林山水甲天下 | « Les paysages de Guilin sont les plus beaux sous le ciel », dicton chinois (inscription verticale de l'accueil) |
| 桂 (guì) | Abréviation du Guangxi, et l'osmanthus, la fleur de Guilin (le sceau du logo, les fleurs qui tombent) |
| Pics karstiques, radeau de bambou, pêcheur au cormoran | La rivière Li entre Guilin et Yangshuo |
| 铜鼓 tambour de bronze | Emblème des Zhuang, peuple du Guangxi (section Compétences) |
| 月亮门 porte de lune | L'entrée ronde des jardins chinois (cadre de la photo) |
| 挂轴 rouleaux suspendus | Les cartes des réalisations, qui se déroulent |
| 印章 sceaux rouges, frise 回纹 | Signature des peintres, motif de méandre traditionnel |
| 一 二 三… | Numéros chinois des étapes |
