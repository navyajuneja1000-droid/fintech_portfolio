/* =========================================================
   Navya Juneja · payments console portfolio · app
   Vanilla JS, hash routing, no build step.
   ========================================================= */
(function () {
  "use strict";
  var D = window.NJ;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function load(k, d) { try { var v = localStorage.getItem("njp_" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem("njp_" + k, JSON.stringify(v)); } catch (e) {} }
  function host(u) { return u.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]; }
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- icons (drawn for this site) ---------- */
  function ic(d, extra) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || "") + ">" + d + "</svg>"; }
  var I = {
    home: ic('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'),
    bank: ic('<path d="M3 9l9-5 9 5"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8"/><path d="M3 20h18"/>'),
    list: ic('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h10M7 17h6"/>'),
    flow: ic('<circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 12h3M14 12h3"/>'),
    sliders: ic('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
    target: ic('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>'),
    book: ic('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>'),
    send: ic('<path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/>'),
    search: ic('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
    sun: ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: ic('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'),
    x: ic('<path d="M6 6l12 12M18 6L6 18"/>'),
    back: ic('<path d="M15 6l-6 6 6 6"/>'),
    next: ic('<path d="M9 6l6 6-6 6"/>'),
    ext: ic('<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
    file: ic('<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>'),
    info: ic('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),
    check: ic('<path d="M5 12l4 4 10-10"/>'),
    dot: ic('<circle cx="12" cy="12" r="3"/>'),
    copy: ic('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'),
    live: ic('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 12l3-3 2 2 4-4"/>'),
    calc: ic('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 18h2M12 18h4"/>'),
    menu: ic('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    user: ic('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
    mail: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
    phone: ic('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>')
  };
  function mark(sz) {
    return '<svg class="mk" viewBox="0 0 64 64" width="' + (sz || 32) + '" height="' + (sz || 32) + '" aria-hidden="true"><rect width="64" height="64" rx="16" fill="var(--accent)"/><path d="M19 45V19l26 26V19" fill="none" stroke="var(--accent-ink)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="45" cy="19" r="5" fill="var(--accent-ink)"/></svg>';
  }

  /* ---------- state ---------- */
  var S = {
    fit: "generic",
    txf: "all",
    sim: load("sim", null)
  };
  /* Visitors see only the company in their link. The switcher, company tabs and share button
     appear only in the private preview: add &edit (or ?edit) to the link. */
  var EDIT = /[?&]edit(=|&|$)/i.test(location.search) || /[?&]edit(=|&|$)/i.test(location.hash);
  function readFit() {
    var q = (location.search.match(/[?&]for=([a-z]+)/i) || [])[1] || (location.hash.match(/[?&]for=([a-z]+)/i) || [])[1];
    if (q && D.fits[q.toLowerCase()]) return q.toLowerCase();
    if (!EDIT) return "generic";
    var s = load("fit", "generic");
    return D.fits[s] ? s : "generic";
  }
  function setFit(id, silent) {
    if (!D.fits[id]) id = "generic";
    if (!EDIT && S.locked && id !== S.fit) return;
    S.fit = id; if (EDIT) save("fit", id);
    try {
      var qs = [id === "generic" ? "" : "for=" + id, EDIT ? "edit" : ""].filter(Boolean).join("&");
      var url = location.pathname + (qs ? "?" + qs : "") + location.hash.replace(/[?&]for=[a-z]+/i, "");
      history.replaceState(null, "", url);
    } catch (e) {}
    $$(".fitsel select").forEach(function (s) { s.value = id; });
    if (!silent) { rerender(); toast("Preview: tailored for " + (id === "generic" ? "any team" : D.fits[id].name)); }
  }
  function fit() { return D.fits[S.fit]; }

  /* ---------- helpers ---------- */
  var CASE = {}; D.cases.forEach(function (c) { CASE[c.id] = c; });
  var STAGE = {}; D.stages.forEach(function (s) { STAGE[s.id] = s; });
  function chip(p, withStatus) {
    var m = D.prov[p]; if (!m) return "";
    return '<span class="chip ' + p + '" title="' + esc(m.label + ": " + m.tip) + '">' + (withStatus ? esc(m.status) + " <small>· " + esc(m.label) + "</small>" : esc(m.label)) + "</span>";
  }
  function statusChip(p) { return chip(p, true); }
  function seller(c) { return D.sellers[c.seller]; }
  function caseLink(id, cls) { var c = CASE[id]; return c ? '<a class="' + (cls || "tag") + '" href="#/case/' + id + '">' + esc(c.short) + "</a>" : ""; }
  function inr(n, dp) { return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: dp || 0, maximumFractionDigits: dp || 0 }); }
  function money(cr) { // input in crore
    var a = Math.abs(cr), s = cr < 0 ? "−" : "";
    if (a >= 1) return s + "₹" + a.toLocaleString("en-IN", { maximumFractionDigits: a >= 100 ? 0 : 2 }) + " Cr";
    if (a * 100 >= 1) return s + "₹" + (a * 100).toLocaleString("en-IN", { maximumFractionDigits: 1 }) + " L";
    return s + inr(a * 1e7);
  }
  function lakh(l) { return money(l / 100); }
  function spark(arr) {
    var w = 120, h = 30, max = Math.max.apply(null, arr), min = Math.min.apply(null, arr), n = arr.length;
    var pts = arr.map(function (v, i) { return [i / (n - 1) * w, h - 3 - (v - min) / (max - min || 1) * (h - 6)]; });
    var d = pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" ");
    return '<svg class="spark" viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="none" aria-hidden="true"><path d="' + d + ' L' + w + " " + h + " L0 " + h + 'Z" fill="currentColor" opacity=".10"/><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
  }
  function srcLink(u, label) { return '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(label || host(u)) + "</a>"; }
  function panelHead(h, p, right) { return '<div class="ph"><div><h2>' + h + "</h2>" + (p ? "<p>" + p + "</p>" : "") + "</div>" + (right || "") + "</div>"; }
  function noteData() { return '<p class="note">' + I.info + "<span>PhonePe figures are as stated on my CV. No PhonePe internal data is shown.</span></p>"; }

  /* ---------- shell ---------- */
  var NAV = [
    { sec: "Console" },
    { h: "#/", t: "Overview", i: "home", r: "home" },
    { h: "#/phonepe", t: "PhonePe", i: "bank", r: "phonepe" },
    { h: "#/cases", t: "Transactions", i: "list", r: "cases" },
    { h: "#/lifecycle", t: "Payment lifecycle", i: "flow", r: "lifecycle" },
    { h: "#/fit", t: "Company fit", i: "target", r: "fit" },
    { sec: "Live builds" },
    { h: "https://www.reconos.in", t: "ReconOS", i: "live", ext: true, s: "Revenue recovery for D2C" },
    { h: "https://workflowmidprocurement.vercel.app/", t: "MID Procurement", i: "live", ext: true, s: "Acquirer onboarding tracker" },
    { h: "https://route-wise-ai-51.lovable.app", t: "RouteIQ prototype", i: "live", ext: true, s: "Dynamic routing PRD, built" },
    { sec: "Try it here" },
    { h: "#/simulator", t: "Routing simulator", i: "sliders", r: "simulator" },
    { h: "#/simulator/settlement", t: "Settlement calculator", i: "calc", r: "settlement" },
    { sec: "Account" },
    { h: "#/experience", t: "Experience ledger", i: "book", r: "experience" },
    { h: "#/hire", t: "Settlement report", i: "send", r: "hire" }
  ];
  function navLink(n) {
    if (n.ext) return '<li><a href="' + n.h + '" target="_blank" rel="noopener" title="' + esc(n.s) + ' (opens in a new tab)">' + I[n.i] + '<span>' + n.t + '<small class="nsub">' + esc(n.s) + '</small></span><i class="xi" aria-hidden="true">' + I.ext + '</i><span class="vh"> (opens in a new tab)</span></a></li>';
    return '<li><a href="' + n.h + '" data-r="' + n.r + '">' + I[n.i] + "<span>" + n.t + "</span></a></li>";
  }
  function fitSelect(id) {
    if (!EDIT) return "";
    return '<div class="fitsel"><label for="' + id + '">Tailored for</label><select id="' + id + '" data-act="fit" aria-label="Tailor this portfolio for a company">' +
      D.fitOrder.map(function (k) { return '<option value="' + k + '"' + (k === S.fit ? " selected" : "") + ">" + esc(k === "generic" ? "General" : D.fits[k].short) + "</option>"; }).join("") + "</select></div>";
  }
  function themeIcon() { return document.documentElement.getAttribute("data-theme") === "dark" || (!document.documentElement.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches) ? I.sun : I.moon; }
  function renderShell() {
    var P = D.person;
    $("#side").innerHTML =
      '<a class="brand" href="#/" aria-label="Navya Juneja, payments console: overview">' + mark(34) + '<span class="bw"><b>Navya Juneja</b><small>Payments console</small></span></a>' +
      '<div class="acct"><img src="assets/portrait.jpg" alt="Portrait of Navya Juneja"><div><b>Open to work</b><small><span class="live-dot"></span>Payments · Gurgaon</small></div></div>' +
      '<ul class="snav">' + NAV.map(function (n) {
        if (n.sec) return '<li class="sec">' + n.sec + "</li>";
        return navLink(n);
      }).join("") + "</ul>" +
      '<div class="side-foot"><a href="' + P.resume + '" download>Résumé (PDF)</a> · <a href="' + P.portfolio + '" target="_blank" rel="noopener">Main portfolio</a></div>';
    $("#top").innerHTML =
      '<a class="brand-m" href="#/" aria-label="Overview">' + mark(30) + "<b>Navya</b></a>" +
      '<div class="crumb" id="crumb"></div>' +
      '<div class="search" role="search">' + I.search + '<label class="vh" for="q">Search cases, terms and tools</label><input id="q" type="search" autocomplete="off" placeholder="Search cases, terms, tools" aria-controls="qdrop" aria-autocomplete="list"><kbd>/</kbd><div class="drop" id="qdrop" hidden role="listbox"></div></div>' +
      fitSelect("fitTop") +
      '<button class="ib" type="button" data-act="theme" aria-label="Switch colour theme" id="themeBtn">' + themeIcon() + "</button>" +
      '<a class="btn pri sm hide-m" href="#/hire" id="hireTop">Hire</a>';
    $("#bnav").innerHTML = [
      ["#/", "Home", "home", "home"], ["#/phonepe", "PhonePe", "bank", "phonepe"], ["#/cases", "Cases", "list", "cases"], ["#/simulator", "Simulator", "sliders", "simulator"]
    ].map(function (b) { return '<a href="' + b[0] + '" data-r="' + b[3] + '">' + I[b[2]] + "<span>" + b[1] + "</span></a>"; }).join("") +
      '<a href="#/menu" data-act="menu" data-r="menu">' + I.menu + "<span>More</span></a>";
    renderFoot();
  }
  function renderFoot() {
    var P = D.person;
    $("#foot").innerHTML = '<div class="in"><div class="row" style="gap:14px"><a href="mailto:' + P.email + '">' + P.email + '</a><a href="' + P.phoneHref + '">' + P.phone + '</a><a href="' + P.linkedin + '" target="_blank" rel="noopener">' + P.linkedinShort + '</a><a href="' + P.portfolio + '" target="_blank" rel="noopener">Main portfolio</a></div>' +
      "<p>Independent job-application portfolio by Navya Juneja. Not affiliated with or endorsed by PhonePe" + (S.fit !== "generic" ? ", " + esc(D.fits[S.fit].name) : "") + ", Visa, Mastercard or any company named here. Company names are used in text only; facts about them are linked to their own public pages. The logo mark is an original drawing. PhonePe figures are as stated on my CV.</p></div>";
  }
  function markNav(r) {
    $$("[data-r]").forEach(function (a) { if (a.getAttribute("data-r") === r) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  }

  /* ---------- views ---------- */
  function txTable(list, opts) {
    opts = opts || {};
    var rows = list.map(function (c) {
      var s = seller(c);
      return '<tr data-href="#/case/' + c.id + '"><td class="ref">' + c.ref + '</td><td class="nm"><a href="#/case/' + c.id + '">' + esc(c.short) + "</a><small>" + esc(c.hook) + '</small></td><td><span class="src"><img src="' + s.logo + '" alt="">' + esc(s.name) + '</span></td><td>' + statusChip(c.amt.p) + '</td><td class="amt"><b>' + esc(c.amt.v) + "</b><small>" + esc(c.amt.u) + "</small></td></tr>";
    }).join("");
    var cards = list.map(function (c) {
      return '<a href="#/case/' + c.id + '"><span><b>' + esc(c.short) + "</b><br><small>" + c.ref + " · " + esc(seller(c).name) + '</small></span><span class="r"><b>' + esc(c.amt.v) + "</b><br>" + statusChip(c.amt.p) + "</span></a>";
    }).join("");
    return '<div class="tablewrap hidem"><table class="tx"><thead><tr><th scope="col">Ref</th><th scope="col">Case</th><th scope="col">Source</th><th scope="col">Status</th><th scope="col" style="text-align:right">Amount</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
      '<div class="txc">' + cards + "</div>";
  }
  function legend() {
    return '<div class="legend"><span>Status = where the number came from:</span>' + ["result", "built", "target", "modelled", "sourced"].map(function (p) { return statusChip(p); }).join("") + "</div>";
  }
  function pipeline() {
    return '<div class="pipe">' + D.stages.map(function (s) {
      return '<a class="pstep" href="#/lifecycle/' + s.id + '"><span class="dot">' + s.n + "</span><span><b>" + esc(s.name) + "</b><small>" + s.cases.length + " proof" + (s.cases.length > 1 ? "s" : "") + "</small></span></a>";
    }).join("") + "</div>";
  }
  function fitStrip() {
    var f = fit();
    if (S.fit === "generic") {
      if (!EDIT) return "";
      return '<section class="panel" style="margin-bottom:16px">' + panelHead("Tailor this console", "Pick a company to see which of my cases map to its products, with sourced facts and my hypotheses.") +
        '<div class="pb"><div class="fit-tabs">' + D.fitOrder.filter(function (k) { return k !== "generic"; }).map(function (k) { return '<a href="#/fit/' + k + '" data-fit="' + k + '">' + esc(D.fits[k].short) + "</a>"; }).join("") + "</div></div></section>";
    }
    return '<section class="panel" style="margin-bottom:16px">' + panelHead("Navya × " + esc(f.name), esc(f.line), '<a class="btn sm" href="#/fit/' + S.fit + '">Full fit view ' + I.next + "</a>") +
      '<div class="pb"><div class="grid g3">' + f.hyp.map(function (h) { return '<div class="hyp"><span class="chip hyp">Hypothesis</span><h4>' + esc(h.h) + "</h4></div>"; }).join("") + "</div></div></section>";
  }
  function vHome() {
    var P = D.person;
    var main = D.cases.filter(function (c) { return c.group !== "beyond"; });
    return '<section class="hero">' +
      '<div class="panel hero-main"><div class="who"><img src="assets/portrait.jpg" alt="Navya Juneja"><div><b>Navya Juneja</b><small>Payments product, programs and ops · Gurgaon, open to Bengaluru</small></div></div>' +
      '<p class="eyebrow">PhonePe 2023 – 2025 · Product & Payments</p>' +
      '<h1 class="h1">I make payments go through, settle right, and go live faster.</h1>' +
      '<p class="lede">Two years at PhonePe on routing, onboarding, integrations and reconciliation for ₹500+ Cr TPV travel merchants, including ixigo and MakeMyTrip. Then three payments builds of my own. Every number below says where it came from.</p>' +
      '<div class="row"><a class="btn pri" href="#/phonepe">See the PhonePe work ' + I.next + '</a><a class="btn" href="#/hire">' + I.send + ' Request an interview</a><a class="btn ghost" href="' + P.resume + '" download>' + I.file + " Résumé</a></div></div>" +
      '<div class="panel balance"><div class="row" style="justify-content:space-between"><span class="eyebrow">Impact at PhonePe</span>' + statusChip("result") + '</div><div class="big">₹20+ Cr</div><p class="muted" style="font-size:13px">Savings and recoveries across two years, as stated on my CV.</p>' +
      '<div class="split"><div><b>₹8 Cr</b><small>saved a year, routing</small></div><div><b>₹15+ Cr</b><small>recovered, reconciliation</small></div><div><b>₹500+ Cr</b><small>TPV of merchants I owned</small></div><div><b>+4 pp</b><small>travel payment success</small></div></div>' +
      noteData() + "</div></section>" +
      fitStrip() +
      '<section aria-label="Headline results"><div class="kpis">' + D.kpis.map(function (k) {
        return '<a class="panel kpi" href="#/case/' + k.c + '"><span class="kt">' + chip(k.p) + '<span class="eyebrow">' + esc(CASE[k.c].ref) + '</span></span><span class="kv">' + esc(k.v) + '</span><span class="kl">' + esc(k.l) + "</span>" + spark(k.spark) + "</a>";
      }).join("") + '</div><p class="note" style="margin:-6px 0 16px">' + I.info + "<span>Sparklines are decorative shape only, not data.</span></p></section>" +
      '<section class="panel" style="margin-bottom:16px">' + panelHead("The payment lifecycle, and where I've worked on it", "Seven stages from onboarding to network products. Each links to the cases that prove it.", '<a class="btn sm" href="#/lifecycle">Open lifecycle ' + I.next + "</a>") + pipeline() + "</section>" +
      '<section class="panel" style="margin-bottom:16px">' + panelHead("Recent transactions", "PhonePe work, my payments builds and research. Click a row for the detail.", '<a class="btn sm" href="#/cases">All cases ' + I.next + "</a>") + '<div class="filters">' + legend() + "</div>" + txTable(main) + "</section>" +
      '<section class="grid g2">' +
      '<div class="panel">' + panelHead("Routing simulator", "Three acquirers, a split slider, and what +1 pp of success is worth. Illustrative numbers.") + '<div class="pb"><p class="muted" style="margin-bottom:14px">The trade-off behind the ₹8 Cr: the route with the best success rate is not always the one that earns the merchant the most.</p><a class="btn pri" href="#/simulator">' + I.sliders + " Open the simulator</a></div></div>" +
      '<div class="panel">' + panelHead("How I work") + '<div class="habits" style="grid-template-columns:minmax(0,1fr)">' + D.habits.slice(0, 3).map(function (h) { return "<div><b>" + esc(h[0]) + "</b><p>" + esc(h[1]) + "</p></div>"; }).join("") + "</div></div>" +
      "</section>";
  }

  function vPhonePe() {
    var pp = D.cases.filter(function (c) { return c.group === "phonepe"; });
    var sr = D.ledger.filter(function (l) { return l.org === "PhonePe"; });
    return '<section class="panel dhead" style="margin-bottom:16px"><div><span class="eyebrow">Jun 2023 – Jun 2025 · Bengaluru</span><h1>PhonePe: two years in the payment rails</h1><p class="hook">Operations Analyst – Payments, then Senior Operations Analyst – Product & Payments. I owned integrations, routing and onboarding for ₹500+ Cr TPV travel merchants, including ixigo and MakeMyTrip.</p><div class="meta">' +
      D.stages.filter(function (s) { return pp.some(function (c) { return c.stages.indexOf(s.id) > -1; }); }).map(function (s) { return '<a class="tag" href="#/lifecycle/' + s.id + '">' + s.n + " " + esc(s.name) + "</a>"; }).join("") + '</div></div><div class="amtbox"><img src="assets/logos/phonepe.svg" alt="" width="48" height="48" style="margin-left:auto;border-radius:12px"><b>₹20+ Cr</b><small>impact, as stated on my CV</small></div></section>' +
      '<div class="kpis">' + D.kpis.map(function (k) { return '<a class="panel kpi" href="#/case/' + k.c + '"><span class="kt">' + chip(k.p) + '</span><span class="kv">' + esc(k.v) + '</span><span class="kl">' + esc(k.l) + "</span></a>"; }).join("") + "</div>" +
      '<section class="panel" style="margin-bottom:16px">' + panelHead("Roles", "Promoted after one year.") + '<ol class="ledger">' + sr.map(ledgerRow).join("") + "</ol></section>" +
      '<section class="panel" style="margin-bottom:16px">' + panelHead("Settlement batches", "Five workstreams. Each opens to problem, what I did, and where it landed.") + pp.map(function (c) {
        return '<div class="stage"><div class="sn">' + c.ref.replace("PP-", "") + '</div><div><div class="row" style="justify-content:space-between"><h3><a href="#/case/' + c.id + '" style="text-decoration:none">' + esc(c.name) + "</a></h3>" + statusChip(c.amt.p) + '</div><p class="what">' + esc(c.summary.did) + '</p><div class="mine"><b>Landed</b>' + esc(c.summary.landed) + '</div><div class="row">' + c.stages.map(function (s) { return '<a class="tag" href="#/lifecycle/' + s + '">' + esc(STAGE[s].name) + "</a>"; }).join("") + '<a class="btn sm" href="#/case/' + c.id + '">Open ' + I.next + "</a></div></div></div>";
      }).join("") + "</section>" + noteData();
  }

  function vCases() {
    var groups = [["all", "All"], ["phonepe", "PhonePe"], ["builds", "Payments builds & research"], ["beyond", "Beyond payments"]];
    var f = S.txf;
    var main = D.cases.filter(function (c) { return c.group !== "beyond" && (f === "all" || c.group === f); });
    var beyond = D.cases.filter(function (c) { return c.group === "beyond"; });
    var showBeyond = f === "all" || f === "beyond";
    return '<div style="margin-bottom:16px"><p class="eyebrow">Transactions</p><h1 class="h1">Every case, with its status</h1><p class="lede" style="margin-top:6px">Status is the provenance of the headline number: Settled means it happened, Captured means it’s built, Authorised is a target, Pending is my model, Verified is sourced.</p></div>' +
      '<section class="panel" style="margin-bottom:16px"><div class="ph"><div class="seg" role="group" aria-label="Filter cases">' + groups.map(function (g) { return '<button type="button" data-act="txf" data-v="' + g[0] + '" aria-pressed="' + (f === g[0]) + '">' + g[1] + "</button>"; }).join("") + "</div>" + '</div><div class="filters">' + legend() + "</div>" +
      (f !== "beyond" ? txTable(main) : "") + "</section>" +
      (showBeyond ? '<section class="panel">' + panelHead("Beyond payments", "Product, pricing and growth work outside payments, to show range. Shorter on purpose.") + txTable(beyond) + "</section>" : "");
  }

  function evIcon(done) { return '<span class="ev">' + (done ? I.check : I.dot) + "</span>"; }
  function vCase(id) {
    var c = CASE[id]; if (!c) return vNotFound();
    var s = seller(c), f = fit();
    var all = D.cases, i = all.indexOf(c), prev = all[(i - 1 + all.length) % all.length], next = all[(i + 1) % all.length];
    var fitMaps = S.fit === "generic" ? [] : f.map.filter(function (m) { return m[1].indexOf(id) > -1; }).map(function (m) { return m[0]; });
    var landedDone = c.amt.p === "result" || c.amt.p === "built";
    var h = '<a class="back" href="#/cases">' + I.back + "All transactions</a>" +
      '<section class="panel dhead" style="margin-bottom:16px"><div><div class="row"><span class="eyebrow">' + c.ref + " · " + esc(c.when) + '</span></div><h1>' + esc(c.name) + '</h1><p class="hook">' + esc(c.hook) + '</p><div class="meta"><span class="tag"><img src="' + s.logo + '" alt="" width="16" height="16" style="border-radius:4px;margin-right:6px">' + esc(s.name) + "</span>" +
      c.stages.map(function (st) { return '<a class="tag" href="#/lifecycle/' + st + '">' + STAGE[st].n + " " + esc(STAGE[st].name) + "</a>"; }).join("") + "</div></div>" +
      '<div class="amtbox">' + statusChip(c.amt.p) + "<b>" + esc(c.amt.v) + "</b><small>" + esc(c.amt.u) + "</small><br><small>" + esc(c.sub) + "</small></div></section>";
    h += '<div class="grid g2" style="align-items:start"><div class="stack">';
    h += '<section class="panel">' + panelHead("Event log") + '<ol class="events">' +
      "<li class=\"done\">" + evIcon(true) + "<div><b>Initiated · the problem</b><p>" + esc(c.summary.problem) + "</p></div></li>" +
      "<li class=\"done\">" + evIcon(true) + "<div><b>Processed · what I did</b><p>" + esc(c.summary.did) + "</p></div></li>" +
      "<li" + (landedDone ? ' class="done"' : "") + ">" + evIcon(landedDone) + "<div><b>" + esc(D.prov[c.amt.p].status) + " · where it landed</b><p>" + esc(c.summary.landed) + "</p></div></li></ol></section>";
    if (c.sections && c.sections.length) h += '<section class="panel">' + panelHead("Detail") + c.sections.map(secBody).join("") + "</section>";
    if (c.media && c.media.length) h += '<section class="panel">' + panelHead("Media") + '<div class="media">' + c.media.map(function (m, k) {
      return m.type === "video" ? '<video class="vid" controls preload="none" playsinline poster="' + m.poster + '" aria-label="' + esc(m.alt) + '"><source src="' + m.src + '" type="video/mp4"></video>' : '<button type="button" data-act="lb" data-id="' + c.id + '" data-i="' + k + '" aria-label="Enlarge: ' + esc(m.alt) + '"><img src="' + m.src + '" alt="' + esc(m.alt) + '" loading="lazy"></button>';
    }).join("") + "</div></section>";
    h += '</div><div class="stack">';
    h += '<section class="panel">' + panelHead("Line items", "Each number with its provenance.") + '<div class="mgrid">' + c.metrics.map(function (m) { return '<div class="metric"><b>' + esc(m.v) + "</b><span>" + esc(m.l) + "</span>" + chip(m.p) + "</div>"; }).join("") + "</div>" + (c.group === "phonepe" ? '<div class="pb">' + noteData() + "</div>" : "") + "</section>";
    if (fitMaps.length) h += '<section class="panel">' + panelHead("At " + esc(f.name)) + '<div class="fitbox"><b>Maps to: ' + esc(fitMaps.join(" · ")) + '</b>Why this matters there is in the <a href="#/fit/' + S.fit + '">' + esc(f.short) + " fit view</a>, written as hypotheses, not findings.</div></section>";
    h += '<section class="panel">' + panelHead("Details") + '<dl class="kv">' + (c.details || []).map(function (d) { return "<dt>" + esc(d[0]) + "</dt><dd>" + esc(d[1]) + "</dd>"; }).join("") + "</dl>" +
      ((c.links && c.links.length) || c.deck ? '<div class="pb row">' + (c.links || []).map(function (l) { return '<a class="btn sm" href="' + l.u + '" target="_blank" rel="noopener">' + esc(l.t) + " " + I.ext + "</a>"; }).join("") + (c.deck ? '<a class="btn sm" href="' + c.deck.u + '" target="_blank" rel="noopener">' + I.file + " " + esc(c.deck.t) + "</a>" : "") + "</div>" : "") + "</section>";
    h += '<section class="panel"><div class="ph"><div><h2>Talk about this case</h2><p>Opens a pre-filled email.</p></div><a class="btn pri sm" href="#/hire?case=' + c.id + '">' + I.send + " Request</a></div></section>";
    h += "</div></div>";
    h += '<div class="row" style="justify-content:space-between;margin-top:16px"><a class="btn" href="#/case/' + prev.id + '">' + I.back + esc(prev.short) + '</a><a class="btn" href="#/case/' + next.id + '">' + esc(next.short) + I.next + "</a></div>";
    return h;
  }
  function secBody(s) {
    var b = '<div class="sec"><h3>' + esc(s.h) + "</h3>";
    if (s.p) b += "<p>" + esc(s.p) + "</p>";
    if (s.list) b += "<ul>" + s.list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    if (s.compare) b += '<div class="cmp">' + s.compare.map(function (x) { return "<div><b>" + esc(x[0]) + "</b>" + esc(x[1]) + "</div>"; }).join("") + "</div>";
    return b + "</div>";
  }

  function termBtn(k) { var g = D.glossary[k]; return g ? '<button type="button" class="term" data-act="term" data-k="' + k + '">' + I.book + esc(g.t) + "</button>" : ""; }
  function gItem(k) {
    var g = D.glossary[k];
    return '<div class="gli" id="g-' + k + '"><h4>' + esc(g.t) + "</h4><p>" + esc(g.d) + '</p><div class="srcline">' + chip("sourced") + srcLink(g.u, g.src) + (g.u2 ? " · " + srcLink(g.u2) : "") + "</div></div>";
  }
  function vLifecycle(stageId) {
    var h = '<div style="margin-bottom:16px"><p class="eyebrow">Payment lifecycle</p><h1 class="h1">From onboarding to the card network</h1><p class="lede" style="margin-top:6px">Seven stages a payment business runs. For each: what happens, what I did there, the terms that matter (each checked against RBI, Visa, Mastercard or the company that uses it), and the cases that prove it.</p></div>' +
      '<section class="panel" style="margin-bottom:16px">' + pipeline() + "</section>" +
      '<section class="panel" style="margin-bottom:16px">' + D.stages.map(function (s) {
        return '<div class="stage" id="st-' + s.id + '"><div class="sn">' + s.n + "</div><div><h3>" + esc(s.name) + '</h3><p class="what">' + esc(s.what) + '</p><div class="mine"><b>My work here</b>' + esc(s.mine) + '</div><div class="terms">' + s.terms.map(termBtn).join("") + '</div><div class="row"><span class="eyebrow" style="margin-right:4px">Proof</span>' + s.cases.map(function (id) { return caseLink(id); }).join("") + "</div></div></div>";
      }).join("") + "</section>" +
      '<section class="panel" id="glossary">' + panelHead("Glossary in context", "Plain definitions, each linked to the source I checked it against.") + '<div class="pb gl">' + Object.keys(D.glossary).map(gItem).join("") + "</div></section>";
    return h;
  }

  /* ---------- simulator ---------- */
  var SIM_DEFAULT = {
    gmv: 100, margin: 12, uplift: 1, retry: false,
    acq: [
      { n: "Acquirer A", sr: 92, mdr: 1.9, w: 40, col: "#1F9D7A" },
      { n: "Acquirer B", sr: 89, mdr: 1.6, w: 35, col: "#4C6FE0" },
      { n: "Acquirer C", sr: 85, mdr: 1.4, w: 25, col: "#D08A1E" }
    ]
  };
  function simState() { if (!S.sim || !S.sim.acq || S.sim.acq.length !== 3) S.sim = JSON.parse(JSON.stringify(SIM_DEFAULT)); return S.sim; }
  function simCalc(st, wOverride) {
    var w = wOverride || st.acq.map(function (a) { return a.w; });
    var tot = w.reduce(function (a, b) { return a + b; }, 0) || 1;
    var share = w.map(function (x) { return x / tot; });
    var best = st.acq.map(function (a, i) { return i; }).sort(function (a, b) { return st.acq[b].sr - st.acq[a].sr; });
    var gmv = st.gmv, sr = 0, fee = 0;
    st.acq.forEach(function (a, i) {
      var vol = gmv * share[i], ok = vol * a.sr / 100;
      sr += ok; fee += ok * a.mdr / 100 * 1.18;
      if (st.retry) {
        var j = best[0] === i ? best[1] : best[0], b = st.acq[j];
        var rec = (vol - ok) * (b.sr / 100) * 0.5;
        sr += rec; fee += rec * b.mdr / 100 * 1.18;
      }
    });
    var srPct = sr / gmv * 100;
    var net = sr * st.margin / 100 - fee;
    return { share: share, srPct: srPct, captured: sr, fee: fee, feePct: sr ? fee / sr * 100 : 0, lost: gmv - sr, net: net };
  }
  function simPresets(st) {
    var bySR = st.acq.map(function (a, i) { return i; }).sort(function (a, b) { return st.acq[b].sr - st.acq[a].sr; })[0];
    var byCost = st.acq.map(function (a, i) { return i; }).sort(function (a, b) { return st.acq[a].mdr - st.acq[b].mdr; })[0];
    function only(k) { return st.acq.map(function (a, i) { return i === k ? 100 : 0; }); }
    return { sr: only(bySR), cost: only(byCost) };
  }
  function vSimulator(tab) {
    tab = tab === "settlement" ? "settlement" : "routing";
    var h = '<div style="margin-bottom:16px"><p class="eyebrow">Tools</p><h1 class="h1">' + (tab === "routing" ? "Routing simulator" : "Follow the money") + '</h1><p class="lede" style="margin-top:6px">' +
      (tab === "routing" ? "Split a month of payments across three acquirers. Watch blended success, cost, and the merchant's contribution move. The best success rate is not always the best route. This is a demo with made-up numbers, built for this page; my routing work is the PhonePe case, and RouteIQ is a separate prototype." : "From gross sales to what lands in the bank: MDR, GST on MDR, refunds, and the gap between the contract and what was charged.") +
      '</p></div><div class="row" style="margin-bottom:16px"><div class="seg" role="group" aria-label="Choose tool"><button type="button" data-act="go" data-h="#/simulator" aria-pressed="' + (tab === "routing") + '">Routing simulator</button><button type="button" data-act="go" data-h="#/simulator/settlement" aria-pressed="' + (tab === "settlement") + '">Settlement calculator</button></div>' + chip("modelled") + '<span class="muted" style="font-size:13px">All numbers are illustrative and editable. Acquirers are invented.</span></div>';
    return h + (tab === "routing" ? simRouting() : simSettle());
  }
  function simRouting() {
    var st = simState();
    var acq = st.acq.map(function (a, i) {
      return '<div class="acq-card"><header><b><span class="sw" style="background:' + a.col + '"></span>' + a.n + '</b><span class="mono muted" style="font-size:12px" id="shr' + i + '"></span></header>' +
        slider("sr" + i, "Success", a.sr, 70, 99, 0.5, "%") + slider("mdr" + i, "MDR", a.mdr, 0.5, 3, 0.05, "%") + slider("w" + i, "Weight", a.w, 0, 100, 1, "") + "</div>";
    }).join("");
    return '<div class="simgrid"><section class="panel">' + panelHead("Acquirers", "Weights are normalised into a traffic split.") +
      '<div class="splitbar" id="splitbar">' + st.acq.map(function (a, i) { return '<i id="sb' + i + '" style="background:' + a.col + '"></i>'; }).join("") + "</div>" +
      '<div class="acq">' + acq + '</div><div class="pb row"><button class="btn sm" type="button" data-act="preset" data-v="sr">All to best success</button><button class="btn sm" type="button" data-act="preset" data-v="cost">All to lowest MDR</button><button class="btn sm ghost" type="button" data-act="preset" data-v="reset">Reset</button></div></section>' +
      '<section class="panel" aria-live="polite">' + panelHead("Month view") +
      '<div class="pb grid g2"><div class="numin"><label for="gmv">Attempted volume / month (₹ Cr)</label><input id="gmv" type="number" min="1" max="10000" step="1" value="' + st.gmv + '"></div><div class="numin"><label for="margin">Merchant margin on sales (%)</label><input id="margin" type="number" min="1" max="60" step="0.5" value="' + st.margin + '"></div></div>' +
      '<label class="toggle"><input type="checkbox" id="retry"' + (st.retry ? " checked" : "") + "> Retry failures once on the next-best acquirer (recovers 50% of its success rate)</label>" +
      '<div class="out"><div class="hl"><b id="oSR">–</b><small>blended success rate</small></div><div><b id="oFee">–</b><small>effective cost incl. 18% GST</small></div><div><b id="oCap">–</b><small>captured volume</small></div><div><b id="oLost">–</b><small>lost to failures</small></div><div class="hl"><b id="oNet">–</b><small>merchant contribution after fees</small></div><div><b id="oFeeAbs">–</b><small>fees paid</small></div></div>' +
      '<div class="verdict" id="verdict"></div>' +
      '<div class="pb"><h3 style="font-size:15px;margin-bottom:8px">What is +x pp of success worth?</h3>' + slider("up", "Uplift", st.uplift, 0.5, 5, 0.5, " pp") + '<div class="out" style="padding:10px 0 0"><div><b id="oUpM">–</b><small>more captured a month</small></div><div class="hl"><b id="oUpY">–</b><small>more captured a year</small></div></div><p class="note" style="margin-top:10px">' + I.info + '<span>For scale: at PhonePe, A/B tested routes lifted travel payment success by 4 pp (Result, as on my CV). Everything else on this page is Modelled.</span></p></div></section></div>';
  }
  function slider(id, label, v, min, max, step, unit) {
    return '<div class="sl"><label for="' + id + '">' + label + '</label><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + v + '" data-unit="' + unit + '"><output for="' + id + '" id="' + id + 'o">' + v + unit + "</output></div>";
  }
  function updSim() {
    var st = simState(); if (!$("#oSR")) return;
    st.acq.forEach(function (a, i) { a.sr = +$("#sr" + i).value; a.mdr = +$("#mdr" + i).value; a.w = +$("#w" + i).value; });
    st.gmv = Math.max(1, +$("#gmv").value || 1); st.margin = Math.max(0, +$("#margin").value || 0); st.retry = $("#retry").checked; st.uplift = +$("#up").value;
    $$(".sl input").forEach(function (r) { var o = $("#" + r.id + "o"); if (o) o.textContent = (+r.value).toLocaleString("en-IN", { maximumFractionDigits: 2 }) + r.getAttribute("data-unit"); });
    var r = simCalc(st);
    r.share.forEach(function (s, i) { $("#sb" + i).style.width = (s * 100) + "%"; $("#shr" + i).textContent = Math.round(s * 100) + "% of traffic"; });
    $("#oSR").textContent = r.srPct.toFixed(2) + "%";
    $("#oFee").textContent = r.feePct.toFixed(2) + "%";
    $("#oCap").textContent = money(r.captured);
    $("#oLost").textContent = money(r.lost);
    $("#oNet").textContent = money(r.net);
    $("#oFeeAbs").textContent = money(r.fee);
    var up = st.gmv * st.uplift / 100;
    $("#oUpM").textContent = money(up); $("#oUpY").textContent = money(up * 12);
    var P = simPresets(st), a = simCalc(st, P.sr), b = simCalc(st, P.cost);
    var opts = [["your split", r], ["all traffic to the best success rate", a], ["all traffic to the lowest MDR", b]].sort(function (x, y) { return y[1].net - x[1].net; });
    var bestOpt = opts[0];
    $("#verdict").innerHTML = "<b>Of the three, " + esc(bestOpt[0]) + " earns the merchant most:</b> " + money(bestOpt[1].net) + " a month at " + bestOpt[1].srPct.toFixed(2) + "% success. " +
      (bestOpt[0] === "all traffic to the best success rate" ? "Here the extra success is worth more than the extra MDR." : bestOpt[0] === "all traffic to the lowest MDR" ? "Here the fee saving beats the lost conversions." : "A blend beats both corners, which is why routing is a portfolio, not a ranking.") +
      ' <span class="muted">RouteIQ\'s principle: optimise the merchant\'s outcome, not success alone.</span>';
    save("sim", st);
  }

  var SET_DEFAULT = { g: 50, ref: 3, cm: 1.8, am: 2.0, un: 0.4 };
  var SET = load("set", null) || JSON.parse(JSON.stringify(SET_DEFAULT));
  function simSettle() {
    function n(id, label, v, step, unit) { return '<div class="numin"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="number" step="' + step + '" min="0" value="' + v + '" data-k="' + id + '"></div>'; }
    return '<div class="simgrid"><section class="panel">' + panelHead("Inputs", "One merchant, one month.") + '<div class="pb grid g2">' +
      n("g", "Gross sales / month (₹ L)", SET.g, 1) + n("ref", "Refunds (% of sales)", SET.ref, 0.1) + n("cm", "Contracted MDR (%)", SET.cm, 0.05) + n("am", "MDR actually charged (%)", SET.am, 0.05) + n("un", "Paid but never settled (% of sales)", SET.un, 0.05) +
      '<div class="numin"><label>GST on MDR</label><input value="18% (on the fee, not the sale)" disabled></div></div><div class="pb"><div class="row">' + termBtn("mdr") + termBtn("gst") + termBtn("settlement") + termBtn("tn") + "</div></div></section>" +
      '<section class="panel" aria-live="polite">' + panelHead("Settlement waterfall") + '<div class="wf" id="wf"></div><div class="out"><div class="hl"><b id="sVar">–</b><small>monthly variance vs contract</small></div><div class="hl"><b id="sYear">–</b><small>annualised leak</small></div></div>' +
      '<div class="verdict">This is the check ReconOS automates per order and per payment method, and the kind of mismatch behind the ₹15+ Cr recovered at PhonePe (Result, as on my CV). <a href="#/case/reconos">Open ReconOS</a></div></section></div>';
  }
  function updSettle() {
    if (!$("#wf")) return;
    ["g", "ref", "cm", "am", "un"].forEach(function (k) { SET[k] = Math.max(0, +$("#" + k).value || 0); });
    var G = SET.g, R = G * SET.ref / 100, F = G * SET.cm / 100, Fg = F * 0.18, E = G - R - F - Fg;
    var O = G * Math.max(0, SET.am - SET.cm) / 100 * 1.18, U = G * SET.un / 100, A = E - O - U;
    var rows = [["Gross sales", G, "var(--captured)", 0], ["Refunds", -R, "var(--pending)", 0], ["MDR at contract rate", -F, "var(--pending)", 0], ["GST on MDR (18%)", -Fg, "var(--pending)", 0], ["Expected settlement", E, "var(--settled)", 1], ["Fee above contract (incl. GST)", -O, "var(--danger)", 0], ["Paid but never settled", -U, "var(--danger)", 0], ["Actually credited", A, "var(--settled)", 1]];
    var run = 0;
    $("#wf").innerHTML = rows.map(function (r) {
      var v = r[1], left, width;
      if (r[3] || r[0] === "Gross sales") { left = 0; width = Math.max(0, v) / G * 100; run = v; }
      else { width = Math.abs(v) / G * 100; run += v; left = run / G * 100; }
      return '<div class="wfr' + (r[3] ? " tot" : "") + '"><span>' + r[0] + '</span><div class="bar"><i style="left:' + left.toFixed(2) + "%;width:" + Math.max(width, 0.4).toFixed(2) + "%;background:" + r[2] + '"></i></div><output>' + (v < 0 ? "−" : "") + lakh(Math.abs(v)).replace("−", "") + "</output></div>";
    }).join("");
    $("#sVar").textContent = lakh(O + U); $("#sYear").textContent = lakh((O + U) * 12);
    save("set", SET);
  }

  /* ---------- fit ---------- */
  function vFit(id) {
    if (id && D.fits[id] && id !== S.fit) setFit(id, true);
    var f = fit(), k = S.fit;
    var h = '<div style="margin-bottom:16px"><p class="eyebrow">Company fit</p><h1 class="h1">' + (k === "generic" ? "Fit, for any payments team" : "Navya × " + esc(f.name)) + '</h1><p class="lede" style="margin-top:6px">' + esc(f.line) + "</p></div>" +
      (!EDIT ? "" : '<section class="panel fit-hero" style="margin-bottom:16px"><div class="fit-tabs" role="list">' + D.fitOrder.map(function (x) { return '<a role="listitem" href="#/fit/' + x + '" data-fit="' + x + '"' + (x === k ? ' aria-current="true"' : "") + ">" + esc(x === "generic" ? "Any team" : D.fits[x].short) + "</a>"; }).join("") + '</div><p class="note">' + I.info + '<span>Share a tailored link: <button type="button" class="btn sm" data-act="copyfit">' + I.copy + " Copy link for " + esc(f.short) + "</button></span></p></section>");
    h += '<div class="grid g2" style="align-items:start">';
    h += '<section class="panel">' + panelHead("What " + (k === "generic" ? "payments teams run" : esc(f.name) + " says it does"), k === "generic" ? (EDIT ? "Pick a company above for sourced facts." : "The parts of the stack every payments company runs.") : "From the company's own public pages, fetched November 2026.") +
      (f.facts.length ? '<ul class="facts">' + f.facts.map(function (x) { return "<li><p>" + esc(x.t) + '</p><div class="srcline">' + chip("sourced") + srcLink(x.u, host(x.u) + x.u.replace(/^https?:\/\/[^/]+/, "").slice(0, 46)) + "</div></li>"; }).join("") + "</ul>" : '<div class="pb"><p class="muted">The cases below map to the parts of the stack every payments company runs.</p></div>') + "</section>";
    h += '<section class="panel">' + panelHead("Where my cases map", "Product area → the cases that prove I've worked on it.") + f.map.map(function (m) { return '<div class="maprow"><b>' + esc(m[0]) + '</b><div class="row">' + m[1].map(function (id) { return caseLink(id); }).join("") + "</div></div>"; }).join("") + "</section>";
    h += "</div>";
    h += '<section class="panel" style="margin-top:16px">' + panelHead("Where I'd add value", "Hypotheses from public information. Not findings, and not based on any internal data.") + '<div class="hyps">' + f.hyp.map(function (x, i) { return '<div class="hyp"><span class="chip hyp">Hypothesis ' + (i + 1) + "</span><h4>" + esc(x.h) + "</h4><p>" + esc(x.w) + "</p></div>"; }).join("") + "</div></section>";
    h += '<section class="panel" style="margin-top:16px"><div class="ph"><div><h2>Test these with me</h2><p>Request an interview, pre-filled for ' + esc(k === "generic" ? "your team" : f.name) + '.</p></div><a class="btn pri" href="#/hire">' + I.send + " Settlement report</a></div></section>";
    return h;
  }

  /* ---------- experience ---------- */
  function ledgerRow(l) {
    return '<li class="lrow"><div class="ld"><b>' + esc(l.when) + "</b>" + esc(l.where) + '</div><div><div class="lo"><img src="' + l.logo + '" alt=""><h3>' + esc(l.org) + "<small>" + esc(l.title) + "</small></h3></div><p>" + esc(l.body) + "</p>" +
      (l.lines ? '<ul class="lines">' + l.lines.map(function (x) { return "<li><b>" + esc(x[0]) + "</b><span>" + esc(x[1]) + "</span></li>"; }).join("") + "</ul>" : "") +
      (l.cases ? '<div class="row" style="margin-top:10px">' + l.cases.map(function (id) { return caseLink(id); }).join("") + "</div>" : "") +
      '</div><div class="lt"><span class="tag">' + esc(l.type) + "</span>" + (l.status === "Open" ? '<span class="chip result">Open</span>' : '<span class="chip sourced">Closed</span>') + "</div></li>";
  }
  function vExperience() {
    return '<div style="margin-bottom:16px"><p class="eyebrow">Experience ledger</p><h1 class="h1">Entries, newest first</h1><p class="lede" style="margin-top:6px">Work and education as a ledger. PhonePe entries list the results as stated on my CV.</p></div>' +
      '<section class="panel" style="margin-bottom:16px"><ol class="ledger">' + D.ledger.map(ledgerRow).join("") + "</ol></section>" +
      '<div class="grid g2"><section class="panel">' + panelHead("How I work") + '<div class="habits">' + D.habits.map(function (h) { return "<div><b>" + esc(h[0]) + "</b><p>" + esc(h[1]) + "</p></div>"; }).join("") + "</div></section>" +
      '<section class="panel">' + panelHead("Certifications") + '<dl class="kv" style="grid-template-columns:minmax(0,1fr)">' + D.certs.map(function (c) { return "<dt style=\"color:var(--ink);font-weight:800\">" + esc(c[0]) + "</dt><dd class=\"muted\" style=\"margin-bottom:8px\">" + esc(c[1]) + "</dd>"; }).join("") + '</dl><div class="pb"><a class="btn" href="' + D.person.resume + '" download>' + I.file + " Download résumé (PDF)</a></div></section></div>";
  }

  /* ---------- hire ---------- */
  function vHire(qs) {
    var P = D.person, f = fit(), caseId = (qs.match(/case=([a-z0-9-]+)/) || [])[1], c = CASE[caseId];
    var company = S.fit === "generic" ? "" : f.name;
    return '<div style="margin-bottom:16px"><p class="eyebrow">Settlement report</p><h1 class="h1">Hire me: the report, and the request</h1><p class="lede" style="margin-top:6px">Everything you need to reach me, and a form that writes the email for you. Nothing is sent from this page; your email app opens with the message filled in.</p></div>' +
      '<div class="grid g2" style="align-items:start"><section class="panel report"><div class="rhead"><div><span class="eyebrow">Report NJ-2026 · payee</span><h2>Navya Juneja</h2><p class="muted" style="font-size:13.5px">' + esc(P.role) + "</p></div>" + statusChip("result") + '</div><div class="rlines">' +
      '<div class="rl"><span>Payments experience</span><b>PhonePe, Jun 2023 – Jun 2025</b></div>' +
      '<div class="rl"><span>Impact at PhonePe</span><b>₹20+ Cr (as on CV)</b></div>' +
      '<div class="rl"><span>Roles</span><b>' + D.roles.map(esc).join("<br>") + "</b></div>" +
      '<div class="rl"><span>Location</span><b>' + esc(P.location) + "</b></div>" +
      '<div class="rl"><span>Email</span><b><a href="mailto:' + P.email + '">' + P.email + '</a> <button class="btn sm ghost" type="button" data-act="copy" data-v="' + P.email + '" aria-label="Copy email address">' + I.copy + "</button></b></div>" +
      '<div class="rl"><span>Phone</span><b><a href="' + P.phoneHref + '">' + P.phone + "</a></b></div>" +
      '<div class="rl"><span>LinkedIn</span><b><a href="' + P.linkedin + '" target="_blank" rel="noopener">' + P.linkedinShort + "</a></b></div>" +
      '<div class="rl"><span>Main portfolio</span><b><a href="' + P.portfolio + '" target="_blank" rel="noopener">' + host(P.portfolio) + "</a></b></div>" +
      '<div class="rl"><span>Résumé</span><b><a href="' + P.resume + '" download>Navya_Juneja_Resume.pdf</a></b></div></div>' +
      '<div class="qr"><img src="assets/qr-linkedin.svg" alt="QR code linking to Navya Juneja\'s LinkedIn profile"><p class="muted" style="font-size:13px">Scan for LinkedIn. Or call ' + P.phone + ".</p></div></section>" +
      '<section class="panel"><div class="ph"><div><h2>Request an interview</h2><p>Fills an email to ' + P.email + '.</p></div></div><form class="form" id="hireForm" novalidate>' +
      '<div class="two"><label>Your name<input name="name" autocomplete="name" placeholder="Your name"></label><label>Company<input name="company" autocomplete="organization" value="' + esc(company) + '" placeholder="Company"></label></div>' +
      '<label>Role<select name="role">' + D.roles.map(function (r) { return "<option>" + esc(r) + "</option>"; }).join("") + "<option>Something else</option></select></label>" +
      '<label>Message<textarea name="msg" placeholder="What would you like to talk about?">' + (c ? "I'd like to talk about " + esc(c.short) + " (" + c.ref + ")." : "") + "</textarea></label>" +
      '<div class="row"><button class="btn pri" type="submit">' + I.mail + ' Open email</button><button class="btn" type="button" data-act="copy" data-v="' + P.email + '">' + I.copy + " Copy address</button></div></form>" +
      '<div class="faq">' + D.faq.map(function (q) { return "<details><summary>" + esc(q[0]) + "</summary><p>" + esc(q[1]) + "</p></details>"; }).join("") + "</div></section></div>";
  }

  function vMenu() {
    return '<div style="margin-bottom:16px"><p class="eyebrow">Menu</p><h1 class="h1">Everything in this console</h1></div><section class="panel"><ul class="snav" style="padding:10px">' + NAV.map(function (n) { return n.sec ? '<li class="sec">' + n.sec + "</li>" : navLink(n); }).join("") + '</ul><div class="pb row"><button class="btn" type="button" data-act="theme">' + themeIcon() + ' Switch theme</button><a class="btn" href="' + D.person.resume + '" download>' + I.file + " Résumé</a></div></section>";
  }
  function vNotFound() { return '<section class="panel"><div class="ph"><div><h2>Declined: no such page</h2><p>That link doesn\'t lead anywhere.</p></div><a class="btn pri" href="#/">Back to overview</a></div></section>'; }

  /* ---------- router ---------- */
  function parse() {
    var h = location.hash.replace(/^#\/?/, ""), qs = "";
    var qi = h.indexOf("?"); if (qi > -1) { qs = h.slice(qi + 1); h = h.slice(0, qi); }
    var p = h.split("/").filter(Boolean);
    return { p: p, qs: qs };
  }
  var TITLES = { home: "Overview", phonepe: "PhonePe", cases: "Transactions", lifecycle: "Payment lifecycle", simulator: "Simulator", fit: "Company fit", experience: "Experience ledger", hire: "Settlement report", menu: "Menu" };
  var lastRoute = "";
  function route() {
    var r = parse(), p = r.p, key = p[0] || "home", html;
    closeSheet(true);
    switch (key) {
      case "home": html = vHome(); break;
      case "phonepe": html = vPhonePe(); break;
      case "cases": html = vCases(); break;
      case "case": html = vCase(p[1]); key = "cases"; break;
      case "lifecycle": html = vLifecycle(p[1]); break;
      case "simulator": html = vSimulator(p[1]); break;
      case "fit": html = vFit(p[1]); break;
      case "experience": html = vExperience(); break;
      case "hire": html = vHire(r.qs); break;
      case "menu": html = vMenu(); break;
      default: html = vNotFound(); key = "";
    }
    $("#view").innerHTML = html;
    markNav(key === "simulator" && p[1] === "settlement" ? "settlement" : key);
    var crumbName = key === "cases" && p[0] === "case" && CASE[p[1]] ? CASE[p[1]].short : (TITLES[key] || "Not found");
    $("#crumb").innerHTML = "Console / <b>" + esc(crumbName) + "</b>" + (S.fit !== "generic" ? " · for " + esc(fit().short) : "");
    document.title = (key === "home" ? "Navya Juneja · Payments Console" : crumbName + " · Navya Juneja, payments");
    $$("tr[data-href]").forEach(function (tr) { tr.addEventListener("click", function (e) { if (e.target.closest("a")) return; location.hash = tr.getAttribute("data-href"); }); });
    if (key === "simulator") { if (p[1] === "settlement") updSettle(); else updSim(); }
    var full = location.hash;
    if (full !== lastRoute) {
      if (key === "lifecycle" && p[1] && $("#st-" + p[1])) { setTimeout(function () { var el = $("#st-" + p[1]); el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" }); }, 30); }
      else window.scrollTo(0, 0);
      if (lastRoute) $("#view").focus({ preventScroll: true });
    }
    lastRoute = full;
  }
  function rerender() { var y = window.scrollY; lastRoute = location.hash; route(); window.scrollTo(0, y); }

  /* ---------- sheet, toast ---------- */
  var lastFocus = null, tt;
  function openSheet(title, body, cls) {
    lastFocus = document.activeElement;
    var s = $("#sheet"); s.className = "sheet " + (cls || "");
    s.setAttribute("aria-label", title);
    s.innerHTML = '<div class="sheet-h"><h3>' + esc(title) + '</h3><button class="ib bare" type="button" data-act="close" aria-label="Close">' + I.x + '</button></div><div class="sheet-b">' + body + "</div>";
    requestAnimationFrame(function () { s.classList.add("on"); $("#scrim").classList.add("on"); });
    document.body.classList.add("no-scroll");
    setTimeout(function () { var f = $("button, a, input", s); if (f) f.focus(); }, 60);
  }
  function closeSheet(quiet) {
    var s = $("#sheet"); if (!s.classList.contains("on")) return;
    s.classList.remove("on"); $("#scrim").classList.remove("on"); document.body.classList.remove("no-scroll");
    if (!quiet && lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
  }
  function toast(t) { var el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(tt); tt = setTimeout(function () { el.classList.remove("on"); }, 2400); }
  function copy(text, ok) {
    function done() { toast(ok || "Copied"); }
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
    function fallback() { var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch (e) { toast(text); } ta.remove(); }
  }
  function termSheet(k) {
    var g = D.glossary[k]; if (!g) return;
    var uses = D.stages.filter(function (s) { return s.terms.indexOf(k) > -1; });
    openSheet(g.t, "<p>" + esc(g.d) + '</p><div class="srcline">' + chip("sourced") + srcLink(g.u, g.src) + (g.u2 ? " · " + srcLink(g.u2) : "") + "</div>" +
      (uses.length ? '<div><p class="eyebrow" style="margin-bottom:8px">Where it shows up</p><div class="row">' + uses.map(function (s) { return '<a class="tag" href="#/lifecycle/' + s.id + '">' + s.n + " " + esc(s.name) + "</a>"; }).join("") + "</div></div>" : ""));
  }
  function lightbox(id, i) {
    var c = CASE[id], m = c && c.media[i]; if (!m) return;
    openSheet(c.short + " · " + (i + 1) + " of " + c.media.length, '<img src="' + m.src + '" alt="' + esc(m.alt) + '"><p class="muted">' + esc(m.alt) + "</p>", "wide");
  }

  /* ---------- search ---------- */
  var IDX = [];
  function buildIndex() {
    D.cases.forEach(function (c) { IDX.push({ k: c.ref, t: c.short, s: c.name, h: "#/case/" + c.id, x: (c.name + " " + c.hook + " " + c.summary.did + " " + c.ref).toLowerCase() }); });
    Object.keys(D.glossary).forEach(function (k) { var g = D.glossary[k]; IDX.push({ k: "TERM", t: g.t, s: g.d, term: k, x: (g.t + " " + g.d).toLowerCase() }); });
    D.stages.forEach(function (s) { IDX.push({ k: "STAGE " + s.n, t: s.name, s: s.what, h: "#/lifecycle/" + s.id, x: (s.name + " " + s.what + " " + s.mine).toLowerCase() }); });
    D.fitOrder.forEach(function (k) { if (k !== "generic" && (EDIT || k === S.fit)) IDX.push({ k: "FIT", t: D.fits[k].name, s: D.fits[k].line, h: "#/fit/" + k, x: (D.fits[k].name + " fit " + D.fits[k].line).toLowerCase() }); });
    [["TOOL", "Routing simulator", "Split traffic across acquirers", "#/simulator", "routing simulator split acquirer success mdr"], ["TOOL", "Settlement calculator", "MDR, GST, net settlement, leak", "#/simulator/settlement", "settlement calculator follow the money mdr gst leak"], ["PAGE", "Settlement report", "Contact and interview request", "#/hire", "hire contact email phone interview resume"], ["PAGE", "Experience ledger", "Work and education", "#/experience", "experience education cogent christ masters union"]].forEach(function (r) { IDX.push({ k: r[0], t: r[1], s: r[2], h: r[3], x: r[4] }); });
  }
  var qSel = -1;
  function showDrop(q) {
    var d = $("#qdrop"); q = q.trim().toLowerCase();
    if (!q) { d.hidden = true; return; }
    var words = q.split(/\s+/);
    var res = IDX.filter(function (r) { return words.every(function (w) { return r.x.indexOf(w) > -1 || r.t.toLowerCase().indexOf(w) > -1; }); }).slice(0, 8);
    qSel = -1;
    d.innerHTML = res.length ? res.map(function (r, i) { return '<a role="option" id="qo' + i + '" href="' + (r.h || "#") + '"' + (r.term ? ' data-act="term" data-k="' + r.term + '"' : "") + '><span class="k">' + esc(r.k) + "</span><b>" + esc(r.t) + "</b><small>" + esc(r.s) + "</small></a>"; }).join("") : '<div class="none">No matches. Try "routing", "MDR" or "settlement".</div>';
    d.hidden = false;
  }
  function hideDrop() { var d = $("#qdrop"); if (d) d.hidden = true; }

  /* ---------- events ---------- */
  function bind() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-act]");
      var fl = e.target.closest("[data-fit]");
      if (fl) { setFit(fl.getAttribute("data-fit"), true); }
      if (!e.target.closest(".search")) hideDrop();
      if (!a) return;
      var act = a.getAttribute("data-act");
      if (act === "close") { closeSheet(); }
      else if (act === "theme") { toggleTheme(); }
      else if (act === "term") { e.preventDefault(); hideDrop(); termSheet(a.getAttribute("data-k")); }
      else if (act === "lb") { lightbox(a.getAttribute("data-id"), +a.getAttribute("data-i")); }
      else if (act === "txf") { S.txf = a.getAttribute("data-v"); rerender(); }
      else if (act === "go") { location.hash = a.getAttribute("data-h"); }
      else if (act === "copy") { copy(a.getAttribute("data-v"), "Email address copied"); }
      else if (act === "copyfit") { copy(location.origin + location.pathname + (S.fit === "generic" ? "" : "?for=" + S.fit) + "#/fit/" + S.fit, "Tailored link copied"); }
      else if (act === "preset") {
        var st = simState(), v = a.getAttribute("data-v");
        if (v === "reset") { S.sim = JSON.parse(JSON.stringify(SIM_DEFAULT)); }
        else { var P = simPresets(st)[v]; st.acq.forEach(function (x, i) { x.w = P[i]; }); }
        rerender();
      }
    });
    $("#scrim").addEventListener("click", function () { closeSheet(); });
    document.addEventListener("change", function (e) {
      if (e.target.matches("[data-act=fit]")) { setFit(e.target.value); }
      if (e.target.closest(".simgrid")) { if ($("#wf")) updSettle(); else updSim(); }
    });
    document.addEventListener("input", function (e) {
      if (e.target.id === "q") showDrop(e.target.value);
      else if (e.target.closest(".simgrid")) { if ($("#wf")) updSettle(); else updSim(); }
    });
    document.addEventListener("submit", function (e) {
      if (e.target.id !== "hireForm") return;
      e.preventDefault();
      var f = e.target, P = D.person;
      var name = f.name.value.trim(), co = f.company.value.trim(), role = f.role.value, msg = f.msg.value.trim();
      var subj = "Interview request: " + role + (co ? " at " + co : "");
      var body = "Hi Navya,\n\n" + (msg || "I'd like to talk about a payments role.") + "\n\nRole: " + role + (co ? "\nCompany: " + co : "") + "\n\n" + (name || "") + "\n\n(Sent from your payments console portfolio" + (S.fit !== "generic" ? ", " + fit().short + " view" : "") + ")";
      location.href = "mailto:" + P.email + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
      toast("Opening your email app");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeSheet(); hideDrop(); }
      if (e.key === "/" && !/input|textarea|select/i.test((document.activeElement || {}).tagName || "")) { e.preventDefault(); $("#q").focus(); }
      if (e.target.id === "q") {
        var opts = $$("#qdrop a");
        if (!opts.length) return;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault(); qSel = (qSel + (e.key === "ArrowDown" ? 1 : -1) + opts.length) % opts.length;
          opts.forEach(function (o, i) { o.classList.toggle("on", i === qSel); });
          e.target.setAttribute("aria-activedescendant", opts[qSel].id);
        } else if (e.key === "Enter") {
          e.preventDefault(); var o = opts[Math.max(0, qSel)]; o.click(); if (!o.getAttribute("data-act")) location.hash = o.getAttribute("href");
          e.target.value = ""; hideDrop(); e.target.blur();
        }
      }
    });
    $("#qdrop").addEventListener("click", function (e) { var a = e.target.closest("a"); if (a && !a.getAttribute("data-act")) { $("#q").value = ""; hideDrop(); } });
    window.addEventListener("hashchange", function () {
      var m = location.hash.match(/[?&]for=([a-z]+)/i); if (EDIT && m && D.fits[m[1]] && m[1] !== S.fit) setFit(m[1], true);
      route();
    });
  }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme");
    var dark = cur ? cur === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var nt = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nt);
    save("theme", nt);
    try { localStorage.setItem("njp_theme", nt); } catch (e) {}
    $$("[data-act=theme]").forEach(function (b) { b.innerHTML = b.classList.contains("ib") ? themeIcon() : themeIcon() + " Switch theme"; });
    toast(nt === "dark" ? "Dark theme" : "Light theme");
  }

  /* ---------- splash ---------- */
  function splash() {
    var sp = $("#splash"); if (!sp) return;
    var seen = false; try { seen = sessionStorage.getItem("njp_seen") === "1"; } catch (e) {}
    if (seen || REDUCED || /[?&]nosplash/.test(location.search)) { sp.classList.add("gone"); sp.setAttribute("aria-hidden", "true"); return; }
    document.body.classList.add("no-scroll");
    var done = false, steps = $$(".sp-steps li", sp), timers = [];
    function end() {
      if (done) return; done = true; timers.forEach(clearTimeout);
      sp.classList.add("out"); document.body.classList.remove("no-scroll");
      setTimeout(function () { sp.classList.add("gone"); sp.setAttribute("aria-hidden", "true"); }, 500);
      try { sessionStorage.setItem("njp_seen", "1"); } catch (e) {}
      var v = $("#view"); if (v) v.focus({ preventScroll: true });
    }
    steps.forEach(function (li, i) { timers.push(setTimeout(function () { li.classList.add("on"); }, 250 + i * 330)); });
    timers.push(setTimeout(end, 250 + steps.length * 330 + 450));
    $("#spSkip").addEventListener("click", end);
    document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { end(); document.removeEventListener("keydown", k); } });
    setTimeout(function () { try { $("#spSkip").focus(); } catch (e) {} }, 30);
  }

  /* ---------- boot ---------- */
  S.fit = readFit();
  S.locked = !EDIT;
  (function () {
    var nf = NAV.filter(function (n) { return n.r === "fit"; })[0]; if (!nf || EDIT) return;
    if (S.fit === "generic") NAV.splice(NAV.indexOf(nf), 1);
    else { nf.h = "#/fit/" + S.fit; nf.t = "Fit with " + D.fits[S.fit].short; }
  })();
  if (S.fit !== "generic") setFit(S.fit, true);
  renderShell();
  buildIndex();
  bind();
  route();
  splash();
})();
