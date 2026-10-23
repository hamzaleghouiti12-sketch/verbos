// Funciona sin conexión: la app se guarda al instalarse y se actualiza cuando hay red.
// Al cambiar cualquier archivo, sube VERSION para que los móviles descarguen la nueva.
const VERSION = 'lengua-v3';
const APP = ['./', 'index.html', 'morfemas.html', 'estilo.css', 'motor.js', 'morfemas-datos.js',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Primero la red (para recibir las mejoras); sin conexión, la copia guardada
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(fetch(req)
    .then(res => { if (res.ok) { const copia = res.clone(); caches.open(VERSION).then(c => c.put(req, copia)); } return res; })
    .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html'))));
});
