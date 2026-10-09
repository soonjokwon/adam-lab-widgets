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

# id, English, Korean (full), Korean (chip), regex over the title (case-insensitive unless noted)
TOPICS = [
    ("cad", "B-rep / CAD Modeling", "B-rep·CAD 모델링", "CAD 모델링",
     r"b-?rep|boundary representation|경계 표현|\bCAD\b|캐드|feature-based|특징형상|persistent (naming|identi)|영구 식별자|"
     r"computer-aided design|re-imported|transcad|macro-parametric|parametric cad|level[- ]of[- ]detail|\bLOD\b|"
     r"feature recognition|machining feature|모델 (단순화|간략화)|데이터 간략화|기자재 간략화|형상 간략화|"
     r"shape distribution|shape similarity|형상 유사도|engineering change|설계 변경|"
     r"plant 3d design|3d shape|3 ?차원 (설계|형상)|중립 모델"),
    ("assembly", "Assembly & Mates", "조립·메이트", "조립·메이트",
     r"assembl|조립|체결|\bmates?\b"),
    ("am", "Additive Manufacturing", "적층제조", "적층제조",
     r"additive|적층 ?제조|3d ?printing|3d ?프린팅|3차원 프린팅|\bFFF\b|\bFDM\b|\bRfAM\b"),
    ("kg", "Knowledge Graph / Ontology", "지식 그래프·온톨로지", "지식그래프",
     r"knowledge graph|ontolog|온톨로지|지식 ?그래프"),
    ("llm", "LLM / Generative AI", "LLM·생성형 AI", "LLM·생성형AI",
     r"\bLLM|large language model|\bRAG\b|생성형|generative(?! adversarial)"),
    ("mesh", "Mesh & Point Cloud", "메쉬·점군", "메쉬·점군",
     r"\bmesh|메쉬|point cloud|점군"),
    ("rl", "Reinforcement Learning", "강화학습", "강화학습",
     r"reinforcement|강화 ?학습"),
    ("edu", "CAD Education / Grading", "CAD 교육·자동 채점", "CAD 교육",
     r"education|교육|grading|채점"),
    ("design", "Product Design", "제품 설계", "제품 설계",
     r"접이식 의자|탁자 설계|마우스"),
    ("dt", "Digital Twin / Smart Manufacturing", "디지털 트윈·스마트 제조", "디지털 트윈",
     r"digital twin|digital thread|디지털 트윈|스마트 제조|smart manufacturing"),
    ("lca", "Sustainability / LCA", "지속가능성·LCA", "지속가능성",
     r"sustainab|지속가능|\bLCA\b|life ?cycle assessment|전과정평가|전생애주기평가|탄소|carbon|environmental|환경 영향|재활용"),
    ("routing", "Cable Routing", "케이블 라우팅", "케이블 라우팅",
     r"cable|케이블"),
    ("safety", "Safety & Evacuation", "안전·대피", "안전·대피",
     r"evacuation|대피|탈출|\bfire\b|화재|군중|인파|끼임|safety|안전"),
    ("ship", "Shipbuilding / Ocean", "조선·해양", "조선·해양",
     r"\bships?\b|shipbuilding|offshore|조선|해양|선체|모형선"),
    ("std", "Standards (ISO·STEP·AAS)", "표준 (ISO·STEP·AAS)", "표준",
     r"(?i:standard|표준|cfihos|iringtools|handover|reference data|참조 데이터)|\bISO\b|OntoSTEP|\bSTEP\b|\bEXPRESS\b|\bAAS\b"),
]
CASE_SENSITIVE = {"std"}  # ISO / STEP / EXPRESS / AAS must be upper-case words (rest is (?i:...))
RX = {t[0]: re.compile(t[-1], 0 if t[0] in CASE_SENSITIVE else re.I) for t in TOPICS}
ORDER = [t[0] for t in TOPICS]


def tag(title):
    hits = [tid for tid in ORDER if RX[tid].search(title)]
    if "edu" in hits and "cad" in hits:  # "3D CAD 모델링 교육" is about teaching, not CAD kernels
        hits.remove("cad")
    if "design" in hits and "cad" in hits:  # "커스텀 마우스의 3D 모델 생성" = product design
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


PREFIX = {"journal-intl": "IJ", "journal-kr": "KJ", "conf-intl": "IC", "conf-kr": "KC", "in-prep": "P"}
REPO = "https://github.com/soonjokwon/adam-lab-widgets/blob/main/"


def write_review():
    """docs/topic_review.md — every tag assignment on one page, for the professor to check."""
    label = {t[0]: t for t in TOPICS}
    def rows(tab):
        with open(ROOT / "templates" / "sheet" / f"{tab}.csv", encoding="utf-8-sig", newline="") as f:
            for i, r in enumerate(csv.DictReader(f)):
                ref = (PREFIX.get(r.get("type", ""), "") if tab == "publications" else "P") + (r.get("no") or "")
                if tab == "publications" and r.get("type") == "in-prep":
                    ref = "준비중"
                ids = [x.strip() for x in (r.get("topics") or "").split(";") if x.strip()]
                yield i + 2, ref, r["title"], ids
    out = ["# 연구 주제 태그 검토표", "",
           "논문·특허의 `topics` 칸(시트)에 들어간 태그를 주제별로 모았습니다. 제목 키워드로 **보수적으로** 자동 지정한 값이며,",
           "틀린 태그는 시트에서 해당 행의 `topics` 칸만 고치면 됩니다(여러 개는 `;`로 구분, 예: `am; rl`).",
           "`행` = 시트의 행 번호(1행은 머리글). 이 파일은 `python3 scripts/tag_topics.py`가 다시 만듭니다.", "",
           "| ID | 칩에 보이는 이름 | 정식 이름 | 논문 | 특허 |", "| --- | --- | --- | ---: | ---: |"]
    data = {tab: list(rows(tab)) for tab in ("publications", "patents")}
    for t in TOPICS:
        n = {tab: sum(t[0] in r[3] for r in data[tab]) for tab in data}
        out.append(f"| `{t[0]}` | {t[3]} | {t[2]} / {t[1]} | {n['publications']} | {n['patents']} |")
    out.append("")
    for t in TOPICS + [("", "", "태그 없음", "태그 없음", "")]:
        out.append(f"## {t[3]}" + (f" (`{t[0]}`)" if t[0] else ""))
        out.append("")
        for tab, name in (("publications", "논문"), ("patents", "특허")):
            hits = [r for r in data[tab] if (t[0] in r[3] if t[0] else not r[3])]
            if not hits:
                continue
            out.append(f"**{name}** ({len(hits)})")
            out.append("")
            for row, ref, title, ids in hits:
                others = ", ".join(label[x][3] for x in ids if x != t[0] and x in label)
                out.append(f"- 행 {row} · {ref} · {title}" + (f" — 함께: {others}" if others else ""))
            out.append("")
    (ROOT / "docs" / "topic_review.md").write_text("\n".join(out) + "\n", encoding="utf-8")


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
    write_review()
    return out


if __name__ == "__main__":
    res = main(force="--force" in sys.argv)
    for tab, (counts, blank, n) in res.items():
        print(tab, n, "rows,", blank, "blank:", ", ".join(f"{k} {v}" for k, v in counts.items() if v))
