// Utilidades compartidas por los dos juegos (Verbos y Morfemas): iconos, azar, formato,
// aviso tipo Dynamic Island, anillo de nota y navegación con el botón «atrás».
// Cada página define después pintarInicio() y sus propias vistas.
'use strict';
const $ = s => document.querySelector(s);

// ───────── Iconos (mismo trazo que Metas) ─────────
const ICONS = {
  left: '<path d="M15 5l-7 7 7 7"/>', right: '<path d="M9 5l7 7-7 7"/>', check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>', minus: '<path d="M5 12h14"/>', down: '<path d="M12 4v12M6 11l6 6 6-6M5 20h14"/>',
  sliders: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2.2"/><circle cx="10" cy="17" r="2.2"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
  text: '<path d="M5 6h14M12 6v13M9 19h6"/>',
  table: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M3.5 9.5h17M3.5 14.5h17M10 9.5v10"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2.2-2.4 3.7M12 17.2v.3"/>',
  pencil: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
  flame: '<path d="M12 3c.6 3.4 5 5.2 5 10.2a5 5 0 0 1-10 0c0-2.4 1.1-4 2.4-5.2.2 1.7 1 2.8 2.1 3.2C11.2 8.6 11.6 5.8 12 3z"/>',
  scissors: '<circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><path d="M8 8.5L20 17M8 15.5L20 7"/>'
};
const svg = (n, s = 20, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;
const pintarIconos = (root = document) => root.querySelectorAll('i[data-i]').forEach(i => { i.outerHTML = svg(i.dataset.i, +i.dataset.s || 20, +i.dataset.w || 2); });
function miniRing(p, color, size = 30, sw = 4.5) {
  const r = (size - sw) / 2, c = 2 * Math.PI * r, h = size / 2;
  return `<svg class="mini" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="--goal:${color};flex:none" aria-hidden="true">
    <circle class="t" cx="${h}" cy="${h}" r="${r}" stroke-width="${sw}"/>
    <circle class="p" cx="${h}" cy="${h}" r="${r}" stroke-width="${sw}" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${(c * (1 - p)).toFixed(2)}" transform="rotate(-90 ${h} ${h})" ${p <= 0 ? 'stroke-opacity="0"' : ''}/></svg>`;
}

// ───────── Azar (criptográfico, sin semilla repetible) ─────────
const rnd = n => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; };
const barajar = a => { for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// ───────── Formato ─────────
const colorNota = n => n >= 7 ? 'var(--green)' : n >= 5 ? 'var(--orange)' : 'var(--red)';
const clasePill = n => n >= 7 ? 'good' : n >= 5 ? 'mid' : 'bad';
const calif = n => n >= 9 ? 'Sobresaliente' : n >= 7 ? 'Notable' : n >= 6 ? 'Bien' : n >= 5 ? 'Aprobado' : 'Suspenso';
const fmt = n => n.toFixed(1).replace('.', ',');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const tile = (icon, c, head, val, sub = '') => `<div class="tile" style="--c:${c}"><div class="tile-head">${svg(icon, 17, 2.4)}${head}</div><div class="tile-val num">${val}</div>${sub ? `<div class="tile-sub">${sub}</div>` : ''}</div>`;

// ───────── Anillo de nota ─────────
function anillo(el, frac, color) {
  const L = 2 * Math.PI * 100;
  el.closest('.hero').style.setProperty('--goal', color);
  el.style.strokeDasharray = L; el.style.transition = 'none'; el.style.strokeDashoffset = L;
  el.style.strokeOpacity = frac > 0 ? 1 : 0;
  void el.getBoundingClientRect(); el.style.transition = '';
  requestAnimationFrame(() => el.style.strokeDashoffset = L * (1 - frac));
}

// ───────── Aviso tipo Dynamic Island ─────────
let toastTimer;
function toast(text, warn = false) {
  const t = $('#toast'), ic = t.querySelector('.ic');
  ic.classList.toggle('warn', warn); ic.innerHTML = svg(warn ? 'minus' : 'check', 15, 3.2);
  t.querySelector('.tx').textContent = text; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

// ───────── Navegación: barra que se difumina y botón «atrás» del navegador ─────────
addEventListener('scroll', () => $('#topbar').classList.toggle('scrolled', scrollY > 40), { passive: true });
function volverAlInicio() { if (history.state && history.state.juego) history.back(); else pintarInicio(); }
addEventListener('popstate', () => { if ($('#vInicio').hidden) pintarInicio(); });
if (history.state && history.state.juego) history.replaceState(null, '');
