import { WHITE, BLACK, CRIMSON, CRIMSON2, BEIGE, BEIGE_D, FONT, DARK_BG, PANEL_BG, PANEL_ALT, SELECT_BG, MENU_BG } from "./palette";

// ── Vaihepalkin nimi-solu ──────────────────────────────────────
// FIX: automatically switches to dark text for light-colored stages (WHITE, YELLOW, etc.)
export const stageNameSx = (color) => ({
  textAlign: "center",
  fontWeight: "bold",
  backgroundColor: color,
  color: "#fff",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.50rem",
  borderRadius: "4px",
  marginRight: "15px",
  px: 1,
  zIndex: 10,

  fontFamily: FONT,
  letterSpacing: "0.1em",
  textShadow: "0 1px 5px rgba(0,0,0,0.60)",
  border: `2px solid ${CRIMSON}45`,
});

// --daylabel-----
export const dayLabelSx = {
  backgroundColor: "transparent",
  textAlign: "center",
  fontWeight: "bold",
  height: 60, // TIME_LABEL_HEIGHT
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.85rem",
  userSelect: "none",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontFamily: FONT,
};

// ── Tapahtuma-kortti ───────────────────────────────────────────
export const eventCardSx = (color, gray) => ({
  backgroundColor: gray ? "#2a2a2a" : color,
  color: gray ? "#666" : "#fff",
  opacity: gray ? 0.45 : 1,
  p: "6px",
  mx: "2px",
  fontWeight: "bold",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "3px",
  border: gray ? `2px solid #444` : `2px solid ${color}99`,
  cursor: "pointer",
  transition: "all 0.2s ease",
  filter: gray ? "grayscale(100%) brightness(0.4)" : "none",
  zIndex: 10,
});

// ── Tapahtuman nimi-teksti ─────────────────────────────────────
export const eventNameSx = {
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  fontFamily: FONT,
  fontSize: "1.2rem",
  letterSpacing: "0.07em",
  textShadow: "0 1px 4px rgba(0,0,0,0.50)",
  lineHeight: 1.15,
};

// ── Tapahtuman aika-teksti ─────────────────────────────────────
export const eventTimeSx = {
  fontWeight: 500,
  fontSize: "0.85rem",
  mt: 0.4,
  textAlign: "center",
  fontFamily: FONT,
  opacity: 1,
  textShadow: "0 1px 3px rgba(0,0,0,0.50)",
  letterSpacing: "0.05em",
};

// ── Suosikki-ikonit ───────────────────────────────────────────
export const favIconSx = (WHITE) => ({
  color: WHITE,
  position: "absolute",
  bottom: 4,
  right: 4,
  fontSize: "1.4rem",
});

export const favBorderIconSx = {
  color: "rgba(255, 255, 255, 0.9)",
  position: "absolute",
  bottom: 4,
  right: 4,
  fontSize: "1.4rem",
};

// ── Vaiherivin wrapper ─────────────────────────────────────────
// Läpinäkyvät taustat jotta taustakuva paistaa läpi
export const stageRowSx = (isEven, timeLabelsLength, leftLabelWidth, timeColumnWidth, stageTotalHeight, mTop, mBot) => ({
  display: "grid",
  gridTemplateColumns: `${leftLabelWidth}px repeat(${timeLabelsLength},${timeColumnWidth}px)`,
  height: stageTotalHeight,
  pt: mTop,
  pb: mBot,
  background: "rgba(4,0,0,0.62)",
  position: "relative",
  zIndex: 1,
});

// ── Aikaleima-rivi ─────────────────────────────────────────────
export const timeRowSx = (timeLabelsLength, leftLabelWidth, timeColumnWidth, borderSide) => ({
  display: "grid",
  gridTemplateColumns: `${leftLabelWidth}px repeat(${timeLabelsLength},${timeColumnWidth}px)`,
  borderTop:    borderSide === "top"    ? `2px solid ${CRIMSON}85` : "none",
  borderBottom: borderSide === "bottom" ? `2px solid ${CRIMSON}85` : "none",
  background: "rgba(4,0,0,0.62)",
  zIndex: 10,
});

// ── Select (päivänvalinta) ─────────────────────────────────────
export const selectSx = {
  fontSize: "1.6rem",
  fontFamily: FONT,
  letterSpacing: "0.12em",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: `${CRIMSON}55` },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: `${CRIMSON}99` },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: CRIMSON },
  "& .MuiSelect-icon": { color: CRIMSON },
  background: SELECT_BG,
};

export const menuItemSx = {
  fontFamily: FONT,
  fontSize: "1.15rem",
  background: MENU_BG,
  "&:hover": { background: `${CRIMSON}33` },
};

// ── Kontrollipalkki ───────────────────────────────────────────
export const controlBarSx = {
  display: "flex",
  alignItems: "center",
  p: 2,
  gap: 2,
  background: "transparent",
  borderBottom: `2px solid ${CRIMSON}45`,
};

// ── "Tyhjennä suosikit" -nappi ────────────────────────────────
export const clearBtnSx = {
  color: `${CRIMSON}cc`,
  borderColor: `${CRIMSON}55`,
  fontFamily: FONT,
  fontSize: "1rem",
  letterSpacing: "0.12em",
  background: `${CRIMSON2}33`,
  "&:hover": {
    borderColor: CRIMSON,
    background: `${CRIMSON2}55`,
  },
};

// ── Vahvistusdialogi ──────────────────────────────────────────
export const dialogPaperSx = {
  background: "#0d0101",
  border: `2px solid ${CRIMSON}45`,
  color: BEIGE,
  fontFamily: FONT,
};

export const dialogTitleSx = {
  fontFamily: FONT,
  letterSpacing: "0.18em",
  fontSize: "1.6rem",
  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
};

export const dialogContentSx = {
  fontFamily: FONT,
  fontSize: "1.1rem",
  letterSpacing: "0.06em",
};

export const dialogCancelBtnSx = {
  color: `${BEIGE}88`,
  fontFamily: FONT,
  letterSpacing: "0.1em",
  "&:hover": { color: BEIGE },
};

export const dialogConfirmBtnSx = {
  color: CRIMSON,
  borderColor: `${CRIMSON}77`,
  fontFamily: FONT,
  letterSpacing: "0.1em",
  "&:hover": {
    background: `${CRIMSON}22`,
    borderColor: CRIMSON,
  },
};

// ── NOW-viiva ─────────────────────────────────────────────────
// Positioitu grid-wrapperin sisälle: top=0 = ylätimelabelin yläreuna,
// height=verticalLinesH = koko grid ylä-timerow + stagerivet + ala-timerow
export const nowLineSx = (leftLabelWidth, currentTimeIndex, timeColumnWidth, verticalLinesH) => ({
  position: "absolute",
  top: 0,
  left: leftLabelWidth + currentTimeIndex * timeColumnWidth,
  zIndex: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "translateX(-50%)",
  height: verticalLinesH,
  pointerEvents: "none",
});

export const nowBadgeSx = {
  backgroundColor: CRIMSON,
  px: 1,
  py: 0.25,
  borderRadius: "3px",
  fontSize: "0.78rem",
  fontWeight: "bold",
  mb: "2px",
  fontFamily: FONT,
  letterSpacing: "0.14em",
  textShadow: "0 1px 3px rgba(0,0,0,0.6)",
};

export const nowLineStemSx = (crimson, verticalLinesH) => ({
  width: "2px",
  height: verticalLinesH,
  background: `linear-gradient(to bottom,${crimson},${crimson}55)`,
});