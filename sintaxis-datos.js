// Banco de oraciones para el apartado de Sintaxis (2.º de Bachillerato), analizadas a mano.
// Sin subordinadas: solo lo que se practica aquí (modalidad, simple/compuesta, sujeto, predicado, diátesis y modo).
//
// Cada línea:  oración | modalidad | estructura | proposición || proposición … | nota
//   modalidad   EA enunciativa afirmativa · EN enunciativa negativa · IT interrogativa total · IP interrogativa parcial
//               EX exclamativa · EH exhortativa · DS desiderativa · DB dubitativa
//   estructura  S simple · Y yuxtapuesta · CC:nexo coordinada copulativa · CD:nexo disyuntiva · CA:nexo adversativa
//   proposición [texto] verbo; sujeto; predicado; diátesis; modo   ([texto] solo en las compuestas)
//     sujeto     E:texto explícito · O:persona omitido (tácito) · I3 impersonal de 3.ª plural · IR impersonal refleja
//                IG impersonal gramaticalizada (haber, hacer, ser) · IA impersonal atmosférica (llover, nevar…)
//     predicado  C:atributo copulativa · SC:c. predicativo semicopulativa · PT:CD predicativa transitiva
//                PI predicativa intransitiva · PP[:c. agente] predicativa en pasiva
//     diátesis   A activa · PF pasiva perifrástica · PR pasiva refleja
//     modo       i indicativo · s subjuntivo · m imperativo
(function (global) {
  'use strict';
  const NOTA_TIEMPO_PERIF = 'Es una perífrasis verbal: el auxiliar y el infinitivo o gerundio forman un solo núcleo verbal, así que la oración es simple.';
  const DATOS = `
El tren llega a las ocho. | EA | S | llega; E:El tren; PI; A; i
Los niños juegan en el parque. | EA | S | juegan; E:Los niños; PI; A; i
Mi madre lee el periódico. | EA | S | lee; E:Mi madre; PT:el periódico; A; i
Los alumnos escriben una redacción. | EA | S | escriben; E:Los alumnos; PT:una redacción; A; i
El perro duerme en el sofá. | EA | S | duerme; E:El perro; PI; A; i
Ana compró flores para su abuela. | EA | S | compró; E:Ana; PT:flores; A; i
Mañana viajaremos a Lanzarote. | EA | S | viajaremos; O:nosotros; PI; A; i
Compré pan esta mañana. | EA | S | compré; O:yo; PT:pan; A; i
Llegasteis muy tarde. | EA | S | llegasteis; O:vosotros; PI; A; i
Tus amigos han traído pasteles. | EA | S | han traído; E:Tus amigos; PT:pasteles; A; i
El sol calienta la arena. | EA | S | calienta; E:El sol; PT:la arena; A; i
Vivimos cerca del mar. | EA | S | vivimos; O:nosotros; PI; A; i
Elena toca el piano todos los días. | EA | S | toca; E:Elena; PT:el piano; A; i
Los pájaros cantan por la mañana. | EA | S | cantan; E:Los pájaros; PI; A; i
Mi hermano ha suspendido Matemáticas. | EA | S | ha suspendido; E:Mi hermano; PT:Matemáticas; A; i
Nadaremos en la piscina. | EA | S | nadaremos; O:nosotros; PI; A; i
Los vecinos pintaron la fachada. | EA | S | pintaron; E:Los vecinos; PT:la fachada; A; i
Pedro sonrió. | EA | S | sonrió; E:Pedro; PI; A; i
Escribiré una carta a mis abuelos. | EA | S | escribiré; O:yo; PT:una carta; A; i
Los turistas visitan la catedral. | EA | S | visitan; E:Los turistas; PT:la catedral; A; i
No encuentro mis llaves. | EN | S | encuentro; O:yo; PT:mis llaves; A; i
Mis primos no vendrán a la fiesta. | EN | S | vendrán; E:Mis primos; PI; A; i
Nunca bebo café. | EN | S | bebo; O:yo; PT:café; A; i
Nadie llamó ayer. | EN | S | llamó; E:Nadie; PI; A; i | El sujeto es «Nadie»: el pronombre indefinido concuerda con «llamó». Y su valor negativo hace la oración enunciativa negativa.
Mi hermano es muy alto. | EA | S | es; E:Mi hermano; C:muy alto; A; i
La sopa está fría. | EA | S | está; E:La sopa; C:fría; A; i
Pareces cansada. | EA | S | pareces; O:tú; C:cansada; A; i
Estos zapatos son de piel. | EA | S | son; E:Estos zapatos; C:de piel; A; i
Somos amigos desde la infancia. | EA | S | somos; O:nosotros; C:amigos; A; i
El examen fue difícil. | EA | S | fue; E:El examen; C:difícil; A; i
Mis padres están muy contentos. | EA | S | están; E:Mis padres; C:muy contentos; A; i
Esa película no es apta para niños. | EN | S | es; E:Esa película; C:apta para niños; A; i
Lucía es la presidenta. | EA | S | es; E:Lucía; C:la presidenta; A; i
La puerta está cerrada. | EA | S | está; E:La puerta; C:cerrada; A; i | No es pasiva: estar + participio expresa un estado y la oración es copulativa («cerrada» es el atributo). La pasiva perifrástica se forma con ser: «La puerta fue cerrada».
Mi hermano está en casa. | EA | S | está; E:Mi hermano; PI; A; i | No es copulativa: «estar» con un complemento de lugar significa «encontrarse» y es predicativo. «En casa» es un complemento circunstancial de lugar, no un atributo.
¡Qué bonita es tu casa! | EX | S | es; E:tu casa; C:qué bonita; A; i | El atributo va delante por ser exclamativa: «Tu casa es qué bonita» → «Tu casa es muy bonita».
Juan se puso nervioso. | EA | S | se puso; E:Juan; SC:nervioso; A; i
Me quedé dormido en el autobús. | EA | S | me quedé; O:yo; SC:dormido; A; i
El examen resultó fácil. | EA | S | resultó; E:El examen; SC:fácil; A; i
Los niños siguen enfermos. | EA | S | siguen; E:Los niños; SC:enfermos; A; i
Mi prima se hizo médica. | EA | S | se hizo; E:Mi prima; SC:médica; A; i
Permaneció callado toda la tarde. | EA | S | permaneció; O:él/ella; SC:callado; A; i
Andas muy preocupado. | EA | S | andas; O:tú; SC:muy preocupado; A; i
El cielo se volvió gris. | EA | S | se volvió; E:El cielo; SC:gris; A; i
Los alumnos llegaron cansados. | EA | S | llegaron; E:Los alumnos; PI; A; i | «Cansados» es complemento predicativo, pero «llegar» no es semicopulativo. Sin él la oración sigue completa («Los alumnos llegaron»): es predicativa intransitiva con un complemento predicativo.
Encontré la casa vacía. | EA | S | encontré; O:yo; PT:la casa; A; i | «Vacía» es complemento predicativo del CD («la encontré vacía»), no atributo.
Mi abuela cocina muy bien. | EA | S | cocina; E:Mi abuela; PI; A; i | «Cocinar» es un verbo transitivo, pero aquí no lleva CD: la oración es intransitiva (uso absoluto del verbo).
Pienso mucho en ti. | EA | S | pienso; O:yo; PI; A; i | «En ti» es complemento de régimen (pensar en algo), no CD: la oración es intransitiva.
A mi hermana le encanta el chocolate. | EA | S | encanta; E:el chocolate; PI; A; i | El sujeto es «el chocolate»: concuerda con el verbo (le encantan los bombones). «A mi hermana» y «le» son complemento indirecto.
Me duelen los pies. | EA | S | duelen; E:los pies; PI; A; i | El sujeto es «los pies» (me duele el pie / me duelen los pies). «Me» es complemento indirecto.
El puente fue construido por los romanos. | EA | S | fue construido; E:El puente; PP:por los romanos; PF; i
La carta será enviada mañana. | EA | S | será enviada; E:La carta; PP; PF; i
Los ladrones fueron detenidos por la policía. | EA | S | fueron detenidos; E:Los ladrones; PP:por la policía; PF; i
El cuadro ha sido restaurado. | EA | S | ha sido restaurado; E:El cuadro; PP; PF; i
La ley fue aprobada por el Parlamento. | EA | S | fue aprobada; E:La ley; PP:por el Parlamento; PF; i
Las entradas serán vendidas en la taquilla. | EA | S | serán vendidas; E:Las entradas; PP; PF; i
Fuimos premiados por el jurado. | EA | S | fuimos premiados; O:nosotros; PP:por el jurado; PF; i
El ganador no ha sido elegido todavía. | EN | S | ha sido elegido; E:El ganador; PP; PF; i
Se venden pisos. | EA | S | se venden; E:pisos; PP; PR; i
Se alquila habitación. | EA | S | se alquila; E:habitación; PP; PR; i
En verano se consumen muchos helados. | EA | S | se consumen; E:muchos helados; PP; PR; i
Se han encontrado restos romanos. | EA | S | se han encontrado; E:restos romanos; PP; PR; i
Se necesitan camareros. | EA | S | se necesitan; E:camareros; PP; PR; i
Aquí se habla español. | EA | S | se habla; E:español; PP; PR; i
Se firmó el acuerdo ayer. | EA | S | se firmó; E:el acuerdo; PP; PR; i
¿Se arreglaron las ventanas? | IT | S | se arreglaron; E:las ventanas; PP; PR; i
Se vive bien en esta ciudad. | EA | S | se vive; IR; PI; A; i
Se trabaja mucho en esta empresa. | EA | S | se trabaja; IR; PI; A; i
Se busca a los culpables. | EA | S | se busca; IR; PT:a los culpables; A; i | No es pasiva refleja: «a los culpables» lleva preposición «a» y es CD de persona. El verbo queda en singular y no concuerda con él (no se dice «se buscan a los culpables» en la norma culta).
En esta casa se come muy bien. | EA | S | se come; IR; PI; A; i
Se sale por la puerta de atrás. | EA | S | se sale; IR; PI; A; i
Se castigó a los culpables. | EA | S | se castigó; IR; PT:a los culpables; A; i | Impersonal refleja con CD de persona («a los culpables»): el verbo no concuerda con él.
No se duerme bien con este calor. | EN | S | se duerme; IR; PI; A; i
Llaman a la puerta. | EA | S | llaman; I3; PI; A; i
Han robado en la joyería. | EA | S | han robado; I3; PI; A; i
Te han traído un paquete. | EA | S | han traído; I3; PT:un paquete; A; i | Impersonal eventual: no sabemos quién lo ha traído. Si el texto hubiera nombrado antes a alguien, sería sujeto omitido «ellos».
En la radio anunciaron tormentas. | EA | S | anunciaron; I3; PT:tormentas; A; i
Me han puesto una multa. | EA | S | han puesto; I3; PT:una multa; A; i
Hay mucha gente en la plaza. | EA | S | hay; IG; PT:mucha gente; A; i | Con «haber» impersonal, «mucha gente» es CD (la hay), no sujeto. Por eso el verbo no concuerda: «había muchas personas», no «habían».
Había dos coches en la calle. | EA | S | había; IG; PT:dos coches; A; i | «Dos coches» es CD de «haber» impersonal: por eso es «había», no «habían».
Hace mucho calor. | EA | S | hace; IG; PT:mucho calor; A; i | Con «hacer» impersonal, «mucho calor» es CD (lo hace).
Es tarde. | EA | S | es; IG; C:tarde; A; i | «Ser» impersonal + atributo: oración copulativa sin sujeto.
Ya es de noche. | EA | S | es; IG; C:de noche; A; i | «Ser» impersonal + atributo: oración copulativa sin sujeto.
¿Hay leche en la nevera? | IT | S | hay; IG; PT:leche; A; i
Hubo muchos problemas. | EA | S | hubo; IG; PT:muchos problemas; A; i
Hace un día precioso. | EA | S | hace; IG; PT:un día precioso; A; i
Llueve mucho en Galicia. | EA | S | llueve; IA; PI; A; i
Nevó toda la noche. | EA | S | nevó; IA; PI; A; i
Amanece muy temprano en verano. | EA | S | amanece; IA; PI; A; i
Ayer tronó durante horas. | EA | S | tronó; IA; PI; A; i
Está lloviendo. | EA | S | está lloviendo; IA; PI; A; i | ${NOTA_TIEMPO_PERIF}
Ojalá no llueva mañana. | DS | S | llueva; IA; PI; A; s
¿Has terminado los deberes? | IT | S | has terminado; O:tú; PT:los deberes; A; i
¿Dónde vives? | IP | S | vives; O:tú; PI; A; i
¿Quién ha roto el jarrón? | IP | S | ha roto; E:Quién; PT:el jarrón; A; i | El interrogativo «quién» es el sujeto: concuerda con «ha roto».
¿Cuándo llega tu padre? | IP | S | llega; E:tu padre; PI; A; i
¿Estás enfadada? | IT | S | estás; O:tú; C:enfadada; A; i
¡Qué frío hace! | EX | S | hace; IG; PT:qué frío; A; i | «Qué frío» es el CD de «hacer» impersonal, adelantado por ser exclamativa.
¡Cuánto has crecido! | EX | S | has crecido; O:tú; PI; A; i
¡Qué bien canta tu hermana! | EX | S | canta; E:tu hermana; PI; A; i
Cierra la ventana, por favor. | EH | S | cierra; O:tú; PT:la ventana; A; m
No toques el horno. | EH | S | toques; O:tú; PT:el horno; A; s | La prohibición (exhortación negativa) se expresa con subjuntivo: el imperativo no admite «no».
Venid aquí ahora mismo. | EH | S | venid; O:vosotros; PI; A; m
Sal de ahí. | EH | S | sal; O:tú; PI; A; m
Ojalá apruebes el examen. | DS | S | apruebes; O:tú; PT:el examen; A; s
¡Que tengas suerte! | DS | S | tengas; O:tú; PT:suerte; A; s | Aquí «que» no une dos oraciones: solo introduce el deseo. Es una oración simple desiderativa.
¡Ojalá vengan tus primos! | DS | S | vengan; E:tus primos; PI; A; s
Quizá venga mañana. | DB | S | venga; O:él/ella; PI; A; s
Tal vez llueva esta tarde. | DB | S | llueva; IA; PI; A; s
Probablemente lleguen tarde. | DB | S | lleguen; O:ellos/ellas; PI; A; s
Acaso tengas razón. | DB | S | tengas; O:tú; PT:razón; A; s
Tengo que estudiar más. | EA | S | tengo que estudiar; O:yo; PI; A; i | ${NOTA_TIEMPO_PERIF}
Vamos a comprar un regalo. | EA | S | vamos a comprar; O:nosotros; PT:un regalo; A; i | ${NOTA_TIEMPO_PERIF}
Mi hermano suele llegar tarde. | EA | S | suele llegar; E:Mi hermano; PI; A; i | ${NOTA_TIEMPO_PERIF}
Llegué, vi, vencí. | EA | Y | [Llegué] llegué; O:yo; PI; A; i || [vi] vi; O:yo; PI; A; i || [vencí] vencí; O:yo; PI; A; i
El cielo está gris; va a llover. | EA | Y | [El cielo está gris] está; E:El cielo; C:gris; A; i || [va a llover] va a llover; IA; PI; A; i
Ana canta, Luis toca la guitarra, Marta baila. | EA | Y | [Ana canta] canta; E:Ana; PI; A; i || [Luis toca la guitarra] toca; E:Luis; PT:la guitarra; A; i || [Marta baila] baila; E:Marta; PI; A; i
Llovía mucho; nos quedamos en casa. | EA | Y | [Llovía mucho] llovía; IA; PI; A; i || [nos quedamos en casa] nos quedamos; O:nosotros; PI; A; i
Juan estudia y María trabaja. | EA | CC:y | [Juan estudia] estudia; E:Juan; PI; A; i || [María trabaja] trabaja; E:María; PI; A; i
Mi padre cocina y mi madre friega los platos. | EA | CC:y | [Mi padre cocina] cocina; E:Mi padre; PI; A; i || [mi madre friega los platos] friega; E:mi madre; PT:los platos; A; i
Compramos pan y preparamos bocadillos. | EA | CC:y | [Compramos pan] compramos; O:nosotros; PT:pan; A; i || [preparamos bocadillos] preparamos; O:nosotros; PT:bocadillos; A; i
No estudia ni trabaja. | EN | CC:ni | [No estudia] estudia; O:él/ella; PI; A; i || [ni trabaja] trabaja; O:él/ella; PI; A; i
Mi hermana es médica y mi cuñado es abogado. | EA | CC:y | [Mi hermana es médica] es; E:Mi hermana; C:médica; A; i || [mi cuñado es abogado] es; E:mi cuñado; C:abogado; A; i
Nieva en la sierra y hace mucho frío. | EA | CC:y | [Nieva en la sierra] nieva; IA; PI; A; i || [hace mucho frío] hace; IG; PT:mucho frío; A; i
Se venden pisos y se alquilan locales. | EA | CC:y | [Se venden pisos] se venden; E:pisos; PP; PR; i || [se alquilan locales] se alquilan; E:locales; PP; PR; i
La casa fue vendida y los muebles se regalaron. | EA | CC:y | [La casa fue vendida] fue vendida; E:La casa; PP; PF; i || [los muebles se regalaron] se regalaron; E:los muebles; PP; PR; i
El niño se quedó dormido y sus padres siguieron preocupados. | EA | CC:y | [El niño se quedó dormido] se quedó; E:El niño; SC:dormido; A; i || [sus padres siguieron preocupados] siguieron; E:sus padres; SC:preocupados; A; i
¿Vienes con nosotros o te quedas en casa? | IT | CD:o | [Vienes con nosotros] vienes; O:tú; PI; A; i || [te quedas en casa] te quedas; O:tú; PI; A; i
¿Prefieres té o prefieres café? | IT | CD:o | [Prefieres té] prefieres; O:tú; PT:té; A; i || [prefieres café] prefieres; O:tú; PT:café; A; i
O estudias o trabajas. | EA | CD:o… o | [O estudias] estudias; O:tú; PI; A; i || [o trabajas] trabajas; O:tú; PI; A; i
Llámame o escríbeme un mensaje. | EH | CD:o | [Llámame] llama; O:tú; PT:me; A; m || [escríbeme un mensaje] escribe; O:tú; PT:un mensaje; A; m | En «escríbeme un mensaje», «me» es CI y el CD es «un mensaje». En «llámame», en cambio, «me» es el CD.
Es pobre, pero es feliz. | EA | CA:pero | [Es pobre] es; O:él/ella; C:pobre; A; i || [es feliz] es; O:él/ella; C:feliz; A; i
Hace sol, pero hace frío. | EA | CA:pero | [Hace sol] hace; IG; PT:sol; A; i || [hace frío] hace; IG; PT:frío; A; i
Juan es alto, pero su hermano es bajo. | EA | CA:pero | [Juan es alto] es; E:Juan; C:alto; A; i || [su hermano es bajo] es; E:su hermano; C:bajo; A; i
Salí temprano, pero llegué tarde. | EA | CA:pero | [Salí temprano] salí; O:yo; PI; A; i || [llegué tarde] llegué; O:yo; PI; A; i
Estudié mucho, pero suspendí. | EA | CA:pero | [Estudié mucho] estudié; O:yo; PI; A; i || [suspendí] suspendí; O:yo; PI; A; i
Se trabaja mucho, pero se vive bien. | EA | CA:pero | [Se trabaja mucho] se trabaja; IR; PI; A; i || [se vive bien] se vive; IR; PI; A; i
El partido se suspendió y los aficionados se marcharon. | EA | CC:y | [El partido se suspendió] se suspendió; E:El partido; PP; PR; i || [los aficionados se marcharon] se marcharon; E:los aficionados; PI; A; i | En «los aficionados se marcharon», «se» forma parte del verbo pronominal «marcharse»: no es pasiva ni impersonal.
El perro ladra y el gato maúlla. | EA | CC:y | [El perro ladra] ladra; E:El perro; PI; A; i || [el gato maúlla] maúlla; E:el gato; PI; A; i
Unos cantan, otros bailan. | EA | Y | [Unos cantan] cantan; E:Unos; PI; A; i || [otros bailan] bailan; E:otros; PI; A; i
Mi tío es simpático, pero mi tía es seria. | EA | CA:pero | [Mi tío es simpático] es; E:Mi tío; C:simpático; A; i || [mi tía es seria] es; E:mi tía; C:seria; A; i
¿Te quedas o te vas? | IT | CD:o | [Te quedas] te quedas; O:tú; PI; A; i || [te vas] te vas; O:tú; PI; A; i
Iremos al cine o veremos una película en casa. | EA | CD:o | [Iremos al cine] iremos; O:nosotros; PI; A; i || [veremos una película en casa] veremos; O:nosotros; PT:una película; A; i
La comida estaba rica y el postre estaba delicioso. | EA | CC:y | [La comida estaba rica] estaba; E:La comida; C:rica; A; i || [el postre estaba delicioso] estaba; E:el postre; C:delicioso; A; i
La carta fue escrita por Ana y Pedro la envió. | EA | CC:y | [La carta fue escrita por Ana] fue escrita; E:La carta; PP:por Ana; PF; i || [Pedro la envió] envió; E:Pedro; PT:la; A; i | En la segunda proposición, «la» es el CD (sustituye a «la carta»).
Truena, llueve, hace viento. | EA | Y | [Truena] truena; IA; PI; A; i || [llueve] llueve; IA; PI; A; i || [hace viento] hace; IG; PT:viento; A; i
Marta canta bien, pero Lucía canta mejor. | EA | CA:pero | [Marta canta bien] canta; E:Marta; PI; A; i || [Lucía canta mejor] canta; E:Lucía; PI; A; i
¿Qué estás leyendo? | IP | S | estás leyendo; O:tú; PT:Qué; A; i | «Estás leyendo» es una perífrasis (un solo verbo). El interrogativo «qué» es el CD: «lo estás leyendo».
¿Por qué llora el bebé? | IP | S | llora; E:el bebé; PI; A; i
¿Cuántos años tiene tu abuelo? | IP | S | tiene; E:tu abuelo; PT:Cuántos años; A; i
¿Dónde está la biblioteca? | IP | S | está; E:la biblioteca; PI; A; i | «Estar» + lugar no es copulativa: significa «encontrarse», y «dónde» es CC de lugar.
¡Qué cansado estoy! | EX | S | estoy; O:yo; C:qué cansado; A; i
¡Cuánta gente hay aquí! | EX | S | hay; IG; PT:Cuánta gente; A; i | «Cuánta gente» es el CD de «haber» impersonal (la hay), no el sujeto.
¡Qué rápido corre ese caballo! | EX | S | corre; E:ese caballo; PI; A; i
Haz los deberes ahora. | EH | S | haz; O:tú; PT:los deberes; A; m
No salgáis de casa. | EH | S | salgáis; O:vosotros; PI; A; s | Prohibición: «no» + subjuntivo. Es exhortativa, no enunciativa negativa.
Escuchad con atención. | EH | S | escuchad; O:vosotros; PI; A; m
No me mientas nunca. | EH | S | mientas; O:tú; PI; A; s
Ojalá nos toque la lotería. | DS | S | toque; E:la lotería; PI; A; s | «La lotería» es el sujeto: concuerda con «toque». «Nos» es CI.
Que os divirtáis en la fiesta. | DS | S | os divirtáis; O:vosotros; PI; A; s
Quizás estén en el parque. | DB | S | estén; O:ellos/ellas; PI; A; s
Posiblemente Ana conozca la respuesta. | DB | S | conozca; E:Ana; PT:la respuesta; A; s
Nadie ha llamado esta mañana. | EN | S | ha llamado; E:Nadie; PI; A; i | «Nadie» es el sujeto (concuerda con «ha llamado») y hace negativa la oración.
Nunca he estado en París. | EN | S | he estado; O:yo; PI; A; i
Mi hermano no es nada simpático. | EN | S | es; E:Mi hermano; C:nada simpático; A; i
¿Habéis cenado ya? | IT | S | habéis cenado; O:vosotros; PI; A; i
¿Está abierta la farmacia? | IT | S | está; E:la farmacia; C:abierta; A; i | El sujeto va al final: «la farmacia está abierta».
Se alquilan bicicletas. | EA | S | se alquilan; E:bicicletas; PP; PR; i
Se necesita camarero. | EA | S | se necesita; E:camarero; PP; PR; i | Aunque es de persona, «camarero» va sin «a» y concuerda con el verbo (se necesitan camareros): es sujeto paciente.
En verano se venden muchos helados. | EA | S | se venden; E:muchos helados; PP; PR; i
¿Se arreglan relojes aquí? | IT | S | se arreglan; E:relojes; PP; PR; i
Los alumnos fueron castigados por el director. | EA | S | fueron castigados; E:Los alumnos; PP:por el director; PF; i
La novela fue escrita en 1605. | EA | S | fue escrita; E:La novela; PP; PF; i
Mi abuelo se ha quedado sordo. | EA | S | se ha quedado; E:Mi abuelo; SC:sordo; A; i
Los niños siguen dormidos. | EA | S | siguen; E:Los niños; SC:dormidos; A; i
La reunión resultó muy aburrida. | EA | S | resultó; E:La reunión; SC:muy aburrida; A; i
Te llaman por teléfono. | EA | S | llaman; I3; PT:Te; A; i | «Te» es el CD (llamar a alguien → te llaman).
En ese restaurante cocinan muy bien. | EA | S | cocinan; I3; PI; A; i
Se habla demasiado en clase. | EA | S | se habla; IR; PI; A; i
Está nevando en la sierra. | EA | S | está nevando; IA; PI; A; i
Hubo un accidente en la autopista. | EA | S | hubo; IG; PT:un accidente; A; i | «Un accidente» es CD, no sujeto: con haber impersonal no hay sujeto (lo hubo).
Estoy cansado: necesito un descanso. | EA | Y | [Estoy cansado] estoy; O:yo; C:cansado; A; i || [necesito un descanso] necesito; O:yo; PT:un descanso; A; i
Pedro friega, Luis barre, yo cocino. | EA | Y | [Pedro friega] friega; E:Pedro; PI; A; i || [Luis barre] barre; E:Luis; PI; A; i || [yo cocino] cocino; E:yo; PI; A; i
¿Estudias o trabajas? | IT | CD:o | [Estudias] estudias; O:tú; PI; A; i || [trabajas] trabajas; O:tú; PI; A; i
Apruebas el examen o repites el curso. | EA | CD:o | [Apruebas el examen] apruebas; O:tú; PT:el examen; A; i || [repites el curso] repites; O:tú; PT:el curso; A; i
El coche es viejo, pero funciona perfectamente. | EA | CA:pero | [El coche es viejo] es; E:El coche; C:viejo; A; i || [funciona perfectamente] funciona; O:él/ella; PI; A; i
Mi madre trabaja en un hospital e Irene estudia Derecho. | EA | CC:e | [Mi madre trabaja en un hospital] trabaja; E:Mi madre; PI; A; i || [Irene estudia Derecho] estudia; E:Irene; PT:Derecho; A; i | Se usa «e» en lugar de «y» porque la palabra siguiente empieza por i-.
`;

  const MODALIDAD = {
    EA: ['enunciativa afirmativa', 'El hablante afirma un hecho; entonación descendente y punto final.'],
    EN: ['enunciativa negativa', 'El hablante niega un hecho (no, nunca, nadie, ni…).'],
    IT: ['interrogativa directa total', 'Pregunta por toda la oración: se responde sí o no.'],
    IP: ['interrogativa directa parcial', 'Pregunta por una parte de la oración con un interrogativo (qué, quién, dónde, cuándo…).'],
    EX: ['exclamativa', 'Expresa emoción o sorpresa; va entre signos de exclamación.'],
    EH: ['exhortativa', 'Expresa una orden, un ruego o una prohibición (imperativo o subjuntivo).'],
    DS: ['desiderativa', 'Expresa un deseo (ojalá, que + subjuntivo).'],
    DB: ['dubitativa', 'Expresa duda o probabilidad (quizá, tal vez, acaso, probablemente…).']
  };
  const ESTRUCTURA = {
    S: ['simple', 'Un solo verbo (un solo núcleo verbal).'],
    Y: ['compuesta yuxtapuesta', 'Varias proposiciones unidas sin nexo, solo con signos de puntuación (coma, punto y coma, dos puntos).'],
    CC: ['compuesta coordinada copulativa', 'Suma las proposiciones con un nexo copulativo (y, e, ni).'],
    CD: ['compuesta coordinada disyuntiva', 'Presenta las proposiciones como alternativas con un nexo disyuntivo (o, u).'],
    CA: ['compuesta coordinada adversativa', 'Opone o corrige una proposición con otra con un nexo adversativo (pero, mas, sino, sin embargo).']
  };
  const SUJETO = {
    E: 'sujeto explícito', O: 'sujeto omitido (tácito o elíptico)', I3: 'impersonal eventual (de 3.ª persona del plural)',
    IR: 'impersonal refleja', IG: 'impersonal gramaticalizada', IA: 'impersonal atmosférica (unipersonal)'
  };
  const PREDICADO = { C: 'copulativa', SC: 'semicopulativa', PT: 'predicativa transitiva', PI: 'predicativa intransitiva', PP: 'predicativa en voz pasiva' };
  const DIATESIS = { A: 'activa', PF: 'pasiva perifrástica', PR: 'pasiva refleja' };
  const MODO = { i: 'indicativo', s: 'subjuntivo', m: 'imperativo' };

  const ORACIONES = [];
  for (const linea of DATOS.split('\n')) {
    if (!linea.trim()) continue;
    const [texto, mod, est, propsTxt, ...resto] = linea.split(' | ').map(x => x.trim());
    const [estCod, nexo = ''] = est.split(':');
    const props = propsTxt.split(' || ').map(p => {
      const m = p.match(/^\[([^\]]+)\]\s*(.*)$/);
      const [verbo, suj, pred, diat, modo] = (m ? m[2] : p).split(';').map(x => x.trim());
      const [sujCod, sujTxt = ''] = suj.split(/:(.*)/s);
      const [predCod, predTxt = ''] = pred.split(/:(.*)/s);
      return { texto: m ? m[1] : texto.replace(/[.!?¡¿]/g, '').trim(), verbo, suj: sujCod, sujTxt, pred: predCod, predTxt, diat, modo };
    });
    ORACIONES.push({ texto, mod, est: estCod, nexo, props, nota: resto.join(' | ') });
  }

  // ───────── Corrección redactada y líneas para marcar ─────────
  const ORD = ['1.ª', '2.ª', '3.ª', '4.ª'];
  function sujetoTxt(p) {
    if (p.suj === 'E') return `Sujeto explícito: «${p.sujTxt}», que concuerda en número y persona con «${p.verbo}».`;
    if (p.suj === 'O') return `Sujeto omitido (tácito o elíptico): «${p.sujTxt}», se deduce de la desinencia de «${p.verbo}».`;
    return {
      I3: `Impersonal eventual: «${p.verbo}» va en 3.ª persona del plural, pero no hay un sujeto concreto (no se sabe quién lo hace).`,
      IR: `Impersonal refleja: «se» + verbo en 3.ª persona del singular («${p.verbo}») sin sujeto, ni explícito ni omitido.`,
      IG: `Impersonal gramaticalizada: «${p.verbo}» (haber, hacer o ser) se usa sin sujeto.`,
      IA: `Impersonal atmosférica (unipersonal): «${p.verbo}» expresa un fenómeno de la naturaleza y no tiene sujeto.`
    }[p.suj];
  }
  function predicadoTxt(p) {
    return {
      C: `Copulativa: verbo copulativo («${p.verbo}») + atributo «${p.predTxt}».`,
      SC: `Semicopulativa: verbo semicopulativo («${p.verbo}») + complemento predicativo «${p.predTxt}», que concuerda con el sujeto.`,
      PT: `Predicativa transitiva: lleva complemento directo («${p.predTxt}»).`,
      PI: 'Predicativa intransitiva: no lleva complemento directo.',
      PP: `Predicativa en voz pasiva: el sujeto recibe la acción${p.predTxt ? `; complemento agente «${p.predTxt}»` : ', sin complemento agente'}. En pasiva no se habla de transitiva o intransitiva.`
    }[p.pred];
  }
  function diatesisTxt(p) {
    return {
      A: 'Activa' + (['C', 'SC'].includes(p.pred) ? ': el verbo está en forma activa (la oposición activa/pasiva se da en las predicativas).' : ': el verbo está en forma activa.'),
      PF: `Pasiva perifrástica: ser + participio («${p.verbo}»), que concuerda con el sujeto paciente.`,
      PR: `Pasiva refleja: «se» + verbo en 3.ª persona («${p.verbo}») que concuerda con un sujeto paciente de cosa.`
    }[p.diat];
  }
  const modoTxt = p => `Modo ${MODO[p.modo]} («${p.verbo}»).`;
  const sujetoCorto = p => p.suj === 'E' ? `con sujeto explícito («${p.sujTxt}»)` : p.suj === 'O' ? `con sujeto omitido («${p.sujTxt}»)` : SUJETO[p.suj];
  const predCorto = p => (p.pred === 'PP' ? 'predicativa' : PREDICADO[p.pred]) + (p.pred === 'C' ? ` (atributo: «${p.predTxt}»)` : p.pred === 'SC' ? ` (complemento predicativo: «${p.predTxt}»)` : p.pred === 'PT' ? ` (CD: «${p.predTxt}»)` : p.pred === 'PP' && p.predTxt ? ` (complemento agente: «${p.predTxt}»)` : '');
  const diatCorto = p => p.diat === 'A' ? 'en voz activa' : `en voz ${DIATESIS[p.diat]}`;

  function correccion(o) {
    const compuesta = o.est !== 'S';
    const estNombre = ESTRUCTURA[o.est][0] + (compuesta && o.nexo ? ` (nexo «${o.nexo}»)` : '');
    const lineas = [
      { grupo: 'ora', titulo: 'Modalidad', txt: `${MODALIDAD[o.mod][0][0].toUpperCase() + MODALIDAD[o.mod][0].slice(1)}: ${MODALIDAD[o.mod][1][0].toLowerCase() + MODALIDAD[o.mod][1].slice(1)}` },
      { grupo: 'ora', titulo: 'Estructura', txt: compuesta ? `Oración ${estNombre}: ${o.props.length} proposiciones. ${ESTRUCTURA[o.est][1][0].toLowerCase() + ESTRUCTURA[o.est][1].slice(1)}` : `Oración simple: un solo núcleo verbal («${o.props[0].verbo}»).` }
    ];
    o.props.forEach((p, k) => {
      const pre = compuesta ? `${ORD[k]} proposición · ` : '';
      lineas.push({ grupo: 'prop', titulo: pre + 'Sujeto', txt: sujetoTxt(p) });
      lineas.push({ grupo: 'prop', titulo: pre + 'Predicado', txt: predicadoTxt(p) });
      lineas.push({ grupo: 'prop', titulo: pre + 'Diátesis', txt: diatesisTxt(p) });
      lineas.push({ grupo: 'prop', titulo: pre + 'Modo', txt: modoTxt(p) });
    });
    const resumenProp = p => `${sujetoCorto(p)}, ${predCorto(p)}, ${diatCorto(p)} y con el verbo en ${MODO[p.modo]}`;
    const redaccion = compuesta
      ? `Oración ${estNombre}, ${MODALIDAD[o.mod][0]}, formada por ${o.props.length} proposiciones. ` + o.props.map((p, k) => `${ORD[k]}: «${p.texto}», ${resumenProp(p)}.`).join(' ')
      : `Oración simple, ${MODALIDAD[o.mod][0]}, ${resumenProp(o.props[0])}.`;
    return { lineas, redaccion };
  }

  // ───────── Respuesta escrita (modo Identificar) ─────────
  // Reconoce lo que escribe el alumno: cada código tiene sus palabras clave; «incompleta» avisa
  // cuando falta precisar (p. ej. «pasiva» sin decir cuál) y no cuenta como fallo.
  const sinTildes = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();
  const CLAVES = {
    est: { S: n => /\bsimple/.test(n), Y: n => /yuxtapuest/.test(n), CC: n => /copulativ/.test(n) && !/semi/.test(n), CD: n => /disyuntiv/.test(n), CA: n => /adversativ/.test(n) },
    mod: {
      EA: n => /afirmativ/.test(n), EN: n => /negativ/.test(n) && !/interrog|exclam/.test(n),
      IT: n => /interrogativ/.test(n) && /total/.test(n), IP: n => /interrogativ/.test(n) && /parcial/.test(n),
      EX: n => /exclamativ/.test(n), EH: n => /exhortativ|imperativ|apelativ/.test(n), DS: n => /desiderativ|optativ/.test(n), DB: n => /dubitativ/.test(n)
    },
    suj: {
      E: n => /explicit|expres/.test(n), O: n => /omitid|tacit|elipti/.test(n),
      I3: n => /plural|eventual|tercera|\b3/.test(n), IR: n => /reflej/.test(n) && !/pasiv/.test(n),
      IG: n => /gramatical|haber|hacer/.test(n), IA: n => /atmosferic|unipersonal|meteorolog|fenomeno|natural/.test(n)
    },
    pred: { C: n => /copulativ/.test(n) && !/semi/.test(n), SC: n => /semi ?copulativ/.test(n), PT: n => /transitiv/.test(n) && !/intransitiv/.test(n), PI: n => /intransitiv/.test(n), PP: n => /pasiv/.test(n) },
    diat: { A: n => /activ/.test(n), PF: n => /perifrastic/.test(n), PR: n => /reflej/.test(n) },
    modo: { i: n => /indicativ/.test(n), s: n => /subjuntiv/.test(n), m: n => /imperativ/.test(n) }
  };
  const INCOMPLETA = {
    est: [/compuest|coordinad/, '¿Yuxtapuesta o coordinada? Y si es coordinada, ¿de qué tipo?'],
    mod: [/enunciativ|interrogativ/, 'Precisa más: enunciativa afirmativa o negativa; interrogativa total o parcial.'],
    suj: [/impersonal/, '¿Qué tipo de impersonal?'],
    pred: [/predicativ/, '¿Transitiva o intransitiva?'],
    diat: [/pasiv/, '¿Pasiva perifrástica o pasiva refleja?'],
    modo: [/$^/, '']
  };
  function interpretar(asp, texto) {
    const n = sinTildes(texto);
    if (!n) return { estado: 'vacia' };
    const codigos = Object.entries(CLAVES[asp]).filter(([, f]) => f(n)).map(([c]) => c);
    if (codigos.length === 1) return { estado: 'ok', codigo: codigos[0] };
    if (codigos.length > 1) return { estado: 'varias', codigos };
    const [re, pista] = INCOMPLETA[asp];
    return re.test(n) ? { estado: 'incompleta', pista } : { estado: 'desconocida' };
  }

  // ───────── Dificultad ─────────
  function puntuacion(o) {
    let p = { EA: 0, EN: 0.3, IT: 0.5, IP: 1, EX: 1, EH: 0.6, DS: 0.8, DB: 0.8 }[o.mod];
    if (o.est !== 'S') p += 1.5 + 0.5 * (o.props.length - 1) + (o.est === 'Y' ? 0.5 : 0);
    for (const x of o.props) {
      p += { E: 0, O: 0.5, I3: 2, IR: 2.5, IG: 1.5, IA: 1 }[x.suj];
      p += { C: 0.5, SC: 2, PT: 0.5, PI: 0, PP: 1.5 }[x.pred];
      p += { A: 0, PF: 1.5, PR: 3 }[x.diat];
      p += { i: 0, s: 0.5, m: 0.3 }[x.modo];
      if (x.verbo.includes(' ') && !/^(se|me|te|nos|os) /.test(x.verbo) && x.diat !== 'PF') p += 0.8; // perífrasis
    }
    if (o.nota) p += 2.5; // las que llevan nota tienen trampa
    return Math.round(p * 10) / 10;
  }

  const API = { ORACIONES, MODALIDAD, ESTRUCTURA, SUJETO, PREDICADO, DIATESIS, MODO, correccion, puntuacion, interpretar };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.Sintaxis = API;
})(typeof window !== 'undefined' ? window : globalThis);
