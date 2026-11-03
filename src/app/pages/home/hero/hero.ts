import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MagneticDirective } from '../../../core/animations';
import { MotionService } from '../../../core/motion.service';
import { PROFIL } from '../../../data/profil';
import { COUCHES, tracerMontagnes } from '../../../decor/karst';
import { OsmanthusRain } from '../../../decor/osmanthus-rain';
import { Raft } from '../../../decor/raft';
import { Seal } from '../../../decor/seal';

/** Accueil plein écran : les montagnes de Guilin, la rivière Li et mon nom. */
@Component({
  selector: 'app-hero',
  imports: [Seal, Raft, OsmanthusRain, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroSection {
  protected readonly profil = PROFIL;
  protected readonly couches = COUCHES.map((c) => ({ ...c, d: tracerMontagnes(c.pics, c.base) }));
  /** « Les paysages de Guilin sont les plus beaux sous le ciel » */
  protected readonly inscription = [...'桂林山水甲天下'];

  private readonly hote = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.motion.scene(this.hote, () => this.animer(), this.destroyRef));
  }

  protected allerA(id: string, evenement: Event): void {
    evenement.preventDefault();
    this.motion.defilerVers(id);
  }

  private animer(): () => void {
    // 1. Entrée : les plans du paysage montent, puis le texte s'écrit.
    const nom = SplitText.create('.hero__nom', { type: 'chars', mask: 'chars' });
    gsap
      .timeline({ delay: this.motion.dureeIntro, defaults: { ease: 'expo.out', duration: 1.4 } })
      .from('.couche > svg', { yPercent: 14, autoAlpha: 0, stagger: 0.12, duration: 1.9 }, 0)
      .from('.astre__disque', { scale: 0.3, autoAlpha: 0, duration: 2.2 }, 0.2)
      .from('.hero__kicker', { y: 20, autoAlpha: 0 }, 0.4)
      .from(nom.chars, { yPercent: 115, rotate: 8, stagger: 0.04, duration: 1.3 }, 0.5)
      .from('.hero__intro', { y: 24, autoAlpha: 0 }, 0.95)
      .from('.hero__actions > *', { y: 24, autoAlpha: 0, stagger: 0.08 }, 1.1)
      .from('.inscription__car', { autoAlpha: 0, y: -12, filter: 'blur(6px)', stagger: 0.11, duration: 0.9 }, 0.9)
      .from('.inscription app-seal', { scale: 2.6, autoAlpha: 0, rotate: -18, duration: 0.7, ease: 'back.out(2.4)' }, 1.75)
      .from('.inscription figcaption, .hero__descente', { autoAlpha: 0, y: 10 }, 1.9);

    // 2. Ambiance : le radeau dérive et les oiseaux traversent le ciel.
    gsap.to('.hero__radeau', { xPercent: 90, duration: 28, ease: 'sine.inOut', repeat: -1, yoyo: true });
    gsap.to('.hero__radeau svg', { y: 3, rotation: 0.8, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true });
    gsap.fromTo('.oiseaux', { xPercent: -40 }, { xPercent: 160, duration: 46, ease: 'none', repeat: -1 });

    // 3. Parallaxe au défilement : plus un plan est proche, plus il bouge.
    const defilement = { trigger: this.hote, start: 'top top', end: 'bottom top', scrub: true };
    const profondeurs = [5, 11, 18, 26];
    this.couches.forEach((c, i) =>
      gsap.to(`.couche--${c.nom}`, { yPercent: profondeurs[i], ease: 'none', scrollTrigger: defilement }),
    );
    gsap.to('.astre', { yPercent: 170, ease: 'none', scrollTrigger: defilement });
    gsap.to('.hero__contenu', { y: -150, autoAlpha: 0.1, ease: 'none', scrollTrigger: defilement });
    gsap.to('.inscription', { y: -90, ease: 'none', scrollTrigger: defilement });

    // 4. Sur ordinateur, les plans suivent légèrement la souris.
    if (!matchMedia('(pointer: fine)').matches) return () => undefined;
    const deplacements = this.couches.map((c) =>
      gsap.quickTo(`.couche--${c.nom}`, 'x', { duration: 1.4, ease: 'power3.out' }),
    );
    const suivre = (e: PointerEvent) => {
      const ecart = e.clientX / innerWidth - 0.5;
      deplacements.forEach((deplacer, i) => deplacer(-ecart * profondeurs[i] * 1.6));
    };
    this.hote.addEventListener('pointermove', suivre);
    return () => this.hote.removeEventListener('pointermove', suivre);
  }
}
