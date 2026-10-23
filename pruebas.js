// Pruebas del motor: node pruebas.js
const M = require('./motor.js');
let fallos = 0, total = 0;
function ok(inf, tid, p, esperado) {
  total++;
  const f = M.formas(inf, tid, p);
  const exp = Array.isArray(esperado) ? esperado : [esperado];
  if (JSON.stringify(f) !== JSON.stringify(exp)) { fallos++; console.log(`✗ ${inf} ${tid} p${p}: ${f.join('/')}  ≠  ${exp.join('/')}`); }
}
const fila = (inf, tid, s) => s.split(' ').forEach((f, i) => f !== '-' && ok(inf, tid, i, f));

// Regulares y ortográficos
fila('cantar', 'ind_pres', 'canto cantas canta cantamos cantáis cantan');
fila('cantar', 'ind_indef', 'canté cantaste cantó cantamos cantasteis cantaron');
fila('comer', 'ind_impf', 'comía comías comía comíamos comíais comían');
fila('vivir', 'ind_pres', 'vivo vives vive vivimos vivís viven');
fila('buscar', 'ind_indef', 'busqué buscaste buscó buscamos buscasteis buscaron');
fila('buscar', 'sub_pres', 'busque busques busque busquemos busquéis busquen');
fila('llegar', 'sub_pres', 'llegue llegues llegue lleguemos lleguéis lleguen');
fila('averiguar', 'sub_pres', 'averigüe averigües averigüe averigüemos averigüéis averigüen');
fila('cazar', 'ind_indef', 'cacé cazaste cazó cazamos cazasteis cazaron');
fila('vencer', 'ind_pres', 'venzo vences vence vencemos vencéis vencen');
fila('coger', 'sub_pres', 'coja cojas coja cojamos cojáis cojan');
fila('distinguir', 'ind_pres', 'distingo distingues distingue distinguimos distinguís distinguen');
fila('leer', 'ind_indef', 'leí leíste leyó leímos leísteis leyeron');
ok('leer', 'ind_pps', 0, 'he leído');
fila('construir', 'ind_pres', 'construyo construyes construye construimos construís construyen');
fila('construir', 'ind_indef', 'construí construiste construyó construimos construisteis construyeron');
ok('construir', 'ind_pps', 2, 'ha construido');
fila('gruñir', 'ind_indef', 'gruñí gruñiste gruñó gruñimos gruñisteis gruñeron');
ok('cantar', 'sub_impf', 3, ['cantáramos', 'cantásemos']);
ok('comer', 'sub_fut', 3, 'comiéremos');
fila('cantar', 'imp', '- canta cante cantemos cantad canten');
fila('conocer', 'ind_pres', 'conozco conoces conoce conocemos conocéis conocen');
fila('conducir', 'ind_indef', 'conduje condujiste condujo condujimos condujisteis condujeron');
ok('conducir', 'sub_impf', 0, ['condujera', 'condujese']);
// Cambio de raíz
fila('pensar', 'ind_pres', 'pienso piensas piensa pensamos pensáis piensan');
fila('empezar', 'sub_pres', 'empiece empieces empiece empecemos empecéis empiecen');
fila('contar', 'imp', '- cuenta cuente contemos contad cuenten');
fila('jugar', 'sub_pres', 'juegue juegues juegue juguemos juguéis jueguen');
fila('oler', 'ind_pres', 'huelo hueles huele olemos oléis huelen');
fila('avergonzar', 'ind_pres', 'avergüenzo avergüenzas avergüenza avergonzamos avergonzáis avergüenzan');
fila('cocer', 'ind_pres', 'cuezo cueces cuece cocemos cocéis cuecen');
fila('sentir', 'ind_indef', 'sentí sentiste sintió sentimos sentisteis sintieron');
fila('sentir', 'sub_pres', 'sienta sientas sienta sintamos sintáis sientan');
fila('dormir', 'sub_pres', 'duerma duermas duerma durmamos durmáis duerman');
ok('morir', 'ind_pps', 2, 'ha muerto');
fila('pedir', 'ind_pres', 'pido pides pide pedimos pedís piden');
fila('seguir', 'ind_pres', 'sigo sigues sigue seguimos seguís siguen');
fila('elegir', 'ind_pres', 'elijo eliges elige elegimos elegís eligen');
fila('reñir', 'ind_indef', 'reñí reñiste riñó reñimos reñisteis riñeron');
fila('adquirir', 'ind_pres', 'adquiero adquieres adquiere adquirimos adquirís adquieren');
ok('volver', 'ind_pps', 0, 'he vuelto');
ok('resolver', 'sub_pp', 0, 'haya resuelto');
// Acentuales
fila('enviar', 'ind_pres', 'envío envías envía enviamos enviáis envían');
fila('actuar', 'sub_pres', 'actúe actúes actúe actuemos actuéis actúen');
fila('reunir', 'ind_pres', 'reúno reúnes reúne reunimos reunís reúnen');
fila('prohibir', 'imp', '- prohíbe prohíba prohibamos prohibid prohíban');
fila('enraizar', 'sub_pres', 'enraíce enraíces enraíce enraicemos enraicéis enraícen');
// Irregulares
fila('ser', 'ind_indef', 'fui fuiste fue fuimos fuisteis fueron');
fila('ir', 'imp', '- ve vaya vamos id vayan');
fila('ir', 'sub_impf', '- - - - - -'); ok('ir', 'sub_impf', 3, ['fuéramos', 'fuésemos']);
fila('tener', 'ind_pres', 'tengo tienes tiene tenemos tenéis tienen');
fila('tener', 'ind_indef', 'tuve tuviste tuvo tuvimos tuvisteis tuvieron');
fila('tener', 'imp', '- ten tenga tengamos tened tengan');
fila('venir', 'ind_indef', 'vine viniste vino vinimos vinisteis vinieron');
fila('decir', 'ind_pres', 'digo dices dice decimos decís dicen');
fila('decir', 'ind_indef', 'dije dijiste dijo dijimos dijisteis dijeron');
fila('decir', 'ind_fut', 'diré dirás dirá diremos diréis dirán');
fila('hacer', 'ind_indef', 'hice hiciste hizo hicimos hicisteis hicieron');
ok('hacer', 'ind_pps', 0, 'he hecho');
fila('traer', 'ind_indef', 'traje trajiste trajo trajimos trajisteis trajeron');
fila('caer', 'ind_indef', 'caí caíste cayó caímos caísteis cayeron');
fila('caer', 'sub_pres', 'caiga caigas caiga caigamos caigáis caigan');
fila('oír', 'ind_indef', 'oí oíste oyó oímos oísteis oyeron');
fila('oír', 'imp', '- oye oiga oigamos oíd oigan');
fila('oír', 'ind_fut', 'oiré oirás oirá oiremos oiréis oirán');
fila('saber', 'sub_pres', 'sepa sepas sepa sepamos sepáis sepan');
fila('dar', 'ind_indef', 'di diste dio dimos disteis dieron');
fila('ver', 'ind_impf', 'veía veías veía veíamos veíais veían');
fila('estar', 'ind_indef', 'estuve estuviste estuvo estuvimos estuvisteis estuvieron');
fila('querer', 'ind_fut', 'querré querrás querrá querremos querréis querrán');
fila('poder', 'ind_pres', 'puedo puedes puede podemos podéis pueden');
fila('reír', 'ind_indef', 'reí reíste rio reímos reísteis rieron');
fila('bendecir', 'ind_fut', 'bendeciré bendecirás bendecirá bendeciremos bendeciréis bendecirán');
ok('bendecir', 'ind_pps', 0, 'he bendecido');
fila('satisfacer', 'ind_indef', 'satisfice satisficiste satisfizo satisficimos satisficisteis satisficieron');
// Derivados
fila('componer', 'imp', '- compón componga compongamos componed compongan');
fila('obtener', 'ind_pres', 'obtengo obtienes obtiene obtenemos obtenéis obtienen');
fila('prever', 'ind_pres', 'preveo prevés prevé prevemos prevéis prevén');
fila('prever', 'ind_indef', 'preví previste previó previmos previsteis previeron');
fila('sonreír', 'ind_indef', 'sonreí sonreíste sonrió sonreímos sonreísteis sonrieron');
fila('sonreír', 'sub_pres', 'sonría sonrías sonría sonriamos sonriáis sonrían');
fila('freír', 'ind_indef', 'freí freíste frio freímos freísteis frieron');
ok('freír', 'ind_pps', 0, 'he frito');
fila('predecir', 'imp', '- predice prediga predigamos predecid predigan');
fila('deshacer', 'imp', '- deshaz deshaga deshagamos deshaced deshagan');
fila('prevenir', 'imp', '- prevén prevenga prevengamos prevenid prevengan');
fila('atraer', 'ind_pres', 'atraigo atraes atrae atraemos atraéis atraen');
// Compuestos
ok('cantar', 'ind_ant', 3, 'hubimos cantado');
ok('cantar', 'sub_plusc', 3, ['hubiéramos cantado', 'hubiésemos cantado']);
ok('cantar', 'sub_futc', 0, 'hubiere cantado');
ok('cantar', 'ind_condc', 4, 'habríais cantado');

console.log(`\n${total - fallos}/${total} correctas`);

// Sanidad de la base
const listas = ['reg', 'ie', 'ue', 'jug', 'i', 'iie', 'acc', 'zc'];
const vistos = {};
for (const l of listas) for (const v of M.LISTAS[l].split(/\s+/).filter(Boolean)) {
  if (vistos[v] && vistos[v] !== l) console.log(`Duplicado en dos listas: ${v} (${vistos[v]}, ${l})`);
  vistos[v] = l;
  if (!/(ar|er|ir|ír)$/.test(v)) console.log('No es infinitivo: ' + v);
}
for (const v of Object.keys(M.DER)) if (vistos[v]) console.log(`Derivado también en lista: ${v}`);
const raros = M.VERBOS.filter(v => { try { M.conjugar(v); return false; } catch (e) { console.log(v, e.message); return true; } });
const porTipo = {};
for (const v of M.VERBOS) porTipo[M.tipo(v)] = (porTipo[M.tipo(v)] || 0) + 1;
console.log('Verbos en total:', M.VERBOS.length, porTipo, 'errores al conjugar:', raros.length);
