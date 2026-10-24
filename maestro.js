// Modo maestro desde el chat: valida un análisis morfológico y genera el enlace a su lección animada.
//
//   node maestro.js panadero
//       → si la palabra está en la base (revisada a mano), muestra su análisis y el enlace.
//   node maestro.js "des/P orden/L a/V r/R" --cat ver --form derivada [--tiempo spres --verbo cantar --persona 3]
//                   [--exp "1=Texto propio para el morfema 1"] [--nota "Aviso sobre un caso discutido"]
//       → valida un análisis nuevo con las mismas reglas que la base y genera el enlace.
//
// Tipos: L lexema · P prefijo · S sufijo · A apreciativo · I interfijo · G género · N número · V vocal temática
//        T tiempo-aspecto-modo · X número-persona · R infinitivo · E gerundio · D participio
const M = require('./morfemas-datos.js');
const WEB = 'https://hamzaleghouiti12-sketch.github.io/verbos/maestro.html';
const LOCAL = 'http://localhost:8761/maestro.html';

const args = process.argv.slice(2);
if (!args.length) { console.log('Uso: node maestro.js <palabra> | "seg/T seg/T ..." --cat sus|adj|ver|adv --form simple|derivada|compuesta|parasintética'); process.exit(1); }
const opt = k => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : undefined; };
const exps = args.flatMap((a, i) => a === '--exp' ? [args[i + 1]] : []);

const enlace = hash => ({ web: `${WEB}#${hash}`, local: `${LOCAL}#${hash}` });
const muestra = it => `${it.segs.map(s => s[0]).join('-')}   (${it.segs.map(([s, t]) => `${s} = ${M.TIPOS[t]}`).join(' · ')})`;

// 1) palabra de la base
if (!args[0].includes('/')) {
  const w = M.sinTilde(args[0]);
  const it = M.ITEMS.find(x => M.sinTilde(x.palabra) === w);
  if (!it) { console.log(`«${args[0]}» no está en la base: analízala y pásala como "seg/T seg/T ..." con --cat y --form.`); process.exit(2); }
  console.log(`EN LA BASE (revisada): ${it.palabra} · ${M.CATS[it.cat]} · ${it.form}`);
  console.log('Análisis: ' + muestra(it));
  const alt = M.aceptadas(it).map(f => M.formatear(it.palabra, f)).slice(1);
  if (alt.length) console.log('También se acepta: ' + alt.join(' | '));
  if (it.nota) console.log('Nota: ' + it.nota);
  console.log('Redacción modelo: ' + M.redaccionModelo(it));
  const e = enlace('p=' + encodeURIComponent(it.palabra));
  console.log(`\nLección: ${e.web}\nLocal:   ${e.local}`);
  process.exit(0);
}

// 2) análisis nuevo: mismas comprobaciones que pruebas-morfemas.js
const segs = args[0].trim().split(/\s+/).map(x => { const i = x.lastIndexOf('/'); return [x.slice(0, i), x.slice(i + 1)]; });
const cat = opt('cat'), form = opt('form');
const problemas = [];
for (const [s, t] of segs) { if (!s) problemas.push('hay un segmento vacío'); if (!M.TIPOS[t]) problemas.push(`tipo desconocido «${t}»`); }
if (!['simple', 'derivada', 'compuesta', 'parasintética'].includes(form)) problemas.push('falta --form (simple, derivada, compuesta o parasintética)');
if (!cat) problemas.push('falta --cat (sus, adj, ver, adv u otra categoría)');
const tipos = segs.map(s => s[1]), nL = tipos.filter(t => t === 'L').length, deriv = tipos.some(t => ['P', 'S', 'A', 'I'].includes(t));
if (form === 'simple' && (nL !== 1 || deriv)) problemas.push('una palabra simple tiene un solo lexema y ningún afijo derivativo');
if (form === 'derivada' && (nL !== 1 || !deriv)) problemas.push('una derivada tiene un solo lexema y algún afijo derivativo');
if (form === 'compuesta' && nL < 2) problemas.push('una compuesta tiene al menos dos lexemas');
if (form === 'parasintética' && !(nL >= 2 && tipos.includes('S')) && !(tipos.includes('P') && (tipos.includes('S') || tipos.includes('V'))))
  problemas.push('una parasintética combina prefijo y sufijo (o terminación verbal), o composición y derivación');
if (tipos[0] !== 'L' && tipos[0] !== 'P') problemas.push('la palabra debe empezar por lexema o prefijo');
if (['P', 'I'].includes(tipos.at(-1))) problemas.push('no puede acabar en prefijo ni interfijo');
if (tipos.includes('N') && tipos.indexOf('N') !== tipos.length - 1) problemas.push('el morfema de número va al final');
if (problemas.length) { console.log('ANÁLISIS NO VÁLIDO:\n- ' + [...new Set(problemas)].join('\n- ')); process.exit(1); }

const palabra = segs.map(s => s[0]).join('');
const dato = { s: args[0].trim(), c: cat, f: form };
if (opt('tiempo')) dato.t = opt('tiempo');
if (opt('verbo')) dato.v = opt('verbo');
if (opt('persona')) dato.n = +opt('persona');
if (opt('nota')) dato.nota = opt('nota');
if (exps.length) dato.e = Object.fromEntries(exps.map(x => { const i = x.indexOf('='); return [x.slice(0, i), x.slice(i + 1)]; }));
const it = { palabra, cat, form, segs, tiempo: dato.t, verbo: dato.v, persona: dato.n, nota: dato.nota || '' };
const enBase = M.ITEMS.find(x => M.sinTilde(x.palabra) === M.sinTilde(palabra));
if (enBase && enBase.segs.map(s => s.join('/')).join(' ') !== dato.s) console.log(`AVISO: «${palabra}» está en la base con otro análisis: ${muestra(enBase)}`);
console.log(`VÁLIDO: ${palabra} · ${M.CATS[cat] || cat} · ${form}`);
console.log('Análisis: ' + muestra(it));
it.segs.forEach((_, i) => console.log(`  ${i}. ${(dato.e && dato.e[i]) || M.explicarMorfema(it, i)}`));
console.log('Formación: ' + M.porQueFormacion(it));
console.log('Redacción modelo: ' + M.redaccionModelo(it));
const e = enlace('d=' + encodeURIComponent(JSON.stringify(dato)));
console.log(`\nLección: ${e.web}\nLocal:   ${e.local}`);
