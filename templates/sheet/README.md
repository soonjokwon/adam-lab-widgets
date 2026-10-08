# Google Spreadsheet 탭 템플릿

하나의 스프레드시트에 아래 네 탭을 만듭니다. 각 CSV를 **파일 → 가져오기**로 넣거나, 헤더 행을 그대로 복사합니다.

| 탭 이름 | 템플릿 | 열 |
| --- | --- | --- |
| `news` | `news.csv` | `date,title_ko,title_en,tag,link,image` |
| `publications` | `publications.csv` | `year,authors,title,venue,type,doi,link` |
| `awards` | `awards.csv` | `date,award,recipients,event,link` |
| `members` | `members.csv` | `name_ko,name_en,role,start,end,photo,email,status` |

`news.csv`는 `data/news.json`에서 채워 둔 초기 데이터입니다. 갱신:

```bash
python3 scripts/sync_news_csv.py
```

## 탭을 CSV로 웹에 게시

1. Google Spreadsheet에서 **파일 → 공유 → 웹에 게시** (File → Share → Publish to web).
2. 상단에서 **전체 문서가 아니라 해당 탭**(`news`, `publications`, …)을 고릅니다.
3. 형식을 **쉼표로 구분된 값(.csv)** 으로 고르고 **게시**합니다.
4. 나온 URL을 복사합니다. 보통  
   `https://docs.google.com/spreadsheets/d/e/<PUB_ID>/pub?gid=<GID>&single=true&output=csv`  
   형태입니다. `gid`가 탭마다 다릅니다.
5. URL을 저장소의 `config/sheets.js`에 붙여 넣습니다.

```javascript
window.ADAM_SHEETS = {
  news: "https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv",
  publications: "",
  awards: "",
  members: ""
};
```

6. 호스팅 중인 `/news/` 페이지는 **푸시 없이** 시트 수정만으로 갱신됩니다(게시된 CSV 캐시가 몇 분 걸릴 수 있음).
7. Sites에 **코드 삽입**으로 `dist/news-embed.html`을 쓰는 경우: `config/sheets.js`를 바꾼 뒤 `python3 scripts/build_embed.py`로 다시 빌드해 붙여 넣거나, URL 임베드로 전환합니다.

게시된 CSV는 링크가 있는 누구나 읽을 수 있습니다. 공개해도 되는 내용만 넣으세요.
