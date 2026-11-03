import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SECTIONS, SectionsService } from '../core/sections.service';

/**
 * Sur l'accueil (grand écran) : une rivière verticale sur le côté droit qui se remplit
 * au fil du défilement, avec un repère par étape (一, 二, 三…).
 */
@Component({
  selector: 'app-river-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'mesurer()' },
  template: `
    @if (surAccueil()) {
      <nav class="progression" aria-label="Étapes de la page">
        <div class="progression__lit" aria-hidden="true">
          <div class="progression__eau" [style.transform]="'scaleY(' + avance() + ')'"></div>
        </div>
        <ol>
          @for (s of etapes; track s.id) {
            <li>
              <a
                [href]="'#' + s.id"
                (click)="sections.aller($event, s.id)"
                [class.actif]="sections.active() === s.id"
                [attr.aria-current]="sections.active() === s.id ? 'location' : null"
              >
                <span class="label">{{ s.label }}</span>
                <span class="num" lang="zh-Hans" aria-hidden="true">{{ s.numero }}</span>
              </a>
            </li>
          }
        </ol>
      </nav>
    }
  `,
  styleUrl: './river-progress.scss',
})
export class RiverProgress {
  protected readonly sections = inject(SectionsService);
  protected readonly etapes = SECTIONS;
  protected readonly avance = signal(0);
  protected readonly surAccueil = signal(false);

  constructor() {
    inject(Router).events.subscribe((e) => {
      if (e instanceof NavigationEnd) this.surAccueil.set(e.urlAfterRedirects.split(/[?#]/)[0] === '/');
    });
  }

  protected mesurer(): void {
    const max = document.documentElement.scrollHeight - innerHeight;
    this.avance.set(max > 0 ? Math.min(1, scrollY / max) : 0);
  }
}
