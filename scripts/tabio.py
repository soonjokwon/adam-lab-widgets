"""Read/write one sheet tab as templates/sheet/<tab>.csv (UTF-8 BOM) + data/<tab>.json."""
import csv, json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def read(tab):
    with open(ROOT / "templates" / "sheet" / f"{tab}.csv", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        return list(reader.fieldnames or []), list(reader)


def write(tab, fields, rows, meta=None, csv_too=True):
    rows = [{k: (r.get(k) or "") for k in fields} for r in rows]
    if csv_too:
        with open(ROOT / "templates" / "sheet" / f"{tab}.csv", "w", encoding="utf-8-sig", newline="") as f:
            w = csv.DictWriter(f, fieldnames=fields)
            w.writeheader()
            w.writerows(rows)
    path = ROOT / "data" / f"{tab}.json"
    data = json.loads(path.read_text(encoding="utf-8")) if path.exists() else {}
    if not isinstance(data, dict):
        data = {}
    data.update(meta or {})
    data["columns"] = fields
    data["items"] = rows
    path.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
