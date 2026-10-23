// Comprobaciones de la base de morfemas: node pruebas-morfemas.js [--lista]
const M = require('./morfemas-datos.js');
let errores = 0;
const mal = (it, msg) => { errores++; console.log(`✗ ${it.palabra}: ${msg}`); };
const FORMAS = ['simple', 'derivada', 'compuesta', 'parasintética'];
const FLEX = ['G', 'N', 'V', 'T', 'X', 'R', 'E', 'D'];

for (const it of M.ITEMS) {
  const unido = it.segs.map(s => s[0]).join('');
  if (unido !== it.palabra) mal(it, `los segmentos forman «${unido}»`);
  if (it.palabra !== it.palabra.normalize('NFC')) mal(it, 'no está en NFC');
  if (!M.CATS[it.cat]) mal(it, 'categoría desconocida ' + it.cat);
  if (!FORMAS.includes(it.form)) mal(it, 'formación desconocida ' + it.form);
  for (const [s, t] of it.segs) { if (!M.TIPOS[t]) mal(it, `tipo desconocido ${t}`); if (!s) mal(it, 'segmento vacío'); }
  const tipos = it.segs.map(s => s[1]);
  const nL = tipos.filter(t => t === 'L').length;
  const deriv = tipos.some(t => ['P', 'S', 'A', 'I'].includes(t));
  // coherencia entre el análisis y el tipo de formación
  if (it.form === 'simple' && (nL !== 1 || deriv)) mal(it, 'simple con más de un lexema o con afijos');
  if (it.form === 'derivada' && (nL !== 1 || !deriv)) mal(it, 'derivada sin afijo derivativo o con varios lexemas');
  if (it.form === 'compuesta' && nL < 2) mal(it, 'compuesta con un solo lexema');
  if (it.form === 'parasintética' && !(nL >= 2 && tipos.includes('S')) && !(tipos.includes('P') && (tipos.includes('S') || tipos.includes('V')))) mal(it, 'parasintética sin la combinación esperada');
  // los morfemas flexivos van al final, salvo en compuestos (sac‑a‑corch‑o‑s), ‑mente y verbos derivados
  if (tipos[0] !== 'L' && tipos[0] !== 'P') mal(it, 'no empieza por lexema ni prefijo');
  if (tipos.at(-1) === 'P' || tipos.at(-1) === 'I') mal(it, 'acaba en prefijo o interfijo');
  if (tipos.includes('N') && tipos.indexOf('N') !== tipos.length - 1) mal(it, 'el número no es el último morfema');
  // cada alternativa debe reconstruir la palabra
  for (const a of it.alts) if (a.includes('-') && a.replace(/-/g, '') !== it.palabra) mal(it, `alternativa «${a}» no forma la palabra`);
  const acc = M.aceptadas(it);
  if (!acc.length) mal(it, 'sin segmentaciones aceptadas');
}

const unicas = new Map();
for (const it of M.ITEMS) if (!unicas.has(it.palabra)) unicas.set(it.palabra, it);
const porCat = {}, porForm = {};
for (const it of unicas.values()) { porCat[it.cat] = (porCat[it.cat] || 0) + 1; porForm[it.form] = (porForm[it.form] || 0) + 1; }
// palabras repetidas con análisis distinto
const vistos = {};
for (const it of M.ITEMS) {
  const k = it.segs.map(s => s.join('/')).join(' ');
  if (vistos[it.palabra] && vistos[it.palabra] !== k) mal(it, `dos análisis distintos: ${vistos[it.palabra]}  ≠  ${k}`);
  vistos[it.palabra] = k;
}

// casos que el corrector debe aceptar o rechazar
const caso = (palabra, resp, esperado) => {
  const it = unicas.get(palabra);
  const r = M.fronteras(resp.split('-')).join(',');
  const ok = M.aceptadas(it).some(s => s.join(',') === r);
  if (ok !== esperado) { errores++; console.log(`✗ corrector: ${resp} → ${ok ? 'aceptada' : 'rechazada'} (debía ${esperado ? 'aceptarse' : 'rechazarse'})`); }
};
caso('zapatero', 'zapat-er-o', true); caso('zapatero', 'zapat-ero', true); caso('zapatero', 'zapa-tero', false); caso('zapatero', 'zapatero', false);
caso('panadero', 'pan-ad-er-o', true); caso('panadero', 'pan-ader-o', true); caso('panadero', 'pa-nadero', false);
caso('lavadora', 'lav-a-dor-a', true); caso('lavadora', 'lav-ador-a', true); caso('lavadora', 'lava-dor-a', false);
caso('rápidamente', 'rápid-a-mente', true); caso('rápidamente', 'rápida-mente', false); caso('rápidamente', 'rápid-amente', false);
caso('cantábamos', 'cant-á-ba-mos', true); caso('cantábamos', 'cant-aba-mos', false);
caso('comíamos', 'com-í-a-mos', true); caso('comíamos', 'com-ía-mos', true);
caso('cantaríamos', 'cant-a-ría-mos', true); caso('cantaríamos', 'cant-a-r-ía-mos', true); caso('cantaríamos', 'canta-ría-mos', false);
caso('niñas', 'niñ-a-s', true); caso('niñas', 'niña-s', false);
caso('casas', 'cas-a-s', true); caso('sacacorchos', 'sac-a-corch-o-s', true); caso('sacacorchos', 'saca-corchos', false);
caso('enrojecer', 'en-roj-ec-e-r', true); caso('enrojecer', 'en-rojec-e-r', false);
caso('blanquear', 'blanqu-ea-r', true); caso('organización', 'organ-iz-ación', true); caso('organización', 'organiz-a-ción', false);

console.log(`\n${M.ITEMS.length} entradas, ${unicas.size} palabras distintas`, porCat, porForm);
console.log(errores ? `${errores} problemas` : 'Sin problemas');

if (process.argv.includes('--lista')) {
  for (const it of unicas.values()) if (!it.tiempo || it.persona <= 0)
    console.log(`${it.cat}\t${it.form}\t${it.segs.map(s => s[0]).join('-')}\t${it.segs.map(s => s[1]).join(' ')}\t[${M.aceptadas(it).map(f => M.formatear(it.palabra, f)).join(' | ')}]`);
}
caso('cantado', 'cant-a-d-o', true); caso('cantado', 'cant-ad-o', true); caso('cantando', 'cant-ando', true); caso('bienvenido', 'bien-ven-id-o', true);
console.log(errores ? `${errores} problemas tras los casos extra` : 'Casos extra correctos');
