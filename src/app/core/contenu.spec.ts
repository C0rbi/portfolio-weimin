import { Realisation } from '../models';
import { competencesNonCouvertes, dateLisible, filtrerBrouillons } from './contenu';

describe('filtrerBrouillons', () => {
  const elements = [{ nom: 'terminé' }, { nom: 'brouillon', aCompleter: true }];

  it('retire les éléments à compléter pour le site en ligne', () => {
    expect(filtrerBrouillons(elements, false).map((e) => e.nom)).toEqual(['terminé']);
  });

  it('les garde en développement', () => {
    expect(filtrerBrouillons(elements, true)).toHaveLength(2);
  });
});

describe('dateLisible', () => {
  it('écrit la date en français', () => {
    expect(dateLisible('2026-10-15')).toBe('15 octobre 2026');
  });

  it('écrit « 1er » pour le premier jour du mois', () => {
    expect(dateLisible('2025-05-01')).toBe('1er mai 2025');
  });

  it("accepte une date sans jour", () => {
    expect(dateLisible('2025-06')).toBe('juin 2025');
  });
});

describe('competencesNonCouvertes', () => {
  it('liste les compétences du bloc 1 sans réalisation', () => {
    const realisations = [{ competences: ['B1.1', 'B1.2', 'B1.3'] }, { competences: ['B1.3', 'B1.5'] }];
    expect(competencesNonCouvertes(realisations as Realisation[])).toEqual(['B1.4', 'B1.6']);
  });
});
