/* COPY for the Phase 08 study (classic script, no build step): presentation src/lib/emergenceId.js, 24 Nov 2026.
   Only `export` keywords were removed and the names are exposed on window.EID. Geometry, metrics and rules are untouched. */
(function () {
/* Direction B · Emergence B.02 · refined identity. ONE source for every B signature in the presentation.
   Source: 02_EMERGENCE/05_ESTUDIOS/fase-06b-calibrated-rise-newsreader (study, 23 Nov 2026) and its masters.
   - Symbol: B · Calibrated Rise. Paths, bands and the 2.6 u clearing exactly as public/assets/b-emergence/symbol/*.svg.
   - Wordmark: Newsreader, controlled contrast · Murthy roman 500 · Advisory italic 400 (450 at small sizes).
   - Lockups are built from Newsreader metrics MEASURED in the browser in the 06B study (embedded below), with
     baselines placed by coordinate, so every signature has fixed proportions at any size.
   Unit of every lockup: the cap height of “Murthy” = 100. Status: PROPOSAL (decisions of this round), not approved. */

/* ── symbol geometry (viewBox 10 −4 80 108) ── */
const VB = [10, -4, 80, 108];
const PATH_L = 'M50 100C18 78 22 30 60 2C70 34 66 72 50 100Z';
const PATH_R = 'M50 100C66 72 70 34 60 2C82 34 80 78 50 100Z';
const BANDS = [[-5, 57], [58, 11], [76, 8], [90, 6]];          // master (BANDS.r1)
const BANDS_OPT = [[-5, 62], [70, 14], [90, 10]];               // optical cut (BANDS.r1s)
const SHIFT = 2.6;                                              // clearing between the surfaces
const OPTICAL_BELOW = 30;                                       // px of SVG box height → effective 27.2 px
const effective = boxPx => boxPx * 98 / 108;                    // base point → tip
const useOptical = boxPx => boxPx < OPTICAL_BELOW;
const COL = { pool: '#0F2621', verd: '#36574E', mist: '#9AADA5', haze: '#DCE2DF', signal: '#D0A545', ink: '#16201D', paper: '#EEF2F0' };
const MASTER = { symbol: 'assets/b-emergence/symbol/B_calibrated-rise_master.svg', optical: 'assets/b-emergence/symbol/B_calibrated-rise_optical-16-24.svg', favicon: 'assets/b-emergence/favicon/favicon.svg', favicon16: 'assets/b-emergence/favicon/favicon-16.png', favicon32: 'assets/b-emergence/favicon/favicon-32.png', favicon16dark: 'assets/b-emergence/favicon/favicon-16-dark-tabs.png' };

let uid = 0;
const rects = b => b.map(([y, h]) => `<rect x="-5" y="${y}" width="110" height="${h}"/>`).join('');
/* the symbol as inline SVG. h = box height in px. optical: true / false / 'auto' (rule above) */
function mark({ h = 120, c1 = COL.pool, c2 = COL.signal, optical = 'auto', cls = '', extra = '', label = 'Murthy Advisory' } = {}) {
  const opt = optical === 'auto' ? useOptical(h) : optical, id = `bcp${++uid}`;
  const w = +(h * VB[2] / VB[3]).toFixed(3);
  return `<svg class="bmk ${cls}" viewBox="${VB.join(' ')}" width="${w}" height="${h}" role="img" aria-label="${label}" overflow="visible" data-optical="${opt}"><defs><clipPath id="${id}">${rects(opt ? BANDS_OPT : BANDS)}</clipPath></defs><g clip-path="url(#${id})" class="bmk__g"><path class="bmk__l" fill="${c1}" d="${PATH_L}"/><path class="bmk__r" fill="${c2}" d="${PATH_R}" transform="translate(${SHIFT} 0)"/></g>${extra}</svg>`;
}

/* ── Newsreader metrics, measured in the 06B study (canvas, loaded woff2) ──
   per optical size: [advance, ink left, ink right] in em. capR / capI: cap height of the roman / italic (em). */
const MET = {"capR":0.71875,"capI":0.71875,"w":{"8":{"Murthy|500|r":[3.966713,0,3.95322],"Advisory|400|i":[4.394777,0.125,4.430285],"Advisory|450|i":[4.482349,0.125,4.511356]," |500|r":[0.252996,0,0],"M|500|r":[1.106985,0,1.125],"A|400|i":[0.763491,0.125,0.75],"A|450|i":[0.776489,0.125,0.75]},"9":{"Murthy|500|r":[3.895423,0,3.936101],"Advisory|400|i":[4.294666,0.111111,4.385844],"Advisory|450|i":[4.380402,0.111111,4.465079]," |500|r":[0.249495,0,0],"M|500|r":[1.093479,0,1.111111],"A|400|i":[0.752485,0.111111,0.777778],"A|450|i":[0.765484,0.111111,0.777778]},"10":{"Murthy|500|r":[3.824323,0,3.811308],"Advisory|400|i":[4.194763,0.1,4.23325],"Advisory|450|i":[4.279164,0.1,4.311151]," |500|r":[0.246005,0,0],"M|500|r":[1.080025,0,1.1],"A|400|i":[0.742017,0.1,0.7],"A|450|i":[0.754517,0.1,0.7]},"11":{"Murthy|500|r":[3.753522,0,3.789377],"Advisory|400|i":[4.093643,0.090909,4.09159],"Advisory|450|i":[4.176704,0.090909,4.25906]," |500|r":[0.242504,0,0],"M|500|r":[1.067015,0,1.090909],"A|400|i":[0.73101,0.090909,0.727273],"A|450|i":[0.74301,0.090909,0.727273]},"12":{"Murthy|500|r":[3.683226,0,3.678556],"Advisory|400|i":[3.993526,0.083333,4.043357],"Advisory|450|i":[4.074254,0.083333,4.117584]," |500|r":[0.238501,0,0],"M|500|r":[1.053507,0,1.083333],"A|400|i":[0.720505,0.083333,0.666667],"A|450|i":[0.732005,0.083333,0.75]},"13":{"Murthy|500|r":[3.611436,0,3.65132],"Advisory|400|i":[3.890421,0.076923,3.909882],"Advisory|450|i":[3.971809,0.076923,3.984269]," |500|r":[0.235001,0,0],"M|500|r":[1.040002,0,1.076923],"A|400|i":[0.709501,0.076923,0.692308],"A|450|i":[0.721,0.076923,0.692308]},"14":{"Murthy|500|r":[3.541152,0,3.549582],"Advisory|400|i":[3.789318,0.071429,3.784319],"Advisory|450|i":[3.870868,0.071429,3.930299]," |500|r":[0.231499,0,0],"M|500|r":[1.026496,0,1],"A|400|i":[0.698497,0.071429,0.714286],"A|450|i":[0.709497,0.071429,0.714286]},"15":{"Murthy|500|r":[3.46987,0,3.519875],"Advisory|400|i":[3.689718,0.066667,3.732056],"Advisory|450|i":[3.767928,0.066667,3.803265]," |500|r":[0.227998,0,0],"M|500|r":[1.013491,0,1],"A|400|i":[0.687994,0.066667,0.666667],"A|450|i":[0.698493,0.066667,0.666667]},"16":{"Murthy|500|r":[3.39909,0,3.424097],"Advisory|400|i":[3.58912,0.125,3.612126],"Advisory|450|i":[3.666493,0.125,3.6825]," |500|r":[0.224497,0,0],"M|500|r":[0.999988,0,1],"A|400|i":[0.676991,0.125,0.6875],"A|450|i":[0.687491,0.125,0.6875]},"17":{"Murthy|500|r":[3.328407,0,3.332812],"Advisory|400|i":[3.486624,0.117647,3.494707],"Advisory|450|i":[3.563163,0.117647,3.563746]," |500|r":[0.220503,0,0],"M|500|r":[0.986511,0,1],"A|400|i":[0.666507,0.117647,0.647059],"A|450|i":[0.676008,0.117647,0.647059]},"18":{"Murthy|500|r":[3.257125,0,3.300177],"Advisory|400|i":[3.386024,0.111111,3.381965],"Advisory|450|i":[3.462223,0.111111,3.50572]," |500|r":[0.217001,0,0],"M|500|r":[0.973007,0,1],"A|400|i":[0.655505,0.111111,0.611111],"A|450|i":[0.665004,0.111111,0.666667]},"19":{"Murthy|500|r":[3.263716,0,3.27653],"Advisory|400|i":[3.391945,0.105263,3.416128],"Advisory|450|i":[3.468147,0.105263,3.48433]," |500|r":[0.2175,0,0],"M|500|r":[0.974503,0,1],"A|400|i":[0.656502,0.105263,0.631579],"A|450|i":[0.665502,0.105263,0.631579]},"20":{"Murthy|500|r":[3.269809,0,3.305309],"Advisory|400|i":[3.398366,0.1,3.397866],"Advisory|450|i":[3.474072,0.1,3.515572]," |500|r":[0.2175,0,0],"M|500|r":[0.975999,0,1],"A|400|i":[0.656999,0.1,0.65],"A|450|i":[0.666499,0.1,0.65]},"22":{"Murthy|500|r":[3.282498,0,3.311457],"Advisory|400|i":[3.410215,0.090909,3.411764],"Advisory|450|i":[3.486425,0.090909,3.525929]," |500|r":[0.217998,0,0],"M|500|r":[0.978493,0,1],"A|400|i":[0.658995,0.090909,0.636364],"A|450|i":[0.667995,0.090909,0.636364]},"24":{"Murthy|500|r":[3.294757,0,3.31792],"Advisory|400|i":[3.422136,0.083333,3.425466],"Advisory|450|i":[3.499352,0.083333,3.536849]," |500|r":[0.218002,0,0],"M|500|r":[0.981007,0,1],"A|400|i":[0.660505,0.083333,0.625],"A|450|i":[0.670005,0.083333,0.625]},"72":{"Murthy|500|r":[3.596307,-0.015625,3.606431],"Advisory|400|i":[3.711007,0.09375,3.719631],"Advisory|450|i":[3.793858,0.09375,3.812107]," |500|r":[0.227,0,0],"M|500|r":[1.045502,-0.015625,1.046875],"A|400|i":[0.700501,0.09375,0.65625],"A|450|i":[0.709002,0.09375,0.671875]}}};
const OPS = Object.keys(MET.w).map(Number).sort((a, b) => a - b);
const near = o => OPS.reduce((b, x) => Math.abs(x - o) < Math.abs(b - o) ? x : b, OPS[0]);
const K = (t, w, it, opsz) => { const r = MET.w[opsz >= 72 ? 72 : near(opsz)][`${t}|${w}|${it ? 'i' : 'r'}`]; return { adv: r[0], inkL: r[1], inkR: r[2] }; };

/* ── the signature system (decisions of this round) ── */
const SMALL_MAX = 12;                                           // px of Murthy cap height
const RULES = {
  wordmark: { family: 'Newsreader', murthy: 500, advisory: 400, advisorySmall: 450, opsz: 72 },
  horizontal: { sym: 1.8, gap: 0.5 },                                  // standard signature
  horizontalLarge: { sym: 2.0, gap: 0.5 },                             // large-format signatures
  stacked: { sym: 2.6, clear: 0.9, shift: 2 },                         // geometry of the 06B study; 'clear' is measured from the symbol's
                                                                       // nominal height, which leaves ≈ 0.74 cap between base point and cap line.
                                                                       // Symbol 2 u (of its 108 u grid) left of the name's axis.
  compact: { advisoryCap: 0.75, baselines: 1.25, alignInk: true },     // option 3, Direction A compact 100/75
};
const THEMES = {
  positive: { c1: COL.pool, c2: COL.signal, t: COL.pool, bg: COL.paper },
  negative: { c1: COL.mist, c2: COL.signal, t: '#EEF2F0', bg: COL.pool },
  inkPool: { c1: COL.pool, c2: COL.pool, t: COL.pool, bg: '#FFFFFF' },
  inkInk: { c1: COL.ink, c2: COL.ink, t: COL.ink, bg: '#FFFFFF' },
  inkWhite: { c1: '#FFFFFF', c2: '#FFFFFF', t: '#FFFFFF', bg: COL.pool },
};
const THEME_LIST = [['positive', 'Colour · positive', 'Primary'], ['negative', 'Colour · negative', 'For dark grounds'], ['inkPool', 'One ink · Deep Pool', 'Functional'], ['inkInk', 'One ink · Ink', 'Functional'], ['inkWhite', 'One ink · white', 'Functional · reversed']];

const text = (s, x, y, size, w, it, fill, opsz, cls) => `<text class="bsg-w ${cls}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" font-family="Newsreader, serif" font-size="${size.toFixed(3)}" font-weight="${w}"${it ? ' font-style="italic"' : ''} fill="${fill}" style="font-variation-settings:'opsz' ${opsz};font-kerning:normal">${s}</text>`;
function placeSymbol(bx, by, hs, c, optical, extra = '') {
  const H = hs * 108 / 98, W = H * 80 / 108, x = bx - 40 / 80 * W, y = by - 104 / 108 * H;
  return { W, H, x, y, svg: s => mark({ h: +H.toFixed(3), c1: c.c1, c2: c.c2, optical, extra }).replace('<svg ', `<svg x="${(x + s).toFixed(2)}" y="${y.toFixed(2)}" `).replace(/width="[^"]+" height="[^"]+"/, `width="${W.toFixed(3)}" height="${H.toFixed(3)}"`) };
}

/* lockup({ kind, theme, cap, pad, guides, optical }) → { svg(capPx), W, H, ... }
   kind: 'horizontal' | 'horizontalLarge' | 'stacked' | 'compact' | 'wordmark'
   cap: the Murthy cap height it will be shown at (px) — decides the small-size setting and the optical cut. */
function lockup({ kind = 'horizontal', theme = 'positive', cap = 40, pad = 30, guides = false, optical = 'auto', small: smallOverride } = {}) {
  const c = THEMES[theme] || THEMES.positive, R = RULES.wordmark;
  /* small: forced setting for thumbnails of pieces whose real size differs from the size on screen (e.g. a printed cover) */
  const small = smallOverride ?? cap <= SMALL_MAX, opsz = small ? Math.round(cap / MET.capR) : R.opsz, wA = small ? R.advisorySmall : R.advisory, wM = R.murthy;
  const fsM = 100 / MET.capR, kM = K('Murthy', wM, false, opsz), sp = K(' ', 500, false, opsz).adv * fsM;
  const g = [], parts = []; let W, H;
  const symOpt = hs => optical === 'auto' ? useOptical(hs * 108 / 98 * cap / 100) : optical;
  if (kind === 'compact') {
    const C = RULES.compact, capA = C.advisoryCap * 100, fsA = capA / MET.capI, kA = K('Advisory', wA, true, opsz);
    const B1 = pad + 100, B2 = B1 + C.baselines * 100, hs = 100 + C.baselines * 100;
    const S = placeSymbol(0, B2, hs, c, symOpt(hs)), sx = pad - S.x, x0 = pad + S.W + 50;
    const inkM = K('M', wM, false, opsz).inkL * fsM, inkA = K('A', wA, true, opsz).inkL * fsA, xA = C.alignInk ? x0 - inkM + inkA : x0;
    parts.push(S.svg(sx), text('Murthy', x0, B1, fsM, wM, false, c.t, opsz, 'bsg-m'), text('Advisory', xA, B2, fsA, wA, true, c.t, opsz, 'bsg-a'));
    W = Math.max(x0 + kM.adv * fsM, xA + Math.max(kA.adv, kA.inkR) * fsA + 4) + pad; H = B2 + pad + 0.22 * fsA;
    g.push(['cap', B1 - 100, 'Murthy cap line = tip of the symbol'], ['base', B1, 'Murthy baseline'], ['capA', B2 - capA, 'Advisory cap line · 75 % of Murthy'], ['base', B2, 'Advisory baseline · 1.25 caps below = base point'], ['ink', x0 - inkM, 'M and A aligned on their ink edges', 'v']);
  } else if (kind === 'stacked') {
    const T = RULES.stacked, hs = T.sym * 100, kA = K('Advisory', wA, true, opsz), fsA = fsM, tw = kM.adv * fsM + sp + kA.adv * fsA, twE = kM.adv * fsM + sp + Math.max(kA.adv, kA.inkR) * fsA + 4;
    const B = pad + hs + T.clear * 100 + 100, S = placeSymbol(0, 0, hs, c, symOpt(hs)), unit = S.H / 108, cx = pad + tw / 2;
    const sx = cx - S.W / 2 - T.shift * unit - S.x, sy = pad - S.y;
    parts.push(S.svg(sx).replace(/y="([-\d.]+)"/, (m, a) => `y="${(+a + sy).toFixed(2)}"`), text('Murthy', pad, B, fsM, wM, false, c.t, opsz, 'bsg-m'), text('Advisory', pad + kM.adv * fsM + sp, B, fsA, wA, true, c.t, opsz, 'bsg-a'));
    W = pad * 2 + twE; H = B + pad + 0.25 * fsM;
    const baseY = S.y + sy + 104 / 108 * S.H;
    g.push(['axis', cx, 'Axis of the name', 'v'], ['bp', cx - T.shift * unit, `Base point of the symbol · ${T.shift} u left of the axis`, 'v'], ['cap', B - 100, 'Murthy cap line'], ['base', B, 'Baseline'], ['clear', baseY, `Base of the symbol · ${((B - 100 - baseY) / 100).toFixed(2)} cap above the cap line`]);
  } else {
    const kA = K('Advisory', wA, true, opsz), fsA = fsM;
    let x0 = pad, hs = 0;
    const T = kind === 'horizontalLarge' ? RULES.horizontalLarge : RULES.horizontal;
    const B = pad + (kind === 'wordmark' ? 100 : T.sym * 100);
    if (kind !== 'wordmark') { hs = T.sym * 100; const S = placeSymbol(0, B, hs, c, symOpt(hs)); parts.push(S.svg(pad - S.x)); x0 = pad + S.W + T.gap * 100; g.push(['tip', B - hs, `Tip · symbol ${T.sym} × cap`], ['gap', pad + S.W, `Gap ${T.gap} × cap`, 'v']); }
    parts.push(text('Murthy', x0, B, fsM, wM, false, c.t, opsz, 'bsg-m'), text('Advisory', x0 + kM.adv * fsM + sp, B, fsA, wA, true, c.t, opsz, 'bsg-a'));
    W = x0 + kM.adv * fsM + sp + Math.max(kA.adv, kA.inkR) * fsA + 4 + pad; H = B + pad + 0.25 * fsM;
    g.unshift(['cap', B - 100, 'Murthy cap line'], ['base', B, 'Baseline = base point of the symbol']);
    if (kind !== 'wordmark') g.push(['gap', x0, 'Name starts', 'v']);
  }
  const guideSVG = () => `<g class="bsg-guides" fill="none">${g.map(([k, p, , d], i) => d === 'v' ? `<line class="bg-${k}" x1="${p.toFixed(2)}" x2="${p.toFixed(2)}" y1="0" y2="${H.toFixed(2)}"/>` : `<line class="bg-${k}" x1="0" x2="${W.toFixed(2)}" y1="${p.toFixed(2)}" y2="${p.toFixed(2)}"/>`).join('')}${g.map(([k, p, , d], i) => { const x = d === 'v' ? p : W - 14, y = d === 'v' ? 12 : p; return `<g class="bsg-mk"><circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="9"/><text x="${x.toFixed(2)}" y="${(y + 3.4).toFixed(2)}" text-anchor="middle">${i + 1}</text></g>`; }).join('')}</g>`;
  return {
    W, H, small, opsz, wA, legend: g.map(x => x[2]), bg: c.bg,
    svg: (capPx = cap, { withGuides = guides, cls = '' } = {}) => { const k = capPx / 100; return `<svg class="bsg ${cls}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.toFixed(2)} ${H.toFixed(2)}" width="${(W * k).toFixed(2)}" height="${(H * k).toFixed(2)}" role="img" aria-label="Murthy Advisory" data-kind="${kind}">${parts.join('')}${withGuides ? guideSVG() : ''}</svg>`; },
  };
}
/* convenience: the right signature at a given Murthy cap height */
const signature = (kind, theme, cap, opts = {}) => lockup({ kind, theme, cap, ...opts }).svg(cap, opts);

/* where each signature is used (shown in the presentation) */
const USAGE = [
  { kind: 'horizontal', name: 'Horizontal', role: 'Principal signature', where: 'Website header, documents, email, presentations: the default.', rule: 'Symbol 1.8 × the cap height of Murthy; the font’s own word space; gap 0.5 cap.' },
  { kind: 'horizontalLarge', name: 'Horizontal · large format', role: 'Large signatures', where: 'Covers, banners, stage screens and signage, where the signature is seen from a distance.', rule: 'Same construction, symbol 2 × cap: a little more presence when the name is large.' },
  { kind: 'stacked', name: 'Stacked', role: 'Centred formats', where: 'Square and centred layouts: social tiles, title slides, merchandise.', rule: 'Symbol 2.6 × cap above the name, about 0.75 cap of clear space, moved 2 u left to sit optically on the axis.' },
  { kind: 'compact', name: 'Compact', role: 'Tight spaces', where: 'Report and proposal covers, narrow columns, the corner of a page.', rule: 'Advisory italic at 75 % of Murthy’s cap; baselines 1.25 caps apart; M and A aligned on their ink.' },
  { kind: 'symbol', name: 'Symbol alone', role: 'When the name is already present', where: 'Avatars, favicons, app tiles, seals; never as a replacement for the name in a first encounter.', rule: 'Optical cut below a 30 px box (≈ 27.2 px effective height). Favicon: 16 px tile, 14 px effective symbol.' },
];

window.EID = { VB, PATH_L, PATH_R, BANDS, BANDS_OPT, SHIFT, OPTICAL_BELOW, effective, useOptical, COL, MASTER, mark, SMALL_MAX, RULES, THEME_LIST, lockup, signature, USAGE };
})();
