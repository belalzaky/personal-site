// Site motion, the complete list from the build brief (items 1 and 5; hover and focus are CSS).
//
// 1. Section fade-up: every [data-fade] element rises 12px and fades in over 500ms, once,
//    when ~15% of it is in view. The hidden start state is added here, never by CSS alone,
//    so without JS everything is visible. Under reduced motion it is never added at all.
// 5. Cooking video: autoplays muted on a loop; under reduced motion it is stopped, reset to
//    its poster and given controls instead.
//
// Legacy .reveal elements (pages not yet rebuilt) get .is-visible the same way.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canObserve = 'IntersectionObserver' in window;

function fadeUp() {
  const sections = document.querySelectorAll<HTMLElement>('[data-fade]');
  if (reduce || !canObserve) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('fade-in');
        el.classList.remove('fade-pending');
        io.unobserve(el);
      }
    },
    { threshold: 0.15 }
  );

  for (const el of sections) {
    // Anything already on screen at load stays put: no flash of hidden content above the fold.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) continue;
    el.classList.add('fade-pending');
    io.observe(el);
  }
}

function legacyReveal() {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (reduce || !canObserve) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}

function loopVideos() {
  if (!reduce) return;
  document.querySelectorAll<HTMLVideoElement>('video[data-loop]').forEach((v) => {
    v.removeAttribute('autoplay');
    v.autoplay = false;
    v.pause();
    v.controls = true;
    v.load(); // back to the poster
  });
}

loopVideos();
fadeUp();
legacyReveal();
