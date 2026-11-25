/* Website 03 · Clearing — the most visual and forceful (E-12: openings, moments of greater expression).
   Art direction: Deep Pool frames filled by the field, monumental Source Serif set inside the clearings it opens,
   selective motion (the hero, the openers and the closing band; everything else is still). The 5.8° lean (E-13)
   is used on ONE edge per view, the right edge of the main clearing, from 900 px; on mobile the clearing is straight.
   Interior pages are functional: an opener band, then plain Haze/paper reading surfaces with a strong grid. */
(function () {
  const { MC, SITE } = window, { it } = MC;
  const { $, $$, field, img, sig, navLinks, href, form, motion } = SITE;
  const arrow = '<span class="ar" aria-hidden="true">→</span>';
  const lab = t => `<p class="lab">${t}</p>`;

  const header = page => `<header class="hd ${page === 'home' ? 'hd--home' : ''}">
    <div class="hd__in">
      <a class="hd__logo" href="#/" aria-label="Murthy Advisory, home">${sig('negative', 16)}</a>
      <nav class="hd__nav" aria-label="Main"><ul>${navLinks()}</ul></nav>
      <a class="btn btn--line hd__cta" href="#/contact">${MC.cta}</a>
      <button class="hd__mb" type="button" data-menu-btn aria-expanded="false" aria-controls="mmenu"><span>Menu</span><i aria-hidden="true"></i></button>
    </div>
    <div class="mm" id="mmenu" data-menu><nav aria-label="Main, mobile"><ul>${navLinks()}</ul></nav><a class="btn btn--haze" href="#/contact">${MC.cta} ${arrow}</a></div>
  </header>`;

  const footer = () => `<footer class="ft"><div class="ft__in">
      <p class="ft__big">${it(MC.line)}</p>
      <div class="ft__g"><div><a href="#/" aria-label="Murthy Advisory, home">${sig('negative', 16)}</a><p>${MC.positioning}</p></div>
      <nav aria-label="Footer"><ul>${navLinks()}</ul></nav>
      <dl>${MC.contactDetails.slice(0, 3).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div>
      <div class="ft__b"><p>© Murthy Advisory</p><p>${MC.status}</p><p>Website 03 · Clearing</p></div></div></footer>`;

  /* a Deep Pool frame: the field fills it, clearings are fitted to [data-clear] (the first one may lean) */
  const frame = (inner, cls = '', seed = 1, extra = '') => `<section class="fr ${cls}" data-seed="${seed}" ${extra}><canvas class="fr__c" aria-hidden="true"></canvas><div class="fr__in">${inner}</div></section>`;
  const opener = (label, h1, lede, seed) => frame(`<div class="op" data-clear>${lab(label)}<h1 class="x1 x1--p">${h1}</h1></div>${lede ? `<p class="op__l" data-clear>${lede}</p>` : ''}`, 'fr--op', seed, 'data-lean');
  const closing = (h = `${MC.cta}.`, p = MC.contactLede) => frame(`<div class="cl" data-clear>${lab('Contact')}<p class="x1 x1--c" data-sig>${h}</p><p class="cl__p">${p}</p><a class="btn btn--haze" href="#/contact">${MC.cta} ${arrow}</a></div>`, 'fr--close', 77);

  /* ── pages ── */
  const home = () => `
    ${frame(`<div class="hero" data-clear><p class="lab">Murthy Advisory</p><h1 class="x1">${it(MC.line)}</h1></div>
      <div class="hero__b" data-clear><p class="hero__p">${MC.positioning}</p><div class="hero__a"><a class="btn btn--haze" href="#/contact">${MC.cta}</a><a class="lnk" href="#/expertise">The expertise ${arrow}</a></div></div>`, 'fr--hero', 5, 'data-lean data-motion="hero"')}
    <section class="say">${lab('Purpose')}<p class="x2" data-rv>${MC.purpose}</p><p class="say__b" data-rv>${MC.purposeBody}</p></section>
    <section class="big" aria-labelledby="big-h"><h2 class="vh" id="big-h">Three areas of expertise</h2>
      ${MC.areas.map((a, i) => `<div class="big__r"><div class="big__band" aria-hidden="true"><canvas data-seed="${30 + i}" data-order="${[0.25, 0.6, 1][i]}"></canvas></div>
        <a class="big__a" href="#/expertise" data-area="${a.id}" data-rv><span class="big__n" aria-hidden="true">${a.n}</span><span class="big__t"><span class="lab">${a.tag}</span><span class="x2">${a.name}</span><span class="big__p">${a.problem}</span></span><span class="big__o">${it(a.outcome)}</span></a></div>`).join('')}
    </section>
    <section class="pic"><figure>${img('n6', '', '50% 62%')}</figure>
      <div class="pic__t">${lab('About')}<h2 class="x2">${it('Judgement from *both sides of the table.*')}</h2><p>${MC.lensBody}</p><a class="lnk lnk--d" href="#/about">About Sowmya Murthy ${arrow}</a></div></section>
    <section class="ins" aria-labelledby="ins-h"><div class="ins__h">${lab('Insights')}<h2 class="x2" id="ins-h">Original thinking, published here first.</h2><a class="lnk lnk--d" href="#/insights">All insights ${arrow}</a></div>
      <ol class="ins__l">${MC.articles.map((a, i) => `<li data-rv><a href="${href('article', a.slug)}"><span class="ins__n">0${i + 1}</span><span class="lab">${a.area} · ${a.read}</span><span class="ins__t">${it(a.title)}</span></a></li>`).join('')}</ol></section>
    ${closing()}`;

  const about = () => `
    ${opener('About', it('Judgement from *both sides of the table.*'), MC.lensBody, 11)}
    <section class="three">${MC.sides.map((s, i) => `<article data-rv><span class="three__n" aria-hidden="true">0${i + 1}</span><h2 class="x3">${s.k}</h2><p>${s.t}</p></article>`).join('')}</section>
    <section class="who"><figure class="who__ph"><img src="${MC.portrait.src}" alt="${MC.portrait.alt}" width="1379" height="919" loading="lazy" decoding="async"></figure>
      <div class="who__t">${lab('The person')}<h2 class="x2">Sowmya Murthy</h2><p>${MC.bioNote}</p></div></section>
    ${modes()}
    ${closing()}`;

  const modes = () => `<section class="md" aria-labelledby="md-h"><div class="md__h">${lab('How the work is delivered')}<h2 class="x2" id="md-h">Four ways of working.</h2><p>${MC.modesNote}</p></div>
    <ol class="md__l">${MC.modes.map(m => `<li data-rv><span class="md__n">${m.n}</span><span class="x3">${m.name}</span><span class="md__t">${m.t}</span></li>`).join('')}</ol></section>`;

  const expertise = () => `
    ${opener('Expertise', 'Three areas of expertise.', MC.positioning, 12)}
    <nav class="jump" aria-label="Areas on this page"><ol>${MC.areas.map(a => `<li><a href="#area-${a.id}" data-goto="area-${a.id}"><span>${a.n}</span>${a.name}</a></li>`).join('')}</ol></nav>
    ${MC.areas.map((a, i) => `<section class="xa ${i === 1 ? 'xa--d' : ''}" id="area-${a.id}" aria-labelledby="h-${a.id}">
      <div class="xa__h"><span class="xa__n" aria-hidden="true">${a.n}</span><div>${lab(a.tag)}<h2 class="x2" id="h-${a.id}">${a.name}</h2></div></div>
      <div class="xa__g"><div>${lab('The problem')}<p class="xa__p">${a.problem}</p><p>${a.scope}</p></div>
        <div>${lab('Questions to start with')}<ul class="xa__q">${a.questions.map(q => `<li>${q}</li>`).join('')}</ul></div>
        <div>${lab('The outcome')}<p class="x2 xa__o">${it(a.outcome)}</p></div></div></section>`).join('')}
    ${modes()}
    ${closing()}`;

  const insights = () => `
    ${opener('Insights', 'Original thinking, published here first.', 'Short, practical pieces on decisions under uncertainty. LinkedIn points here. The three articles are sample text written for this prototype.', 13)}
    <section class="il">
      <div class="flt" role="group" aria-label="Filter by area"><button type="button" aria-pressed="true" data-flt="all">All</button>${MC.areas.map(a => `<button type="button" aria-pressed="false" data-flt="${a.name}">${a.name}</button>`).join('')}</div>
      <p class="vh" role="status" aria-live="polite" data-flt-out></p>
      <ol class="il__l">${MC.articles.map((a, i) => `<li data-area="${a.area}"><a href="${href('article', a.slug)}">
        <span class="il__ph">${img(a.photo, '', '50% 50%')}</span><span class="il__t"><span class="lab">0${i + 1} · ${a.area} · ${a.read}</span><span class="x2">${it(a.title)}</span><span class="il__s">${a.standfirst}</span></span>${arrow}</a></li>`).join('')}</ol>
    </section>
    ${closing('Write about a decision.', 'Questions from readers shape what is written next.')}`;

  const article = r => {
    const a = MC.article(r.slug), others = MC.articles.filter(x => x !== a);
    return `${frame(`<div class="op op--a" data-clear><p class="lab"><a class="lnk" href="#/insights"><span aria-hidden="true">←</span> Insights</a> · ${a.area} · ${a.read}</p><h1 class="x1 x1--a">${it(a.title)}</h1></div>`, 'fr--op fr--art', 20 + MC.articles.indexOf(a), 'data-lean')}
    <section class="as"><p class="as__s">${a.standfirst}</p><p class="as__by">Sample text · written for the prototype, not by Sowmya</p></section>
    <figure class="aph" style="--pw:${MC.photos[a.photo].w}px">${img(a.photo, '', '50% 50%')}</figure>
    ${a.sections.map((s, i) => `<section class="ab" aria-labelledby="h-${s.k}">
      <div class="ab__t"><p class="ab__n" aria-hidden="true">0${i + 1}</p><h2 class="x3" id="h-${s.k}">${s.h}</h2>${s.p.map(p => `<p>${p}</p>`).join('')}
      ${s.evidence ? `<table class="tab"><caption>Evidence the board would need <span>Illustrative: none of it has been collected.</span></caption><thead><tr><th scope="col">Evidence</th><th scope="col">Status</th></tr></thead><tbody>${s.evidence.map(([t, st]) => `<tr><td>${t}</td><td>${st[0].toUpperCase() + st.slice(1)}</td></tr>`).join('')}</tbody></table>` : ''}</div>
      ${s.quote ? `<blockquote class="bq" data-rv><p>${it(s.quote)}</p></blockquote>` : ''}
    </section>
    ${s.rec ? frame(`<div class="cl" data-clear>${lab('Recommendation')}<p class="x2" data-sig>${it(s.rec)}</p>${s.recNote ? `<p class="cl__p">${s.recNote}</p>` : ''}</div>`, 'fr--rec', 60 + i) : ''}`).join('')}
    <section class="nx">${lab('Next')}<ol>${others.map(o => `<li><a href="${href('article', o.slug)}"><span class="lab">${o.area}</span><span class="x3">${it(o.title)}</span>${arrow}</a></li>`).join('')}</ol></section>`;
  };

  const contact = () => `
    ${opener('Contact', `${MC.cta}.`, MC.contactLede, 14)}
    <section class="con"><div class="con__f">${lab('Your message')}${form('cform--big')}</div>
      <div class="con__d">${lab('What happens next')}<ol class="con__s">${MC.nextSteps.map((s, i) => `<li><span>0${i + 1}</span><b class="x3">${s[0]}</b><p>${s[1]}</p></li>`).join('')}</ol>
      ${lab('Details')}<dl>${MC.contactDetails.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div></section>`;

  /* ── behaviour ── */
  function enter(r, main) {
    $$('.fr', main).forEach(fr => {
      const hero = fr.dataset.motion === 'hero', op = fr.classList.contains('fr--op');
      field($('.fr__c', fr), { tone: 'dark', pitch: hero ? 12 : 11, seed: +fr.dataset.seed || 3 }, {
        around: () => $$('[data-clear]', fr), padX: hero ? 40 : 32, padY: hero ? 30 : 24, lean: fr.hasAttribute('data-lean'),
        signalUnder: $('[data-sig]', fr), signalW: 0.34, signalGap: 30,
        from: hero || op ? { order: 0, density: 0.55, signal: 0 } : { order: 0.2, density: 0.7, signal: 0 },
        dur: hero ? 3.8 : op ? 2.2 : 2.6, delay: 0.1, inView: !(hero || op), ease: 'power3.out',
      });
    });
    $$('.big__band canvas', main).forEach(cv => { const o = +cv.dataset.order; field(cv, { tone: 'dark', pitch: 8, seed: +cv.dataset.seed, frag: [4, 110] }, { to: { order: o, density: 0.5 + 0.5 * o, signal: 0 }, from: { order: 0, density: 0.35 }, dur: 2.4, inView: true }); });
    $$('[data-area]', main).forEach(l => l.tagName === 'A' && l.addEventListener('click', () => sessionStorage.setItem('mc-area', l.dataset.area)));
    if (r.page === 'expertise') { const a = sessionStorage.getItem('mc-area'); sessionStorage.removeItem('mc-area'); if (a) requestAnimationFrame(() => { const t = document.getElementById(`area-${a}`); t && SITE.focusTarget(t); }); }
    const flt = $$('[data-flt]', main);
    flt.forEach(b => b.addEventListener('click', () => {
      flt.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      let n = 0; $$('.il__l > li', main).forEach(li => { const on = b.dataset.flt === 'all' || li.dataset.area === b.dataset.flt; li.hidden = !on; n += on; });
      $('[data-flt-out]', main).textContent = `${n} article${n === 1 ? '' : 's'} shown`;
    }));
    /* page change: the veil (Deep Pool, no text) lifts */
    const v = $('.veil'); if (v && motion) gsap.to(v, { opacity: 0, duration: 0.35, ease: 'power1.out', onComplete: () => { v.style.visibility = 'hidden'; } });
  }
  /* leaving: a Deep Pool veil covers the page for 0.25 s (two fields: the old one closes, the new one settles) */
  const leave = () => new Promise(res => {
    let v = $('.veil'); if (!v) { v = document.createElement('div'); v.className = 'veil'; v.setAttribute('aria-hidden', 'true'); document.body.appendChild(v); }
    v.style.visibility = 'visible'; gsap.fromTo(v, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.in', onComplete: res });
  });

  SITE.mount({ id: 'w03', label: 'Website 03 · Clearing', header, footer, pages: { home, about, expertise, insights, article, contact }, enter, leave });
})();
