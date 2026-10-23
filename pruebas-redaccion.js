// Pruebas del corrector de la redacción: node pruebas-redaccion.js
const M = require('./morfemas-datos.js');
const by = w => M.ITEMS.find(i => i.palabra === w);
let fallos = 0;
const caso = (w, txt, esperado) => {
  const r = M.corregirRedaccion(by(w), txt);
  if (r.ok !== esperado) { fallos++; console.log(`✗ ${w} (${esperado ? 'debía aprobar' : 'debía suspender'}): ${txt}\n   ${r.morfemas.map(m => m.seg + ':' + m.estado + (m.puesto ? '(' + m.puesto + ')' : '')).join(' ')} | forma ${r.form}`); }
};
// redacciones correctas escritas de formas distintas
caso('panadero', 'pan-: lexema; -ad-: interfijo; -er-: sufijo derivativo; -o: morfema de género. Palabra derivada.', true);
caso('panadero', 'El lexema es pan, el interfijo -ad-, el sufijo -er- y el morfema de género -o. Es derivada.', true);
caso('panadero', 'Pan es la raíz, -ad- es un interfijo, -er- es un sufijo y -o es el morfema de género. Derivada.', true);
caso('panadero', 'pan-ad-er-o\npan-: lexema\n-ad-: interfijo\n-er-: sufijo\n-o: morfema flexivo de género\nPalabra derivada', true);
caso('casita', 'cas-: lexema; -it-: sufijo diminutivo; -a: vocal temática. Derivada.', true);
caso('casita', 'cas-: lexema; -it-: sufijo; -a: vocal temática. Derivada.', true);
caso('cochecito', 'El lexema es coch, -ec- es un interfijo, -it- un sufijo apreciativo diminutivo y -o la vocal temática. Es derivada.', true);
caso('desalmado', 'des- es un prefijo, alm- el lexema, -ad- un sufijo y -o el morfema de género. Es parasintética porque no existe desalma ni almado.', true);
caso('comiéramos', 'com- lexema, -ié- vocal temática, -ra- tiempo aspecto y modo, -mos número y persona. Simple.', true);
caso('cantábamos', 'cant-: lexema; -á-: vocal temática; -ba-: morfema de tiempo, aspecto y modo; -mos: morfema de número y persona. Es simple.', true);
caso('sacacorchos', 'sac- lexema, -a- vocal temática, corch- lexema, -o- vocal temática, -s número. Compuesta.', true);
caso('hierbabuena', 'hierb-: lexema; -a-: vocal temática; buen-: lexema; -a: morfema de género. Compuesta.', true);
caso('rápidamente', 'rápid-: lexema; -a-: morfema de género; -mente: sufijo que forma adverbios de modo. Es derivada.', true);
caso('niñas', 'niñ-: raíz; -a-: género femenino; -s: plural. Palabra simple.', true);
caso('enrojecer', 'en-: prefijo; roj-: lexema; -ec-: sufijo; -e-: vocal temática; -r: infinitivo. Es parasintética.', true);
caso('casas', 'cas-: lexema; -a-: morfema de género; -s: morfema de número. Simple.', true);
// redacciones que deben suspender
caso('panadero', 'Pan es la raíz, -ad- es un sufijo, -er- sufijo, -o género. Es una palabra derivada.', false);
caso('panadero', 'Es derivada porque tiene sufijos.', false);
caso('panadero', 'pan-: lexema; -ad-: interfijo; -er-: sufijo; -o: morfema de género.', false);            // sin formación
caso('panadero', 'pan-: lexema; -ad-: interfijo; -er-: sufijo; -o: género. Es compuesta.', false);          // formación mal
caso('niñas', 'niñ-: lexema; -a-: vocal temática; -s: número. Simple.', false);                          // -a es género
caso('enrojecer', 'en-: prefijo; roj-: lexema; -ec-: sufijo; -e-: vocal temática; -r: infinitivo. Es derivada.', false);
caso('cantábamos', 'cant-: lexema; -á-: vocal temática; -ba-: número y persona; -mos: tiempo. Simple.', false);
caso('sacacorchos', 'sac- lexema, -a- vocal temática, corch- lexema, -o- vocal temática. Compuesta.', false); // falta -s
console.log(fallos ? `${fallos} casos mal` : 'Corrector de redacción: todos los casos bien');

// Paso 2 · identificación
let fallosId = 0;
const id = (w, tipos, form, esperado) => {
  const r = M.corregirIdentificacion(by(w), tipos.split(' '), form);
  if (r.ok !== esperado) { fallosId++; console.log(`✗ identificar ${w} ${tipos} ${form}: ${r.ok ? 'aprobó' : 'suspendió'}`); }
};
id('panadero', 'L I S G', 'derivada', true);
id('panadero', 'L S S G', 'derivada', false);        // -ad- es interfijo
id('casas', 'L V N', 'simple', true);
id('casas', 'L G N', 'simple', true);                 // variante de manual
id('niñas', 'L V N', 'simple', false);                // -a sí tiene oposición de género
id('casita', 'L A V', 'derivada', true);
id('casita', 'L S V', 'derivada', true);              // «sufijo» sin precisar: se acepta con nota
id('casita', 'L I V', 'derivada', false);
id('enrojecer', 'P L S V R', 'parasintética', true);
id('enrojecer', 'P L I V R', 'parasintética', true);  // ‑ec‑ como interfijo: variante
id('enrojecer', 'P L S V R', 'derivada', false);
id('rápidamente', 'L G S', 'compuesta', true);        // variante de manual
id('rápidamente', 'L V S', 'derivada', false);        // -a es género (femenino del adjetivo)
id('cantábamos', 'L V T X', 'simple', true);
id('cantábamos', 'L V X T', 'simple', false);
id('canto', 'L X', 'simple', true);
id('canto', 'L T', 'simple', true);                   // amalgama
id('malgastar', 'L L V R', 'derivada', true);
id('sacacorchos', 'L V L V N', 'compuesta', true);
id('sacacorchos', 'L V L V N', 'derivada', false);
console.log(fallosId ? `${fallosId} casos de identificación mal` : 'Corrector de identificación: todos los casos bien');
