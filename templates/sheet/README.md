# Google Sheet 탭 템플릿

시트 하나(`1bmfsOkVl16OJ2KWzWJG6NtV5Ds98fXKnSiRtxKxgzlw`)에 아래 탭을 만듭니다. 각 CSV는 **현재 공개 사이트 내용**으로 채워져 있고 UTF-8 BOM입니다.

| 탭 이름 | 파일 | 열 | 위젯 |
| --- | --- | --- | --- |
| `news` | `news.csv` | `date,title_ko,title_en,tag,link,image` | `/news/` (이미 사용 중) |
| `publications` | `publications.csv` | `type,no,year,authors,title,topics,venue,details,date,presentation,status,link,note,extra_label,extra_link` | `/publications/` |
| `patents` | `patents.csv` | `no,title,topics,status,number,date,link,note` | `/patents/` |
| `awards` | `awards.csv` | `date,category,award,recipients,title,event,organizer,link` | `/awards/` |
| `members` | `members.csv` | `name_ko,name_en,role,position,start,end,status,photo,email,link,affiliation,history,lab` | `/members/` |
| `projects` | `projects.csv` | `title,org_role,researcher_role,program,funder,start,end,group,status,logo,link` | `/projects/` |
| `talks` | `talks.csv` | `date,title,venue,location,link` | `/talks/` |
| `gallery` | `gallery.csv` | `date,caption,image,group,link` | `/gallery/` |

## 가져오기

1. **파일 → 가져오기 → 업로드** → CSV 선택
2. **새 시트 삽입**, **“텍스트를 숫자, 날짜, 수식으로 변환” 해제**
3. 새 탭 이름을 위 표의 탭 이름과 **정확히** 같게 변경

이것만 하면 됩니다. 저장소 설정(`config/sheets.js`)은 이미 모든 탭을 가리킵니다. 탭이 없거나 비어 있으면 위젯은 `data/<탭>.json` 백업을 보여 줍니다. 허용값은 저장소 `README.md` 3장을 보세요.
