// ── Stage-värit ────────────────────────────────────────────────
export const STAGE_COLORS = {
  "RED":              "#FF0000",
  "BLUE":             "#0ADDF0",
  "BLACK":            "#808080",
  "INDIGO":           "#3641D7",
  "UV":               "#D492FF",
  "MAGENTA":          "#FF008B",
  "MAGENTA - SILENT": "#FF008B",
  "YELLOW":           "#F1E300",
  "GOLD":             "#BB9551",
  "ORANGE":           "#FF6500",
  "PINK":             "#EE81A0",
  "GREEN":            "#00FF00",
  "SILVER":           "#C8D3D9",
  "PURPLE":           "#A100FE",
  "WHITE":            "#F9FBFD",
  "BROWN - SILENT":   "#8B4D10",
  "STAMPKROEG":       "#B6D7A8",
};

// Palauttaa stagen värin nimen perusteella, fallback CRIMSON
export const getStageColor = (name) =>
  STAGE_COLORS[name] ?? "#A60132";

export const CRIMSON   = "#A60132";
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