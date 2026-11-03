import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InkIntro } from './layout/ink-intro';
import { InkRipple } from './layout/ink-ripple';
import { RiverProgress } from './layout/river-progress';
import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, RiverProgress, InkIntro, InkRipple],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#contenu" (click)="allerAuContenu($event)">Aller au contenu</a>
    <app-ink-intro />
    <app-site-header />
    <main id="contenu" tabindex="-1">
      <router-outlet />
    </main>
    <app-site-footer />
    <app-river-progress />
    <app-ink-ripple />
  `,
})
export class App {
  protected allerAuContenu(evenement: Event): void {
    evenement.preventDefault();
    document.getElementById('contenu')?.focus();
  }
}
