/* Latest News timeline. Vanilla, no dependencies.
   Load order:
   1) window.ADAM_NEWS_CSV_URL (or ADAM_SHEETS.news) → published Sheet CSV
   2) window.ADAM_NEWS_ITEMS (paste embed fallback)
   3) fetch window.ADAM_NEWS_FALLBACK_URL / data/news.json
   Hosted /news/ never bakes items in; content updates need no rebuild when CSV is set. */
(function () {
  var TAGS = ["Paper", "Award", "Project", "Event", "Member"];
  var TAG_KO = {
    All: "전체",
    Paper: "논문",
    Award: "수상",
    Project: "과제",
    Event: "행사",
    Member: "구성원"
  };

  var mount = document.getElementById("adam-news");
  if (!mount) return;

  var reduced = false;
  try {
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (err) {
    reduced = false;
  }

  var state = { items: [], filter: "All", source: "JSON" };

  function reduceMotionScroll() {
    return reduced ? "auto" : "smooth";
  }

  function safeUrl(value) {
    var raw = String(value || "").trim();
    if (!raw) return "";
    try {
      var url = new URL(raw, window.location.href);
      if (url.protocol === "http:" || url.protocol === "https:") return url.href;
    } catch (err) {
      if (/^https?:\/\//i.test(raw)) return raw;
      return "";
    }
    return "";
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function normalizeDate(value) {
    var s = String(value || "").trim().replace(/\.$/, "");
    var iso = s.match(/^(\d{4})\s*[.\-/]\s*(\d{1,2})\s*[.\-/]\s*(\d{1,2})/);
    if (iso) return iso[1] + "-" + pad(iso[2]) + "-" + pad(iso[3]);
    var short = s.match(/^(\d{2})[.\-/](\d{2})[.\-/](\d{2})$/);
    if (short) return "20" + short[1] + "-" + short[2] + "-" + short[3];
    return "";
  }

  function displayDate(iso) {
    if (!iso) return "—";
    return iso.slice(2).replace(/-/g, ".");
  }

  function canonTag(value) {
    var raw = String(value || "").trim();
    if (!raw) return "";
    for (var i = 0; i < TAGS.length; i++) {
      if (TAGS[i].toLowerCase() === raw.toLowerCase()) return TAGS[i];
    }
    return raw;
  }

  function normalizeItem(raw, index) {
    if (!raw || typeof raw !== "object") return null;
    var date = normalizeDate(raw.date);
    var titleKo = String(raw.title_ko || raw.title || "").trim();
    var titleEn = String(raw.title_en || "").trim();
    if (!date || (!titleKo && !titleEn)) return null;
    return {
      date: date,
      title_ko: titleKo || titleEn,
      title_en: titleEn,
      tag: canonTag(raw.tag),
      link: safeUrl(raw.link),
      image: safeUrl(raw.image),
      order: index
    };
  }

  function normalizeList(list) {
    var items = [];
    (list || []).forEach(function (raw, index) {
      var item = normalizeItem(raw, index);
      if (item) items.push(item);
    });
    items.sort(function (a, b) {
      if (a.date === b.date) return a.order - b.order;
      return a.date < b.date ? 1 : -1;
    });
    return items;
  }

  function parseCsv(text) {
    var rows = [];
    var row = [];
    var cell = "";
    var quoted = false;
    var s = String(text || "").replace(/^\uFEFF/, "");
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      if (quoted) {
        if (ch === '"') {
          if (s[i + 1] === '"') {
            cell += '"';
            i++;
          } else {
            quoted = false;
          }
        } else {
          cell += ch;
        }
        continue;
      }
      if (ch === '"') {
        quoted = true;
      } else if (ch === ",") {
        row.push(cell);
        cell = "";
      } else if (ch === "\n") {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else if (ch !== "\r") {
        cell += ch;
      }
    }
    if (cell.length || row.length) {
      row.push(cell);
      rows.push(row);
    }
    if (!rows.length) return [];
    var header = rows[0].map(function (h) {
      return String(h || "").trim().toLowerCase();
    });
    var out = [];
    for (var r = 1; r < rows.length; r++) {
      if (rows[r].every(function (c) { return !String(c || "").trim(); })) continue;
      var obj = {};
      for (var c = 0; c < header.length; c++) {
        if (!header[c]) continue;
        obj[header[c]] = rows[r][c] != null ? rows[r][c] : "";
      }
      out.push(obj);
    }
    return out;
  }

  function fetchTimeout(url, ms) {
    var ctrl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = setTimeout(function () {
      if (ctrl) ctrl.abort();
    }, ms);
    var opts = { cache: "no-store", mode: "cors" };
    if (ctrl) opts.signal = ctrl.signal;
    return fetch(url, opts).finally(function () { clearTimeout(timer); });
  }

  function shell() {
    mount.innerHTML =
      '<section class="adam-sheet" aria-roledescription="carousel" aria-label="ADAM Lab Latest News">' +
        '<div class="adam-toolbar">' +
          '<div class="adam-chips" role="toolbar" aria-label="소식 분류" data-ref="chips"></div>' +
        "</div>" +
        '<div class="news-row">' +
          '<div class="news-viewport">' +
            '<div class="news-track" tabindex="0" role="group" aria-label="소식 타임라인. 좌우 화살표로 이동합니다." data-ref="track"></div>' +
          "</div>" +
          '<div class="news-side-nav" aria-label="타임라인 이동">' +
            '<button type="button" data-ref="prev" aria-label="이전 소식">' +
              '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.2 2.4 4.6 8l5.6 5.6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>' +
            "</button>" +
            '<button type="button" data-ref="next" aria-label="다음 소식">' +
              '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.8 2.4 11.4 8l-5.6 5.6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>' +
            "</button>" +
          "</div>" +
        "</div>" +
        '<p class="adam-live" aria-live="polite" data-ref="live"></p>' +
      "</section>";
  }

  function ref(name) {
    return mount.querySelector('[data-ref="' + name + '"]');
  }

  function chipTag(el) {
    if (!el) return "";
    return el.getAttribute("data-tag") || "";
  }

  function visibleCards() {
    var track = ref("track");
    if (!track) return [];
    return Array.prototype.filter.call(
      track.querySelectorAll(".news-card"),
      function (card) { return !card.hasAttribute("hidden"); }
    );
  }

  function updateChrome() {
    var track = ref("track");
    var prev = ref("prev");
    var next = ref("next");
    if (!track) return;
    var max = track.scrollWidth - track.clientWidth;
    if (prev) prev.disabled = track.scrollLeft <= 2;
    if (next) next.disabled = max <= 2 || track.scrollLeft >= max - 2;
  }

  function measureCardWidth() {
    var track = ref("track");
    if (!track) return;
    var width = track.clientWidth;
    if (width <= 0) return;
    /* Leave room for the next card to peek; side nav sits outside the track. */
    var cardW;
    if (width < 360) cardW = Math.max(168, width - 28);
    else if (width < 520) cardW = Math.max(200, width - 40);
    else if (width < 800) cardW = Math.min(260, Math.max(220, width * 0.42));
    else cardW = Math.min(280, Math.max(240, width * 0.28));
    track.style.setProperty("--news-card-w", Math.round(cardW) + "px");
  }

  function stepSize() {
    var card = visibleCards()[0];
    if (!card) return 240;
    var styles = window.getComputedStyle(ref("track"));
    var gap = parseFloat(styles.columnGap || styles.gap) || 12;
    return card.getBoundingClientRect().width + gap;
  }

  function scrollByCard(dir) {
    var track = ref("track");
    if (!track) return;
    track.scrollBy({ left: dir * stepSize(), behavior: reduceMotionScroll() });
  }

  function setFilter(tag) {
    if (!tag) return;
    state.filter = tag;
    applyFilter();
  }

  function renderChips() {
    var present = {};
    state.items.forEach(function (item) {
      if (item.tag) present[item.tag] = true;
    });
    var tags = ["All"].concat(TAGS.filter(function (tag) { return present[tag]; }));
    Object.keys(present).forEach(function (tag) {
      if (tags.indexOf(tag) === -1) tags.push(tag);
    });
    var box = ref("chips");
    if (!box) return;
    box.innerHTML = "";
    tags.forEach(function (tag) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "adam-chip";
      btn.textContent = tag === "All" ? "ALL" : tag;
      btn.setAttribute("aria-pressed", tag === state.filter ? "true" : "false");
      btn.setAttribute("aria-label", (TAG_KO[tag] || tag) + " 소식만 보기");
      btn.setAttribute("data-tag", tag);
      box.appendChild(btn);
    });
  }

  function cardElement(item, index) {
    var card = document.createElement(item.link ? "a" : "article");
    card.className = "news-card" + (item.link ? " is-link" : "");
    card.setAttribute("data-tag", item.tag || "");
    if (item.link) {
      card.href = item.link;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    var node = document.createElement("span");
    node.className = "news-node";
    node.setAttribute("aria-hidden", "true");
    card.appendChild(node);

    if (item.image) {
      var img = document.createElement("img");
      img.className = "news-photo";
      img.alt = "";
      img.src = item.image;
      img.addEventListener("error", function () { img.remove(); });
      card.appendChild(img);
    }

    var top = document.createElement("div");
    top.className = "news-top";
    if (item.tag) {
      var tag = document.createElement("span");
      tag.className = "news-tag";
      tag.setAttribute("data-tag", item.tag);
      tag.textContent = item.tag;
      top.appendChild(tag);
    } else {
      top.appendChild(document.createElement("span"));
    }
    var time = document.createElement("time");
    time.className = "news-date";
    time.dateTime = item.date;
    time.textContent = displayDate(item.date);
    top.appendChild(time);
    card.appendChild(top);

    var rule = document.createElement("hr");
    rule.className = "news-rule";
    card.appendChild(rule);

    var title = document.createElement("h3");
    title.className = "news-title";
    title.lang = "ko";
    title.textContent = item.title_ko;
    card.appendChild(title);

    if (item.title_en) {
      var en = document.createElement("p");
      en.className = "news-en";
      en.lang = "en";
      en.textContent = item.title_en;
      card.appendChild(en);
    }

    var foot = document.createElement("div");
    foot.className = "news-foot";
    var det = document.createElement("span");
    det.className = "news-det";
    det.textContent = "DET " + pad(index + 1);
    var open = document.createElement("span");
    open.className = "news-open" + (item.link ? "" : " is-empty");
    open.textContent = item.link ? "OPEN ↗" : "NO REF";
    foot.appendChild(det);
    foot.appendChild(open);
    card.appendChild(foot);
    return card;
  }

  function markVisible() {
    var track = ref("track");
    if (!track) return;
    var root = track.getBoundingClientRect();
    track.querySelectorAll(".news-card").forEach(function (card) {
      if (card.hasAttribute("hidden") || card.classList.contains("is-in")) return;
      var rect = card.getBoundingClientRect();
      if (rect.width === 0) return;
      if (rect.right > root.left + 4 && rect.left < root.right - 4) {
        card.classList.add("is-in");
      }
    });
  }

  function watchCards() {
    var track = ref("track");
    if (!track) return;
    if (reduced || !("IntersectionObserver" in window)) {
      track.querySelectorAll(".news-card").forEach(function (card) {
        card.classList.add("is-in");
      });
      return;
    }
    try {
      if (track._io) track._io.disconnect();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { root: track, threshold: 0.25 });
      track._io = io;
      track.querySelectorAll(".news-card:not([hidden])").forEach(function (card) {
        io.observe(card);
      });
    } catch (err) {
      track.querySelectorAll(".news-card").forEach(function (card) {
        card.classList.add("is-in");
      });
    }
    requestAnimationFrame(markVisible);
  }

  function applyFilter() {
    var track = ref("track");
    if (!track) return;
    var shown = 0;
    track.querySelectorAll(".news-card").forEach(function (card) {
      var tag = card.getAttribute("data-tag") || "";
      var ok = state.filter === "All" || tag === state.filter;
      if (ok) {
        card.removeAttribute("hidden");
        shown += 1;
      } else {
        card.setAttribute("hidden", "");
        card.classList.remove("is-in");
      }
    });
    var empty = track.querySelector(".news-empty");
    if (!shown) {
      if (!empty) {
        empty = document.createElement("p");
        empty.className = "news-empty";
        empty.textContent = "이 분류의 소식이 없습니다.";
        track.appendChild(empty);
      }
      empty.removeAttribute("hidden");
    } else if (empty) {
      empty.setAttribute("hidden", "");
    }
    mount.querySelectorAll(".adam-chip").forEach(function (chip) {
      chip.setAttribute("aria-pressed", chipTag(chip) === state.filter ? "true" : "false");
    });
    try {
      track.scrollTo({ left: 0, behavior: "auto" });
    } catch (err) {
      track.scrollLeft = 0;
    }
    var live = ref("live");
    if (live) live.textContent = (TAG_KO[state.filter] || state.filter) + " " + shown + "건";
    measureCardWidth();
    updateChrome();
    requestAnimationFrame(function () {
      measureCardWidth();
      updateChrome();
      markVisible();
    });
    watchCards();
  }

  function renderItems() {
    var track = ref("track");
    if (!track) return;
    track.innerHTML = "";
    state.items.forEach(function (item, index) {
      track.appendChild(cardElement(item, index));
    });
    renderChips();
    measureCardWidth();
    applyFilter();
  }

  function showStatus(message) {
    var track = ref("track");
    if (!track) return;
    track.innerHTML = "";
    var p = document.createElement("p");
    p.className = "news-status";
    p.textContent = message;
    track.appendChild(p);
    var prev = ref("prev");
    var next = ref("next");
    if (prev) prev.disabled = true;
    if (next) next.disabled = true;
  }

  function showLoading() {
    var track = ref("track");
    if (!track) return;
    track.innerHTML = "";
    measureCardWidth();
    for (var i = 0; i < 3; i++) {
      var sk = document.createElement("div");
      sk.className = "news-skel";
      sk.setAttribute("aria-hidden", "true");
      track.appendChild(sk);
    }
    var live = ref("live");
    if (live) live.textContent = "소식을 불러오는 중입니다.";
  }

  function bind() {
    var chips = ref("chips");
    if (chips) {
      /* Delegation survives re-renders and avoids per-button closure issues in embeds. */
      chips.addEventListener("click", function (event) {
        var btn = event.target.closest ? event.target.closest(".adam-chip") : null;
        if (!btn || !chips.contains(btn)) return;
        event.preventDefault();
        event.stopPropagation();
        setFilter(chipTag(btn));
      });
    }

    var prev = ref("prev");
    var next = ref("next");
    if (prev) prev.addEventListener("click", function (event) {
      event.preventDefault();
      scrollByCard(-1);
    });
    if (next) next.addEventListener("click", function (event) {
      event.preventDefault();
      scrollByCard(1);
    });

    var track = ref("track");
    if (track) {
      track.addEventListener("scroll", function () {
        updateChrome();
        markVisible();
      }, { passive: true });
    }

    function onResize() {
      measureCardWidth();
      updateChrome();
      markVisible();
    }

    window.addEventListener("resize", onResize);
    if (typeof ResizeObserver === "function") {
      var ro = new ResizeObserver(onResize);
      ro.observe(mount);
      if (track) ro.observe(track);
    }

    mount.addEventListener("keydown", function (event) {
      var key = event.key;
      if (key !== "ArrowLeft" && key !== "ArrowRight" && key !== "Home" && key !== "End") return;
      var chipList = Array.prototype.slice.call(mount.querySelectorAll(".adam-chip"));
      var chipIndex = chipList.indexOf(document.activeElement);
      if (chipIndex !== -1 && (key === "ArrowLeft" || key === "ArrowRight")) {
        event.preventDefault();
        var focusNext = chipList[chipIndex + (key === "ArrowRight" ? 1 : -1)];
        if (focusNext) focusNext.focus();
        return;
      }
      if (chipIndex !== -1) return;
      event.preventDefault();
      var t = ref("track");
      if (!t) return;
      if (key === "Home") {
        try { t.scrollTo({ left: 0, behavior: reduceMotionScroll() }); }
        catch (err) { t.scrollLeft = 0; }
      } else if (key === "End") {
        try { t.scrollTo({ left: t.scrollWidth, behavior: reduceMotionScroll() }); }
        catch (err) { t.scrollLeft = t.scrollWidth; }
      } else {
        scrollByCard(key === "ArrowRight" ? 1 : -1);
      }
    });
  }

  function embeddedItems() {
    return Array.isArray(window.ADAM_NEWS_ITEMS) ? window.ADAM_NEWS_ITEMS : null;
  }

  function loadFallback() {
    var inline = embeddedItems();
    if (inline && inline.length) {
      return Promise.resolve(normalizeList(inline));
    }
    var url = window.ADAM_NEWS_FALLBACK_URL || "../../data/news.json";
    if (!url) return Promise.resolve([]);
    return fetch(url, { cache: "no-store" }).then(function (res) {
      if (!res.ok) throw new Error("news.json");
      return res.json();
    }).then(function (data) {
      var list = Array.isArray(data) ? data : (data && data.items) || [];
      return normalizeList(list);
    });
  }

  function loadCsv(url) {
    return fetchTimeout(url, 4500).then(function (res) {
      if (!res.ok) throw new Error("csv");
      return res.text();
    }).then(function (text) {
      return normalizeList(parseCsv(text));
    });
  }

  function boot() {
    shell();
    bind();
    var csvUrl = String(
      window.ADAM_NEWS_CSV_URL ||
      (window.ADAM_SHEETS && window.ADAM_SHEETS.news) ||
      ""
    ).trim();
    var inline = embeddedItems();

    function useJson(items) {
      state.items = items;
      state.source = "JSON";
      if (!items.length) {
        showStatus("소식을 불러오지 못했습니다.");
        return;
      }
      renderItems();
    }

    if (!safeUrl(csvUrl)) {
      if (inline) {
        useJson(normalizeList(inline));
        return;
      }
      showLoading();
      loadFallback().then(useJson).catch(function () {
        showStatus("소식을 불러오지 못했습니다.");
      });
      return;
    }

    showLoading();
    loadCsv(csvUrl).then(function (items) {
      if (!items.length) throw new Error("empty");
      state.items = items;
      state.source = "SHEET";
      renderItems();
    }).catch(function () {
      loadFallback().then(useJson).catch(function () {
        showStatus("소식을 불러오지 못했습니다.");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
