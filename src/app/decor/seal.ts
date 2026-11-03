import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

let compteur = 0;

/**
 * Sceau chinois (印章) : caractères blancs sur fond rouge (style « plein »)
 * ou rouges dans un cadre (style « cadre »). Les bords irréguliers viennent d'un filtre SVG.
 * 1 caractère au centre, 2 en colonne, 4 en carré lus de droite à gauche comme en chinois.
 */
@Component({
  selector: 'app-seal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 100 100"
      [attr.width]="taille()"
      [attr.height]="taille()"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label() || null"
      [attr.aria-hidden]="label() ? null : 'true'"
    >
      <defs>
        <filter [attr.id]="filtreId" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="bruit" />
          <feDisplacementMap in="SourceGraphic" in2="bruit" scale="4.5" />
        </filter>
      </defs>
      <g [attr.filter]="'url(#' + filtreId + ')'">
        @if (style() === 'plein') {
          <rect class="fond" x="6" y="6" width="88" height="88" rx="7" />
        } @else {
          <rect class="cadre" x="9" y="9" width="82" height="82" rx="5" />
        }
        @for (c of caracteres(); track $index) {
          <text
            [attr.x]="c.x"
            [attr.y]="c.y"
            [attr.font-size]="c.taille"
            text-anchor="middle"
            dominant-baseline="central"
          >
            {{ c.texte }}
          </text>
        }
      </g>
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      line-height: 0;
    }
    svg {
      overflow: visible;
    }
    .fond {
      fill: var(--cinnabar);
    }
    .cadre {
      fill: none;
      stroke: var(--cinnabar);
      stroke-width: 6;
    }
    text {
      font-family: var(--font-brush);
      fill: var(--on-cinnabar);
    }
    .cadre ~ text {
      fill: var(--cinnabar);
    }
  `,
})
export class Seal {
  readonly texte = input.required<string>();
  readonly taille = input(56);
  readonly style = input<'plein' | 'cadre'>('plein');
  /** Texte lu par les lecteurs d'écran ; vide = sceau décoratif. */
  readonly label = input('');

  protected readonly filtreId = `sceau-${++compteur}`;

  protected readonly caracteres = computed(() => {
    const lettres = [...this.texte()];
    const positions: Record<number, [number, number][]> = {
      1: [[50, 50]],
      2: [
        [50, 30],
        [50, 70],
      ],
      4: [
        [70, 30],
        [70, 70],
        [30, 30],
        [30, 70],
      ],
    };
    const tailles: Record<number, number> = { 1: 62, 2: 38, 4: 36 };
    const taille = tailles[lettres.length] ?? 30;
    const places = positions[lettres.length] ?? lettres.map((_, i) => [20 + (60 / lettres.length) * (i + 0.5), 50]);
    return lettres.map((texte, i) => ({ texte, x: places[i][0], y: places[i][1], taille }));
  });
}
