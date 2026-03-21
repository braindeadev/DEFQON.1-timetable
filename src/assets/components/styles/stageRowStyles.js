import { Padding } from "@mui/icons-material";
import { BLACK, CRIMSON, BEIGE, BEIGE_L, BEIGE_D, FONT, DARK_BG, PANEL_BG, PANEL_ALT } from "./palette";

// ── Vaihepalkin nimi-solu ──────────────────────────────────────
export const stageNameSx = (color) => ({
  textAlign: "center",
  fontWeight: "bold",
  backgroundColor: color,
  color: "#fff",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.1rem",
  borderRadius: "4px",
  marginRight: "15px",
  px: 1,
  zIndex: 10,
  textShadow: "0 0 8px rgba(0,0,0,0.95)",
  fontFamily: FONT,
  letterSpacing: "0.08em",
  border: `1px solid ${color}aa`,
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
  fontSize: "1.4rem",
  color: BEIGE,
  userSelect: "none",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  fontFamily: FONT,
};

// ── Tapahtuma-kortti ───────────────────────────────────────────
export const eventCardSx = (color, gray) => ({
  backgroundColor: gray ? "#1a0606" : color,
  color: gray ? "#553030" : "#fff",
  opacity: gray ? 0.38 : 1,
  p: 2,
  fontWeight: "bold",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "4px",
  border: gray ? `1px solid #330808` : `2px solid ${color}cc`,
  cursor: "pointer",
  transition: "all 0.2s ease",
  filter: gray
    ? "grayscale(100%) brightness(0.32)"
    : `drop-shadow(0 0 5px ${color}88)`,
  zIndex: 10,
});

// ── Tapahtuman nimi-teksti ─────────────────────────────────────
export const eventNameSx = {
  fontWeight: 100,
  textShadow: "0 0 6px rgba(0,0,0,0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  fontFamily: FONT,
  fontSize: "0.95rem",
  letterSpacing: "0.06em",
};

// ── Tapahtuman aika-teksti ─────────────────────────────────────
export const eventTimeSx = {
  fontWeight: 400,
  fontSize: "0.73rem",
  mt: 0.4,
  textShadow: "0 0 4px rgba(0,0,0,0.9)",
  textAlign: "center",
  fontFamily: FONT,
  opacity: 0.88,
};

// ── Suosikki-ikonit ───────────────────────────────────────────
export const favIconSx = (crimson) => ({
  color: BEIGE_L,
  position: "absolute",
  bottom: 4,
  right: 4,
  fontSize: "1.2rem",
});

export const favBorderIconSx = {
  color: "rgba(255, 255, 255, 0.9)",
  position: "absolute",
  bottom: 4,
  right: 4,
  fontSize: "1.2rem",
};

// ── Vaiherivin wrapper ─────────────────────────────────────────
export const stageRowSx = (isEven, timeLabelsLength, leftLabelWidth, timeColumnWidth, stageTotalHeight, mTop, mBot) => ({
  display: "grid",
  gridTemplateColumns: `${leftLabelWidth}px repeat(${timeLabelsLength},${timeColumnWidth}px)`,
  height: stageTotalHeight,
  pt: mTop,
  pb: mBot,
  background: isEven ? PANEL_BG : PANEL_ALT,
  position: "relative",
  zIndex: 1,
  borderBottom: `2px solid ${CRIMSON}18`,
});

// ── Aikaleima-rivi ─────────────────────────────────────────────
export const timeRowSx = (timeLabelsLength, leftLabelWidth, timeColumnWidth) => ({
  display: "grid",
  gridTemplateColumns: `${leftLabelWidth}px repeat(${timeLabelsLength},${timeColumnWidth}px)`,
  borderTop:    `2px solid ${CRIMSON}55`,
  borderBottom: `2px solid ${CRIMSON}55`,
  background: DARK_BG,
  zIndex: 10,
});

// ── Select (päivänvalinta) ─────────────────────────────────────
export const selectSx = {
  fontSize: "1.1rem",
  color: BEIGE,
  fontFamily: FONT,
  letterSpacing: "0.12em",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: `${CRIMSON}55` },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: `${CRIMSON}99` },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: CRIMSON },
  "& .MuiSelect-icon": { color: CRIMSON },
  background: "#080202cc",
};

export const menuItemSx = {
  color: BEIGE,
  fontFamily: FONT,
  fontSize: "1rem",
  background: "#0d0101",
  "&:hover": { background: `${CRIMSON}33` },
};

// ── Kontrollipalkki ───────────────────────────────────────────
export const controlBarSx = {
  display: "flex",
  alignItems: "center",
  p: 2,
  gap: 2,
  background: "rgba(10,2,2,0.90)",
  borderBottom: `1px solid ${CRIMSON}33`,
};

// ── "Tyhjennä suosikit" -nappi ────────────────────────────────
export const clearBtnSx = {
  color: `${CRIMSON}bb`,
  borderColor: `${CRIMSON}44`,
  fontFamily: FONT,
  fontSize: "0.9rem",
  letterSpacing: "0.1em",
  "&:hover": {
    borderColor: CRIMSON,
    color: BEIGE_L,
    background: `${CRIMSON}22`,
  },
};

// ── Vahvistusdialogi ──────────────────────────────────────────
export const dialogPaperSx = {
  background: "#0d0101",
  border: `1px solid ${CRIMSON}77`,
  color: BEIGE,
  fontFamily: FONT,
};

export const dialogTitleSx = {
  fontFamily: FONT,
  color: BEIGE_L,
  letterSpacing: "0.15em",
  fontSize: "1.4rem",
};

export const dialogContentSx = {
  color: `${BEIGE}aa`,
  fontFamily: FONT,
  fontSize: "1rem",
  letterSpacing: "0.05em",
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
    color: BEIGE_L,
  },
};

// ── NOW-viiva ─────────────────────────────────────────────────
export const nowLineSx = (leftLabelWidth, currentTimeIndex, timeColumnWidth) => ({
  position: "absolute",
  top: -24,
  left: leftLabelWidth + currentTimeIndex * timeColumnWidth,
  zIndex: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "translateX(-50%)",
});

export const nowBadgeSx = {
  backgroundColor: CRIMSON,
  color: BEIGE_L,
  px: 1,
  py: 0.25,
  borderRadius: "3px",
  fontSize: "0.68rem",
  fontWeight: "bold",
  mb: "2px",
  fontFamily: FONT,
  letterSpacing: "0.12em",
};

export const nowLineStemSx = (crimson, verticalLinesH) => ({
  width: "2px",
  height: verticalLinesH,
  background: `linear-gradient(to bottom,${crimson},${crimson}55)`,
});