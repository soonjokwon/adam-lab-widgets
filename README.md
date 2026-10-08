# ADAM Lab@PNU 홈페이지 위젯

부산대학교 ADAM Lab(권순조 교수) Google Sites에 넣는 목록 위젯입니다.

- 공개 사이트: [adam-pnu](https://sites.google.com/view/adam-pnu)
- 데이터 시트: [ADAM Lab 위젯 시트](https://docs.google.com/spreadsheets/d/1bmfsOkVl16OJ2KWzWJG6NtV5Ds98fXKnSiRtxKxgzlw)
- 위젯 주소: `https://soonjokwon.github.io/adam-lab-widgets/<위젯>/` (이 저장소가 GitHub Pages로 바로 공개됨)

소개 문단·연구 분야·연락처·히어로 애니메이션 같은 **잘 안 바뀌는 내용은 Google Sites에서 직접** 고칩니다.
자주 바뀌는 **목록**(소식·논문·특허·수상·구성원·과제·초청강연·사진)은 **시트에 한 줄 추가**하면 위젯에 바로 나타납니다.
코드나 GitHub는 몰라도 됩니다.

---

## 1. Sites에 넣을 주소와 높이

Sites 편집 화면 → **삽입 → 삽입(Embed) → URL**에 아래 주소를 넣고, **“전체 페이지”가 아닌 “삽입된 콘텐츠”** 로 선택한 뒤 박스 높이를 맞춥니다.

| Sites 페이지 | 위젯 주소 | 시트 탭 | 권장 높이 (PC) |
| --- | --- | --- | --- |
| Home · Latest News | `https://soonjokwon.github.io/adam-lab-widgets/news/` | `news` | 400px |
| Research · Research Projects | `https://soonjokwon.github.io/adam-lab-widgets/projects/` | `projects` | 900px |
| Team/Recruiting · 연구 프로젝트 (모집 중 과제만) | `https://soonjokwon.github.io/adam-lab-widgets/projects/?recruit=1&compact=1` | `projects` | 300px |
| Team · 구성원 (졸업생 펼침) | `https://soonjokwon.github.io/adam-lab-widgets/members/?alumni=1` | `members` | 1150px |
| Team/Professor · Invited Talks | `https://soonjokwon.github.io/adam-lab-widgets/talks/` | `talks` | 700px |
| Awards | `https://soonjokwon.github.io/adam-lab-widgets/awards/` | `awards` | 950px |
| Publications · 논문 | `https://soonjokwon.github.io/adam-lab-widgets/publications/` | `publications` | 1000px |
| Publications · 특허 | `https://soonjokwon.github.io/adam-lab-widgets/patents/` | `patents` | 650px |
| Board · Photos | `https://soonjokwon.github.io/adam-lab-widgets/gallery/` | `gallery` | 820px |

- **휴대폰에서는 Sites가 위젯 박스 높이를 너비에 맞춰 줄입니다** (PC 400px → 폰에서 약 200–250px). 그래서 모든 위젯은 박스 **안에서 스크롤**되고,
  키가 작은 박스에서는 자동으로 압축된 모양(작은 통계 줄, 한 줄 필터, 사진·영문 생략 카드)으로 바뀝니다. 필터 줄은 스크롤해도 위에 붙어 있습니다.
  높이는 위 표를 기준으로 취향껏 조절하세요. 너무 작게(PC 300px 미만) 잡으면 폰에서 한 화면에 1–2개만 보입니다.
- 같은 페이지의 위젯은 같은 디자인입니다(예: Publications 페이지의 논문·특허). 페이지 제목은 Sites의 제목 블록을 그대로 쓰세요.
- 위젯 안의 링크는 모두 **새 탭**으로 열립니다.
- Recruiting 주소는 `projects` 탭에서 `recruit` 칸이 `Y`인 과제만 보여 줍니다(3장 참고). 모집 과제가 바뀌면 시트의 `Y`만 옮기면 됩니다.

### 주소 뒤에 붙이는 옵션 (선택)

| 위젯 | 옵션 | 예 |
| --- | --- | --- |
| projects | `?recruit=1`(모집 중만) · `?compact=1`(상단 숫자·필터 숨김) · `?status=ongoing` 또는 `completed` · `?group=PNU` 또는 `KIT` | `/projects/?recruit=1&compact=1` |
| members | `?alumni=1`(졸업생 펼친 상태로 시작 — **Team 페이지 권장**) · `?join=0`(모집 카드 숨김) | `/members/?alumni=1` |
| publications | `?types=`(보여 줄 분류만, 쉼표) · `?type=` · `?year=` · `?topic=`(주제 ID) · `?q=`(검색어) | 학술지만: `/publications/?types=journal-intl,journal-kr` |
| patents | `?status=registered` 또는 `filed` · `?topic=` | |
| awards | `?category=paper` / `presentation` / `competition` | |
| gallery | `?group=PNU` 또는 `KIT` | |
| 공통 | `?debug=1` 점검 창 (6장) | |

---

## 2. 시트 준비 (처음 한 번)

### 2-1. 탭 가져오기

탭마다 CSV 파일을 **새 탭으로 가져오기**만 하면 됩니다. CSV는 한글이 깨지지 않게 UTF-8(BOM)로 저장돼 있습니다.

| 탭 이름 | CSV 파일 (링크 → 오른쪽 위 **Download raw file** 버튼) |
| --- | --- |
| `publications` | [templates/sheet/publications.csv](https://github.com/soonjokwon/adam-lab-widgets/blob/main/templates/sheet/publications.csv) |
| `patents` | [templates/sheet/patents.csv](https://github.com/soonjokwon/adam-lab-widgets/blob/main/templates/sheet/patents.csv) |
| `awards` | [templates/sheet/awards.csv](https://github.com/soonjokwon/adam-lab-widgets/blob/main/templates/sheet/awards.csv) |
| `members` | [templates/sheet/members.csv](https://github.com/soonjokwon/adam-lab-widgets/blob/main/templates/sheet/members.csv) |
| `projects` | [templates/sheet/projects.csv](https://github.com/soonjokwon/adam-lab-widgets/blob/main/templates/sheet/projects.csv) |
| `talks` | [templates/sheet/talks.csv](https://github.com/soonjokwon/adam-lab-widgets/blob/main/templates/sheet/talks.csv) |
| `gallery` | [templates/sheet/gallery.csv](https://github.com/soonjokwon/adam-lab-widgets/blob/main/templates/sheet/gallery.csv) |
| `news` (이미 있음) | 아래 2-2 참고 — [news_append.csv](https://github.com/soonjokwon/adam-lab-widgets/blob/main/templates/sheet/news_append.csv) |

1. 시트 열기 → **파일 → 가져오기 → 업로드** → CSV 선택
2. 가져오기 위치: **새 시트 삽입**
3. **“텍스트를 숫자, 날짜, 수식으로 변환” 체크 해제**
4. 생긴 탭 이름을 **정확히** 위 표의 이름으로 변경 (소문자, 띄어쓰기 없음)

탭 주소는 이미 위젯에 들어 있어서 다른 설정은 없습니다. 탭이 아직 없거나 이름이 틀리면 위젯은 저장소에 보관된 백업(지금 사이트 내용)을 보여 줍니다 — 그래서 **시트를 고쳤는데 화면이 안 바뀌면 탭 이름부터** 확인하세요(`?debug=1`이 알려 줍니다).

### 2-2. `news` 탭 보충 (기존 탭에 행 추가)

`news` 탭은 이미 쓰고 있으므로 새로 만들지 말고 **빠진 옛 소식 17건만 아래에 붙입니다.**

1. `news_append.csv`를 **파일 → 가져오기 → 업로드**, 가져오기 위치 **“현재 시트에 행 추가”** (news 탭을 연 상태에서), 변환 체크 해제
2. 1행(머리글)이 한 번 더 붙었으면 그 행만 지웁니다.
3. (선택) 2026.02.10 가헌학술상 소식의 두 번째 링크: G열 1행에 `link2`라고 쓰고, 그 행 G칸에
   `https://www.kumoh.ac.kr/ko/sub01_05_02.do?mode=view&articleNo=553190` 을 넣습니다. 카드에 `LINK 1 ↗`·`LINK 2 ↗`가 따로 보입니다.

순서는 상관없습니다(날짜순 자동 정렬).

### 2-3. 실수 방지 설정 (권장, 탭마다 한 번)

| 할 일 | 방법 | 이유 |
| --- | --- | --- |
| 모든 칸을 **일반 텍스트**로 | 탭 전체 선택(왼쪽 위 모서리) → **서식 → 숫자 → 일반 텍스트** | 날짜·번호가 섞인 열을 Google이 숫자로 바꾸면 위젯에 **빈칸**으로 넘어옵니다 |
| 허용값 **드롭다운** | 열 선택 → **데이터 → 데이터 확인 → 규칙 추가 → 드롭다운**, 아래 값 입력 | 오타 방지 |
| **1행(머리글) 보호** | 1행 선택 → 마우스 오른쪽 → **범위 보호** → 권한: 나만 수정 | 머리글이 바뀌면 그 열이 무시됩니다 |

드롭다운 값:

| 탭 · 열 | 값 |
| --- | --- |
| `publications` · `type` | `journal-intl` `journal-kr` `conf-intl` `conf-kr` `in-prep` |
| `patents` · `status` | `registered` `filed` |
| `awards` · `category` | `paper` `presentation` `competition` |
| `members` · `role` | `professor` `postdoc` `researcher` `phd` `ms-phd` `ms` `undergrad` |
| `members` · `status` | `current` `alumni` |
| `projects` · `group` | `PNU` `KIT` |
| `projects` · `status` | `ongoing` `completed` (비워 두면 기간으로 자동) |
| `projects` · `recruit`, `hidden` | `Y` |
| `news` · `tag` | `Paper` `Award` `Project` `Event` `Member` |
| `gallery` · `group` | `PNU` `KIT` |

### 2-4. 공개 범위 주의

시트는 **“링크가 있는 모든 사용자 = 뷰어”** 로 공개돼 있어야 위젯이 읽을 수 있습니다. 즉 **이 파일은 사실상 공개**입니다.

- 학생 연락처·학번·메모·평가 같은 **비공개 정보는 이 파일에 넣지 마세요**(다른 탭에도). 필요하면 별도 비공개 파일을 쓰세요.
- 편집 권한은 아래 사람에게만 줍니다 (공유 → 사용자 추가 → 편집자).

| 편집자 | 담당 | 비고 |
| --- | --- | --- |
| 권순조 교수 | 전체 | 소유자 |
| _(이름 기입)_ | _(예: news·awards)_ | |
| _(이름 기입)_ | | |

---

## 3. 탭별 칸 설명

날짜 칸은 `2026-08-21`, `2026. 8. 21`, `2026.08.21`, `26.08.21` 모두 됩니다. 월 칸(`start`, `end`)은 `2026-03`, `2026.03`, `26.03`.
월을 모르면 연도만(`2026`, `26.XX`) — 이때 과제 진행 막대는 표시하지 않습니다.

### `news` — Home Latest News
| 칸 | 내용 | 예 |
| --- | --- | --- |
| `date` | 날짜 (필수) | `2026-08-21` |
| `title_ko` | 한글 제목 (필수) | `박현석, 한국CDE학회 2026 하계학술대회 우수포스터상` |
| `title_en` | 영문 한 줄 (선택) | |
| `tag` | 분류 | `Paper` `Award` `Project` `Event` `Member` (칩에는 논문·수상·과제·행사·구성원) |
| `link` | 관련 링크 (선택) | |
| `image` | 사진 (선택) | `assets/news/….jpg` 또는 이미지 주소 |
| `link2` | 두 번째 링크 (선택, 열이 없어도 됨) | |

### `publications` — 논문
| 칸 | 내용 | 예 |
| --- | --- | --- |
| `type` | 분류 (필수) | `journal-intl`(국제 학술지) `journal-kr`(국내 학술지) `conf-intl`(국제 학술대회) `conf-kr`(국내 학술대회) `in-prep`(준비·심사 중) |
| `no` | 사이트 번호 | `34` → `J34`, `KJ21`, `C27`, `KC105` |
| `year` | 연도 | `2026` |
| `authors` | 저자 (쉼표, `*` 교신, `+` 공동 1저자) | `Y. Jeon, K. Kim, H. Kim*, S. Kwon*` |
| `title` | 제목 (필수) | |
| `topics` | 연구 주제 (`;` 구분, 아래 표) | `am; rl` |
| `venue` | 학술지/학술대회명 | `Additive Manufacturing` |
| `details` | 권(호)·쪽·장소 등 | `114, 105044, Sep 25` |
| `date` | 발표일 | `2025-08-22` |
| `presentation` | 포스터면 `poster` | |
| `status` | 상태 | `published` `in-press`(게재 예정) `presented` `in-preparation` `in-revision` |
| `link` | DOI/링크 | `https://doi.org/...` |
| `note` | 수상·선정 (여러 개면 `;`) | `우수포스터상` (`…상`/`Award`는 주황 배지 + `수상` 필터) |
| `extra_label` / `extra_link` | 추가 링크 | `Github` / `https://github.com/...` |

**같은 해 안의 순서:** 국제 학술지 → 국내 학술지 → 국제 학술대회 → 국내 학술대회, 각각 번호 큰 것부터. 준비 중(`in-prep`)은 맨 뒤. 날짜 칸은 순서에 쓰지 않습니다.
`type`이 위 값이 아니면 지우지 않고 **“기타(분류 확인)”** 묶음에 보여 줍니다.

### `patents` — 특허
| 칸 | 내용 | 예 |
| --- | --- | --- |
| `no` | 번호 | `14` → `P14` |
| `title` | 특허명 (필수) | |
| `topics` | 연구 주제 | `am; assembly` |
| `status` | 상태 | `registered`(등록) `filed`(출원) — 그 밖의 값은 “상태 확인” |
| `number` | 등록/출원번호 | `10-3000341` |
| `date` | 등록일/출원일 | `2026-07-31` |
| `link` | 링크 | `https://doi.org/10.8080/...` |
| `note` | 비고 | `PCT 국제출원, PCT/KR2024/017655, 2024.11.08.` |

### 연구 주제 `topics` (논문·특허 공통)

`topics` 칸에 아래 **ID**를 `;`로 구분해 적습니다(예: `am; rl`). 칩에는 한글 이름이 보입니다. 한글/영문 이름을 그대로 써도 인식하고, 목록에 없는 단어는 별도 태그로 표시됩니다. 애매하면 비워 두세요.
처음 값은 제목 키워드로 **보수적으로** 자동 지정했습니다. **주제별로 어떤 논문이 들어갔는지는 [docs/topic_review.md](docs/topic_review.md)** 에서 한눈에 검토할 수 있습니다(시트 행 번호 포함) — 틀린 것은 시트의 그 행만 고치면 됩니다.

| ID | 칩 이름 | 정식 이름 (한글 / 영문) | 논문 | 특허 |
| --- | --- | --- | ---: | ---: |
| `cad` | CAD 모델링 | B-rep·CAD 모델링 / B-rep, CAD Modeling | 73 | 5 |
| `assembly` | 조립·메이트 | 조립·메이트 / Assembly & Mates | 26 | 2 |
| `am` | 적층제조 | 적층제조 / Additive Manufacturing | 46 | 3 |
| `kg` | 지식그래프 | 지식 그래프·온톨로지 / Knowledge Graph, Ontology | 2 | 0 |
| `llm` | LLM·생성형AI | LLM·생성형 AI / LLM, Generative AI | 7 | 1 |
| `mesh` | 메쉬·점군 | 메쉬·점군 / Mesh & Point Cloud | 13 | 0 |
| `rl` | 강화학습 | 강화학습 / Reinforcement Learning | 23 | 0 |
| `edu` | CAD 교육 | CAD 교육·자동 채점 / CAD Education, Grading | 7 | 1 |
| `design` | 제품 설계 | 제품 설계 / Product Design | 6 | 1 |
| `dt` | 디지털 트윈 | 디지털 트윈·스마트 제조 / Digital Twin | 5 | 0 |
| `lca` | 지속가능성 | 지속가능성·LCA / Sustainability, LCA | 14 | 1 |
| `routing` | 케이블 라우팅 | 케이블 라우팅 / Cable Routing | 12 | 0 |
| `safety` | 안전·대피 | 안전·대피 / Safety & Evacuation | 11 | 1 |
| `ship` | 조선·해양 | 조선·해양 / Shipbuilding, Ocean | 11 | 1 |
| `std` | 표준 | 표준 (ISO·STEP·AAS) / Standards | 16 | 0 |

`kg`(지식그래프)는 제목에 knowledge graph·ontology·온톨로지·지식 그래프가 있는 것만입니다(“knowledge-based/지식 기반”은 포함하지 않음). 태그 없는 논문은 3편(KC90, KC89, KC16), 특허 1건(P3)입니다.

### `awards` — 수상
| 칸 | 내용 | 예 |
| --- | --- | --- |
| `date` | 수상일 (필수) | `2026-08-21` |
| `category` | 분류 | `paper`(논문) `presentation`(학술발표) `competition`(경진대회) — 그 밖의 값은 “기타” |
| `award` | 상 이름 (필수) | `우수포스터상` |
| `recipients` | 수상자 (쉼표) | `박현석, 김태길, 권순조` |
| `title` | 논문/발표 제목 | |
| `event` | 학술대회·대회명 (+부문) | `제10회 3D프린팅 BIZCON경진대회, 구동 부문` |
| `organizer` | 주최 | `3D프린팅산업협회` |
| `link` | 링크 (있을 때만 파란 링크로 표시) | |

### `members` — 구성원 (시트의 행 순서대로 표시)
| 칸 | 내용 | 예 |
| --- | --- | --- |
| `name_ko` | 한글 이름 (외국인은 빈칸 가능) | `예브게니 유가이` |
| `name_en` | 영문 이름 | `Dr. Ragul Gandhi` |
| `role` | 역할 → 섹션 | `professor` `postdoc` `researcher` `phd` `ms-phd` `ms` `undergrad` — 그 밖의 값은 “기타 (role 확인)” 섹션 |
| `position` | 카드의 직위 | `석박사통합과정` |
| `start` / `end` | 시작/종료 월 | `2026-03` |
| `status` | 재학/졸업 | `current` `alumni` |
| `photo` | 사진 | `assets/members/member-03.jpg` (5장 참고) |
| `email` / `link` | 메일·프로필 (교수 카드) | 학생 개인 연락처는 넣지 마세요 |
| `affiliation` | 교수: 소속 / 졸업생: 현 소속 | `한화오션(주) 설계정보팀` |
| `history` | 졸업생 이력 | `학부 연구생 (2023.03 ~ 2024.02), 석사 졸업 (2024.03 ~ 2026.02)` |
| `lab` | 졸업생 그룹 제목 | `DADI Lab@KIT` |

### `projects` — 연구과제 (Research · Recruiting, 시트의 행 순서대로)
| 칸 | 내용 | 예 |
| --- | --- | --- |
| `title` | 과제명 (필수) | |
| `org_role` | 기관 역할 | `주관기관` `공동기관` `위탁기관` `연구용역` |
| `researcher_role` | 연구 역할 | `책임연구원` `공동연구원` |
| `program` | 사업명 | `신진연구(유형B)` |
| `funder` | 지원기관 (필수) | `한국연구재단` |
| `start` / `end` | 기간 | `2026.03` / `2030.02` · 미정이면 `26.XX` |
| `group` | 섹션 | `PNU` `KIT` (비우면 “소속 미지정”) |
| `status` | 비우면 기간으로 자동 | `ongoing` `completed` |
| `recruit` | **모집 중이면 `Y`** → Recruiting 페이지에 표시 | `Y` |
| `hidden` | **`Y`면 숨김** (과제명 미정 등) | `Y` |
| `logo` | 지원기관 로고 | `assets/projects/….png` |
| `link` | 과제 링크 (선택) | |

지금은 PNU 진행 과제 3건이 `recruit=Y`, 한화에어로스페이스 과제(`AI 기반 OO OO OO …`, 기간 `26.XX~27.XX`)가 `hidden=Y`입니다. 과제명이 정해지면 `hidden`을 비우세요.

### `talks` — 초청 강연
| 칸 | 내용 | 예 |
| --- | --- | --- |
| `date` | 날짜 (필수) | `2026-09-11` |
| `title` | 제목 (필수, 영문이면 “영문” 칩에 분류) | |
| `venue` | 기관/행사 | `한국광기술원` |
| `location` | 지역 (`온라인`은 점선) | `광주` |
| `link` | 링크 (선택) | |

### `gallery` — 사진
| 칸 | 내용 | 예 |
| --- | --- | --- |
| `date` | 날짜 | `2026-09-09` |
| `caption` | 설명 | `오픈랩 행사 기념` |
| `image` | 사진 (필수) | `assets/gallery/photo-24.jpg` (5장 참고) |
| `group` | 앨범 | `PNU` `KIT` |
| `link` | 관련 링크 (선택) | |

---

## 4. 시트 수정이 반영되는 방식

- 시트를 고치면 **푸시·빌드 없이** 위젯에 반영됩니다. 위젯은 빠르게 뜨도록 지난번 내용을 브라우저에 잠깐 보관했다가 바로 시트를 다시 읽어 바뀐 부분을 갱신합니다 — 새로고침 후 1–2초 안에 바뀝니다.
- 시트가 응답하지 않으면 2.5초 뒤 저장소 백업(`data/<탭>.json`)을 먼저 보여 주고, 시트가 늦게 오면 그때 바꿔 끼웁니다.
- 백업은 시트를 자동으로 따라가지 않습니다. 시트를 크게 고친 뒤에는 개발 담당이 백업을 갱신합니다(7장 `snapshot_sheet.py`). **news 탭은 2-2의 17건을 붙인 뒤에** 갱신해야 합니다(그 전에 돌리면 백업이 25건으로 줄어듭니다).

---

## 5. 사진 넣는 법 (구성원·갤러리·소식)

**권장: 저장소 `assets/` 폴더에 올리기**

1. GitHub에서 [assets/gallery](https://github.com/soonjokwon/adam-lab-widgets/tree/main/assets/gallery) (구성원은 `assets/members`) 폴더 열기
2. **Add file → Upload files** → 사진 끌어 놓기 → **Commit changes**
   - 파일 이름은 영문·숫자로 (`photo-24.jpg`, `member-12.jpg`), 가로 1000px 안팎, JPG 권장
3. 시트의 `image`/`photo` 칸에 `assets/gallery/photo-24.jpg`처럼 적기

갤러리 썸네일(작은 사진)은 개발 담당이 `scripts/make_thumbs.py`로 만듭니다. 썸네일이 아직 없어도 원본으로 보이므로 급하면 그냥 올리면 됩니다.

**비공식: Google Drive 링크** — Drive 사진을 “링크가 있는 모든 사용자(뷰어)”로 공유하고 공유 링크를 칸에 붙여도 대부분 보이지만, Google 정책에 따라 언제든 막힐 수 있어 **공식 지원이 아닙니다**(점검 창에 경고가 뜹니다).
Google Sites에 올린 사진 주소는 시간이 지나면 만료되므로 쓰지 마세요.

---

## 6. 문제가 생겼을 때 — `?debug=1`

위젯 주소 뒤에 `?debug=1`을 붙여 새 탭에서 열면(예: `…/publications/?debug=1`) 오른쪽 아래에 **ADAM debug** 창이 뜹니다.

| 항목 | 뜻 |
| --- | --- |
| `source` | 지금 보이는 데이터: `sheet`(시트) · `cache`(브라우저 보관본, 곧 시트로 갱신) · `json`/`inline`(저장소 백업) |
| `sheet tab` | 시트 탭을 찾았는지(✓) / 못 찾았는지(✗ — 탭 이름·머리글 확인) |
| `rows` | 읽은 행 · 표시한 행 · 버린 행 수 |
| `dropped` | 버린 행과 이유 (예: `시트 12행: title 비어 있음`) |
| `warnings` | 표시는 했지만 확인이 필요한 값 (예: 모르는 `role` → “기타”, 모르는 `type` → “기타(분류 확인)”, 비어 있는 `group`) |

위젯은 모르는 값을 다른 값으로 몰래 바꾸지 않습니다. 화면에 “기타”, “상태 확인”, “소속 미지정”이 보이면 점검 창의 경고를 보고 시트 값을 고치세요.
그 밖에: `?source=json`(시트 무시, 백업만), `?nocache=1`(브라우저 보관본 무시).

---

## 7. 월간 점검

- [ ] 이름·직위: Team / Board / Awards / 시트 `members`·`news`·`awards` 표기 일치
- [ ] 링크 404 없음, Recruiting의 `recruit=Y` 과제가 실제 모집 과제와 일치
- [ ] 각 위젯 `?debug=1`에서 `sheet tab ✓`, 버린 행·경고 없음
- [ ] 사이트 문구 교정 목록 [docs/site_audit.md](docs/site_audit.md) 진행 (플레이스홀더 `OO`·`XX`·`00명` 포함)

---

## 8. 위젯 조작

- **Latest News:** 이전/다음, 가로 스와이프, ← → / Home / End, 분류 칩(전체·논문·수상·과제·행사·구성원)
- **논문:** 분류 타일 · 연도 막대(클릭=연도) · 연도 선택 · 검색(강조 표시) · 연구 주제 칩/드롭다운 + 항목별 `#태그` · `수상` 필터 · 더 보기
- **특허:** 전체/등록/출원 타일 · 연구 주제 · 검색
- **수상:** 분류 칩 · 검색 · 연도별 타임라인
- **구성원:** 역할 칩 · 졸업생 보기/숨기기 · 사진이 없으면 이니셜
- **과제:** 진행중/종료 · @PNU/@KIT · 기간 진행 막대(오늘 위치)
- **초청 강연:** 전체/국문/영문 · 검색 · 연도별 그래프
- **사진:** 앨범 칩 · 날짜순 격자(최신이 왼쪽 위) · 클릭하면 크게 보기(← → / Esc, 닫으면 원래 사진으로 포커스 복귀)

---

<details>
<summary><b>개발자용</b> — 코드 수정·배포·스크립트 (교수님·조교는 볼 필요 없음)</summary>

### 구조

| 경로 | 역할 |
| --- | --- |
| `config/sheets.js` | 시트 ID와 탭별 gviz CSV 주소, 열 목록 주석 |
| `shared/sheet-loader.js` | 공통 로더: 캐시(localStorage, 14일, stale-while-revalidate) → 시트(머리글 서명 검사) → `ADAM_INLINE` → `data/<탭>.json`; `?debug=1` 패널; `ADAM.track()` 버린 행·경고 보고; 날짜/월 정규화; 주제 사전 |
| `shared/tokens.css` · `base.css` · `sheet.css` · `page-publications.css` | 색·글꼴 토큰(히어로와 동일), 공통 UI, news 크롬, 논문·특허 공통 |
| `widgets/<이름>/` | 위젯 JS/CSS + 개발용 `index.html` |
| `<이름>/index.html` | Sites URL 삽입용 페이지 (`make_pages.py`가 생성, CSS/JS에 `?v=<해시>`) |
| `data/<탭>.json` | 백업 데이터 |
| `templates/sheet/<탭>.csv` | 시트 가져오기용 CSV (UTF-8 BOM) |
| `dist/<이름>-embed.html` | Sites “코드 삽입”용 단일 파일 (URL 삽입이 안 될 때만) |
| `assets/` | 사진·로고 (`assets/gallery/thumbs/*-480.jpg` 썸네일) |
| `docs/` | `site_audit.md`(사이트 교정 목록), `topic_review.md`(주제 태그 검토표) |

### 스크립트

| 명령 | 하는 일 |
| --- | --- |
| `python3 scripts/snapshot_sheet.py [탭…] [--csv] [--dry-run]` | 시트 → `data/<탭>.json` 백업 갱신(탭 서명 검사, 없는 탭은 건너뜀). 실행 후 커밋 |
| `python3 scripts/make_pages.py` | `/<이름>/index.html` 재생성 + `?v=` 캐시 무효화. **CSS/JS를 고칠 때마다 실행** |
| `python3 scripts/build_embed.py` | `dist/*-embed.html` 재생성 |
| `python3 scripts/make_thumbs.py` | `assets/gallery/*.jpg` → 480px 4:3 썸네일 |
| `python3 scripts/tag_topics.py [--force]` | 제목 키워드로 빈 `topics` 채우기(+`--force` 전부 다시) → `docs/topic_review.md` 재생성 |
| `python3 scripts/make_preview.py` / `--promote` / `--clean` | 코드 변경 미리보기 (아래) |
| `python3 scripts/sync_news_csv.py` | `data/news.json` → `templates/sheet/news.csv` |
| `scripts/extract_site.py` | 초기 1회용(공개 사이트 → CSV). 시트가 생긴 뒤에는 쓰지 말고 `snapshot_sheet.py` 사용 |

GitHub Actions는 쓰지 않습니다(배포는 Pages가 `main` 루트를 그대로 공개, `.nojekyll`).
백업 자동 갱신 워크플로는 일부러 두지 않았습니다 — 필요할 때 `snapshot_sheet.py`를 수동 실행하세요.

### 코드 변경 미리보기

클론 사이트(adam-pnu-2)도 같은 위젯 주소를 쓰므로 **클론에서는 코드 변경을 미리 볼 수 없습니다**(푸시하면 원본·클론이 동시에 바뀜). 대신:

```bash
python3 scripts/make_preview.py          # shared/ widgets/ config/ → preview/ 복사 + preview/<이름>/ 페이지
# preview/ 안의 파일을 수정
git add preview && git commit -m "preview: …" && git push
# https://soonjokwon.github.io/adam-lab-widgets/preview/<이름>/ 를 클론 Sites 페이지에 넣어 확인 (데이터·사진은 원본과 공유)
python3 scripts/make_preview.py --promote && python3 scripts/build_embed.py
python3 scripts/make_preview.py --clean && git add -A && git commit -m "…" && git push
```

`scripts/phone-preview.html?src=../publications/&w=390&h=350&scroll=600` 은 위젯을 폰 크기 iframe에 넣어 보여 줍니다(로컬 `python3 -m http.server` 또는 Pages).

### 배포 확인

```bash
python3 scripts/make_pages.py && python3 scripts/build_embed.py
git add -A && git commit -m "…" && git push
gh api repos/soonjokwon/adam-lab-widgets/pages/builds/latest --jq '.status+" "+.commit'
```

### 데이터 규칙 (위젯 코드)

- 탭 감지: gviz는 없는 탭 이름에 첫 탭을 돌려주므로 탭별 서명 열(`SIGNATURES`)과 `required` 열을 모두 검사.
- 강제 변환 금지: 모르는 `type`/`status`/`category`/`role`은 “기타” 묶음 + debug 경고, 빈 `group`은 “소속 미지정”.
- 논문 정렬: in-prep 맨 뒤 → 연도 내림차순 → 분류 순서 → 번호 내림차순 (날짜 미사용).
- 링크는 모두 `target="_blank" rel="noopener"`.

</details>
