import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MotionService } from '../core/motion.service';
import { PROFIL } from '../data/profil';
import { Seal } from '../decor/seal';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, Seal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="pied">
      <svg class="pied__montagnes" viewBox="0 0 1600 160" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 160 V120 C40 120 60 60 95 60 C130 60 140 118 170 118 C200 118 215 40 260 40 C305 40 315 120 350 120 H520 C560 120 570 80 600 80 C630 80 640 120 680 120 H1050 C1080 120 1095 70 1125 70 C1155 70 1165 120 1190 120 C1215 120 1230 20 1280 20 C1330 20 1340 116 1380 116 C1410 116 1425 64 1460 64 C1495 64 1510 120 1540 120 H1600 V160 Z"
        />
      </svg>
      <div class="pied__contenu">
        <div class="hui-band" aria-hidden="true"></div>
        <div class="container pied__grille">
          <div class="pied__identite">
            <app-seal texte="桂" [taille]="52" />
            <div>
              <p class="pied__nom">Weimin LIU</p>
              <p>Étudiant en BTS SIO, option SLAM — {{ profil.ville }}</p>
              <p class="pied__devise">
                <span lang="zh-Hans">学无止境</span> — Apprendre n'a pas de fin.
              </p>
            </div>
          </div>
          <nav aria-label="Liens utiles">
            <ul class="pied__liens">
              <li><a routerLink="/" fragment="realisations">Réalisations</a></li>
              <li><a routerLink="/veille">Veille technologique</a></li>
              <li><a [href]="profil.github" target="_blank" rel="noopener">GitHub</a></li>
              @if (profil.linkedin) {
                <li><a [href]="profil.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
              }
              <li><a [href]="'mailto:' + profil.email">{{ profil.email }}</a></li>
              <li><a routerLink="/mentions-legales">Mentions légales</a></li>
            </ul>
          </nav>
          <button type="button" class="pied__haut" (click)="remonter()">
            <span lang="zh-Hans" aria-hidden="true">回到顶部</span>
            Remonter à la source ↑
          </button>
        </div>
        <p class="pied__copyright container">
          © {{ annee }} Weimin LIU · Site réalisé avec Angular et GSAP · Aucun cookie, aucun traceur.
        </p>
      </div>
    </footer>
  `,
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly profil = PROFIL;
  protected readonly annee = new Date().getFullYear();
  private readonly motion = inject(MotionService);

  protected remonter(): void {
    this.motion.defilerVers(0);
    document.getElementById('contenu')?.focus({ preventScroll: true });
  }
}
