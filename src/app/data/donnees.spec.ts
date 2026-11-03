import { REALISATIONS } from './realisations';
import { COMPETENCES_B1 } from './referentiel';
import { ARTICLES_VEILLE, SOURCES_VEILLE } from './veille';

// Ces tests vérifient le contenu du portfolio : une erreur de saisie fait échouer `npm test`.

describe('Réalisations', () => {
  it('ont toutes une adresse (slug) différente', () => {
    const slugs = REALISATIONS.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('mobilisent au moins une compétence du bloc 1', () => {
    for (const r of REALISATIONS) expect(r.competences.length, r.titre).toBeGreaterThan(0);
  });

  it('ont une période en années seulement (« 2025 » ou « 2025 — 2026 »)', () => {
    for (const r of REALISATIONS) expect(r.periode, r.titre).toMatch(/^\d{4}( — \d{4})?$/);
  });

  it('justifient chaque compétence cochée', () => {
    for (const r of REALISATIONS.filter((r) => !r.aCompleter)) {
      for (const c of r.competences) expect(r.preuves[c], `${r.titre} : ${c}`).toBeTruthy();
    }
  });

  it('utilisent des codes de compétence qui existent', () => {
    const codes = COMPETENCES_B1.map((c) => c.code);
    for (const r of REALISATIONS) for (const c of r.competences) expect(codes).toContain(c);
  });
});

describe('Veille', () => {
  it('a des fiches datées (AAAA-MM-JJ ou AAAA-MM) avec une source en https', () => {
    for (const a of ARTICLES_VEILLE) {
      expect(a.date, a.titre).toMatch(/^\d{4}-\d{2}(-\d{2})?$/);
      expect(a.url, a.titre).toMatch(/^https:\/\//);
      expect(a.analyse.length, a.titre).toBeGreaterThan(20);
    }
  });

  it('cite au moins cinq sources', () => {
    expect(SOURCES_VEILLE.length).toBeGreaterThanOrEqual(5);
  });
});
