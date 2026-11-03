import { Injectable, inject, signal } from '@angular/core';
import { MotionService } from './motion.service';

export type Theme = 'light' | 'dark';

/** Thème « jour » (papier de riz) ou « nuit » (rivière Li au clair de lune). */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly motion = inject(MotionService);

  readonly theme = signal<Theme>(
    typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light',
  );

  /** Change de thème ; `depuis` = position du clic, d'où part le cercle d'encre. */
  basculer(depuis?: { x: number; y: number }): void {
    const suivant: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    const racine = document.documentElement;
    const appliquer = () => {
      this.theme.set(suivant);
      racine.setAttribute('data-theme', suivant);
      try {
        localStorage.setItem('weimin-theme', suivant);
      } catch {
        // Stockage indisponible : le thème vaut pour cette visite seulement.
      }
    };

    if (!depuis || !this.motion.enabled() || !('startViewTransition' in document)) {
      appliquer();
      return;
    }

    // Transition « goutte d'encre » : la nouvelle apparence s'étend en cercle depuis le bouton.
    const rayon = Math.hypot(
      Math.max(depuis.x, innerWidth - depuis.x),
      Math.max(depuis.y, innerHeight - depuis.y),
    );
    racine.classList.add('vt-theme');
    const transition = document.startViewTransition(appliquer);
    transition.ready
      .then(() =>
        racine.animate(
          {
            clipPath: [
              `circle(0px at ${depuis.x}px ${depuis.y}px)`,
              `circle(${rayon}px at ${depuis.x}px ${depuis.y}px)`,
            ],
          },
          { duration: 750, easing: 'cubic-bezier(.7,0,.3,1)', pseudoElement: '::view-transition-new(root)' },
        ),
      )
      .catch(() => undefined);
    transition.finished.finally(() => racine.classList.remove('vt-theme'));
  }
}
