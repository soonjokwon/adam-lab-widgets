#!/usr/bin/env python3
"""One-off extractor: public Google Sites HTML -> sheet CSV templates + data/*.json.

Usage: python3 scripts/extract_site.py <dump_dir> [--no-images]
  <dump_dir> holds curl'd pages: team.html research.html team_professor.html
  publications.html awards.html board.html (and the *.txt made by the same
  text walker below). Content is copied as published; only the fixes listed
  in docs/site_audit.md marked 확실 are applied (see FIXES).

WARNING: this was the 2026-10 bootstrap. The CSV/JSON were edited afterwards
(projects.recruit/hidden, news backfill + link2, topics). Once the Google
Sheet tabs exist the Sheet is the source of truth — use
scripts/snapshot_sheet.py to refresh data/*.json instead of re-running this.
"""
import csv, io, json, re, sys, urllib.parse as up, urllib.request
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Tag

ROOT = Path(__file__).resolve().parents[1]
DUMP = Path(sys.argv[1])
IMAGES = "--no-images" not in sys.argv
EXTRACTED = "2026-10-08"
SOURCE = "https://sites.google.com/view/adam-pnu"

# ---------- text walker (same as used for the audit) ----------
BLOCK = {'p','div','li','h1','h2','h3','h4','h5','h6','br','tr','section'}
def dec(h):
    if 'google.com/url?' in h:
        return up.parse_qs(up.urlparse(h).query).get('q', [h])[0]
    return h
def page_lines(name):
    s = BeautifulSoup((DUMP / f"{name}.html").read_text(encoding="utf-8"), "lxml")
    for t in s(['script','style','noscript']): t.decompose()
    out = []
    def walk(n):
        for c in n.children:
            if isinstance(c, NavigableString): out.append(str(c))
            elif isinstance(c, Tag):
                if c.name in BLOCK: out.append('\n')
                if c.name == 'a' and c.get('href') and not c['href'].startswith('/view/adam-pnu') and not c['href'].startswith('#'):
                    walk(c); out.append(f" <{dec(c['href'])}>")
                else: walk(c)
                if c.name in BLOCK: out.append('\n')
    walk(s.body)
    txt = re.sub(r'[ \t\xa0]+', ' ', ''.join(out))
    return [l.strip() for l in txt.split('\n') if l.strip()]

def soup(name):
    return BeautifulSoup((DUMP / f"{name}.html").read_text(encoding="utf-8"), "lxml")

def fix_url(u):
    u = (u or "").strip()
    u = re.sub(r'^https?://dx\.doi\.org/', 'https://doi.org/', u)
    return u

def ym(s):
    """'26.03' -> 2026-03, '2026.03' -> 2026-03, '26.XX' -> 2026."""
    s = s.strip().replace(' ', '')
    m = re.match(r'^(\d{2}|\d{4})\.(\d{1,2})$', s)
    if m:
        y = m.group(1); y = y if len(y) == 4 else '20' + y
        return f"{y}-{int(m.group(2)):02d}"
    m = re.match(r'^(\d{2}|\d{4})\.', s)
    if m:
        y = m.group(1); return y if len(y) == 4 else '20' + y
    return ""

def dotdate(s):
    m = re.search(r'(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})', s)
    return f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}" if m else ""

AUTHOR_FIXES = [("이승현 김현철", "이승현, 김현철"), ("정진호,신규태", "정진호, 신규태")]
def fix_authors(a):
    for x, y in AUTHOR_FIXES: a = a.replace(x, y)
    return a

def download(url, dest, width):
    if not IMAGES: return
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists(): return
    base = re.sub(r'=w\d+$', '', url)
    from PIL import Image
    import subprocess
    data = subprocess.run(["curl", "-sfL", "--max-time", "20", url], check=True, capture_output=True).stdout
    im = Image.open(io.BytesIO(data))
    if im.mode not in ("RGB", "L"): im = im.convert("RGBA")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    if dest.suffix == ".jpg":
        im.convert("RGB").save(dest, "JPEG", quality=82, optimize=True, progressive=True)
    else:
        im.save(dest, optimize=True)

