import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Raft } from '../../decor/raft';

/** Page 404 : le radeau s'est égaré. */
@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, Raft],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container perdu">
      <p class="perdu__zh" lang="zh-Hans" aria-hidden="true">迷路了</p>
      <h1>Page introuvable</h1>
      <p>Le radeau s'est égaré : cette page n'existe pas. Reprenons le fil du fleuve depuis la source.</p>
      <app-raft class="perdu__radeau" aria-hidden="true" />
      <a class="btn btn--seal" routerLink="/">Retour à l'accueil</a>
    </section>
  `,
  styles: `
    .perdu {
      display: grid;
      justify-items: center;
      gap: 12px;
      min-height: 80vh;
      align-content: center;
      padding-top: var(--header-h);
      text-align: center;
    }
    .perdu__zh {
      margin: 0;
      font-family: var(--font-brush);
      font-size: clamp(4rem, 14vw, 9rem);
      line-height: 1;
      color: var(--cinnabar);
    }
    h1 {
      font-size: clamp(2.2rem, 5vw, 3.4rem);
    }
    p {
      max-width: 44ch;
      color: var(--ink-2);
    }
    .perdu__radeau {
      width: 160px;
      margin: 8px 0 16px;
    }
  `,
})
export class NotFoundPage {}
