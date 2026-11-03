import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Lanterne rouge (灯笼) avec un caractère chinois. Elle s'illumine quand son parent a la classe « is-lit ». */
@Component({
  selector: 'app-lantern',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 48 76" aria-hidden="true">
      <path class="fil" d="M24 0 V9" />
      <rect class="chapeau" x="15" y="9" width="18" height="5" rx="1.5" />
      <ellipse class="corps" cx="24" cy="33" rx="18" ry="19" />
      <ellipse class="cote" cx="24" cy="33" rx="9" ry="19" />
      <rect class="chapeau" x="15" y="51" width="18" height="5" rx="1.5" />
      <path class="pompon" d="M24 56 V72 M21 60 V70 M27 60 V70" />
      <text x="24" y="34" text-anchor="middle" dominant-baseline="central">{{ caractere() }}</text>
    </svg>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
    svg {
      width: 100%;
      height: auto;
      overflow: visible;
      transition: filter 0.6s ease;
    }
    .fil,
    .pompon {
      fill: none;
      stroke: var(--gold);
      stroke-width: 1.5;
      stroke-linecap: round;
    }
    .fil {
      stroke: var(--ink-3);
    }
    .chapeau {
      fill: var(--ink);
    }
    .corps {
      fill: var(--cinnabar);
      transition: fill 0.6s ease;
    }
    .cote {
      fill: none;
      stroke: rgba(0, 0, 0, 0.22);
      stroke-width: 1.2;
    }
    text {
      font-family: var(--font-brush);
      font-size: 17px;
      fill: var(--on-cinnabar);
    }
    :host-context(.motion-ok) .corps {
      fill: color-mix(in srgb, var(--cinnabar) 45%, var(--paper-3));
    }
    :host-context(.is-lit) .corps {
      fill: var(--cinnabar);
    }
    :host-context(.is-lit) svg {
      filter: drop-shadow(0 0 10px color-mix(in srgb, var(--cinnabar) 70%, transparent));
    }
  `,
})
export class Lantern {
  readonly caractere = input('');
}
