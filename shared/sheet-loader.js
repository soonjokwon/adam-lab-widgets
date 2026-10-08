/* ADAM Lab widgets — shared Google Sheet loader (vanilla, no deps).

   ADAM.load(tab, { required: ["col", ...] })
     1) ADAM_SHEETS[tab] (gviz CSV of the lab workbook, one tab per widget)
     2) if the request fails, the tab is missing (gviz then silently returns
        the FIRST tab, so the header is checked against `required`) or the
        tab has no rows → <root>/data/<tab>.json (bundled copy of the site)
   Resolves { rows: [...], source: "sheet" | "inline" | "json" }.
   Paste builds (dist/*-embed.html) set window.ADAM_ROOT (absolute Pages URL,
   for assets/…) and window.ADAM_INLINE[tab] (rows baked in instead of JSON).

   Also exposes helpers shared by every widget: parseCsv, normalizeDate
   (accepts '2026-08-21', '2026. 8. 21', '26.08.21'), normalizeMonth,
   safeUrl, asset (repo-relative paths, Google Drive share links), el, debounce. */
(function () {
  var ADAM = window.ADAM = window.ADAM || {};

  var script = document.currentScript ||
    Array.prototype.slice.call(document.scripts).filter(function (s) {
      return /sheet-loader\.js/.test(s.src);
    })[0];
  /* Repo root (…/adam-lab-widgets/) = parent of /shared/. */
  ADAM.root = window.ADAM_ROOT ||
    (script && script.src ? new URL("../", script.src).href : new URL("./", location.href).href);

  function pad(n) { return String(n).padStart(2, "0"); }

  ADAM.normalizeDate = function (value) {
    var s = String(value == null ? "" : value).trim().replace(/\.$/, "");
    if (!s) return "";
    var iso = s.match(/^(\d{4})\s*[.\-/년]\s*(\d{1,2})\s*[.\-/월]\s*(\d{1,2})/);
    if (iso) return iso[1] + "-" + pad(iso[2]) + "-" + pad(iso[3]);
    var short = s.match(/^(\d{2})[.\-/](\d{1,2})[.\-/](\d{1,2})$/);
    if (short) return "20" + short[1] + "-" + pad(short[2]) + "-" + pad(short[3]);
    /* gviz "Date(2026,7,21)" (month is 0-based) */
    var gv = s.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})/);
    if (gv) return gv[1] + "-" + pad(+gv[2] + 1) + "-" + pad(gv[3]);
    return "";
  };

  /* '2026-03', '2026. 3', '2026.03', '26.03', '2026. 3. 1' → '2026-03'; '2026' → '2026'. */
  ADAM.normalizeMonth = function (value) {
    var s = String(value == null ? "" : value).trim().replace(/\.$/, "");
    if (!s) return "";
    var d = ADAM.normalizeDate(s);
    if (d) return d.slice(0, 7);
    var m = s.match(/^(\d{4})\s*[.\-/년]\s*(\d{1,2})/);
    if (m) return m[1] + "-" + pad(m[2]);
    m = s.match(/^(\d{2})\.(\d{1,2})$/);
    if (m) return "20" + m[1] + "-" + pad(m[2]);
    m = s.match(/^(\d{4})/);
    return m ? m[1] : "";
  };

  ADAM.safeUrl = function (value) {
    var raw = String(value || "").trim();
    if (!raw) return "";
    try {
      var url = new URL(raw, ADAM.root);
      if (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:") return url.href;
    } catch (err) { /* ignore */ }
    return "";
  };

  /* Image cell → URL. Repo paths (assets/…) resolve against the Pages root;
     Drive share links (…/file/d/<id>/view or open?id=<id>) become direct images. */
  ADAM.asset = function (value) {
    var raw = String(value || "").trim();
    if (!raw) return "";
    var id = raw.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]{10,})/);
    if (id) return "https://lh3.googleusercontent.com/d/" + id[1] + "=w800";
    return ADAM.safeUrl(raw);
  };

  ADAM.parseCsv = function (text) {
    var rows = [], row = [], cell = "", quoted = false;
    var s = String(text || "").replace(/^\uFEFF/, "");
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      if (quoted) {
        if (ch === '"') {
          if (s[i + 1] === '"') { cell += '"'; i++; } else quoted = false;
        } else cell += ch;
        continue;
      }
      if (ch === '"') quoted = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
      else if (ch !== "\r") cell += ch;
    }
    if (cell.length || row.length) { row.push(cell); rows.push(row); }
    if (!rows.length) return { header: [], rows: [] };
    var header = rows[0].map(function (h) { return String(h || "").trim().toLowerCase(); });
    var out = [];
    for (var r = 1; r < rows.length; r++) {
      if (rows[r].every(function (c) { return !String(c || "").trim(); })) continue;
      var obj = {};
      for (var c = 0; c < header.length; c++) {
        if (header[c]) obj[header[c]] = rows[r][c] != null ? String(rows[r][c]).trim() : "";
      }
      out.push(obj);
    }
    return { header: header, rows: out };
  };

  function fetchTimeout(url, ms, opts) {
    var ctrl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, ms);
    opts = opts || {};
    if (ctrl) opts.signal = ctrl.signal;
    return fetch(url, opts).finally(function () { clearTimeout(timer); });
  }

  ADAM.sheetUrl = function (tab) {
    var map = window.ADAM_SHEETS || {};
    if (typeof map[tab] === "string") return map[tab].trim();
    if (window.ADAM_SHEET_ID) {
      return "https://docs.google.com/spreadsheets/d/" + window.ADAM_SHEET_ID +
        "/gviz/tq?tqx=out:csv&headers=1&sheet=" + encodeURIComponent(tab);
    }
    return "";
  };

  ADAM.load = function (tab, opts) {
    opts = opts || {};
    var required = (opts.required || []).map(function (c) { return c.toLowerCase(); });
    var url = ADAM.sheetUrl(tab);
    var params = new URLSearchParams(location.search);
    if (params.get("source") === "json") url = "";

    function fromJson() {
      var inline = window.ADAM_INLINE && window.ADAM_INLINE[tab];
      if (Array.isArray(inline) && inline.length) return Promise.resolve({ rows: inline, source: "inline" });
      return fetchTimeout(ADAM.root + "data/" + tab + ".json", 8000, { cache: "no-cache" })
        .then(function (res) {
          if (!res.ok) throw new Error("json " + res.status);
          return res.json();
        })
        .then(function (data) {
          var list = Array.isArray(data) ? data : (data && data.items) || [];
          return { rows: list, source: "json" };
        });
    }

    if (!ADAM.safeUrl(url)) return fromJson();
    return fetchTimeout(url, 6000, { cache: "no-store", mode: "cors" })
      .then(function (res) {
        if (!res.ok) throw new Error("sheet " + res.status);
        return res.text();
      })
      .then(function (text) {
        var parsed = ADAM.parseCsv(text);
        var ok = required.every(function (c) { return parsed.header.indexOf(c) !== -1; });
        if (!ok) throw new Error("tab '" + tab + "' missing or wrong header");
        if (!parsed.rows.length) throw new Error("tab '" + tab + "' empty");
        return { rows: parsed.rows, source: "sheet" };
      })
      .catch(function (err) {
        if (window.console && console.info) console.info("[ADAM] " + tab + ": " + err.message + " → bundled JSON");
        return fromJson();
      });
  };

  /* Tiny DOM helper: el("div", {class: "x", text: "…", onclick: fn}, [children]) */
  ADAM.el = function (tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v;
        else if (k === "class") node.className = v;
        else if (k.slice(0, 2) === "on" && typeof v === "function") node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  };

  ADAM.debounce = function (fn, ms) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  };

  ADAM.params = new URLSearchParams(location.search);

  /* Normalised text for search (case/space-insensitive, strips * + marks). */
  ADAM.fold = function (s) {
    return String(s || "").toLowerCase().replace(/[*+·]/g, "").replace(/\s+/g, " ");
  };

  /* Lab PI names to emphasise in author lists. */
  ADAM.PI = ["S. Kwon", "권순조", "Soonjo Kwon"];
  ADAM.authors = function (text) {
    var frag = document.createDocumentFragment();
    String(text || "").split(/,\s*/).forEach(function (name, i, arr) {
      var clean = name.replace(/[*+]/g, "").trim();
      var isPI = ADAM.PI.indexOf(clean) !== -1;
      var span = ADAM.el("span", { class: isPI ? "au au-pi" : "au", text: name.trim() });
      frag.appendChild(span);
      if (i < arr.length - 1) frag.appendChild(document.createTextNode(", "));
    });
    return frag;
  };

  /* Research-topic vocabulary for publications/patents (`topics` column,
     semicolon-separated). Cells may use the id, the English or the Korean
     label; anything else is shown as a custom tag. Ids match scripts/tag_topics.py. */
  ADAM.TOPICS = [
    { id: "cad", en: "B-rep / CAD Modeling", short: "CAD Modeling", ko: "B-rep·CAD 모델링" },
    { id: "assembly", en: "Assembly & Mates", short: "Assembly", ko: "조립·체결" },
    { id: "am", en: "Additive Manufacturing", short: "Additive Mfg.", ko: "적층 제조" },
    { id: "kg", en: "Knowledge Graph / Ontology", short: "Knowledge Graph", ko: "지식 그래프·온톨로지" },
    { id: "llm", en: "LLM / Generative AI", short: "LLM · GenAI", ko: "LLM·생성형 AI" },
    { id: "mesh", en: "Mesh & Point Cloud", short: "Mesh · Point Cloud", ko: "메쉬·점군" },
    { id: "rl", en: "Reinforcement Learning", short: "Reinforcement Learning", ko: "강화학습" },
    { id: "edu", en: "CAD Education / Grading", short: "CAD Education", ko: "CAD 교육·자동 채점" },
    { id: "dt", en: "Digital Twin / Smart Manufacturing", short: "Digital Twin", ko: "디지털 트윈·스마트 제조" },
    { id: "lca", en: "Sustainability / LCA", short: "Sustainability", ko: "지속가능성·LCA" },
    { id: "routing", en: "Cable Routing", short: "Cable Routing", ko: "케이블 라우팅" },
    { id: "safety", en: "Safety & Evacuation", short: "Safety", ko: "안전·대피" },
    { id: "ship", en: "Shipbuilding / Ocean", short: "Ship · Ocean", ko: "조선·해양" },
    { id: "std", en: "Standards (ISO·STEP·AAS)", short: "Standards", ko: "표준 (ISO·STEP·AAS)" }
  ];
  function topicKey(s) { return String(s || "").toLowerCase().replace(/[\s·.\/&()_+-]+/g, ""); }
  var TOPIC_BY = {};
  ADAM.TOPICS.forEach(function (t, i) {
    t.order = i;
    [t.id, t.en, t.short, t.ko].forEach(function (k) { TOPIC_BY[topicKey(k)] = t; });
  });
  TOPIC_BY[topicKey("B-rep")] = TOPIC_BY[topicKey("CAD")] = ADAM.TOPICS[0];
  ADAM.topic = function (v) {
    var raw = String(v || "").trim(), k = topicKey(raw);
    if (!k) return null;
    return TOPIC_BY[k] || { id: "x-" + k, en: raw, short: raw, ko: raw, order: 900, custom: true };
  };
  ADAM.topics = function (cell) {
    var out = [], seen = {};
    String(cell || "").split(/[;,；\n]+/).forEach(function (part) {
      var t = ADAM.topic(part);
      if (t && !seen[t.id]) { seen[t.id] = 1; out.push(t); }
    });
    return out.sort(function (a, b) { return a.order - b.order; });
  };
  /* One clickable tag on an entry. */
  ADAM.topicTag = function (t, active, onPick) {
    var b = ADAM.el("button", { type: "button", class: "ax-tag", "aria-pressed": String(active),
      title: t.custom ? t.en : t.en + " · " + t.ko, text: t.short });
    b.addEventListener("click", function () { onPick(t.id); });
    return b;
  };
  /* Topic filter: a chip row (wide) + a select (narrow, CSS swaps them). */
  ADAM.topicFilter = function (onPick) {
    var el = ADAM.el;
    var row = el("div", { class: "ax-topics", role: "group", "aria-label": "연구 주제 Topics" });
    var sel = el("select", { class: "ax-select ax-topic-select", "aria-label": "연구 주제 Topics" });
    sel.addEventListener("change", function () { onPick(sel.value); });
    function update(present, counts, active) {
      row.innerHTML = ""; sel.innerHTML = "";
      row.hidden = sel.hidden = !present.length;
      if (!present.length) return;
      row.appendChild(el("span", { class: "ax-topics-lb", "aria-hidden": "true" }, [el("span", { text: "Topics" }), el("span", { class: "ko", text: "연구 주제" })]));
      var list = [{ id: "all", short: "All", en: "All topics", ko: "전체" }].concat(present);
      list.forEach(function (t) {
        var n = counts[t.id] || 0, on = active === t.id;
        var b = el("button", { type: "button", class: "ax-topic" + (t.id === "all" ? " all" : ""), "aria-pressed": String(on),
          disabled: !n && !on, title: t.id === "all" ? "전체 주제" : t.en + " · " + t.ko }, [
          el("span", { text: t.short }), el("span", { class: "n", text: String(n) })
        ]);
        b.addEventListener("click", function () { onPick(on && t.id !== "all" ? "all" : t.id); });
        row.appendChild(b);
        sel.appendChild(el("option", { value: t.id, text: t.id === "all" ? "ALL TOPICS · 전체 주제 (" + n + ")" : "# " + t.short + " · " + t.ko + " (" + n + ")" }));
      });
      sel.value = active;
    }
    return { row: row, select: sel, update: update };
  };

  ADAM.status = function (mount, message, kind) {
    mount.innerHTML = "";
    mount.appendChild(ADAM.el("p", { class: "adam-state " + (kind || ""), text: message }));
  };
})();
