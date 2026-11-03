import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MotionService } from './motion.service';

export interface SectionAccueil {
  id: string;
  label: string;
  zh: string;
  numero: string;
}

/** Les étapes de la page d'accueil, dans l'ordre de la descente du fleuve. */
export const SECTIONS: SectionAccueil[] = [
  { id: 'profil', label: 'Profil', zh: '关于我', numero: '一' },
  { id: 'parcours', label: 'Parcours', zh: '经历', numero: '二' },
  { id: 'competences', label: 'Compétences', zh: '技能', numero: '三' },
  { id: 'realisations', label: 'Réalisations', zh: '作品', numero: '四' },
  { id: 'veille', label: 'Veille', zh: '观察', numero: '五' },
  { id: 'avenir', label: 'Avenir', zh: '未来', numero: '六' },
  { id: 'contact', label: 'Contact', zh: '联系', numero: '七' },
];

/** Sait quelle section de l'accueil est à l'écran, et y emmène le visiteur. */
@Injectable({ providedIn: 'root' })
export class SectionsService {
  private readonly router = inject(Router);
  private readonly motion = inject(MotionService);

  /** id de la section visible (vide hors de l'accueil). */
  readonly active = signal('');

  /** À appeler par la page d'accueil une fois affichée ; renvoie la fonction d'arrêt. */
  observer(): () => void {
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) if (e.isIntersecting) this.active.set(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const s of SECTIONS) {
      const element = document.getElementById(s.id);
      if (element) observateur.observe(element);
    }
    return () => {
      observateur.disconnect();
      this.active.set('');
    };
  }

  /** Lien vers une section : défilement doux sur l'accueil, sinon retour à l'accueil puis défilement. */
  aller(evenement: Event, id: string): void {
    evenement.preventDefault();
    if (this.router.url.split(/[?#]/)[0] === '/') this.motion.defilerVers(id);
    else this.router.navigate(['/'], { fragment: id });
  }
}
