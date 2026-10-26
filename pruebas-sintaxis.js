// Comprobaciones del banco de oraciones de sintaxis: node pruebas-sintaxis.js
const S = require('./sintaxis-datos.js');
let errores = 0;
const mal = (o, msg) => { errores++; console.log(`✗ ${o.texto}: ${msg}`); };
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const PERSONAS = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas', 'usted', 'ustedes'];
const vistas = new Set();

for (const o of S.ORACIONES) {
  if (vistas.has(o.texto)) mal(o, 'oración repetida'); vistas.add(o.texto);
  if (!S.MODALIDAD[o.mod]) mal(o, `modalidad desconocida ${o.mod}`);
  if (!S.ESTRUCTURA[o.est]) mal(o, `estructura desconocida ${o.est}`);
  if (!/[.!?]$/.test(o.texto)) mal(o, 'no acaba en signo de puntuación');
  if (['IT', 'IP'].includes(o.mod) !== o.texto.startsWith('¿')) mal(o, 'interrogativa sin ¿ o ¿ sin interrogativa');
  if (o.mod === 'EX' && !o.texto.startsWith('¡')) mal(o, 'exclamativa sin ¡');
  if (o.mod === 'EN' && !/\b(no|nunca|nadie|ni|jamás|nada)\b/i.test(o.texto)) mal(o, 'negativa sin palabra negativa');
  if ((o.est === 'S') !== (o.props.length === 1)) mal(o, 'simple con varias proposiciones o compuesta con una');
  if (['CC', 'CD', 'CA'].includes(o.est) && !norm(o.texto).includes(norm(o.nexo.split('…')[0]).trim())) mal(o, `el nexo «${o.nexo}» no está en la oración`);
  if (o.est === 'Y' && o.nexo) mal(o, 'una yuxtapuesta no tiene nexo');
  for (const p of o.props) {
    const t = norm(o.texto);
    if (!S.SUJETO[p.suj]) mal(o, `sujeto desconocido ${p.suj}`);
    if (!S.PREDICADO[p.pred]) mal(o, `predicado desconocido ${p.pred}`);
    if (!S.DIATESIS[p.diat]) mal(o, `diátesis desconocida ${p.diat}`);
    if (!S.MODO[p.modo]) mal(o, `modo desconocido ${p.modo}`);
    if (!t.includes(norm(p.verbo))) mal(o, `el verbo «${p.verbo}» no está en la oración`);
    if (!t.includes(norm(p.texto))) mal(o, `la proposición «${p.texto}» no está en la oración`);
    if (!norm(p.texto).includes(norm(p.verbo))) mal(o, `el verbo «${p.verbo}» no está en su proposición`);
    if (p.suj === 'E' && !norm(p.texto).includes(norm(p.sujTxt))) mal(o, `el sujeto «${p.sujTxt}» no está en la proposición`);
    if (p.suj === 'O' && !PERSONAS.includes(p.sujTxt)) mal(o, `persona omitida rara «${p.sujTxt}»`);
    if (['C', 'SC', 'PT'].includes(p.pred) && !p.predTxt) mal(o, 'falta el atributo, el C. predicativo o el CD');
    if (p.predTxt && !norm(o.texto).includes(norm(p.predTxt))) mal(o, `«${p.predTxt}» no está en la oración`);
    // coherencia entre predicado, diátesis y sujeto
    if ((p.pred === 'PP') !== (p.diat !== 'A')) mal(o, 'pasiva sin predicado pasivo o al revés');
    if (p.diat === 'PF' && !/^(fue|fueron|fuimos|será|serán|ha sido|han sido|es|son|era|eran)\s\S+(ado|ido|ada|ida|ados|idos|adas|idas|cho|to|ta|tos|tas)$/.test(p.verbo)) mal(o, 'pasiva perifrástica sin ser + participio');
    if (p.diat === 'PR' && (!p.verbo.startsWith('se ') || p.suj !== 'E')) mal(o, 'pasiva refleja sin «se» o sin sujeto paciente');
    if (p.suj === 'IR' && (!p.verbo.startsWith('se ') || /n$/.test(p.verbo) || p.diat !== 'A')) mal(o, 'impersonal refleja: se + 3.ª singular, en activa');
    if (p.suj === 'I3' && !/n$/.test(p.verbo.split(' ')[0])) mal(o, 'impersonal de 3.ª plural sin verbo en plural');
    if (p.suj === 'IA' && !/(llov|lluev|nev|niev|amanec|tron|truen)/.test(norm(p.verbo))) mal(o, 'atmosférica sin verbo de fenómeno natural');
    if (p.suj === 'IG' && !/^(hay|habia|hubo|hace|es|era)$/.test(norm(p.verbo))) mal(o, 'gramaticalizada sin haber, hacer o ser');
    if (p.pred === 'C' && !/^(es|son|soy|eres|somos|sois|era|eran|fue|fueron|está|están|estás|estoy|estaba|estaban|parece|parecen|pareces)$/.test(p.verbo)) mal(o, 'copulativa sin ser, estar o parecer');
    if (p.modo === 'm' && o.mod !== 'EH') mal(o, 'imperativo fuera de una exhortativa');
    if (p.modo === 's' && !['EH', 'DS', 'DB'].includes(o.mod)) mal(o, 'subjuntivo en una oración independiente que no es exhortativa, desiderativa ni dubitativa');
  }
  const c = S.correccion(o);
  if (c.lineas.length !== 2 + 4 * o.props.length) mal(o, 'faltan líneas de corrección');
  if (/undefined|NaN/.test(JSON.stringify(c))) mal(o, 'corrección con huecos');
}

const cuenta = k => S.ORACIONES.reduce((m, o) => { for (const v of (k === 'est' || k === 'mod' ? [o[k]] : o.props.map(p => p[k]))) m[v] = (m[v] || 0) + 1; return m; }, {});
console.log(`${S.ORACIONES.length} oraciones`, cuenta('est'), cuenta('suj'), cuenta('pred'), cuenta('diat'), cuenta('mod'));
console.log(errores ? `${errores} problemas` : 'Sin problemas');
