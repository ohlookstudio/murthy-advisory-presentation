/* Phase 09 · shared runtime for the three Emergence websites.
   - Hash router with real pages (#/, #/about, #/expertise, #/insights, #/insights/<slug>, #/contact). Any other hash
     (#main, #area-…) is an in-page anchor and does not re-render.
   - Accessibility: skip link, focus moved to the page title on navigation, aria-current, mobile menu with Esc, focus trap
     and focus return, prefers-reduced-motion and a static mode (?motion=off) that removes every animation.
   - Functional mode (E-14): content and CTA are in the DOM and visible from the first frame. Animations only touch the
     field (order, density, signal) or decorate content that is already readable.
   - Fields fit their clearings to the text they hold (measured from the DOM), so text never sits on lines at any width.
     The 5.8° lean (E-13) applies only to the RIGHT edge, and only from 900 px wide; on mobile the clearing is straight. */
(function () {
  const { Field, LEAN } = window.FIELD;
  const q = new URLSearchParams(location.search);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = !(reduced || q.get('motion') === 'off');
  document.documentElement.classList.add(motion ? 'mo' : 'is-static');
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const embedded = window.parent !== window;

  let page = { cleanups: [] };
  const onCleanup = fn => page.cleanups.push(fn);

  /* ── fields ─────────────────────────────────────────────────────────── */
  /* field(canvas, opts, cfg)
     cfg.around: element | element[] | () => element[]   clearings fitted to these elements (one clearing each)
     cfg.padX / padY: px around the text · cfg.lean: true → right edge leans 5.8° on desktop
     cfg.from / cfg.to: state animated on enter (motion mode only); static mode jumps to cfg.to
     cfg.signalUnder: element → the signal sits on the row just under it, as wide as cfg.signalW (0..1 of the element) */
  function field(cv, opts = {}, cfg = {}) {
    const to = Object.assign({ order: 1, clear: 1, density: 1, signal: opts.signal || cfg.signalUnder ? 1 : 0 }, cfg.to);
    const f = Field(cv, Object.assign({ pitch: 10 }, opts));
    const els = () => { const a = typeof cfg.around === 'function' ? cfg.around() : cfg.around; return (Array.isArray(a) ? a : a ? [a] : []).filter(Boolean); };
    const fit = () => {
      const c = cv.getBoundingClientRect(); if (!c.width || !c.height) return;
      const px = cfg.padX ?? 28, py = cfg.padY ?? 18, lean = cfg.lean && window.innerWidth >= 900 ? LEAN : 0;
      const extra = (cfg.fixed || []).map(x => Object.assign({ amt: 1 }, x));
      f.o.clearings = extra.concat(els().map((e, i) => {
        const r = e.getBoundingClientRect();
        return { x: (r.left - c.left - px) / c.width, y: (r.top - c.top - py) / c.height, w: (r.width + 2 * px) / c.width, h: (r.height + 2 * py) / c.height, lean: i === 0 ? lean : 0, amt: 1 };
      }));
      if (cfg.signalUnder) {
        const r = cfg.signalUnder.getBoundingClientRect(), w = cfg.signalW ?? 0.42;
        f.o.signal = { y: (r.bottom - c.top + (cfg.signalGap ?? 14)) / c.height, x0: (r.left - c.left) / c.width, x1: (r.left - c.left + r.width * w) / c.width };
      }
      f.rebuild();
    };
    const ro = new ResizeObserver(() => fit()); ro.observe(cv); els().forEach(e => ro.observe(e));
    document.fonts.ready.then(fit); fit();
    if (motion && cfg.from) {
      Object.assign(f.st, Object.assign({}, to, cfg.from)); f.draw();
      let tw = null;
      /* sequence (E-12): the field settles first; the signal starts only once order and density have arrived */
      const play = () => {
        const { signal, ...rest } = to;
        tw = gsap.timeline({ delay: cfg.delay ?? 0.1 })
          .to(f.st, Object.assign({}, rest, { duration: cfg.dur ?? 1.6, ease: cfg.ease || 'power2.out', onUpdate: f.draw }));
        if (signal > 0) tw.to(f.st, { signal, duration: cfg.sigDur ?? 0.7, ease: 'power2.inOut', onUpdate: f.draw }, '>+0.15');
      };
      if (cfg.inView && 'IntersectionObserver' in window) {   // settle when it scrolls into view (once)
        const io = new IntersectionObserver(es => { if (es.some(x => x.isIntersecting)) { io.disconnect(); play(); } }, { rootMargin: '0px 0px -10% 0px' });
        io.observe(cv); onCleanup(() => io.disconnect());
      } else play();
      onCleanup(() => tw && tw.kill());
    } else f.set(to);
    onCleanup(() => { ro.disconnect(); f.destroy(); });
    f.fit = fit; f.kind = cfg.signalUnder ? 'signal' : 'field';
    window.__fields = (window.__fields || []).concat(f); onCleanup(() => { window.__fields = (window.__fields || []).filter(x => x !== f); });
    return f;
  }

  /* state driven by a 0..1 value (scroll-linked fields) */
  const lerpState = (a, b, t) => Object.fromEntries(Object.keys(b).map(k => [k, a[k] + (b[k] - a[k]) * t]));

  /* ── scroll and reveal ──────────────────────────────────────────────── */
  function onScroll(fn) {
    let raf = 0; const h = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; fn(); }); };
    window.addEventListener('scroll', h, { passive: true }); window.addEventListener('resize', h); fn();
    onCleanup(() => { window.removeEventListener('scroll', h); window.removeEventListener('resize', h); });
  }
  /* progress of an element through the viewport: 0 when its top passes `start` (fraction of vh), 1 when its bottom passes `end` */
  function through(el, start = 0.9, end = 0.35) {
    const r = el.getBoundingClientRect(), vh = window.innerHeight, total = r.height + vh * (start - end);
    return Math.max(0, Math.min(1, (vh * start - r.top) / Math.max(1, total)));
  }
  /* reveal: decorative entrance for content BELOW the fold only. Anything in view on arrival is shown at once. */
  function reveal(root) {
    const items = $$('[data-rv]', root);
    if (!motion || !('IntersectionObserver' in window)) { items.forEach(e => e.classList.add('in')); return; }
    const vh = window.innerHeight;
    items.forEach(e => { if (e.getBoundingClientRect().top < vh * 0.98) e.classList.add('in', 'now'); });
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -6% 0px' });
    items.filter(e => !e.classList.contains('in')).forEach(e => io.observe(e));
    onCleanup(() => io.disconnect());
  }

  /* ── router ─────────────────────────────────────────────────────────── */
  const ROUTES = ['home', 'about', 'expertise', 'insights', 'article', 'contact'];
  function parse() {
    const h = location.hash;
    if (h && !h.startsWith('#/')) return null;                       // in-page anchor
    const [a, b] = h.replace(/^#\/?/, '').split('/');
    if (a === 'insights' && b && window.MC.article(b)) return { page: 'article', slug: b };
    return { page: ROUTES.includes(a) && a !== 'article' ? a : 'home' };
  }
  const href = (p, slug) => p === 'home' ? '#/' : p === 'article' ? `#/insights/${slug}` : `#/${p}`;

  function mount(cfg) {
    const root = $('#app');
    let cur = null, first = true, busy = Promise.resolve();
    root.innerHTML = `<a class="skip" href="#main">Skip to content</a><div class="hd-slot"></div><main id="main" tabindex="-1"></main><div class="ft-slot"></div>`;
    const main = $('#main', root), hd = $('.hd-slot', root), ft = $('.ft-slot', root);
    $('.skip', root).addEventListener('click', e => { e.preventDefault(); main.focus(); main.scrollIntoView(); });

    async function go() {
      let r = parse(), anchor = null;
      if (!r) {                                                      // in-page anchor
        if (!first) return;                                          // …on a page already shown: the browser handles it
        anchor = location.hash.slice(1); r = { page: 'home' };       // direct start on #main or #area-…: render home, then honour the anchor
      }
      if (cur && r.page === cur.page && r.slug === cur.slug) return;
      const prev = cur; cur = r;
      busy = busy.then(async () => {
        if (!first && motion && cfg.leave) { try { await cfg.leave(main, r, prev); } catch (e) {} }
        page.cleanups.splice(0).forEach(fn => { try { fn(); } catch (e) {} });
        closeMenu(false);
        hd.innerHTML = cfg.header(r.page); wireMenu(hd);
        $$('[data-nav]', hd).forEach(a => a.dataset.nav === (r.page === 'article' ? 'insights' : r.page) ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
        main.innerHTML = cfg.pages[r.page](r); main.dataset.page = r.page;
        ft.innerHTML = cfg.footer(r.page);
        document.body.dataset.page = r.page;
        const h1 = $('h1', main);
        document.title = `${r.page === 'home' ? 'Murthy Advisory' : (h1 ? h1.textContent.trim() : r.page) + ' · Murthy Advisory'} · ${cfg.label}`;
        window.scrollTo(0, 0);
        if (!first && h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
        wireCommon(main);
        if (cfg.enter) cfg.enter(r, main, { first });
        reveal(main);
        if (anchor) { const t = document.getElementById(anchor); if (t) requestAnimationFrame(() => focusTarget(t)); }
        if (embedded) window.parent.postMessage({ type: 'route', site: cfg.id, page: r.page, slug: r.slug || null }, '*');
        first = false;
      });
    }
    window.addEventListener('hashchange', go);
    window.addEventListener('message', e => { if (e.data && e.data.type === 'goto') location.hash = e.data.hash; });
    go();
  }

  /* jump to a section: its top lands just under the sticky header (whatever its height), focus goes to its heading */
  const headerH = () => { const h = document.querySelector('.hd'); return h && getComputedStyle(h).position !== 'static' ? h.getBoundingClientRect().height : 0; };
  function focusTarget(t) {
    if (t.id === 'main') { t.focus(); return; }
    const y = t.getBoundingClientRect().top + window.scrollY - headerH() - 12;
    window.scrollTo({ top: Math.max(0, y), behavior: motion ? 'smooth' : 'auto' });
    const h = t.matches('h1, h2, h3') ? t : t.querySelector('h1, h2, h3') || t;
    h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true });
  }
  /* in-page helpers: [data-goto="id"] scrolls to an element and moves focus there without changing the route */
  function wireCommon(main) {
    $$('[data-goto]', main).forEach(b => b.addEventListener('click', e => {
      e.preventDefault(); const t = document.getElementById(b.dataset.goto); if (t) focusTarget(t);
    }));
    /* demo form: validates, never sends */
    $$('form[data-demo]', main).forEach(fm => fm.addEventListener('submit', e => {
      e.preventDefault(); const out = $('[data-out]', fm); let bad = null;
      $$('[required]', fm).forEach(i => { const ok = i.value.trim() && (i.type !== 'email' || /.+@.+\..+/.test(i.value)); i.setAttribute('aria-invalid', String(!ok)); if (!ok && !bad) bad = i; });
      if (bad) { out.textContent = 'Please complete the highlighted fields.'; bad.focus(); return; }
      out.textContent = 'Prototype: nothing has been sent. The real form will be connected once the contact details are confirmed.';
    }));
  }

  /* ── mobile menu ────────────────────────────────────────────────────── */
  let menuBtn = null, menu = null;
  function closeMenu(ret = true) {
    if (!menu || !menuBtn || menuBtn.getAttribute('aria-expanded') !== 'true') return;
    menuBtn.setAttribute('aria-expanded', 'false'); menu.hidden = true; document.documentElement.classList.remove('menu-open');
    if (ret) menuBtn.focus();
  }
  function wireMenu(scope) {
    menuBtn = $('[data-menu-btn]', scope); menu = $('[data-menu]', scope);
    if (!menuBtn || !menu) return;
    menu.hidden = true;
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') !== 'true';
      if (!open) return closeMenu();
      menuBtn.setAttribute('aria-expanded', 'true'); menu.hidden = false; document.documentElement.classList.add('menu-open');
      const f = $('a, button', menu); f && f.focus();
    });
    $$('a', menu).forEach(a => a.addEventListener('click', () => closeMenu(false)));
  }
  document.addEventListener('keydown', e => {
    if (!menu || menu.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); }
    if (e.key === 'Tab') {
      const f = [menuBtn, ...$$('a, button', menu)].filter(x => x.offsetParent !== null);
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth >= 900) closeMenu(false); });

  /* ── small shared templates ─────────────────────────────────────────── */
  const MC = window.MC;
  const img = (k, cls = '', pos = '50% 50%', eager = false) => { const p = MC.photos[k]; return `<img class="${cls}" src="${p.src}" alt="${p.alt}" width="${p.w}" height="${p.h}" style="object-position:${pos}" ${eager ? '' : 'loading="lazy"'} decoding="async">`; };
  const sig = (theme, cap, kind = 'horizontal') => window.EID.signature(kind, theme, cap, { pad: 0 });
  const navLinks = (cls = '') => MC.nav.map(([p, t]) => `<li><a class="${cls}" href="${href(p)}" data-nav="${p}">${t}</a></li>`).join('');
  const form = (cls = '') => `<form class="cform ${cls}" data-demo novalidate>
    <div class="cform__r"><label for="cf-name">Name</label><input id="cf-name" name="name" autocomplete="name" required></div>
    <div class="cform__r"><label for="cf-org">Organisation <span>optional</span></label><input id="cf-org" name="org" autocomplete="organization"></div>
    <div class="cform__r"><label for="cf-mail">Email</label><input id="cf-mail" name="email" type="email" autocomplete="email" required></div>
    <div class="cform__r"><label for="cf-msg">The decision in front of you</label><textarea id="cf-msg" name="msg" rows="5" required aria-describedby="cf-hint"></textarea><p id="cf-hint" class="cform__h">A few lines are enough: the decision, the timing, who is involved.</p></div>
    <div class="cform__s"><button type="submit" class="cform__b">Send <span aria-hidden="true">→</span></button><p class="cform__o" data-out role="status" aria-live="polite"></p></div>
  </form>`;

  window.SITE = { motion, reduced, $, $$, field, lerpState, onScroll, through, reveal, mount, href, img, sig, navLinks, form, onCleanup, LEAN, focusTarget, headerH };
})();
