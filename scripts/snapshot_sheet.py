#!/usr/bin/env python3
"""Sheet → data/<tab>.json snapshot (the widgets' fallback when the Sheet is unreachable).

Run it after a batch of Sheet edits, then commit data/*.json:

  python3 scripts/snapshot_sheet.py              # all tabs
  python3 scripts/snapshot_sheet.py news awards  # some tabs
  python3 scripts/snapshot_sheet.py --csv        # also rewrite templates/sheet/<tab>.csv
  python3 scripts/snapshot_sheet.py --dry-run    # check only, write nothing

A tab is written only if its header contains that tab's signature columns —
gviz quietly returns the FIRST tab when a tab name does not exist, so a
missing/misspelled tab is reported and skipped instead of overwriting the
snapshot with another tab's rows. Each request times out after 20 s.
"""
import csv
import io
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tabio  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
CONFIG = (ROOT / "config" / "sheets.js").read_text(encoding="utf-8")
SHEET_ID = re.search(r'ADAM_SHEET_ID\s*=\s*"([^"]+)"', CONFIG).group(1)
# same as SIGNATURES in shared/sheet-loader.js
SIGNATURES = {
    "news": ["date", "title_ko", "tag"],
    "publications": ["type", "title", "venue"],
    "patents": ["title", "status", "number"],
    "awards": ["award", "recipients", "category"],
    "members": ["name_ko", "role", "status"],
    "projects": ["title", "funder", "org_role"],
    "talks": ["date", "title", "venue", "location"],
    "gallery": ["caption", "image"],
    "sections": ["block", "type", "text"],
}


def fetch(tab):
    url = (f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&headers=1&sheet="
           + urllib.parse.quote(tab))
    req = urllib.request.Request(url, headers={"User-Agent": "adam-lab-widgets snapshot"})
    with urllib.request.urlopen(req, timeout=20) as res:
        return res.read().decode("utf-8-sig")


def main(argv):
    flags = {a for a in argv if a.startswith("--")}
    tabs = [a for a in argv if not a.startswith("--")] or list(SIGNATURES)
    bad = 0
    for tab in tabs:
        try:
            text = fetch(tab)
        except Exception as err:  # network, 4xx, timeout
            print(f"✗ {tab}: fetch failed ({err})"); bad += 1; continue
        reader = csv.DictReader(io.StringIO(text))
        header = [h.strip() for h in (reader.fieldnames or [])]
        reader.fieldnames = header
        missing = [c for c in SIGNATURES.get(tab, []) if c not in header]
        if missing:
            print(f"✗ {tab}: tab missing or wrong header (no {', '.join(missing)}); got {header[:6]} — skipped"); bad += 1; continue
        fields = [h for h in header if h]
        rows = [{k: (r.get(k) or "").strip() for k in fields} for r in reader]
        rows = [r for r in rows if any(r.values())]
        old_fields, _ = (tabio.read(tab) if (ROOT / "templates" / "sheet" / f"{tab}.csv").exists() else ([], []))
        lost = [c for c in old_fields if c not in fields]
        note = f" (columns not in sheet: {', '.join(lost)})" if lost else ""
        print(f"✓ {tab}: {len(rows)} rows, {len(fields)} columns{note}")
        if "--dry-run" in flags:
            continue
        tabio.write(tab, fields, rows, meta={
            "source": f"Google Sheet {SHEET_ID} / tab {tab}",
            "extracted": datetime.now().strftime("%Y-%m-%d %H:%M"),
        }, csv_too="--csv" in flags)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
