import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MagneticDirective, RevealDirective } from '../../../core/animations';
import { PROFIL } from '../../../data/profil';
import { Lantern } from '../../../decor/lantern';
import { SectionHeading } from '../../../layout/section-heading';

/**
 * Étape 7 : me contacter. Le formulaire n'envoie rien à un serveur : il prépare un e-mail
 * dans la messagerie du visiteur. Aucune donnée n'est donc stockée par le site.
 */
@Component({
  selector: 'app-contact',
  imports: [SectionHeading, Lantern, RevealDirective, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactSection {
  protected readonly profil = PROFIL;
  protected readonly copie = signal(false);

  protected async copierEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profil.email);
      this.copie.set(true);
      setTimeout(() => this.copie.set(false), 2500);
    } catch {
      // Presse-papiers refusé : l'adresse reste affichée et cliquable.
    }
  }

  protected ecrire(evenement: SubmitEvent): void {
    evenement.preventDefault();
    const donnees = new FormData(evenement.target as HTMLFormElement);
    const objet = `[Portfolio] ${donnees.get('objet') ?? ''}`;
    const corps = `${donnees.get('message') ?? ''}\n\n${donnees.get('nom') ?? ''}`;
    window.location.href = `mailto:${this.profil.email}?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(corps)}`;
  }
}
