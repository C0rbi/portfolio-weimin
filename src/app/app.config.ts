import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { MotionService } from './core/motion.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Les paramètres d'adresse (:slug) arrivent directement dans les input() des pages.
      withComponentInputBinding(),
      // Le défilement après navigation (haut de page, #section) est géré par MotionService,
      // pour rester fluide avec Lenis : on désactive celui du routeur.
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled', anchorScrolling: 'disabled' }),
      // Transition « rouleau qui se déroule » entre les pages (voir styles/_transitions.scss).
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition }) => {
          if (!inject(MotionService).enabled()) transition.skipTransition();
        },
      }),
    ),
  ],
};
