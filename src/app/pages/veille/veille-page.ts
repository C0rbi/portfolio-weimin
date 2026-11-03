import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { RevealDirective, SplitDirective, StaggerDirective } from '../../core/animations';
import { dateLisible } from '../../core/contenu';
import { MotionService } from '../../core/motion.service';
import {
  ARTICLES_VEILLE,
  AUTRES_SUJETS,
  BILAN_VEILLE,
  FONCTIONNEMENT,
  LIMITES,
  METHODE_VEILLE,
  MOTS_CLES_ALERTES,
  SOURCES_VEILLE,
  SUJET_VEILLE,
} from '../../data/veille';

/** Page complète de ma veille technologique : sujet, méthode, sources, explication, fiches et bilan. */
@Component({
  selector: 'app-veille-page',
  imports: [RouterLink, RevealDirective, StaggerDirective, SplitDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './veille-page.html',
  styleUrl: './veille-page.scss',
})
export class VeillePage {
  protected readonly sujet = SUJET_VEILLE;
  protected readonly methode = METHODE_VEILLE;
  protected readonly motsCles = MOTS_CLES_ALERTES;
  protected readonly sources = SOURCES_VEILLE;
  protected readonly fonctionnement = FONCTIONNEMENT;
  protected readonly limites = LIMITES;
  protected readonly bilan = BILAN_VEILLE;
  protected readonly autresSujets = AUTRES_SUJETS;
  protected readonly articles = [...ARTICLES_VEILLE].sort((a, b) => b.date.localeCompare(a.date));
  protected readonly dateLisible = dateLisible;

  constructor() {
    const hote = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() =>
      motion.scene(
        hote,
        () => {
          // Schéma animé : le défi part du serveur, revient signé par l'appareil, la clé publique vérifie.
          gsap
            .timeline({ repeat: -1, repeatDelay: 1.2, scrollTrigger: { trigger: '.schema', start: 'top 80%' } })
            .fromTo('.schema__defi', { attr: { cx: 300 }, autoAlpha: 0 }, { attr: { cx: 100 }, autoAlpha: 1, duration: 1.4, ease: 'power2.inOut' })
            .to('.schema__cle-privee', { scale: 1.2, transformOrigin: '50% 50%', yoyo: true, repeat: 1, duration: 0.3 })
            .to('.schema__defi', { attr: { cx: 300 }, fill: 'var(--jade)', duration: 1.4, ease: 'power2.inOut' })
            .to('.schema__valide', { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(3)' })
            .to('.schema__defi, .schema__valide', { autoAlpha: 0, duration: 0.4, delay: 1 });
          // Le fil des fiches se trace au défilement.
          gsap.from('.fil__ligne', {
            scaleY: 0,
            transformOrigin: 'top',
            ease: 'none',
            scrollTrigger: { trigger: '.fil', start: 'top 70%', end: 'bottom 70%', scrub: true },
          });
        },
        destroyRef,
      ),
    );
  }
}
