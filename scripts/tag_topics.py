"""Assign research-topic tags to publications and patents from their titles.

Conservative keyword rules over a small fixed vocabulary; a title that matches
nothing stays blank. Writes a `topics` column (ids joined with "; ") into
templates/sheet/{publications,patents}.csv and data/{publications,patents}.json.
Existing non-empty `topics` cells are kept (manual edits win) unless --force.

The ids/labels must match TOPICS in shared/sheet-loader.js.
"""
import csv, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# id, English, Korean, regex over the title (case-insensitive unless noted)
TOPICS = [
    ("cad", "B-rep / CAD Modeling", "B-rep·CAD 모델링",
     r"b-?rep|boundary representation|경계 표현|\bCAD\b|캐드|feature-based|특징형상|persistent (naming|identi)|영구 식별자|"
     r"computer-aided design|re-imported|transcad|macro-parametric|parametric cad|level[- ]of[- ]detail|\bLOD\b|"
     r"feature recognition|machining feature|모델 (단순화|간략화)|데이터 간략화|기자재 간략화|형상 간략화"),
    ("assembly", "Assembly & Mates", "조립·체결",
     r"assembl|조립|체결|\bmates?\b"),
    ("am", "Additive Manufacturing", "적층 제조",
     r"additive|적층 ?제조|3d ?printing|3d ?프린팅|3차원 프린팅|\bFFF\b|\bFDM\b|\bRfAM\b"),
    ("kg", "Knowledge Graph / Ontology", "지식 그래프·온톨로지",
     r"knowledge|ontolog|온톨로지|지식"),
    ("llm", "LLM / Generative AI", "LLM·생성형 AI",
     r"\bLLM|large language model|\bRAG\b|생성형|generative(?! adversarial)"),
    ("mesh", "Mesh & Point Cloud", "메쉬·점군",
     r"\bmesh|메쉬|point cloud|점군"),
    ("rl", "Reinforcement Learning", "강화학습",
     r"reinforcement|강화 ?학습"),
    ("edu", "CAD Education / Grading", "CAD 교육·자동 채점",
     r"education|교육|grading|채점"),
    ("dt", "Digital Twin / Smart Manufacturing", "디지털 트윈·스마트 제조",
     r"digital twin|digital thread|디지털 트윈|스마트 제조|smart manufacturing"),
    ("lca", "Sustainability / LCA", "지속가능성·LCA",
     r"sustainab|지속가능|\bLCA\b|life ?cycle assessment|전과정평가|전생애주기평가|탄소|carbon|environmental|환경 영향|재활용"),
    ("routing", "Cable Routing", "케이블 라우팅",
     r"cable|케이블"),
    ("safety", "Safety & Evacuation", "안전·대피",
     r"evacuation|대피|탈출|\bfire\b|화재|군중|인파|끼임|safety|안전"),
    ("ship", "Shipbuilding / Ocean", "조선·해양",
     r"\bships?\b|shipbuilding|offshore|조선|해양|선체|모형선"),
    ("std", "Standards (ISO·STEP·AAS)", "표준 (ISO·STEP·AAS)",
     r"(?i:standard|표준|cfihos|iringtools|handover)|\bISO\b|OntoSTEP|\bSTEP\b|\bEXPRESS\b|\bAAS\b"),
]
CASE_SENSITIVE = {"std"}  # ISO / STEP / EXPRESS / AAS must be upper-case words (rest is (?i:...))
RX = {tid: re.compile(rx, 0 if tid in CASE_SENSITIVE else re.I) for tid, _, _, rx in TOPICS}
ORDER = [t[0] for t in TOPICS]


def tag(title):
    hits = [tid for tid in ORDER if RX[tid].search(title)]
    if "edu" in hits and "cad" in hits:  # "3D CAD 모델링 교육" is about teaching, not CAD kernels
        hits.remove("cad")
    return hits


def process(tab, force=False):
    csv_path = ROOT / "templates" / "sheet" / f"{tab}.csv"
    json_path = ROOT / "data" / f"{tab}.json"
    with open(csv_path, encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
        fields = list(rows[0].keys()) if rows else []
    if "topics" not in fields:
        fields.insert(fields.index("title") + 1, "topics")
    for r in rows:
        if force or not (r.get("topics") or "").strip():
            r["topics"] = "; ".join(tag(r["title"]))
    with open(csv_path, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows({k: r.get(k, "") for k in fields} for r in rows)
    data = json.loads(json_path.read_text(encoding="utf-8"))
    data["columns"] = fields
    data["items"] = [{k: r.get(k, "") for k in fields} for r in rows]
    json_path.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return rows


def main(force=False):
    out = {}
    for tab in ("publications", "patents"):
        rows = process(tab, force)
        counts = {tid: 0 for tid in ORDER}
        blank = 0
        for r in rows:
            ids = [s.strip() for s in r["topics"].split(";") if s.strip()]
            blank += not ids
            for i in ids:
                counts[i] = counts.get(i, 0) + 1
        out[tab] = (counts, blank, len(rows))
    return out


if __name__ == "__main__":
    res = main(force="--force" in sys.argv)
    for tab, (counts, blank, n) in res.items():
        print(tab, n, "rows,", blank, "blank:", ", ".join(f"{k} {v}" for k, v in counts.items() if v))
