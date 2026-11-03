import { isDevMode } from '@angular/core';
import { PARCOURS } from '../data/parcours';
import { REALISATIONS } from '../data/realisations';
import { COMPETENCES_B1 } from '../data/referentiel';
import { Brouillon, CodeCompetence, Realisation } from '../models';

/** Retire les éléments « à compléter », sauf si on veut les voir (en développement). */
export function filtrerBrouillons<T extends Brouillon>(elements: readonly T[], avecBrouillons: boolean): T[] {
  return elements.filter((e) => avecBrouillons || !e.aCompleter);
}

/** En développement (npm start) on voit tout ; en ligne, seulement le contenu terminé. */
export function visibles<T extends Brouillon>(elements: readonly T[]): T[] {
  return filtrerBrouillons(elements, isDevMode());
}

/** Les réalisations dans l'ordre du fichier data/realisations.ts. */
export const realisationsVisibles = (): Realisation[] => visibles(REALISATIONS);

export const parcoursVisible = () => visibles(PARCOURS);

/** Compétences du bloc 1 qu'aucune réalisation ne couvre encore. */
export function competencesNonCouvertes(realisations: readonly Realisation[]): CodeCompetence[] {
  return COMPETENCES_B1.map((c) => c.code).filter((code) => !realisations.some((r) => r.competences.includes(code)));
}

const MOIS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

/** « 2026-10-15 » → « 15 octobre 2026 » ; « 2025-06 » → « juin 2025 ». */
export function dateLisible(iso: string): string {
  const [annee, mois, jour] = iso.split('-').map(Number);
  const nomMois = MOIS[mois - 1];
  if (!jour) return `${nomMois} ${annee}`;
  return `${jour === 1 ? '1er' : jour} ${nomMois} ${annee}`;
}

export const LIBELLES_CONTEXTE = {
  formation: 'En formation',
  stage1: 'Stage de 1re année',
  stage2: 'Stage de 2e année',
} as const;
