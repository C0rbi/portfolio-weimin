import { ChangeDetectionStrategy, Component } from '@angular/core';

let compteur = 0;

/** Point sur un cercle de rayon r, à l'angle a (en degrés, 0 = en haut). */
function point(r: number, a: number): [number, number] {
  const rad = ((a - 90) * Math.PI) / 180;
  return [+(r * Math.cos(rad)).toFixed(2), +(r * Math.sin(rad)).toFixed(2)];
}

/**
 * Face supérieure d'un tambour de bronze zhuang (铜鼓), emblème du Guangxi :
 * soleil à douze rayons au centre, anneaux décorés, oiseaux en vol et quatre grenouilles sur le bord.
 * Tous les motifs sont calculés par trigonométrie.
 */
@Component({
  selector: 'app-bronze-drum',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="-104 -104 208 208" aria-hidden="true">
      <defs>
        <radialGradient [attr.id]="degradeId" cx="38%" cy="32%" r="80%">
          <stop offset="0" class="clair" />
          <stop offset="1" class="fonce" />
        </radialGradient>
      </defs>
      <circle r="98" [attr.fill]="'url(#' + degradeId + ')'" class="bord" />
      <g class="motifs">
        @for (r of anneaux; track r) {
          <circle [attr.r]="r" class="trait" />
        }
        <path [attr.d]="soleil" class="soleil" />
        <path [attr.d]="pointilles" class="trait epais" />
        <path [attr.d]="zigzag" class="trait" />
        <path [attr.d]="rayures" class="trait" />
        @for (a of oiseaux; track a) {
          <path [attr.transform]="'rotate(' + a + ')'" d="M-9,-72 Q-3,-79 0,-73 Q3,-79 9,-72 Q3,-75 0,-70 Q-3,-75 -9,-72 Z" class="motif" />
        }
        @for (a of grenouilles; track a) {
          <g [attr.transform]="'rotate(' + a + ') translate(0 -91)'" class="motif">
            <ellipse rx="4.5" ry="6.5" />
            <circle cx="-2.6" cy="-5.6" r="1.7" />
            <circle cx="2.6" cy="-5.6" r="1.7" />
            <path d="M-4,2 l-4,4 M4,2 l4,4 M-4,-3 l-4,-2 M4,-3 l4,-2" class="pattes" />
          </g>
        }
        @for (t of patine; track $index) {
          <circle [attr.cx]="t[0]" [attr.cy]="t[1]" [attr.r]="t[2]" class="patine" />
        }
      </g>
    </svg>
  `,
  styleUrl: './bronze-drum.scss',
})
export class BronzeDrum {
  protected readonly degradeId = `bronze-${++compteur}`;
  protected readonly anneaux = [92, 80, 66, 52, 38, 26];
  protected readonly oiseaux = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);
  protected readonly grenouilles = [45, 135, 225, 315];

  /** Soleil central à 12 rayons : on alterne un point loin (pointe) et un point proche (creux). */
  protected readonly soleil =
    Array.from({ length: 24 }, (_, i) => point(i % 2 === 0 ? 24 : 9, i * 15))
      .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`)
      .join(' ') + ' Z';

  /** Anneau de petits traits (comme des perles) tous les 10°. */
  protected readonly pointilles = Array.from({ length: 36 }, (_, i) => {
    const [x1, y1] = point(84, i * 10);
    const [x2, y2] = point(88, i * 10);
    return `M${x1},${y1} L${x2},${y2}`;
  }).join(' ');

  /** Ligne brisée entre les anneaux 52 et 66. */
  protected readonly zigzag =
    Array.from({ length: 49 }, (_, i) => point(i % 2 === 0 ? 54 : 64, i * 7.5))
      .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`)
      .join(' ');

  /** Rayures fines entre les anneaux 26 et 38. */
  protected readonly rayures = Array.from({ length: 60 }, (_, i) => {
    const [x1, y1] = point(28, i * 6);
    const [x2, y2] = point(36, i * 6);
    return `M${x1},${y1} L${x2},${y2}`;
  }).join(' ');

  /** Taches de vert-de-gris, la patine du bronze ancien. */
  protected readonly patine: [number, number, number][] = [
    [-52, -30, 9],
    [40, 58, 12],
    [64, -22, 6],
    [-18, 70, 7],
    [12, -62, 5],
  ];
}
