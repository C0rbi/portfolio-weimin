// Génération des montagnes karstiques de Guilin (les « pains de sucre ») en SVG.
// Chaque pic est dessiné avec deux courbes de Bézier : flancs raides, sommet arrondi.

export interface Pic {
  /** Centre du pic (x). */
  x: number;
  /** Largeur à la base. */
  l: number;
  /** Hauteur. */
  h: number;
}

export interface Couche {
  nom: 'loin' | 'milieu' | 'proche' | 'premier-plan';
  /** Ligne de base (y) sur laquelle les pics sont posés, dans un dessin de 1600 × 900. */
  base: number;
  pics: Pic[];
}

/** Tracé SVG d'une rangée de pics posés sur une ligne de base, fermé jusqu'en bas du dessin. */
export function tracerMontagnes(pics: readonly Pic[], base: number, bas = 900): string {
  const formes = pics.map(({ x, l, h }) => {
    const gauche = x - l / 2;
    const droite = x + l / 2;
    const sommet = base - h;
    return (
      `M${gauche},${base} ` +
      `C${gauche + l * 0.05},${sommet + h * 0.3} ${x - l * 0.34},${sommet} ${x},${sommet} ` +
      `C${x + l * 0.34},${sommet} ${droite - l * 0.05},${sommet + h * 0.3} ${droite},${base} Z`
    );
  });
  return [...formes, `M-100,${base - 4} H1700 V${bas} H-100 Z`].join(' ');
}

/** Les quatre plans du paysage, du plus lointain (clair) au plus proche (foncé). */
export const COUCHES: Couche[] = [
  {
    nom: 'loin',
    base: 640,
    pics: [
      { x: 40, l: 140, h: 150 },
      { x: 150, l: 120, h: 205 },
      { x: 265, l: 150, h: 165 },
      { x: 385, l: 130, h: 225 },
      { x: 505, l: 160, h: 175 },
      { x: 640, l: 130, h: 245 },
      { x: 765, l: 150, h: 195 },
      { x: 885, l: 140, h: 265 },
      { x: 1005, l: 160, h: 210 },
      { x: 1125, l: 130, h: 285 },
      { x: 1245, l: 150, h: 220 },
      { x: 1365, l: 140, h: 300 },
      { x: 1485, l: 160, h: 240 },
      { x: 1595, l: 130, h: 200 },
    ],
  },
  {
    nom: 'milieu',
    base: 705,
    pics: [
      { x: 90, l: 200, h: 190 },
      { x: 330, l: 180, h: 150 },
      { x: 565, l: 200, h: 210 },
      { x: 770, l: 170, h: 270 },
      { x: 965, l: 220, h: 295 },
      { x: 1180, l: 180, h: 335 },
      { x: 1395, l: 220, h: 320 },
      { x: 1570, l: 200, h: 275 },
    ],
  },
  {
    nom: 'proche',
    base: 775,
    pics: [
      { x: 120, l: 260, h: 150 },
      { x: 420, l: 220, h: 115 },
      { x: 1075, l: 240, h: 255 },
      { x: 1300, l: 260, h: 345 },
      { x: 1525, l: 240, h: 300 },
    ],
  },
  {
    nom: 'premier-plan',
    base: 835,
    pics: [
      { x: -30, l: 250, h: 290 },
      { x: 150, l: 170, h: 175 },
      { x: 1470, l: 220, h: 395 },
      { x: 1615, l: 250, h: 480 },
    ],
  },
];
