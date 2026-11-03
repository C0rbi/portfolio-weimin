import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Radeau de bambou de la rivière Li, avec son pêcheur au chapeau conique, un cormoran et une lanterne. */
@Component({
  selector: 'app-raft',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 150 80" aria-hidden="true">
      <ellipse class="remous" cx="74" cy="66" rx="66" ry="5" />
      <path class="perche" d="M90 24 L130 72" />
      <path class="silhouette" d="M70 27 L82 27 L87 53 L65 53 Z" />
      <path class="silhouette" d="M58 27 Q76 6 94 27 Q76 22 58 27 Z" />
      <path
        class="silhouette"
        d="M28 53 C27 45 31 40 36 41 C36 35 42 33 44 37 L51 36 L45 39 C46 45 42 51 36 53 Z"
      />
      <path class="radeau" d="M14 53 H124 Q135 53 140 44 L143 46 Q139 59 125 61 H18 Q11 61 14 53 Z" />
      <path class="noeuds" d="M40 54 V60 M64 54 V60 M88 54 V60 M112 54 V60" />
      <path class="perche fine" d="M119 53 V35" />
      <circle class="lanterne" cx="119" cy="31" r="4.5" />
    </svg>
  `,
  styles: `
    :host {
      display: block;
    }
    svg {
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .silhouette,
    .radeau {
      fill: var(--ink);
    }
    .noeuds {
      stroke: var(--paper);
      stroke-width: 1.2;
      opacity: 0.45;
    }
    .perche {
      fill: none;
      stroke: var(--ink);
      stroke-width: 1.8;
      stroke-linecap: round;
    }
    .fine {
      stroke-width: 1.2;
    }
    .remous {
      fill: none;
      stroke: var(--ink-3);
      stroke-width: 1;
      opacity: 0.35;
    }
    .lanterne {
      fill: var(--cinnabar);
    }
    :host-context([data-theme='dark']) .lanterne {
      fill: var(--gold);
      filter: drop-shadow(0 0 6px var(--gold));
    }
  `,
})
export class Raft {}
