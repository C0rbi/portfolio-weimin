import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it("affiche l'en-tête avec le logo et le lien d'évitement", async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('.skip-link')?.textContent).toContain('Aller au contenu');
    expect(page.querySelector('.logo__texte strong')?.textContent).toContain('Weimin LIU');
  });

  it("ne montre pas l'intro quand les animations sont coupées", async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('.intro')).toBeNull();
  });
});
