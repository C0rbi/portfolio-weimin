import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { SectionsService } from '../../core/sections.service';
import { AvenirSection } from './avenir/avenir';
import { CompetencesSection } from './competences/competences';
import { ContactSection } from './contact/contact';
import { HeroSection } from './hero/hero';
import { ParcoursSection } from './parcours/parcours';
import { ProfilSection } from './profil/profil';
import { RealisationsSection } from './realisations/realisations';
import { VeilleApercuSection } from './veille-apercu/veille-apercu';

/** Page d'accueil : la descente du fleuve, de la source (accueil) jusqu'au contact. */
@Component({
  selector: 'app-home-page',
  imports: [
    HeroSection,
    ProfilSection,
    ParcoursSection,
    CompetencesSection,
    RealisationsSection,
    VeilleApercuSection,
    AvenirSection,
    ContactSection,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-profil />
    <app-parcours />
    <app-competences />
    <app-realisations />
    <app-veille-apercu />
    <app-avenir />
    <app-contact />
  `,
})
export class HomePage {
  constructor() {
    const sections = inject(SectionsService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => destroyRef.onDestroy(sections.observer()));
  }
}
