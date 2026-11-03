// Allège la police calligraphique chinoise (Ma Shan Zheng).
// La police complète pèse environ 2,7 Mo : ce script ne garde que les caractères
// chinois réellement écrits dans src/ (fichiers .ts et .html), soit quelques dizaines de Ko.
// Lancé automatiquement avant `npm start` et `npm run build` (scripts "prestart" / "prebuild").
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import subsetFont from 'subset-font';

const SOURCE =
  'node_modules/@fontsource/ma-shan-zheng/files/ma-shan-zheng-chinese-simplified-400-normal.woff2';
const DOSSIER_CIBLE = 'src/assets/fonts';
const CIBLE = `${DOSSIER_CIBLE}/ma-shan-zheng-subset.woff2`;

// Idéogrammes chinois + ponctuation chinoise (，。「」…)
const CHINOIS = /[　-〿㐀-䶿一-鿿＀-￯]/gu;

async function* fichiersSource(dossier) {
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) yield* fichiersSource(chemin);
    else if (['.ts', '.html'].includes(extname(entree.name))) yield chemin;
  }
}

const caracteres = new Set();
for await (const fichier of fichiersSource('src')) {
  const texte = await readFile(fichier, 'utf8');
  for (const c of texte.match(CHINOIS) ?? []) caracteres.add(c);
}

const police = await subsetFont(await readFile(SOURCE), [...caracteres].sort().join(''), {
  targetFormat: 'woff2',
});
await mkdir(DOSSIER_CIBLE, { recursive: true });
await writeFile(CIBLE, police);
console.log(
  `Police chinoise allégée : ${caracteres.size} caractères, ${(police.length / 1024).toFixed(1)} Ko -> ${CIBLE}`,
);
