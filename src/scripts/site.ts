// Shared behaviour for every page: the mode switch, the strip's scramble, and the
// inverted bar that slides between the lines of a list.

const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const reduced = RM;

// ---- mode: device setting until the switch picks one; the choice is kept per browser
const root = document.documentElement;
function current(): 'light' | 'dark' { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
function paint() { document.querySelectorAll('[data-mode-v]').forEach((v) => (v.textContent = `(${current()})`)); }
paint();
document.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
  const next = current() === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('mode', next); } catch (_) {}
  paint();
  window.dispatchEvent(new CustomEvent('modechange', { detail: next }));
}));

// ---- phone menu: the links full-screen under the nav row
const menu = document.getElementById('menu'), menuBtn = document.getElementById('menu-btn');
const setMenu = (open: boolean) => {
  if (!menu || !menuBtn) return;
  menu.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); menuBtn.textContent = open ? 'close' : 'menu';
  root.classList.toggle('menu-open', open);
};
menuBtn?.addEventListener('click', () => setMenu(menu!.hidden));
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
matchMedia('(min-width: 701px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
addEventListener('pageshow', () => setMenu(false));

// ---- the strip: values scramble through glyphs, then settle
const GLY = 'abcdefghijklmnopqrstuvwxyz0123456789/|·';
export function scramble(el: HTMLElement & { _r?: number }, text: string) {
  if (RM || el.textContent === text) { el.textContent = text; return; }
  const t0 = performance.now(), dur = 380;
  if (el._r) cancelAnimationFrame(el._r);
  const step = (now: number) => {
    const k = Math.min(1, (now - t0) / dur), n = Math.floor(k * text.length);
    el.textContent = text.slice(0, n) + [...text.slice(n)].map((c) => (c === ' ' ? ' ' : GLY[(Math.random() * GLY.length) | 0])).join('');
    if (k < 1) el._r = requestAnimationFrame(step); else el.textContent = text;
  };
  el._r = requestAnimationFrame(step);
}
export type Row = [string, string, string?];
let base: Row[] | null = null;
export function setMeta(rows: Row[]) {
  const box = document.getElementById('meta');
  if (!box) return;
  if (!base) base = [...box.children].map((d) => [d.children[0].textContent || '', d.children[1].textContent || '', (d.children[1] as HTMLAnchorElement).getAttribute('href') || undefined] as Row);
  rows.forEach(([k, v, href], i) => {
    const d = box.children[i] as HTMLElement | undefined;
    if (!d) return;
    (d.children[0] as HTMLElement).textContent = k;
    let ve = d.children[1] as HTMLElement;
    const want = href ? 'A' : 'SPAN';
    if (ve.tagName !== want) {
      const n = document.createElement(want.toLowerCase());
      n.className = 'v';
      ve.replaceWith(n);
      ve = n;
    }
    if (href) (ve as HTMLAnchorElement).href = href;
    scramble(ve, v);
  });
}
export function resetMeta() { if (base) setMeta(base); }

// ---- the inverted bar: slides to the active item, down a list or along a row
export function slideTo(box: Element, row: HTMLElement | null) {
  const bar = box.querySelector<HTMLElement>(':scope > .bar');
  box.querySelectorAll(':scope > .is').forEach((x) => x.classList.remove('is'));
  if (!row) { if (bar) bar.style.opacity = '0'; return; }
  row.classList.add('is');
  if (bar) {
    bar.style.width = row.offsetWidth + 'px';
    bar.style.height = row.offsetHeight + 'px';
    bar.style.transform = `translate(${row.offsetLeft}px,${row.offsetTop}px)`;
    bar.style.opacity = '1';
  }
}

// ---- cells settle in with a short stagger
document.querySelectorAll('.in-anim').forEach((m) => {
  [...m.children].forEach((c, i) => ((c as HTMLElement).style.animationDelay = i * 28 + 'ms'));
});
export const settle = RM ? 0 : 620;
