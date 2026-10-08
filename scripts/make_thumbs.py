#!/usr/bin/env python3
"""Make gallery thumbnails: assets/gallery/<name>.jpg → assets/gallery/thumbs/<name>-480.jpg
(480 px wide, 4:3 centre crop — the grid shows 4:3 tiles). Re-run after adding photos."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "gallery"
OUT = SRC / "thumbs"
OUT.mkdir(exist_ok=True)
W, H = 480, 360
for p in sorted(SRC.glob("*.jp*g")):
    dest = OUT / f"{p.stem}-480.jpg"
    if dest.exists() and dest.stat().st_mtime >= p.stat().st_mtime:
        continue
    im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
    ImageOps.fit(im, (W, H), Image.LANCZOS, centering=(0.5, 0.4)).save(dest, "JPEG", quality=80, optimize=True, progressive=True)
    print("thumb", dest.relative_to(ROOT), dest.stat().st_size // 1024, "KB")
