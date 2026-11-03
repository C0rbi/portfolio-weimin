import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MotionService } from './motion.service';

// Directives d'animation réutilisables dans tous les templates.
// Elles passent par MotionService : si les animations sont coupées, rien ne bouge.

/** Fait apparaître l'élément quand il entre à l'écran : <div appReveal="left">. */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  readonly appReveal = input<'' | 'up' | 'left' | 'right' | 'scale'>('');
  readonly revealDelay = input(0);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      motion.scene(
        element,
        () => {
          const depart = { up: { y: 48 }, left: { x: -60 }, right: { x: 60 }, scale: { scale: 0.9 } }[
            this.appReveal() || 'up'
          ];
          gsap.from(element, {
            ...depart,
            autoAlpha: 0,
            duration: 1.1,
            delay: this.revealDelay(),
            ease: 'expo.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          });
        },
        destroyRef,
      );
    });
  }
}

/** Fait apparaître les enfants un par un (cartes d'une grille) : <ul appStagger>. */
@Directive({ selector: '[appStagger]' })
export class StaggerDirective {
  /** Sélecteur des éléments à animer ; par défaut, les enfants directs. */
  readonly appStagger = input('');

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      motion.scene(
        element,
        () => {
          const cibles = this.appStagger()
            ? gsap.utils.toArray<HTMLElement>(this.appStagger(), element)
            : Array.from(element.children);
          gsap.set(cibles, { autoAlpha: 0, y: 40 });
          ScrollTrigger.batch(cibles, {
            start: 'top 90%',
            once: true,
            onEnter: (lot) =>
              gsap.to(lot, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.09, overwrite: true }),
          });
        },
        destroyRef,
      );
    });
  }
}

/** Découpe un titre en mots (ou lettres) qui montent un par un : <h2 appSplit="chars">. */
@Directive({ selector: '[appSplit]' })
export class SplitDirective {
  readonly appSplit = input<'' | 'chars' | 'words' | 'lines'>('');

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      motion.scene(
        element,
        () => {
          const type = this.appSplit() || 'words';
          SplitText.create(element, {
            type: type === 'chars' ? 'words,chars' : type,
            mask: type,
            autoSplit: true,
            onSplit: (decoupe) =>
              gsap.from(decoupe[type], {
                yPercent: 110,
                duration: 1.1,
                ease: 'expo.out',
                stagger: type === 'chars' ? 0.025 : 0.07,
                scrollTrigger: { trigger: element, start: 'top 90%', once: true },
              }),
          });
        },
        destroyRef,
      );
    });
  }
}

/** Bouton « aimanté » qui suit légèrement la souris (ordinateur uniquement) : <a appMagnetic>. */
@Directive({ selector: '[appMagnetic]' })
export class MagneticDirective {
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      motion.scene(
        element,
        () => {
          if (!matchMedia('(pointer: fine)').matches) return;
          const versX = gsap.quickTo(element, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.45)' });
          const versY = gsap.quickTo(element, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.45)' });
          const suivre = (e: PointerEvent) => {
            const r = element.getBoundingClientRect();
            versX((e.clientX - r.left - r.width / 2) * 0.3);
            versY((e.clientY - r.top - r.height / 2) * 0.3);
          };
          const relacher = () => {
            versX(0);
            versY(0);
          };
          element.addEventListener('pointermove', suivre);
          element.addEventListener('pointerleave', relacher);
          return () => {
            element.removeEventListener('pointermove', suivre);
            element.removeEventListener('pointerleave', relacher);
          };
        },
        destroyRef,
      );
    });
  }
}
