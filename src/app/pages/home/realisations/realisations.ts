import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LIBELLES_CONTEXTE, realisationsVisibles } from '../../../core/contenu';
import { MotionService } from '../../../core/motion.service';
import { ContexteRealisation } from '../../../models';
import { SectionHeading } from '../../../layout/section-heading';

type Filtre = 'tout' | ContexteRealisation;

/** Étape 4 : mes réalisations, présentées comme des rouleaux de peinture suspendus (挂轴) qui se déroulent. */
@Component({
  selector: 'app-realisations',
  imports: [SectionHeading, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './realisations.html',
  styleUrl: './realisations.scss',
})
export class RealisationsSection {
  protected readonly toutes = realisationsVisibles();
  protected readonly libelles = LIBELLES_CONTEXTE;
  protected readonly filtre = signal<Filtre>('tout');
  protected readonly affichees = computed(() =>
    this.filtre() === 'tout' ? this.toutes : this.toutes.filter((r) => r.contexte === this.filtre()),
  );

  /** Un bouton par contexte présent, avec le nombre de réalisations. */
  protected readonly filtres = [
    { valeur: 'tout' as Filtre, label: 'Toutes', nombre: this.toutes.length },
    ...(Object.keys(LIBELLES_CONTEXTE) as ContexteRealisation[])
      .map((c) => ({ valeur: c as Filtre, label: LIBELLES_CONTEXTE[c], nombre: this.toutes.filter((r) => r.contexte === c).length }))
      .filter((f) => f.nombre > 0),
  ];

  constructor() {
    const hote = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() =>
      motion.scene(
        hote,
        () => {
          // Chaque rouleau se déroule : le papier se découvre de haut en bas, la baguette du bas descend.
          const rouleaux = gsap.utils.toArray<HTMLElement>('.rouleau', hote);
          gsap.set(rouleaux, { autoAlpha: 0 });
          ScrollTrigger.batch(rouleaux, {
            start: 'top 88%',
            once: true,
            onEnter: (lot) =>
              lot.forEach((rouleau, i) => {
                const papier = rouleau.querySelector<HTMLElement>('.rouleau__papier')!;
                gsap
                  .timeline({ delay: i * 0.12, defaults: { duration: 1.2, ease: 'power3.inOut' } })
                  .set(rouleau, { autoAlpha: 1 })
                  .fromTo(
                    papier,
                    { clipPath: 'inset(0 0 100% 0)' },
                    { clipPath: 'inset(0 0 0% 0)', clearProps: 'clipPath' },
                    0,
                  )
                  .from(rouleau.querySelector('.rouleau__baguette--bas'), { y: -papier.offsetHeight }, 0);
              }),
          });
        },
        destroyRef,
      ),
    );
  }
}
