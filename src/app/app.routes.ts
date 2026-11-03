import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { REALISATIONS } from './data/realisations';
import { HomePage } from './pages/home/home-page';

const SUFFIXE = ' — Weimin LIU';

/** Titre de l'onglet pour une fiche de réalisation. */
const titreRealisation = (route: ActivatedRouteSnapshot) => {
  const realisation = REALISATIONS.find((r) => r.slug === route.paramMap.get('slug'));
  return (realisation?.titre ?? 'Réalisation') + SUFFIXE;
};

// L'accueil est chargé tout de suite ; les autres pages seulement quand on les ouvre (lazy loading).
export const routes: Routes = [
  { path: '', component: HomePage, title: 'Weimin LIU — Portfolio BTS SIO SLAM' },
  {
    path: 'realisations/:slug',
    title: titreRealisation,
    loadComponent: () => import('./pages/realisation/realisation-page').then((m) => m.RealisationPage),
  },
  {
    path: 'veille',
    title: 'Veille technologique' + SUFFIXE,
    loadComponent: () => import('./pages/veille/veille-page').then((m) => m.VeillePage),
  },
  {
    path: 'mentions-legales',
    title: 'Mentions légales' + SUFFIXE,
    loadComponent: () => import('./pages/mentions/mentions-page').then((m) => m.MentionsPage),
  },
  {
    path: '**',
    title: 'Page introuvable' + SUFFIXE,
    loadComponent: () => import('./pages/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
];
