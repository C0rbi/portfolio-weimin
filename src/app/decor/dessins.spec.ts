import { tracerFleuve } from './fleuve';
import { tracerMontagnes } from './karst';

describe('tracerMontagnes', () => {
  it('dessine une courbe par flanc et ferme chaque pic', () => {
    const trace = tracerMontagnes([{ x: 100, l: 80, h: 200 }], 600);
    expect(trace.startsWith('M60,600')).toBe(true);
    expect(trace.match(/C/g)).toHaveLength(2);
    expect(trace).toContain('100,400');
  });
});

describe('tracerFleuve', () => {
  it('passe par le centre de chaque lanterne', () => {
    const trace = tracerFleuve(50, [120, 300, 520], 700, 20);
    for (const y of [120, 300, 520]) expect(trace).toContain(`50,${y}`);
    expect(trace.startsWith('M50,0')).toBe(true);
    expect(trace.endsWith('50,700')).toBe(true);
  });
});
