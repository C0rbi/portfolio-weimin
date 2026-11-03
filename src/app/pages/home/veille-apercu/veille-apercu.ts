import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MagneticDirective, RevealDirective, StaggerDirective } from '../../../core/animations';
import { dateLisible } from '../../../core/contenu';
import { ARTICLES_VEILLE, METHODE_VEILLE, SUJET_VEILLE } from '../../../data/veille';
import { SectionHeading } from '../../../layout/section-heading';

/** Étape 5 : un aperçu de ma veille technologique (sujet, méthode, dernières fiches). */
@Component({
  selector: 'app-veille-apercu',
  imports: [SectionHeading, RouterLink, RevealDirective, StaggerDirective, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './veille-apercu.html',
  styleUrl: './veille-apercu.scss',
})
export class VeilleApercuSection {
  protected readonly sujet = SUJET_VEILLE;
  protected readonly methode = METHODE_VEILLE;
  protected readonly dernieres = [...ARTICLES_VEILLE].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  protected readonly dateLisible = dateLisible;
}
