/* Latest News sheet URL.
   Prefer editing config/sheets.js (ADAM_SHEETS.news). This file keeps a
   direct override for local experiments. Leave "" to inherit sheets.js. */
if (typeof window.ADAM_NEWS_CSV_URL !== "string" || !window.ADAM_NEWS_CSV_URL) {
  window.ADAM_NEWS_CSV_URL =
    (window.ADAM_SHEETS && window.ADAM_SHEETS.news) || "";
}
