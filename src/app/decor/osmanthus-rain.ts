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
import { MotionService } from '../core/motion.service';

interface Fleur {
  x: number;
  y: number;
  taille: number;
  vitesse: number;
  balancement: number;
  frequence: number;
  phase: number;
  rotation: number;
  vitesseRotation: number;
  opacite: number;
}

/**
 * Pluie de fleurs d'osmanthus (桂花), la fleur de Guilin, dessinée dans un <canvas>.
 * L'animation s'arrête quand le canvas n'est plus visible ou quand les animations sont coupées.
 */
@Component({
  selector: 'app-osmanthus-rain',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #toile aria-hidden="true"></canvas>`,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class OsmanthusRain {
  private readonly toile = viewChild.required<ElementRef<HTMLCanvasElement>>('toile');
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.motion.scene(this.toile().nativeElement, () => this.animer(), this.destroyRef);
    });
  }

  private animer(): () => void {
    const canvas = this.toile().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => undefined;

    let largeur = 0;
    let hauteur = 0;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const redimensionner = () => {
      largeur = canvas.clientWidth;
      hauteur = canvas.clientHeight;
      canvas.width = Math.round(largeur * ratio);
      canvas.height = Math.round(hauteur * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    redimensionner();

    const fleurs = Array.from({ length: largeur < 700 ? 12 : 26 }, () => nouvelleFleur(largeur, hauteur, true));
    let visible = true;
    const observateur = new IntersectionObserver(([entree]) => (visible = entree.isIntersecting));
    observateur.observe(canvas);
    const surveillanceTaille = new ResizeObserver(redimensionner);
    surveillanceTaille.observe(canvas);

    const dessiner = (temps: number, delta: number) => {
      if (!visible) return;
      const dt = Math.min(delta, 50) / 1000;
      ctx.clearRect(0, 0, largeur, hauteur);
      for (const f of fleurs) {
        f.y += f.vitesse * dt;
        f.x += Math.sin(temps * f.frequence + f.phase) * f.balancement * dt;
        f.rotation += f.vitesseRotation * dt;
        if (f.y > hauteur + 20) Object.assign(f, nouvelleFleur(largeur, hauteur, false));
        dessinerFleur(ctx, f);
      }
    };
    gsap.ticker.add(dessiner);

    return () => {
      gsap.ticker.remove(dessiner);
      observateur.disconnect();
      surveillanceTaille.disconnect();
      ctx.clearRect(0, 0, largeur, hauteur);
    };
  }
}

function nouvelleFleur(largeur: number, hauteur: number, partout: boolean): Fleur {
  return {
    x: Math.random() * largeur,
    y: partout ? Math.random() * hauteur : -20 - Math.random() * 80,
    taille: 3 + Math.random() * 4,
    vitesse: 16 + Math.random() * 30,
    balancement: 10 + Math.random() * 24,
    frequence: 0.5 + Math.random(),
    phase: Math.random() * Math.PI * 2,
    rotation: Math.random() * Math.PI,
    vitesseRotation: (Math.random() - 0.5) * 2,
    opacite: 0.55 + Math.random() * 0.4,
  };
}

/** Une fleur d'osmanthus : quatre petits pétales dorés autour d'un cœur orangé. */
function dessinerFleur(ctx: CanvasRenderingContext2D, f: Fleur): void {
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(f.rotation);
  ctx.globalAlpha = f.opacite;
  ctx.fillStyle = '#e3a33b';
  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2);
    ctx.beginPath();
    ctx.ellipse(0, -f.taille * 0.55, f.taille * 0.38, f.taille * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#b8661a';
  ctx.beginPath();
  ctx.arc(0, 0, f.taille * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
