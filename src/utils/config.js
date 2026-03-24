export const TIME_STEP_MINUTES = 5;
export const TIME_COLUMN_WIDTH_PX = 37;
export const DEFAULT_DAY = "Thursday";

// DEV: kaikki päivät käyttävät tämänpäiväistä datumia jotta NOW-viiva näkyy
// Vaihda oikeisiin festarin päivämääriin ennen tuotantoon vientiä
export const ALLOWED_DATE_DAYS = new Set([
  "2026-03-21_Thursday",
  "2026-03-21_Friday",
  "2026-03-21_Saturday",
  "2026-03-22_Sunday",
]);