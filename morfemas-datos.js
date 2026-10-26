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
  const NOTA_ISIM = '‑ísimo es el sufijo del grado superlativo; algunos manuales lo tratan como morfema flexivo de grado.';
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
lavadora|sus|derivada|lav/L a/V dor/S a/V
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
niños|sus|simple|niñ/L o/G s/N
abuelas|sus|simple|abuel/L a/G s/N
primos|sus|simple|prim/L o/G s/N
tías|sus|simple|tí/L a/G s/N
lobas|sus|simple|lob/L a/G s/N
maestros|sus|simple|maestr/L o/G s/N
alumnas|sus|simple|alumn/L a/G s/N
vecinos|sus|simple|vecin/L o/G s/N
gata|sus|simple|gat/L a/G
abuelo|sus|simple|abuel/L o/G
camas|sus|simple|cam/L a/V s/N
ventanas|sus|simple|ventan/L a/V s/N
puertas|sus|simple|puert/L a/V s/N
sillas|sus|simple|sill/L a/V s/N
platos|sus|simple|plat/L o/V s/N
vasos|sus|simple|vas/L o/V s/N
manos|sus|simple|man/L o/V s/N
llaves|sus|simple|llav/L e/V s/N
nubes|sus|simple|nub/L e/V s/N
calles|sus|simple|call/L e/V s/N
noches|sus|simple|noch/L e/V s/N
trenes|sus|simple|tren/L es/N
flores|sus|simple|flor/L es/N
relojes|sus|simple|reloj/L es/N
luces|sus|simple|luc/L es/N|||El lexema luz se escribe luc‑ ante e (luc‑es): es el mismo lexema con otra grafía.
peces|sus|simple|pec/L es/N|||El lexema pez se escribe pec‑ ante e (pec‑es): es el mismo lexema con otra grafía.
voces|sus|simple|voc/L es/N
lápices|sus|simple|lápic/L es/N
ciudades|sus|simple|ciudad/L es/N
mares|sus|simple|mar/L es/N
sofás|sus|simple|sofá/L s/N|||Tras vocal tónica el plural es ‑s (sofá‑s).
gatito|sus|derivada|gat/L it/A o/G
niñito|sus|derivada|niñ/L it/A o/G
abuelita|sus|derivada|abuel/L it/A a/G
hermanito|sus|derivada|herman/L it/A o/G
mesita|sus|derivada|mes/L it/A a/V
arbolito|sus|derivada|arbol/L it/A o/V
cosita|sus|derivada|cos/L it/A a/V
ratito|sus|derivada|rat/L it/A o/V
cafecito|sus|derivada|caf/L ec/I it/A o/V
pueblecito|sus|derivada|puebl/L ec/I it/A o/V
florecita|sus|derivada|flor/L ec/I it/A a/V
avecilla|sus|derivada|av/L ec/I ill/A a/V
pajarillo|sus|derivada|pajar/L ill/A o/V
perrillo|sus|derivada|perr/L ill/A o/G
cosilla|sus|derivada|cos/L ill/A a/V
papelucho|sus|derivada|papel/L uch/A o/V
animalucho|sus|derivada|animal/L uch/A o/V
cuartucho|sus|derivada|cuart/L uch/A o/V
perrazo|sus|derivada|perr/L az/A o/G
manaza|sus|derivada|man/L az/A a/V
golazo|sus|derivada|gol/L az/A o/V
casona|sus|derivada|cas/L on/A a/V
hombrón|sus|derivada|hombr/L ón/A
librote|sus|derivada|libr/L ot/A e/V
martillazo|sus|derivada|martill/L az/S o/V
portazo|sus|derivada|port/L az/S o/V|||port‑ es el alomorfo de puerta (el diptongo ue solo aparece en sílaba tónica).
zapatazo|sus|derivada|zapat/L az/S o/V
balonazo|sus|derivada|balon/L az/S o/V
latigazo|sus|derivada|latig/L az/S o/V
pelotazo|sus|derivada|pelot/L az/S o/V
botellazo|sus|derivada|botell/L az/S o/V
escobazo|sus|derivada|escob/L az/S o/V
rodillazo|sus|derivada|rodill/L az/S o/V
sartenazo|sus|derivada|sarten/L az/S o/V
barbero|sus|derivada|barb/L er/S o/G
pastelero|sus|derivada|pastel/L er/S o/G
joyero|sus|derivada|joy/L er/S o/G
granjero|sus|derivada|granj/L er/S o/G
banquero|sus|derivada|banqu/L er/S o/G
cervecero|sus|derivada|cervec/L er/S o/G
torero|sus|derivada|tor/L er/S o/G
vaquero|sus|derivada|vaqu/L er/S o/G
consejero|sus|derivada|consej/L er/S o/G
mensajero|sus|derivada|mensaj/L er/S o/G
enfermero|sus|derivada|enferm/L er/S o/G
hotelero|sus|derivada|hotel/L er/S o/G
guerrero|sus|derivada|guerr/L er/S o/G
prisionero|sus|derivada|prision/L er/S o/G
carcelero|sus|derivada|carcel/L er/S o/G
obrero|sus|derivada|obr/L er/S o/G
viajero|sus|derivada|viaj/L er/S o/G
papelera|sus|derivada|papel/L er/S a/V
perchero|sus|derivada|perch/L er/S o/V
trastero|sus|derivada|trast/L er/S o/V
bañera|sus|derivada|bañ/L er/S a/V
sopera|sus|derivada|sop/L er/S a/V
panera|sus|derivada|pan/L er/S a/V
ensaladera|sus|derivada|ensalad/L er/S a/V
nevera|sus|derivada|nev/L er/S a/V|||nev‑ es el alomorfo de nieve (el diptongo ie solo aparece en sílaba tónica).
pecera|sus|derivada|pec/L er/S a/V
guantera|sus|derivada|guant/L er/S a/V
cafetera|sus|derivada|caf/L et/I er/S a/V
cartera|sus|derivada|cart/L er/S a/V
joyería|sus|derivada|joy/L er/S ía/S
pastelería|sus|derivada|pastel/L er/S ía/S
carnicería|sus|derivada|carn/L ic/I er/S ía/S
papelería|sus|derivada|papel/L er/S ía/S
perfumería|sus|derivada|perfum/L er/S ía/S
relojería|sus|derivada|reloj/L er/S ía/S
cervecería|sus|derivada|cervec/L er/S ía/S
cafetería|sus|derivada|caf/L et/I er/S ía/S
mensajería|sus|derivada|mensaj/L er/S ía/S
fregadero|sus|derivada|freg/L a/V der/S o/V
matadero|sus|derivada|mat/L a/V der/S o/V
comedero|sus|derivada|com/L e/V der/S o/V
bebedero|sus|derivada|beb/L e/V der/S o/V
paradero|sus|derivada|par/L a/V der/S o/V
regadera|sus|derivada|reg/L a/V der/S a/V
trabajador|sus|derivada|trabaj/L a/V dor/S
ganador|sus|derivada|gan/L a/V dor/S
luchador|sus|derivada|luch/L a/V dor/S
pescador|sus|derivada|pesc/L a/V dor/S
cazador|sus|derivada|caz/L a/V dor/S
ordenador|sus|derivada|orden/L a/V dor/S
secador|sus|derivada|sec/L a/V dor/S
mirador|sus|derivada|mir/L a/V dor/S
bebedor|sus|derivada|beb/L e/V dor/S
conocedor|sus|derivada|conoc/L e/V dor/S
servidor|sus|derivada|serv/L i/V dor/S
repartidor|sus|derivada|repart/L i/V dor/S
seguidor|sus|derivada|segu/L i/V dor/S
consumidor|sus|derivada|consum/L i/V dor/S
comerciante|sus|derivada|comerci/L a/V nte/S
navegante|sus|derivada|naveg/L a/V nte/S
caminante|sus|derivada|camin/L a/V nte/S
ayudante|sus|derivada|ayud/L a/V nte/S
visitante|sus|derivada|visit/L a/V nte/S
amante|sus|derivada|am/L a/V nte/S
dependiente|sus|derivada|depend/L ie/V nte/S
votación|sus|derivada|vot/L a/V ción/S
plantación|sus|derivada|plant/L a/V ción/S
navegación|sus|derivada|naveg/L a/V ción/S
educación|sus|derivada|educ/L a/V ción/S
preparación|sus|derivada|prepar/L a/V ción/S
explicación|sus|derivada|explic/L a/V ción/S
invitación|sus|derivada|invit/L a/V ción/S
observación|sus|derivada|observ/L a/V ción/S
celebración|sus|derivada|celebr/L a/V ción/S
comunicación|sus|derivada|comunic/L a/V ción/S
imitación|sus|derivada|imit/L a/V ción/S
población|sus|derivada|pobl/L a/V ción/S
creación|sus|derivada|cre/L a/V ción/S
separación|sus|derivada|separ/L a/V ción/S
contaminación|sus|derivada|contamin/L a/V ción/S
actuación|sus|derivada|actu/L a/V ción/S
declaración|sus|derivada|declar/L a/V ción/S
repetición|sus|derivada|repet/L i/V ción/S
prohibición|sus|derivada|prohib/L i/V ción/S
competición|sus|derivada|compet/L i/V ción/S
definición|sus|derivada|defin/L i/V ción/S
medición|sus|derivada|med/L i/V ción/S
movimiento|sus|derivada|mov/L i/V mient/S o/V
conocimiento|sus|derivada|conoc/L i/V mient/S o/V
sufrimiento|sus|derivada|sufr/L i/V mient/S o/V
nacimiento|sus|derivada|nac/L i/V mient/S o/V
crecimiento|sus|derivada|crec/L i/V mient/S o/V
pensamiento|sus|derivada|pens/L a/V mient/S o/V
sentimiento|sus|derivada|sent/L i/V mient/S o/V
entrenamiento|sus|derivada|entren/L a/V mient/S o/V
tratamiento|sus|derivada|trat/L a/V mient/S o/V
aburrimiento|sus|derivada|aburr/L i/V mient/S o/V
levantamiento|sus|derivada|levant/L a/V mient/S o/V
cumplimiento|sus|derivada|cumpl/L i/V mient/S o/V
cerradura|sus|derivada|cerr/L a/V dur/S a/V
picadura|sus|derivada|pic/L a/V dur/S a/V
quemadura|sus|derivada|quem/L a/V dur/S a/V
rozadura|sus|derivada|roz/L a/V dur/S a/V
mordedura|sus|derivada|mord/L e/V dur/S a/V
confianza|sus|derivada|confi/L a/V nz/S a/V
matanza|sus|derivada|mat/L a/V nz/S a/V
tardanza|sus|derivada|tard/L a/V nz/S a/V
añoranza|sus|derivada|añor/L a/V nz/S a/V
alabanza|sus|derivada|alab/L a/V nz/S a/V
crianza|sus|derivada|cri/L a/V nz/S a/V
mudanza|sus|derivada|mud/L a/V nz/S a/V
adivinanza|sus|derivada|adivin/L a/V nz/S a/V
plumaje|sus|derivada|plum/L aj/S e/V
ramaje|sus|derivada|ram/L aj/S e/V
doblaje|sus|derivada|dobl/L aj/S e/V
montaje|sus|derivada|mont/L aj/S e/V
rapidez|sus|derivada|rapid/L ez/S
timidez|sus|derivada|timid/L ez/S
sencillez|sus|derivada|sencill/L ez/S
vejez|sus|derivada|vej/L ez/S
niñez|sus|derivada|niñ/L ez/S
madurez|sus|derivada|madur/L ez/S
palidez|sus|derivada|palid/L ez/S
estupidez|sus|derivada|estupid/L ez/S
grandeza|sus|derivada|grand/L ez/S a/V
riqueza|sus|derivada|riqu/L ez/S a/V
limpieza|sus|derivada|limpi/L ez/S a/V
firmeza|sus|derivada|firm/L ez/S a/V
torpeza|sus|derivada|torp/L ez/S a/V
rareza|sus|derivada|rar/L ez/S a/V
pureza|sus|derivada|pur/L ez/S a/V
nobleza|sus|derivada|nobl/L ez/S a/V
dureza|sus|derivada|dur/L ez/S a/V
flaqueza|sus|derivada|flaqu/L ez/S a/V
certeza|sus|derivada|cert/L ez/S a/V
delicadeza|sus|derivada|delicad/L ez/S a/V
aspereza|sus|derivada|asper/L ez/S a/V
gentileza|sus|derivada|gentil/L ez/S a/V
extrañeza|sus|derivada|extrañ/L ez/S a/V
sutileza|sus|derivada|sutil/L ez/S a/V
blancura|sus|derivada|blanc/L ur/S a/V
hermosura|sus|derivada|hermos/L ur/S a/V
dulzura|sus|derivada|dulz/L ur/S a/V
frescura|sus|derivada|fresc/L ur/S a/V
locura|sus|derivada|loc/L ur/S a/V
altura|sus|derivada|alt/L ur/S a/V
anchura|sus|derivada|anch/L ur/S a/V
ternura|sus|derivada|tern/L ur/S a/V
amargura|sus|derivada|amarg/L ur/S a/V
finura|sus|derivada|fin/L ur/S a/V
gordura|sus|derivada|gord/L ur/S a/V
negrura|sus|derivada|negr/L ur/S a/V
bondad|sus|derivada|bon/L dad/S|||bon‑ es el alomorfo culto de bueno (bon‑dad, bon‑ach‑ón).
falsedad|sus|derivada|fals/L edad/S|||‑dad tiene las variantes ‑dad, ‑idad y ‑edad según la base (mal‑dad, felic‑idad, fals‑edad).
suciedad|sus|derivada|suci/L edad/S|||‑dad tiene las variantes ‑dad, ‑idad y ‑edad según la base (mal‑dad, felic‑idad, fals‑edad).
seriedad|sus|derivada|seri/L edad/S|||‑dad tiene las variantes ‑dad, ‑idad y ‑edad según la base (mal‑dad, felic‑idad, fals‑edad).
variedad|sus|derivada|vari/L edad/S|||‑dad tiene las variantes ‑dad, ‑idad y ‑edad según la base (mal‑dad, felic‑idad, fals‑edad).
brevedad|sus|derivada|brev/L edad/S|||‑dad tiene las variantes ‑dad, ‑idad y ‑edad según la base (mal‑dad, felic‑idad, fals‑edad).
felicidad|sus|derivada|felic/L idad/S
claridad|sus|derivada|clar/L idad/S
oscuridad|sus|derivada|oscur/L idad/S
utilidad|sus|derivada|util/L idad/S
fragilidad|sus|derivada|fragil/L idad/S
habilidad|sus|derivada|habil/L idad/S
seguridad|sus|derivada|segur/L idad/S
sinceridad|sus|derivada|sincer/L idad/S
comodidad|sus|derivada|comod/L idad/S
cortesía|sus|derivada|cortes/L ía/S
lozanía|sus|derivada|lozan/L ía/S
villanía|sus|derivada|villan/L ía/S
optimismo|sus|derivada|optim/L ism/S o/V
pesimismo|sus|derivada|pesim/L ism/S o/V
egoísmo|sus|derivada|ego/L ísm/S o/V
realismo|sus|derivada|real/L ism/S o/V
machismo|sus|derivada|mach/L ism/S o/V
heroísmo|sus|derivada|hero/L ísm/S o/V|||hero‑ es el alomorfo de héroe ante el sufijo.
patriotismo|sus|derivada|patriot/L ism/S o/V
ciclismo|sus|derivada|cicl/L ism/S o/V
atletismo|sus|derivada|atlet/L ism/S o/V
periodismo|sus|derivada|period/L ism/S o/V
futbolista|sus|derivada|futbol/L ist/S a/V
taxista|sus|derivada|tax/L ist/S a/V
ciclista|sus|derivada|cicl/L ist/S a/V
guitarrista|sus|derivada|guitarr/L ist/S a/V
flautista|sus|derivada|flaut/L ist/S a/V
novelista|sus|derivada|novel/L ist/S a/V
violinista|sus|derivada|violin/L ist/S a/V
oficinista|sus|derivada|oficin/L ist/S a/V
deportista|sus|derivada|deport/L ist/S a/V
trapecista|sus|derivada|trapec/L ist/S a/V
optimista|sus|derivada|optim/L ist/S a/V
pesimista|sus|derivada|pesim/L ist/S a/V
egoísta|sus|derivada|ego/L íst/S a/V
trigal|sus|derivada|trig/L al/S
maizal|sus|derivada|maiz/L al/S
arrozal|sus|derivada|arroz/L al/S
manzanar|sus|derivada|manzan/L ar/S
melonar|sus|derivada|melon/L ar/S
castañar|sus|derivada|castañ/L ar/S
encinar|sus|derivada|encin/L ar/S
robledal|sus|derivada|robl/L ed/I al/S
exalumno|sus|derivada|ex/P alumn/L o/G
bisnieto|sus|derivada|bis/P niet/L o/G
tatarabuelo|sus|derivada|tatar/P abuel/L o/G|||El prefijo es tatara‑, que pierde su ‑a final ante la a‑ de abuelo (tatar‑abuelo).
coautor|sus|derivada|co/P autor/L
copiloto|sus|derivada|co/P pilot/L o/V
sobresueldo|sus|derivada|sobre/P sueld/L o/V
sobrepeso|sus|derivada|sobre/P pes/L o/V
sobremesa|sus|derivada|sobre/P mes/L a/V
subgrupo|sus|derivada|sub/P grup/L o/V
submundo|sus|derivada|sub/P mund/L o/V
supermercado|sus|derivada|super/P mercad/L o/V
hipermercado|sus|derivada|hiper/P mercad/L o/V
antesala|sus|derivada|ante/P sal/L a/V
entresuelo|sus|derivada|entre/P suel/L o/V
contraluz|sus|derivada|contra/P luz/L
contraveneno|sus|derivada|contra/P venen/L o/V
contraataque|sus|derivada|contra/P ataqu/L e/V
desacuerdo|sus|derivada|des/P acuerd/L o/V
desempleo|sus|derivada|des/P emple/L o/V
deshonor|sus|derivada|des/P honor/L
desinterés|sus|derivada|des/P interés/L
desconfianza|sus|derivada|des/P confi/L a/V nz/S a/V
inseguridad|sus|derivada|in/P segur/L idad/S
infelicidad|sus|derivada|in/P felic/L idad/S
intranquilidad|sus|derivada|in/P tranquil/L idad/S
semicírculo|sus|derivada|semi/P círcul/L o/V
semifinal|sus|derivada|semi/P fin/L al/S
pararrayos|sus|compuesta|par/L a/V rray/L o/V s/N|||rray‑ es el lexema de rayo: la r se duplica al quedar entre vocales (para‑rrayos).
tocadiscos|sus|compuesta|toc/L a/V disc/L o/V s/N
lanzallamas|sus|compuesta|lanz/L a/V llam/L a/V s/N
quitanieves|sus|compuesta|quit/L a/V niev/L e/V s/N
cascanueces|sus|compuesta|casc/L a/V nuec/L es/N
cuentagotas|sus|compuesta|cuent/L a/V got/L a/V s/N
tragaperras|sus|compuesta|trag/L a/V perr/L a/V s/N
espantapájaros|sus|compuesta|espant/L a/V pájar/L o/V s/N
trotamundos|sus|compuesta|trot/L a/V mund/L o/V s/N
pintalabios|sus|compuesta|pint/L a/V labi/L o/V s/N
cortacésped|sus|compuesta|cort/L a/V césped/L
sacapuntas|sus|compuesta|sac/L a/V punt/L a/V s/N
rompecabezas|sus|compuesta|romp/L e/V cabez/L a/V s/N
pisapapeles|sus|compuesta|pis/L a/V papel/L es/N
lavavajillas|sus|compuesta|lav/L a/V vajill/L a/V s/N
portavoz|sus|compuesta|port/L a/V voz/L
guardabosques|sus|compuesta|guard/L a/V bosqu/L e/V s/N
guardarropa|sus|compuesta|guard/L a/V rrop/L a/V
matasellos|sus|compuesta|mat/L a/V sell/L o/V s/N
quitamanchas|sus|compuesta|quit/L a/V manch/L a/V s/N
cubrecama|sus|compuesta|cubr/L e/V cam/L a/V
cortafuegos|sus|compuesta|cort/L a/V fueg/L o/V s/N
picaporte|sus|compuesta|pic/L a/V port/L e/V
tirachinas|sus|compuesta|tir/L a/V chin/L a/V s/N
pelagatos|sus|compuesta|pel/L a/V gat/L o/V s/N
nochebuena|sus|compuesta|noch/L e/V buen/L a/G
camposanto|sus|compuesta|camp/L o/V sant/L o/G
caradura|sus|compuesta|car/L a/V dur/L a/G
telaraña|sus|compuesta|tel/L arañ/L a/V|||Al unirse, la ‑a final de tela se funde con la a‑ de araña (tel‑araña).
aguanieve|sus|compuesta|agu/L a/V niev/L e/V
madreselva|sus|compuesta|madr/L e/V selv/L a/V
compraventa|sus|compuesta|compr/L a/V vent/L a/V
balonmano|sus|compuesta|balon/L man/L o/V
ferrocarril|sus|compuesta|ferr/L o/I carril/L
altavoz|sus|compuesta|alt/L a/G voz/L
medianoche|sus|compuesta|medi/L a/G noch/L e/V
sinvergüenza|sus|compuesta|sin/L vergüenz/L a/V|||Compuesto de preposición + sustantivo; algunos manuales consideran sin‑ un prefijo.
centrocampista|sus|parasintética|centr/L o/V camp/L ist/S a/V
mileurista|sus|parasintética|mil/L eur/L ist/S a/V
blancos|adj|simple|blanc/L o/G s/N
buenas|adj|simple|buen/L a/G s/N
largas|adj|simple|larg/L a/G s/N
fríos|adj|simple|frí/L o/G s/N
viejos|adj|simple|viej/L o/G s/N
nuevas|adj|simple|nuev/L a/G s/N
guapa|adj|simple|guap/L a/G
lista|adj|simple|list/L a/G
gordo|adj|simple|gord/L o/G
jóvenes|adj|simple|jóven/L es/N
útiles|adj|simple|útil/L es/N
comunes|adj|simple|comun/L es/N
veloces|adj|simple|veloc/L es/N
audaces|adj|simple|audac/L es/N
fuertes|adj|simple|fuert/L e/V s/N
tristes|adj|simple|trist/L e/V s/N
dulces|adj|simple|dulc/L e/V s/N
alegres|adj|simple|alegr/L e/V s/N
inteligentes|adj|simple|inteligent/L e/V s/N
sabroso|adj|derivada|sabr/L os/S o/G|||sabr‑ es el alomorfo de sabor ante el sufijo.
gracioso|adj|derivada|graci/L os/S o/G
nervioso|adj|derivada|nervi/L os/S o/G
ruidoso|adj|derivada|ruid/L os/S o/G
tormentoso|adj|derivada|torment/L os/S o/G
montañoso|adj|derivada|montañ/L os/S o/G
rocoso|adj|derivada|roc/L os/S o/G
jugoso|adj|derivada|jug/L os/S o/G
espumoso|adj|derivada|espum/L os/S o/G
mentiroso|adj|derivada|mentir/L os/S o/G
amoroso|adj|derivada|amor/L os/S o/G
envidioso|adj|derivada|envidi/L os/S o/G
orgulloso|adj|derivada|orgull/L os/S o/G
perezoso|adj|derivada|perez/L os/S o/G
estudioso|adj|derivada|estudi/L os/S o/G
poderoso|adj|derivada|poder/L os/S o/G
cuidadoso|adj|derivada|cuidad/L os/S o/G
vergonzoso|adj|derivada|vergonz/L os/S o/G|||vergonz‑ es el alomorfo de vergüenza (el diptongo ue solo aparece en sílaba tónica).
caluroso|adj|derivada|calur/L os/S o/G|||calur‑ es el alomorfo de calor ante el sufijo.
lujoso|adj|derivada|luj/L os/S o/G
ventoso|adj|derivada|vent/L os/S o/G|||vent‑ es el alomorfo de viento (el diptongo ie solo aparece en sílaba tónica).
sedoso|adj|derivada|sed/L os/S o/G
cremoso|adj|derivada|crem/L os/S o/G
aceitoso|adj|derivada|aceit/L os/S o/G
talentoso|adj|derivada|talent/L os/S o/G
glorioso|adj|derivada|glori/L os/S o/G
furioso|adj|derivada|furi/L os/S o/G
silencioso|adj|derivada|silenci/L os/S o/G
hambriento|adj|derivada|hambr/L ient/S o/G
sediento|adj|derivada|sed/L ient/S o/G
grasiento|adj|derivada|gras/L ient/S o/G
sangriento|adj|derivada|sangr/L ient/S o/G
mugriento|adj|derivada|mugr/L ient/S o/G
peludo|adj|derivada|pel/L ud/S o/G
narigudo|adj|derivada|narig/L ud/S o/G|||narig‑ es el alomorfo de nariz ante el sufijo.
cabezudo|adj|derivada|cabez/L ud/S o/G
forzudo|adj|derivada|forz/L ud/S o/G
panzudo|adj|derivada|panz/L ud/S o/G
huesudo|adj|derivada|hues/L ud/S o/G
bigotudo|adj|derivada|bigot/L ud/S o/G
melenudo|adj|derivada|melen/L ud/S o/G
lanudo|adj|derivada|lan/L ud/S o/G
picudo|adj|derivada|pic/L ud/S o/G
mundial|adj|derivada|mund/L ial/S
comercial|adj|derivada|comerci/L al/S
personal|adj|derivada|person/L al/S
semanal|adj|derivada|seman/L al/S
digital|adj|derivada|digit/L al/S
central|adj|derivada|centr/L al/S
regional|adj|derivada|region/L al/S
tropical|adj|derivada|tropic/L al/S
otoñal|adj|derivada|otoñ/L al/S
mortal|adj|derivada|mort/L al/S
ornamental|adj|derivada|ornament/L al/S
sentimental|adj|derivada|sentiment/L al/S
accidental|adj|derivada|accident/L al/S
emocional|adj|derivada|emocion/L al/S
profesional|adj|derivada|profesion/L al/S
tradicional|adj|derivada|tradicion/L al/S
polar|adj|derivada|pol/L ar/S
muscular|adj|derivada|muscul/L ar/S
histórico|adj|derivada|histór/L ic/S o/G
rítmico|adj|derivada|rítm/L ic/S o/G
atómico|adj|derivada|atóm/L ic/S o/G
metálico|adj|derivada|metál/L ic/S o/G
volcánico|adj|derivada|volcán/L ic/S o/G
angélico|adj|derivada|angél/L ic/S o/G
irónico|adj|derivada|irón/L ic/S o/G
oceánico|adj|derivada|oceán/L ic/S o/G
telefónico|adj|derivada|telefón/L ic/S o/G
bebible|adj|derivada|beb/L i/V ble/S
temible|adj|derivada|tem/L i/V ble/S
creíble|adj|derivada|cre/L í/V ble/S
adorable|adj|derivada|ador/L a/V ble/S
admirable|adj|derivada|admir/L a/V ble/S
aceptable|adj|derivada|acept/L a/V ble/S
agradable|adj|derivada|agrad/L a/V ble/S
comparable|adj|derivada|compar/L a/V ble/S
observable|adj|derivada|observ/L a/V ble/S
respetable|adj|derivada|respet/L a/V ble/S
razonable|adj|derivada|razon/L a/V ble/S
lamentable|adj|derivada|lament/L a/V ble/S
imaginable|adj|derivada|imagin/L a/V ble/S
habitable|adj|derivada|habit/L a/V ble/S
navegable|adj|derivada|naveg/L a/V ble/S
apreciable|adj|derivada|apreci/L a/V ble/S
discutible|adj|derivada|discut/L i/V ble/S
preferible|adj|derivada|prefer/L i/V ble/S
inolvidable|adj|derivada|in/P olvid/L a/V ble/S
irrompible|adj|derivada|ir/P romp/L i/V ble/S
inagotable|adj|derivada|in/P agot/L a/V ble/S
inaceptable|adj|derivada|in/P acept/L a/V ble/S
insoportable|adj|derivada|in/P soport/L a/V ble/S
increíble|adj|derivada|in/P cre/L í/V ble/S
intocable|adj|derivada|in/P toc/L a/V ble/S
inimaginable|adj|derivada|in/P imagin/L a/V ble/S
indiscutible|adj|derivada|in/P discut/L i/V ble/S
imparable|adj|derivada|im/P par/L a/V ble/S
inalcanzable|adj|derivada|in/P alcanz/L a/V ble/S
deportivo|adj|derivada|deport/L iv/S o/G
festivo|adj|derivada|fest/L iv/S o/G|||fest‑ es el alomorfo de fiesta (el diptongo ie solo aparece en sílaba tónica).
creativo|adj|derivada|cre/L a/V tiv/S o/G
decorativo|adj|derivada|decor/L a/V tiv/S o/G
informativo|adj|derivada|inform/L a/V tiv/S o/G
educativo|adj|derivada|educ/L a/V tiv/S o/G
imaginativo|adj|derivada|imagin/L a/V tiv/S o/G
comunicativo|adj|derivada|comunic/L a/V tiv/S o/G
competitivo|adj|derivada|compet/L i/V tiv/S o/G
dentado|adj|derivada|dent/L ad/S o/G
rosado|adj|derivada|ros/L ad/S o/G
alado|adj|derivada|al/L ad/S o/G
aceitunado|adj|derivada|aceitun/L ad/S o/G
enfermizo|adj|derivada|enferm/L iz/S o/G
cobrizo|adj|derivada|cobr/L iz/S o/G
pajizo|adj|derivada|paj/L iz/S o/G
plomizo|adj|derivada|plom/L iz/S o/G
marino|adj|derivada|mar/L in/S o/G
cristalino|adj|derivada|cristal/L in/S o/G
americano|adj|derivada|americ/L an/S o/G
africano|adj|derivada|afric/L an/S o/G
colombiano|adj|derivada|colombi/L an/S o/G
italiano|adj|derivada|itali/L an/S o/G
sevillano|adj|derivada|sevill/L an/S o/G
valenciano|adj|derivada|valenci/L an/S o/G
mexicano|adj|derivada|mexic/L an/S o/G
peruano|adj|derivada|peru/L an/S o/G
cubano|adj|derivada|cub/L an/S o/G
venezolano|adj|derivada|venezol/L an/S o/G|||venezol‑ es el alomorfo de Venezuela ante el sufijo.
aldeano|adj|derivada|alde/L an/S o/G
lejano|adj|derivada|lej/L an/S o/G
cercano|adj|derivada|cerc/L an/S o/G
malagueño|adj|derivada|malagu/L eñ/S o/G|||Se escribe malagu‑ (con u) para mantener el sonido de la g ante e.
panameño|adj|derivada|panam/L eñ/S o/G
brasileño|adj|derivada|brasil/L eñ/S o/G
hondureño|adj|derivada|hondur/L eñ/S o/G
caribeño|adj|derivada|carib/L eñ/S o/G
isleño|adj|derivada|isl/L eñ/S o/G
navideño|adj|derivada|navid/L eñ/S o/G
hogareño|adj|derivada|hogar/L eñ/S o/G
francés|adj|derivada|franc/L és/S|||En masculino el género no tiene marca visible (franc‑és); en femenino aparece ‑a (franc‑es‑a).
portugués|adj|derivada|portugu/L és/S|||En masculino el género no tiene marca visible (portugu‑és); en femenino aparece ‑a (portugu‑es‑a).
japonés|adj|derivada|japon/L és/S|||En masculino el género no tiene marca visible (japon‑és); en femenino aparece ‑a (japon‑es‑a).
holandés|adj|derivada|holand/L és/S|||En masculino el género no tiene marca visible (holand‑és); en femenino aparece ‑a (holand‑es‑a).
cordobés|adj|derivada|cordob/L és/S|||En masculino el género no tiene marca visible (cordob‑és); en femenino aparece ‑a (cordob‑es‑a).
aragonés|adj|derivada|aragon/L és/S|||En masculino el género no tiene marca visible (aragon‑és); en femenino aparece ‑a (aragon‑es‑a).
canadiense|adj|derivada|canad/L iense/S
ateniense|adj|derivada|aten/L iense/S
nicaragüense|adj|derivada|nicaragü/L ense/S
juvenil|adj|derivada|juven/L il/S|||juven‑ es el alomorfo culto de joven.
varonil|adj|derivada|varon/L il/S
playero|adj|derivada|play/L er/S o/G
dominguero|adj|derivada|domingu/L er/S o/G
casero|adj|derivada|cas/L er/S o/G
pesquero|adj|derivada|pesqu/L er/S o/G
mañanero|adj|derivada|mañan/L er/S o/G
embustero|adj|derivada|embust/L er/S o/G
gordito|adj|derivada|gord/L it/A o/G
bajito|adj|derivada|baj/L it/A o/G
flacucho|adj|derivada|flac/L uch/A o/G
debilucho|adj|derivada|debil/L uch/A o/G
feúcho|adj|derivada|fe/L úch/A o/G
buenísimo|adj|derivada|buen/L ísim/A o/G
rapidísimo|adj|derivada|rapid/L ísim/A o/G
tristísimo|adj|derivada|trist/L ísim/A o/G
riquísimo|adj|derivada|riqu/L ísim/A o/G
larguísimo|adj|derivada|largu/L ísim/A o/G
blanquísimo|adj|derivada|blanqu/L ísim/A o/G
felicísimo|adj|derivada|felic/L ísim/A o/G
carísimo|adj|derivada|car/L ísim/A o/G
lentísimo|adj|derivada|lent/L ísim/A o/G
listísimo|adj|derivada|list/L ísim/A o/G
grandísimo|adj|derivada|grand/L ísim/A o/G
contentísimo|adj|derivada|content/L ísim/A o/G
cortísimo|adj|derivada|cort/L ísim/A o/G
malísimo|adj|derivada|mal/L ísim/A o/G
injusto|adj|derivada|in/P just/L o/G
incapaz|adj|derivada|in/P capaz/L
incómodo|adj|derivada|in/P cómod/L o/G
incorrecto|adj|derivada|in/P correct/L o/G
inmaduro|adj|derivada|in/P madur/L o/G
inseguro|adj|derivada|in/P segur/L o/G
intranquilo|adj|derivada|in/P tranquil/L o/G
imperfecto|adj|derivada|im/P perfect/L o/G
impaciente|adj|derivada|im/P pacient/L e/V
impuro|adj|derivada|im/P pur/L o/G
imprudente|adj|derivada|im/P prudent/L e/V
ilegal|adj|derivada|i/P leg/L al/S
ilógico|adj|derivada|i/P lóg/L ic/S o/G
desleal|adj|derivada|des/P leal/L
desigual|adj|derivada|des/P igual/L
descortés|adj|derivada|des/P cortés/L
antinatural|adj|derivada|anti/P natur/L al/S
prehistórico|adj|derivada|pre/P histór/L ic/S o/G
posmoderno|adj|derivada|pos/P modern/L o/G
ultramoderno|adj|derivada|ultra/P modern/L o/G
sobrehumano|adj|derivada|sobre/P human/L o/G
infrahumano|adj|derivada|infra/P human/L o/G
extraoficial|adj|derivada|extra/P ofici/L al/S
internacional|adj|derivada|inter/P nacion/L al/S
multicolor|adj|derivada|multi/P color/L
bicolor|adj|derivada|bi/P color/L
tricolor|adj|derivada|tri/P color/L
amoral|adj|derivada|a/P mor/L al/S
apolítico|adj|derivada|a/P polít/L ic/S o/G
desdichado|adj|parasintética|des/P dich/L ad/S o/G
atigrado|adj|parasintética|a/P tigr/L ad/S o/G
verdiblanco|adj|compuesta|verd/L i/I blanc/L o/G
rojiblanco|adj|compuesta|roj/L i/I blanc/L o/G
manirroto|adj|compuesta|man/L i/I rrot/L o/G
barbilampiño|adj|compuesta|barb/L i/I lampiñ/L o/G
ojinegro|adj|compuesta|oj/L i/I negr/L o/G
pelirrubio|adj|compuesta|pel/L i/I rrubi/L o/G
sordociego|adj|compuesta|sord/L o/I cieg/L o/G
hispanoamericano|adj|compuesta|hispan/L o/I americ/L an/S o/G
mejor|adj|simple|mejor/L|||Comparativo sintético de bueno: la forma ya expresa el grado (= más bueno).
peor|adj|simple|peor/L|||Comparativo sintético de malo: la forma ya expresa el grado (= más malo).
mayor|adj|simple|mayor/L|||Comparativo sintético de grande: la forma ya expresa el grado (= más grande).
menor|adj|simple|menor/L|||Comparativo sintético de pequeño: la forma ya expresa el grado (= más pequeño).
mejores|adj|simple|mejor/L es/N|||Comparativo sintético de bueno: la forma ya expresa el grado (= más buenos).
mayores|adj|simple|mayor/L es/N|||Comparativo sintético de grande: la forma ya expresa el grado (= más grandes).
óptimo|adj|simple|óptim/L o/G|||Superlativo culto heredado del latín: ‑imo no se separa como sufijo porque en español no forma palabras nuevas. Equivale a buenísimo.
pésimo|adj|simple|pésim/L o/G|||Superlativo culto heredado del latín: ‑imo no se separa como sufijo porque en español no forma palabras nuevas. Equivale a malísimo.
máximo|adj|simple|máxim/L o/G|||Superlativo culto heredado del latín: ‑imo no se separa como sufijo porque en español no forma palabras nuevas. Equivale a grandísimo.
mínima|adj|simple|mínim/L a/G|||Superlativo culto heredado del latín: ‑imo no se separa como sufijo porque en español no forma palabras nuevas. Equivale a pequeñísima.
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
    sse: 'pretérito imperfecto de subjuntivo (‑se)', indef: 'pretérito perfecto simple de indicativo', sfut: 'futuro simple de subjuntivo'
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
    const [palabra, cat, form, segTxt, altTxt = '', ...resto] = linea.split('|');
    const nota = resto.filter(Boolean).join(' '); // la nota es el último campo (se admite «||» o «|||» antes)
    const segs = segTxt.trim().split(/\s+/).map(s => { const i = s.lastIndexOf('/'); return [s.slice(0, i), s.slice(i + 1)]; });
    let n = nota;
    if (!n && form === 'parasintética') n = NOTA_PARA;
    if (!n && segs.some(s => s[0] === 'ísim')) n = NOTA_ISIM;
    if (!n && cat === 'adv' && segs.some(s => s[0] === 'mente')) n = NOTA_MENTE;
    const ultimo = segs.filter(s => s[1] !== 'N').at(-1); // la nota es sobre la vocal final (cas-a-s), no sobre la de trabaj-a-dor
    if (!n && ultimo[1] === 'V' && cat !== 'ver' && form !== 'compuesta') n = NOTA_V;
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

  // ───────── Explicaciones de la corrección ─────────
  const PREF = {
    des: 'negación o inversión de lo que indica la base', in: 'negación', im: 'negación', ir: 'negación (in‑ se escribe ir‑ ante r)',
    re: 'repetición', pre: 'anterioridad', sub: 'posición inferior («debajo de»)', ante: 'anterioridad o posición delantera',
    sobre: 'posición superior («por encima de»)', contra: 'oposición', super: 'superioridad', mini: 'tamaño pequeño',
    bis: '«dos veces»: un grado más de parentesco', pos: 'posterioridad', ex: '«que ha dejado de ser»', a: 'negación',
    hiper: 'superioridad o exceso', entre: 'posición intermedia («entre»)', tatar: 'parentesco aún más lejano (abuelo → bisabuelo → tatarabuelo)',
    co: 'compañía o participación conjunta', semi: '«medio» o «casi»', multi: '«muchos»', bi: '«dos»', tri: '«tres»',
    anti: 'oposición («contra»)', ultra: '«más allá de», en grado extremo', extra: '«fuera de»', inter: '«entre» varios',
    infra: '«por debajo de»', i: 'negación (in‑ se escribe i‑ ante l)'
  };
  const APREC = { it: 'diminutivo', ill: 'diminutivo', uch: 'despectivo', az: 'aumentativo', ot: 'aumentativo', 'ón': 'aumentativo', on: 'aumentativo', 'úch': 'despectivo', 'ísim': 'superlativo' };
  const GENTILICIOS = new Set('americano africano colombiano italiano sevillano valenciano mexicano peruano cubano venezolano malagueño panameño brasileño hondureño caribeño francés portugués japonés holandés cordobés aragonés canadiense ateniense nicaragüense hispanoamericano'.split(' '));
  const PLANTAS = new Set('naranjal olivar pinar trigal maizal arrozal manzanar melonar castañar encinar robledal'.split(' '));
  // valor de cada sufijo derivativo según la categoría de la palabra
  function valorSufijo(it, i) {
    const s = it.segs[i][0], sig = it.segs[i + 1] && it.segs[i + 1][0], ant = it.segs[i - 1] && it.segs[i - 1][0];
    const nombre = it.cat === 'sus', verbo = it.cat === 'ver', adj = it.cat === 'adj', p = it.palabra;
    switch (s) {
      case 'er': return adj && sig !== 'ía' ? 'relación o pertenencia: «propio de lo que indica el lexema»' : sig === 'ía' ? 'junto con ‑ía forma el sufijo ‑ería' : it.palabra === 'quinceañero' ? 'persona caracterizada por lo que indica la base: «que tiene quince años»' : 'oficio, objeto o lugar relacionado con el lexema';
      case 'ía': return ant === 'er' ? 'lugar o establecimiento' : 'cualidad';
      case 'dor': return 'agente, lugar o instrumento de la acción del verbo';
      case 'nte': return 'agente: quien realiza la acción del verbo';
      case 'der': return sig === 'a' ? 'instrumento con el que se realiza la acción' : 'lugar donde se realiza la acción';
      case 'ción': case 'nz': case 'mient': return 'acción o efecto del verbo';
      case 'ur': return p === 'pintura' ? 'acción o efecto del verbo' : 'cualidad';
      case 'dur': return p === 'cerradura' ? 'instrumento de la acción del verbo' : 'acción o efecto del verbo';
      case 'aj': return ['plumaje', 'ramaje'].includes(p) ? 'conjunto: forma un sustantivo colectivo' : 'acción o efecto del verbo';
      case 'idad': case 'edad': return 'cualidad (variante de ‑dad)';
      case 'ism': case 'ísm': return 'doctrina, actitud o actividad';
      case 'íst': return 'persona que tiene esa actitud';
      case 'ient': return 'que tiene o padece lo que indica el lexema';
      case 'ic': case 'ial': case 'iv': return 'relación o pertenencia';
      case 'an': case 'eñ': case 'és': case 'iense': case 'ense': return GENTILICIOS.has(p) ? 'gentilicio: indica el lugar de origen' : 'relación o pertenencia';
      case 'ez': case 'dad': return 'cualidad';
      case 'az': return 'golpe dado con lo que indica el lexema';
      case 'al': case 'ar': return nombre && PLANTAS.has(p) ? 'lugar donde abunda la planta que indica el lexema' : 'relación o pertenencia';
      case 'ed': return 'conjunto o lugar donde abunda lo que indica el lexema';
      case 'ist': return ['optimista', 'pesimista'].includes(p) ? 'persona que tiene esa actitud' : 'oficio o actividad';
      case 'iz': return verbo || (it.segs[i + 1] && it.segs[i + 1][1] === 'V') ? 'verbalizador: «hacer o convertir en»' : p === 'enfermizo' ? 'propensión o tendencia' : 'semejanza o tendencia de color';
      case 'ific': return 'verbalizador: «hacer o convertir en»';
      case 'ent': case 'áce': return 'semejanza o tendencia';
      case 'os': return 'abundancia o cualidad';
      case 'ud': return 'abundancia o tamaño grande';
      case 'ad': return 'que tiene o se parece a lo que indica el lexema';
      case 'in': return ant === 'ec' ? 'semejanza: «que tira a»' : p === 'cristalino' ? 'semejanza: «como el cristal»' : 'relación o pertenencia';
      case 'áne': case 'ieg': case 'il': return 'relación o pertenencia';
      case 'ble': return 'posibilidad o merecimiento';
      case 'tiv': return 'tendencia o capacidad';
      case 'ec': return 'verbalizador que, junto con el prefijo, forma la parasíntesis';
      case 'e': return 'verbalizador: forma verbos en ‑ear a partir de nombres o adjetivos';
      case 'it': return 'valor atenuativo o frecuentativo («dormir a ratos»)';
      case 'mente': return 'forma adverbios de modo a partir de adjetivos';
      default: return '';
    }
  }
  const PERS_X = ['1.ª persona del singular', '2.ª persona del singular', '3.ª persona del singular', '1.ª persona del plural', '2.ª persona del plural', '3.ª persona del plural'];
  const conjDe = it => { const v = it.verbo || it.palabra; return { ar: '1.ª conjugación (‑ar)', er: '2.ª conjugación (‑er)', ir: '3.ª conjugación (‑ir)' }[v.slice(-2)]; };

  // familias léxicas: palabras analizadas a mano (e infinitivos generados) con el mismo lexema
  // mesa/mes, libro/libre, malo/mal, sal/sala, cara/caro, pelo/pelar, puerta/portar…: mismo segmento, distinto lexema
  const HOMONIMOS = new Set(['mes', 'libr', 'mal', 'sal', 'car', 'sed', 'port', 'pic', 'cre', 'vent', 'jug', 'pel', 'mud', 'fin', 'cos', 'cort']);
  const FAMILIA = {};
  for (const it of ITEMS) {
    if (it.tiempo && it.tiempo !== 'inf') continue;
    for (const [s, t] of it.segs) if (t === 'L' && !HOMONIMOS.has(s)) (FAMILIA[s] = FAMILIA[s] || []).push(it);
  }
  const familia = (it, s) => [...new Set((FAMILIA[s] || []).filter(o => o.palabra !== it.palabra && !(it.verbo && o.verbo === it.verbo)).map(o => o.segs.map(x => x[0]).join('-')))].slice(0, 3);

  function explicarMorfema(it, i) {
    const [s0, t] = it.segs[i];
    const s = s0, g = (i > 0 ? '‑' : '') + s0 + (i < it.segs.length - 1 ? '‑' : ''); // «‑ble» al final, «‑ble‑» en medio
    const ant = it.segs[i - 1], sig = it.segs[i + 1];
    const compuesta = it.segs.filter(x => x[1] === 'L').length > 1;
    switch (t) {
      case 'L': {
        const f = familia(it, s);
        return `«${s}» es el lexema: aporta el significado léxico${f.length ? ` y se repite en su familia (${f.join(', ')})` : ''}.`;
      }
      case 'P':
        if (it.form === 'parasintética') return `«${s}‑» es un prefijo que se añade a la vez que el sufijo o la terminación verbal (parasíntesis).`;
        return `«${s}‑» es un prefijo: va delante del lexema y aporta ${PREF[s] || 'un matiz de significado'}.`;
      case 'S': {
        const v = valorSufijo(it, i);
        if (s === 'mente') return '«‑mente» es un sufijo: forma adverbios de modo a partir de adjetivos.';
        return `«${g}» es un sufijo derivativo${v ? ` (${v})` : ''}: forma una palabra nueva a partir de la base.`;
      }
      case 'A':
        return `«${g}» es un sufijo apreciativo (${APREC[s] || 'valor afectivo'}): matiza el significado sin cambiar la categoría.`;
      case 'I':
        return compuesta && ant && ant[1] === 'L' && sig && sig[1] === 'L'
          ? `«${g}» es un interfijo: une los dos lexemas del compuesto y no tiene significado.`
          : `«${g}» es un interfijo: une el lexema con el sufijo y no tiene significado propio, por eso no es un sufijo.`;
      case 'G':
        if (sig && sig[0] === 'mente') return `«${g}» es el morfema de género femenino: los adverbios en ‑mente se forman sobre el femenino del adjetivo.`;
        return `«${g}» es el morfema de género: alterna con «‑${s === 'a' ? 'o' : 'a'}» para marcar ${s === 'a' ? 'femenino' : 'masculino'}.`;
      case 'N':
        return `«${g}» es el morfema de número: marca el plural${s === 'es' ? ' (‑es tras consonante)' : ''}.`;
      case 'V':
        if (it.cat === 'ver') {
          const c = (it.verbo || it.palabra).slice(-2), v = sinTilde(s);
          if (c === 'ar') return `«${g}» es la vocal temática de la 1.ª conjugación (‑ar).`;
          if (it.tiempo === 'impf' || v === 'ie') return `«${g}» es la vocal temática; en este tiempo es común a la 2.ª y la 3.ª conjugación.`;
          if (c === 'ir' && v === 'e') return `«${g}» es la vocal temática; en este tiempo la 3.ª conjugación (‑ir) comparte la ‑e‑ con la 2.ª.`;
          return `«${g}» es la vocal temática de la ${conjDe(it)}.`;
        }
        if (sig && ['D', 'E', 'R'].includes(sig[1])) return `«${g}» es la vocal temática del verbo, que se mantiene en el participio.`;
        if (sig && sig[1] === 'S' && sig[0] !== 'mente') return `«${g}» es la vocal temática del verbo del que procede la palabra; se mantiene ante el sufijo.`;
        if (sig && sig[1] === 'L') return `«${g}» es la vocal temática del primer elemento del compuesto; no marca género.`;
        if (sig && sig[0] === 'mente') return `«${g}» es la vocal temática del adjetivo, que no tiene variación de género.`;
        return `«${g}» es vocal temática: no marca género, porque no alterna con otra vocal para formar el masculino o el femenino de la misma palabra.`;
      case 'T':
        if (it.tiempo === 'spres') return `«${g}» es el morfema de tiempo, aspecto y modo del presente de subjuntivo; en este tiempo no hay vocal temática.`;
        return `«${g}» es el morfema de tiempo, aspecto y modo: indica ${TIEMPOS_V[it.tiempo] || 'el tiempo verbal'}.`;
      case 'X':
        if (it.tiempo === 'pres' && it.persona === 0) return '«‑o» es la desinencia de 1.ª persona del singular del presente de indicativo: amalgama número, persona, tiempo y modo, y no lleva vocal temática.';
        return `«${g}» es el morfema de número y persona: ${PERS_X[it.persona] || 'persona y número'}.`;
      case 'R': return '«‑r» es el morfema de infinitivo.';
      case 'E': return '«‑ndo» es el morfema de gerundio.';
      case 'D': return '«‑d‑» es el morfema de participio.';
    }
    return '';
  }
  const FORMACION = {
    simple: 'Es una palabra simple: un solo lexema y únicamente morfemas flexivos.',
    derivada: 'Es una palabra derivada: un lexema con afijos derivativos (prefijos, sufijos o interfijos).',
    compuesta: 'Es una palabra compuesta: tiene más de un lexema.',
    'parasintética': 'Es parasintética: el prefijo y el sufijo (o la composición y la derivación) se añaden a la vez; no existe la palabra solo con uno de ellos.'
  };
  // Explicación de un fallo: por qué hay que separar cada frontera que faltó y por qué no se parte un morfema
  function explicar(it, faltan, sobran) {
    const morfIdx = pos => { let a = 0; for (let i = 0; i < it.segs.length; i++) { const L = sinTilde(it.segs[i][0]).length; if (pos < a + L) return i; a += L; } return it.segs.length - 1; };
    const out = [], usados = new Set();
    const add = i => { if (!usados.has(i)) { usados.add(i); out.push(explicarMorfema(it, i)); } };
    for (const p of faltan) { const i = morfIdx(p); add(i - 1); add(i); }
    for (const p of sobran) {
      const i = morfIdx(p), [s, t] = it.segs[i];
      out.push(`«${s}» es un solo morfema (${TIPOS[t]}): no se puede partir, porque sus trozos no tienen significado ni función por separado.`);
      add(i);
    }
    if (it.tiempo && !['inf', 'ger', 'par'].includes(it.tiempo) && !it.segs.some(x => x[1] === 'X'))
      out.push('En esta persona el morfema de número y persona es cero: no tiene forma visible.');
    if (it.tiempo && it.form === 'simple') out.push(`Es una forma flexiva del verbo «${it.verbo}»: no tiene afijos derivativos, solo lexema y morfemas flexivos.`);
    else out.push(FORMACION[it.form]);
    return out.filter(Boolean);
  }

  // ───────── Paso 2: identificar el tipo de cada morfema y la formación ─────────
  // Tipos que se aceptan para cada morfema; el primero es el criterio de la app y el resto,
  // variantes de manual que también se dan por buenas (con una nota).
  function tiposAceptados(it, i) {
    const [s, t] = it.segs[i], sig = it.segs[i + 1];
    const finalNominal = it.cat !== 'ver' && (!sig || sig[1] === 'N') && t === 'V';
    if (finalNominal) return { tipos: ['V', 'G'], nota: 'Se acepta «morfema de género»: algunos manuales llaman así a esta vocal aunque no tenga oposición de género.' };
    if (t === 'S' && s === 'ec' && it.cat === 'ver') return { tipos: ['S', 'I'], nota: 'Se acepta «interfijo»: algunos manuales analizan así el ‑ec‑ de los verbos en ‑ecer.' };
    if (t === 'A') return { tipos: ['A', 'S'], nota: `Se acepta «sufijo», aunque es más preciso decir «sufijo apreciativo» (${APREC[s] || 'valor afectivo'}).` };
    if (t === 'X' && it.tiempo === 'pres' && it.persona === 0) return { tipos: ['X', 'T'], nota: 'Se acepta «tiempo, aspecto y modo»: la ‑o amalgama persona, número, tiempo y modo.' };
    return { tipos: [t], nota: '' };
  }
  function formasAceptadas(it) {
    if (it.cat === 'adv' && it.segs.some(x => x[0] === 'mente')) return { formas: ['derivada', 'compuesta'], nota: 'Se acepta «compuesta»: algunos manuales consideran compuestos los adverbios en ‑mente.' };
    if (it.cat === 'ver' && ['mal', 'menos'].includes(it.segs[0][0])) return { formas: ['compuesta', 'derivada'], nota: `Se acepta «derivada»: algunos manuales tratan «${it.segs[0][0]}‑» como prefijo.` };
    return { formas: [it.form], nota: '' };
  }
  function porQueFormacion(it) {
    const tipos = it.segs.map(x => x[1]), nL = tipos.filter(t => t === 'L').length;
    const af = it.segs.filter(x => ['P', 'S', 'A', 'I'].includes(x[1])).map(x => x[0]);
    if (it.form === 'simple') return 'Es simple: tiene un solo lexema y únicamente morfemas flexivos, sin prefijos ni sufijos derivativos.';
    if (it.form === 'derivada') return `Es derivada: un solo lexema con afijos derivativos (${af.map(a => `«${a}»`).join(', ')}).`;
    if (it.form === 'compuesta') return `Es compuesta: tiene ${nL} lexemas (${it.segs.filter(x => x[1] === 'L').map(x => `«${x[0]}»`).join(' y ')}).`;
    return FORMACION['parasintética'];
  }
  function corregirIdentificacion(it, puestos, formaPuesta) {
    const morfemas = it.segs.map((seg, i) => {
      const acc = tiposAceptados(it, i), puesto = puestos[i];
      const ok = acc.tipos.includes(puesto);
      return { i, seg: seg[0], correcto: seg[1], puesto, ok, nota: ok && puesto !== seg[1] ? acc.nota : '' };
    });
    const fa = formasAceptadas(it);
    const formOk = fa.formas.includes(formaPuesta);
    const porque = [];
    for (const m of morfemas) if (!m.ok) porque.push(`«${(m.i > 0 ? '‑' : '') + m.seg + (m.i < it.segs.length - 1 ? '‑' : '')}» no es ${TIPOS[m.puesto] || 'eso'}. ${explicarMorfema(it, m.i)}`);
    if (!formOk) porque.push(`No es una palabra ${formaPuesta}. ${porQueFormacion(it)}`);
    const notas = [...morfemas.filter(m => m.nota).map(m => m.nota), ...(formOk && formaPuesta !== it.form ? [fa.nota] : [])];
    return { ok: morfemas.every(m => m.ok) && formOk, morfemas, formOk, formaPuesta, porque, notas };
  }

  // ───────── Paso 3: redactar el análisis ─────────
  const CLAVES = [ // orden de prioridad: lo más específico primero
    ['X', /numero y persona|persona y numero|morfema de persona|desinencia de persona/g],
    ['T', /tiempo,? aspecto y modo|tiempo y modo|modo y tiempo|aspecto y modo|tiempo|aspecto|modo/g],
    ['A', /sufijo(?: derivativo)?(?: apreciativo)?(?: de grado)? (?:diminutivo|aumentativo|despectivo|superlativo)|sufijo(?: derivativo)? apreciativo|apreciativo|diminutivo|aumentativo|despectivo|superlativo/g],
    ['S', /sufijo|verbalizador/g], ['P', /prefijo/g], ['I', /interfijo|infijo/g],
    ['V', /vocal tematica|tematica|\bvt\b/g], ['G', /genero/g], ['N', /numero|plural/g],
    ['L', /lexema|raiz/g], ['R', /infinitivo/g], ['E', /gerundio/g], ['D', /participio/g]
  ];
  const FORMAS_CLAVE = [['parasintética', /parasint/g], ['compuesta', /compuest|composicion/g], ['derivada', /derivad|derivacion/g], ['simple', /\bsimple/g]];
  const normalizar = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[‑–—]/g, '-').replace(/[«»“”"']/g, ' ');
  function corregirRedaccion(it, texto) {
    let t = ' ' + normalizar(texto) + ' ';
    const blanco = m => ' '.repeat(m.length);
    t = t.replace(/adverbios? de modo/g, blanco);                    // «modo» aquí no es el morfema verbal
    t = t.replace(/[a-z]+(?:-[a-z]+)+/g, blanco);                    // la segmentación completa (pan-ad-er-o) no cuenta como mención
    // palabras clave de tipo, sin solapes
    const claves = [];
    for (const [tipo, re] of CLAVES) for (const m of t.matchAll(re)) {
      const a = m.index, b = a + m[0].length;
      if (!claves.some(k => a < k.b && b > k.a)) claves.push({ tipo, a, b });
    }
    // límites de oración: la palabra clave debe estar en la misma oración que el morfema
    // oraciones: . ; y salto de línea · cláusulas: además comas y la conjunción «y» (fuera de «número y persona», etc.)
    const enClave = p => claves.some(k => p >= k.a && p < k.b);
    const cortesO = [], cortesC = [];
    for (let k = 0; k < t.length; k++) if ('.;\n'.includes(t[k])) { cortesO.push(k); cortesC.push(k); } else if (t[k] === ',') cortesC.push(k);
    for (const m of t.matchAll(/ (?:y|e) /g)) if (!enClave(m.index + 1)) cortesC.push(m.index + 1);
    const cuenta = cortes => pos => cortes.filter(k => k < pos).length;
    const oracion = cuenta(cortesO), clausula = cuenta(cortesC);
    const menciones = {};
    for (const seg of new Set(it.segs.map(x => sinTilde(x[0])))) {
      const corto = seg.length <= 2 || !it.segs.some(x => sinTilde(x[0]) === seg && x[1] === 'L') && seg.length <= 3;
      const re = new RegExp(corto ? `(?<![a-z])(-${seg}-?|${seg}-)(?![a-z])` : `(?<![a-z])-?${seg}-?(?![a-z])`, 'g');
      menciones[seg] = [...t.matchAll(re)].map(m => {
        const pos = m.index, fin = pos + m[0].length, o = oracion(pos);
        // primero la palabra clave de la misma cláusula (entre comas); si no hay, la más cercana de la oración
        const c = clausula(pos), dist = k => ({ ...k, d: k.a >= fin ? k.a - fin : pos - k.b });
        let cand = claves.filter(k => clausula(k.a) === c).map(dist);
        if (!cand.length) cand = claves.filter(k => oracion(k.a) === o).map(dist);
        cand.sort((x, y) => x.d - y.d);
        return cand.length ? cand[0].tipo : null;
      });
    }
    // reparto: cada morfema necesita una mención de su segmento con un tipo aceptado
    const usadas = {};
    const morfemas = it.segs.map((seg, i) => {
      const s = sinTilde(seg[0]), lista = menciones[s] || [], acc = tiposAceptados(it, i).tipos;
      usadas[s] = usadas[s] || new Set();
      const k = lista.findIndex((tipo, j) => !usadas[s].has(j) && acc.includes(tipo));
      if (k >= 0) { usadas[s].add(k); return { i, seg: seg[0], correcto: seg[1], estado: 'ok' }; }
      const otra = lista.findIndex((tipo, j) => !usadas[s].has(j));
      if (otra >= 0) { usadas[s].add(otra); return { i, seg: seg[0], correcto: seg[1], estado: lista[otra] ? 'mal' : 'sin-tipo', puesto: lista[otra] }; }
      return { i, seg: seg[0], correcto: seg[1], estado: 'falta' };
    });
    const dichas = FORMAS_CLAVE.filter(([, re]) => re.test(t)).map(([f]) => f);
    FORMAS_CLAVE.forEach(([, re]) => re.lastIndex = 0);
    const fa = formasAceptadas(it).formas;
    const form = dichas.some(f => fa.includes(f)) ? 'ok' : dichas.length ? 'mal' : 'falta';
    const porque = [];
    for (const m of morfemas) {
      const tipo = TIPOS[m.correcto], g = (m.i > 0 ? '‑' : '') + m.seg + (m.i < it.segs.length - 1 ? '‑' : '');
      if (m.estado === 'falta') porque.push(`Falta «${g}»: tienes que nombrarlo e identificarlo como ${tipo}.`);
      else if (m.estado === 'sin-tipo') porque.push(`Nombras «${g}» pero no dices qué es: es ${tipo}.`);
      else if (m.estado === 'mal') porque.push(`Identificas «${g}» como ${TIPOS[m.puesto]}, pero es ${tipo}. ${explicarMorfema(it, m.i)}`);
    }
    if (form === 'falta') porque.push(`Falta decir cómo está formada la palabra. ${porQueFormacion(it)}`);
    if (form === 'mal') porque.push(`La palabra no es ${dichas.join(' ni ')}. ${porQueFormacion(it)}`);
    return { ok: morfemas.every(m => m.estado === 'ok') && form === 'ok', morfemas, form, porque };
  }
  const NOMBRE_RED = {
    L: 'lexema (raíz)', P: 'prefijo (morfema derivativo)', S: 'sufijo derivativo', A: 'sufijo apreciativo (derivativo)', I: 'interfijo',
    G: 'morfema flexivo de género', N: 'morfema flexivo de número', V: 'vocal temática', T: 'morfema flexivo de tiempo, aspecto y modo',
    X: 'morfema flexivo de número y persona', R: 'morfema de infinitivo', E: 'morfema de gerundio', D: 'morfema de participio'
  };
  function redaccionModelo(it) {
    const cat = it.tiempo ? `${TIEMPOS_V[it.tiempo]} de «${it.verbo}»` : CATS[it.cat];
    const partes = it.segs.map(([s, t], i) => `${(i > 0 && t !== 'L' ? '-' : '') + s + (i < it.segs.length - 1 ? '-' : '')}: ${NOMBRE_RED[t]}`);
    return `«${it.palabra}» (${cat}) se segmenta ${it.segs.map(x => x[0]).join('-')}. ${partes.join('; ')}. ${porQueFormacion(it)}`;
  }

  const API = { ITEMS, TIPOS, CATS, TIEMPOS_V, PERS, aceptadas, fronteras, formatear, sinTilde, explicar, explicarMorfema,
    tiposAceptados, formasAceptadas, corregirIdentificacion, corregirRedaccion, redaccionModelo, porQueFormacion };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.Morfemas = API;
})(typeof window !== 'undefined' ? window : globalThis);
