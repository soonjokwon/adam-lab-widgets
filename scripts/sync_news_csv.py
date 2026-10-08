#!/usr/bin/env python3
"""Refresh templates/sheet/news.csv from data/news.json."""

from pathlib import Path
import csv
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "data" / "news.json").read_text(encoding="utf-8"))
items = DATA["items"] if isinstance(DATA, dict) else DATA
fields = (DATA.get("columns") if isinstance(DATA, dict) else None) or ["date", "title_ko", "title_en", "tag", "link", "image", "link2"]
out = ROOT / "templates" / "sheet" / "news.csv"
out.parent.mkdir(parents=True, exist_ok=True)
with out.open("w", encoding="utf-8-sig", newline="") as fh:
    writer = csv.DictWriter(fh, fieldnames=fields, lineterminator="\n")
    writer.writeheader()
    for item in items:
        writer.writerow({key: item.get(key, "") for key in fields})
print(f"wrote {out.relative_to(ROOT)} ({len(items)} rows)", file=sys.stderr)
