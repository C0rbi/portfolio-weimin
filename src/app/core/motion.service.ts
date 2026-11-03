import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin);

const CLE_STOCKAGE = 'weimin-motion';
/** Hauteur de l'en-tête fixe : une section visée par un lien ne doit pas passer dessous. */
const DECALAGE_EN_TETE = 76;

/** Les animations GSAP d'un morceau de page (un composant, une directive). */
interface Scene {
  portee: Element;
  construire: () => void | (() => void);
  contexte?: gsap.Context;
}

export interface SceneHandle {
  /** Annule puis recrée les animations (par exemple après un changement de taille). */
  rejouer(): void;
}

/**
 * Chef d'orchestre des animations du site :
 * - retient le choix « animations activées / désactivées » (bouton de l'en-tête) ;
 * - lance le défilement doux Lenis et le synchronise avec GSAP ScrollTrigger ;
 * - gère les « scènes » : chaque composant y décrit ses animations, que le service lance,
 *   annule (revert) ou relance selon ce réglage ;
 * - fait défiler la page après chaque navigation (haut de page, lien vers une #section).
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly router = inject(Router);
  private readonly scenes = new Set<Scene>();
  private lenis?: Lenis;
  private cheminPrecedent = '';
  private readonly tic = (temps: number) => this.lenis?.raf(temps * 1000);

  /** true quand les animations sont activées. */
  readonly enabled = signal(lirePreference());

  /** Durée (en secondes) de l'intro « goutte d'encre », que l'accueil attend avant de s'animer. */
  dureeIntro = 0;

  constructor() {
    if (typeof window === 'undefined') return;
    history.scrollRestoration = 'manual';
    this.router.events.subscribe((e) => {
      if (e instanceof Scroll) this.defilerApresNavigation(e);
    });
    this.surveillerHauteurPage();
    this.appliquer();
  }

  basculer(): void {
    this.enabled.update((actif) => !actif);
    try {
      localStorage.setItem(CLE_STOCKAGE, this.enabled() ? 'on' : 'off');
    } catch {
      // Stockage indisponible (navigation privée) : le choix vaut pour cette visite seulement.
    }
    this.appliquer();
  }

  /**
   * Déclare une scène. `construire` crée les animations GSAP ; les sélecteurs CSS
   * qu'elle utilise ne cherchent qu'à l'intérieur de `portee`.
   * La scène est annulée automatiquement quand le composant est détruit.
   */
  scene(portee: Element, construire: Scene['construire'], destroyRef: DestroyRef): SceneHandle {
    const scene: Scene = { portee, construire };
    this.scenes.add(scene);
    this.jouer(scene);
    destroyRef.onDestroy(() => {
      scene.contexte?.revert();
      this.scenes.delete(scene);
    });
    return {
      rejouer: () => {
        this.jouer(scene);
        if (this.enabled()) ScrollTrigger.refresh();
      },
    };
  }

  /** Fait défiler jusqu'à une section (id) ou jusqu'à une position en pixels. */
  defilerVers(cible: string | number, immediat = false): void {
    if (typeof cible === 'string') {
      const element = document.getElementById(cible.replace(/^#/, ''));
      if (!element) return;
      if (this.lenis) {
        this.lenis.scrollTo(element, { offset: -DECALAGE_EN_TETE, immediate: immediat, force: true });
      } else {
        element.scrollIntoView({ block: 'start' });
      }
      return;
    }
    if (this.lenis) this.lenis.scrollTo(cible, { immediate: immediat, force: true });
    else window.scrollTo({ top: cible, behavior: 'instant' });
  }

  /** Bloque le défilement de la page (menu mobile ouvert). */
  bloquerDefilement(bloque: boolean): void {
    if (bloque) this.lenis?.stop();
    else this.lenis?.start();
    document.documentElement.style.overflow = bloque ? 'hidden' : '';
  }

  private appliquer(): void {
    const actif = this.enabled();
    document.documentElement.classList.toggle('motion-ok', actif);
    if (actif) this.demarrerLenis();
    else this.arreterLenis();
    this.scenes.forEach((scene) => this.jouer(scene));
    if (actif) ScrollTrigger.refresh();
  }

  /**
   * Quand la hauteur de la page change (polices chargées, image affichée…), les positions
   * de déclenchement des animations doivent être recalculées.
   */
  private surveillerHauteurPage(): void {
    let attente = 0;
    const recalculer = () => {
      clearTimeout(attente);
      attente = window.setTimeout(() => this.enabled() && ScrollTrigger.refresh(), 250);
    };
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(recalculer).observe(document.body);
    document.fonts?.ready.then(recalculer);
  }

  private jouer(scene: Scene): void {
    scene.contexte?.revert();
    scene.contexte = this.enabled() ? gsap.context(scene.construire, scene.portee) : undefined;
  }

  private demarrerLenis(): void {
    if (this.lenis) return;
    this.lenis = new Lenis({ lerp: 0.1, autoRaf: false });
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(this.tic);
    gsap.ticker.lagSmoothing(0);
  }

  private arreterLenis(): void {
    if (!this.lenis) return;
    gsap.ticker.remove(this.tic);
    gsap.ticker.lagSmoothing(500, 33);
    this.lenis.destroy();
    this.lenis = undefined;
  }

  private defilerApresNavigation(e: Scroll): void {
    const url = e.routerEvent instanceof NavigationEnd ? e.routerEvent.urlAfterRedirects : e.routerEvent.url;
    const chemin = url.split(/[?#]/)[0];
    const memePage = chemin === this.cheminPrecedent;
    this.cheminPrecedent = chemin;
    if (this.enabled()) ScrollTrigger.refresh();

    if (e.position) this.defilerVers(e.position[1], true); // bouton « retour » : on revient où on était
    else if (e.anchor) this.defilerVers(e.anchor, !memePage); // lien vers une section (#parcours…)
    else this.defilerVers(0, !memePage); // nouvelle page : on repart du haut
  }
}

/** Le script de index.html a déjà choisi (classe motion-ok) selon le stockage local ou le réglage du système. */
function lirePreference(): boolean {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('motion-ok');
}
