// Préparation des tests : jsdom (le navigateur simulé de Vitest) n'a pas matchMedia,
// dont GSAP a besoin au chargement. On en fournit une version minimale.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (requete: string) =>
    ({
      matches: false,
      media: requete,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
