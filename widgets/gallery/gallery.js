/* Photo gallery — sheet tab `gallery`. Columns: date,caption,image,group,link
   image: repo path (assets/gallery/…) or a public image URL / Google Drive share link.
   URL params: ?group=PNU|KIT */
(function () {
  var A = window.ADAM, el = A.el;
  var mount = document.getElementById("adam-gallery");
  if (!mount) return;
  var GROUP = { PNU: "ADAM Lab@PNU", KIT: "DADI Lab@KIT" };
  var state = { items: [], group: (A.params.get("group") || "all").toUpperCase(), open: -1, shown: [] };
  if (state.group === "ALL") state.group = "all";
  var refs = {};
  var ICON = {
    prev: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.2 2.4 4.6 8l5.6 5.6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    next: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.8 2.4 11.4 8l-5.6 5.6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    close: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 3 10 10M13 3 3 13" stroke="currentColor" stroke-width="1.6"/></svg>'
  };

  function normalize(rows) {
    var out = [];
    rows.forEach(function (r, i) {
      var img = A.asset(r.image), date = A.normalizeDate(r.date);
      if (!img) return;
      out.push({ date: date, caption: r.caption || "", image: img, group: String(r.group || "").trim().toUpperCase(), link: A.safeUrl(r.link), order: i });
    });
    out.sort(function (a, b) { return a.date === b.date ? a.order - b.order : (a.date < b.date ? 1 : -1); });
    return out;
  }

  function shell() {
    mount.innerHTML = "";
    refs.chips = el("div", { class: "ax-chips", role: "group", "aria-label": "앨범" });
    refs.count = el("span", { class: "ax-count", "aria-live": "polite" });
    refs.grid = el("div", { class: "gl-grid" });
    mount.appendChild(el("div", { class: "ax-root gl" }, [el("div", { class: "ax-bar" }, [refs.chips, el("span", { class: "ax-grow" }), refs.count]), refs.grid]));
    for (var i = 0; i < 4; i++) refs.grid.appendChild(el("div", { class: "ax-skel", style: "height:180px", "aria-hidden": "true" }));
  }

  function disp(d) { return d ? d.slice(2).replace(/-/g, ".") : "—"; }

  function render() {
    var groups = [];
    state.items.forEach(function (it) { if (it.group && groups.indexOf(it.group) === -1) groups.push(it.group); });
    refs.chips.innerHTML = "";
    [{ id: "all", lb: "All" }].concat(groups.map(function (g) { return { id: g, lb: GROUP[g] || g }; })).forEach(function (c) {
      var n = c.id === "all" ? state.items.length : state.items.filter(function (it) { return it.group === c.id; }).length;
      var b = el("button", { type: "button", class: "ax-chip", "aria-pressed": String(state.group === c.id) }, [el("span", { text: c.lb }), el("span", { class: "n", text: String(n) })]);
      b.addEventListener("click", function () { state.group = c.id; render(); });
      refs.chips.appendChild(b);
    });
    refs.chips.hidden = groups.length < 2;
    var shown = state.shown = state.items.filter(function (it) { return state.group === "all" || it.group === state.group; });
    refs.count.textContent = shown.length + " photos";
    refs.grid.innerHTML = "";
    var lastY = null;
    shown.forEach(function (it, i) {
      var y = it.date ? it.date.slice(0, 4) : "";
      if (y !== lastY) { refs.grid.appendChild(el("h3", { class: "gl-year", text: y || "—" })); lastY = y; }
      var card = el("button", { type: "button", class: "gl-card ax-in", "aria-label": (it.caption || "사진") + " 크게 보기" }, [
        el("div", { class: "gl-img" }, [el("img", { src: it.image, alt: it.caption, loading: i < 8 ? "eager" : "lazy" })]),
        el("div", { class: "gl-cap" }, [
          el("div", { class: "gl-top" }, [el("span", { class: "gl-date", text: disp(it.date) }), it.group ? el("span", { class: "gl-tag", text: "@" + it.group }) : null]),
          it.caption ? el("div", { class: "gl-text", text: it.caption }) : null
        ])
      ]);
      card.addEventListener("click", function () { openBox(i); });
      refs.grid.appendChild(card);
    });
  }

  function openBox(i) {
    closeBox();
    state.open = i;
    var it = state.shown[i];
    var img = el("img", { src: it.image, alt: it.caption });
    var prev = el("button", { type: "button", class: "gl-btn gl-prev", "aria-label": "이전 사진", html: ICON.prev });
    var next = el("button", { type: "button", class: "gl-btn gl-next", "aria-label": "다음 사진", html: ICON.next });
    var close = el("button", { type: "button", class: "gl-btn", "aria-label": "닫기", html: ICON.close });
    refs.box = el("div", { class: "gl-box", role: "dialog", "aria-modal": "true", "aria-label": it.caption || "사진" }, [
      el("div", { class: "gl-box-top" }, [el("span", { class: "ax-mono", text: (i + 1) + " / " + state.shown.length }), close]),
      el("div", { class: "gl-box-stage" }, [img, prev, next]),
      el("div", { class: "gl-box-cap" }, [el("span", { class: "d", text: disp(it.date) }), it.caption,
        it.link ? el("a", { href: it.link, target: "_blank", rel: "noopener", class: "ax-link", style: "margin-left:10px", text: "LINK" }) : null])
    ]);
    prev.addEventListener("click", function () { step(-1); });
    next.addEventListener("click", function () { step(1); });
    close.addEventListener("click", closeBox);
    refs.box.addEventListener("click", function (e) { if (e.target === refs.box || e.target.classList.contains("gl-box-stage")) closeBox(); });
    document.body.appendChild(refs.box);
    close.focus();
  }
  function step(d) { var n = state.shown.length; openBox((state.open + d + n) % n); }
  function closeBox() { if (refs.box) { refs.box.remove(); refs.box = null; } }
  document.addEventListener("keydown", function (e) {
    if (!refs.box) return;
    if (e.key === "Escape") closeBox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  function boot() {
    shell();
    A.load("gallery", { required: ["date", "caption", "image"] }).then(function (res) {
      state.items = normalize(res.rows);
      if (!state.items.length) { A.status(refs.grid, "표시할 사진이 없습니다."); return; }
      render();
    }).catch(function () { A.status(refs.grid, "사진을 불러오지 못했습니다."); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
