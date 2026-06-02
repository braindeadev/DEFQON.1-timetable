// ── Stage-värit ────────────────────────────────────────────────
export const STAGE_COLORS = {
  "RED":              "#B70610",
  "BLUE":             "#0295BD",
  "BLACK":            "#2c2e31",
  "INDIGO":           "#050C80",
  "UV":               "#BB7FC9",
  "MAGENTA":          "#B7156B",
  "MAGENTA - SILENT": "#B7156B",
  "YELLOW":           "#D7BE01",
  "GOLD":             "#AD8F56",
  "ORANGE":           "#D04401",
  "PINK":             "#D96685",
  "GREEN":            "#27A927",
  "SILVER":           "#595f64",
  "PURPLE":           "#46206E",
  "WHITE":            "#F9FBFD",
  "BROWN - SILENT":   "#8B4D10",
  "STAMPKROEG":       "#D04401",
};

// Palauttaa stagen värin nimen perusteella, fallback CRIMSON
export const getStageColor = (name) => {
  if (STAGE_COLORS[name]) return STAGE_COLORS[name];
  
  // Etsi alkuosan perusteella (esim. "STAMPKROEG - ..." -> "STAMPKROEG")
  for (const key in STAGE_COLORS) {
    if (name.startsWith(key)) return STAGE_COLORS[key];
  }
  
  return "#910101";
};

export const CRIMSON   = "#910101";
export const WHITE     = "#ffffff";
export const CRIMSON2  = "#6E1828";
export const BLACK     = "#080202";
export const BEIGE     = "#BC9B5E";
export const BEIGE_L   = "#EDD8A8";
export const BEIGE_D   = "#4E3F26";
export const DARK_BG   = "rgba(6,2,2,0.95)";
export const PANEL_BG  = "rgba(12,4,4,0.92)";
export const PANEL_ALT = "rgba(18,6,6,0.90)";
export const SELECT_BG = `${BLACK}cc`;
export const MENU_BG   = "#0d0101";
export const FONT      = "'Bebas Neue','Anton',sans-serif";
export const BORDER_W  = 52;