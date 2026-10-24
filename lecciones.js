// Lecciones añadidas al modo maestro (formas verbales que no están en el juego de morfemas).
// Cada palabra de una forma compuesta se separa con « | » (auxiliar haber | participio) y se
// analiza por separado, como en el examen. Campos: s análisis, c categoría, f formación de cada
// palabra, t tiempo de cada palabra, v verbo, n persona (0–5), tt tiempo del conjunto,
// e explicaciones propias («palabra.morfema»), nota casos que los manuales analizan distinto.
// Validación: node maestro.js --lecciones (también lo hace pruebas-todo.js).
(function (global) {
  'use strict';
  const HAB = '«hab» es el lexema del auxiliar haber. En el futuro y en el condicional, haber pierde la vocal temática (hab‑e‑ré → hab‑ré, síncopa): por eso tras hab‑ va directamente el morfema de tiempo.';
  const HUB = '«hub» es el lexema de haber en su forma irregular de pretérito (alomorfo de hab‑): hube, hubiera, hubiese, hubiere.';
  const NOTA_HAB = 'Algunos manuales toman habr‑ como lexema (alomorfo) y solo ‑é‑/‑ía‑ como tiempo (habr‑é‑is).';

  const LECCIONES = [
    { s: 'hab/L ré/T is/X | sal/L i/V d/D o/G', c: 'ver', f: 'simple | simple', t: 'fut | par', v: 'haber | salir', n: '4 |',
      tt: 'futuro compuesto de indicativo', e: { '0.0': HAB }, nota: NOTA_HAB },
    { s: 'teng/L a/T mos/X', c: 'ver', f: 'simple', t: 'spres', v: 'tener', n: '3', tt: 'presente de subjuntivo',
      e: { '0.0': '«teng» es el lexema de tener en su forma irregular (alomorfo de ten‑): el presente de subjuntivo toma la raíz de la 1.ª persona del presente, teng‑o.' } },
    { s: 'hub/L i/V ste/T is/X | lleg/L a/V d/D o/G', c: 'ver', f: 'simple | simple', t: 'indef | par', v: 'haber | llegar', n: '4 |',
      tt: 'pretérito anterior', e: { '0.0': HUB,
        '0.1': '«‑i‑» es la vocal temática que toma la raíz de pretérito hub‑ (como com‑i‑ste‑is).',
        '0.2': '«‑ste‑» es el morfema de tiempo, aspecto y modo del pretérito perfecto simple (hub‑i‑ste‑is, como cant‑a‑ste‑is).' },
      nota: 'El pretérito perfecto simple es el tiempo cuya segmentación más varía entre manuales: también se ve hub‑iste‑is. El pretérito anterior apenas se usa hoy fuera de la lengua escrita.' },
    { s: 'fu/L é/V ra/T mos/X', c: 'ver', f: 'simple', t: 'sra', v: 'ser / ir', n: '3', tt: 'pretérito imperfecto de subjuntivo (‑ra)',
      e: { '0.0': '«fu» es el lexema supletivo que comparten ser e ir en el pretérito y en el imperfecto de subjuntivo (fui, fuera): una raíz distinta de la del infinitivo.',
        '0.1': '«‑é‑» es la vocal temática: la ‑ie‑ de com‑ie‑ra se reduce a ‑e‑ tras fu‑ (fu‑e‑ra), y aquí lleva tilde por ser esdrújula.' },
      nota: 'Fuéramos puede ser de ser o de ir: el análisis es el mismo. Algunos manuales toman fue‑ como raíz (fue‑ra‑mos).' },
    { s: 'hab/L ría/T s/X | dich/L o/G', c: 'ver', f: 'simple | simple', t: 'cond | par', v: 'haber | decir', n: '1 |',
      tt: 'condicional compuesto', e: { '0.0': HAB,
        '1.0': '«dich» es el lexema de decir en su forma irregular de participio: dicho no lleva el morfema ‑d‑, porque la marca de participio va fundida en la raíz (participio irregular, como hecho).' },
      nota: NOTA_HAB },
    { s: 'sup/L ié/V ra/T mos/X', c: 'ver', f: 'simple', t: 'sra', v: 'saber', n: '3', tt: 'pretérito imperfecto de subjuntivo (‑ra)',
      e: { '0.0': '«sup» es el lexema de saber en su forma irregular de pretérito (alomorfo de sab‑): supe, supiera, supiese.' } },
    { s: 'hab/L ría/T | lleg/L a/V d/D o/G', c: 'ver', f: 'simple | simple', t: 'cond | par', v: 'haber | llegar', n: '2 |',
      tt: 'condicional compuesto', e: { '0.0': HAB }, nota: 'En habría (yo / él) el morfema de número y persona es cero: no tiene forma visible. ' + NOTA_HAB },
    { s: 'hub/L ie/V se/T is/X | vis/L t/D o/G', c: 'ver', f: 'simple | simple', t: 'sse | par', v: 'haber | ver', n: '4 |',
      tt: 'pretérito pluscuamperfecto de subjuntivo', e: { '0.0': HUB,
        '1.0': '«vis» es el lexema de ver en su forma irregular de participio (ver → vis‑t‑o).',
        '1.1': '«‑t‑» es el morfema de participio en su variante irregular: ‑t‑ en lugar de ‑d‑ (vis‑t‑o, escri‑t‑o, pues‑t‑o).' },
      nota: 'Algunos manuales no separan la ‑t‑ y analizan vist‑o.' },
    { s: 'quer/L rá/T n/X', c: 'ver', f: 'simple', t: 'fut', v: 'querer', n: '5', tt: 'futuro simple de indicativo',
      e: { '0.0': '«quer» es el lexema de querer. En el futuro pierde la vocal temática (quer‑e‑rá‑n → quer‑rá‑n, síncopa): por eso la r aparece dos veces, una del lexema y otra del morfema de tiempo.' } },
    { s: 'hub/L ie/V ra/T s/X | hech/L o/G', c: 'ver', f: 'simple | simple', t: 'sra | par', v: 'haber | hacer', n: '1 |',
      tt: 'pretérito pluscuamperfecto de subjuntivo', e: { '0.0': HUB,
        '1.0': '«hech» es el lexema de hacer en su forma irregular de participio: hecho no lleva el morfema ‑d‑ (participio irregular, como dicho).' } },
    { s: 'estuv/L ié/V ra/T mos/X', c: 'ver', f: 'simple', t: 'sra', v: 'estar', n: '3', tt: 'pretérito imperfecto de subjuntivo (‑ra)',
      e: { '0.0': '«estuv» es el lexema de estar en su forma irregular de pretérito (alomorfo de est‑): estuve, estuviera, estuviese.',
        '0.1': '«‑ié‑» es la vocal temática: con la raíz irregular estuv‑, estar toma la ‑ie‑ de la 2.ª y la 3.ª conjugación (estuv‑ie‑ra), no la ‑a‑ de la 1.ª (cant‑a‑ra).' } },
    { s: 'hab/L rá/T n/X | des/P cubier/L t/D o/G', c: 'ver', f: 'simple | derivada', t: 'fut | par', v: 'haber | descubrir', n: '5 |',
      tt: 'futuro compuesto de indicativo', e: { '0.0': HAB,
        '1.1': '«cubier» es el lexema de cubrir en su forma irregular de participio (cubrir → cubier‑t‑o).',
        '1.2': '«‑t‑» es el morfema de participio en su variante irregular: ‑t‑ en lugar de ‑d‑.' },
      nota: 'Descubierto es derivada porque lleva el prefijo des‑ (descubrir = des‑ + cubrir). Algunos manuales analizan descubiert‑o sin separar la ‑t‑.' },
    { s: 'traduj/L e/V se/T', c: 'ver', f: 'simple', t: 'sse', v: 'traducir', n: '0', tt: 'pretérito imperfecto de subjuntivo (‑se)',
      e: { '0.0': '«traduj» es el lexema de traducir en su forma irregular de pretérito (alomorfo de traduc‑): traduje, tradujese, como conduj‑ o produj‑.',
        '0.1': '«‑e‑» es la vocal temática: tras la j de estas raíces, la ‑ie‑ se reduce a ‑e‑ (traduj‑e‑se, dij‑e‑se, traj‑e‑se).' },
      nota: 'En tradujese (yo / él) el morfema de número y persona es cero: no tiene forma visible.' },
    { s: 'hub/L ie/V re/T | acab/L a/V d/D o/G', c: 'ver', f: 'simple | simple', t: 'sfut | par', v: 'haber | acabar', n: '2 |',
      tt: 'futuro compuesto de subjuntivo', e: { '0.0': HUB,
        '0.2': '«‑re‑» es el morfema de tiempo, aspecto y modo del futuro de subjuntivo (hub‑ie‑re, cant‑a‑re); hoy solo se usa en textos jurídicos y en frases hechas.' },
      nota: 'En hubiere (yo / él) el morfema de número y persona es cero. El futuro de subjuntivo apenas se usa en la lengua actual.' }
  ];

  // Convierte una lección en una lista de palabras con el formato de la base (segs, form, tiempo…)
  function palabrasDe(l) {
    const partes = l.s.split('|').map(x => x.trim());
    const col = (v, k) => (v === undefined ? [] : String(v).split('|').map(x => x.trim()))[k];
    return partes.map((p, k) => {
      const segs = p.split(/\s+/).map(x => { const i = x.lastIndexOf('/'); return [x.slice(0, i), x.slice(i + 1)]; });
      const exp = {};
      for (const [clave, txt] of Object.entries(l.e || {})) { const [w, i] = clave.includes('.') ? clave.split('.') : ['0', clave]; if (+w === k) exp[i] = txt; }
      const n = col(l.n, k);
      return { palabra: segs.map(s => s[0]).join(''), cat: l.c, form: col(l.f, k) || l.f, segs, tiempo: col(l.t, k) || undefined,
        verbo: col(l.v, k) || undefined, persona: n === '' || n === undefined ? undefined : +n, exp, nota: '' };
    });
  }
  const API = { LECCIONES, palabrasDe };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.Lecciones = API;
})(typeof window !== 'undefined' ? window : globalThis);
