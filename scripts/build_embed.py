#!/usr/bin/env python3
"""Build self-contained paste files dist/<name>-embed.html for every widget
(news included) — for Google Sites "Embed code" instead of "By URL".

Each file inlines tokens + widget CSS, config/sheets.js, the shared loader and
the widget JS. It still reads the Sheet first; the bundled rows
(window.ADAM_INLINE) are the fallback, and assets/… resolve against the live
Pages URL (window.ADAM_ROOT). Re-run after changing code or data/*.json.
"""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from make_pages import WIDGETS, FONTS  # noqa: E402

PAGES_ROOT = "https://soonjokwon.github.io/adam-lab-widgets/"
TOKENS = (ROOT / "shared" / "tokens.css").read_text(encoding="utf-8")
SHEETS = (ROOT / "config" / "sheets.js").read_text(encoding="utf-8")
LOADER = (ROOT / "shared" / "sheet-loader.js").read_text(encoding="utf-8")

for name, (title, css_files, js_file) in WIDGETS.items():
    css = "\n".join((ROOT / c).read_text(encoding="utf-8") for c in css_files)
    js = (ROOT / js_file).read_text(encoding="utf-8")
    data = json.loads((ROOT / "data" / f"{name}.json").read_text(encoding="utf-8"))
    rows = json.dumps(data["items"], ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
    scripts = "\n".join([SHEETS, LOADER, js])
    if re.search(r"</script", scripts + rows, flags=re.I):
        sys.exit(f"{name}: inlined script contains </script")
    doc = f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ADAM Lab · {title}</title>
  {FONTS}
  <style>
{TOKENS}
{css}
  </style>
</head>
<body>
  <div id="adam-{name}"></div>
  <script>
    window.ADAM_ROOT = {json.dumps(PAGES_ROOT)};
    window.ADAM_INLINE = {{ {json.dumps(name)}: {rows} }};
  </script>
  <script>
{scripts}
  </script>
</body>
</html>
"""
    out = ROOT / "dist" / f"{name}-embed.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(doc, encoding="utf-8")
    size = out.stat().st_size
    print(f"wrote {out.relative_to(ROOT)} ({size // 1024} KB)")
    if size > 400 * 1024:
        sys.exit(f"{name}: embed is {size} bytes, too large for a Sites embed box")
