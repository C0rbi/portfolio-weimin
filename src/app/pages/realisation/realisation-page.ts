import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective, SplitDirective, StaggerDirective } from '../../core/animations';
import { LIBELLES_CONTEXTE, realisationsVisibles } from '../../core/contenu';
import { COMPETENCES_B1 } from '../../data/referentiel';
import { Seal } from '../../decor/seal';

/** Fiche détaillée d'une réalisation (adresse : /realisations/:slug). */
@Component({
  selector: 'app-realisation-page',
  imports: [RouterLink, Seal, RevealDirective, StaggerDirective, SplitDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './realisation-page.html',
  styleUrl: './realisation-page.scss',
})
export class RealisationPage {
  /** Rempli automatiquement depuis l'adresse grâce à withComponentInputBinding(). */
  readonly slug = input.required<string>();

  private readonly toutes = realisationsVisibles();
  protected readonly libelles = LIBELLES_CONTEXTE;
  protected readonly index = computed(() => this.toutes.findIndex((r) => r.slug === this.slug()));
  protected readonly realisation = computed(() => this.toutes[this.index()]);
  protected readonly courante = computed(() => (this.realisation() ? [this.realisation()!] : []));
  protected readonly precedente = computed(() => this.toutes[this.index() - 1]);
  protected readonly suivante = computed(() => this.toutes[this.index() + 1]);
  protected readonly competences = computed(() =>
    COMPETENCES_B1.filter((c) => this.realisation()?.competences.includes(c.code)),
  );
}
