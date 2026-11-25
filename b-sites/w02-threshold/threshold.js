/* Website 02 · Threshold — the main expression of Noise to Clarity (E-12: the principal register).
   Art direction: Haze reading surfaces beside Deep Pool field panels; one straight clearing per panel; every page is
   organised as Context → Evidence → Conclusion, shown by a stage bar under the header. A field column on the right edge
   settles as the reader moves through the page (movement accompanies reading). One signal per view: under the conclusion. */
(function () {
  const { MC, SITE } = window, { it } = MC;
  const { $, $$, field, lerpState, onScroll, through, img, sig, navLinks, href, form, onCleanup, motion } = SITE;
  const READING = [['context', 'Context'], ['evidence', 'Evidence'], ['conclusion', 'Conclusion']];
  const TASK = [['context', 'Read'], ['evidence', 'Write'], ['conclusion', 'What happens next']];
  let STAGES = READING;                                   // set by header() for the page being rendered
  const stageLab = (k, extra = '') => { const i = STAGES.findIndex(s => s[0] === k); return `<p class="stl"><i>0${i + 1}</i>${STAGES[i][1]}${extra ? ` <span>· ${extra}</span>` : ''}</p>`; };
  const arrow = '<span class="ar" aria-hidden="true">→</span>';

  /* evidence lines (E-16: exploration, not a rule): pattern + marker + word, never pattern alone */
  const EVW = { verified: 'Verified', partial: 'Partial', pending: 'Pending' };
  const evLine = (s, w = 200) => `<svg class="evl" viewBox="0 0 ${w} 10" width="${w}" height="10" aria-hidden="true"><line x1="0" x2="${w}" y1="5" y2="5" stroke-dasharray="${s === 'verified' ? 'none' : s === 'partial' ? '16 7' : '2 8'}"/></svg>`;
  const evMark = s => `<svg class="evm" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><circle cx="6" cy="6" r="4.8" fill="${s === 'pending' ? 'none' : s === 'partial' ? 'url(#half)' : 'currentColor'}" stroke="currentColor" stroke-width="1.4"/></svg>`;
  const halfDef = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs></svg>';

  /* ── header / footer ── */
  const header = page => (STAGES = page === 'contact' ? TASK : READING, `<header class="hd">
    <div class="hd__in">
      <a class="hd__logo" href="#/" aria-label="Murthy Advisory, home">${sig('positive', 16)}</a>
      <nav class="hd__nav" aria-label="Main"><ul>${navLinks()}</ul></nav>
      <a class="btn btn--pool hd__cta" href="#/contact">${MC.cta}</a>
      <button class="hd__mb" type="button" data-menu-btn aria-expanded="false" aria-controls="mmenu"><span>Menu</span><i aria-hidden="true"></i></button>
    </div>
    <div class="mm" id="mmenu" data-menu>
      <nav aria-label="Main, mobile"><ul>${navLinks()}</ul></nav>
      <a class="btn btn--pool" href="#/contact">${MC.cta}</a>
    </div>
    <div class="sb"><div class="sb__in"><span class="sb__t">${page === 'contact' ? 'Steps' : 'Reading structure'}</span><ol aria-label="Go to">${STAGES.map(([k, t], i) => `<li><button type="button" data-stage-go="${k}"><i>0${i + 1}</i>${t}</button></li>`).join('')}</ol></div><span class="sb__p" aria-hidden="true"><b></b></span></div>
  </header>`);

  const footer = () => `<footer class="ft"><div class="ft__in">
      <div class="ft__id"><a href="#/" aria-label="Murthy Advisory, home">${sig('negative', 16)}</a><p>${MC.positioning}</p></div>
      <nav aria-label="Footer"><ul>${navLinks()}</ul></nav>
      <div class="ft__c"><p class="lab">Contact</p><p>Email [ to be confirmed ]</p><p>LinkedIn [ to be confirmed ]</p></div>
    </div><div class="ft__b"><p>© Murthy Advisory</p><p>${MC.status}</p><p>Website 02 · Threshold</p></div></footer>`;

  const col = () => `<div class="tcol" aria-hidden="true"><canvas></canvas></div>`;

  /* a Deep Pool panel with its field; the clearing is fitted to [data-clear] and the signal sits under [data-sig] */
  const panel = (inner, cls = '', seed = 1) => `<div class="fp ${cls}" data-seed="${seed}"><canvas class="fp__c" aria-hidden="true"></canvas><div class="fp__in"><div class="fp__cl" data-clear>${inner}</div></div></div>`;
  /* noise → clarity strip; order 0..1 */
  const strip = (order, seed, cls = '') => `<div class="strip ${cls}" aria-hidden="true"><canvas data-order="${order}" data-seed="${seed}"></canvas></div>`;

  const ctaBand = (h = `${MC.cta}.`, p = MC.contactLede) => `<section class="sec sec--end" data-stage="conclusion">${panel(`${stageLab('conclusion')}<h2 class="d2" data-sig>${h}</h2><p class="lede">${p}</p><a class="btn btn--haze" href="#/contact">${MC.cta} ${arrow}</a>`, 'fp--end', 90)}</section>`;

  /* ── pages ── */
  const home = () => `${col()}
    <section class="hero" data-stage="context">
      <div class="hero__t">
        <p class="lab">Murthy Advisory · Board &amp; executive advisory</p>
        <h1 class="d1">${it(MC.hero)}</h1>
        <p class="lede">${MC.positioning}</p>
        <div class="row"><a class="btn btn--pool" href="#/contact">${MC.cta}</a><a class="lnk" href="#/expertise">See the expertise ${arrow}</a></div>
      </div>
      ${panel(`<p class="lab lab--m">Purpose</p><p class="d3">${MC.purpose}</p>`, 'hero__p', 11)}
    </section>
    <section class="sec" data-stage="context">
      <div class="g"><div class="g__l">${stageLab('context', 'The situation')}</div>
      <div class="g__r"><p class="d2" data-rv>${MC.purposeBody}</p>
      <ul class="qs" data-rv>${MC.questions.map(x => `<li>${x}</li>`).join('')}</ul><p class="note">Questions that arrive incomplete.</p></div></div>
    </section>
    <section class="sec sec--paper" data-stage="evidence">
      <div class="g"><div class="g__l">${stageLab('evidence', 'Two sides')}</div>
      <div class="g__r"><h2 class="d2">${it('Judgement from *both sides of the table.*')}</h2><p class="lede">${MC.lensBody}</p></div></div>
      <ol class="sides">${MC.sides.map((s, i) => `<li data-rv>${strip([0.12, 0.55, 1][i], 21 + i)}<span class="n">0${i + 1}</span><h3 class="d4">${s.k}</h3><p>${s.t}</p></li>`).join('')}</ol>
      <p class="note note--r"><a class="lnk" href="#/about">About Sowmya Murthy ${arrow}</a></p>
    </section>
    <section class="sec" data-stage="evidence">
      <div class="g"><div class="g__l">${stageLab('evidence', 'Expertise')}</div><div class="g__r"><h2 class="d2">Three areas of expertise.</h2></div></div>
      <div class="areas">${MC.areas.map(a => `<article class="area" data-rv><p class="area__n">${a.n} · ${a.tag}</p><h3 class="d4">${a.name}</h3>
        <dl><div><dt>The problem</dt><dd>${a.problem}</dd></div><div><dt>The outcome</dt><dd class="d4 o">${it(a.outcome)}</dd></div></dl>
        <a class="lnk" href="#/expertise" data-area="${a.id}">${a.name}: questions to start with ${arrow}</a></article>`).join('')}</div>
    </section>
    <section class="sec sec--paper" data-stage="evidence">
      <div class="g"><div class="g__l">${stageLab('evidence', 'Insights')}</div><div class="g__r"><h2 class="d2">Original thinking, published here first.</h2></div></div>
      <div class="ins">${insCard(MC.articles[0], true)}<div class="ins__l">${MC.articles.slice(1).map(a => insCard(a)).join('')}<a class="lnk" href="#/insights">All insights ${arrow}</a></div></div>
    </section>
    ${ctaBand()}`;

  const insCard = (a, big = false) => `<a class="ic ${big ? 'ic--big' : ''}" href="${href('article', a.slug)}" data-rv>${big ? `<span class="ic__ph">${img(a.photo, '', '50% 50%')}</span>` : ''}<span class="lab">${a.area}</span><span class="ic__t ${big ? 'd3' : 'd4'}">${it(a.title)}</span><span class="ic__m">${a.read} · Read ${arrow}</span></a>`;

  const pageHead = (label, h1, lede, extra = '') => `<section class="ph" data-stage="context"><div class="g"><div class="g__l">${stageLab('context', label)}</div><div class="g__r"><h1 class="d1 d1--p">${h1}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}${extra}</div></div></section>`;

  const about = () => `${col()}
    ${pageHead('About', it('Judgement from *both sides of the table.*'), MC.lensBody)}
    <section class="sec sec--paper" data-stage="evidence">
      <div class="g"><div class="g__l">${stageLab('evidence', 'Experience')}</div><div class="g__r"><h2 class="d2">Commercial decisions, and then their oversight.</h2></div></div>
      <ol class="steps3">${MC.sides.map((s, i) => `<li data-rv>${strip([0.1, 0.55, 1][i], 41 + i, 'strip--tall')}<span class="n">0${i + 1}</span><h3 class="d4">${s.k}</h3><p>${s.t}</p></li>`).join('')}</ol>
    </section>
    <section class="sec" data-stage="evidence">
      <div class="person">
        <figure class="person__ph"><img src="${MC.portrait.src}" alt="${MC.portrait.alt}" width="1379" height="919" loading="lazy" decoding="async"></figure>
        <div class="person__t">${stageLab('evidence', 'The person')}<h2 class="d2">Sowmya Murthy</h2><p class="lede">${MC.bioNote}</p><p class="note">No figures, clients or credentials are shown until Sowmya approves them.</p></div>
      </div>
    </section>
    <section class="sec sec--paper" data-stage="conclusion">
      <div class="g"><div class="g__l">${stageLab('conclusion', 'How the work is delivered')}</div><div class="g__r"><h2 class="d2">Four ways of working.</h2><p class="lede">${MC.modesNote}</p></div></div>
      <ol class="modes">${MC.modes.map(m => `<li data-rv><span class="n">${m.n}</span><h3 class="d4">${m.name}</h3><p>${m.t}</p></li>`).join('')}</ol>
    </section>
    ${ctaBand()}`;

  const expertise = () => `${col()}
    ${pageHead('Expertise', 'Three areas of expertise.', MC.positioning, `<ul class="jump" aria-label="Areas on this page">${MC.areas.map(a => `<li><a href="#area-${a.id}" data-goto="area-${a.id}"><i>${a.n}</i>${a.name}</a></li>`).join('')}</ul>`)}
    ${MC.areas.map((a, i) => `<section class="sec ${i % 2 ? 'sec--paper' : ''} xa" id="area-${a.id}" data-stage="evidence" aria-labelledby="h-${a.id}">
      <div class="xa__h"><p class="area__n">${a.n} · ${a.tag}</p><h2 class="d2" id="h-${a.id}">${a.name}</h2><p class="lede">${a.scope}</p></div>
      <ol class="xa__s">
        <li data-rv>${strip(0.1, 60 + i * 3)}${stageLab('context', 'The problem')}<p>${a.problem}</p></li>
        <li data-rv>${strip(0.55, 61 + i * 3)}${stageLab('evidence', 'Questions to start with')}<ul class="qs qs--s">${a.questions.map(x => `<li>${x}</li>`).join('')}</ul></li>
        <li data-rv>${strip(1, 62 + i * 3)}${stageLab('conclusion', 'The outcome')}<p class="d3 o">${it(a.outcome)}</p></li>
      </ol></section>`).join('')}
    <section class="sec" data-stage="conclusion">
      <div class="g"><div class="g__l">${stageLab('conclusion', 'Delivery')}</div><div class="g__r"><h2 class="d2">How the work is delivered.</h2><p class="lede">${MC.modesNote}</p></div></div>
      <ol class="modes">${MC.modes.map(m => `<li data-rv><span class="n">${m.n}</span><h3 class="d4">${m.name}</h3><p>${m.t}</p></li>`).join('')}</ol>
    </section>
    ${ctaBand()}`;

  const insights = () => `${col()}
    ${pageHead('Insights', 'Original thinking, published here first.', 'Short, practical pieces on decisions under uncertainty. LinkedIn points here. The three articles are sample text written for this prototype.')}
    <section class="sec sec--paper" data-stage="evidence">
      <div class="flt" role="group" aria-label="Filter by area"><button type="button" aria-pressed="true" data-flt="all">All</button>${MC.areas.map(a => `<button type="button" aria-pressed="false" data-flt="${a.name}">${a.name}</button>`).join('')}</div>
      <p class="vh" role="status" aria-live="polite" data-flt-out></p>
      <ol class="il">${MC.articles.map((a, i) => `<li data-area="${a.area}"><a class="il__a" href="${href('article', a.slug)}">
        <span class="il__n">0${i + 1}</span><span class="il__ph">${img(a.photo, '', '50% 50%')}</span>
        <span class="il__t"><span class="lab">${a.area} · ${a.read}</span><span class="d3">${it(a.title)}</span><span class="il__s">${a.standfirst}</span></span>${arrow}</a></li>`).join('')}</ol>
    </section>
    ${ctaBand('Write about a decision.', 'Questions from readers shape what is written next.')}`;

  const article = r => {
    const a = MC.article(r.slug), others = MC.articles.filter(x => x !== a);
    return `${halfDef}
    <section class="ah" data-stage="context"><div class="ah__in">
      <a class="lnk lnk--back" href="#/insights"><span aria-hidden="true">←</span> All insights</a>
      <p class="lab">${a.area} · ${a.read} · Sample text</p>
      <h1 class="d1 d1--a">${it(a.title)}</h1><p class="lede">${a.standfirst}</p></div>
      <figure class="ah__ph" style="--pw:${MC.photos[a.photo].w}px">${img(a.photo, '', '50% 45%', true)}</figure>
    </section>
    <div class="ab">
      <nav class="toc" aria-label="In this article"><p class="lab">In this article</p><ol>${a.sections.map((s, i) => `<li><a href="#s-${s.k}" data-goto="s-${s.k}"><i>0${i + 1}</i>${STAGES[i][1]}</a></li>`).join('')}</ol></nav>
      <article class="ab__t">${a.sections.map((s, i) => `<section id="s-${s.k}" data-stage="${s.k}" aria-labelledby="h-${s.k}">
        ${stageLab(s.k)}<h2 class="d3" id="h-${s.k}">${s.h}</h2>${s.p.map(p => `<p>${p}</p>`).join('')}
        ${s.quote ? `<blockquote class="pq"><p>${it(s.quote)}</p></blockquote>` : ''}
        ${s.evidence ? `<figure class="ev"><figcaption><span class="lab">Evidence the board would need</span><span class="ev__x">Pattern, marker and word together. Illustrative: none of this evidence has been collected.</span></figcaption>
          <ul>${s.evidence.map(([t, st]) => `<li><span class="ev__t">${t}</span>${evLine(st)}<span class="ev__s">${evMark(st)}${EVW[st]}</span></li>`).join('')}</ul></figure>` : ''}
        ${s.rec ? panel(`<p class="lab lab--m">Recommendation</p><p class="d3" data-sig>${it(s.rec)}</p>${s.recNote ? `<p class="fp__n">${s.recNote}</p>` : ''}`, 'fp--rec', 70 + i) : ''}
      </section>`).join('')}
      <p class="note">Sample text written for the prototype to test long reading. It is not Sowmya’s writing.</p></article>
    </div>
    <section class="sec sec--paper"><div class="g"><div class="g__l"><p class="lab">Next</p></div><div class="g__r nx">${others.map(o => insCard(o)).join('')}</div></div></section>`;
  };

  const contact = () => `${col()}
    ${pageHead('Contact', `${MC.cta}.`, MC.contactLede)}
    <section class="sec sec--paper con" data-stage="evidence" aria-labelledby="h-write">
      <div class="con__f">${stageLab('evidence', 'Your message')}<h2 class="vh" id="h-write">Write</h2>${form()}</div>
      ${panel(`<p class="lab lab--m">Details · to be confirmed</p><dl class="dl">${MC.contactDetails.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
        <p class="fp__n">Demonstration form: nothing is sent until the contact details are confirmed.</p>`, 'con__p', 31)}
    </section>
    <section class="sec sec--end" data-stage="conclusion" aria-labelledby="h-next">${panel(`${stageLab('conclusion')}<h2 class="d2" id="h-next" data-sig>${it('A short description is enough. *The first conversation does the rest.*')}</h2>
      <ol class="nxt nxt--row">${MC.nextSteps.map((s, i) => `<li><span class="n">0${i + 1}</span><h3 class="d4">${s[0]}</h3><p>${s[1]}</p></li>`).join('')}</ol>`, 'fp--end', 33)}</section>`;

  /* ── behaviour ── */
  function enter(r, main) {
    /* panels: field around the text; the signal under [data-sig] (one per view) */
    $$('.fp', main).forEach((p, i) => {
      const hero = p.classList.contains('hero__p');
      field($('.fp__c', p), { tone: 'dark', pitch: 10, seed: +p.dataset.seed || i + 3 }, {
        around: () => [$('[data-clear]', p)], padX: 34, padY: 30, signalUnder: $('[data-sig]', p), signalW: 0.4,
        from: { order: 0, density: 0.55, signal: 0 }, dur: 2.6, delay: hero ? 0.15 : 0.1, inView: !hero,
      });
    });
    /* strips: noise → clarity, each to its own order */
    $$('.strip canvas', main).forEach(cv => {
      const o = +cv.dataset.order;
      field(cv, { tone: cv.closest('.sec--paper') ? 'paper' : 'light', ground: null, pitch: 6, seed: +cv.dataset.seed, frag: [4, 70] }, { to: { order: o, density: 0.55 + 0.45 * o, signal: 0 }, from: { order: 0, density: 0.4 }, dur: 1.6, inView: true });
    });
    /* the edge column: settles as the reader goes through the page */
    const cv = $('.tcol canvas', main);
    if (cv) {
      const A = { order: 0, density: 0.5, clear: 1, signal: 0 }, B = { order: 1, density: 1, clear: 1, signal: 0 };
      if (motion) { const f = field(cv, { tone: 'dark', pitch: 10, seed: 400 + r.page.length }, { to: A }); onScroll(() => f.set(lerpState(A, B, through(main, 1, 0.2)))); }
      else field(cv, { tone: 'dark', pitch: 10, seed: 400 + r.page.length }, { to: lerpState(A, B, 0.6) });   // fixed state
    }
    /* stage bar: active stage + progress */
    const secs = $$('[data-stage]', main), bar = $('.sb__p b'), btns = $$('[data-stage-go]');
    btns.forEach(b => b.addEventListener('click', () => { const t = secs.find(s => s.dataset.stage === b.dataset.stageGo); if (t) SITE.focusTarget(t); }));
    const headH = SITE.headerH;
    onScroll(() => {
      const y = headH() + window.innerHeight * 0.3; let cur = secs[0];
      secs.forEach(s => { if (s.getBoundingClientRect().top <= y) cur = s; });
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 4 && secs.length) cur = secs[secs.length - 1];
      btns.forEach(b => b.dataset.stageGo === (cur && cur.dataset.stage) ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current'));
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 1})`;
    });
    /* expertise links from home land on the right area */
    $$('[data-area]', main).forEach(l => l.tagName === 'A' && l.addEventListener('click', () => { sessionStorage.setItem('mt-area', l.dataset.area); }));
    if (r.page === 'expertise') { const a = sessionStorage.getItem('mt-area'); sessionStorage.removeItem('mt-area'); if (a) requestAnimationFrame(() => { const t = document.getElementById(`area-${a}`); if (t) SITE.focusTarget(t); }); }
    /* insights filter */
    const flt = $$('[data-flt]', main);
    flt.forEach(b => b.addEventListener('click', () => {
      flt.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      let n = 0; $$('.il > li', main).forEach(li => { const on = b.dataset.flt === 'all' || li.dataset.area === b.dataset.flt; li.hidden = !on; n += on; });
      $('[data-flt-out]', main).textContent = `${n} article${n === 1 ? '' : 's'} shown`;
    }));
  }

  const leave = main => new Promise(res => gsap.to(main, { opacity: 0, y: -10, duration: 0.2, ease: 'power1.in', onComplete: () => { gsap.set(main, { clearProps: 'all' }); res(); } }));

  SITE.mount({ id: 'w02', label: 'Website 02 · Threshold', header, footer, pages: { home, about, expertise, insights, article, contact }, enter, leave });
})();
