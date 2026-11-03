import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parcoursVisible } from '../../../core/contenu';
import { MotionService, SceneHandle } from '../../../core/motion.service';
import { tracerFleuve } from '../../../decor/fleuve';
import { Lantern } from '../../../decor/lantern';
import { Raft } from '../../../decor/raft';
import { SectionHeading } from '../../../layout/section-heading';

/** Étape 2 : mon parcours, raconté comme une descente du fleuve. Le radeau suit la rivière au défilement. */
@Component({
  selector: 'app-parcours',
  imports: [SectionHeading, Lantern, Raft],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './parcours.html',
  styleUrl: './parcours.scss',
})
export class ParcoursSection {
  protected readonly etapes = parcoursVisible();

  private readonly fleuve = viewChild.required<ElementRef<HTMLElement>>('fleuve');
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);
  private scene?: SceneHandle;

  constructor() {
    afterNextRender(() => {
      const fleuve = this.fleuve().nativeElement;
      this.dessiner();
      this.scene = this.motion.scene(fleuve, () => this.animer(), this.destroyRef);

      // Si la taille change (rotation du téléphone, polices chargées…), on redessine le fleuve.
      let attente = 0;
      const surveillance = new ResizeObserver(() => {
        cancelAnimationFrame(attente);
        attente = requestAnimationFrame(() => {
          if (this.dessiner()) this.scene?.rejouer();
        });
      });
      surveillance.observe(fleuve);
      this.destroyRef.onDestroy(() => surveillance.disconnect());
    });
  }

  /** Mesure la position des lanternes et met à jour le tracé. Renvoie true si le tracé a changé. */
  private dessiner(): boolean {
    const fleuve = this.fleuve().nativeElement;
    const svg = fleuve.querySelector('svg')!;
    const largeur = fleuve.clientWidth;
    const hauteur = fleuve.clientHeight;
    const etroit = largeur < 900;
    const x = etroit ? 30 : largeur / 2;
    const centres = Array.from(fleuve.querySelectorAll<HTMLElement>('.etape')).map((etape) => {
      const lanterne = etape.querySelector<HTMLElement>('.etape__lanterne')!;
      return etape.offsetTop + lanterne.offsetTop + lanterne.offsetHeight / 2;
    });
    const trace = tracerFleuve(x, centres, hauteur, etroit ? 14 : Math.min(80, largeur * 0.07));
    if (svg.getAttribute('data-trace') === trace) return false;

    svg.setAttribute('viewBox', `0 0 ${largeur} ${hauteur}`);
    svg.setAttribute('data-trace', trace);
    svg.querySelectorAll('path').forEach((chemin) => chemin.setAttribute('d', trace));
    return true;
  }

  private animer(): void {
    const fleuve = this.fleuve().nativeElement;
    const lit = fleuve.querySelector<SVGPathElement>('.fleuve__lit')!;

    // Le fleuve se dessine et le radeau le descend, au rythme du défilement.
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: fleuve, start: 'top 62%', end: 'bottom 62%', scrub: 0.8 },
      })
      .from('.fleuve__trace path', { drawSVG: '0%' }, 0)
      .to(
        '.fleuve__radeau',
        { motionPath: { path: lit, align: lit, alignOrigin: [0.5, 0.75] }, autoAlpha: 1 },
        0,
      );

    // Chaque lanterne s'allume quand le radeau arrive à sa hauteur.
    gsap.utils.toArray<HTMLElement>('.etape', fleuve).forEach((etape, i) => {
      gsap.from(etape.querySelector('.etape__carte'), {
        x: window.innerWidth < 900 ? 30 : i % 2 ? 60 : -60,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: etape, start: 'top 80%', once: true },
      });
      // Allumée de son passage jusqu'en bas de la page (end: 'max') ; elle s'éteint si on remonte au-dessus.
      ScrollTrigger.create({
        trigger: etape.querySelector('.etape__lanterne'),
        start: 'center 62%',
        end: 'max',
        toggleClass: { targets: etape, className: 'is-lit' },
      });
    });
  }
}
