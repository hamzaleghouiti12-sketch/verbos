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
      resumen: `Sustantivo común, ${NOMBRES[ca]}, ${NOMBRES[il]}, ${NOMBRES[k]}; género ${tg === 'c' ? 'común (el/la)' : tg === 'a' ? 'ambiguo' : NOMBRES[g] + ` (${TIPO_GEN[tg]})`}; número ${n === 'i' ? 'invariable' : NOMBRES[n]}.` };
  }

  // ───────── Adjetivos ─────────
  // Tipo: calificativo (cualidad, admite grado) o relacional (relación con un ámbito: «de + sustantivo», sin grado).
  // Los de la lista B funcionan como uno u otro según el uso (música infantil / actitud muy infantil).
  const GENTIL_ADJ = 'americano africano colombiano italiano sevillano valenciano mexicano peruano cubano venezolano malagueño panameño brasileño hondureño caribeño francés portugués japonés holandés cordobés aragonés canadiense ateniense nicaragüense hispanoamericano';
  const ADJ_R = new Set((GENTIL_ADJ + ' invernal primaveral otoñal cultural nacional lunar solar escolar prenatal submarino subterráneo mundial semanal digital regional tropical ornamental polar muscular atómico volcánico oceánico telefónico deportivo educativo marino navideño playero pesquero aldeano isleño internacional prehistórico hispanohablante').split(' '));
  const ADJ_B = new Set('musical teatral familiar infantil personal comercial central mortal sentimental emocional profesional tradicional histórico rítmico metálico festivo informativo decorativo veraniego juvenil casero dominguero mañanero posmoderno extraoficial'.split(' '));
  const GENTILES = new Set(GENTIL_ADJ.split(' '));
  const DOS_SIN_G = new Set('francés portugués japonés holandés cordobés aragonés cabezón'.split(' ')); // franc‑és / franc‑es‑a
  function adjetivo(it) {
    const p = it.palabra, segs = it.segs;
    const tipo = ADJ_R.has(p) ? 'R' : ADJ_B.has(p) ? 'B' : 'Q';
    const G = segs.find(s => s[1] === 'G'), dos = !!G || DOS_SIN_G.has(p);
    const g = !dos ? 'x' : G ? (G[0] === 'a' ? 'f' : 'm') : 'm';
    const n = segs.at(-1)[1] === 'N' ? 'p' : 's';
    const grado = segs.some(s => s[0] === 'ísim') ? 'S' : 'P';
    const aprec = segs.some(s => s[1] === 'A' && s[0] !== 'ísim');
    const fem = G ? segs.map(([s, t]) => t === 'G' ? (s === 'o' ? 'a' : 'o') : s).join('') : DOS_SIN_G.has(p) ? p.replace(/és$/, 'esa').replace(/ón$/, 'ona') : '';
    const tipoTxt = tipo === 'R' ? (GENTILES.has(p) ? 'Relacional (gentilicio): indica el lugar de origen; no admite grado (*muy ' + p + ') y va detrás del sustantivo.'
        : `Relacional: relaciona el sustantivo con un ámbito («de» + sustantivo); no admite grado (*muy ${p}) y va detrás del sustantivo.`)
      : tipo === 'B' ? `Relacional o calificativo según el uso: relacional cuando indica el ámbito (sin grado) y calificativo cuando expresa una cualidad (muy ${p}).`
      : 'Calificativo: expresa una cualidad del sustantivo y admite grado (muy …, ‑ísimo).';
    const rasgos = [
      { k: 'tipo', txt: tipoTxt },
      { k: 'term', txt: dos ? `De dos terminaciones: tiene forma de masculino y de femenino (${G && G[0] === 'a' ? fem + ' / ' + p : p + ' / ' + fem}).` : 'De una terminación: la misma forma vale para el masculino y el femenino.' },
      { k: 'grado', txt: grado === 'S' ? 'Grado superlativo absoluto: ‑ísimo expresa la cualidad en su grado máximo.' : `Grado positivo: expresa la cualidad sin compararla ni intensificarla${aprec ? ' (el sufijo apreciativo añade un matiz afectivo, no grado)' : ''}.` },
      { k: 'gen', txt: g === 'x' ? 'Género: invariable (sirve para masculino y femenino; concuerda con el sustantivo).' : `Género ${NOMBRES[g]}.` },
      { k: 'num', txt: n === 'p' ? 'Número plural.' : 'Número singular.' },
      { k: 'pos', txt: 'Especificativo o explicativo no se decide con la palabra suelta: depende de su posición y sentido en la frase.' }
    ];
    return { tipo, term: dos ? '2' : '1', grado, g, n, rasgos, nota: GENTILES.has(p) ? 'Los gentilicios son adjetivos relacionales: indican origen.' : '',
      resumen: `Adjetivo ${tipo === 'R' ? 'relacional' + (GENTILES.has(p) ? ' (gentilicio)' : '') : tipo === 'B' ? 'calificativo o relacional según el uso' : 'calificativo'}, de ${dos ? 'dos terminaciones' : 'una terminación'}, en grado ${grado === 'S' ? 'superlativo' : 'positivo'}; ${g === 'x' ? 'invariable en género' : NOMBRES[g]}, ${NOMBRES[n]}.` };
  }

  // ───────── Adverbios ─────────
  const ADV = { rápidamente: 'M', lentamente: 'M', tranquilamente: 'M', claramente: 'M', sinceramente: 'M', seriamente: 'M', cómodamente: 'M',
    ciertamente: 'AM', locamente: 'MC', duramente: 'M', amargamente: 'M', profundamente: 'MC', felizmente: 'M', fácilmente: 'M', alegremente: 'M',
    suavemente: 'M', dulcemente: 'M', tristemente: 'M', libremente: 'M', amablemente: 'M', cariñosamente: 'M', peligrosamente: 'M',
    silenciosamente: 'M', normalmente: 'TM', naturalmente: 'AM', finalmente: 'T', cerquita: 'L', despacito: 'M', ahorita: 'T', prontito: 'T',
    tempranito: 'T', anteayer: 'T' };
  const TIPO_ADV = { M: 'modo', L: 'lugar', T: 'tiempo', C: 'cantidad', A: 'afirmación', N: 'negación', D: 'duda' };
  const NOTAS_ADV = {
    ciertamente: 'Funciona sobre todo como adverbio de afirmación (Ciertamente, tienes razón).',
    naturalmente: 'De modo (se comporta naturalmente) o de afirmación (—¿Vendrás? —Naturalmente).',
    normalmente: 'Indica frecuencia («por lo general»): de tiempo para unos manuales, de modo para otros.',
    locamente: 'De modo, o de cantidad cuando intensifica (locamente enamorado).',
    profundamente: 'De modo, o de cantidad cuando intensifica (profundamente dormido).',
    sinceramente: 'De modo; al principio de la oración comenta lo que se dice (Sinceramente, no lo sé).',
    finalmente: 'De tiempo; también ordena el discurso (Finalmente, …).'
  };
  function adverbio(it) {
    const c = ADV[it.palabra]; if (!c) return null;
    const aprec = it.segs.some(s => s[1] === 'A');
    const tipos = [...c].map(x => TIPO_ADV[x]);
    return { tipos: [...c], aprec, nota: NOTAS_ADV[it.palabra] || '',
      rasgos: [
        { k: 'tipo', txt: `De ${tipos.join(' o de ')}: ${{ M: 'indica cómo se realiza la acción', L: 'indica dónde', T: 'indica cuándo o con qué frecuencia', C: 'indica cantidad o intensidad', A: 'afirma lo que se dice' }[c[0]]}.` },
        { k: 'inv', txt: 'Invariable: el adverbio no tiene género ni número.' },
        { k: 'aprec', txt: aprec ? 'Lleva un sufijo apreciativo (diminutivo), propio del habla coloquial: no cambia la categoría.' : 'No lleva sufijo apreciativo.' }
      ],
      resumen: `Adverbio de ${tipos.join(' o de ')}, invariable${aprec ? ', con sufijo apreciativo' : ''}.` };
  }

  // ───────── Verbos ─────────
  const IRREG = { deshacer: 'como hacer: deshice, deshecho', rehacer: 'como hacer: rehíce, rehecho', predecir: 'como decir: predigo, predije',
    contradecir: 'como decir: contradigo, contradije', sobrevolar: 'diptonga: sobrevuelo', anteponer: 'como poner: antepongo, antepuse',
    prever: 'como ver: preveo, previsto', enrojecer: 'añade z: enrojezco', envejecer: 'añade z: envejezco', entristecer: 'añade z: entristezco',
    enriquecer: 'añade z: enriquezco', empobrecer: 'añade z: empobrezco', embellecer: 'añade z: embellezco', enloquecer: 'añade z: enloquezco',
    enflaquecer: 'añade z: enflaquezco', endurecer: 'añade z: endurezco', enmudecer: 'añade z: enmudezco', anochecer: 'añade z: anochezca',
    enterrar: 'diptonga: entierro' };
  const NOTAS_VER = { releer: 'Los cambios de letra de leer (leyó) son ortográficos, no irregularidades.', enfriar: 'El acento de enfrío no cuenta como irregularidad.' };
  const TIEMPO_DE = { pres: 'pres', impf: 'impf', fut: 'fut', cond: 'cond', spres: 'pres', sra: 'impf', sse: 'impf', indef: 'indef' };
  const MODO_DE = { pres: 'ind', impf: 'ind', fut: 'ind', cond: 'ind', indef: 'ind', spres: 'sub', sra: 'sub', sse: 'sub' };
  const NOM_T = { pres: 'presente', impf: 'pretérito imperfecto', indef: 'pretérito perfecto simple', fut: 'futuro simple', cond: 'condicional simple' };
  const NOM_M = { ind: 'indicativo', sub: 'subjuntivo' };
  const NO_PERS = { inf: 'infinitivo', ger: 'gerundio', par: 'participio' };
  const IGUALES_V = ['impf', 'cond', 'spres', 'sra', 'sse'];
  function verbo(it) {
    const t = it.tiempo || 'inf', inf = it.verbo || it.palabra;
    const conj = { ar: '1', er: '2', ir: '3' }[inf.slice(-2)];
    const reg = IRREG[inf] ? 'irr' : 'reg';
    const personal = !NO_PERS[t];
    const persona = personal ? String(it.persona + 1 > 3 ? it.persona - 2 : it.persona + 1) : '0';
    const numero = personal ? (it.persona < 3 ? 's' : 'p') : t === 'par' ? (it.segs.at(-1)[1] === 'N' ? 'p' : 's') : '0';
    const tiempo = personal ? TIEMPO_DE[t] : '0', modo = personal ? MODO_DE[t] : 'np', aspecto = t === 'par' || t === 'indef' ? 'perf' : 'imp';
    // formas que coinciden: cantaba (yo/él), cantamos (presente/pretérito perfecto simple en ‑ar e ‑ir)
    const personas = personal && IGUALES_V.includes(t) && [0, 2].includes(it.persona) ? ['1', '3'] : [persona];
    const tiempos = t === 'pres' && it.persona === 3 && conj !== '2' ? ['pres', 'indef'] : [tiempo];
    const pers = personal ? `${persona}.ª persona del ${numero === 's' ? 'singular' : 'plural'}` : '';
    const nota = [personas.length > 1 ? `En este tiempo la 1.ª y la 3.ª persona del singular coinciden: se acepta cualquiera de las dos.` : '',
      tiempos.length > 1 ? `En los verbos en ‑ar e ‑ir, la 1.ª persona del plural del presente coincide con la del pretérito perfecto simple (${it.palabra}): el contexto decide.` : '',
      NOTAS_VER[inf] || ''].filter(Boolean).join(' ');
    const descr = personal ? `${pers} del ${NOM_T[tiempo]} de ${NOM_M[modo]}` : `forma no personal: ${NO_PERS[t]}${t === 'par' ? `, ${it.segs.some(s => s[0] === 'a' && s[1] === 'G') ? 'femenino' : 'masculino'} ${numero === 'p' ? 'plural' : 'singular'}` : ''}`;
    const rasgos = [
      { k: 'pers', txt: personal ? `${cap(pers)}: el morfema de número y persona indica quién realiza la acción.` : 'Forma no personal: no indica persona ni número gramatical de sujeto.' },
      { k: 'tiempo', txt: personal ? `Tiempo ${NOM_T[tiempo]}.` : `Las formas no personales (${NO_PERS[t]}) no expresan tiempo por sí mismas.` },
      { k: 'modo', txt: personal ? (modo === 'ind' ? 'Modo indicativo: presenta la acción como real.' : 'Modo subjuntivo: presenta la acción como deseo, posibilidad o duda.') : `No tiene modo: es ${NO_PERS[t] === 'infinitivo' ? 'un infinitivo' : NO_PERS[t] === 'gerundio' ? 'un gerundio' : 'un participio'}.` },
      { k: 'asp', txt: aspecto === 'perf' ? 'Aspecto perfectivo: presenta la acción como acabada.' : 'Aspecto imperfectivo: presenta la acción en su desarrollo, sin terminar.' },
      { k: 'conj', txt: `${conj}.ª conjugación: el infinitivo acaba en ‑${inf.slice(-2)} (${inf}).` },
      { k: 'reg', txt: reg === 'irr' ? `Irregular: ${IRREG[inf]}.` : 'Regular: conserva el lexema y las desinencias de su modelo en toda la conjugación.' },
      { k: 'voz', txt: 'Voz activa (es una forma simple; la pasiva se forma con ser + participio).' }
    ];
    return { persona, personas, numero, tiempo, tiempos, modo, aspecto, conj, reg, rasgos, nota,
      resumen: `Forma verbal del verbo «${inf}» (${conj}.ª conjugación, ${reg === 'irr' ? 'irregular' : 'regular'}): ${descr}; aspecto ${aspecto === 'perf' ? 'perfectivo' : 'imperfectivo'}, voz activa.` };
  }
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  function clasificar(it) {
    if (it.cat === 'sus') return sustantivo(it);
    if (it.cat === 'adj') return adjetivo(it);
    if (it.cat === 'adv') return adverbio(it);
    if (it.cat === 'ver') return verbo(it);
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
    if (it.form === 'simple') return raro || (it.tiempo && it.segs.length >= 4) ? 2 : 1; // cant‑á‑ba‑mos cuesta más que cant‑o
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
    ],
    adj: [
      { k: 'tipo', titulo: 'Calificativo o relacional', opciones: [['Q', 'Calificativo'], ['R', 'Relacional']], buenas: c => c.tipo === 'B' ? ['Q', 'R'] : [c.tipo] },
      { k: 'term', titulo: 'Terminaciones', opciones: [['1', 'Una'], ['2', 'Dos']], buenas: c => [c.term] },
      { k: 'grado', titulo: 'Grado', opciones: [['P', 'Positivo'], ['S', 'Superlativo']], buenas: c => [c.grado] },
      { k: 'gen', titulo: 'Género de esta forma', opciones: [['m', 'Masculino'], ['f', 'Femenino'], ['x', 'Invariable']], buenas: c => [c.g] },
      { k: 'num', titulo: 'Número', opciones: [['s', 'Singular'], ['p', 'Plural']], buenas: c => [c.n] }
    ],
    ver: [
      { k: 'pers', titulo: 'Persona', opciones: [['1', '1.ª'], ['2', '2.ª'], ['3', '3.ª'], ['0', 'Ninguna (no personal)']], buenas: c => c.personas },
      { k: 'num', titulo: 'Número', opciones: [['s', 'Singular'], ['p', 'Plural'], ['0', 'Ninguno']], buenas: c => [c.numero] },
      { k: 'tiempo', titulo: 'Tiempo', opciones: [['pres', 'Presente'], ['impf', 'Pret. imperfecto'], ['indef', 'Pret. perfecto simple'], ['fut', 'Futuro'], ['cond', 'Condicional'], ['0', 'Ninguno (no personal)']], buenas: c => c.tiempos },
      { k: 'modo', titulo: 'Modo', opciones: [['ind', 'Indicativo'], ['sub', 'Subjuntivo'], ['imp', 'Imperativo'], ['np', 'Forma no personal']], buenas: c => [c.modo] },
      { k: 'asp', titulo: 'Aspecto', opciones: [['imp', 'Imperfectivo'], ['perf', 'Perfectivo']], buenas: c => [c.aspecto] },
      { k: 'conj', titulo: 'Conjugación', opciones: [['1', '1.ª (‑ar)'], ['2', '2.ª (‑er)'], ['3', '3.ª (‑ir)']], buenas: c => [c.conj] },
      { k: 'reg', titulo: 'Regular o irregular', opciones: [['reg', 'Regular'], ['irr', 'Irregular']], buenas: c => [c.reg] }
    ],
    adv: [
      { k: 'tipo', titulo: 'Tipo de adverbio', opciones: [['M', 'Modo'], ['L', 'Lugar'], ['T', 'Tiempo'], ['C', 'Cantidad'], ['A', 'Afirmación'], ['N', 'Negación'], ['D', 'Duda']], buenas: c => c.tipos },
      { k: 'aprec', titulo: '¿Lleva sufijo apreciativo?', opciones: [['si', 'Sí'], ['no', 'No']], buenas: c => [c.aprec ? 'si' : 'no'] }
    ]
  };

  const API = { clasificar, sustantivo, adjetivo, adverbio, verbo, CLAS, NOMBRES, TIPO_GEN, dificultad, MINUTOS, NIVELES, PREGUNTAS };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.Clasificacion = API;
})(typeof window !== 'undefined' ? window : globalThis);
