import { EtapeParcours } from '../models';

// Mon parcours, de la source (le Guangxi) jusqu'à l'après-BTS. Les dates sont en années.
export const PARCOURS: EtapeParcours[] = [
  {
    periode: 'Les origines',
    titre: 'Guangxi, Chine',
    zh: '源',
    type: 'origine',
    description:
      'Je suis originaire du Guangxi, au sud de la Chine, la région des pics karstiques de Guilin et de la rivière Li. Ma langue maternelle est le chinois.',
  },
  {
    periode: '2018 — 2021',
    titre: 'Collège Magenta',
    lieu: 'Nouméa',
    zh: '学',
    type: 'formation',
    description: 'Ma scolarité au collège, de la sixième à la troisième.',
  },
  {
    periode: '2021',
    titre: 'Stage à la Bijouterie Gaspard',
    zh: '工',
    type: 'experience',
    description:
      "Ma première expérience en entreprise : accueil des clients, mise en place des présentoirs et des étiquettes de prix, entretien du magasin.",
  },
  {
    periode: '2022 — 2023',
    titre: 'Lycée Jules Garnier',
    zh: '学',
    type: 'formation',
    description:
      'Seconde générale, puis première STMG (sciences et technologies du management et de la gestion).',
  },
  {
    periode: '2024',
    titre: 'Lycée Blaise Pascal',
    zh: '学',
    type: 'formation',
    description:
      "Terminale STMG, spécialité SIG (systèmes d'information de gestion) : mes premiers pas dans les systèmes d'information.",
  },
  {
    periode: '2025 — 2026',
    titre: 'BTS SIO, option SLAM',
    lieu: 'Lycée Dick Ukeiwë',
    zh: '码',
    type: 'formation',
    description:
      'Services informatiques aux organisations, option solutions logicielles et applications métiers : développement web, bases de données, cybersécurité, gestion de projet.',
  },
  {
    periode: '2025',
    titre: 'Stage de première année',
    lieu: 'Lycée Jules Garnier',
    zh: '屏',
    type: 'experience',
    description:
      "Mise en place de l'affichage dynamique Xibo pour diffuser des informations sur les téléviseurs du lycée.",
  },
  {
    periode: '2026',
    titre: 'Stage de deuxième année',
    lieu: 'Marine Corail',
    zh: '海',
    type: 'experience',
    description: "Mise en ligne des stocks sur le site de l'entreprise, et essai d'un chatbot sur ce site.",
  },
  {
    periode: '2027 et après',
    titre: 'La suite du voyage',
    zh: '远',
    type: 'avenir',
    description: "Poursuite d'études ou premier emploi : je présente mes pistes un peu plus bas.",
  },
];
