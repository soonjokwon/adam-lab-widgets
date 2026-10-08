/* Publications explorer — sheet tab `publications`.
   Columns: type,no,year,authors,title,venue,details,date,presentation,status,link,note,extra_label,extra_link
   URL params: ?types=journal-intl,journal-kr (limit tabs) &type= &year= &q= */
(function () {
  var A = window.ADAM, el = A.el;
  var mount = document.getElementById("adam-publications");
  if (!mount) return;

  var TYPES = [
    { id: "journal-intl", lb: "Int'l Journal", ko: "국제 학술지", pre: "J" },
    { id: "journal-kr", lb: "Korean Journal", ko: "국내 학술지", pre: "KJ" },
    { id: "conf-intl", lb: "Int'l Conf.", ko: "국제 학술대회", pre: "C" },
    { id: "conf-kr", lb: "Korean Conf.", ko: "국내 학술대회", pre: "KC" },
    { id: "in-prep", lb: "In Prep.", ko: "준비·심사 중", pre: "P" }
  ];
  var ALIAS = { journal: "journal-intl", international: "journal-intl", domestic: "journal-kr", "korean-journal": "journal-kr",
    conference: "conf-intl", "conf": "conf-intl", "korean-conf": "conf-kr", preprint: "in-prep", "in-preparation": "in-prep", prep: "in-prep" };
  var TYPE_BY = {};
  TYPES.forEach(function (t, i) { t.order = i; TYPE_BY[t.id] = t; });
  var STATUS_KO = { "in-press": "게재 예정", "accepted": "게재 승인", "in-revision": "In revision", "in-preparation": "In preparation", "under-review": "Under review" };
  var PAGE = 60;

  var allowed = (A.params.get("types") || "").split(",").map(function (s) { return canonType(s); }).filter(Boolean);
  var state = { items: [], type: canonType(A.params.get("type")) || "all", year: A.params.get("year") || "all",
    q: A.params.get("q") || "", award: false, limit: PAGE };

  function canonType(v) {
    var s = String(v || "").trim().toLowerCase().replace(/[\s_]+/g, "-");
    if (!s) return "";
    if (TYPE_BY[s]) return s;
    return ALIAS[s] || "";
  }

  function normalize(rows) {
    var out = [];
    rows.forEach(function (r, i) {
      var type = canonType(r.type);
      var title = (r.title || "").trim();
      if (!type || !title) return;
      if (allowed.length && allowed.indexOf(type) === -1) return;
      var year = String(r.year || "").match(/\d{4}/);
      var date = A.normalizeDate(r.date);
      year = year ? year[0] : (date ? date.slice(0, 4) : "");
      var note = (r.note || "").split(/\s*;\s*/).filter(Boolean);
      out.push({
        type: type, no: String(r.no || "").replace(/\.0$/, "").trim(), year: year, date: date,
        authors: r.authors || "", title: title, venue: r.venue || "", details: r.details || "",
        presentation: (r.presentation || "").toLowerCase(), status: (r.status || "").toLowerCase().replace(/\s+/g, "-"),
        link: A.safeUrl(r.link), notes: note,
        extraLabel: r.extra_label || "", extraLink: A.safeUrl(r.extra_link),
        award: note.some(function (n) { return /상|award|prize/i.test(n); }),
        order: i,
        hay: A.fold([title, r.authors, r.venue, r.details, r.note, year].join(" "))
      });
    });
    out.sort(function (a, b) {
      var ya = a.year || "9999", yb = b.year || "9999";
      if (a.type === "in-prep" && b.type !== "in-prep") return 1;
      if (b.type === "in-prep" && a.type !== "in-prep") return -1;
      if (ya !== yb) return ya < yb ? 1 : -1;
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      if (TYPE_BY[a.type].order !== TYPE_BY[b.type].order) return TYPE_BY[a.type].order - TYPE_BY[b.type].order;
      var na = parseInt(a.no, 10) || 0, nb = parseInt(b.no, 10) || 0;
      if (na !== nb) return nb - na;
      return a.order - b.order;
    });
    return out;
  }

  var refs = {};
  function shell() {
    mount.innerHTML = "";
    refs.tiles = el("div", { class: "pub-tiles", role: "group", "aria-label": "논문 분류" });
    refs.hist = el("div", { class: "pub-hist", role: "group", "aria-label": "연도별 편수" });
    refs.axis = el("div", { class: "pub-hist-axis", "aria-hidden": "true" });
    refs.q = el("input", { type: "search", placeholder: "제목·저자·학술지 검색", "aria-label": "논문 검색", value: state.q });
    var clear = el("button", { type: "button", class: "ax-clear", "aria-label": "검색어 지우기", text: "×", hidden: !state.q });
    refs.clear = clear;
    var search = el("label", { class: "ax-search" }, [
      el("span", { html: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m10.4 10.4 3.6 3.6" stroke="currentColor" stroke-width="1.5"/></svg>' }),
      refs.q, clear
    ]);
    refs.year = el("select", { class: "ax-select", "aria-label": "연도" });
    refs.award = el("button", { type: "button", class: "ax-chip", "aria-pressed": "false" }, [el("span", { class: "ko", text: "수상" }), el("span", { text: "★", "aria-hidden": "true" })]);
    refs.count = el("span", { class: "ax-count", "aria-live": "polite" });
    refs.list = el("div", { class: "pub-list" });
    var bar = el("div", { class: "ax-bar" }, [search, refs.year, refs.award, el("span", { class: "ax-grow" }), refs.count]);
    var root = el("div", { class: "ax-root pub" }, [refs.tiles, refs.hist, refs.axis, bar, refs.list]);
    mount.appendChild(root);

    refs.q.addEventListener("input", A.debounce(function () {
      state.q = refs.q.value; state.limit = PAGE; clear.hidden = !state.q; render();
    }, 120));
    clear.addEventListener("click", function () { refs.q.value = ""; state.q = ""; clear.hidden = true; render(); refs.q.focus(); });
    refs.year.addEventListener("change", function () { state.year = refs.year.value; state.limit = PAGE; render(); });
    refs.award.addEventListener("click", function () { state.award = !state.award; state.limit = PAGE; render(); });
  }

  function skeleton() {
    refs.list.innerHTML = "";
    for (var i = 0; i < 5; i++) refs.list.appendChild(el("div", { class: "ax-skel", "aria-hidden": "true" }));
  }

  function matches(it, skip) {
    if (skip !== "type" && state.type !== "all" && it.type !== state.type) return false;
    if (skip !== "year" && state.year !== "all" && it.year !== state.year) return false;
    if (state.award && !it.award) return false;
    if (state.q) {
      var words = A.fold(state.q).trim().split(" ");
      for (var i = 0; i < words.length; i++) if (words[i] && it.hay.indexOf(words[i]) === -1) return false;
    }
    return true;
  }

  function renderTiles() {
    var counts = { all: 0 };
    state.items.forEach(function (it) {
      if (!matches(it, "type")) return;
      counts.all++; counts[it.type] = (counts[it.type] || 0) + 1;
    });
    var present = TYPES.filter(function (t) { return state.items.some(function (it) { return it.type === t.id; }); });
    var list = [{ id: "all", lb: "All", ko: "전체" }].concat(present);
    if (present.length <= 1) list = present;
    refs.tiles.innerHTML = "";
    refs.tiles.hidden = !list.length;
    list.forEach(function (t) {
      var b = el("button", { type: "button", class: "pub-tile", "aria-pressed": String(state.type === t.id), "data-type": t.id }, [
        el("span", { class: "lb", text: t.lb }),
        el("span", { class: "num", text: String(counts[t.id] || 0) }),
        el("span", { class: "ko", text: t.ko })
      ]);
      b.addEventListener("click", function () { state.type = t.id; state.limit = PAGE; render(); });
      refs.tiles.appendChild(b);
    });
  }

  function yearsAll() {
    var ys = {};
    state.items.forEach(function (it) { if (it.year) ys[it.year] = true; });
    return Object.keys(ys).sort();
  }

  function renderYears() {
    var ys = yearsAll();
    var cur = state.year;
    refs.year.innerHTML = "";
    refs.year.appendChild(el("option", { value: "all", text: "ALL YEARS" }));
    ys.slice().reverse().forEach(function (y) { refs.year.appendChild(el("option", { value: y, text: y })); });
    refs.year.value = ys.indexOf(cur) !== -1 ? cur : "all";
    state.year = refs.year.value;

    var counts = {}, max = 1;
    state.items.forEach(function (it) {
      if (!it.year || !matches(it, "year")) return;
      counts[it.year] = (counts[it.year] || 0) + 1;
      if (counts[it.year] > max) max = counts[it.year];
    });
    refs.hist.innerHTML = "";
    if (ys.length < 3) { refs.hist.hidden = refs.axis.hidden = true; return; }
    refs.hist.hidden = refs.axis.hidden = false;
    var first = +ys[0], last = +ys[ys.length - 1];
    for (var y = first; y <= last; y++) {
      var n = counts[y] || 0, ystr = String(y);
      var b = el("button", { type: "button", class: n ? "" : "zero", "aria-pressed": String(state.year === ystr),
        title: y + " · " + n + "편", "aria-label": y + "년 " + n + "편" }, [
        el("span", { class: "bar", style: "height:" + Math.max(4, Math.round((n / max) * 100)) + "%" })
      ]);
      (function (ystr) {
        b.addEventListener("click", function () { state.year = state.year === ystr ? "all" : ystr; state.limit = PAGE; render(); });
      })(ystr);
      refs.hist.appendChild(b);
    }
    refs.axis.innerHTML = "";
    var mid = Math.round((first + last) / 2);
    [first, mid, last].forEach(function (y) { refs.axis.appendChild(el("span", { text: String(y) })); });
  }

  function highlight(text) {
    var frag = document.createDocumentFragment();
    var words = A.fold(state.q).trim().split(" ").filter(function (w) { return w.length > 1; });
    if (!words.length) { frag.appendChild(document.createTextNode(text)); return frag; }
    var rx = new RegExp("(" + words.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "ig");
    String(text).split(rx).forEach(function (part, i) {
      frag.appendChild(i % 2 ? el("mark", { text: part }) : document.createTextNode(part));
    });
    return frag;
  }

  function item(it) {
    var t = TYPE_BY[it.type];
    var title = el("h4", { class: "pub-title" });
    if (it.link) title.appendChild(el("a", { href: it.link, target: "_blank", rel: "noopener" }, [highlight(it.title)]));
    else title.appendChild(highlight(it.title));

    var body = el("div", { class: "pub-body" }, [title]);
    if (it.authors) {
      var au = el("div", { class: "pub-authors" });
      au.appendChild(A.authors(it.authors));
      body.appendChild(au);
    }
    if (it.venue || it.details) {
      var v = el("div", { class: "pub-venue" });
      if (it.venue) v.appendChild(el("span", { class: "vn", text: it.venue }));
      if (it.venue && it.details) v.appendChild(document.createTextNode(" · "));
      if (it.details) v.appendChild(el("span", { class: "dt", text: it.details }));
      body.appendChild(v);
    }
    var meta = el("div", { class: "pub-meta" });
    if (state.type === "all" && it.type !== "in-prep") meta.appendChild(el("span", { class: "ax-badge", text: t.lb.toUpperCase() }));
    if (it.presentation === "poster") meta.appendChild(el("span", { class: "ax-badge", text: "POSTER" }));
    if (STATUS_KO[it.status]) meta.appendChild(el("span", { class: "ax-badge dash ko", text: STATUS_KO[it.status] }));
    it.notes.forEach(function (n) {
      var isAward = /상|award|prize/i.test(n);
      meta.appendChild(el("span", { class: "ax-badge ko " + (isAward ? "award" : "navy"), text: n }));
    });
    if (it.link) meta.appendChild(el("a", { class: "ax-link", href: it.link, target: "_blank", rel: "noopener", text: /doi\.org/.test(it.link) ? "DOI" : "LINK" }));
    if (it.extraLink) meta.appendChild(el("a", { class: "ax-link", href: it.extraLink, target: "_blank", rel: "noopener", text: it.extraLabel || "LINK" }));
    body.appendChild(meta);

    var idx = it.no ? t.pre + it.no : "·";
    return el("li", { class: "pub-item" }, [el("div", { class: "pub-idx", text: idx }), body]);
  }

  function render() {
    renderTiles();
    renderYears();
    refs.award.setAttribute("aria-pressed", String(state.award));
    refs.award.hidden = !state.items.some(function (it) { return it.award; });
    var shown = state.items.filter(function (it) { return matches(it); });
    refs.count.textContent = shown.length + " / " + state.items.length;
    refs.list.innerHTML = "";
    if (!shown.length) {
      refs.list.appendChild(el("p", { class: "pub-empty", text: "조건에 맞는 논문이 없습니다." }));
      return;
    }
    var groups = [], cur = null;
    shown.slice(0, state.limit).forEach(function (it) {
      var key = it.type === "in-prep" ? "Prep." : (it.year || "—");
      if (!cur || cur.key !== key) { cur = { key: key, items: [], total: 0 }; groups.push(cur); }
      cur.items.push(it);
    });
    var totals = {};
    shown.forEach(function (it) { var k = it.type === "in-prep" ? "Prep." : (it.year || "—"); totals[k] = (totals[k] || 0) + 1; });
    groups.forEach(function (g) {
      var ol = el("ol", { class: "pub-ol" });
      g.items.forEach(function (it) { ol.appendChild(item(it)); });
      refs.list.appendChild(el("section", { class: "pub-year ax-in" }, [
        el("h3", { class: "pub-yl" }, [g.key, el("span", { class: "ax-count", text: totals[g.key] + (g.key === "Prep." ? "" : " items") })]),
        ol
      ]));
    });
    if (shown.length > state.limit) {
      var more = el("button", { type: "button", class: "pub-more", text: "더 보기 · Show more (" + (shown.length - state.limit) + ")" });
      more.addEventListener("click", function () { state.limit += PAGE * 2; render(); });
      refs.list.appendChild(more);
    }
  }

  function boot() {
    shell();
    skeleton();
    A.load("publications", { required: ["type", "title", "authors", "venue"] }).then(function (res) {
      state.items = normalize(res.rows);
      if (!state.items.length) { A.status(refs.list, "표시할 논문이 없습니다."); return; }
      if (state.type !== "all" && !state.items.some(function (it) { return it.type === state.type; })) state.type = "all";
      var types = {};
      state.items.forEach(function (it) { types[it.type] = 1; });
      if (Object.keys(types).length === 1) state.type = Object.keys(types)[0];
      render();
    }).catch(function () {
      A.status(refs.list, "논문 목록을 불러오지 못했습니다.");
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
