#!/usr/bin/env python3
"""Generate the URL-embed pages /<name>/index.html (what Google Sites embeds)
and dev previews widgets/<name>/index.html for every widget, news included.

Every CSS/JS include gets ?v=<content hash> so a code change is never hidden
by a stale browser/CDN cache — re-run this after editing shared/ or widgets/.

  python3 scripts/make_pages.py                 # main pages
  python3 scripts/make_pages.py --out preview   # used by make_preview.py
"""
import hashlib
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700'
         '&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">')

# name: (title, [css under repo root], js under repo root)
WIDGETS = {
    "news": ("Latest News", ["shared/sheet.css", "widgets/news/news.css"], "widgets/news/news.js"),
    "publications": ("Publications", ["shared/base.css", "shared/page-publications.css"], "widgets/publications/publications.js"),
    "patents": ("Patents", ["shared/base.css", "shared/page-publications.css"], "widgets/patents/patents.js"),
    "awards": ("Awards", ["shared/base.css", "widgets/awards/awards.css"], "widgets/awards/awards.js"),
    "members": ("Team", ["shared/base.css", "widgets/members/members.css"], "widgets/members/members.js"),
    "projects": ("Research Projects", ["shared/base.css", "widgets/projects/projects.css"], "widgets/projects/projects.js"),
    "talks": ("Invited Talks", ["shared/base.css", "widgets/talks/talks.css"], "widgets/talks/talks.js"),
    "gallery": ("Photos", ["shared/base.css", "widgets/gallery/gallery.css"], "widgets/gallery/gallery.js"),
    "sections": ("Text blocks", ["shared/base.css", "widgets/sections/sections.css"], "widgets/sections/sections.js"),
}
NEWS_STYLE = """  <style>
    /* Standalone URL-embed page: fill the Sites iframe, no chrome. */
    html, body { background: transparent; }
    #adam-news { max-height: none; height: 100%; }
  </style>
"""


def ver(rel, src_root):
    return hashlib.sha1((src_root / rel).read_bytes()).hexdigest()[:8]


def page(name, title, css, js, up, src_root, head_js=""):
    links = "\n  ".join(f'<link rel="stylesheet" href="{up}{c}?v={ver(c, src_root)}">' for c in ["shared/tokens.css"] + css)
    scripts = "\n  ".join(f'<script src="{up}{s}?v={ver(s, src_root)}"></script>'
                          for s in ["config/sheets.js", "shared/sheet-loader.js", js])
    extra = NEWS_STYLE if name == "news" else ""
    if head_js:
        scripts = f"<script>{head_js}</script>\n  " + scripts
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ADAM Lab · {title}</title>
  <meta name="robots" content="noindex">
  {FONTS}
  {links}
{extra}</head>
<body>
  <div id="adam-{name}"></div>
  {scripts}
</body>
</html>
"""


def write_pages(base, src_root, dev=True):
    for name, (title, css, js) in WIDGETS.items():
        targets = [(base / name / "index.html", "../")]
        if dev:
            targets.append((base / "widgets" / name / "index.html", "../../"))
        for path, up in targets:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(page(name, title, css, js, up, src_root), encoding="utf-8")
        print("wrote", path.parent.relative_to(ROOT) if path.is_relative_to(ROOT) else path.parent)


if __name__ == "__main__":
    if "--out" in sys.argv:
        out = ROOT / sys.argv[sys.argv.index("--out") + 1]
        write_pages(out, out, dev=False)
    else:
        write_pages(ROOT, ROOT)
