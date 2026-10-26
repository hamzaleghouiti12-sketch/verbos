// Lanza todas las pruebas antes de publicar: node pruebas-todo.js
// 1) compila los scripts de las páginas (evita publicar una página rota por un error de sintaxis)
// 2) ejecuta las baterías de pruebas de cada parte
const fs = require('fs');
const { execFileSync } = require('child_process');
let fallos = 0;

const compilar = (nombre, codigo) => {
  try { new Function(codigo); console.log(`✓ sintaxis ${nombre}`); }
  catch (e) { fallos++; console.log(`✗ sintaxis ${nombre}: ${e.message}`); }
};
for (const f of ['index.html', 'morfemas.html', 'maestro.html', 'desafio.html']) {
  const html = fs.readFileSync(__dirname + '/' + f, 'utf8');
  const bloques = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  bloques.forEach((b, i) => compilar(`${f} (script ${i + 1})`, b));
  // cada archivo enlazado debe existir y estar en la caché sin conexión
  const sw = fs.readFileSync(__dirname + '/sw.js', 'utf8');
  for (const [, src] of html.matchAll(/<script src="([^"]+)"/g)) {
    if (!fs.existsSync(__dirname + '/' + src)) { fallos++; console.log(`✗ ${f} enlaza ${src}, que no existe`); }
    if (!sw.includes(`'${src}'`)) { fallos++; console.log(`✗ ${src} no está en la caché de sw.js`); }
  }
}
for (const f of ['comun.js', 'motor.js', 'morfemas-datos.js', 'lecciones.js', 'clasificacion.js', 'sw.js']) compilar(f, fs.readFileSync(__dirname + '/' + f, 'utf8'));

for (const p of ['pruebas.js', 'pruebas-morfemas.js', 'pruebas-redaccion.js', 'pruebas-respuestas.js', 'maestro.js --lecciones']) {
  const [archivo, ...arg] = p.split(' ');
  let salida;
  try { salida = execFileSync(process.execPath, [__dirname + '/' + archivo, ...arg], { encoding: 'utf8' }); } catch (e) { salida = e.stdout || '✗ no se pudo ejecutar'; }
  const mal = salida.split('\n').filter(l => l.startsWith('✗') || /\d+ (casos|problemas)( mal)?$/.test(l.trim()) && !/^0 /.test(l.trim()));
  if (mal.length) { fallos++; console.log(`✗ ${p}:\n  ${mal.join('\n  ')}`); }
  else console.log(`✓ ${p}`);
}
// cada palabra de una categoría con desafío tiene que tener su clasificación gramatical
{
  const M = require('./morfemas-datos.js'), C = require('./clasificacion.js');
  for (const cat of Object.keys(C.PREGUNTAS)) {
    const sin = [...new Set(M.ITEMS.filter(it => it.cat === cat && !C.clasificar(it)).map(it => it.palabra))];
    if (sin.length) { fallos++; console.log(`✗ sin clasificar (${cat}): ${sin.slice(0, 12).join(', ')}${sin.length > 12 ? '…' : ''}`); }
    else console.log(`✓ clasificación de ${cat}`);
  }
}
console.log(fallos ? `\n${fallos} problemas: no publicar` : '\nTodo correcto: se puede publicar');
process.exit(fallos ? 1 : 0);
