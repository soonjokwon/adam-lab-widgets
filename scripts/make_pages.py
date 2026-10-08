#!/usr/bin/env python3
"""Generate the URL-embed pages /<name>/index.html and dev previews
widgets/<name>/index.html for every sheet-driven widget (news is hand-made)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700'
         '&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">')

# name: (title, [css under repo root], js under repo root)
WIDGETS = {
    "publications": ("Publications", ["shared/page-publications.css"], "widgets/publications/publications.js"),
    "patents": ("Patents", ["shared/page-publications.css"], "widgets/patents/patents.js"),
    "awards": ("Awards", ["widgets/awards/awards.css"], "widgets/awards/awards.js"),
    "members": ("Team", ["widgets/members/members.css"], "widgets/members/members.js"),
    "projects": ("Research Projects", ["widgets/projects/projects.css"], "widgets/projects/projects.js"),
    "talks": ("Invited Talks", ["widgets/talks/talks.css"], "widgets/talks/talks.js"),
    "gallery": ("Photos", ["widgets/gallery/gallery.css"], "widgets/gallery/gallery.js"),
}

def page(name, title, css, js, up):
    links = "\n  ".join(f'<link rel="stylesheet" href="{up}{c}">' for c in ["shared/tokens.css", "shared/base.css"] + css)
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ADAM Lab · {title}</title>
  <meta name="robots" content="noindex">
  {FONTS}
  {links}
</head>
<body>
  <div id="adam-{name}"></div>
  <script src="{up}config/sheets.js"></script>
  <script src="{up}shared/sheet-loader.js"></script>
  <script src="{up}{js}"></script>
</body>
</html>
"""

if __name__ == "__main__":
    for name, (title, css, js) in WIDGETS.items():
        for path, up in ((ROOT / name / "index.html", "../"), (ROOT / "widgets" / name / "index.html", "../../")):
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(page(name, title, css, js, up), encoding="utf-8")
        print("wrote", name)
