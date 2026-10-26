// Clasificación gramatical de cada palabra de la base (lo que se pide en 2.º de Bachillerato
// después del análisis morfológico). Revisada a mano palabra a palabra.
//
// Sustantivos · código de 6 letras:
//   1 C concreto · A abstracto        2 I individual · L colectivo
//   3 K contable · N no contable · B según el sentido
//   4 m masculino · f femenino · x según el referente (común en cuanto al género)
//   5 tipo de género: v variable (niño/niña) · f inherente (casa) · c común (el/la dentista)
//                     e epiceno (el pez macho/hembra) · a ambiguo (el/la mar) · h heterónimo (hombre/mujer)
//   6 número: s singular · p plural · i invariable (el/los sacacorchos)
// Todos son comunes (ninguno es nombre propio).
(function (global) {
  'use strict';
  const SUS = `
niñas CIKfvp|gatos CIKmvp|hijos CIKmvp|perras CIKfvp|amigas CIKfvp|casas CIKffp|libros CIKmfp|mesas CIKffp|coches CIKmfp|árboles CIKmfp
leones CIKmvp|paredes CIKffp|zapatero CIKmvs|zapatería CIKffs|librero CIKmvs|librería CIKffs|jardinero CIKmvs|carnicero CIKmvs|panadero CIKmvs
panadería CIKffs|frutero CIKmvs|frutería CIKffs|lechero CIKmvs|cartero CIKmvs|basurero CIKmvs|relojero CIKmvs|cocinero CIKmvs|camionero CIKmvs
florero CIKmfs|salero CIKmfs|azucarero CIKmfs|llavero CIKmfs|monedero CIKmfs|hormiguero CIKmfs|enfermería CIKffs|organización AIBffs
alimentación AINffs|lavadora CIKffs|nadador CIKmvs|jugador CIKmvs|comedor CIKmfs|vendedor CIKmvs|corredor CIKmvs|cantante CIKxcs
estudiante CIKxcs|dibujante CIKxcs|hablante CIKxcs|lavadero CIKmfs|enseñanza AIBffs|esperanza AIBffs|venganza AIBffs|pintura CIBffs
belleza AINffs|tristeza AINffs|pobreza AINffs|maldad AIBffs|crueldad AIBffs|hermandad AIBffs|igualdad AINffs|cobardía AIBffs|alegría AIBffs
valentía AIBffs|casita CIKffs|perrito CIKmvs|librito CIKmfs|cochazo CIKmfs|casucha CIKffs|pececillo CIKmes|panecillo CIKmfs|lucecita CIKffs
nubecita CIKffs|hombrecillo CIKmhs|solecito CIBmfs|cochecito CIKmfs|cabezazo CIKmfs|codazo CIKmfs|naranjal CLKmfs|olivar CLKmfs|pinar CLKmfs
arboleda CLKffs|dentista CIKxcs|pianista CIKxcs|artista CIKxcs|periodista CIKxcs|subsuelo CIKmfs|antebrazo CIKmfs|exnovio CIKmvs
superhombre CIKmhs|minifalda CIKffs|bisabuelo CIKmvs|prehistoria AINffs|posguerra AIBffs|desorden AIBmfs|desamor AINmfs|sacacorchos CIKmfi
abrelatas CIKmfi|lavaplatos CIKmfi|rascacielos CIKmfi|cortaúñas CIKmfi|cumpleaños AIKmfi|pasatiempo AIKmfs|matamoscas CIKmfi|salvavidas CIKmfi
guardaespaldas CIKxci|parabrisas CIKmfi|aguafiestas CIKxci|girasol CIKmfs|bocacalle CIKffs|bocamanga CIKffs|hierbabuena CIBffs|baloncesto AINmfs
coliflor CIKffs|picapedrero CIKmvs|ropavejero CIKmvs|quinceañero CIKmvs|sietemesino CIKmvs|niños CIKmvp|abuelas CIKfvp|primos CIKmvp|tías CIKfvp
lobas CIKfvp|maestros CIKmvp|alumnas CIKfvp|vecinos CIKmvp|gata CIKfvs|abuelo CIKmvs|camas CIKffp|ventanas CIKffp|puertas CIKffp|sillas CIKffp
platos CIKmfp|vasos CIKmfp|manos CIKffp|llaves CIKffp|nubes CIKffp|calles CIKffp|noches CIKffp|trenes CIKmfp|flores CIKffp|relojes CIKmfp
luces CIKffp|peces CIKmep|voces CIKffp|lápices CIKmfp|ciudades CIKffp|mares CIKmap|sofás CIKmfp|gatito CIKmvs|niñito CIKmvs|abuelita CIKfvs
hermanito CIKmvs|mesita CIKffs|arbolito CIKmfs|cosita CIKffs|ratito AIKmfs|cafecito CIBmfs|pueblecito CIKmfs|florecita CIKffs|avecilla CIKfes
pajarillo CIKmes|perrillo CIKmvs|cosilla CIKffs|papelucho CIKmfs|animalucho CIKmes|cuartucho CIKmfs|perrazo CIKmvs|manaza CIKffs|golazo CIKmfs
casona CIKffs|hombrón CIKmhs|librote CIKmfs|martillazo CIKmfs|portazo CIKmfs|zapatazo CIKmfs|balonazo CIKmfs|latigazo CIKmfs|pelotazo CIKmfs
botellazo CIKmfs|escobazo CIKmfs|rodillazo CIKmfs|sartenazo CIKmfs|barbero CIKmvs|pastelero CIKmvs|joyero CIKmvs|granjero CIKmvs|banquero CIKmvs
cervecero CIKmvs|torero CIKmvs|vaquero CIKmvs|consejero CIKmvs|mensajero CIKmvs|enfermero CIKmvs|hotelero CIKmvs|guerrero CIKmvs|prisionero CIKmvs
carcelero CIKmvs|obrero CIKmvs|viajero CIKmvs|papelera CIKffs|perchero CIKmfs|trastero CIKmfs|bañera CIKffs|sopera CIKffs|panera CIKffs
ensaladera CIKffs|nevera CIKffs|pecera CIKffs|guantera CIKffs|cafetera CIKffs|cartera CIKffs|joyería CIKffs|pastelería CIKffs|carnicería CIKffs
papelería CIKffs|perfumería CIKffs|relojería CIKffs|cervecería CIKffs|cafetería CIKffs|mensajería CIKffs|fregadero CIKmfs|matadero CIKmfs
comedero CIKmfs|bebedero CIKmfs|paradero CIKmfs|regadera CIKffs|trabajador CIKmvs|ganador CIKmvs|luchador CIKmvs|pescador CIKmvs|cazador CIKmvs
ordenador CIKmfs|secador CIKmfs|mirador CIKmfs|bebedor CIKmvs|conocedor CIKmvs|servidor CIKmvs|repartidor CIKmvs|seguidor CIKmvs|consumidor CIKmvs
comerciante CIKxcs|navegante CIKxcs|caminante CIKxcs|ayudante CIKxcs|visitante CIKxcs|amante CIKxcs|dependiente CIKxcs|votación AIKffs
plantación CIKffs|navegación AINffs|educación AINffs|preparación AIBffs|explicación AIKffs|invitación AIKffs|observación AIKffs|celebración AIKffs
comunicación AIBffs|imitación AIBffs|población CLKffs|creación AIBffs|separación AIKffs|contaminación AINffs|actuación AIKffs|declaración AIKffs
repetición AIKffs|prohibición AIKffs|competición AIKffs|definición AIKffs|medición AIKffs|movimiento AIKmfs|conocimiento AIBmfs|sufrimiento AIBmfs
nacimiento AIKmfs|crecimiento AINmfs|pensamiento AIKmfs|sentimiento AIKmfs|entrenamiento AIKmfs|tratamiento AIKmfs|aburrimiento AINmfs
levantamiento AIKmfs|cumplimiento AINmfs|cerradura CIKffs|picadura CIKffs|quemadura CIKffs|rozadura CIKffs|mordedura CIKffs|confianza AINffs
matanza AIKffs|tardanza AINffs|añoranza AIBffs|alabanza AIKffs|crianza AINffs|mudanza AIKffs|adivinanza AIKffs|plumaje CLKmfs|ramaje CLKmfs
doblaje AIBmfs|montaje AIKmfs|rapidez AINffs|timidez AINffs|sencillez AINffs|vejez AINffs|niñez AINffs|madurez AINffs|palidez AINffs
estupidez AIBffs|grandeza AINffs|riqueza AIBffs|limpieza AIBffs|firmeza AINffs|torpeza AIBffs|rareza AIBffs|pureza AINffs|nobleza AINffs
dureza AINffs|flaqueza AIBffs|certeza AIBffs|delicadeza AIBffs|aspereza AIBffs|gentileza AIBffs|extrañeza AINffs|sutileza AIBffs|blancura AINffs
hermosura AINffs|dulzura AINffs|frescura AINffs|locura AIBffs|altura AIBffs|anchura AINffs|ternura AINffs|amargura AIBffs|finura AINffs
gordura AINffs|negrura AINffs|bondad AIBffs|falsedad AIBffs|suciedad AINffs|seriedad AINffs|variedad AIBffs|brevedad AINffs|felicidad AINffs
claridad AINffs|oscuridad AINffs|utilidad AIBffs|fragilidad AINffs|habilidad AIBffs|seguridad AINffs|sinceridad AINffs|comodidad AIBffs
cortesía AIBffs|lozanía AINffs|villanía AIBffs|optimismo AINmfs|pesimismo AINmfs|egoísmo AINmfs|realismo AINmfs|machismo AINmfs|heroísmo AINmfs
patriotismo AINmfs|ciclismo AINmfs|atletismo AINmfs|periodismo AINmfs|futbolista CIKxcs|taxista CIKxcs|ciclista CIKxcs|guitarrista CIKxcs
flautista CIKxcs|novelista CIKxcs|violinista CIKxcs|oficinista CIKxcs|deportista CIKxcs|trapecista CIKxcs|optimista CIKxcs|pesimista CIKxcs
egoísta CIKxcs|trigal CLKmfs|maizal CLKmfs|arrozal CLKmfs|manzanar CLKmfs|melonar CLKmfs|castañar CLKmfs|encinar CLKmfs|robledal CLKmfs
exalumno CIKmvs|bisnieto CIKmvs|tatarabuelo CIKmvs|coautor CIKmvs|copiloto CIKxcs|sobresueldo CIKmfs|sobrepeso AINmfs|sobremesa AIKffs
subgrupo CLKmfs|submundo AIKmfs|supermercado CIKmfs|hipermercado CIKmfs|antesala CIKffs|entresuelo CIKmfs|contraluz CINmas|contraveneno CIKmfs
contraataque AIKmfs|desacuerdo AIKmfs|desempleo AINmfs|deshonor AINmfs|desinterés AINmfs|desconfianza AINffs|inseguridad AIBffs|infelicidad AINffs
intranquilidad AINffs|semicírculo CIKmfs|semifinal AIKffs|pararrayos CIKmfi|tocadiscos CIKmfi|lanzallamas CIKmfi|quitanieves CIKmai|cascanueces CIKmfi
cuentagotas CIKmfi|tragaperras CIKffi|espantapájaros CIKmfi|trotamundos CIKxci|pintalabios CIKmfi|cortacésped CIKmas|sacapuntas CIKmfi
rompecabezas CIKmfi|pisapapeles CIKmfi|lavavajillas CIKmfi|portavoz CIKxcs|guardabosques CIKxci|guardarropa CIKmfs|matasellos CIKmfi
quitamanchas CIKmfi|cubrecama CIKmfs|cortafuegos CIKmfi|picaporte CIKmfs|tirachinas CIKmfi|pelagatos CIKxci|nochebuena CIKffs|camposanto CIKmfs
caradura CIKxcs|telaraña CIKffs|aguanieve CINffs|madreselva CIKffs|compraventa AIKffs|balonmano AINmfs|ferrocarril CIKmfs|altavoz CIKmfs
medianoche CIKffs|sinvergüenza CIKxcs|centrocampista CIKxcs|mileurista CIKxcs
`;
  const TIEMPO = 'Los sustantivos que nombran tiempo (noche, rato, sobremesa…) se clasifican de forma distinta según el manual: concretos para unos, abstractos para otros.';
  const NOTAS_SUS = {
    organización: 'Es abstracto como «acción de organizar»; nombra algo concreto y colectivo cuando es una entidad (una organización benéfica).',
    pintura: 'Concreto si nombra la materia o el cuadro; abstracto si nombra el arte o la acción de pintar.',
    hermandad: 'Abstracto como relación entre hermanos; colectivo si nombra una cofradía (la hermandad del barrio).',
    población: 'Colectivo: en singular nombra el conjunto de los habitantes. Es abstracto si nombra la acción de poblar.',
    invitación: 'Abstracto como acción de invitar; concreto si nombra la tarjeta.',
    nobleza: 'Abstracto como cualidad; colectivo si nombra el conjunto de los nobles.',
    suciedad: 'Abstracto como cualidad de sucio; concreto si nombra la mugre que se ve.',
    hormiguero: 'Nombra el lugar donde viven las hormigas; usado como «multitud» (un hormiguero de gente) es colectivo.',
    lavadora: 'Su femenino es inherente: nombra una máquina (no es el femenino de lavador).',
    dependiente: 'Común en cuanto al género (el/la dependiente); también existe el femenino dependienta.',
    mares: 'Ambiguo: el mar / la mar, sin cambio de significado (la mar es frecuente entre marineros y poetas).',
    contraluz: 'Ambiguo: el contraluz / la contraluz.',
    quitanieves: 'Se usa en los dos géneros (el/la quitanieves) y su plural es igual que el singular.',
    cortacésped: 'Se usa en los dos géneros (el/la cortacésped); plural cortacéspedes.',
    tragaperras: 'Femenino (la tragaperras, por «la máquina»); plural igual que el singular.',
    portavoz: 'Común en cuanto al género (el/la portavoz); plural portavoces.',
    pececillo: 'Epiceno: un solo género gramatical para los dos sexos (el pececillo macho / hembra).',
    peces: 'Epiceno: un solo género gramatical para los dos sexos (el pez macho / hembra).',
    avecilla: 'Epiceno: un solo género gramatical para los dos sexos (la avecilla macho / hembra).',
    pajarillo: 'Epiceno: el pajarillo macho / hembra.',
    animalucho: 'Epiceno: el animalucho macho / hembra.',
    noches: TIEMPO, ratito: TIEMPO, sobremesa: TIEMPO, nochebuena: TIEMPO, medianoche: TIEMPO,
    cumpleaños: 'Nombra un acontecimiento (abstracto); su número es invariable: el cumpleaños / los cumpleaños.',
    cafecito: 'No contable como sustancia (mucho café); contable como taza (dos cafecitos).',
    solecito: 'El sol (astro) es contable, pero «hace un solecito» nombra la luz y el calor, no contable.'
  };
  const HETERONIMOS = { hombrecillo: 'mujercilla', superhombre: 'supermujer', hombrón: 'mujerona' };

  const CLAS = {};
  for (const par of SUS.split(/[|\n]/)) { const [p, c] = par.trim().split(' '); if (p) CLAS[p] = c; }

  // el otro género de un sustantivo variable: niño → niña, trabajador → trabajadora, leones → leonas
  function otroGenero(it) {
    const i = it.segs.map(s => s[1]).lastIndexOf('G');
    if (i >= 0) return it.segs.map(([s], k) => k === i ? (s === 'o' ? 'a' : 'o') : s).join('');
    if (it.palabra === 'leones') return 'leonas';
    if (/or$/.test(it.palabra)) return it.palabra + 'a';
    return '';
  }

  const NOMBRES = {
    C: 'concreto', A: 'abstracto', I: 'individual', L: 'colectivo', K: 'contable', N: 'no contable', B: 'contable o no contable según el sentido',
    m: 'masculino', f: 'femenino', x: 'masculino o femenino según el referente', s: 'singular', p: 'plural', i: 'invariable en número'
  };
  const TIPO_GEN = { v: 'variable', f: 'inherente', c: 'común en cuanto al género', e: 'epiceno', a: 'ambiguo', h: 'heterónimo' };

  // rasgos de un sustantivo, con la explicación de cada uno
  function sustantivo(it) {
    const c = CLAS[it.palabra];
    if (!c) return null;
    const [ca, il, k, g, tg, n] = c;
    const otro = tg === 'v' ? otroGenero(it) : tg === 'h' ? HETERONIMOS[it.palabra] : '';
    const genTxt = { v: `variable: tiene forma para el otro género (${otro})`,
      f: 'inherente: no tiene forma para el otro género', c: 'común en cuanto al género: una sola forma, el artículo marca el sexo (el/la)',
      e: 'epiceno: una sola forma y un solo género para los dos sexos', a: 'ambiguo: admite los dos géneros sin cambiar de significado',
      h: `heterónimo: el otro sexo se nombra con otra palabra (${otro})` }[tg];
    const rasgos = [
      { k: 'comun', valor: 'común', txt: 'Común: nombra cualquier ser de su clase, no a uno en particular (no es nombre propio).' },
      { k: 'ca', valor: NOMBRES[ca], txt: ca === 'C' ? 'Concreto: nombra algo que se puede percibir con los sentidos.' : 'Abstracto: nombra una cualidad, acción, sentimiento o idea que no se percibe con los sentidos.' },
      { k: 'il', valor: NOMBRES[il], txt: il === 'L' ? 'Colectivo: en singular nombra un conjunto de seres de la misma clase.' : 'Individual: en singular nombra un solo ser.' },
      { k: 'cont', valor: NOMBRES[k], txt: k === 'K' ? 'Contable: se puede contar por unidades (admite numerales: dos, tres…).' : k === 'N' ? 'No contable: no se cuenta por unidades (mucha, poca…; no admite numerales en este sentido).' : 'Contable o no contable según el sentido en que se use.' },
      { k: 'gen', valor: tg === 'c' ? 'común en cuanto al género' : tg === 'a' ? 'ambiguo' : NOMBRES[g],
        txt: tg === 'c' || tg === 'a' ? `Género ${genTxt}.` : `Género ${NOMBRES[g]}, ${genTxt}.` },
      { k: 'num', valor: NOMBRES[n], txt: n === 'i' ? 'Número invariable: la misma forma en singular y en plural (el/los).' : n === 'p' ? 'Número plural.' : 'Número singular.' }
    ];
    return { codigo: c, ca, il, k, g, tg, n, tipoGenero: TIPO_GEN[tg], rasgos, nota: NOTAS_SUS[it.palabra] || '',
      resumen: `Sustantivo común, ${NOMBRES[ca]}, ${NOMBRES[il]}, ${NOMBRES[k]}; género ${tg === 'c' ? 'común (el/la)' : tg === 'a' ? 'ambiguo' : NOMBRES[g] + (tg === 'e' ? ' (epiceno)' : tg === 'h' ? ' (heterónimo)' : tg === 'v' ? ' (variable)' : '')}; número ${NOMBRES[n]}.` };
  }

  function clasificar(it) {
    if (it.cat === 'sus') return sustantivo(it);
    return null;
  }

  // ───────── Dificultad (1–5) y tiempo del desafío ─────────
  // 1 simple · 2 un afijo, o simple con alomorfo · 3 varios afijos, interfijo, alomorfo o vocal temática ante sufijo
  // 4 compuesta · 5 compuesta con interfijo o fusión de vocales, y parasintética
  const RARO = /alomorfo|grafía|funde|pierde|duplica|se escribe/;
  function dificultad(it) {
    const t = it.segs.map(s => s[1]), af = t.filter(x => 'PSAI'.includes(x)).length, raro = RARO.test(it.nota || '');
    if (it.form === 'parasintética') return 5;
    if (it.form === 'compuesta') return t.includes('I') || raro ? 5 : 4;
    if (it.form === 'simple') return raro ? 2 : 1;
    const deverbal = t.some((x, i) => x === 'V' && t[i + 1] === 'S'); // la vocal temática del verbo queda dentro (mov‑i‑mient‑o)
    return af >= 2 || deverbal || t.includes('I') || raro ? 3 : 2;
  }
  const MINUTOS = { 1: 2, 2: 2.5, 3: 3, 4: 3.5, 5: 4 }; // separar + redactar + clasificar
  const NIVELES = { 1: 'Muy fácil', 2: 'Fácil', 3: 'Media', 4: 'Difícil', 5: 'Muy difícil' };

  // ───────── Preguntas de clasificación del desafío ─────────
  // cada una: opciones [valor, texto] y las respuestas que se dan por buenas para una palabra
  const PREGUNTAS = {
    sus: [
      { k: 'ca', titulo: 'Concreto o abstracto', opciones: [['C', 'Concreto'], ['A', 'Abstracto']], buenas: c => [c.ca] },
      { k: 'il', titulo: 'Individual o colectivo', opciones: [['I', 'Individual'], ['L', 'Colectivo']], buenas: c => [c.il] },
      { k: 'cont', titulo: 'Contable o no contable', opciones: [['K', 'Contable'], ['N', 'No contable']], buenas: c => c.k === 'B' ? ['K', 'N'] : [c.k] },
      { k: 'gen', titulo: 'Género', opciones: [['m', 'Masculino'], ['f', 'Femenino'], ['x', 'Los dos (el/la)']],
        buenas: c => c.g === 'x' ? ['x'] : c.tg === 'a' ? ['x', c.g] : [c.g] },
      { k: 'tg', titulo: 'Tipo de género', opciones: [['v', 'Variable'], ['f', 'Inherente'], ['c', 'Común'], ['e', 'Epiceno'], ['a', 'Ambiguo'], ['h', 'Heterónimo']], buenas: c => [c.tg] },
      { k: 'num', titulo: 'Número', opciones: [['s', 'Singular'], ['p', 'Plural'], ['i', 'Invariable']], buenas: c => [c.n] }
    ]
  };

  const API = { clasificar, sustantivo, CLAS, NOMBRES, TIPO_GEN, dificultad, MINUTOS, NIVELES, PREGUNTAS };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.Clasificacion = API;
})(typeof window !== 'undefined' ? window : globalThis);
