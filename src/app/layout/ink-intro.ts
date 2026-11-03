import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { MotionService } from '../core/motion.service';
import { Seal } from '../decor/seal';

const CLE_SESSION = 'weimin-intro';
const DUREE = 1.9;

/** Intro (une fois par visite) : un sceau rouge s'imprime, puis le papier se déroule vers le haut. */
@Component({
  selector: 'app-ink-intro',
  imports: [Seal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'passer()' },
  template: `
    @if (visible()) {
      <div #voile class="intro" (click)="passer()" aria-hidden="true">
        <div class="intro__centre">
          <app-seal class="intro__sceau" texte="桂" [taille]="104" />
          <p class="intro__nom">Weimin LIU</p>
          <p class="intro__bienvenue"><span>欢迎</span> Bienvenue</p>
        </div>
      </div>
    }
  `,
  styles: `
    .intro {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: grid;
      place-items: center;
      background: var(--paper);
      cursor: pointer;
    }
    .intro__centre {
      display: grid;
      justify-items: center;
      gap: 14px;
    }
    .intro__nom {
      margin: 8px 0 0;
      font-family: var(--font-display);
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      font-weight: 600;
      letter-spacing: 0.06em;
    }
    .intro__bienvenue {
      margin: 0;
      color: var(--ink-3);
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
    .intro__bienvenue span {
      margin-right: 0.4em;
      font-family: var(--font-brush);
      font-size: 1.3rem;
      letter-spacing: 0.1em;
      color: var(--cinnabar);
    }
  `,
})
export class InkIntro {
  private readonly motion = inject(MotionService);
  private readonly voile = viewChild<ElementRef<HTMLElement>>('voile');
  private animation?: gsap.core.Timeline;

  protected readonly visible = signal(this.motion.enabled() && !dejaVue());

  constructor() {
    if (!this.visible()) return;
    this.motion.dureeIntro = DUREE - 0.3;
    marquerVue();

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const voile = this.voile()?.nativeElement;
      if (!voile) return;
      this.motion.bloquerDefilement(true);
      this.animation = gsap
        .timeline({ onComplete: () => this.terminer() })
        .from(voile.querySelector('.intro__sceau'), {
          scale: 2.8,
          rotate: -20,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'back.out(2.2)',
        })
        .from(voile.querySelectorAll('.intro__nom, .intro__bienvenue'), {
          y: 16,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: 'expo.out',
        }, 0.35)
        .fromTo(
          voile,
          { clipPath: 'inset(0 0 0% 0)' },
          { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' },
          DUREE - 0.8,
        );
      destroyRef.onDestroy(() => this.animation?.kill());
    });
  }

  /** Un clic ou une touche permet de passer l'intro. */
  protected passer(): void {
    if (this.visible()) this.animation?.progress(1);
  }

  private terminer(): void {
    this.visible.set(false);
    this.motion.bloquerDefilement(false);
  }
}

function dejaVue(): boolean {
  try {
    return sessionStorage.getItem(CLE_SESSION) === '1';
  } catch {
    return false;
  }
}

function marquerVue(): void {
  try {
    sessionStorage.setItem(CLE_SESSION, '1');
  } catch {
    // Stockage indisponible : l'intro sera rejouée, ce n'est pas grave.
  }
}
