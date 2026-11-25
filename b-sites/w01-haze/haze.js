/* Website 01 · Haze — editorial and calm (E-12: reading register).
   Art direction: a paper ground, Ink type, a wide margin column for labels and side notes, contained photographs and
   negative space. The field never fills a page: it lives in a band at the top edge and in the margin beside images,
   always on its own strip, never behind text. The argument of the site is Insights: the home page leads with an essay
   and the article page is a long read whose top band settles as it is read. One signal in the whole site: under the
   conclusion of an article. Movement ≈ 1.5 s, quiet. */
(function () {
  const { MC, SITE } = window, { it } = MC;
  const { $, $$, field, lerpState, onScroll, through, img, sig, navLinks, href, form, motion } = SITE;
  const arrow = '<span class="ar" aria-hidden="true">→</span>';
  const FEATURE = MC.articles[2];                       // the featured essay on the home page
  const band = (cls = '', seed = 5) => `<div class="band ${cls}" aria-hidden="true"><canvas data-seed="${seed}"></canvas></div>`;
  const ml = t => `<p class="ml">${t}</p>`;                // margin label

  const header = () => `<header class="hd">
    <div class="hd__in">
      <a class="hd__logo" href="#/" aria-label="Murthy Advisory, home">${sig('positive', 16)}</a>
      <nav class="hd__nav" aria-label="Main"><ul>${navLinks()}</ul></nav>
      <a class="hd__cta" href="#/contact">${MC.cta}</a>
      <button class="hd__mb" type="button" data-menu-btn aria-expanded="false" aria-controls="mmenu">Menu</button>
    </div>
    ${band('band--hd', 3)}
    <div class="mm" id="mmenu" data-menu><nav aria-label="Main, mobile"><ul>${navLinks()}</ul></nav><a class="mm__cta" href="#/contact">${MC.cta} ${arrow}</a></div>
  </header>`;

  const footer = () => `<footer class="ft">${band('band--ft', 9)}<div class="ft__in">
      <div><a href="#/" aria-label="Murthy Advisory, home">${sig('positive', 16)}</a><p class="ft__p">${MC.positioning}</p></div>
      <nav aria-label="Footer"><ul>${navLinks()}</ul></nav>
      <dl class="ft__d">${MC.contactDetails.slice(0, 2).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div><div class="ft__b"><p>© Murthy Advisory</p><p>${MC.status}</p><p>Website 01 · Haze</p></div></footer>`;

  const essayLink = (a, cls = '') => `<a class="es ${cls}" href="${href('article', a.slug)}" data-rv><span class="ml">${a.area}</span><span class="es__t">${it(a.title)}</span><span class="es__s">${a.standfirst}</span><span class="es__m">${a.read} ${arrow}</span></a>`;

  /* ── pages ── */
  const home = () => `
    <section class="intro">
      ${ml('Murthy Advisory')}
      <h1 class="h1">${it(MC.hero)}</h1>
      <div class="intro__b"><p class="lede">${MC.positioning}</p><p class="intro__l"><a class="lnk" href="#/insights">Read the insights</a><a class="lnk" href="#/contact">${MC.cta}</a></p></div>
    </section>
    <section class="feat" aria-labelledby="feat-h">
      <div class="feat__m">${ml('Insights · featured essay')}${band('band--v', 12)}</div>
      <a class="feat__ph" href="${href('article', FEATURE.slug)}" tabindex="-1" aria-hidden="true">${img(FEATURE.photo, '', '50% 50%', true)}</a>
      <div class="feat__t"><p class="ml ml--in">${FEATURE.area} · ${FEATURE.read}</p><h2 class="h2" id="feat-h"><a href="${href('article', FEATURE.slug)}">${it(FEATURE.title)}</a></h2><p class="lede">${FEATURE.standfirst}</p><a class="lnk" href="${href('article', FEATURE.slug)}">Read the essay ${arrow}</a></div>
    </section>
    <section class="also" aria-label="Also in Insights">${ml('Also in Insights')}<div class="also__g">${MC.articles.filter(a => a !== FEATURE).map(a => essayLink(a)).join('')}</div></section>
    <section class="stmt">${ml('Why this practice exists')}<p class="h2 stmt__t" data-rv>${MC.purposeBody}</p><p class="stmt__p" data-rv>${MC.purpose}</p></section>
    <section class="idx" aria-labelledby="idx-h">${ml('Expertise')}<div><h2 class="h3" id="idx-h">Three areas of expertise.</h2>
      <ol class="idx__l">${MC.areas.map(a => `<li data-rv><a href="#/expertise" data-area="${a.id}"><span class="idx__n">${a.n}</span><span class="idx__h">${a.name}</span><span class="idx__p">${a.problem}</span>${arrow}</a></li>`).join('')}</ol></div></section>
    <section class="tease">${ml('About')}<figure class="tease__ph" data-rv>${img('r2', '', '50% 45%')}</figure>
      <div class="tease__t" data-rv><h2 class="h2">${it('Judgement from *both sides of the table.*')}</h2><p class="lede">${MC.lensBody}</p><a class="lnk" href="#/about">About Sowmya Murthy ${arrow}</a></div></section>
    ${closing()}`;

  const closing = (h = `${MC.cta}.`) => `<section class="close">${ml('Contact')}<div><p class="h2"><a class="close__a" href="#/contact">${h}</a></p><p class="lede">${MC.contactLede}</p></div></section>`;

  const pageHead = (label, h1, lede) => `<section class="ph">${ml(label)}<div><h1 class="h1 h1--p">${h1}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}</div></section>`;

  const about = () => `
    ${pageHead('About', it('Judgement from *both sides of the table.*'), MC.lensBody)}
    <section class="prof">
      <figure class="prof__ph"><img src="${MC.portrait.src}" alt="${MC.portrait.alt}" width="1379" height="919" loading="lazy" decoding="async"></figure>
      <div class="prof__m">${ml('Sowmya Murthy')}<p class="sn">${MC.bioNote}</p></div>
    </section>
    <section class="txt">
      ${MC.sides.map((s, i) => `<div class="txt__r" data-rv>${ml(`0${i + 1} · ${s.k}`)}<p class="txt__p">${s.t}</p></div>`).join('')}
    </section>
    <section class="txt txt--modes" aria-labelledby="modes-h">${ml('How the work is delivered')}<div><h2 class="h3" id="modes-h">Four ways of working.</h2>
      <dl class="modes">${MC.modes.map(m => `<div data-rv><dt>${m.name}</dt><dd>${m.t}</dd></div>`).join('')}</dl><p class="sn">${MC.modesNote}</p></div></section>
    ${closing()}`;

  const expertise = () => `
    ${pageHead('Expertise', 'Three areas of expertise.', MC.positioning)}
    <nav class="toc-h" aria-label="Areas on this page"><ol>${MC.areas.map(a => `<li><a href="#area-${a.id}" data-goto="area-${a.id}">${a.n} ${a.name}</a></li>`).join('')}</ol></nav>
    ${MC.areas.map(a => { const rel = MC.articles.find(x => x.areaId === a.id); return `<section class="chap" id="area-${a.id}" aria-labelledby="h-${a.id}">
      <div class="chap__m">${ml(`${a.n} · ${a.tag}`)}<aside class="sn sn--q" aria-label="Questions to start with"><p class="ml">Questions to start with</p><ul>${a.questions.map(q => `<li>${q}</li>`).join('')}</ul></aside></div>
      <div class="chap__t"><h2 class="h2" id="h-${a.id}">${a.name}</h2><p class="lede">${a.problem}</p><p class="txt__p">${a.scope}</p>
      <p class="chap__o"><span class="ml">The outcome</span><span class="h3">${it(a.outcome)}</span></p>
      ${rel ? `<p class="chap__r"><span class="ml">Related essay</span><a class="lnk" href="${href('article', rel.slug)}">${MC.plain(rel.title)}</a></p>` : ''}</div></section>`; }).join('')}
    <section class="txt txt--modes" aria-labelledby="modes-h">${ml('Delivery')}<div><h2 class="h3" id="modes-h">How the work is delivered.</h2>
      <dl class="modes">${MC.modes.map(m => `<div data-rv><dt>${m.name}</dt><dd>${m.t}</dd></div>`).join('')}</dl><p class="sn">${MC.modesNote}</p></div></section>
    ${closing()}`;

  const insights = () => `
    ${pageHead('Insights', 'Notes on judgement, *written to be used.*'.replace(/\*([^*]+)\*/, '<em>$1</em>'), 'Short, practical essays on decisions under uncertainty. This is where the thinking is published first; LinkedIn points here. The three essays are sample text written for this prototype.')}
    <section class="lead">
      <a class="lead__ph" href="${href('article', FEATURE.slug)}" tabindex="-1" aria-hidden="true">${img(FEATURE.photo, '', '50% 50%')}</a>
      <div class="lead__t">${ml(`Featured · ${FEATURE.area}`)}<h2 class="h2"><a href="${href('article', FEATURE.slug)}">${it(FEATURE.title)}</a></h2><p class="lede">${FEATURE.standfirst}</p><p class="es__m">${FEATURE.read}</p></div>
    </section>
    <section class="jr" aria-labelledby="jr-h">
      <div class="jr__m">${ml('All essays')}<p class="sn" id="flt-note">The filter applies to this index. The featured essay above stays in place.</p><div class="flt" role="group" aria-label="Filter the index by area" aria-describedby="flt-note"><button type="button" aria-pressed="true" data-flt="all">All areas</button>${MC.areas.map(a => `<button type="button" aria-pressed="false" data-flt="${a.name}">${a.name}</button>`).join('')}</div><p class="vh" role="status" aria-live="polite" data-flt-out></p></div>
      <div><h2 class="vh" id="jr-h">All essays</h2><ol class="jr__l">${MC.articles.map(a => `<li data-area="${a.area}">${essayLink(a, 'es--row')}</li>`).join('')}</ol></div>
    </section>
    <section class="qbox">${ml('The questions these essays return to')}<ul>${MC.questions.map(q => `<li data-rv>${q}</li>`).join('')}</ul></section>
    ${closing('Suggest a question.')}`;

  const article = r => {
    const a = MC.article(r.slug), i = MC.articles.indexOf(a), next = MC.articles[(i + 1) % MC.articles.length];
    return `<article class="art">
      <header class="art__h">
        <p class="art__k"><a class="lnk" href="#/insights"><span aria-hidden="true">←</span> Insights</a><span>${a.area} · ${a.read}</span></p>
        <h1 class="h1 h1--a">${it(a.title)}</h1><p class="art__s">${a.standfirst}</p>
        <p class="art__by">Sample text · written for the prototype, not by Sowmya</p>
      </header>
      <figure class="art__ph" style="--pw:${MC.photos[a.photo].w}px">${img(a.photo, '', '50% 50%', true)}</figure>
      <div class="art__b">
        ${a.sections.map(s => `<section class="art__sec" id="s-${s.k}" aria-labelledby="h-${a.slug}-${s.k}">
          <h2 class="art__h2" id="h-${a.slug}-${s.k}">${s.h}</h2>
          ${s.p.map((p, j) => `<p>${p}</p>`).join('')}
          ${s.quote ? `<blockquote class="pull"><p>${it(s.quote)}</p></blockquote>` : ''}
          ${s.evidence ? `<aside class="side" aria-label="Note"><p>Illustrative: none of this evidence has been collected for this example.</p></aside>
            <table class="tab"><caption>Evidence the board would need</caption><thead><tr><th scope="col">Evidence</th><th scope="col">Status</th></tr></thead><tbody>${s.evidence.map(([t, st]) => `<tr><td>${t}</td><td>${st[0].toUpperCase() + st.slice(1)}</td></tr>`).join('')}</tbody></table>` : ''}
          ${s.rec ? `<p class="rec"><span class="rec__t" data-sig>${it(s.rec)}</span><svg class="rec__s" viewBox="0 0 120 2" width="120" height="2" aria-hidden="true"><line x1="0" x2="120" y1="1" y2="1"/></svg>${s.recNote ? `<span class="rec__n">${s.recNote}</span>` : ''}</p>` : ''}
        </section>`).join('')}
      </div>
      <footer class="art__f"><p class="ml">Next essay</p>${essayLink(next, 'es--next')}<p><a class="lnk" href="#/insights">All insights ${arrow}</a></p></footer>
    </article>`;
  };

  const contact = () => `
    ${pageHead('Contact', `${MC.cta}.`, MC.contactLede)}
    <section class="letter">
      <div class="letter__f">${form('cform--line')}</div>
      <div class="letter__m">${ml('Details · to be confirmed')}<dl class="dl">${MC.contactDetails.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
        ${ml('What happens next')}<ol class="steps">${MC.nextSteps.map(s => `<li><b>${s[0]}.</b> ${s[1]}</li>`).join('')}</ol>
        <p class="sn">Demonstration form: nothing is sent until the contact details are confirmed.</p></div>
    </section>`;

  /* ── behaviour ── */
  function enter(r, main) {
    const hb = $('.band--hd canvas');
    if (hb) {
      const f = field(hb, { tone: 'paper', ground: null, pitch: 5, seed: 3, frag: [4, 90], band: [0, 1], fadeEdge: 0.9 }, { to: { order: 0.55, density: 0.75, signal: 0 }, from: { order: 0, density: 0.4 }, dur: 1.5 });
      if (r.page === 'article' && motion) {   // the top band settles as the essay is read (animated mode only)
        const A = { order: 0.15, density: 0.6, clear: 1, signal: 0 }, B = { order: 1, density: 1, clear: 1, signal: 0 }, body = $('.art__b', main);
        onScroll(() => f.set(lerpState(A, B, through(body, 0.85, 0.6))));
      }
    }
    $$('.band:not(.band--hd) canvas').forEach(cv => field(cv, { tone: 'paper', ground: null, pitch: 6, seed: +cv.dataset.seed, frag: [4, 80], fadeEdge: 0.8, band: [0, 1] }, { to: { order: 0.7, density: 0.8, signal: 0 }, from: { order: 0, density: 0.45 }, dur: 1.5, inView: true }));
    $$('[data-area]', main).forEach(l => l.tagName === 'A' && l.addEventListener('click', () => sessionStorage.setItem('mh-area', l.dataset.area)));
    if (r.page === 'expertise') { const a = sessionStorage.getItem('mh-area'); sessionStorage.removeItem('mh-area'); if (a) requestAnimationFrame(() => { const t = document.getElementById(`area-${a}`); t && SITE.focusTarget(t); }); }
    const flt = $$('[data-flt]', main);
    flt.forEach(b => b.addEventListener('click', () => {
      flt.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      let n = 0; $$('.jr__l > li', main).forEach(li => { const on = b.dataset.flt === 'all' || li.dataset.area === b.dataset.flt; li.hidden = !on; n += on; });
      $('[data-flt-out]', main).textContent = `${n} essay${n === 1 ? '' : 's'} shown in the index`;
    }));
  }
  const leave = main => new Promise(res => gsap.to(main, { opacity: 0, duration: 0.22, ease: 'power1.in', onComplete: () => { gsap.set(main, { clearProps: 'opacity' }); res(); } }));

  SITE.mount({ id: 'w01', label: 'Website 01 · Haze', header, footer, pages: { home, about, expertise, insights, article, contact }, enter, leave });
})();
