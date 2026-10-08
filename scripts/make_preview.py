#!/usr/bin/env python3
"""Try code changes on the live site without touching the real widgets.

  python3 scripts/make_preview.py            # copy shared/ widgets/ config/ → preview/, build preview/<name>/
  git add preview && git commit -m "preview" && git push
  → open https://soonjokwon.github.io/adam-lab-widgets/preview/<name>/  (same Sheet, same data/ and assets/)
  python3 scripts/make_preview.py --promote  # copy preview code back over the real files, rebuild pages
  python3 scripts/make_preview.py --clean    # delete preview/

Workflow: edit files inside preview/ (or edit the real files, run this, then
`git checkout` the real files), check the preview URL in a test Sites page,
then --promote, `python3 scripts/build_embed.py`, commit, and delete preview/.
The preview pages set window.ADAM_ROOT to the repo root, so data/*.json and
assets/… are shared with the real widgets — only the code differs.
"""
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from make_pages import WIDGETS, page, write_pages, ROOT  # noqa: E402

PREVIEW = ROOT / "preview"
CODE = ["shared", "widgets", "config"]


def build():
    for d in CODE:
        if (PREVIEW / d).exists() and "--fresh" not in sys.argv:
            continue  # keep edits already made inside preview/
        shutil.copytree(ROOT / d, PREVIEW / d, dirs_exist_ok=True,
                        ignore=shutil.ignore_patterns("index.html"))
    root_js = 'window.ADAM_ROOT = new URL("../../", location.href).href;'
    for name, (title, css, js) in WIDGETS.items():
        out = PREVIEW / name / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page(name, title, css, js, "../", PREVIEW, head_js=root_js), encoding="utf-8")
    print("preview ready:", ", ".join(f"preview/{n}/" for n in WIDGETS))


def promote():
    for d in CODE:
        shutil.copytree(PREVIEW / d, ROOT / d, dirs_exist_ok=True)
    write_pages(ROOT, ROOT)
    print("promoted preview code; run scripts/build_embed.py, commit, then make_preview.py --clean")


if __name__ == "__main__":
    if "--promote" in sys.argv:
        promote()
    elif "--clean" in sys.argv:
        shutil.rmtree(PREVIEW, ignore_errors=True); print("removed preview/")
    else:
        build()
