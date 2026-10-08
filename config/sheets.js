/* Google Spreadsheet → Publish to web → CSV URLs for each tab.
   One workbook, four tabs: news, publications, awards, members.
   Paste the published CSV link for each tab below. Leave "" to use
   the bundled JSON/CSV fallback for that widget. */
window.ADAM_SHEETS = {
  /* columns: date,title_ko,title_en,tag,link,image */
  news: "https://docs.google.com/spreadsheets/d/1bmfsOkVl16OJ2KWzWJG6NtV5Ds98fXKnSiRtxKxgzlw/gviz/tq?tqx=out:csv&sheet=news",
  /* columns: year,authors,title,venue,type,doi,link
     type: journal | conference | domestic */
  publications: "",
  /* columns: date,award,recipients,event,link */
  awards: "",
  /* columns: name_ko,name_en,role,start,end,photo,email,status
     status: current | alumni */
  members: ""
};

window.ADAM_NEWS_CSV_URL = window.ADAM_SHEETS.news || "";
