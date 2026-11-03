// Types du contenu du portfolio. Le contenu lui-même est dans src/app/data/.

/** Les 6 compétences du bloc 1, évaluées à l'épreuve E5 (numérotation en vigueur depuis la session 2025). */
export type CodeCompetence = 'B1.1' | 'B1.2' | 'B1.3' | 'B1.4' | 'B1.5' | 'B1.6';

export interface CompetenceB1 {
  code: CodeCompetence;
  titre: string;
  /** Titre court pour les tableaux. */
  court: string;
  /** Mot chinois décoratif. */
  zh: string;
  description: string;
  sousCompetences: string[];
}

export interface BlocReferentiel {
  numero: 1 | 2 | 3;
  titre: string;
  epreuve: string;
  competences: string[];
}

/** Un élément peut être marqué « à compléter » : il s'affiche en développement, jamais en ligne. */
export interface Brouillon {
  aCompleter?: boolean;
}

export interface EtapeParcours extends Brouillon {
  periode: string;
  titre: string;
  lieu?: string;
  description: string;
  type: 'origine' | 'formation' | 'experience' | 'avenir';
  /** Caractère chinois affiché dans la lanterne. */
  zh: string;
}

/** Où la réalisation a été faite : en formation, en stage de 1re année ou de 2e année. */
export type ContexteRealisation = 'formation' | 'stage1' | 'stage2';

export interface Lien {
  label: string;
  url: string;
}

export interface Realisation extends Brouillon {
  slug: string;
  titre: string;
  zh: string;
  contexte: ContexteRealisation;
  /** Entreprise ou établissement. */
  lieu: string;
  /** Année seule (« 2025 ») ou deux années (« 2025 — 2026 »). */
  periode: string;
  modalite?: 'Seul' | 'En équipe';
  /** Pour un travail d'équipe : ce que j'ai fait moi-même (le jury le demande). */
  maContribution?: string;
  resume: string;
  technologies: string[];
  competences: CodeCompetence[];
  /** Pour chaque compétence cochée : en quoi cette réalisation la montre (le jury le demande). */
  preuves: Partial<Record<CodeCompetence, string>>;
  /** Compétences des blocs 2 et 3 (épreuves E6 et E7). */
  autresCompetences: string[];
  contexteDetail: string;
  objectifs: string[];
  etapes: string[];
  bilan: string;
  liens: Lien[];
}

export interface GroupeSavoirFaire {
  titre: string;
  zh: string;
  items: { nom: string; sigle: string; couleur: string; detail: string }[];
}

export interface Langue {
  nom: string;
  natif: string;
  niveau: string;
  /** De 1 à 5, pour la petite jauge. */
  jauge: number;
}

export interface ArticleVeille {
  /** Date au format AAAA-MM-JJ (ou AAAA-MM si le jour exact n'est pas connu). */
  date: string;
  titre: string;
  source: string;
  url: string;
  resume: string;
  analyse: string;
  tags: string[];
}

export interface SourceVeille {
  nom: string;
  url: string;
  type: string;
  langue: 'FR' | 'EN' | '中文';
  pourquoi: string;
}

export interface PisteAvenir {
  titre: string;
  zh: string;
  pinyin: string;
  description: string;
  exemples: string[];
}
