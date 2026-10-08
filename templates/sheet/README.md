# Google Sheet 탭 템플릿

시트 `1bmfsOkVl16OJ2KWzWJG6NtV5Ds98fXKnSiRtxKxgzlw`에 아래 탭을 만듭니다. 각 CSV는 현재 공개 사이트 내용이며 UTF-8 BOM입니다.
가져오는 방법·드롭다운·공개 범위 주의는 저장소 [README.md](../../README.md) 2장을 보세요.

| 탭 이름 | 파일 | 열 |
| --- | --- | --- |
| `news` | `news.csv` (전체 42행) · `news_append.csv` (기존 탭에 붙일 17행) | `date,title_ko,title_en,tag,link,image,link2` (append 파일은 `link2` 제외 6열) |
| `publications` | `publications.csv` | `type,no,year,authors,title,topics,venue,details,date,presentation,status,link,note,extra_label,extra_link` |
| `patents` | `patents.csv` | `no,title,topics,status,number,date,link,note` |
| `awards` | `awards.csv` | `date,category,award,recipients,title,event,organizer,link` |
| `members` | `members.csv` | `name_ko,name_en,role,position,start,end,status,photo,email,link,affiliation,history,lab` |
| `projects` | `projects.csv` | `title,org_role,researcher_role,program,funder,start,end,group,status,recruit,hidden,logo,link` |
| `talks` | `talks.csv` | `date,title,venue,location,link` |
| `gallery` | `gallery.csv` | `date,caption,image,group,link` |
| `sections` | `sections.csv` (글 블록 85줄) | `block,section,type,sub,text,link,image` |

가져오기: **파일 → 가져오기 → 업로드** → **새 시트 삽입** → **“텍스트를 숫자, 날짜, 수식으로 변환” 해제** → 탭 이름을 위 표와 똑같이 변경.
