export const TIME_STEP_MINUTES = 5;
export const TIME_COLUMN_WIDTH_PX = 37;
export const DEFAULT_DAY = "Thursday";

// Festivaalipäivät: avain on muotoa "YYYY-MM-DD_Weekday"
// NOW-viiva näkyy vain niille päiville, joiden päivämäärä vastaa tämänpäiväistä datumia.
// Päivitä päivämäärät vastaamaan oikeita festarin päiviä ennen julkaisua.
export const ALLOWED_DATE_DAYS = new Set([
  "2026-06-18_Thursday",
  "2026-06-19_Friday",
  "2026-06-20_Saturday",
  "2026-06-21_Sunday",
]);