def write(tab, fields, rows, note):
    p = ROOT / "templates" / "sheet" / f"{tab}.csv"
    with p.open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=fields, lineterminator="\n")
        w.writeheader()
        for r in rows: w.writerow({k: r.get(k, "") for k in fields})
    j = ROOT / "data" / f"{tab}.json"
    j.write_text(json.dumps({"source": SOURCE, "extracted": EXTRACTED, "note": note,
                             "columns": fields, "items": [{k: r.get(k, "") for k in fields} for r in rows]},
                            ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{tab}: {len(rows)} rows")

# ---------- publications + patents ----------
CONF_RX = re.compile(r'(학술대회|학술발표회|Conference|ICMPT|ICMDT|AeroNDT|ICD3DP|i3CDE|CAD’19|Web3D|ISCDE|ACDDE|ICMTE|컨퍼런스|Meeting|워크숍)')
SECTIONS = {"Papers in Preparation": "in-prep", "International Journal Papers": "journal-intl",
            "Korean Journal Papers": "journal-kr", "International Conferences": "conf-intl",
            "Korean Conferences": "conf-kr", "Korean Patents": "patent"}
def split_tags(rest):
    notes, extra = [], []
    while True:
        m = re.search(r'\s*\[([^\[\]<]+?)(?:\s*<([^>]+)>)?\]\s*\.?$', rest)
        if not m: break
        (extra if m.group(2) else notes).insert(0, (m.group(1).strip(), fix_url(m.group(2) or "")))
        rest = rest[:m.start()].rstrip()
    return rest, notes, extra

pubs, patents = [], []
sect = None
for line in page_lines("publications"):
    if line in SECTIONS: sect = SECTIONS[line]; continue
    if sect is None: continue
    if sect == "in-prep":
        m = re.match(r'^(.*), (In preparation|In revision)\.$', line)
        if m:
            pubs.append({"type": "in-prep", "title": m.group(1), "status": m.group(2).lower().replace(' ', '-')})
        continue
    m = re.match(r'^(\d+)\. (.*)$', line)
    if not m: continue
    no, body = m.group(1), m.group(2)
    if sect == "patent":
        pm = re.match(r'^(.*?)(?: <([^>]+)>)?, (출원번호|등록번호): ([0-9-]+), (\d{4}\.\d{2}\.\d{2})\.(?: \((.*)\))?$', body)
        patents.append({"no": no, "title": pm.group(1), "status": "filed" if pm.group(3) == "출원번호" else "registered",
                        "number": pm.group(4), "date": dotdate(pm.group(5)), "link": fix_url(pm.group(2) or ""),
                        "note": pm.group(6) or ""})
        continue
    ym_ = re.search(r', (\d{4}), ', body)
    authors, rest = body[:ym_.start()], body[ym_.end():]
    rest, notes, extra = split_tags(rest)
    link = ""
    lm = re.match(r'^(.*?) <([^>]+)>, (.*)$', rest)
    if lm:
        title, link, tail = lm.group(1), fix_url(lm.group(2)), lm.group(3)
        segs = tail.split(", ")
    else:
        segs = rest.split(", ")
        if sect.startswith("conf"):
            i = next(i for i in range(1, len(segs)) if CONF_RX.search(segs[i]))
        else:
            i = len(segs) - 2
        title, segs = ", ".join(segs[:i]), segs[i:]
    venue, details = segs[0], ", ".join(segs[1:]).rstrip(". ")
    presentation = ""
    pm = re.search(r'\s*\((Poster|포스터)\)$', details)
    if pm: presentation = "poster"; details = details[:pm.start()].rstrip(". ")
    status = "published"
    if "게재 예정" in details: status = "in-press"
    if sect.startswith("conf"):
        status = "presented"
        d = re.search(r'\((\d{2})\.(\d{2})\.\)', details)
        start = re.search(r'(\d{4})\.(\d{2})\.(\d{2})', details)
        date = f"{start.group(1)}-{d.group(1)}-{d.group(2)}" if (d and start) else (dotdate(details))
    else:
        date = ""
    pubs.append({"type": sect, "no": no, "year": ym_.group(1), "authors": fix_authors(authors), "title": title,
                 "venue": venue, "details": details, "date": date, "presentation": presentation, "status": status,
                 "link": link, "note": "; ".join(n for n, _ in notes),
                 "extra_label": extra[0][0] if extra else "", "extra_link": extra[0][1] if extra else ""})
    if len(extra) > 1: print("WARN multiple extra links", no, extra)

write("publications", ["type","no","year","authors","title","venue","details","date","presentation","status","link","note","extra_label","extra_link"],
      pubs, "Publications page (Journals, Conferences). type: in-prep | journal-intl | journal-kr | conf-intl | conf-kr.")
write("patents", ["no","title","status","number","date","link","note"], patents,
      "Publications page · Patents (특허). status: registered(등록) | filed(출원).")

# ---------- awards ----------
NAME_RX = re.compile(r'^([가-힣]{2,4}|[A-Z]\.(?: ?[A-Z]\.)? ?[A-Z][a-z]+)$')
ASECT = {"Papers (논문)": "paper", "Presentations (발표)": "presentation", "Competitions (경진대회)": "competition"}
awards, sect = [], None
for line in page_lines("awards"):
    if line in ASECT: sect = ASECT[line]; continue
    if not sect or not re.search(r'\d{4}\.\d{2}\.\d{2}\.?\s*$', line): continue
    line = fix_authors(line).strip()
    link = ""
    lm = re.search(r' <([^>]+)>', line)
    if lm: link = fix_url(lm.group(1)); line = line[:lm.start()] + line[lm.end():]
    segs = [s.strip() for s in line.rstrip(". ").split(", ")]
    award, i, rec = segs[0], 1, []
    while i < len(segs) and NAME_RX.match(segs[i]): rec.append(segs[i]); i += 1
    if i < len(segs) and re.fullmatch(r'\d{4}', segs[i]): i += 1
    rest = segs[i:]
    date = dotdate(rest[-1])
    row = {"date": date, "category": sect, "award": award, "recipients": ", ".join(rec), "link": link}
    if sect == "paper":
        row.update(title=rest[0], event=", ".join(rest[1:-2]), organizer=rest[-2])
    elif sect == "presentation":
        row.update(title=", ".join(rest[:-2]), event=rest[-2], organizer="")
    else:
        row.update(title="", event=", ".join(rest[:-2]), organizer=rest[-2])
    awards.append(row)
write("awards", ["date","category","award","recipients","title","event","organizer","link"], awards,
      "Awards page. category: paper(논문) | presentation(발표) | competition(경진대회).")

# ---------- members ----------
ROLE_OF = [("교수", "professor"), ("박사후", "postdoc"), ("석박사통합", "ms-phd"), ("박사과정", "phd"),
           ("석사", "ms"), ("학사", "undergrad"), ("학부", "undergrad")]
def role_of(pos):
    for k, v in ROLE_OF:
        if k in pos: return v
    return ""
s = soup("team")
members, cur_img, n = [], None, 0
heads = s.body.find_all(['img', 'h2', 'h3', 'p'])
lines = page_lines("team")
# current members: img -> h2 name -> p position
idx = 0
while idx < len(heads):
    el = heads[idx]
    if el.name == 'img' and 'sitesv-images-rt' in el.get('src', '') and '=w1280' in el.get('src', ''):
        cur_img = el['src']
    elif el.name == 'h2' and cur_img:
        name = re.sub(r'\s+', ' ', el.get_text('', strip=True)).strip()
        if name == "We're looking for you": cur_img = None; idx += 1; continue
        # position line: take from text lines (no span spacing artefacts)
        li = lines.index(next(l for l in lines if l.replace(' ', '') .startswith(name.replace(' ', ''))))
        pos_line = lines[li + 1]
        m = re.match(r'^(.*?)\s*\(\s*(\d{4}\.\d{2})\s*~\s*(현재)?\s*\)$', pos_line)
        position, start = m.group(1).strip(), ym(m.group(2))
        n += 1
        photo = f"assets/members/member-{n:02d}.jpg"
        download(cur_img, ROOT / photo, 600)
        row = {"name_ko": name, "name_en": "", "role": role_of(position), "position": position, "start": start,
               "end": "", "status": "current", "photo": photo, "email": "", "link": "", "affiliation": "", "history": "", "lab": "ADAM Lab@PNU"}
        km = re.match(r'^(.*?) \((.*?)\)$', name)
        if km: row["name_ko"], row["name_en"] = km.group(1), km.group(2)
        if name.startswith("Dr. "): row["name_ko"], row["name_en"] = "", name
        if row["role"] == "professor":
            row["affiliation"] = lines[li + 2]
            row["link"] = "https://sites.google.com/view/adam-pnu/team/professor"
            row["email"] = "soonjo.kwon@pusan.ac.kr"
        members.append(row); cur_img = None
    idx += 1
# alumni from text lines after 졸업생
a = lines.index("졸업생"); lab = ""
i = a + 1
while i < len(lines) and not lines[i].startswith("Google Sites"):
    l = lines[i]
    if l.endswith("@KIT") or l.endswith("@PNU"): lab = l; i += 1; continue
    name, hist = l, lines[i + 1]; i += 2
    aff = ""
    if i < len(lines) and lines[i].startswith("소속:"):
        aff = lines[i].split(":", 1)[1].strip(); i += 1
    hist = hist.replace("석사 과정", "석사과정")  # audit #22
    dates = re.findall(r'\d{4}\.\d{2}', hist)
    last = hist.split("), ")[-1]
    position = re.sub(r'\s*\(.*$', '', last)
    members.append({"name_ko": name, "name_en": "", "role": role_of(position), "position": position,
                    "start": ym(dates[0]), "end": ym(dates[-1]), "status": "alumni", "photo": "", "email": "",
                    "link": "", "affiliation": aff, "history": hist, "lab": lab})
write("members", ["name_ko","name_en","role","position","start","end","status","photo","email","link","affiliation","history","lab"],
      members, "Team page. role: professor | postdoc | phd | ms-phd | ms | undergrad. status: current | alumni.")

# ---------- projects ----------
projects, grp = [], ""
s = soup("research")
els = s.body.find_all(['h2', 'p', 'img'])
lines = page_lines("research")
grp = ""
for l in lines:
    if l.startswith("Projects @"): grp = l.split("@")[1].strip(); continue
    if not grp or l.startswith("Google Sites"): continue
    m = re.match(r'^(.*) \((.+?)~(.+?)\)$', l)
    if not m: continue
    segs = m.group(1).split(", ")
    row = {"title": segs[0], "org_role": segs[1], "researcher_role": segs[2],
           "program": segs[3] if len(segs) == 5 else "", "funder": segs[-1],
           "start": ym(m.group(2)), "end": ym(m.group(3)), "group": grp, "status": "", "logo": "", "link": ""}
    projects.append(row)
# attach logos in order for PNU projects (image follows each PNU paragraph)
imgs = [e for e in els if e.name == 'img' and 'sitesv-images-rt' in e.get('src', '')]
pnu_logo_imgs = imgs[-5:]
for row, img in zip([p for p in projects if p["group"] == "PNU"], pnu_logo_imgs):
    key = img['src'].split('/')[-1]
    fn = f"assets/projects/{key[6:18].replace('-', '').replace('_', '')}.png"
    download(img['src'], ROOT / fn, 320)
    row["logo"] = fn
write("projects", ["title","org_role","researcher_role","program","funder","start","end","group","status","logo","link"], projects,
      "Research page · Research Projects. group: PNU | KIT. status blank = auto from end (YYYY-MM); or ongoing | completed.")

# ---------- talks ----------
talks, on = [], False
for l in page_lines("team_professor"):
    if l == "Invited Talks": on = True; continue
    if not on or not re.search(r'\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\.?$', l): continue
    segs = l.rstrip(".").split(", ")
    date = dotdate(segs[-1]); loc = segs[-2]
    if "ICDCM" in l:
        title, venue = segs[0], ", ".join(segs[1:-2])
    else:
        title, venue = ", ".join(segs[:-3]), segs[-3]
    talks.append({"date": date, "title": title, "venue": venue, "location": loc, "link": ""})
write("talks", ["date","title","venue","location","link"], talks, "Team/Professor page · Invited Talks.")

# ---------- gallery ----------
s = soup("board")
start = next(t for t in s.find_all(string=re.compile(r'^\s*Photos\s*$')))
gallery, era, bgs, n = [], "", [], 0
def add(url, date, caption, group):
    global n
    n += 1
    fn = f"assets/gallery/photo-{n:02d}.jpg"
    download(url, ROOT / fn, 1000)
    gallery.append({"date": date, "caption": caption, "image": fn, "group": group, "link": ""})
pending_img = None
for el in start.find_all_next():
    if el.name == 'h3':
        t = el.get_text('', strip=True)
        era = "PNU" if t == "2026" else ("KIT" if "KIT" in t else era)
    if el.name == 'img' and 'sitesv-images-rt' in el.get('src', '') and el.get('alt') != 'Instagram':
        pending_img = el['src']
    if el.name == 'p' and pending_img and el.get_text(strip=True):
        t = el.get_text('', strip=True)
        m = re.match(r'^(\d{2}\.\d{2}\.\d{2})\.(.*)$', t)
        if m:
            d = "20" + m.group(1).replace('.', '-')
            add(pending_img, d, m.group(2).strip(), era); pending_img = None
    st = el.get('style', '') if isinstance(el, Tag) else ''
    if 'background-image' in st and 'sitesv-images-rt' in st:
        bgs.append(re.search(r'url\(([^)]*)\)', st).group(1))
    if el.name == 'span' and el.get('jsname') == 'vM03ic' and bgs:
        t = el.get_text(strip=True)
        m = re.match(r'^(\d{2}\.\d{2}\.\d{2})\.\s*(.*)$', t)
        add(bgs.pop(0), "20" + m.group(1).replace('.', '-'), m.group(2), era)
# fix spacing artefacts from Sites spans
for g in gallery:
    g["caption"] = g["caption"].replace("오픈랩행사", "오픈랩 행사").replace("생일기념", "생일 기념")
write("gallery", ["date","caption","image","group","link"], gallery,
      "Board page · Photos (single photos and carousel slides). group: PNU | KIT.")

# research-topic tags (publications, patents) from titles; manual cells win
import tag_topics  # noqa: E402
tag_topics.main()
