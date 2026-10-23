// Motor de conjugación española + base de verbos.
// Genera todas las formas a partir del infinitivo: reglas regulares, cambios
// ortográficos, cambios de raíz, hiatos, verbos irregulares y sus derivados.
(function (global) {
  'use strict';

  // ───────────────────────── Base de verbos ─────────────────────────
  // reg: sin cambio de raíz (los cambios ortográficos -car, -gar, -zar, -guar,
  //      -cer/-cir, -ger/-gir, -guir, -uir, -eer, -ñir, -llir son automáticos)
  const LISTAS = {
    reg: `
abandonar abordar abrazar abrochar abusar acabar acampar acaparar acarrear aceptar acelerar acechar acercar
aclarar acompañar aconsejar acortar acosar acostumbrar acreditar activar acumular acusar adaptar adelantar
adelgazar adivinar administrar admirar adoptar adorar adornar afectar afeitar afirmar aflojar afrontar agarrar
agitar agotar agradar agregar agrupar aguantar ahorrar ajustar alabar alarmar alcanzar alegrar alejar alimentar
alojar alquilar alterar alumbrar amar amarrar amenazar amontonar analizar animar anotar anticipar anular apagar
aparcar apartar apelar aplastar aplazar aplicar apoderar apoyar apresurar aprovechar apuntar arañar arrancar
arrastrar arreglar arrestar arriesgar arrojar arruinar asaltar asegurar asesinar asignar asimilar asomar asombrar
aspirar asustar atacar atar atrapar aumentar autorizar avanzar averiguar avisar ayudar ayunar azotar bailar bajar
balancear bañar barajar basar bastar batallar besar bloquear bordar borrar bostezar brillar brindar brincar bromear
broncear bucear burlar buscar cabalgar cabecear calcular calificar callar calmar caminar cancelar cansar cantar
capturar captar cargar castigar causar cavar cazar celebrar cenar censurar cepillar cesar charlar chequear chillar
chocar chupar circular citar clarificar clasificar clavar cobrar cocinar codificar coleccionar colaborar colocar
colonizar combinar comentar compaginar comparar compensar completar complicar comportar comprar comunicar
concentrar condenar conectar confirmar confiscar conformar conjugar conquistar conservar considerar consultar
consumar contactar contaminar contemplar contestar contratar controlar conversar convocar cooperar coordinar
coronar cortar crear criticar cuidar culpar cultivar curar dañar danzar decepcionar declarar decorar dedicar dejar
delatar delegar demandar depositar derramar derribar derrotar desarrollar desayunar descansar descargar descifrar
desear desembarcar desempeñar desesperar desfilar desgastar desilusionar deslizar desmayar despachar despegar
despejar destacar destinar destrozar detectar determinar devorar dibujar dictar dificultar disculpar diseñar
disfrazar disfrutar disgustar disimular disparar dispensar disputar doblar domar dominar donar dotar duchar dudar
durar echar editar educar ejecutar elaborar elevar eliminar embarcar emborrachar emigrar emocionar empañar empapar
empeñar emplear empujar enamorar encantar encargar enchufar encarcelar enfadar enfermar enfocar enfrentar enganchar
engañar engordar enojar enseñar entrar entregar entrenar entrevistar entusiasmar envenenar equivocar escapar
escuchar esperar estimar estirar estrenar estropear evitar exagerar examinar excavar excitar exclamar explicar
explorar explotar exportar expresar expulsar extrañar fabricar facilitar falsificar faltar fallar felicitar
festejar fichar figurar fijar filmar filtrar firmar fomentar formar formular fracasar frenar frotar fumar funcionar
ganar gastar generar gestionar girar golpear gozar grabar gritar guardar guisar gustar habitar hablar halagar hallar
heredar hospedar hurtar identificar ignorar igualar iluminar ilustrar imaginar imitar implicar importar impresionar
improvisar impulsar inaugurar incitar inclinar incorporar incrementar indicar informar ingresar inspirar instalar
insultar integrar intentar interesar interpretar interrogar intimidar inventar invitar involucrar irritar jubilar
juntar jurar justificar juzgar ladrar lamentar lanzar lastimar lavar levantar liberar limitar llamar llegar llenar
llevar llorar lograr luchar madrugar maltratar manchar mandar manejar manipular maquillar marcar marchar masticar
matar mejorar mencionar meditar mezclar mirar modelar modificar mojar molestar montar motivar mudar multiplicar
nadar narrar navegar necesitar nominar notar numerar observar obligar obrar ocasionar ocultar ocupar olvidar operar
opinar optar ordenar organizar orientar originar osar pagar palpar parar participar pasar pasear patear patinar
pecar pegar peinar pelear pelar penetrar perdonar perforar perjudicar pescar pesar picar pillar pintar pisar
planchar planear plantar plantear platicar portar posar practicar precipitar precisar predicar preguntar preocupar
preparar presentar preservar prestar privar proclamar procurar profesar programar proyectar propagar proporcionar
protestar provocar publicar pulsar quedar quejar quemar quitar rascar rasgar rebajar rebelar recargar rechazar
reciclar reclamar recopilar recortar recuperar redactar reemplazar reflejar regalar regresar regular rehabilitar
relacionar relajar relatar rellenar remar remojar rentar reparar repasar reportar representar reprochar rescatar
reservar respetar respirar restar resultar retirar retrasar retratar revelar revisar rezar robar rodear rozar
saborear sacar salpicar saltar saludar salvar sanar secar secuestrar señalar separar significar simular sobrar
sobornar solicitar soplar soportar sospechar subrayar sudar sujetar sumar superar suplicar suspirar sustentar
susurrar tachar tallar tapar tardar tirar tocar tolerar tomar torturar trabajar tragar traicionar tramitar
transformar transportar trasladar tratar triunfar tumbar ubicar usar validar valorar velar vendar vengar ventilar
verificar viajar vigilar vincular violar visitar votar zarpar
abanicar ablandar abonar abortar abrigar abrumar acatar aclamar aclimatar acoplar acotar acuchillar adiestrar
adjuntar adjudicar adular afinar aflorar agachar agilizar agonizar agrandar agravar aguardar agujerear ahogar
ahorcar alardear alargar alborotar alertar alisar alistar almacenar alternar alucinar amamantar amargar amasar
ambientar amenizar amortiguar amotinar amparar amputar amueblar anclar anegar anhelar aniquilar apaciguar apalear
apañar aparear apasionar apestar apodar aportar apresar aprisionar aproximar apurar arar archivar argumentar armar
arrasar arrebatar arrimar arrinconar arropar arrugar articular asar asear asesorar asfaltar asquear atajar
atascar aterrizar atesorar atestiguar atormentar atracar atrasar auscultar avalar avasallar aventajar aventurar
avivar barnizar bautizar blanquear blindar bombardear bordear botar bregar brotar cachear calar calcar calibrar
calzar camuflar canalizar capacitar capitular catalogar cautivar cebar cercar certificar chamuscar chantajear
chatear chiflar chorrear cifrar clamar clausurar climatizar coaccionar cobijar colapsar colmar colorear compactar
compilar complementar computar concretar condicionar condimentar confeccionar configurar confinar confrontar
congelar congregar conjeturar conmemorar conmocionar consignar consolidar conspirar constatar consternar constar
contentar contrastar convalidar cosechar costear cotizar crispar cristalizar cuadrar cuajar cuantificar cuestionar
culminar cumplimentar cursar decantar decapitar declinar decretar degustar delimitar deliberar delinear denotar
deparar depilar deplorar deportar depurar derivar derrochar derrumbar desabrochar desafinar desahogar desalojar
desamparar desanimar desarmar desatar desbordar descalificar descartar descuidar desdoblar desembocar desempolvar
desenchufar desequilibrar desfigurar desgarrar deshojar designar desinfectar desintegrar deslumbrar desmantelar
desmontar desnudar desocupar desordenar despeinar despilfarrar desplazar desplomar despojar destapar destilar
desvelar detallar deteriorar detestar devastar diagnosticar dialogar dictaminar difamar digitalizar dilatar
discrepar discriminar disecar disipar dispersar distorsionar divagar divisar divulgar doblegar documentar
domesticar dosificar drogar ejemplificar ejercitar emanar emancipar embalar embarazar embargar embolsar embriagar
empacar empalmar empapelar emparejar empatar empeorar empinar emplazar encabezar encajar encaminar encarar
encauzar encestar endeudar enderezar endosar enfatizar enfilar engendrar englobar engrasar enjuagar
enlazar enmarcar enredar enrollar ensamblar ensanchar ensayar ensillar entablar entonar enumerar envasar enviudar
equilibrar equipar erradicar escalar escandalizar escarbar escasear escoltar espantar especular esposar esquivar
estacionar estafar estallar estampar estancar estimular estipular estrangular estrechar estrujar evaporar evocar
evolucionar exaltar excusar exhalar exhortar experimentar expirar exterminar extirpar fascinar fatigar fermentar
fertilizar finalizar flotar forjar formatear fortificar fraguar frecuentar frustrar fugar fulminar fundar fusionar
galopar garabatear garantizar germinar gesticular gestar glorificar gratificar grapar gravar guiñar habilitar
hechizar hidratar hilar hinchar honrar hornear hospitalizar hostigar humillar idear idolatrar ilusionar impactar
implantar implorar incomodar incrustar inculcar indagar indemnizar independizar indignar infectar infiltrar
inflamar inflar inhalar injertar inmigrar inmovilizar innovar inquietar insertar inspeccionar instaurar instigar
intercalar interceptar internar interpelar intimar intoxicar intrigar inundar invalidar investigar juguetear
legalizar legislar levitar liderar liquidar lustrar machacar madurar malgastar mamar maniatar maravillar marginar
memorizar mendigar migrar militar mimar minimizar mitigar moderar modernizar moldear movilizar mutilar naufragar
neutralizar nivelar nombrar normalizar notificar nublar objetar obsesionar obstaculizar ofuscar ojear ondular
optimizar orar oscilar otorgar oxidar pactar paralizar parpadear patentar patrocinar patrullar pedalear penalizar
perpetrar personalizar personificar perturbar pestañear pilotar pinchar piratear planificar plasmar ponderar
popularizar posibilitar postergar postular precintar predominar presionar privatizar procesar profanar profetizar
profundizar prolongar promulgar prosperar protagonizar purificar quebrantar racionar radicar rapar rasurar
rastrear ratificar razonar reaccionar reactivar reafirmar realizar reanimar reanudar rebotar rebuscar recalcar
recapacitar recaudar recetar recitar reclutar recobrar recolectar recompensar recrear rectificar redoblar
redondear reembolsar reestructurar refinar reformar refrescar refutar regañar regatear registrar reglamentar
regularizar reinar reincorporar reintegrar reiterar reivindicar relegar rematar remontar remunerar reorganizar
replicar reposar requisar resaltar resbalar reseñar resguardar resignar respaldar restaurar resucitar retar
retocar retornar reutilizar revocar revolotear ridiculizar rimar rizar rondar rotar rotular sabotear salar saldar
salvaguardar sancionar saquear secundar sedar segregar seleccionar sellar sepultar serenar sincronizar sintetizar
sintonizar sobrepasar sofocar solapar solucionar sondear sopesar sortear subastar subestimar sublevar subsanar
subvencionar sugestionar suministrar suplantar surcar tantear tapizar tararear teclear telefonear televisar
templar tensar terminar testificar timar tiritar titubear titular tomar topar torear tornar trabar traficar
tranquilizar transitar transpirar trasplantar trastornar trazar trepar tributar trinchar triturar trocear tutear
ultimar uniformar unificar untar urbanizar usurpar utilizar vacilar vacunar vagar venerar veranear vetar vibrar
visualizar vitorear vocalizar vomitar vulnerar zanjar zarandear zumbar
cambiar estudiar limpiar anunciar apreciar copiar odiar envidiar iniciar negociar pronunciar renunciar denunciar
financiar beneficiar diferenciar potenciar sentenciar silenciar presenciar licenciar influenciar asociar angustiar
conciliar reconciliar domiciliar elogiar incendiar injuriar lidiar mediar remediar obsequiar premiar apremiar
plagiar presagiar privilegiar refugiar contagiar desperdiciar acariciar codiciar enjuiciar ajusticiar viciar
propiciar oficiar saciar agraviar abreviar aliviar distanciar enunciar evidenciar irradiar menospreciar despreciar
parodiar preludiar principiar sitiar terciar vendimiar vilipendiar asfixiar compendiar custodiar fastidiar
ingeniar intercambiar repudiar agenciar apropiar expropiar atrofiar afiliar agobiar asediar comerciar concienciar
congeniar exiliar fotocopiar obviar ensuciar
comer beber aprender comprender correr deber temer vender meter romper prometer responder sorprender esconder
barrer coser toser ceder conceder exceder proceder suceder anteceder retroceder depender emprender pretender
prender sorber socorrer recorrer acometer arremeter cometer comprometer entrometer someter lamer tejer
corresponder ofender suspender absorber acceder interceder preceder atrever arder corromper
leer creer poseer releer proveer desposeer vencer convencer ejercer mecer coger recoger escoger proteger acoger
encoger emerger converger sobrecoger tañer
vivir escribir abrir cubrir descubrir encubrir recubrir reabrir entreabrir subir decidir recibir partir permitir
compartir existir insistir resistir asistir consistir persistir desistir subsistir coexistir discutir sufrir
cumplir unir dividir añadir aplaudir admitir emitir omitir transmitir remitir imprimir describir inscribir
prescribir suscribir transcribir proscribir reescribir ocurrir recurrir transcurrir concurrir discurrir incurrir
aburrir interrumpir irrumpir invadir persuadir evadir eludir aludir confundir difundir fundir infundir hundir
sacudir acudir eximir reprimir oprimir suprimir deprimir comprimir exprimir combatir debatir batir abatir rebatir
sumergir exigir dirigir fingir surgir rugir afligir infligir urgir erigir transigir distinguir extinguir esparcir
zurcir fruncir resarcir gruñir bruñir bullir zambullir engullir construir destruir reconstruir instruir obstruir
concluir incluir excluir recluir influir fluir confluir contribuir distribuir atribuir retribuir redistribuir
sustituir constituir restituir destituir instituir disminuir diluir intuir imbuir derruir dimitir repartir residir
presumir resumir asumir consumir nutrir urdir surtir rescindir repercutir esculpir escupir exhibir inhibir
expandir coincidir definir pulir incidir percibir sobrevivir convivir revivir sucumbir aturdir impartir
`,
    // e → ie
    ie: `
pensar cerrar empezar comenzar despertar sentar calentar recomendar encomendar gobernar atravesar confesar negar
renegar fregar regar cegar desplegar sosegar tropezar merendar apretar quebrar temblar enterrar desterrar acertar
concertar desconcertar manifestar alentar desalentar arrendar subarrendar encerrar enmendar escarmentar mentar
recalentar reventar sembrar serrar tentar aventar desenterrar empedrar herrar segar trasegar desasosegar asentar
entender perder defender encender extender tender atender descender ascender trascender condescender verter
contender desatender malentender
sentir mentir preferir divertir convertir advertir herir hervir sugerir requerir invertir digerir consentir
presentir resentir referir conferir diferir inferir transferir adherir arrepentir desmentir revertir subvertir
pervertir controvertir ingerir proferir interferir
`,
    // o → ue  (y u → ue en jugar)
    ue: `
contar mostrar encontrar recordar acordar costar probar aprobar comprobar volar sonar soñar rogar colgar descolgar
almorzar forzar esforzar reforzar acostar consolar demostrar renovar soltar tostar apostar avergonzar degollar
descontar desaprobar poblar repoblar despoblar recostar resonar reprobar volcar revolcar rodar colar recontar
sobrevolar soldar desollar
mover remover conmover promover morder doler oler cocer torcer retorcer escocer recocer moler demoler volver
devolver envolver revolver desenvolver resolver disolver absolver
dormir morir
`,
    jug: `jugar`,
    // e → i
    i: `
pedir servir vestir repetir competir medir seguir conseguir perseguir proseguir elegir reelegir corregir regir
rendir gemir reñir teñir desteñir ceñir impedir despedir expedir concebir derretir desvestir investir embestir
`,
    // i → ie
    iie: `adquirir inquirir`,
    // tilde en la raíz cuando es tónica (envío, actúo, reúno, prohíbo…)
    acc: `
enviar reenviar confiar desconfiar variar ampliar enfriar resfriar espiar esquiar vaciar desviar averiar
fotografiar telegrafiar radiografiar mecanografiar chirriar contrariar desafiar extraviar hastiar inventariar
rociar ataviar aliar porfiar expiar malcriar descarriar amnistiar ansiar arriar
actuar continuar situar evaluar graduar acentuar efectuar habituar insinuar perpetuar puntuar devaluar atenuar
conceptuar exceptuar fluctuar tatuar extenuar desvirtuar consensuar
reunir prohibir cohibir aislar rehusar aullar maullar ahumar aunar enraizar
`,
    // -zc- (conozco, conduzco)
    zc: `
conocer reconocer desconocer parecer aparecer desaparecer reaparecer comparecer merecer desmerecer obedecer
desobedecer ofrecer crecer decrecer nacer renacer agradecer establecer restablecer favorecer permanecer pertenecer
carecer padecer fortalecer enriquecer empobrecer envejecer rejuvenecer oscurecer amanecer adolecer compadecer
enloquecer enorgullecer entristecer enternecer enrojecer palidecer prevalecer resplandecer embellecer ennoblecer
estremecer florecer humedecer abastecer aborrecer apetecer desfallecer desvanecer endurecer enflaquecer
engrandecer enmudecer ensordecer entorpecer entumecer ennegrecer esclarecer fallecer fenecer guarecer languidecer
perecer reverdecer robustecer convalecer enardecer encarecer enmohecer enrarecer enaltecer enfurecer complacer
lucir relucir deslucir conducir producir reducir traducir introducir deducir inducir seducir reproducir aducir
`,
    // derivados de irregulares: verbo:base
    der: `
componer:poner descomponer:poner recomponer:poner suponer:poner presuponer:poner proponer:poner disponer:poner
predisponer:poner exponer:poner imponer:poner oponer:poner reponer:poner deponer:poner posponer:poner
contraponer:poner yuxtaponer:poner sobreponer:poner anteponer:poner interponer:poner superponer:poner
contener:tener detener:tener mantener:tener obtener:tener retener:tener sostener:tener entretener:tener
convenir:venir intervenir:venir prevenir:venir provenir:venir sobrevenir:venir contravenir:venir
deshacer:hacer rehacer:hacer predecir:decir contradecir:decir desdecir:decir
atraer:traer contraer:traer distraer:traer extraer:traer retraer:traer sustraer:traer abstraer:traer
decaer:caer recaer:caer desoír:oír sobresalir:salir equivaler:valer prever:ver entrever:ver desandar:andar
sonreír:reír freír:reír
`
  };

  const IRR = {
    ser:   { pres: 'soy eres es somos sois son', impf: 'era eras era éramos erais eran', pretFull: 'fui fuiste fue fuimos fuisteis fueron', subj: 'sea seas sea seamos seáis sean', imp: 'sé', part: 'sido' },
    ir:    { pres: 'voy vas va vamos vais van', impf: 'iba ibas iba íbamos ibais iban', pretFull: 'fui fuiste fue fuimos fuisteis fueron', subj: 'vaya vayas vaya vayamos vayáis vayan', impFull: [null, 've', 'vaya', 'vamos', 'id', 'vayan'], part: 'ido' },
    estar: { pres: 'estoy estás está estamos estáis están', subj: 'esté estés esté estemos estéis estén', pret: 'estuv', imp: 'está' },
    haber: { pres: 'he has ha hemos habéis han', subj: 'haya hayas haya hayamos hayáis hayan', pret: 'hub', fut: 'habr', noImp: true, noQuiz: true },
    tener: { p1: 'teng', sc: 'ie', pret: 'tuv', fut: 'tendr', imp: 'ten' },
    venir: { p1: 'veng', sc: 'ie', pret: 'vin', fut: 'vendr', imp: 'ven' },
    poner: { p1: 'pong', pret: 'pus', fut: 'pondr', imp: 'pon', part: 'puesto' },
    hacer: { p1: 'hag', pretFull: 'hice hiciste hizo hicimos hicisteis hicieron', fut: 'har', imp: 'haz', part: 'hecho' },
    satisfacer: { p1: 'satisfag', pretFull: 'satisfice satisficiste satisfizo satisficimos satisficisteis satisficieron', fut: 'satisfar', imp: 'satisfaz', part: 'satisfecho' },
    decir: { p1: 'dig', sc: 'i', pret: 'dij', fut: 'dir', imp: 'di', part: 'dicho' },
    bendecir: { p1: 'bendig', sc: 'i', pret: 'bendij', imp: 'bendice', part: 'bendecido' },
    maldecir: { p1: 'maldig', sc: 'i', pret: 'maldij', imp: 'maldice', part: 'maldecido' },
    traer: { p1: 'traig', pret: 'traj' },
    caer:  { p1: 'caig' },
    oír:   { pres: 'oigo oyes oye oímos oís oyen', subj: 'oig', imp: 'oye' },
    salir: { p1: 'salg', fut: 'saldr', imp: 'sal' },
    valer: { p1: 'valg', fut: 'valdr', imp: 'vale' },
    poder: { sc: 'ue', pret: 'pud', fut: 'podr', noImp: true },
    querer:{ sc: 'ie', pret: 'quis', fut: 'querr' },
    saber: { pres: 'sé sabes sabe sabemos sabéis saben', subj: 'sep', pret: 'sup', fut: 'sabr' },
    caber: { pres: 'quepo cabes cabe cabemos cabéis caben', subj: 'quep', pret: 'cup', fut: 'cabr', noImp: true },
    dar:   { pres: 'doy das da damos dais dan', subj: 'dé des dé demos deis den', pretFull: 'di diste dio dimos disteis dieron', imp: 'da' },
    ver:   { pres: 'veo ves ve vemos veis ven', impf: 'veía veías veía veíamos veíais veían', pretFull: 'vi viste vio vimos visteis vieron', subj: 've', imp: 've', part: 'visto' },
    andar: { pret: 'anduv' },
    reír:  { pres: 'río ríes ríe reímos reís ríen', subj: 'ría rías ría riamos riais rían', pretFull: 'reí reíste rio reímos reísteis rieron', imp: 'ríe', part: 'reído' }
  };
  const PART = {
    abrir: 'abierto', reabrir: 'reabierto', entreabrir: 'entreabierto', cubrir: 'cubierto', descubrir: 'descubierto',
    encubrir: 'encubierto', recubrir: 'recubierto', morir: 'muerto', romper: 'roto', imprimir: 'impreso',
    proveer: 'provisto', freír: 'frito'
  };
  const DER_IMP_PRES = { predecir: 1, contradecir: 1, desdecir: 1 };

  const CLS = {}, DER = {};
  const palabras = s => s.split(/\s+/).filter(Boolean);
  for (const c of ['reg', 'ie', 'ue', 'jug', 'i', 'iie', 'acc', 'zc']) for (const v of palabras(LISTAS[c])) CLS[v] = c;
  for (const par of palabras(LISTAS.der)) { const [v, b] = par.split(':'); DER[v] = b; }

  // ───────────────────────── Utilidades ─────────────────────────
  const AGUDA = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' };
  function silabas(w) {
    let n = 0;
    for (const run of w.match(/[aeiouáéíóúü]+/g) || []) n += Math.max(1, (run.match(/[aeoáéíóú]/g) || []).length);
    return n;
  }
  function acentuarNucleo(w) { // pone tilde en el núcleo de la última sílaba
    const m = w.match(/^(.*?)([aeiouü]+)([^aeiouü]*)$/);
    if (!m) return w;
    let run = m[2];
    const fuerte = run.search(/[aeo](?!.*[aeo])/);
    const i = fuerte >= 0 ? fuerte : run.length - 1;
    run = run.slice(0, i) + AGUDA[run[i]] + run.slice(i + 1);
    return m[1] + run + m[3];
  }
  const tieneTilde = w => /[áéíóú]/.test(w);
  function tildeUltVocal(b) { return b.replace(/([aeiou])([^aeiou]*)$/, (m, v, r) => AGUDA[v] + r); }
  function tildeDebil(s) { return s.replace(/([iu])([^iu]*)$/, (m, v, r) => AGUDA[v] + r); }

  function reemplazarUltima(s, de, a) {
    const i = s.lastIndexOf(de);
    if (i < 0) return s;
    let r = a;
    if (a === 'ue' && i > 0 && s[i - 1] === 'g') r = 'üe';
    s = s.slice(0, i) + r + s.slice(i + de.length);
    if (i === 0 && a === 'ue') s = 'h' + s;          // oler → huelo
    if (i === 0 && a === 'ie') s = 'y' + s.slice(1); // errar → yerro
    return s;
  }
  function cambio(s, cls, grado) {
    if (grado === 'fuerte') {
      if (cls === 'ie') return reemplazarUltima(s, 'e', 'ie');
      if (cls === 'ue') return reemplazarUltima(s, 'o', 'ue');
      if (cls === 'jug') return reemplazarUltima(s, 'u', 'ue');
      if (cls === 'i') return reemplazarUltima(s, 'e', 'i');
      if (cls === 'iie') return reemplazarUltima(s, 'i', 'ie');
      return s;
    }
    if (cls === 'ie' || cls === 'i') return reemplazarUltima(s, 'e', 'i');
    if (cls === 'ue') return reemplazarUltima(s, 'o', 'u');
    return s;
  }

  // Une raíz y desinencia aplicando ortografía y reglas de hiato
  function unir(s, e, ctx) {
    const inf = ctx.inf, f = e[0];
    const ante = /[eéií]/.test(f), tras = /[aoáó]/.test(f);
    if (!ctx.noOrto) {
      if (/car$/.test(inf) && ante) s = s.replace(/c$/, 'qu');
      else if (/guar$/.test(inf) && ante) s = s.replace(/gu$/, 'gü');
      else if (/gar$/.test(inf) && ante) s = s.replace(/g$/, 'gu');
      else if (/zar$/.test(inf) && ante) s = s.replace(/z$/, 'c');
      else if (/c[ei]r$/.test(inf) && tras) s = s.replace(/c$/, ctx.cls === 'zc' ? 'zc' : 'z');
      else if (/guir$/.test(inf) && tras) s = s.replace(/gu$/, 'g');
      else if (/g[ei]r$/.test(inf) && tras) s = s.replace(/g$/, 'j');
    }
    if (ctx.term !== 'ar' && /[aeo]$/.test(s)) {            // leer, caer, oír
      if (/^i[aeoáéó]/.test(e)) e = 'y' + e.slice(1);
      else if (/^i/.test(e)) e = 'í' + e.slice(1);
    } else if (ctx.uir && /u$/.test(s)) {                    // construir
      if (/^i[aeoáéó]/.test(e)) e = 'y' + e.slice(1);
      else if (/^[aeoáéó]/.test(e)) e = 'y' + e;
    } else if (/(ñ|ll)$/.test(s) && /^i[aeoáéó]/.test(e)) {  // gruñó, bulló
      e = e.slice(1);
    }
    return s + e;
  }

  const END = {
    ar: { pres: ['o', 'as', 'a', 'amos', 'áis', 'an'], impf: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'], pret: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'], subj: ['e', 'es', 'e', 'emos', 'éis', 'en'] },
    er: { pres: ['o', 'es', 'e', 'emos', 'éis', 'en'], impf: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'], pret: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'], subj: ['a', 'as', 'a', 'amos', 'áis', 'an'] },
    ir: { pres: ['o', 'es', 'e', 'imos', 'ís', 'en'], impf: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'], pret: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'], subj: ['a', 'as', 'a', 'amos', 'áis', 'an'] }
  };
  const FUT = ['é', 'ás', 'á', 'emos', 'éis', 'án'], COND = ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'];
  const TONICAS = [0, 1, 2, 5];

  // ───────────────────────── Tiempos simples ─────────────────────────
  function simples(inf) {
    if (DER[inf]) return derivar(inf);
    const irr = IRR[inf] || {};
    const cls = irr.sc || CLS[inf] || '';
    const term = inf.slice(-2).replace('í', 'i');
    const stem = inf.slice(0, -2);
    const E = END[term];
    const ctx = { inf, term, cls, noOrto: !!IRR[inf], uir: /[^gq]uir$/.test(inf) };
    const debilIr = term === 'ir' && ['ie', 'ue', 'i'].includes(cls);
    const fuerte = s => cambio(s, cls, 'fuerte');
    const debil = s => debilIr ? cambio(s, cls, 'debil') : s;

    const pres = irr.pres ? palabras(irr.pres) : E.pres.map((e, i) => {
      if (i === 0 && irr.p1) return irr.p1 + 'o';
      let s = stem;
      if (TONICAS.includes(i)) { s = fuerte(s); if (cls === 'acc') s = tildeDebil(s); }
      return unir(s, e, ctx);
    });
    const impf = irr.impf ? palabras(irr.impf) : E.impf.map(e => unir(stem, e, ctx));

    let pret;
    if (irr.pretFull) pret = palabras(irr.pretFull);
    else if (irr.pret || /ducir$/.test(inf)) {
      const ps = irr.pret || stem.replace(/c$/, 'j');
      const j = /j$/.test(ps);
      pret = ['e', 'iste', 'o', 'imos', 'isteis', j ? 'eron' : 'ieron'].map(e => ps + e);
    } else pret = E.pret.map((e, i) => unir(i === 2 || i === 5 ? debil(stem) : stem, e, ctx));

    const fs = irr.fut || inf.replace('í', 'i');
    const fut = FUT.map(e => fs + e), cond = COND.map(e => fs + e);

    let subj;
    if (irr.subj && irr.subj.includes(' ')) subj = palabras(irr.subj);
    else {
      const SE = term === 'ar' ? END.er.subj.map(x => x.replace('a', 'e').replace('á', 'é')) : END.er.subj;
      const s0 = irr.subj || irr.p1;
      subj = SE.map((e, i) => {
        if (s0) return s0 + e;
        let s = stem;
        if (TONICAS.includes(i)) { s = fuerte(s); if (cls === 'acc') s = tildeDebil(s); }
        else s = debil(s);
        return unir(s, e, ctx);
      });
    }

    const imp = irr.noImp ? null : irr.impFull ? irr.impFull.slice()
      : [null, irr.imp || pres[2], subj[2], subj[3], inf.slice(0, -1) + 'd', subj[5]];

    let part = irr.part || PART[inf];
    if (!part) {
      if (/olver$/.test(inf)) part = inf.replace(/olver$/, 'uelto');
      else if (/scribir$/.test(inf)) part = inf.replace(/scribir$/, 'scrito');
      else part = term === 'ar' ? stem + 'ado' : unir(stem, 'ido', Object.assign({}, ctx, { noOrto: true }));
    }
    return { pres, impf, pret, fut, cond, subj, imp, part };
  }

  function prefijar(pre, f) {
    if (f == null) return f;
    const w = pre + f;
    if (!tieneTilde(f) && silabas(f) === 1 && /[aeiouns]$/.test(f) && silabas(w) > 1) return pre + acentuarNucleo(f);
    return w;
  }
  function derivar(inf) {
    const b = DER[inf], pre = inf.slice(0, inf.length - b.length);
    const B = simples(b), R = {};
    for (const k of ['pres', 'impf', 'pret', 'fut', 'cond', 'subj']) R[k] = B[k].map(f => prefijar(pre, f));
    R.imp = B.imp ? B.imp.map(f => prefijar(pre, f)) : null;
    if (R.imp && DER_IMP_PRES[inf]) R.imp[1] = R.pres[2];
    R.part = PART[inf] || pre + B.part;
    return R;
  }

  // ───────────────────────── Todas las formas ─────────────────────────
  const TIEMPOS = [
    { id: 'ind_pres', modo: 'Indicativo', nombre: 'Presente' },
    { id: 'ind_impf', modo: 'Indicativo', nombre: 'Pretérito imperfecto' },
    { id: 'ind_indef', modo: 'Indicativo', nombre: 'Pretérito perfecto simple (indefinido)' },
    { id: 'ind_fut', modo: 'Indicativo', nombre: 'Futuro simple' },
    { id: 'ind_cond', modo: 'Indicativo', nombre: 'Condicional simple' },
    { id: 'ind_pps', modo: 'Indicativo', nombre: 'Pretérito perfecto compuesto' },
    { id: 'ind_plusc', modo: 'Indicativo', nombre: 'Pretérito pluscuamperfecto' },
    { id: 'ind_ant', modo: 'Indicativo', nombre: 'Pretérito anterior' },
    { id: 'ind_futc', modo: 'Indicativo', nombre: 'Futuro compuesto' },
    { id: 'ind_condc', modo: 'Indicativo', nombre: 'Condicional compuesto' },
    { id: 'sub_pres', modo: 'Subjuntivo', nombre: 'Presente' },
    { id: 'sub_impf', modo: 'Subjuntivo', nombre: 'Pretérito imperfecto' },
    { id: 'sub_fut', modo: 'Subjuntivo', nombre: 'Futuro simple' },
    { id: 'sub_pp', modo: 'Subjuntivo', nombre: 'Pretérito perfecto' },
    { id: 'sub_plusc', modo: 'Subjuntivo', nombre: 'Pretérito pluscuamperfecto' },
    { id: 'sub_futc', modo: 'Subjuntivo', nombre: 'Futuro compuesto' },
    { id: 'imp', modo: 'Imperativo', nombre: 'Afirmativo' }
  ];

  function derivadosSubj(pret3pl, suf) {
    const b = pret3pl.slice(0, -3), bt = tildeUltVocal(b);
    return [b + suf, b + suf + 's', b + suf, bt + suf + 'mos', b + suf + 'is', b + suf + 'n'];
  }

  const cache = {};
  function conjugar(inf) {
    if (cache[inf]) return cache[inf];
    const S = simples(inf);
    const H = inf === 'haber' ? S : conjugar('haber').S;
    const Hra = derivadosSubj(H.pret[5], 'ra'), Hse = derivadosSubj(H.pret[5], 'se'), Hre = derivadosSubj(H.pret[5], 're');
    const c = (arr) => arr.map(h => h + ' ' + S.part);
    const F = {
      ind_pres: S.pres, ind_impf: S.impf, ind_indef: S.pret, ind_fut: S.fut, ind_cond: S.cond,
      ind_pps: c(H.pres), ind_plusc: c(H.impf), ind_ant: c(H.pret), ind_futc: c(H.fut), ind_condc: c(H.cond),
      sub_pres: S.subj,
      sub_impf: { ra: derivadosSubj(S.pret[5], 'ra'), se: derivadosSubj(S.pret[5], 'se') },
      sub_fut: derivadosSubj(S.pret[5], 're'),
      sub_pp: c(H.subj),
      sub_plusc: { ra: c(Hra), se: c(Hse) },
      sub_futc: c(Hre),
      imp: S.imp
    };
    return (cache[inf] = { S, F, part: S.part });
  }

  // Variantes de una forma (1 o 2: -ra / -se)
  function formas(inf, tid, p) {
    const t = conjugar(inf).F[tid];
    if (!t) return [];
    if (Array.isArray(t)) return t[p] ? [t[p]] : [];
    return [t.ra[p], t.se[p]];
  }
  // Todos los tiempos que producen exactamente esa forma para esa persona
  function tiemposDe(inf, forma, p) {
    return TIEMPOS.map(t => t.id).filter(id => formas(inf, id, p).includes(forma));
  }

  function tipo(inf) {
    if (IRR[inf] || DER[inf]) return 'irregular';
    const c = CLS[inf];
    if (['ie', 'ue', 'jug', 'i', 'iie'].includes(c)) return 'cambio de raíz';
    if (c === 'zc') return 'irregular (-zc-)';
    if (/[^gq]uir$/.test(inf)) return 'irregular (-y-)';
    if (c === 'acc') return 'acentual (í/ú)';
    if (/(car|gar|zar|guar|cer|cir|ger|gir|guir|eer|ñir|ñer|llir)$/.test(inf)) return 'ortográfico';
    return 'regular';
  }

  const VERBOS = [...new Set([...Object.keys(CLS), ...Object.keys(DER), ...Object.keys(IRR)])]
    .filter(v => !(IRR[v] && IRR[v].noQuiz)).sort((a, b) => a.localeCompare(b, 'es'));
  const sinImperativo = v => { const b = DER[v] || v; return !!(IRR[b] && IRR[b].noImp); };

  const API = { conjugar, formas, tiemposDe, tipo, TIEMPOS, VERBOS, sinImperativo, LISTAS, CLS, DER, IRR };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.Motor = API;
})(typeof window !== 'undefined' ? window : globalThis);
