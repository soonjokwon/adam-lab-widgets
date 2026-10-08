#!/usr/bin/env python3
"""Inline the Latest News widget into dist/news-embed.html."""

from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
TOKENS = (ROOT / "shared" / "tokens.css").read_text(encoding="utf-8")
SHEET = (ROOT / "shared" / "sheet.css").read_text(encoding="utf-8")
NEWS_CSS = (ROOT / "widgets" / "news" / "news.css").read_text(encoding="utf-8")
NEWS_JS = (ROOT / "widgets" / "news" / "news.js").read_text(encoding="utf-8")
SHEETS = (ROOT / "config" / "sheets.js").read_text(encoding="utf-8")
DATA = json.loads((ROOT / "data" / "news.json").read_text(encoding="utf-8"))

match = re.search(r"news\s*:\s*([\"'])(.*?)\1", SHEETS)
if not match:
    sys.exit("config/sheets.js: ADAM_SHEETS.news string not found")
csv_url = match.group(2).strip()

items = DATA["items"] if isinstance(DATA, dict) else DATA
payload = json.dumps(items, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
csv_js = json.dumps(csv_url)

html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ADAM Lab · Latest News</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
{TOKENS}
{SHEET}
{NEWS_CSS}
  </style>
</head>
<body>
  <div id="adam-news"></div>
  <script>
    window.ADAM_NEWS_CSV_URL = {csv_js};
    window.ADAM_NEWS_FALLBACK_URL = "";
    window.ADAM_NEWS_ITEMS = {payload};
  </script>
  <script>
{NEWS_JS}
  </script>
</body>
</html>
"""

js_block = NEWS_JS + payload
if "</" in js_block and re.search(r"</script", js_block, flags=re.I):
    sys.exit("inlined script contains a </script> sequence")

out = ROOT / "dist" / "news-embed.html"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(html, encoding="utf-8")
size = out.stat().st_size
print(f"wrote {out.relative_to(ROOT)} ({size} bytes)")
if size > 200 * 1024:
    sys.exit(f"embed is {size} bytes, over the 200 KB budget")
