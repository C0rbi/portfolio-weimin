import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HEBERGEUR, PROFIL } from '../../data/profil';

/** Mentions légales et informations sur les données personnelles. */
@Component({
  selector: 'app-mentions-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="container mentions">
      <a class="retour" routerLink="/">← Retour à l'accueil</a>
      <p class="kicker"><span lang="zh-Hans" class="zh-brush">声明</span> Informations légales</p>
      <h1>Mentions légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          {{ profil.prenom }} {{ profil.nom }}, étudiant en BTS SIO option SLAM, {{ profil.ville }}.<br />
          Contact : <a [href]="'mailto:' + profil.email">{{ profil.email }}</a><br />
          Responsable de la publication : {{ profil.prenom }} {{ profil.nom }}.
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          {{ hebergeur.nom }}<br />
          {{ hebergeur.adresse }}
          @if (hebergeur.site) {
            <br /><a [href]="hebergeur.site" target="_blank" rel="noopener">{{ hebergeur.site }}</a>
          }
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>Ce site ne collecte aucune donnée personnelle : pas de compte, pas de cookie, pas de mesure d'audience, pas de publicité.</p>
        <ul>
          <li>
            Le formulaire de contact n'envoie rien au site : il ouvre votre propre messagerie, avec le message prérempli.
          </li>
          <li>
            Deux préférences (thème jour / nuit et animations) sont mémorisées dans votre navigateur (stockage local). Elles
            ne quittent pas votre appareil et s'effacent avec les données de navigation.
          </li>
          <li>
            Les polices de caractères sont hébergées avec le site : aucune requête n'est envoyée à un service tiers comme
            Google Fonts.
          </li>
          <li>
            Le serveur qui héberge le site peut conserver des journaux techniques (adresse IP, date, page demandée) pour
            sa sécurité.
          </li>
        </ul>
        <p>
          Pour toute question sur vos données, écrivez-moi à l'adresse ci-dessus. Vous pouvez aussi adresser une
          réclamation à la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr</a>).
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, la photographie et les illustrations (dessinées en SVG pour ce site) appartiennent à
          {{ profil.prenom }} {{ profil.nom }}. Toute reproduction sans autorisation est interdite. Les marques et sites
          cités dans la veille appartiennent à leurs propriétaires respectifs.
        </p>
      </section>

      <section>
        <h2>Crédits</h2>
        <ul>
          <li>Application : Angular (licence MIT)</li>
          <li>Animations : GSAP (licence gratuite de GreenSock) et Lenis (licence MIT)</li>
          <li>Polices : Cormorant Garamond, Inter et Ma Shan Zheng (SIL Open Font License)</li>
        </ul>
      </section>
    </article>
  `,
  styles: `
    .mentions {
      max-width: 820px;
      padding-block: calc(var(--header-h) + clamp(32px, 6vw, 72px)) clamp(56px, 8vw, 96px);
    }
    .retour {
      display: inline-block;
      margin-bottom: 24px;
      color: var(--ink-2);
      font-size: 0.9rem;
      font-weight: 600;
      text-decoration: none;
    }
    .kicker .zh-brush {
      font-size: 1.4em;
      letter-spacing: 0.1em;
    }
    h1 {
      margin: 12px 0 36px;
      font-size: clamp(2.8rem, 7vw, 4.6rem);
    }
    section {
      padding: 24px 0;
      border-top: 1px solid var(--line);
    }
    h2 {
      margin-bottom: 10px;
      font-size: 1.6rem;
    }
    p,
    li {
      color: var(--ink-2);
    }
    li + li {
      margin-top: 8px;
    }
  `,
})
export class MentionsPage {
  protected readonly profil = PROFIL;
  protected readonly hebergeur = HEBERGEUR;
}
