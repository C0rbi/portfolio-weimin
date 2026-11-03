/**
 * Tracé du fleuve du parcours : il passe par le centre de chaque lanterne et s'écarte
 * alternativement à gauche et à droite entre deux lanternes (courbes en S).
 */
export function tracerFleuve(x: number, etapes: readonly number[], hauteur: number, ecart: number): string {
  const points = [0, ...etapes, hauteur];
  let trace = `M${x},${points[0]}`;
  for (let i = 1; i < points.length; i++) {
    const debut = points[i - 1];
    const fin = points[i];
    const cote = i % 2 === 1 ? 1 : -1;
    const tiers = (fin - debut) * 0.3;
    trace += ` C${x + cote * ecart},${debut + tiers} ${x + cote * ecart},${fin - tiers} ${x},${fin}`;
  }
  return trace;
}
