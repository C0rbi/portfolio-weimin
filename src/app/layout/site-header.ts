import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { MotionService } from '../core/motion.service';
import { SECTIONS, SectionsService } from '../core/sections.service';
import { ThemeService } from '../core/theme.service';
import { Seal } from '../decor/seal';

/** En-tête fixe : logo, liens vers les étapes, boutons animations / thème, menu mobile. */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink, Seal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  host: {
    '(window:scroll)': 'surDefilement()',
    '(document:keydown.escape)': 'fermerMenu()',
  },
})
export class SiteHeader {
  protected readonly motion = inject(MotionService);
  protected readonly theme = inject(ThemeService);
  protected readonly sections = inject(SectionsService);
  protected readonly liens = SECTIONS;

  protected readonly defile = signal(false);
  protected readonly cache = signal(false);
  protected readonly menuOuvert = signal(false);

  private readonly boutonMenu = viewChild<ElementRef<HTMLButtonElement>>('boutonMenu');
  private readonly injector = inject(Injector);
  private dernierY = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.motion.bloquerDefilement(false));
  }

  protected surDefilement(): void {
    const y = window.scrollY;
    this.defile.set(y > 30);
    // L'en-tête se cache quand on descend et revient dès qu'on remonte.
    this.cache.set(y > 400 && y > this.dernierY && !this.menuOuvert());
    this.dernierY = y;
  }

  protected aller(evenement: Event, id: string): void {
    this.fermerMenu();
    this.sections.aller(evenement, id);
  }

  protected basculerTheme(evenement: MouseEvent): void {
    this.theme.basculer({ x: evenement.clientX, y: evenement.clientY });
  }

  protected ouvrirMenu(): void {
    this.menuOuvert.set(true);
    this.motion.bloquerDefilement(true);
    afterNextRender(
      () => {
        const menu = document.getElementById('menu-mobile');
        menu?.querySelector<HTMLElement>('.menu__fermer')?.focus();
        if (menu && this.motion.enabled()) {
          gsap.from(menu.querySelectorAll('.menu__lien'), {
            y: 60,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 0.9,
            ease: 'expo.out',
          });
        }
      },
      { injector: this.injector },
    );
  }

  protected fermerMenu(): void {
    if (!this.menuOuvert()) return;
    this.menuOuvert.set(false);
    this.motion.bloquerDefilement(false);
    this.boutonMenu()?.nativeElement.focus();
  }
}
