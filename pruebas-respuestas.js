// Pruebas del intérprete de respuestas de verbos: node pruebas-respuestas.js
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/index.html', 'utf8');
eval(src.slice(src.indexOf('// Erratas pequeñas'), src.indexOf('// ───────── Utilidades de vista'))); // las funciones declaradas en eval quedan en este ámbito
let mal = 0;
const caso = (txt, id) => { const r = interpretar(txt); if ((r.id || r.error && 'ERROR') !== id) { mal++; console.log(`✗ «${txt}» → ${JSON.stringify(r)} (esperado ${id})`); } };
// formas correctas
caso('indicativo presente', 'ind_pres'); caso('subjuntivo imperfecto', 'sub_impf'); caso('imperativo', 'imp'); caso('ind pres', 'ind_pres');
caso('indicativo futuro imperfecto', 'ind_fut'); caso('indicativo preterito perfecto simple', 'ind_indef'); caso('indicativo pretérito perfecto', 'ind_pps');
caso('subjuntivo pretérito perfecto', 'sub_pp'); caso('condicional compuesto', 'ind_condc'); caso('indicativo copretérito', 'ind_impf');
// erratas
caso('subjuntibo presente', 'sub_pres'); caso('indicativo pluscuamperfeto', 'ind_plusc'); caso('condiconal', 'ind_cond');
caso('inperativo', 'imp'); caso('indicatibo presnte', 'ind_pres'); caso('subjuntivo imperfeto', 'sub_impf');
caso('indicativo futuro compusto', 'ind_futc'); caso('preterito anteriror', 'ind_ant'); caso('indefinodo', 'ind_indef');
// lo que no debe cambiar de significado por la corrección
caso('indicativo perfecto', 'ind_pps'); caso('subjuntivo pluscuamperfecto', 'sub_plusc'); caso('presente', 'ERROR');
console.log(mal ? `${mal} casos mal` : 'Intérprete de respuestas: todos los casos bien');
