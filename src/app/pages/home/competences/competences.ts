import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective, StaggerDirective } from '../../../core/animations';
import { ENVIRONNEMENT_APPRENTISSAGE, SAVOIR_FAIRE } from '../../../data/profil';
import { BLOCS } from '../../../data/referentiel';
import { BronzeDrum } from '../../../decor/bronze-drum';
import { SectionHeading } from '../../../layout/section-heading';

/** Étape 3 : mes savoir-faire techniques, mon environnement d'apprentissage et le BTS SIO en bref. */
@Component({
  selector: 'app-competences',
  imports: [SectionHeading, BronzeDrum, RevealDirective, StaggerDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './competences.html',
  styleUrl: './competences.scss',
})
export class CompetencesSection {
  protected readonly groupes = SAVOIR_FAIRE;
  protected readonly environnement = ENVIRONNEMENT_APPRENTISSAGE;
  protected readonly blocs = BLOCS;
}
