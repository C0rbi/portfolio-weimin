import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { gsap } from 'gsap';
import { MotionService } from '../core/motion.service';

/** À chaque clic, deux ronds s'élargissent comme une goutte tombée dans la rivière. */
@Component({
  selector: 'app-ink-ripple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:pointerdown)': 'onde($event)' },
  template: '',
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 90;
      pointer-events: none;
      overflow: hidden;
    }
  `,
})
export class InkRipple {
  private readonly motion = inject(MotionService);
  private readonly hote = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected onde(e: PointerEvent): void {
    if (!this.motion.enabled() || e.button !== 0) return;
    [0, 0.12].forEach((delai, i) => {
      // Les ronds sont créés à la volée : leur style est donc écrit ici plutôt que dans le CSS du composant.
      const rond = document.createElement('span');
      Object.assign(rond.style, {
        position: 'absolute',
        left: `${e.clientX - 45}px`,
        top: `${e.clientY - 45}px`,
        width: '90px',
        height: '90px',
        border: '1.5px solid var(--ink)',
        borderRadius: '50%',
      });
      this.hote.appendChild(rond);
      gsap.fromTo(
        rond,
        { scale: 0, opacity: 0.45 - i * 0.15 },
        {
          scale: 1 + i * 0.5,
          opacity: 0,
          duration: 0.9,
          delay: delai,
          ease: 'power2.out',
          onComplete: () => rond.remove(),
        },
      );
    });
  }
}
