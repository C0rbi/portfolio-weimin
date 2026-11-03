import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { gsap } from 'gsap';
import { SplitDirective } from '../core/animations';
import { MotionService } from '../core/motion.service';

/**
 * Titre de section : numéro chinois, titre français et, sur le côté,
 * un mot chinois calligraphié qui se « peint » de haut en bas.
 */
@Component({
  selector: 'app-section-heading',
  imports: [SplitDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bloc">
      <p class="kicker">
        <span class="numero" lang="zh-Hans" aria-hidden="true">{{ numero() }}</span>
        {{ kicker() }}
      </p>
      <h2 [id]="idTitre()" appSplit>{{ titre() }}</h2>
      @if (intro()) {
        <p class="lead">{{ intro() }}</p>
      }
    </div>
    <div class="zh" aria-hidden="true">
      <span class="zh__mot" lang="zh-Hans">{{ zh() }}</span>
      <span class="zh__pinyin">{{ pinyin() }}</span>
    </div>
  `,
  styles: `
    @use 'mixins' as *;

    :host {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: start;
      gap: 24px;
      margin-bottom: clamp(40px, 6vw, 72px);
    }
    .numero {
      display: inline-grid;
      place-items: center;
      width: 2.1em;
      height: 2.1em;
      border-radius: 4px;
      background: var(--cinnabar);
      color: var(--on-cinnabar);
      font-family: var(--font-brush);
      font-size: 1.15em;
      letter-spacing: 0;
    }
    h2 {
      margin: 0.45em 0 0.3em;
      font-size: clamp(2.6rem, 6vw, 4.6rem);
    }
    .lead {
      margin: 0;
    }
    .zh {
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }
    .zh__mot {
      writing-mode: vertical-rl;
      font-family: var(--font-brush);
      font-size: clamp(3rem, 7vw, 5.6rem);
      line-height: 1;
      color: var(--ink);
      opacity: 0.9;
    }
    .zh__pinyin {
      writing-mode: vertical-rl;
      color: var(--ink-3);
      font-size: 0.8rem;
      letter-spacing: 0.2em;
    }
    @include below($sm) {
      :host {
        grid-template-columns: 1fr;
      }
      .zh {
        display: none;
      }
    }
  `,
})
export class SectionHeading {
  readonly numero = input.required<string>();
  readonly kicker = input.required<string>();
  readonly titre = input.required<string>();
  readonly zh = input.required<string>();
  readonly pinyin = input('');
  readonly intro = input('');
  readonly idTitre = input('');

  constructor() {
    const hote = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() =>
      motion.scene(
        hote,
        () => {
          // Le mot chinois est révélé du haut vers le bas, comme un coup de pinceau.
          gsap.fromTo(
            '.zh__mot',
            { clipPath: 'inset(0 0 100% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.6,
              ease: 'power2.inOut',
              scrollTrigger: { trigger: hote, start: 'top 80%', once: true },
            },
          );
          gsap.from('.numero', {
            scale: 1.8,
            rotate: -15,
            autoAlpha: 0,
            duration: 0.7,
            ease: 'back.out(2.5)',
            scrollTrigger: { trigger: hote, start: 'top 85%', once: true },
          });
        },
        destroyRef,
      ),
    );
  }
}
