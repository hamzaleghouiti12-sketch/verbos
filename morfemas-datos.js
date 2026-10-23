// Base de palabras analizadas en morfemas (nivel 2.º de Bachillerato).
// Cada línea: palabra | categoría | formación | morfemas (segmento/TIPO) | alternativas aceptadas | nota
// Tipos: L lexema · P prefijo · S sufijo · A sufijo apreciativo · I interfijo · G género · N número
//        V vocal temática · T tiempo-aspecto-modo · X número-persona · R infinitivo · E gerundio · D participio
(function (global) {
  'use strict';

  const TIPOS = {
    L: 'lexema', P: 'prefijo', S: 'sufijo', A: 'sufijo apreciativo', I: 'interfijo',
    G: 'morfema de género', N: 'morfema de número', V: 'vocal temática',
    T: 'tiempo, aspecto y modo', X: 'número y persona', R: 'morfema de infinitivo',
    E: 'morfema de gerundio', D: 'morfema de participio'
  };
  const CATS = { sus: 'sustantivo', adj: 'adjetivo', ver: 'verbo', adv: 'adverbio' };
  const NOTA_V = 'La vocal final sin variación de género se analiza como vocal temática (algunos manuales la llaman morfema de género).';
  const NOTA_MENTE = 'Los adverbios en ‑mente se analizan como derivados (adjetivo en femenino + sufijo ‑mente); algunos manuales los consideran compuestos.';
  const NOTA_PARA = 'Parasintética: el prefijo y el sufijo (o la composición y la derivación) se añaden a la vez; no existe la palabra solo con uno de ellos.';

  const DATOS = `
niñas|sus|simple|niñ/L a/G s/N
gatos|sus|simple|gat/L o/G s/N
hijos|sus|simple|hij/L o/G s/N
perras|sus|simple|perr/L a/G s/N
amigas|sus|simple|amig/L a/G s/N
casas|sus|simple|cas/L a/V s/N
libros|sus|simple|libr/L o/V s/N
mesas|sus|simple|mes/L a/V s/N
coches|sus|simple|coch/L e/V s/N
árboles|sus|simple|árbol/L es/N
leones|sus|simple|leon/L es/N
paredes|sus|simple|pared/L es/N
zapatero|sus|derivada|zapat/L er/S o/G
zapatería|sus|derivada|zapat/L er/S ía/S
librero|sus|derivada|libr/L er/S o/G
librería|sus|derivada|libr/L er/S ía/S
jardinero|sus|derivada|jardin/L er/S o/G
carnicero|sus|derivada|carn/L ic/I er/S o/G
panadero|sus|derivada|pan/L ad/I er/S o/G
panadería|sus|derivada|pan/L ad/I er/S ía/S
frutero|sus|derivada|frut/L er/S o/G
frutería|sus|derivada|frut/L er/S ía/S
lechero|sus|derivada|lech/L er/S o/G
cartero|sus|derivada|cart/L er/S o/G
basurero|sus|derivada|basur/L er/S o/G
relojero|sus|derivada|reloj/L er/S o/G
cocinero|sus|derivada|cocin/L er/S o/G
camionero|sus|derivada|camion/L er/S o/G
florero|sus|derivada|flor/L er/S o/V
salero|sus|derivada|sal/L er/S o/V
azucarero|sus|derivada|azucar/L er/S o/V
llavero|sus|derivada|llav/L er/S o/V
monedero|sus|derivada|moned/L er/S o/V
hormiguero|sus|derivada|hormigu/L er/S o/V
enfermería|sus|derivada|enferm/L er/S ía/S
organización|sus|derivada|organ/L iz/S a/V ción/S
alimentación|sus|derivada|aliment/L a/V ción/S
lavadora|sus|derivada|lav/L a/V dor/S a/G
nadador|sus|derivada|nad/L a/V dor/S
jugador|sus|derivada|jug/L a/V dor/S
comedor|sus|derivada|com/L e/V dor/S
vendedor|sus|derivada|vend/L e/V dor/S
corredor|sus|derivada|corr/L e/V dor/S
cantante|sus|derivada|cant/L a/V nte/S
estudiante|sus|derivada|estudi/L a/V nte/S
dibujante|sus|derivada|dibuj/L a/V nte/S
hablante|sus|derivada|habl/L a/V nte/S
lavadero|sus|derivada|lav/L a/V der/S o/V
enseñanza|sus|derivada|enseñ/L a/V nz/S a/V
esperanza|sus|derivada|esper/L a/V nz/S a/V
venganza|sus|derivada|veng/L a/V nz/S a/V
pintura|sus|derivada|pint/L ur/S a/V
belleza|sus|derivada|bell/L ez/S a/V
tristeza|sus|derivada|trist/L ez/S a/V
pobreza|sus|derivada|pobr/L ez/S a/V
maldad|sus|derivada|mal/L dad/S
crueldad|sus|derivada|cruel/L dad/S
hermandad|sus|derivada|herman/L dad/S
igualdad|sus|derivada|igual/L dad/S
cobardía|sus|derivada|cobard/L ía/S
alegría|sus|derivada|alegr/L ía/S
valentía|sus|derivada|valent/L ía/S
casita|sus|derivada|cas/L it/A a/V
perrito|sus|derivada|perr/L it/A o/G
librito|sus|derivada|libr/L it/A o/V
cochazo|sus|derivada|coch/L az/A o/V
casucha|sus|derivada|cas/L uch/A a/V
pececillo|sus|derivada|pec/L ec/I ill/A o/V
panecillo|sus|derivada|pan/L ec/I ill/A o/V
lucecita|sus|derivada|luc/L ec/I it/A a/V
nubecita|sus|derivada|nub/L ec/I it/A a/V
hombrecillo|sus|derivada|hombr/L ec/I ill/A o/V
solecito|sus|derivada|sol/L ec/I it/A o/V
cochecito|sus|derivada|coch/L ec/I it/A o/V
cabezazo|sus|derivada|cabez/L az/S o/V
codazo|sus|derivada|cod/L az/S o/V
naranjal|sus|derivada|naranj/L al/S
olivar|sus|derivada|oliv/L ar/S
pinar|sus|derivada|pin/L ar/S
arboleda|sus|derivada|arbol/L ed/S a/V
dentista|sus|derivada|dent/L ist/S a/V
pianista|sus|derivada|pian/L ist/S a/V
artista|sus|derivada|art/L ist/S a/V
periodista|sus|derivada|period/L ist/S a/V
subsuelo|sus|derivada|sub/P suel/L o/V
antebrazo|sus|derivada|ante/P braz/L o/V
exnovio|sus|derivada|ex/P novi/L o/G
superhombre|sus|derivada|super/P hombr/L e/V
minifalda|sus|derivada|mini/P fald/L a/V
bisabuelo|sus|derivada|bis/P abuel/L o/G
prehistoria|sus|derivada|pre/P histori/L a/V
posguerra|sus|derivada|pos/P guerr/L a/V
desorden|sus|derivada|des/P orden/L
desamor|sus|derivada|des/P amor/L
sacacorchos|sus|compuesta|sac/L a/V corch/L o/V s/N
abrelatas|sus|compuesta|abr/L e/V lat/L a/V s/N
lavaplatos|sus|compuesta|lav/L a/V plat/L o/V s/N
rascacielos|sus|compuesta|rasc/L a/V ciel/L o/V s/N
cortaúñas|sus|compuesta|cort/L a/V úñ/L a/V s/N
cumpleaños|sus|compuesta|cumpl/L e/V añ/L o/V s/N
pasatiempo|sus|compuesta|pas/L a/V tiemp/L o/V
matamoscas|sus|compuesta|mat/L a/V mosc/L a/V s/N
salvavidas|sus|compuesta|salv/L a/V vid/L a/V s/N
guardaespaldas|sus|compuesta|guard/L a/V espald/L a/V s/N
parabrisas|sus|compuesta|par/L a/V bris/L a/V s/N
aguafiestas|sus|compuesta|agu/L a/V fiest/L a/V s/N
girasol|sus|compuesta|gir/L a/V sol/L
bocacalle|sus|compuesta|boc/L a/V call/L e/V
bocamanga|sus|compuesta|boc/L a/V mang/L a/V
hierbabuena|sus|compuesta|hierb/L a/V buen/L a/G
baloncesto|sus|compuesta|balon/L cest/L o/V
coliflor|sus|compuesta|col/L i/I flor/L
picapedrero|sus|parasintética|pic/L a/V pedr/L er/S o/G
ropavejero|sus|parasintética|rop/L a/V vej/L er/S o/G
quinceañero|sus|parasintética|quinc/L e/V añ/L er/S o/G
sietemesino|sus|parasintética|siet/L e/V mes/L in/S o/G
altas|adj|simple|alt/L a/G s/N
bonitos|adj|simple|bonit/L o/G s/N
rojas|adj|simple|roj/L a/G s/N
negras|adj|simple|negr/L a/G s/N
pequeña|adj|simple|pequeñ/L a/G
verdes|adj|simple|verd/L e/V s/N
grandes|adj|simple|grand/L e/V s/N
fáciles|adj|simple|fácil/L es/N
azules|adj|simple|azul/L es/N
felices|adj|simple|felic/L es/N
rojizo|adj|derivada|roj/L iz/S o/G
amarillento|adj|derivada|amarill/L ent/S o/G
verdoso|adj|derivada|verd/L os/S o/G
blanquecino|adj|derivada|blanqu/L ec/I in/S o/G
grisáceo|adj|derivada|gris/L áce/S o/G
azulado|adj|derivada|azul/L ad/S o/G
lluvioso|adj|derivada|lluvi/L os/S o/G
arenoso|adj|derivada|aren/L os/S o/G
cariñoso|adj|derivada|cariñ/L os/S o/G
peligroso|adj|derivada|peligr/L os/S o/G
miedoso|adj|derivada|mied/L os/S o/G
famoso|adj|derivada|fam/L os/S o/G
salado|adj|derivada|sal/L ad/S o/G
barbudo|adj|derivada|barb/L ud/S o/G
orejudo|adj|derivada|orej/L ud/S o/G
amable|adj|derivada|am/L a/V ble/S
lavable|adj|derivada|lav/L a/V ble/S
pensativo|adj|derivada|pens/L a/V tiv/S o/G
llamativo|adj|derivada|llam/L a/V tiv/S o/G
musical|adj|derivada|music/L al/S
invernal|adj|derivada|invern/L al/S
primaveral|adj|derivada|primaver/L al/S
teatral|adj|derivada|teatr/L al/S
cultural|adj|derivada|cultur/L al/S
nacional|adj|derivada|nacion/L al/S
veraniego|adj|derivada|veran/L ieg/S o/G
infantil|adj|derivada|infant/L il/S
lunar|adj|derivada|lun/L ar/S
solar|adj|derivada|sol/L ar/S
escolar|adj|derivada|escol/L ar/S
familiar|adj|derivada|famili/L ar/S
grandote|adj|derivada|grand/L ot/A e/V
pequeñito|adj|derivada|pequeñ/L it/A o/G
viejecito|adj|derivada|viej/L ec/I it/A o/G
guapísimo|adj|derivada|guap/L ísim/A o/G|||‑ísimo es el sufijo del grado superlativo; algunos manuales lo tratan como morfema flexivo de grado.
altísimo|adj|derivada|alt/L ísim/A o/G|||‑ísimo es el sufijo del grado superlativo; algunos manuales lo tratan como morfema flexivo de grado.
facilísimo|adj|derivada|facil/L ísim/A o/G|||‑ísimo es el sufijo del grado superlativo; algunos manuales lo tratan como morfema flexivo de grado.
cabezón|adj|derivada|cabez/L ón/A
infeliz|adj|derivada|in/P feliz/L
inútil|adj|derivada|in/P útil/L
irreal|adj|derivada|ir/P real/L
deshonesto|adj|derivada|des/P honest/L o/G
descontento|adj|derivada|des/P content/L o/G
desagradable|adj|derivada|des/P agrad/L a/V ble/S
inmortal|adj|derivada|in/P mort/L al/S
anormal|adj|derivada|a/P norm/L al/S
prenatal|adj|derivada|pre/P nat/L al/S
submarino|adj|derivada|sub/P mar/L in/S o/G
subterráneo|adj|parasintética|sub/P terr/L áne/S o/G
desalmado|adj|parasintética|des/P alm/L ad/S o/G
anaranjado|adj|parasintética|a/P naranj/L ad/S o/G
aterciopelado|adj|parasintética|a/P terciopel/L ad/S o/G
pelirrojo|adj|compuesta|pel/L i/I rroj/L o/G
agridulce|adj|compuesta|agr/L i/I dulc/L e/V
boquiabierto|adj|compuesta|boqu/L i/I abiert/L o/G
cejijunto|adj|compuesta|cej/L i/I junt/L o/G
patilargo|adj|compuesta|pat/L i/I larg/L o/G
ojiverde|adj|compuesta|oj/L i/I verd/L e/V
sordomudo|adj|compuesta|sord/L o/I mud/L o/G
hispanohablante|adj|compuesta|hispan/L o/I habl/L a/V nte/S
bienvenido|adj|compuesta|bien/L ven/L i/V d/D o/G|bien-ven-id-o
rápidamente|adv|derivada|rápid/L a/G mente/S
lentamente|adv|derivada|lent/L a/G mente/S
tranquilamente|adv|derivada|tranquil/L a/G mente/S
claramente|adv|derivada|clar/L a/G mente/S
sinceramente|adv|derivada|sincer/L a/G mente/S
seriamente|adv|derivada|seri/L a/G mente/S
cómodamente|adv|derivada|cómod/L a/G mente/S
ciertamente|adv|derivada|ciert/L a/G mente/S
locamente|adv|derivada|loc/L a/G mente/S
duramente|adv|derivada|dur/L a/G mente/S
amargamente|adv|derivada|amarg/L a/G mente/S
profundamente|adv|derivada|profund/L a/G mente/S
felizmente|adv|derivada|feliz/L mente/S
fácilmente|adv|derivada|fácil/L mente/S
alegremente|adv|derivada|alegr/L e/V mente/S
suavemente|adv|derivada|suav/L e/V mente/S
dulcemente|adv|derivada|dulc/L e/V mente/S
tristemente|adv|derivada|trist/L e/V mente/S
libremente|adv|derivada|libr/L e/V mente/S
amablemente|adv|derivada|am/L a/V ble/S mente/S
cariñosamente|adv|derivada|cariñ/L os/S a/G mente/S
peligrosamente|adv|derivada|peligr/L os/S a/G mente/S
silenciosamente|adv|derivada|silenci/L os/S a/G mente/S
normalmente|adv|derivada|norm/L al/S mente/S
naturalmente|adv|derivada|natur/L al/S mente/S
finalmente|adv|derivada|fin/L al/S mente/S
cerquita|adv|derivada|cerqu/L it/A a/V
despacito|adv|derivada|despac/L it/A o/V
ahorita|adv|derivada|ahor/L it/A a/V
prontito|adv|derivada|pront/L it/A o/V
tempranito|adv|derivada|tempran/L it/A o/V
anteayer|adv|derivada|ante/P ayer/L
desordenar|ver|derivada|des/P orden/L a/V r/R
deshacer|ver|derivada|des/P hac/L e/V r/R
rehacer|ver|derivada|re/P hac/L e/V r/R
releer|ver|derivada|re/P le/L e/V r/R
descoser|ver|derivada|des/P cos/L e/V r/R
desatar|ver|derivada|des/P at/L a/V r/R
predecir|ver|derivada|pre/P dec/L i/V r/R
contradecir|ver|derivada|contra/P dec/L i/V r/R
sobrevolar|ver|derivada|sobre/P vol/L a/V r/R
subrayar|ver|derivada|sub/P ray/L a/V r/R
anteponer|ver|derivada|ante/P pon/L e/V r/R
prever|ver|derivada|pre/P v/L e/V r/R
malgastar|ver|compuesta|mal/L gast/L a/V r/R
maltratar|ver|compuesta|mal/L trat/L a/V r/R
menospreciar|ver|compuesta|menos/L preci/L a/V r/R
organizar|ver|derivada|organ/L iz/S a/V r/R
realizar|ver|derivada|real/L iz/S a/V r/R
modernizar|ver|derivada|modern/L iz/S a/V r/R
humanizar|ver|derivada|human/L iz/S a/V r/R
suavizar|ver|derivada|suav/L iz/S a/V r/R
simplificar|ver|derivada|simpl/L ific/S a/V r/R
clarificar|ver|derivada|clar/L ific/S a/V r/R
purificar|ver|derivada|pur/L ific/S a/V r/R
blanquear|ver|derivada|blanqu/L e/S a/V r/R|blanqu-ea-r
golpear|ver|derivada|golp/L e/S a/V r/R|golp-ea-r
tontear|ver|derivada|tont/L e/S a/V r/R|tont-ea-r
verdear|ver|derivada|verd/L e/S a/V r/R|verd-ea-r
dormitar|ver|derivada|dorm/L it/S a/V r/R
enrojecer|ver|parasintética|en/P roj/L ec/S e/V r/R
envejecer|ver|parasintética|en/P vej/L ec/S e/V r/R
entristecer|ver|parasintética|en/P trist/L ec/S e/V r/R
enriquecer|ver|parasintética|en/P riqu/L ec/S e/V r/R
empobrecer|ver|parasintética|em/P pobr/L ec/S e/V r/R
embellecer|ver|parasintética|em/P bell/L ec/S e/V r/R
enloquecer|ver|parasintética|en/P loqu/L ec/S e/V r/R
enflaquecer|ver|parasintética|en/P flaqu/L ec/S e/V r/R
endurecer|ver|parasintética|en/P dur/L ec/S e/V r/R
enmudecer|ver|parasintética|en/P mud/L ec/S e/V r/R
anochecer|ver|parasintética|a/P noch/L ec/S e/V r/R
aterrizar|ver|parasintética|a/P terr/L iz/S a/V r/R
alunizar|ver|parasintética|a/P lun/L iz/S a/V r/R
ensuciar|ver|parasintética|en/P suci/L a/V r/R
endulzar|ver|parasintética|en/P dulz/L a/V r/R
engordar|ver|parasintética|en/P gord/L a/V r/R
aclarar|ver|parasintética|a/P clar/L a/V r/R
embotellar|ver|parasintética|em/P botell/L a/V r/R
encarcelar|ver|parasintética|en/P carcel/L a/V r/R
enterrar|ver|parasintética|en/P terr/L a/V r/R
embarcar|ver|parasintética|em/P barc/L a/V r/R
enfriar|ver|parasintética|en/P fri/L a/V r/R
ablandar|ver|parasintética|a/P bland/L a/V r/R
acercar|ver|parasintética|a/P cerc/L a/V r/R
alejar|ver|parasintética|a/P lej/L a/V r/R
agrandar|ver|parasintética|a/P grand/L a/V r/R
abotonar|ver|parasintética|a/P boton/L a/V r/R
`;

  // ───────── Formas verbales generadas (verbos simples y regulares) ─────────
  // Solo tiempos con análisis estable en los manuales; se omiten el indefinido
  // y el futuro de subjuntivo, cuya segmentación varía mucho de un libro a otro.
  const VERBOS_SIMPLES = {
    ar: 'cantar hablar mirar saltar bailar nadar cenar lavar pintar tomar llorar ganar gastar pasar entrar trabajar amar cortar comprar mandar besar',
    er: 'comer beber temer correr vender meter deber coser barrer',
    ir: 'vivir subir partir sufrir unir cumplir'
  };
  const TIEMPOS_V = {
    inf: 'infinitivo', ger: 'gerundio', par: 'participio', pres: 'presente de indicativo', impf: 'pretérito imperfecto de indicativo',
    fut: 'futuro simple', cond: 'condicional simple', spres: 'presente de subjuntivo', sra: 'pretérito imperfecto de subjuntivo (‑ra)',
    sse: 'pretérito imperfecto de subjuntivo (‑se)'
  };
  const NP = ['', 's', '', 'mos', 'is', 'n'];
  const PERS = ['yo', 'tú', 'él / ella', 'nosotros', 'vosotros', 'ellos / ellas'];
  const AG = { a: 'á', e: 'é', i: 'í' };

  function formasVerbo(inf) {
    const conj = inf.slice(-2), L = inf.slice(0, -2), vt = conj[0];
    const out = [];
    const add = (tiempo, p, segs, alts = [], nota = '') => {
      segs = segs.filter(s => s[0] !== '');
      out.push({ palabra: segs.map(s => s[0]).join(''), cat: 'ver', form: 'simple', segs, alts, nota, verbo: inf, tiempo, persona: p });
    };
    add('inf', -1, [[L, 'L'], [vt, 'V'], ['r', 'R']]);
    if (conj === 'ar') add('ger', -1, [[L, 'L'], ['a', 'V'], ['ndo', 'E']], ['V+D']);
    const vp = conj === 'ar' ? 'a' : 'i';
    for (const [g, n] of [['o', ''], ['a', ''], ['o', 's'], ['a', 's']]) add('par', -1, [[L, 'L'], [vp, 'V'], ['d', 'D'], [g, 'G'], [n, 'N']], ['V+D']);
    // presente de indicativo
    const vpres = conj === 'ar' ? 'a' : 'e';
    for (let p = 0; p < 6; p++) {
      if (p === 0) add('pres', 0, [[L, 'L'], ['o', 'X']], [], 'La ‑o de 1.ª persona es una desinencia que amalgama número, persona, tiempo y modo.');
      else if (p === 3) add('pres', 3, [[L, 'L'], [conj === 'ir' ? 'i' : vpres, 'V'], ['mos', 'X']]);
      else if (p === 4) add('pres', 4, conj === 'ir' ? [[L, 'L'], ['í', 'V'], ['s', 'X']] : [[L, 'L'], [AG[vpres], 'V'], ['is', 'X']]);
      else add('pres', p, [[L, 'L'], [vpres, 'V'], [NP[p], 'X']]);
    }
    for (let p = 0; p < 6; p++) {
      // pretérito imperfecto: cant‑a‑ba‑mos · com‑í‑a‑mos (también com‑ía‑mos)
      if (conj === 'ar') add('impf', p, [[L, 'L'], [p === 3 ? 'á' : 'a', 'V'], ['ba', 'T'], [NP[p], 'X']]);
      else add('impf', p, [[L, 'L'], ['í', 'V'], ['a', 'T'], [NP[p], 'X']], ['VT']);
      // futuro: cant‑a‑re‑mos
      const fut = ['ré', 'rá', 'rá', 're', 'ré', 'rá'][p];
      add('fut', p, [[L, 'L'], [vt, 'V'], [fut, 'T'], [NP[p], 'X']]);
      // condicional: cant‑a‑ría‑mos (también cant‑a‑r‑ía‑mos)
      add('cond', p, [[L, 'L'], [vt, 'V'], ['ría', 'T'], [NP[p], 'X']], ['R+IA']);
      // presente de subjuntivo: cant‑e‑mos · com‑a‑mos
      const ts = conj === 'ar' ? 'e' : 'a';
      add('spres', p, [[L, 'L'], [p === 4 ? AG[ts] : ts, 'T'], [NP[p], 'X']]);
      // imperfecto de subjuntivo: cant‑a‑ra‑mos · com‑ie‑ra‑mos
      const vs = conj === 'ar' ? (p === 3 ? 'á' : 'a') : (p === 3 ? 'ié' : 'ie');
      add('sra', p, [[L, 'L'], [vs, 'V'], ['ra', 'T'], [NP[p], 'X']]);
      add('sse', p, [[L, 'L'], [vs, 'V'], ['se', 'T'], [NP[p], 'X']]);
    }
    return out;
  }

  // ───────── Parser ─────────
  const ITEMS = [];
  for (const linea of DATOS.split('\n')) {
    if (!linea.trim()) continue;
    const [palabra, cat, form, segTxt, altTxt = '', nota = ''] = linea.split('|');
    const segs = segTxt.trim().split(/\s+/).map(s => { const i = s.lastIndexOf('/'); return [s.slice(0, i), s.slice(i + 1)]; });
    let n = nota;
    if (!n && form === 'parasintética') n = NOTA_PARA;
    if (!n && cat === 'adv' && segs.some(s => s[0] === 'mente')) n = NOTA_MENTE;
    if (!n && segs.some(s => s[1] === 'V') && cat !== 'ver' && form !== 'compuesta') n = NOTA_V;
    ITEMS.push({ palabra, cat, form, segs, alts: altTxt ? altTxt.split(';').map(a => a.trim()).filter(Boolean) : [], nota: n });
  }
  const ver = Object.values(VERBOS_SIMPLES).join(' ').split(' ');
  for (const v of ver) ITEMS.push(...formasVerbo(v));

  // ───────── Segmentaciones aceptadas ─────────
  const sinTilde = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  // Fronteras (posiciones de corte) de una lista de segmentos
  const fronteras = segs => { const b = []; let pos = 0; for (let i = 0; i < segs.length - 1; i++) { pos += sinTilde(segs[i]).length; b.push(pos); } return b; };

  // Uniones que los manuales hacen a menudo y que también se aceptan:
  //  · interfijo + sufijo (pan‑ader‑o), sufijo + sufijo (libr‑ería)
  //  · sufijo + vocal final (zapat‑ero), vocal temática + sufijo (lav‑ador‑a, aliment‑ación)
  function unionPermitida(segs, i) {
    const [a, b] = [segs[i][1], segs[i + 1][1]];
    const final = i + 2 === segs.length || (i + 3 === segs.length && segs[i + 2][1] === 'N');
    if (a === 'I' && (b === 'S' || b === 'A')) return true;
    if (a === 'S' && b === 'S' && segs[i + 1][0] !== 'mente') return true;
    if ((a === 'S' || a === 'A') && (b === 'G' || b === 'V') && final) return true;
    if (a === 'V' && b === 'S' && segs[i + 1][0] !== 'mente' && i > 0 && (segs[i - 1][1] === 'L' || segs[i - 1][1] === 'S')) return true;
    return false;
  }
  function aceptadas(it) {
    const base = fronteras(it.segs.map(s => s[0]));
    const quitables = [];
    if (it.cat !== 'ver' || !it.tiempo) it.segs.forEach((_, i) => { if (i < it.segs.length - 1 && unionPermitida(it.segs, i)) quitables.push(i); });
    const sets = [];
    for (let m = 0; m < 1 << quitables.length; m++) {
      const fuera = new Set(quitables.filter((_, k) => m & (1 << k)));
      sets.push(base.filter((_, i) => !fuera.has(i)));
    }
    // alternativas propias de las formas verbales
    if (it.alts.includes('VT')) sets.push(base.filter((_, i) => i !== 1));              // com‑ía‑mos
    if (it.alts.includes('V+D')) sets.push(base.filter((_, i) => i !== 1));             // cant‑ad‑o, cant‑ando
    if (it.alts.includes('R+IA')) {                                                       // cant‑a‑r‑ía‑mos
      const r = base[1] + 1; sets.push([...base, r].sort((x, y) => x - y));
    }
    // alternativas escritas a mano (con guiones)
    for (const a of it.alts) if (a.includes('-')) sets.push(fronteras(a.split('-')));
    const vistas = new Set();
    return sets.filter(s => { const k = s.join(','); if (vistas.has(k)) return false; vistas.add(k); return true; });
  }
  const formatear = (palabra, fr) => {
    const out = []; let prev = 0; const chars = [...palabra];
    // las fronteras se miden sobre la palabra sin tildes, que tiene la misma longitud en letras
    for (const f of [...fr, chars.length]) { out.push(chars.slice(prev, f).join('')); prev = f; }
    return out.join('-');
  };

  const API = { ITEMS, TIPOS, CATS, TIEMPOS_V, PERS, aceptadas, fronteras, formatear, sinTilde };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.Morfemas = API;
})(typeof window !== 'undefined' ? window : globalThis);
