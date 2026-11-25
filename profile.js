/* GORC profile page: loads the Markdown sections, the GORC v1.1 framework and the IST and SOLL
   assessments (SPII Principles Alignment Tool format), and draws the honeycomb of essential elements.
   Edit the texts in content/ and the scores in data/assessments/; this file only renders them. */
(function () {
  'use strict';

  var REPO = 'https://github.com/durf-project/gorc-profile';
  var SPII = 'https://surf-ori.github.io/spii-1b-principles-alignment-tool/';
  var SCENARIOS = { ist: 'IST, now', soll: 'SOLL, target 2030' };
  var STATUS = {
    good: { label: 'Largely in place', note: 'most categories compliant' },
    warn: { label: 'In progress', note: 'partly in place or making progress' },
    bad: { label: 'Not yet in place', note: 'most categories not compliant' },
    none: { label: 'Out of scope', note: 'not applicable or not assessed' }
  };
  var ANSWER = {
    'compliant': { s: 'c', label: 'Compliant' },
    'progress': { s: 'p', label: 'Making progress' },
    'non-compliant': { s: 'n', label: 'Not compliant' },
    'not-applicable': { s: 'na', label: 'Not applicable' }
  };

  // Honeycomb positions (column, row in half-hex steps) after the GORC-IG essential elements figure.
  // "interoperability" and "standards" share the centre cell, as in the figure.
  var LAYOUT = {
    'governance': [2, 0], 'rules': [1, 1], 'engagement': [3, 1], 'human-capacity': [0, 2],
    'sustainability': [4, 2], 'interoperability': [2, 2, 'top'], 'standards': [2, 2, 'bottom'],
    'ict': [1, 3], 'services': [3, 3], 'research-objects': [2, 4]
  };

  // Line icons on a 24 x 24 grid, drawn for this page.
  var ICONS = {
    'governance': 'M12 7.5v4M6 11.5h12M6 11.5v3M18 11.5v3M12 11.5v3M14.5 5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0M8.5 17a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0M14.5 17a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0M20.5 17a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0',
    'rules': 'M11 8a3 3 0 1 1-6 0a3 3 0 1 1 6 0M3 20c0-3 2.2-5 5-5s5 2 5 5M14 4h5l2 2v11h-7zM16 9h3M16 12h3',
    'engagement': 'M15 8a3 3 0 1 1-6 0a3 3 0 1 1 6 0M7 20c0-3 2.2-5 5-5s5 2 5 5M7 10a2 2 0 1 1-4 0a2 2 0 1 1 4 0M21 10a2 2 0 1 1-4 0a2 2 0 1 1 4 0M1.5 18c0-2 1.5-3.5 3.5-3.5M22.5 18c0-2-1.5-3.5-3.5-3.5',
    'human-capacity': 'M15 9a3 3 0 1 1-6 0a3 3 0 1 1 6 0M6.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4L6 18M18 6l1.4-1.4',
    'sustainability': 'M20 12a8 8 0 1 1-2.3-5.6M20 3.5v3.5h-3.5M14.5 9.6a3 3 0 1 0 0 4.8M8.5 11h4.5M8.5 13h4.5',
    'interoperability': 'M4 8h15M15 4l4 4-4 4M20 16H5M9 12l-4 4 4 4',
    'standards': 'M7 3h7l4 4v14H7zM14 3v4h4M10 11h5M10 14h5M10 17h3',
    'ict': 'M15 12a3 3 0 1 1-6 0a3 3 0 1 1 6 0M7 5a2 2 0 1 1-4 0a2 2 0 1 1 4 0M21 5a2 2 0 1 1-4 0a2 2 0 1 1 4 0M7 19a2 2 0 1 1-4 0a2 2 0 1 1 4 0M21 19a2 2 0 1 1-4 0a2 2 0 1 1 4 0M6.5 6.5l3.2 3.2M17.5 6.5l-3.2 3.2M6.5 17.5l3.2-3.2M17.5 17.5l-3.2-3.2',
    'services': 'M9 8l-4 4 4 4M15 8l4 4-4 4M13.5 5l-3 14',
    'research-objects': 'M4 4h3.5v16H4zM9.5 4H13v16H9.5zM15 5.2l3.3-.9 3.6 15.4-3.3.9z'
  };

  var root = document.documentElement;
  var content = document.getElementById('content');
  var hive = document.getElementById('gp-hive');
  var tip = document.getElementById('gp-tip');
  var data = { sections: [], elements: [], framework: null, reports: {} };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function getJSON(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error(url + ': ' + r.status); return r.json(); }); }
  function getText(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error(url + ': ' + r.status); return r.text(); }); }

  function parseFrontMatter(text) {
    var m = /^---\s*\n([\s\S]*?)\n---\s*\n?/.exec(text);
    var meta = {};
    if (!m) return { meta: meta, body: text };
    m[1].split('\n').forEach(function (line) {
      var i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).replace(/\s+#.*$/, '').trim();
    });
    return { meta: meta, body: text.slice(m[0].length) };
  }

  // :::ist ... ::: and :::soll ... ::: become blocks shown in one scenario only.
  function markdown(md) {
    md = md.replace(/^:::(ist|soll)[ \t]*\n([\s\S]*?)\n:::[ \t]*$/gm, function (_, sc, inner) {
      return '<div class="gp-only" data-only="' + sc + '">\n\n' + inner + '\n\n</div>';
    });
    return window.marked.parse(md);
  }

  function decorate(node) {
    node.querySelectorAll('a[href]').forEach(function (a) {
      if (/^https?:/.test(a.getAttribute('href')) && a.host !== location.host) { a.target = '_blank'; a.rel = 'noopener'; }
    });
    node.querySelectorAll('img').forEach(function (img) { img.decoding = 'async'; });
  }

  // ---- scores --------------------------------------------------------------------
  function score(element, scenario) {
    var answers = (data.reports[scenario].frameworks || {}).gorc || {};
    var t = { c: 0, p: 0, n: 0, na: 0, u: 0, items: [] };
    element.principles.forEach(function (p) {
      var a = answers[p.id] || {};
      var s = ANSWER[a.status] ? ANSWER[a.status].s : 'u';
      t[s]++;
      t.items.push({ principle: p, s: s, status: a.status, notes: a.notes || '' });
    });
    var graded = t.c + t.p + t.n;
    t.graded = graded;
    t.percent = graded ? Math.round(t.c / graded * 100) : null;   // as in the SPII tool: compliant / answered
    var avg = graded ? (t.c + t.p / 2) / graded : null;
    t.status = avg === null ? 'none' : avg >= 0.67 ? 'good' : avg >= 0.34 ? 'warn' : 'bad';
    return t;
  }

  function overall(scenario) {
    var c = 0, g = 0;
    data.elements.forEach(function (el) { var t = score(el, scenario); c += t.c; g += t.graded; });
    return g ? Math.round(c / g * 100) : 0;
  }

  function countsText(t) {
    var parts = [];
    if (t.c) parts.push(t.c + ' compliant');
    if (t.p) parts.push(t.p + ' making progress');
    if (t.n) parts.push(t.n + ' not compliant');
    if (t.na) parts.push(t.na + ' not applicable');
    return parts.join(' · ');
  }

  // ---- honeycomb -------------------------------------------------------------------
  var R = 100, H = Math.sqrt(3) * R, PAD = 12;
  function centre(col, row) { return [PAD + R + col * 1.5 * R, PAD + H / 2 + row * H / 2]; }
  function pts(list) { return list.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }
  function hexPoints(cx, cy, r) {
    var out = [];
    for (var i = 0; i < 6; i++) { var a = Math.PI / 3 * i; out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return out;
  }
  function halfPoints(cx, cy, r, half) {
    var h = Math.sqrt(3) * r / 2, g = 3, s = half === 'top' ? -1 : 1;
    return [[cx - r + g, cy + s * g], [cx - r / 2, cy + s * h], [cx + r / 2, cy + s * h], [cx + r - g, cy + s * g]];
  }
  function wrap(text, max) {
    var lines = [], line = '';
    text.split(/\s+/).forEach(function (w) {
      if (line && (line + ' ' + w).length > max) { lines.push(line); line = w; } else line = line ? line + ' ' + w : w;
    });
    if (line) lines.push(line);
    return lines;
  }
  function icon(id, x, y, size) {
    return '<path class="gp-hex__icon" transform="translate(' + x + ' ' + y + ') scale(' + size / 24 + ')" d="' + (ICONS[id] || '') + '" vector-effect="non-scaling-stroke" style="stroke-width:2.2"/>';
  }
  function dots(items, cx, y, step) {
    var x0 = cx - (items.length - 1) * step / 2;
    return items.map(function (it, i) {
      var fill = { c: 'var(--gp-good)', p: 'var(--gp-warn)', n: 'var(--gp-bad)', na: 'none', u: 'var(--gp-none)' }[it.s];
      return '<circle class="gp-dot" data-s="' + it.s + '" cx="' + (x0 + i * step).toFixed(1) + '" cy="' + y + '" r="4.2" style="fill:' + fill + '"/>';
    }).join('');
  }

  function drawHive(scenario) {
    var w = PAD * 2 + R * 2 + 4 * 1.5 * R, h = PAD * 2 + H * 3;
    var out = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Honeycomb of the ten GORC essential elements, coloured by status in the ' + SCENARIOS[scenario] + ' scenario">';
    data.elements.forEach(function (el) {
      var pos = LAYOUT[el.id];
      if (!pos) return;
      var c = centre(pos[0], pos[1]), cx = c[0], cy = c[1], t = score(el, scenario);
      var label = wrap(el.title, pos[2] ? 20 : 15);
      var shape, body = '';
      if (pos[2]) {
        shape = '<polygon class="gp-hex__shape" points="' + pts(halfPoints(cx, cy, R - 5, pos[2])) + '"/>';
        var top = pos[2] === 'top';
        body += icon(el.id, cx - 11, top ? cy - 78 : cy + 6, 22);
        var y0 = top ? cy - 40 - (label.length - 1) * 16 : cy + 42;
        label.forEach(function (l, i) { body += '<text class="gp-hex__label" x="' + cx + '" y="' + (y0 + i * 16) + '">' + esc(l) + '</text>'; });
        body += dots(t.items, cx, top ? cy - 18 : y0 + (label.length - 1) * 16 + 12, 9);
      } else {
        shape = '<polygon class="gp-hex__shape" points="' + pts(hexPoints(cx, cy, R - 5)) + '"/>';
        body += icon(el.id, cx - 17, cy - 66, 34);
        var top = cy + 2 - (label.length - 1) * 8;
        label.forEach(function (l, i) { body += '<text class="gp-hex__label" x="' + cx + '" y="' + (top + i * 17) + '">' + esc(l) + '</text>'; });
        body += dots(t.items, cx, cy + 44, 11);
        body += '<text class="gp-hex__score" x="' + cx + '" y="' + (cy + 66) + '">' + STATUS[t.status].label + '</text>';
      }
      out += '<a class="gp-hex" href="#' + esc(el.id) + '" data-id="' + esc(el.id) + '" data-status="' + t.status + '" aria-label="' +
        esc(el.title + ': ' + STATUS[t.status].label + (t.percent === null ? '' : ', ' + t.percent + '% compliant')) + '">' + shape + body + '</a>';
    });
    out += '<text class="gp-hive__credit" x="' + (w - PAD) + '" y="' + (h - 2) + '" text-anchor="end">After the GORC-IG essential elements, CC BY</text></svg>';
    hive.innerHTML = out;
  }

  function showTip(a) {
    var el = data.elements.filter(function (e) { return e.id === a.getAttribute('data-id'); })[0];
    if (!el) return;
    var sc = root.getAttribute('data-scenario');
    var now = score(el, 'ist'), target = score(el, 'soll'), cur = sc === 'ist' ? now : target;
    tip.setAttribute('data-status', cur.status);
    tip.innerHTML =
      '<h3>' + esc(el.title) + '</h3>' +
      '<p class="gp-tip__meta">Priority ' + esc(el.priority || '?') + (el.ostrom ? ' · Ostrom ' + esc(el.ostrom) : '') + '</p>' +
      '<p>' + esc(el.summary) + '</p>' +
      '<dl class="gp-tip__rows">' +
        '<dt>IST</dt><dd>' + STATUS[now.status].label + (now.graded ? ' (' + countsText(now) + ')' : '') + '</dd>' +
        '<dt>SOLL</dt><dd>' + STATUS[target.status].label + (target.graded ? ' (' + countsText(target) + ')' : '') + ' · draft</dd>' +
      '</dl>' +
      '<p>Click to read the section.</p>';
    tip.hidden = false;
    var box = hive.getBoundingClientRect(), r = a.getBoundingClientRect(), wrapBox = tip.parentElement.getBoundingClientRect();
    var left = r.left - wrapBox.left + r.width / 2 - tip.offsetWidth / 2;
    left = Math.max(0, Math.min(left, box.width - tip.offsetWidth));
    var top = r.bottom - wrapBox.top + 6;
    if (top + tip.offsetHeight > box.height + 40) top = r.top - wrapBox.top - tip.offsetHeight - 6;
    tip.style.left = left + 'px';
    tip.style.top = Math.max(0, top) + 'px';
  }
  function hideTip() { tip.hidden = true; }
  hive.addEventListener('pointerover', function (e) { var a = e.target.closest('.gp-hex'); if (a) showTip(a); });
  hive.addEventListener('pointerout', function (e) { var a = e.target.closest('.gp-hex'); if (a && !a.contains(e.relatedTarget)) hideTip(); });
  hive.addEventListener('focusin', function (e) { var a = e.target.closest('.gp-hex'); if (a) showTip(a); });
  hive.addEventListener('focusout', hideTip);
  hive.addEventListener('click', hideTip);

  function drawPanel(scenario) {
    var counts = { good: 0, warn: 0, bad: 0, none: 0 };
    data.elements.forEach(function (el) { counts[score(el, scenario).status]++; });
    document.getElementById('gp-legend').innerHTML = ['good', 'warn', 'bad', 'none'].map(function (k) {
      return '<li data-status="' + k + '"><i></i><b>' + counts[k] + '</b> ' + STATUS[k].label + ' <small>(' + STATUS[k].note + ')</small></li>';
    }).join('');
    var all = { c: 0, p: 0, n: 0, na: 0 };
    data.elements.forEach(function (el) { var t = score(el, scenario); all.c += t.c; all.p += t.p; all.n += t.n; all.na += t.na; });
    document.getElementById('gp-score').innerHTML = overall(scenario) + '% compliant<small>SPII score over ' + (all.c + all.p + all.n) + ' assessed GORC categories: ' + esc(countsText(all)) + '</small>';
    document.getElementById('gp-list').innerHTML = data.elements.map(function (el) {
      var t = score(el, scenario);
      return '<li data-status="' + t.status + '"><a href="#' + esc(el.id) + '"><i></i>' + esc(el.title) + '<small>' + STATUS[t.status].label + '</small></a></li>';
    }).join('');
    var json = new URL('data/assessments/' + scenario + '.json', location.href).href;
    document.getElementById('gp-open-tool').href = SPII + '?report=' + encodeURIComponent(json) + '#gorc';
    var dl = document.getElementById('gp-json');
    dl.href = 'data/assessments/' + scenario + '.json';
    dl.setAttribute('download', 'gorc-profile-durf-' + scenario + '.json');
    dl.textContent = 'Download the ' + scenario.toUpperCase() + ' JSON';
  }

  // ---- sections ------------------------------------------------------------------
  function statusIcon(s) {
    var d = { c: 'M5 12.5l4.5 4.5L19 7.5', p: 'M12 7v5l3 2', n: 'M7 7l10 10M17 7L7 17', na: 'M7 12h10', u: '' }[s];
    var ring = s === 'p' || s === 'na' || s === 'u' ? '<circle cx="12" cy="12" r="9"/>' : '';
    return '<svg class="gp-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ring + '<path d="' + d + '"/></svg>';
  }

  function assessmentHtml(el, scenario) {
    var t = score(el, scenario);
    return '<details class="gp-assessment" data-only="' + scenario + '"><summary>Assessment of the GORC categories, ' + SCENARIOS[scenario] +
      ' <small>' + esc(countsText(t)) + '</small></summary><ol>' +
      t.items.map(function (it) {
        var label = ANSWER[it.status] ? ANSWER[it.status].label : 'Not assessed';
        return '<li data-s="' + it.s + '">' + statusIcon(it.s) + '<div><strong>' + esc(it.principle.title) + '</strong><span class="gp-st">' + label + '</span>' +
          (it.notes ? '<p>' + esc(it.notes) + '</p>' : '') + '</div></li>';
      }).join('') + '</ol></details>';
  }

  function elementHead(el) {
    var chips = ['ist', 'soll'].map(function (sc) {
      var t = score(el, sc);
      return '<span class="gp-chip" data-only="' + sc + '" data-status="' + t.status + '">' + STATUS[t.status].label + (t.percent === null ? '' : ' · ' + t.percent + '% compliant') + '</span>';
    }).join('');
    var hexSvg = ['ist', 'soll'].map(function (sc) {
      return '<svg class="gp-element__hex" data-only="' + sc + '" data-status="' + score(el, sc).status + '" viewBox="-52 -46 104 92" aria-hidden="true"><polygon points="' + pts(hexPoints(0, 0, 48)) + '"/><path transform="translate(-20 -20) scale(1.6667)" d="' + ICONS[el.id] + '" vector-effect="non-scaling-stroke" style="stroke-width:2"/></svg>';
    }).join('');
    return '<div class="gp-element__head">' + hexSvg + '<div><p class="gp-eyebrow">GORC essential element</p><h2>' + esc(el.title) + '</h2></div></div>' +
      '<p class="gp-element__meta">' + chips + '<span class="gp-chip">Priority ' + esc(el.priority || '?') + '</span>' +
      (el.ostrom ? '<span class="gp-chip">Ostrom ' + esc(el.ostrom) + '</span>' : '') + '</p>';
  }

  function renderContent() {
    content.innerHTML = '';
    data.sections.forEach(function (sec) {
      var node = document.createElement('section');
      node.className = 'gp-section' + (sec.element ? ' gp-element' : '');
      node.id = sec.meta.id || sec.file.replace(/^.*\/|\.md$/g, '');
      var html = '';
      if (sec.element) html += elementHead(sec.element);
      html += markdown(sec.body);
      if (sec.element) html += assessmentHtml(sec.element, 'ist') + assessmentHtml(sec.element, 'soll');
      html += '<p class="gp-edit"><a href="' + REPO + '/edit/main/content/' + esc(sec.file) + '" target="_blank" rel="noopener">Edit this section</a></p>';
      node.innerHTML = html;
      decorate(node);
      content.appendChild(node);
    });
  }

  // ---- table of contents ------------------------------------------------------------
  var tocToggle = document.querySelector('[data-toc-toggle]');
  var tocAside = document.getElementById('durf-toc');
  var tocBackdrop = document.querySelector('.durf-toc-backdrop');
  var tocList = document.getElementById('durf-toc-list');
  var tocLinks = [];
  function setTocOpen(open) {
    document.body.toggleAttribute('data-toc-open', open);
    tocToggle.setAttribute('aria-expanded', String(open));
    tocBackdrop.hidden = !open;
    if (open) { var a = tocList.querySelector('[aria-current="true"]') || tocList.querySelector('a'); if (a) a.focus({ preventScroll: true }); }
    else if (tocAside.contains(document.activeElement)) tocToggle.focus();
  }
  tocToggle.addEventListener('click', function () { setTocOpen(true); });
  tocAside.querySelector('.durf-toc-close').addEventListener('click', function () { setTocOpen(false); });
  tocBackdrop.addEventListener('click', function () { setTocOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.hasAttribute('data-toc-open')) setTocOpen(false); });
  tocList.addEventListener('click', function (e) { if (e.target.closest('a') && !matchMedia('(min-width: 75rem)').matches) setTocOpen(false); });

  function buildToc(scenario) {
    tocLinks = [];
    var html = '<li><a href="#overview">The essential elements</a></li>', group = false;
    data.sections.forEach(function (sec) {
      var id = sec.meta.id, label = sec.element ? sec.element.title : (sec.meta.nav || id);
      if (sec.element && !group) { html += '<li><span>Essential elements</span><ol>'; group = true; }
      if (!sec.element && group) { html += '</ol></li>'; group = false; }
      var dot = sec.element ? '<span class="durf-toc-dot" data-status="' + score(sec.element, scenario).status + '"></span>' : '';
      html += '<li><a href="#' + esc(id) + '">' + dot + esc(label) + '</a></li>';
    });
    if (group) html += '</ol></li>';
    tocList.innerHTML = html;
    tocList.querySelectorAll('a').forEach(function (a) {
      var h = document.getElementById(a.getAttribute('href').slice(1));
      if (h) tocLinks.push({ link: a, target: h });
    });
    markCurrent();
  }
  function markCurrent() {
    var current = null;
    var line = (parseFloat(getComputedStyle(root).getPropertyValue('--topbar-h')) || 3.25) * 16 + 120;
    tocLinks.forEach(function (t) { if (t.target.getBoundingClientRect().top <= line) current = t; });
    tocLinks.forEach(function (t) { if (t === current) t.link.setAttribute('aria-current', 'true'); else t.link.removeAttribute('aria-current'); });
  }
  var ticking = false;
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { markCurrent(); ticking = false; }); } }, { passive: true });

  // ---- scenario switch ---------------------------------------------------------------
  function setScenario(scenario, push) {
    if (!SCENARIOS[scenario]) scenario = 'ist';
    root.setAttribute('data-scenario', scenario);
    document.querySelectorAll('[data-set-scenario]').forEach(function (b) {
      b.setAttribute('aria-checked', String(b.getAttribute('data-set-scenario') === scenario));
    });
    if (push) {
      var u = new URL(location.href);
      if (scenario === 'ist') u.searchParams.delete('scenario'); else u.searchParams.set('scenario', scenario);
      history.replaceState(null, '', u);
    }
    if (data.framework) { drawHive(scenario); drawPanel(scenario); buildToc(scenario); }
  }
  document.querySelectorAll('[data-set-scenario]').forEach(function (b) {
    b.addEventListener('click', function () { setScenario(b.getAttribute('data-set-scenario'), true); });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        var next = b.getAttribute('data-set-scenario') === 'ist' ? 'soll' : 'ist';
        setScenario(next, true);
        document.querySelector('[data-set-scenario="' + next + '"]').focus();
      }
    });
  });
  setScenario(new URLSearchParams(location.search).get('scenario') || 'ist', false);

  // ---- boot --------------------------------------------------------------------------
  function boot() {
    Promise.all([
      getJSON('content/sections.json'),
      getJSON('data/gorc-v1.1.json'),
      getJSON('data/assessments/ist.json'),
      getJSON('data/assessments/soll.json')
    ]).then(function (r) {
      data.framework = r[1];
      data.reports = { ist: r[2], soll: r[3] };
      var files = Array.isArray(r[0]) ? r[0] : r[0].sections;
      return Promise.all(files.map(function (f) { return getText('content/' + f); })).then(function (texts) {
        texts.forEach(function (text, i) {
          var fm = parseFrontMatter(text), sec = { file: files[i], meta: fm.meta, body: fm.body };
          if (fm.meta.element) {
            var fs = data.framework.sections.filter(function (s) { return s.section === fm.meta.element; })[0];
            sec.element = {
              id: fm.meta.id, title: fm.meta.title || fm.meta.element, priority: fm.meta.priority,
              ostrom: fm.meta.ostrom, summary: fm.meta.summary || '', principles: fs ? fs.principles : []
            };
            data.elements.push(sec.element);
          }
          data.sections.push(sec);
        });
      });
    }).then(function () {
      renderContent();
      setScenario(root.getAttribute('data-scenario'), false);
      if (location.hash) {
        var go = function () { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); };
        go();
        Promise.all([].map.call(content.querySelectorAll('img'), function (img) { return img.decode().catch(function () {}); })).then(go);
      }
    }).catch(function (err) {
      hive.innerHTML = '';
      content.innerHTML = '<div role="alert" data-variant="error"><p><strong>The profile could not be loaded.</strong> Open this page through a web server (for example <code>python3 -m http.server</code>), not as a file.</p><p><code>' + esc(err.message) + '</code></p></div>';
    });
  }
  if (window.marked) boot(); else addEventListener('DOMContentLoaded', boot);
})();
