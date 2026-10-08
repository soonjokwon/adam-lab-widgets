# ADAM Lab@PNU 임베드 위젯

부산대학교 ADAM Lab(권순조 교수) Google Sites용 경량 위젯 저장소입니다.

- 공개 사이트: [adam-pnu](https://sites.google.com/view/adam-pnu)
- 클론(실험용): [adam-pnu-2](https://sites.google.com/view/adam-pnu-2)
- 소스 저장소: [soonjokwon/adam-lab-widgets](https://github.com/soonjokwon/adam-lab-widgets) (GitHub가 원본)

문장·정적 페이지는 Google Sites에 두고, Latest News처럼 자주 바뀌는 목록만 이 저장소(또는 Google Sheet)에서 호스팅해 Sites에 **URL 삽입**합니다. 붙여넣기용 단일 HTML(`dist/news-embed.html`)도 계속 지원합니다.

---

## 누가 무엇을 고치나

| 담당 | 고치는 곳 | 예시 |
| --- | --- | --- |
| 연구실 운영·조교 | **Google Spreadsheet** (탭 `news`, `publications`, `awards`, `members`) | 새 소식, 논문·수상·구성원 행 추가/수정 |
| 연구실 운영·조교 | **Google Sites** (원문 페이지) | Home/Research/Team 소개 문단, 이미지, 내비 |
| 개발·디자인 요청 | **이 GitHub 저장소** | 위젯 레이아웃, 색, 필터, 새 위젯 |

시트에 공개해도 되는 목록만 넣습니다. 게시된 CSV는 링크만 있으면 누구나 읽을 수 있습니다.

---

## 폴더

| 경로 | 역할 |
| --- | --- |
| `config/sheets.js` | 탭별 게시 CSV URL. 운영자가 URL을 붙여 넣는 곳 |
| `templates/sheet/` | 시트 탭 CSV 템플릿 (`news`는 `data/news.json`으로 미리 채움) |
| `data/news.json` | 시트 실패·미설정 시 쓰는 소식 백업 |
| `widgets/news/` | Latest News 소스·미리보기 |
| `news/` | Sites **URL 임베드**용 클린 페이지 (`/news/`) |
| `dist/news-embed.html` | Sites **코드 삽입**용 단일 파일 |
| `shared/` | 히어로와 맞춘 색·시트 크롬 |
| `scripts/build_embed.py` | 붙여넣기 HTML 빌드 |
| `scripts/sync_news_csv.py` | `news.json` → `templates/sheet/news.csv` |
| `.github/workflows/deploy-pages.yml` | GitHub Pages 배포 |

색 토큰: `--navy #102B86`, `--blue #0707AA`, `--ink #161A2B`, `--accent #FF9900`, `--grid #F0F2F7`, `--line #D8DDE8`.

---

## 콘텐츠 갱신 흐름 (소식)

```
Google Sheet 탭 news 수정
    → (웹에 게시된 CSV가 수 분 내 반영)
    → 호스팅 /news/ 가 페이지 로드 시 CSV fetch
    → Sites에 붙인 iframe만 새로고침하면 표시 갱신
    → 저장소 빌드/푸시 불필요
```

시트를 아직 안 붙였다면 `data/news.json`을 고치고 푸시한 뒤, Pages가 배포되면 `/news/`가 JSON을 읽습니다. 붙여넣기 HTML을 쓰는 경우에는 `python3 scripts/build_embed.py` 후 Sites 코드를 다시 붙여 넣습니다.

### 시트 한 권 · 탭 스키마

| 탭 | 열 | 비고 |
| --- | --- | --- |
| `news` | `date,title_ko,title_en,tag,link,image` | `tag`: Paper / Award / Project / Event / Member |
| `publications` | `year,authors,title,venue,type,doi,link` | `type`: `journal` \| `conference` \| `domestic` (이후 위젯) |
| `awards` | `date,award,recipients,event,link` | 이후 위젯 |
| `members` | `name_ko,name_en,role,start,end,photo,email,status` | `status`: `current` \| `alumni` (이후 위젯) |

템플릿 파일: `templates/sheet/*.csv`. 자세한 게시 절차는 `templates/sheet/README.md`.

### 탭을 CSV로 게시하고 URL 붙이기

1. Spreadsheet에서 **파일 → 공유 → 웹에 게시** (File → Share → Publish to web).
2. **해당 탭**을 고르고 형식을 **쉼표로 구분된 값(.csv)** 으로 게시한 뒤 URL을 복사합니다.
3. `config/sheets.js`에 붙여 넣습니다.

```javascript
window.ADAM_SHEETS = {
  news: "https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv",
  publications: "",
  awards: "",
  members: ""
};
```

4. URL 임베드(`/news/`)만 쓰면 **시트 URL을 넣은 커밋을 한 번** 푸시한 뒤에는, 소식 행 수정마다 푸시할 필요가 없습니다.
5. 런타임: `ADAM_NEWS_CSV_URL`(=`ADAM_SHEETS.news`) → 실패 시 번들/`news.json`.

---

## Sites에 넣기

### A. URL 삽입 (권장)

1. GitHub Pages(또는 Cloudflare Pages)에 이 저장소를 배포합니다.
2. Sites 편집 → **삽입 → 삽입 → URL**에 다음을 넣습니다.  
   `https://<Pages호스트>/news/`
3. 높이 **약 400px**, 너비는 섹션 전체.

원본 사이트에 넣기 **전에** [adam-pnu-2](https://sites.google.com/view/adam-pnu-2) 클론에서 확인합니다.

### B. 코드 삽입 (붙여넣기)

1. `python3 scripts/build_embed.py`
2. `dist/news-embed.html` 전체를 복사해 Sites **코드 삽입**에 붙입니다.
3. 시트 URL이 `config/sheets.js`에 있으면 붙여넣기 HTML도 로드 시 CSV를 읽고, 실패 시 파일 안 `ADAM_NEWS_ITEMS`로 돌아갑니다.

---

## 호스팅

### GitHub Pages (Actions)

워크플로: `.github/workflows/deploy-pages.yml`  
`main` 푸시 시 `_site`에 hub · `/news/` · `widgets/` · `data/` · `dist/` · `config/` · `templates/` 를 올려 Pages에 배포합니다.

저장소 설정:

1. **Settings → Pages → Build and deployment → GitHub Actions**
2. 첫 배포 후 URL 예: `https://soonjokwon.github.io/adam-lab-widgets/news/`

**주의:** 저장소가 **private**이면 GitHub Pages는 **GitHub Pro/Team/Enterprise**가 필요합니다. Pro가 없으면 아래 Cloudflare Pages를 쓰세요.

### Cloudflare Pages (private 저장소 대안)

1. [Cloudflare Pages](https://pages.cloudflare.com/)에서 GitHub 저장소 `soonjokwon/adam-lab-widgets`를 연결합니다.
2. 빌드 설정 예:
   - **Build command:** `python3 scripts/build_embed.py`
   - **Build output directory:** `/` (저장소 루트)
3. 배포 후 `https://<프로젝트>.pages.dev/news/` 를 Sites URL 삽입에 사용합니다.
4. `config/sheets.js`의 시트 URL만 채우면 이후 소식은 시트만 수정하면 됩니다.

로컬 미리보기:

```bash
python3 scripts/build_embed.py
python3 -m http.server 4179
# http://127.0.0.1:4179/news/
# http://127.0.0.1:4179/widgets/news/
```

---

## 디자인·기능 변경 요청

시트/ Sites 문구로 해결되지 않는 레이아웃·색·새 위젯은 GitHub 이슈 또는 담당 개발자에게 요청합니다. 변경은 `main`에 머지된 뒤 Pages가 다시 배포되어야 반영됩니다. 실험은 반드시 **adam-pnu-2**에서 확인한 다음 원본 adam-pnu에 적용합니다.

---

## 월간 점검 목록

매월 초(또는 학기 시작 시) 아래를 확인합니다.

- [ ] **이름:** Team / Board / Awards / 시트 `members`·`news` 한글·영문 표기 일치 (예: 예브게니)
- [ ] **링크:** 소식·논문·수상 링크 404·잘못된 대상 없음
- [ ] **최신 소식:** Latest News·Board 상단이 실제 최근 사건과 맞는지, 오래된 “Latest” 문구 없음
- [ ] **시트·JSON:** 시트 사용 중이면 CSV 게시가 켜져 있는지; 미사용이면 `data/news.json`이 최신인지
- [ ] **클론 先行:** 위젯·임베드 변경은 adam-pnu-2에서 본 뒤 원본 반영
- [ ] **플레이스홀더:** Research/Recruiting의 `OO`, `XX`, `00명` 등 미완성 문구 잔존 여부 (`docs/site_audit.md` 참고)

---

## 위젯 조작 (Latest News)

- 이전/다음, 가로 스와이프, 트랙 포커스 시 ← → / Home / End
- 태그 칩 필터 (칩 포커스 시 ← →)
- `prefers-reduced-motion`이면 애니메이션·스무스 스크롤 생략
