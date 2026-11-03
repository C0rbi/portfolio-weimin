import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { gsap } from 'gsap';
import { RevealDirective, StaggerDirective } from '../../../core/animations';
import { MotionService } from '../../../core/motion.service';
import { CENTRES_INTERET, LANGUES, PRESENTATION, PROFIL } from '../../../data/profil';
import { Seal } from '../../../decor/seal';
import { SectionHeading } from '../../../layout/section-heading';

/** Étape 1 : qui je suis. Ma photo est encadrée par une « porte de lune », l'entrée ronde des jardins chinois. */
@Component({
  selector: 'app-profil',
  imports: [SectionHeading, Seal, RevealDirective, StaggerDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profil.html',
  styleUrl: './profil.scss',
})
export class ProfilSection {
  protected readonly profil = PROFIL;
  protected readonly presentation = PRESENTATION;
  protected readonly langues = LANGUES;
  protected readonly interets = CENTRES_INTERET;
  protected readonly jauge = [1, 2, 3, 4, 5];

  constructor() {
    const hote = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() =>
      motion.scene(
        hote,
        () => {
          // Le cercle de pierre se trace, puis la photo apparaît dans l'ouverture.
          const declencheur = { trigger: '.porte', start: 'top 75%', once: true };
          gsap
            .timeline({ scrollTrigger: declencheur })
            .from('.porte__anneau circle', { drawSVG: '0%', duration: 1.6, ease: 'power2.inOut' })
            .fromTo(
              '.porte__photo',
              { clipPath: 'circle(0% at 50% 50%)' },
              { clipPath: 'circle(71% at 50% 50%)', clearProps: 'clipPath', duration: 1.3, ease: 'expo.out' },
              0.5,
            )
            .from('.porte__photo img', { scale: 1.25, duration: 1.8, ease: 'expo.out' }, 0.5)
            .from('.porte app-seal', { scale: 2.4, rotate: -20, autoAlpha: 0, duration: 0.6, ease: 'back.out(2.4)' }, 1.2);
          gsap.from('.jauge__point.plein', {
            scale: 0,
            stagger: 0.04,
            duration: 0.5,
            ease: 'back.out(3)',
            scrollTrigger: { trigger: '.langues', start: 'top 85%', once: true },
          });
        },
        destroyRef,
      ),
    );
  }
}
