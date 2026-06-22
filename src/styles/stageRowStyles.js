import { WHITE, BLACK, CRIMSON, BEIGE, BEIGE_L, BEIGE_D, FONT, DARK_BG, PANEL_BG, PANEL_ALT, SELECT_BG, MENU_BG } from "./palette";
import bgImage from "../assets/images/20240630_225308_dq1_24_album_chronologisch.jpg";

// ── Vaihepalkin nimi-solu ──────────────────────────────────────
export const stageNameSx = (color) => ({
  textAlign: "center",
  fontWeight: "bold",
  background: color,
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
});


// --daylabel-----
export const dayLabelSx = {
  backgroundColor: "transparent",
  textAlign: "center",
  fontWeight: "bold",
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.95rem",
  userSelect: "none",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontFamily: FONT,
};

// ── Tapahtuma-kortti ───────────────────────────────────────────
export const eventCardSx = (color, gray) => ({
  backgroundColor: gray ? "#3a3a3a" : color,
  color: gray ? "#999" : "#fff",
  opacity: gray ? 0.65 : 1,
  p: "6px",
  mx: "2px",
  fontWeight: "bold",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "3px",
  border: gray ? `2px solid #555` : `2px solid ${color}99`,
  cursor: "pointer",
  transition: "all 0.2s ease",
  filter: gray ? "grayscale(80%) brightness(0.7)" : "none",
  zIndex: 10,
});

// ── Tapahtuman nimi-teksti ─────────────────────────────────────
export const eventNameSx = {
  fontFamily: FONT,
  fontWeight: 400,
  fontSize: "0.90rem", // Pienennetty oletuksesta
  lineHeight: 1.1,
  mb: 0.2,
  color: WHITE,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

export const eventTimeSx = {
  fontFamily: FONT,
  fontSize: "0.7rem", // Pienennetty oletuksesta
  color: WHITE,
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
};

// ── "Tyhjennä suosikit" -nappi ────────────────────────────────
export const clearBtnSx = {
  color: `${CRIMSON}cc`,
  borderColor: `${CRIMSON}55`,
  fontFamily: FONT,
  fontSize: "1rem",
  letterSpacing: "0.12em",
  "&:hover": {
    borderColor: CRIMSON,
    background: `${CRIMSON}22`,
  },
};

// ── Vahvistusdialogi ──────────────────────────────────────────
export const dialogPaperSx = {
  backgroundImage: `linear-gradient(rgba(5, 1, 1, 0.98), rgba(5, 1, 1, 0.98)), url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  border: `2px solid ${CRIMSON}cc`,
  color: BEIGE_L,
  boxShadow: "0 15px 50px rgba(0,0,0,0.95)",
  borderRadius: "12px",
};

export const dialogTitleSx = {
  fontFamily: FONT,
  letterSpacing: "0.15em",
  fontSize: "2rem",
  fontWeight: "bold",
  color: WHITE,
  borderBottom: `2px solid ${CRIMSON}`,
  pb: 1.5,
  textAlign: "center",
  textShadow: "0 2px 5px rgba(0, 0, 0, 0.9)",
};

export const dialogContentSx = {
  pt: 2.5,
};

export const dialogDescSx = {
  fontFamily: FONT,
  fontSize: "1rem",
  lineHeight: 1.3,
  color: `${BEIGE_L}bb`, // Hieman pehmeämpi luettavuus
  mb: 2,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

export const dialogLabelSx = {
  fontFamily: FONT,
  fontSize: "1.15rem",
  letterSpacing: "0.08em",
  color: BEIGE,
  textTransform: "uppercase",
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

export const dialogActionBtnSx = (isDanger) => ({
  background: isDanger ? `linear-gradient(135deg, ${CRIMSON}dd, #500000)` : `rgba(13, 1, 1, 0.5)`,
  color: isDanger ? WHITE : BEIGE,
  border: isDanger ? `1px solid ${CRIMSON}` : `1px solid ${CRIMSON}66`,
  fontFamily: FONT,
  letterSpacing: "0.12em",
  fontSize: "1.1rem",
  fontWeight: "bold",
  py: 1.2,
  borderRadius: "4px",
  textTransform: "uppercase",
  boxShadow: isDanger ? `0 0 15px ${CRIMSON}44` : "none",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    background: isDanger ? CRIMSON : `${CRIMSON}22`,
    borderColor: CRIMSON,
    color: WHITE,
    boxShadow: isDanger ? `0 0 25px ${CRIMSON}66` : `0 0 15px ${CRIMSON}44`,
  },
  "&.Mui-disabled": {
    background: "rgba(0, 0, 0, 0.2)",
    color: "rgba(188, 155, 94, 0.3)",
    borderColor: "rgba(145, 1, 1, 0.15)",
  }
});

export const dialogSectionHeaderSx = (isDanger = false) => ({
  fontFamily: FONT,
  fontSize: "1.3rem",
  letterSpacing: "0.12em",
  mb: 2,
  color: isDanger ? CRIMSON : BEIGE,
  borderLeft: `4px solid ${CRIMSON}`,
  pl: 1.5,
  pb: 0.2,
  textTransform: "uppercase",
});

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