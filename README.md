# ADAM Lab@PNU 임베드 위젯

부산대학교 ADAM Lab(권순조 교수) Google Sites용 경량 위젯 저장소입니다.

- 공개 사이트: [adam-pnu](https://sites.google.com/view/adam-pnu)
- 클론(실험용): [adam-pnu-2](https://sites.google.com/view/adam-pnu-2)
- 소스 저장소: [soonjokwon/adam-lab-widgets](https://github.com/soonjokwon/adam-lab-widgets) (GitHub가 원본)
- 호스팅: GitHub Pages `https://soonjokwon.github.io/adam-lab-widgets/` (`main` 브랜치 루트에서 바로 배포, `.nojekyll`)

소개 문단·연구 분야·연락처·히어로 애니메이션 같은 **정적인 내용은 Google Sites에 그대로** 두고, 자주 바뀌는 **목록**(소식·논문·특허·수상·구성원·과제·초청강연·사진)만 Google Sheet에서 읽어 오는 위젯으로 바꿔 Sites에 **URL 삽입**합니다.

---

## 1. 위젯 한눈에 보기

시트: [ADAM Lab 위젯 시트](https://docs.google.com/spreadsheets/d/1bmfsOkVl16OJ2KWzWJG6NtV5Ds98fXKnSiRtxKxgzlw) (공유: 링크가 있는 모든 사용자 = 뷰어)

| Sites 페이지 | 위젯 URL (Sites → 삽입 → URL) | 시트 탭 | 권장 높이 |
| --- | --- | --- | --- |
| Home · Latest News | https://soonjokwon.github.io/adam-lab-widgets/news/ | `news` | 400px |
| Research · Research Projects | https://soonjokwon.github.io/adam-lab-widgets/projects/ | `projects` | 900px |
| Team | https://soonjokwon.github.io/adam-lab-widgets/members/ | `members` | 1150px |
| Team/Recruiting · 연구 프로젝트 | https://soonjokwon.github.io/adam-lab-widgets/projects/?status=ongoing&group=PNU&compact=1 | `projects` | 520px |
| Team/Professor · Invited Talks | https://soonjokwon.github.io/adam-lab-widgets/talks/ | `talks` | 700px |
| Awards | https://soonjokwon.github.io/adam-lab-widgets/awards/ | `awards` | 950px |
| Publications · 논문 | https://soonjokwon.github.io/adam-lab-widgets/publications/ | `publications` | 1000px |
| Publications · 특허 | https://soonjokwon.github.io/adam-lab-widgets/patents/ | `patents` | 650px |
| Board · Photos | https://soonjokwon.github.io/adam-lab-widgets/gallery/ | `gallery` | 820px |

- 위젯 안에서 스크롤되므로 높이는 취향껏 조절해도 됩니다. 너비는 섹션 전체(어떤 너비든 자동으로 반응형).
- 같은 Sites 페이지에 들어가는 위젯은 같은 디자인을 씁니다(예: Publications 페이지의 논문·특허 위젯). 모든 위젯은 히어로와 같은 색(`--navy #102B86`, `--blue #0707AA`, `--accent #FF9900` …)과 글꼴(Chakra Petch / Noto Sans KR / IBM Plex Mono), 5% 격자 배경을 씁니다. 제목은 Sites의 제목 블록을 그대로 쓰세요(위젯에는 큰 제목이 없습니다).
- **Board 페이지의 소식 목록**은 Home과 같은 `news` 탭을 씁니다. 필요하면 Board에도 `/news/`를 넣을 수 있습니다.

### URL 옵션 (선택)

| 위젯 | 옵션 | 예 |
| --- | --- | --- |
| publications | `?types=` 보여줄 분류만 (쉼표) · `?type=` 처음 선택 · `?year=` · `?q=` | 학술지만: `/publications/?types=journal-intl,journal-kr` · 학술대회만: `/publications/?types=conf-intl,conf-kr` |
| projects | `?status=ongoing\|completed` · `?group=PNU\|KIT` · `?compact=1`(상단 숫자·필터 숨김) | Recruiting 페이지 예시는 위 표 |
| members | `?alumni=1`(졸업생 펼친 상태) · `?join=0`(“We're looking for you” 카드 숨김) | |
| awards | `?category=paper\|presentation\|competition` | |
| patents | `?status=registered\|filed` | |
| gallery | `?group=PNU\|KIT` | |
| 공통 | `?source=json` 시트를 무시하고 저장소 백업만 표시(점검용) | |

---

## 2. 시트에 탭 만들기 (처음 한 번)

탭마다 **CSV 파일을 새 탭으로 가져오기만** 하면 됩니다. 파일: `/workspace/홈페이지위젯/sheet-tabs/<탭>.csv` (저장소 `templates/sheet/<탭>.csv`와 동일, UTF-8 BOM이라 한글이 깨지지 않습니다).

1. 시트 열기 → **파일 → 가져오기 → 업로드**에서 `<탭>.csv` 선택
2. **가져오기 위치: “새 시트 삽입”**
3. **“텍스트를 숫자, 날짜, 수식으로 변환” 체크 해제** (날짜·번호가 섞인 열이 자동 변환되면 일부 값이 비어 보일 수 있음)
4. 생긴 탭의 이름을 **정확히** `<탭>`으로 바꿉니다 (`publications`, `patents`, `awards`, `members`, `projects`, `talks`, `gallery`; 소문자)

그 외에 할 일은 없습니다. `config/sheets.js`에 모든 탭 주소가 이미 들어 있습니다.

- 탭이 **아직 없거나, 비었거나, 헤더(1행)가 다르면** 위젯은 자동으로 저장소의 `data/<탭>.json`(현재 사이트 내용을 옮긴 백업)을 보여 줍니다. 그래서 탭을 만들기 전에도 위젯은 정상 동작합니다.
- 주의: Google의 gviz는 없는 탭 이름을 요청하면 **첫 번째 탭**을 돌려줍니다. 위젯은 헤더를 검사해 이를 걸러내지만, **탭 이름 오타**가 있으면 시트 수정이 반영되지 않고 백업이 계속 보이니 이름을 정확히 맞춰 주세요.
- 시트 수정은 저장 후 위젯(또는 Sites 페이지)을 새로고침하면 바로 반영됩니다. **푸시·빌드 불필요.**
- 행 순서: 대부분 날짜순으로 자동 정렬됩니다. `members`(구성원)와 `projects`(과제)는 **시트의 행 순서대로** 표시됩니다.
- 열 순서는 바꿔도 되고, 열 이름(1행)만 그대로 두면 됩니다. 모르는 칸은 비워 두세요.

---

## 3. 탭별 열과 허용값

날짜 칸은 `2026-08-21`, `2026. 8. 21`, `2026.08.21`, `26.08.21` 모두 됩니다. 월 칸(`start`, `end`)은 `2026-03`, `2026.03`, `26.03`, 연도만이면 `2026`.

### `news` — Home Latest News
| 열 | 내용 | 허용값/예 |
| --- | --- | --- |
| `date` | 날짜 | `2026-08-21` |
| `title_ko` | 한글 문구 (필수) | |
| `title_en` | 영문 요약 (선택) | |
| `tag` | 분류 | `Paper` `Award` `Project` `Event` `Member` |
| `link` / `image` | 링크·이미지 URL (선택) | |

### `publications` — 논문 (Publications 페이지)
| 열 | 내용 | 허용값/예 |
| --- | --- | --- |
| `type` | 분류 (필수) | `journal-intl`(국제 학술지) `journal-kr`(국내 학술지) `conf-intl`(국제 학술대회) `conf-kr`(국내 학술대회) `in-prep`(준비·심사 중) |
| `no` | 사이트 번호 | `34` → 표시 `J34`, `KJ21`, `C27`, `KC105` |
| `year` | 연도 | `2026` |
| `authors` | 저자 (쉼표 구분, `*` 교신, `+` 공동 1저자) | `Y. Jeon, K. Kim, H. Kim*, S. Kwon*` (`S. Kwon`/`권순조`는 굵게) |
| `title` | 제목 (필수) | |
| `venue` | 학술지/학술대회명 | `Additive Manufacturing` |
| `details` | 권(호)·쪽·날짜·장소 등 | `114, 105044, Sep 25` / `여수 베네치아, 여수, 2025.08.20~23. (08.22.)` |
| `date` | 발표일(학술대회) | `2025-08-22` |
| `presentation` | 포스터 여부 | `poster` 또는 빈칸 |
| `status` | 상태 | `published` `in-press`(게재 예정) `presented` `in-preparation` `in-revision` |
| `link` | DOI/논문 링크 | `https://doi.org/...` |
| `note` | 수상·선정 (여러 개면 `;`) | `우수포스터상` · `Editor’s Choice` (`…상`/`Award`는 주황 배지, `수상` 필터에 잡힘) |
| `extra_label` / `extra_link` | 추가 링크 | `Github` / `https://github.com/...`, `요약` / webzine 링크 |

### `patents` — 특허 (Publications 페이지)
| 열 | 내용 | 허용값/예 |
| --- | --- | --- |
| `no` | 번호 | `14` → `P14` |
| `title` | 특허명 (필수) | |
| `status` | 상태 | `registered`(등록) `filed`(출원) |
| `number` | 등록/출원번호 | `10-3000341` |
| `date` | 등록일/출원일 | `2026-07-31` |
| `link` | KIPRIS DOI 등 | `https://doi.org/10.8080/...` |
| `note` | 비고 | `PCT 국제출원, PCT/KR2024/017655, 2024.11.08.` |

### `awards` — 수상 (Awards 페이지)
| 열 | 내용 | 허용값/예 |
| --- | --- | --- |
| `date` | 수상일 (필수) | `2026-08-21` |
| `category` | 분류 | `paper`(논문) `presentation`(학술발표) `competition`(경진대회) |
| `award` | 상 이름 (필수) | `우수포스터상`, `대상(과학기술정보통신부장관상)` |
| `recipients` | 수상자 (쉼표) | `박현석, 김태길, 권순조` |
| `title` | 논문/발표 제목 (경진대회는 빈칸 가능) | |
| `event` | 학술대회·학술지·대회명 (+부문) | `제10회 3D프린팅 BIZCON경진대회, 구동 부문` |
| `organizer` | 주최 | `3D프린팅산업협회` |
| `link` | 링크 | |

### `members` — 구성원 (Team 페이지)
| 열 | 내용 | 허용값/예 |
| --- | --- | --- |
| `name_ko` | 한글 이름 (필수, 외국인은 빈칸 가능) | `예브게니 유가이` |
| `name_en` | 영문 이름 | `Dr. Ragul Gandhi` |
| `role` | 역할 → 섹션 | `professor`(책임자) `postdoc`/`researcher`(연구원) `phd` `ms-phd` `ms`(대학원생) `undergrad`(학부연구생) |
| `position` | 카드에 보이는 직위 | `석박사통합과정`, `석사과정(금오공대)` |
| `start` / `end` | 시작/종료 월 | `2026-03` / 졸업생 `2026-02` |
| `status` | 재학/졸업 | `current` `alumni` |
| `photo` | 사진 | `assets/members/member-03.jpg`(저장소) 또는 공개 이미지 URL, 또는 **Google Drive 공유 링크**(링크가 있는 모든 사용자 보기) |
| `email` / `link` | 메일·프로필 | 교수 카드에 버튼으로 표시 |
| `affiliation` | 교수: 소속 / 졸업생: 현 소속 | `한화오션(주) 설계정보팀` |
| `history` | 졸업생 이력 문구 | `학부 연구생 (2023.03 ~ 2024.02), 석사 졸업 (2024.03 ~ 2026.02)` |
| `lab` | 졸업생 그룹 제목 | `DADI Lab@KIT` |

### `projects` — 연구과제 (Research, Team/Recruiting 페이지)
| 열 | 내용 | 허용값/예 |
| --- | --- | --- |
| `title` | 과제명 (필수) | |
| `org_role` | 기관 역할 | `주관기관` `공동기관` `위탁기관` `연구용역` |
| `researcher_role` | 연구 역할 | `책임연구원` `공동연구원` |
| `program` | 사업명 | `신진연구(유형B)` |
| `funder` | 지원기관 (필수) | `한국연구재단` |
| `start` / `end` | 기간 | `2026-03` / `2030-02` (모르면 연도만 `2026`) |
| `group` | 소속 섹션 | `PNU` `KIT` |
| `status` | 비우면 기간으로 자동 계산 | (빈칸) `ongoing` `completed` |
| `logo` | 지원기관 로고 | `assets/projects/….png` 또는 이미지 URL |
| `link` | 과제 링크 (선택) | |

### `talks` — 초청 강연 (Team/Professor 페이지)
| 열 | 내용 | 예 |
| --- | --- | --- |
| `date` | 날짜 (필수) | `2026-09-11` |
| `title` | 강연 제목 (필수) | |
| `venue` | 기관/행사 | `한국광기술원` |
| `location` | 지역 (`온라인`은 점선 표시) | `광주` |
| `link` | 링크 (선택) | |

### `gallery` — 사진 (Board 페이지)
| 열 | 내용 | 예 |
| --- | --- | --- |
| `date` | 날짜 | `2026-09-09` |
| `caption` | 설명 | `오픈랩 행사 기념` |
| `image` | 사진 (필수) | `assets/gallery/photo-07.jpg` 또는 공개 URL / Google Drive 공유 링크 |
| `group` | 앨범 | `PNU`(ADAM Lab@PNU) `KIT`(DADI Lab@KIT) |
| `link` | 관련 링크 (선택) | |

### 새 사진 넣는 법
Google Drive에 사진을 올리고 **공유 → 링크가 있는 모든 사용자(뷰어)** 로 바꾼 뒤, 공유 링크(`https://drive.google.com/file/d/…/view`)를 `photo`/`image` 칸에 그대로 붙여 넣으면 됩니다. Google Sites에 올린 사진의 주소는 몇 분 뒤 만료되므로 쓰지 마세요(현재 사진은 저장소 `assets/`에 복사해 두었습니다).

---

## 4. 누가 무엇을 고치나

| 담당 | 고치는 곳 | 예시 |
| --- | --- | --- |
| 연구실 운영·조교 | **Google Sheet** (위 탭들) | 새 소식·논문·특허·수상·구성원·과제·강연·사진 행 추가/수정 |
| 연구실 운영·조교 | **Google Sites** | 소개 문단, 연구 분야, 연락처, 모집 안내, 페이지 제목 |
| 개발·디자인 요청 | **이 GitHub 저장소** | 위젯 레이아웃·색·필터, 새 위젯 |

시트에는 공개해도 되는 내용만 넣습니다(링크만 있으면 누구나 읽을 수 있음).

---

## 5. 폴더

| 경로 | 역할 |
| --- | --- |
| `config/sheets.js` | 시트 ID와 탭별 gviz CSV 주소 |
| `shared/tokens.css` | 히어로와 같은 색·글꼴 토큰 |
| `shared/sheet.css` | Latest News 전용 시트 크롬 |
| `shared/base.css` | 새 위젯 공통(격자 배경, 칩, 검색창, 배지, `[hidden]` 우선) |
| `shared/page-publications.css` | Publications 페이지(논문·특허) 공통 디자인 |
| `shared/sheet-loader.js` | 공통 로더: 시트 → 헤더 검사 → `data/<탭>.json` 백업, 날짜 정규화(`normalizeDate`) |
| `widgets/<이름>/` | 위젯 소스(JS/CSS)와 개발 미리보기 `index.html` |
| `<이름>/index.html` | Sites **URL 삽입**용 클린 페이지 (`/news/`, `/publications/` …) |
| `data/<탭>.json` | 시트가 없거나 실패할 때 쓰는 백업(현재 사이트 내용) |
| `assets/` | 구성원 사진·과제 로고·갤러리 사진(사이트에서 복사) |
| `templates/sheet/<탭>.csv` | 시트 가져오기용 CSV (UTF-8 BOM) |
| `dist/<이름>-embed.html` | Sites **코드 삽입**(붙여넣기)용 단일 파일 |
| `scripts/extract_site.py` | 공개 사이트 HTML → CSV/JSON/assets 추출(1회성, 재실행 가능) |
| `scripts/make_pages.py` | `/<이름>/index.html`, `widgets/<이름>/index.html` 생성 |
| `scripts/build_embed.py` | `dist/*-embed.html` 빌드 |
| `scripts/sync_news_csv.py` | `data/news.json` → `templates/sheet/news.csv` |
| `docs/site_audit.md` | 사이트 문구 교정 감사 목록 |

---

## 6. 호스팅·배포

GitHub Pages가 `main` 브랜치 루트를 그대로 배포합니다(Actions 워크플로 없음). 코드·디자인을 바꾸면:

```bash
python3 scripts/make_pages.py      # 위젯 페이지 추가/이름 변경 시
python3 scripts/build_embed.py     # 붙여넣기 파일을 쓰는 경우
git add -A && git commit -m "..." && git push
# 확인: gh api repos/soonjokwon/adam-lab-widgets/pages/builds/latest
```

로컬 미리보기:

```bash
python3 -m http.server 4179
# http://127.0.0.1:4179/publications/  (로컬에서는 시트 대신 JSON 백업이 보일 수 있음)
```

붙여넣기 방식(B): `dist/<이름>-embed.html` 전체를 Sites **삽입 → 코드 삽입**에 붙입니다. 이 파일도 시트를 먼저 읽고, 실패하면 파일 안에 넣어 둔 백업을 씁니다. 가능하면 URL 삽입(A)을 쓰세요. 원본 사이트에 넣기 전에 [adam-pnu-2](https://sites.google.com/view/adam-pnu-2)에서 먼저 확인합니다.

---

## 7. 월간 점검 목록

- [ ] **이름:** Team / Board / Awards / 시트 `members`·`news`·`awards` 한글·영문 표기 일치 (예: 예브게니)
- [ ] **링크:** 소식·논문·수상 링크 404 없음
- [ ] **최신 소식:** Latest News가 실제 최근 사건과 맞는지
- [ ] **시트 탭 이름:** 7개 탭 이름이 정확한지 (`?source=json`과 비교해 화면이 다르면 시트가 반영되는 중)
- [ ] **플레이스홀더:** Research/Recruiting의 `OO`, `XX`, `00명` 등 (`docs/site_audit.md`) — `projects` 탭의 한화에어로스페이스 과제명·기간 포함
- [ ] **클론 먼저:** 위젯·임베드 변경은 adam-pnu-2에서 본 뒤 원본 반영

---

## 8. 위젯 조작

- **Latest News:** 이전/다음, 가로 스와이프, ← → / Home / End, 태그 칩 필터
- **논문:** 분류 타일(개수 표시) · 연도 막대그래프(클릭=연도 필터) · 연도 선택 · 검색(제목/저자/학술지, 일치 부분 강조) · `수상` 필터 · 더 보기
- **특허:** 전체/등록/출원 타일 · 검색
- **수상:** 분류 칩 · 검색 · 연도별 타임라인
- **구성원:** 역할 칩 · 졸업생 보기/숨기기 · 사진이 없으면 이니셜 표시
- **과제:** 진행중/종료 · @PNU/@KIT · 기간 진행률 막대(오늘 위치 표시)
- **초청 강연:** 국문/English · 검색 · 연도별 개수 그래프
- **사진:** 앨범 칩 · 클릭하면 크게 보기(← → / Esc)
- `prefers-reduced-motion`이면 애니메이션 생략
