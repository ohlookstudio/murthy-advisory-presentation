/* Field · the single graphic engine of Emergence (Phase 08 study).
   Extends the B-02 / six-routes `strata` field (fine horizontal segments = partial information) with:
   - a baseline grid (pitch) shared with the typography;
   - three tonal layers (no new colours: Mist and Verdigris over Deep Pool, Verdigris and Mist over Haze);
   - rectangular clearings that open from their centre, with an optional edge lean of 5.8° (the lean of the symbol);
   - density (how many rows are present: degree of complexity) and order (noise → aligned rows);
   - one signal: a single Signal Mustard line that sits on a row of the grid.
   State is four numbers (order, clear, density, signal), all 0..1, so any timeline can drive it and every
   static outcome is simply a state. Deterministic (seeded): the same field always looks the same. */
(function () {
  const PAL = { pool: '#0F2621',   /* Deep Pool unified to #0F2621 (studio decision, 24 Nov 2026) */
                 verd: '#36574E', mist: '#9AADA5', haze: '#DCE2DF', signal: '#D0A545', ink: '#171C1B', paper: '#F3F5F4' };
  const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const seeded = s => () => (s = (s * 16807) % 2147483647, (s - 1) / 2147483646);
  const smooth = t => t * t * (3 - 2 * t);
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const LEAN = 5.8;                     // degrees: the tip of Calibrated Rise leans 10 u over 98 u

  /* grounds and their line tones */
  const TONES = {
    dark: { ground: PAL.pool, layers: [[PAL.mist, 0.46], [PAL.verd, 1], [PAL.mist, 0.2]] },
    light: { ground: PAL.haze, layers: [[PAL.verd, 0.5], [PAL.mist, 0.9], [PAL.verd, 0.22]] },
    paper: { ground: PAL.paper, layers: [[PAL.verd, 0.42], [PAL.mist, 0.8], [PAL.verd, 0.18]] },
    ink: { ground: PAL.ink, layers: [[PAL.mist, 0.4], [PAL.verd, 0.95], [PAL.mist, 0.18]] },
    oneInk: { ground: '#FFFFFF', layers: [[PAL.pool, 0.55], [PAL.pool, 0.3], [PAL.pool, 0.15]] },
  };

  function Field(cv, opts = {}) {
    const o = Object.assign({
      tone: 'dark', ground: undefined,   // ground colour: undefined = tone ground, null = transparent
      pitch: 10, seed: 7,
      jitter: 1.3,                       // vertical displacement at order 0, in pitches
      frag: [6, 150], space: [3, 30],    // segment and gap lengths at order 0 (px)
      dropout: 0.24,                     // share of segments missing at order 0
      clearings: [],                     // [{ x, y, w, h, lean: 0 | LEAN, pad: px }] in 0..1 of the canvas
      signal: null,                      // { y, x0, x1 } in 0..1 (y snaps to the nearest row)
      signalW: 1.6, lineW: 1, signalColour: null,   // one-ink prints use the ink colour for the signal
      band: null,                        // [y0, y1] 0..1: rows exist only inside this band (quiet register)
      fadeEdge: 0,                       // 0..1 rows fade towards the band edges
    }, opts);
    const tone = TONES[o.tone] || TONES.dark;
    const ground = o.ground === undefined ? tone.ground : o.ground;
    const ctx = cv.getContext('2d');
    const st = { order: 0, clear: 0, density: 1, signal: 0 };
    let W = 0, H = 0, rows = [], sigRow = null;

    function build() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth || cv.width; H = cv.clientHeight || cv.height;
      cv.width = Math.max(1, Math.round(W * dpr)); cv.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const R = seeded(o.seed), n = Math.floor(H / o.pitch), off = (H - (n - 1) * o.pitch) / 2;
      rows = [];
      for (let i = 0; i < n; i++) {
        const y = off + i * o.pitch, f = y / H;
        if (o.band && (f < o.band[0] || f > o.band[1])) continue;
        const r = R(), layer = r < 0.62 ? 0 : r < 0.84 ? 1 : 2;
        let edge = 1; if (o.band && o.fadeEdge) { const d = Math.min(f - o.band[0], o.band[1] - f) / ((o.band[1] - o.band[0]) / 2); edge = clamp(d / o.fadeEdge); }
        const segs = []; let x = -20 - R() * 40;
        while (x < W + 20) { const len = o.frag[0] + R() * (o.frag[1] - o.frag[0]); segs.push({ x0: x, x1: x + len, dy: (R() - 0.5) * 2 * o.jitter * o.pitch, keep: R() }); x += len + o.space[0] + R() * (o.space[1] - o.space[0]); }
        rows.push({ y, layer, rank: R(), edge, segs });
      }
      if (o.signal) { const ty = o.signal.y * H; sigRow = rows.reduce((b, r) => (!b || Math.abs(r.y - ty) < Math.abs(b.y - ty) ? r : b), null); }
    }

    /* horizontal interval of a clearing on row y, for the current opening amount */
    function hole(c, y) {
      const a = smooth(clamp(c.amt != null ? c.amt : st.clear)); if (a <= 0) return null;
      const cy = (c.y + c.h / 2) * H, hh = (c.h * H / 2) * a; if (Math.abs(y - cy) > hh) return null;
      /* only the RIGHT edge leans (5.8°, the tilt of the symbol's tip): the left edge stays vertical, and the lean only ever
         widens the clearing (0 at the bottom row, h·tan at the top), so text set in the nominal box never meets a line */
      const cx = (c.x + c.w / 2) * W, hw = (c.w * W / 2) * a, sh = c.lean ? (cy + hh - y) * Math.tan(c.lean * Math.PI / 180) : 0, pad = c.pad || 0;
      return [cx - hw - pad, cx + hw + sh + pad];
    }
    /* vector output of the current state (print): same geometry as draw(), as SVG <line> elements */
    function svg({ width = W, height = H } = {}) {
      const ord = smooth(clamp(st.order)), den = clamp(st.density), out = [];
      if (ground) out.push(`<rect width="${W}" height="${H}" fill="${ground}"/>`);
      for (const r of rows) {
        const presence = clamp((den - r.rank) * 12 + (den >= 1 ? 1 : 0)); if (presence <= 0) continue;
        const [col, alpha] = tone.layers[r.layer]; const holes = o.clearings.map(cl => hole(cl, r.y)).filter(Boolean); const segs = [];
        r.segs.forEach((s, j) => { if (s.keep < o.dropout * (1 - ord)) return; const nx = j < r.segs.length - 1 ? r.segs[j + 1].x0 : W + 20; const y = r.y + s.dy * (1 - ord), x1 = s.x1 + (nx - s.x1) * ord;
          let pieces = [[s.x0, x1]]; for (const [a, b] of holes) pieces = pieces.flatMap(([p, q]) => (b <= p || a >= q) ? [[p, q]] : [[p, Math.min(q, a)], [Math.max(p, b), q]].filter(([u, v]) => v - u > 0.5));
          pieces.forEach(([p, q]) => { const a = Math.max(0, p), b = Math.min(W, q); if (b - a > 0.3) segs.push(`M${a.toFixed(1)} ${y.toFixed(2)}H${b.toFixed(1)}`); }); });
        if (segs.length) out.push(`<path d="${segs.join('')}" stroke="${col}" stroke-opacity="${(alpha * presence * r.edge).toFixed(3)}" stroke-width="${o.lineW}" fill="none"/>`);
      }
      if (sigRow && st.signal > 0) { const s = o.signal, x0 = s.x0 * W, x1 = s.x1 * W, e = smooth(clamp(st.signal)); out.push(`<line x1="${x0.toFixed(1)}" x2="${(x0 + (x1 - x0) * e).toFixed(1)}" y1="${sigRow.y.toFixed(2)}" y2="${sigRow.y.toFixed(2)}" stroke="${o.signalColour || PAL.signal}" stroke-width="${o.signalW}"/>`); }
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${width}" height="${height}" preserveAspectRatio="none" aria-hidden="true">${out.join('')}</svg>`;
    }
    function strokeCut(x0, x1, y, holes) {
      let pieces = [[x0, x1]];
      for (const [a, b] of holes) pieces = pieces.flatMap(([p, q]) => (b <= p || a >= q) ? [[p, q]] : [[p, Math.min(q, a)], [Math.max(p, b), q]].filter(([u, v]) => v - u > 0.5));
      for (const [p, q] of pieces) { ctx.moveTo(p, y); ctx.lineTo(q, y); }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (ground) { ctx.fillStyle = ground; ctx.fillRect(0, 0, W, H); }
      const ord = smooth(clamp(st.order)), den = clamp(st.density);
      const byLayer = [[], [], []];
      for (const r of rows) {
        const presence = clamp((den - r.rank) * 12 + (den >= 1 ? 1 : 0));
        if (presence <= 0) continue;
        byLayer[r.layer].push({ r, presence });
      }
      byLayer.forEach((list, li) => {
        const [col, alpha] = tone.layers[li]; const c = rgb(col);
        for (const { r, presence } of list) {
          const holes = o.clearings.map(cl => hole(cl, r.y)).filter(Boolean);
          ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${(alpha * presence * r.edge).toFixed(3)})`;
          ctx.lineWidth = o.lineW; ctx.beginPath();
          r.segs.forEach((s, j) => {
            if (s.keep < o.dropout * (1 - ord)) return;
            const nx = j < r.segs.length - 1 ? r.segs[j + 1].x0 : W + 20;
            const y = Math.round(r.y + s.dy * (1 - ord)) + 0.5, x1 = s.x1 + (nx - s.x1) * ord;
            strokeCut(s.x0, x1, y, holes);
          });
          ctx.stroke();
        }
      });
      if (sigRow && st.signal > 0) {
        const s = o.signal, x0 = s.x0 * W, x1 = s.x1 * W, e = smooth(clamp(st.signal));
        ctx.strokeStyle = o.signalColour || PAL.signal; ctx.lineWidth = o.signalW; ctx.beginPath();
        const y = Math.round(sigRow.y) + (o.signalW % 2 ? 0.5 : 0);
        ctx.moveTo(x0, y); ctx.lineTo(x0 + (x1 - x0) * e, y); ctx.stroke();
      }
    }

    const ro = new ResizeObserver(() => { const w = cv.clientWidth, h = cv.clientHeight; if (w && h && (w !== W || h !== H)) { build(); draw(); } });
    ro.observe(cv);
    build(); draw();
    return {
      st, o, draw, svg, rebuild: () => { build(); draw(); },
      set(p) { Object.assign(st, p); draw(); return this; },
      /* geometry helpers for overlays */
      rowY: f => { const ty = f * H; return rows.reduce((b, r) => (!b || Math.abs(r.y - ty) < Math.abs(b.y - ty) ? r : b), null)?.y; },
      signalShare: () => (o.signal ? ((o.signal.x1 - o.signal.x0) * W * o.signalW) / (W * H) : 0),
      destroy: () => ro.disconnect(),
    };
  }

  window.FIELD = { Field, PAL, TONES, LEAN, smooth, clamp, seeded };
})();
