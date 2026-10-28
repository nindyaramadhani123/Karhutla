(function () {
  var root = document.documentElement;
  root.classList.add('js');

  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function $(id) { return document.getElementById(id); }

  /* ---------- Hutan ---------- */
  function forest(opts) {
    var r = rng(opts.seed), W = 1600, H = 500, out = '', x = opts.start;
    while (x < W + 40) {
      var h = opts.hMin + r() * (opts.hMax - opts.hMin);
      var w = h * (0.42 + r() * 0.3);
      var hot = opts.hot && x > opts.hot;
      out += '<g class="t' + (hot ? ' hot' : '') + '">';
      if (r() > 0.5) {
        out += '<rect x="' + (x - 4) + '" y="' + (H - h * 0.78) + '" width="8" height="' + (h * 0.78) + '" fill="' + opts.trunk + '"/>';
        out += '<ellipse class="c" cx="' + x + '" cy="' + (H - h * 0.84) + '" rx="' + (w * 0.8) + '" ry="' + (h * 0.15) + '"/>';
        out += '<ellipse class="c" cx="' + (x - w * 0.34) + '" cy="' + (H - h * 0.7) + '" rx="' + (w * 0.42) + '" ry="' + (h * 0.1) + '"/>';
        out += '<ellipse class="c" cx="' + (x + w * 0.36) + '" cy="' + (H - h * 0.72) + '" rx="' + (w * 0.4) + '" ry="' + (h * 0.09) + '"/>';
      } else {
        out += '<rect x="' + (x - 5) + '" y="' + (H - h * 0.55) + '" width="10" height="' + (h * 0.55) + '" fill="' + opts.trunk + '"/>';
        out += '<circle class="c" cx="' + x + '" cy="' + (H - h * 0.74) + '" r="' + (w * 0.44) + '"/>';
        out += '<circle class="c" cx="' + (x - w * 0.32) + '" cy="' + (H - h * 0.56) + '" r="' + (w * 0.36) + '"/>';
        out += '<circle class="c" cx="' + (x + w * 0.32) + '" cy="' + (H - h * 0.58) + '" r="' + (w * 0.38) + '"/>';
      }
      out += '</g>';
      x += opts.gap[0] + r() * (opts.gap[1] - opts.gap[0]);
    }
    return '<div class="layer ' + opts.cls + '"><svg viewBox="0 0 1600 500" preserveAspectRatio="xMidYMax slice" style="--cf:' + opts.fill + '">' + out + '</svg></div>';
  }
  var trees = $('trees');
  if (trees) {
    trees.innerHTML =
      forest({ cls: 'far', seed: 7, start: -20, gap: [26, 52], hMin: 120, hMax: 210, fill: '#1c4a2f', trunk: '#143a25' }) +
      forest({ cls: 'mid', seed: 21, start: -40, gap: [40, 84], hMin: 170, hMax: 320, fill: '#103423', trunk: '#0b2417', hot: 1020 });
  }

  /* ---------- Api ---------- */
  var flameSVG = '<svg viewBox="0 0 60 100"><path d="M30 0C32 18 52 30 52 62c0 22-10 36-22 36S8 84 8 62c0-18 10-22 14-38 4 6 6-10 8-24Z" fill="url(#fg)"/><path d="M30 40c2 14 14 22 14 36 0 14-6 22-14 22S16 90 16 76c0-12 8-16 10-26 2 4 3-4 4-10Z" fill="url(#fg2)"/></svg>';
  var fl = $('flames');
  if (fl) {
    var r2 = rng(5), html = '', n = 15;
    for (var i = 0; i < n; i++) {
      var left = 44 + (i / (n - 1)) * 54 + (r2() * 3 - 1.5);
      var w = 54 + r2() * 70 + (i / n) * 30;
      html += '<div class="flame" style="--x:' + left.toFixed(1) + '%;--w:' + w.toFixed(0) + 'px;--b:' + (r2() * 26).toFixed(0) + 'px;--d:' + (0.45 + r2() * 0.5).toFixed(2) + 's;--dl:-' + (r2() * 0.8).toFixed(2) + 's;--od:' + (i * 0.1).toFixed(2) + 's">' + flameSVG + '</div>';
    }
    fl.innerHTML = html;
  }
  var em = $('embers');
  if (em) {
    var r3 = rng(11), eh = '';
    for (var j = 0; j < 22; j++) {
      eh += '<i style="--x:' + (46 + r3() * 52).toFixed(1) + '%;--s:' + (3 + r3() * 4).toFixed(1) + 'px;--t:' + (3 + r3() * 4).toFixed(1) + 's;--dl:-' + (r3() * 6).toFixed(1) + 's;--dx:' + (r3() * 160 - 100).toFixed(0) + 'px"></i>';
    }
    em.innerHTML = eh;
  }

  /* ---------- Hujan ---------- */
  var rain = $('rain');
  if (rain) {
    var r4 = rng(3), rh = '';
    for (var k = 0; k < 90; k++) {
      rh += '<i style="--x:' + (r4() * 100).toFixed(1) + '%;--h:' + (16 + r4() * 22).toFixed(0) + 'px;--t:' + (0.7 + r4() * 0.6).toFixed(2) + 's;--dl:-' + (r4() * 2).toFixed(2) + 's"></i>';
    }
    rain.innerHTML = rh;
  }

  /* ---------- Hewan ---------- */
  var A = {
    gajah:
      '<svg viewBox="0 0 170 120"><g class="bob">' +
      '<g class="leg a"><rect x="50" y="72" width="15" height="42" rx="6" fill="#7b8884"/></g>' +
      '<g class="leg b"><rect x="68" y="72" width="15" height="42" rx="6" fill="#65726f"/></g>' +
      '<g class="leg a"><rect x="108" y="72" width="15" height="42" rx="6" fill="#65726f"/></g>' +
      '<g class="leg b"><rect x="126" y="72" width="15" height="42" rx="6" fill="#7b8884"/></g>' +
      '<path d="M143 50Q156 62 151 82" stroke="#65726f" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="92" cy="56" rx="52" ry="34" fill="#8a9692"/>' +
      '<circle cx="40" cy="52" r="26" fill="#8a9692"/>' +
      '<ellipse cx="60" cy="50" rx="14" ry="22" fill="#75827e"/>' +
      '<path d="M22 62C6 70 8 96 14 108L27 108C22 94 25 80 37 72Z" fill="#8a9692"/>' +
      '<path d="M30 76Q19 84 23 94" stroke="#f1ead2" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<circle cx="33" cy="46" r="2.600" fill="#0b1a10"/></g></svg>',
    harimau:
      '<svg viewBox="0 0 160 90"><g class="bob">' +
      '<g class="leg a"><rect x="44" y="50" width="9" height="34" rx="4" fill="#c96d18"/></g>' +
      '<g class="leg b"><rect x="58" y="50" width="9" height="34" rx="4" fill="#e7862a"/></g>' +
      '<g class="leg a"><rect x="106" y="50" width="9" height="34" rx="4" fill="#e7862a"/></g>' +
      '<g class="leg b"><rect x="120" y="50" width="9" height="34" rx="4" fill="#c96d18"/></g>' +
      '<path d="M128 36Q152 34 148 14" stroke="#e7862a" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M143 26l6 -2" stroke="#1a1208" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="84" cy="42" rx="46" ry="20" fill="#e7862a"/>' +
      '<circle cx="34" cy="34" r="16" fill="#e7862a"/>' +
      '<circle cx="24" cy="21" r="5.500" fill="#e7862a"/><circle cx="43" cy="20" r="5.500" fill="#e7862a"/>' +
      '<ellipse cx="24" cy="40" rx="8" ry="6" fill="#f6dfc0"/><circle cx="19" cy="38" r="2" fill="#3a1d10"/>' +
      '<circle cx="30" cy="31" r="2" fill="#111"/>' +
      '<g stroke="#1a1208" stroke-width="3.500" stroke-linecap="round" fill="none"><path d="M62 24L66 40"/><path d="M74 23L78 42"/><path d="M86 22L90 43"/><path d="M98 23L102 42"/><path d="M110 25L113 40"/><path d="M33 20L35 26"/><path d="M41 22L40 27"/></g></g></svg>',
    rusa:
      '<svg viewBox="0 -12 130 112"><g class="bob">' +
      '<g class="leg a"><rect x="36" y="46" width="5" height="40" rx="2.500" fill="#7d4f26"/></g>' +
      '<g class="leg b"><rect x="47" y="46" width="5" height="40" rx="2.500" fill="#96602f"/></g>' +
      '<g class="leg a"><rect x="88" y="46" width="5" height="40" rx="2.500" fill="#96602f"/></g>' +
      '<g class="leg b"><rect x="99" y="46" width="5" height="40" rx="2.500" fill="#7d4f26"/></g>' +
      '<ellipse cx="68" cy="44" rx="36" ry="15" fill="#a8703c"/>' +
      '<ellipse cx="106" cy="38" rx="4" ry="7" fill="#f4ecd8"/>' +
      '<path d="M38 40L27 18L38 14L52 36Z" fill="#a8703c"/>' +
      '<ellipse cx="27" cy="15" rx="12" ry="7" transform="rotate(-18 27 15)" fill="#a8703c"/>' +
      '<circle cx="21" cy="14" r="1.800" fill="#1a1208"/>' +
      '<path d="M36 9L33 -3M33 0L26 -9M33 0L40 -8M40 11L43 0" stroke="#e9ddc0" stroke-width="2.500" fill="none" stroke-linecap="round"/>' +
      '<g fill="#f0e2c0" opacity=".8"><circle cx="58" cy="40" r="2"/><circle cx="72" cy="36" r="2"/><circle cx="84" cy="42" r="2"/><circle cx="66" cy="49" r="1.800"/><circle cx="92" cy="36" r="1.800"/></g></g></svg>',
    orangutan:
      '<svg viewBox="0 0 130 100"><g class="bob">' +
      '<g class="leg a"><rect x="98" y="54" width="11" height="30" rx="5" fill="#a9440f"/></g>' +
      '<g class="leg b"><rect x="110" y="54" width="11" height="30" rx="5" fill="#c8561b"/></g>' +
      '<ellipse cx="80" cy="46" rx="34" ry="24" fill="#c8561b"/>' +
      '<circle cx="58" cy="36" r="17" fill="#c8561b"/>' +
      '<g stroke="#e58a3c" stroke-width="3" stroke-linecap="round" fill="none"><path d="M70 60l-2 10"/><path d="M82 64l-1 9"/><path d="M94 62l0 9"/><path d="M104 56l1 8"/></g>' +
      '<circle cx="30" cy="38" r="19" fill="#c8561b"/>' +
      '<ellipse cx="25" cy="42" rx="10.500" ry="11.500" fill="#5b3a28"/>' +
      '<circle cx="21" cy="39" r="1.900" fill="#f3e6d6"/><circle cx="29" cy="39" r="1.900" fill="#f3e6d6"/>' +
      '<path d="M21 48Q25 51 29 48" stroke="#2a170d" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<g class="leg b"><rect x="42" y="38" width="10" height="48" rx="5" fill="#a9440f"/><circle cx="47" cy="87" r="6.500" fill="#a9440f"/></g>' +
      '<g class="leg a"><rect x="58" y="38" width="10" height="48" rx="5" fill="#d8672a"/><circle cx="63" cy="87" r="6.500" fill="#d8672a"/></g>' +
      '</g></svg>'
  };

  var herd = $('herd');
  var order = [
    { t: 'orangutan', dur: 36, dl: 0, p: 86 },
    { t: 'rusa', dur: 36, dl: -6, p: 70 },
    { t: 'harimau', dur: 36, dl: -12, p: 54 },
    { t: 'gajah', dur: 36, dl: -18, p: 36 },
    { t: 'rusa', dur: 36, dl: -24, p: 20 },
    { t: 'orangutan', dur: 36, dl: -30, p: 8 }
  ];
  function fillHerd(el, list) {
    if (!el) return;
    el.innerHTML = list.map(function (a) {
      return '<div class="animal" data-t="' + a.t + '" style="--dur:' + a.dur + 's;--dl:' + a.dl + 's;--p:' + a.p + '">' + A[a.t] + '</div>';
    }).join('');
  }
  fillHerd(herd, order);
  fillHerd($('herd-calm'), [
    { t: 'gajah', dur: 48, dl: -6, p: 70 },
    { t: 'orangutan', dur: 48, dl: -18, p: 52 },
    { t: 'harimau', dur: 48, dl: -30, p: 32 },
    { t: 'rusa', dur: 48, dl: -42, p: 14 }
  ]);

  /* burung */
  var birds = $('birds');
  if (birds) {
    var bsvg = '<svg viewBox="0 0 40 20"><g class="wing"><path d="M20 10Q10 -2 0 6Q10 6 20 10Z"/><path d="M20 10Q30 -2 40 6Q30 6 20 10Z"/></g></svg>';
    birds.innerHTML = [
      { y: '12%', dur: 22, dl: -3, p: 70 },
      { y: '20%', dur: 28, dl: -14, p: 50 },
      { y: '9%', dur: 26, dl: -20, p: 30 }
    ].map(function (b) {
      return '<div class="bird" style="--y:' + b.y + ';--dur:' + b.dur + 's;--dl:' + b.dl + 's;--p:' + b.p + '">' + bsvg + '</div>';
    }).join('');
  }

  /* ---------- Simulasi hujan ---------- */
  var hero = $('hero'), btn = $('rain-btn'), note = $('sim-note');
  var statusEl = hero ? hero.querySelector('.status') : null;
  if (btn && hero) {
    btn.addEventListener('click', function () {
      var out = hero.classList.toggle('out');
      btn.setAttribute('aria-pressed', out ? 'true' : 'false');
      btn.textContent = out ? 'Kembali ke kondisi api' : 'Turunkan hujan';
      note.textContent = out
        ? 'Gambut yang basah sulit terbakar. Itulah kenapa sekat kanal dan pembasahan gambut jadi kunci pencegahan, jauh sebelum api muncul.'
        : '';
      if (statusEl) {
        statusEl.lastChild.textContent = out
          ? 'Simulasi: hujan memadamkan api, hutan selamat'
          : 'Siaga darurat karhutla masih berlaku di sejumlah provinsi';
      }
    });
  }

  /* ---------- Muncul saat digulir, hitung angka, bar ---------- */
  var nf = {};
  function fmt(v, dec) {
    var key = 'd' + dec;
    nf[key] = nf[key] || new Intl.NumberFormat('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    return nf[key].format(v);
  }
  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-to')), dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(to, dec); return; }
    var t0 = null, dur = 1700;
    function tick(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * e, dec);
      if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(to, dec);
    }
    requestAnimationFrame(tick);
  }

  var targets = document.querySelectorAll('.rv, .bar, .gap, .chips');
  function reveal(el) {
    el.classList.add('in');
    Array.prototype.forEach.call(el.querySelectorAll('.count'), countUp);
    if (el.classList.contains('rv')) setTimeout(function () { el.classList.add('done'); }, 1500);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.18 });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(targets, reveal);
  }

  /* ---------- Pohon komitmen ---------- */
  var boxes = document.querySelectorAll('#pledges input');
  var leaves = document.querySelectorAll('.tree-card .leaf');
  var tt = $('tree-title'), tx = $('tree-text');
  function updateTree() {
    var n = 0;
    Array.prototype.forEach.call(boxes, function (b, i) {
      if (b.checked) n++;
    });
    Array.prototype.forEach.call(leaves, function (lf, i) { lf.classList.toggle('on', i < n); });
    if (n === 0) { tt.textContent = 'Belum ada langkah dipilih'; tx.textContent = 'Mulailah dari satu langkah kecil.'; }
    else if (n < 6) { tt.textContent = n + ' dari 6 langkah'; tx.textContent = 'Pohonmu mulai tumbuh. Tambah satu langkah lagi?'; }
    else { tt.textContent = 'Pohonmu rimbun'; tx.textContent = 'Kamu siap menjadi penjaga rimba. Ajak satu temanmu hari ini.'; }
  }
  Array.prototype.forEach.call(boxes, function (b) { b.addEventListener('change', updateTree); });
  updateTree();
})();
