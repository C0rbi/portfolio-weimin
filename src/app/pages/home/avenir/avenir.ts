import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective, SplitDirective, StaggerDirective } from '../../../core/animations';
import { BESOINS_FORMATION, PISTES_AVENIR } from '../../../data/profil';
import { SectionHeading } from '../../../layout/section-heading';

/** Étape 6 : après le BTS. Je n'ai pas encore choisi : je présente mes pistes et ce que je veux apprendre. */
@Component({
  selector: 'app-avenir',
  imports: [SectionHeading, RevealDirective, StaggerDirective, SplitDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="avenir" aria-labelledby="titre-avenir">
      <div class="container">
        <app-section-heading
          numero="六"
          kicker="Étape 6"
          titre="Et après le BTS ?"
          zh="未来"
          pinyin="wèilái"
          idTitre="titre-avenir"
          intro="Je n'ai pas encore arrêté mon choix. Voici les pistes que j'étudie, et ce que je veux encore apprendre, quel que soit le chemin."
        />

        <figure class="citation">
          <blockquote>
            <p class="citation__zh" lang="zh-Hans" appSplit="chars">千里之行，始于足下</p>
            <p class="citation__fr" appReveal>« Un voyage de mille lieues commence par un premier pas. »</p>
          </blockquote>
          <figcaption appReveal>Lao Tseu, Tao-tö-king</figcaption>
        </figure>

        <ul class="pistes" appStagger>
          @for (p of pistes; track p.titre) {
            <li class="piste paper-card">
              <span class="piste__zh zh-brush" lang="zh-Hans" aria-hidden="true">{{ p.zh }}</span>
              <span class="piste__pinyin" aria-hidden="true">{{ p.pinyin }}</span>
              <h3>{{ p.titre }}</h3>
              <p>{{ p.description }}</p>
              <ul class="piste__exemples">
                @for (e of p.exemples; track e) {
                  <li>{{ e }}</li>
                }
              </ul>
            </li>
          }
        </ul>

        <div class="besoins" appReveal>
          <h3>Ce que je veux encore apprendre</h3>
          <ul>
            @for (b of besoins; track b) {
              <li>{{ b }}</li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styleUrl: './avenir.scss',
})
export class AvenirSection {
  protected readonly pistes = PISTES_AVENIR;
  protected readonly besoins = BESOINS_FORMATION;
}
