import React, { useState, useCallback, useRef, useEffect } from "react";
import scheduleData from "../data/scheduleData";
import {
  TIME_COLUMN_WIDTH_PX,
  DEFAULT_DAY,
} from "../../utils/config";
import { generateTimeLabels } from "../../utils/timeUtils";
import {
  Box, Select, MenuItem, FormControl, Typography,
  Switch, FormControlLabel, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { EventCard } from "./EventCard";
import { useFavorites } from "./hooks/useFavorites";
import { useNowLine } from "./hooks/useNowLine";
import {
  stageNameSx,
  selectSx,
  menuItemSx,
  controlBarSx,
  clearBtnSx,
  dialogPaperSx,
  dialogTitleSx,
  dialogContentSx,
  dialogCancelBtnSx,
  dialogConfirmBtnSx,
  nowLineSx,
  nowBadgeSx,
  nowLineStemSx,
} from "./styles/stageRowStyles";
import { BEIGE, CRIMSON, FONT, MENU_BG } from "./styles/palette";

import sacredOathLogo from "../images/1773305430605_image.png";
import bgImage from "../images/20240630_225308_dq1_24_album_chronologisch.jpg";

const LEFT_LABEL_WIDTH  = 150;
const TIME_LABEL_HEIGHT = 60;
const STAGE_ROW_HEIGHT  = 90;
const M_TOP = 0.5;
const M_BOT = 0.5;
const STAGE_TOTAL_HEIGHT = STAGE_ROW_HEIGHT + (M_TOP + M_BOT) * 8;

const makeEventId = (selectedDay, stageName, eventName, start) =>
  `${selectedDay}-${stageName}-${eventName}-${start}`;

export default function Timetable() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");

  // Skaalataan layout mobiilille/tabletille
  const leftLabelWidth  = isMobile ? 72  : isTablet ? 100 : LEFT_LABEL_WIDTH;
  const timeLabelHeight = isMobile ? 40  : isTablet ? 50  : TIME_LABEL_HEIGHT;
  const stageRowHeight  = isMobile ? 60  : isTablet ? 75  : STAGE_ROW_HEIGHT;
  const timeColWidth    = isMobile ? 22  : isTablet ? 28  : TIME_COLUMN_WIDTH_PX;
  const stageTotalHeight = stageRowHeight + (M_TOP + M_BOT) * 8;
  const [selectedDay, setSelectedDay] = useState(() => {
    const s = localStorage.getItem("selectedDay");
    return s && scheduleData[s] ? s : DEFAULT_DAY;
  });

  const handleDayChange = useCallback((day) => {
    localStorage.setItem("selectedDay", day);
    setSelectedDay(day);
  }, []);

  const { stages = [], dayStart } = scheduleData[selectedDay] || {};
  const timeLabels = generateTimeLabels(dayStart);
  const totalWidth = timeLabels.length * timeColWidth;
  const verticalLinesH = stages.length * stageTotalHeight + 2 * timeLabelHeight;

  const { favorites, toggle: toggleFav, clear: clearFavs } = useFavorites();
  const { currentTimeIndex, showCurrentLine } = useNowLine(selectedDay, dayStart);

  const [showOnlyFav, setShowOnlyFav] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Hiiren drag -> horisontaalinen scroll
  const scrollRef = useRef(null);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e) => {
      dragState.current = { dragging: true, startX: e.pageX, scrollLeft: el.scrollLeft };
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };

    const onMouseMove = (e) => {
      if (!dragState.current.dragging) return;
      e.preventDefault();
      const dx = e.pageX - dragState.current.startX;
      el.scrollLeft = dragState.current.scrollLeft - dx;
    };

    const onMouseUp = () => {
      dragState.current.dragging = false;
      el.style.cursor = "grab";
      el.style.userSelect = "";
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.style.cursor = "grab";

    // Touch-tuki mobiilille — yhden sormen veto scrollaa, kahden sormen pinch zoomaa vapaasti
    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return; // pinch-to-zoom: älä häiritse
      const touch = e.touches[0];
      dragState.current = { dragging: true, startX: touch.pageX, scrollLeft: el.scrollLeft };
    };
    const onTouchMove = (e) => {
      if (e.touches.length !== 1) {
        dragState.current.dragging = false; // keskeytä drag jos toinen sormi lisätään
        return;
      }
      if (!dragState.current.dragging) return;
      const touch = e.touches[0];
      const dx = touch.pageX - dragState.current.startX;
      el.scrollLeft = dragState.current.scrollLeft - dx;
    };
    const onTouchEnd = () => { dragState.current.dragging = false; };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const renderTimeCells = useCallback(() =>
    timeLabels.map((time, i) => {
      const min = Number(time.split(":")[1]);
      const isHalf = min % 30 === 0;
      const isQuarter = min % 15 === 0;
      return (
        <Box
          key={i}
          sx={{
            width: timeColWidth,
            flexShrink: 0,
            height: timeLabelHeight,
            display: "flex",
            alignItems: "center",
            pr: "4px",
            ...(isQuarter && { borderLeft: `2px solid ${CRIMSON}65` }),
          }}
        >
          {isHalf && (
            <Typography sx={{ color: `${BEIGE}cc`, fontFamily: FONT, fontSize: isMobile ? "0.75rem" : "1.25rem", letterSpacing: "0.03em", fontWeight: 500, }}>
              {time}
            </Typography>
          )}
        </Box>
      );
    }), [timeLabels, timeColWidth, timeLabelHeight, isMobile]);

  return (
    <>
      <Box sx={{
        position: "fixed", inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        zIndex: 0,
      }} />
      <Box sx={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.72)",
        zIndex: 1, pointerEvents: "none",
      }} />

      <Box sx={{ position: "relative", zIndex: 2, fontSize: "1rem", color: BEIGE, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Kontrollipalkki */}
        <Box sx={{ ...controlBarSx, flexWrap: "wrap", gap: isMobile ? 1 : 2, p: isMobile ? 1 : 2 }}>
          <Box sx={{ flexShrink: 0, mr: 1 }}>
            <img src={sacredOathLogo} alt="Sacred Oath" style={{ height: isMobile ? 55 : 100, objectFit: "contain", display: "block" }} />
          </Box>
          <FormControl variant="outlined" sx={{ minWidth: isMobile ? 140 : 220 }}>
            <Select
              value={selectedDay}
              onChange={e => handleDayChange(e.target.value)}
              sx={selectSx}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: MENU_BG,
                    border: `2px solid ${CRIMSON}45`,
                    borderRadius: "4px",
                    mt: "4px",
                  }
                }
              }}
            >
              {Object.keys(scheduleData).map(day => (
                <MenuItem key={day} value={day} sx={menuItemSx}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={showOnlyFav}
                onChange={e => setShowOnlyFav(e.target.checked)}
                sx={{
                  "& .MuiSwitch-thumb": { backgroundColor: showOnlyFav ? CRIMSON : "#444" },
                  "& .MuiSwitch-track": { backgroundColor: showOnlyFav ? `${CRIMSON}55` : "#333" },
                }}
              />
            }
            label="Favorites Only"
            sx={{ color: `${BEIGE}cc`, "& .MuiFormControlLabel-label": { fontFamily: FONT, fontSize: "1rem", letterSpacing: "0.1em" } }}
          />
          <Button variant="outlined" onClick={() => setConfirmOpen(true)} sx={clearBtnSx}>
            Clear Favorites
          </Button>
        </Box>

        {/* GRID: sticky vasen sarake + scrollattava oikea osa */}
        <Box sx={{ display: "grid", gridTemplateColumns: `${leftLabelWidth}px 1fr` }}>

          {/* Vasen sticky sarake */}
          <Box sx={{
            position: "sticky",
            left: 0,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Ylärivin day-label */}
            <Box sx={{
              height: timeLabelHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(4,0,0,0.95)",
              borderBottom: `2px solid ${CRIMSON}85`,
              flexShrink: 0,
            }}>
              <Typography sx={{
                fontFamily: FONT, fontSize: isMobile ? "0.75rem" : "1.4rem", fontWeight: "bold",
                letterSpacing: "0.1em", textTransform: "uppercase", color: BEIGE,
                userSelect: "none",
              }}>
                {selectedDay}
              </Typography>
            </Box>

            {/* Stage-nimet */}
            {stages.map((stage, i) => (
              <Box
                key={i}
                sx={{
                  height: stageTotalHeight,
                  background: i % 2 === 0 ? "rgba(4,0,0,0.88)" : "rgba(10,2,2,0.88)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  px: isMobile ? "4px" : "8px",
                }}
              >
                <Box sx={{ ...stageNameSx(stage.color), width: "100%", height: stageRowHeight, marginRight: 0, fontSize: isMobile ? "0.75rem" : undefined }}>
                  {stage.name}
                </Box>
              </Box>
            ))}

            {/* Alarivin day-label */}
            <Box sx={{
              height: timeLabelHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(4,0,0,0.95)",
              borderTop: `2px solid ${CRIMSON}85`,
              flexShrink: 0,
            }}>
              <Typography sx={{
                fontFamily: FONT, fontSize: isMobile ? "0.75rem" : "1.4rem", fontWeight: "bold",
                letterSpacing: "0.1em", textTransform: "uppercase", color: BEIGE,
                userSelect: "none",
              }}>
                {selectedDay}
              </Typography>
            </Box>
          </Box>

          {/* Scrollattava oikea osa */}
          <Box
            ref={scrollRef}
            sx={{
              flex: 1,
              overflowX: "auto",
              overflowY: "hidden",
              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.3)" },
              "&::-webkit-scrollbar-thumb": { background: `${CRIMSON}88`, borderRadius: 3 },
              "&::-webkit-scrollbar:vertical": { width: 0 },
              cursor: "grab",
            }}
          >
            <Box sx={{ width: totalWidth, position: "relative" }}>

              {/* Ylä-timerow (sticky top) */}
              <Box sx={{
                position: "sticky",
                top: 0,
                zIndex: 20,
                display: "flex",
                background: "rgba(4,0,0,0.95)",
                borderBottom: `2px solid ${CRIMSON}85`,
                height: timeLabelHeight,
              }}>
                {renderTimeCells()}
              </Box>

              {/* Stage-rivit */}
              {stages.map((stage, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${timeLabels.length}, ${timeColWidth}px)`,
                    height: stageTotalHeight,
                    pt: `${M_TOP * 8}px`,
                    pb: `${M_BOT * 8}px`,
                    background: i % 2 === 0 ? "rgba(4,0,0,0.62)" : "rgba(10,2,2,0.62)",
                    position: "relative",
                  }}
                >
                  {stage.events.map((event, j) => {
                    const eid   = makeEventId(selectedDay, stage.name, event.name, event.start);
                    const isFav = favorites.includes(eid);
                    return (
                      <EventCard
                        key={j}
                        event={event}
                        dayStart={dayStart}
                        stageColor={stage.color}
                        isFavorite={isFav}
                        showOnlyFav={showOnlyFav}
                        onToggle={() => toggleFav(eid)}
                        isMobile={isMobile}
                      />
                    );
                  })}
                </Box>
              ))}

              {/* Ala-timerow (sticky bottom) */}
              <Box sx={{
                position: "sticky",
                bottom: 0,
                zIndex: 20,
                display: "flex",
                background: "rgba(4,0,0,0.95)",
                borderTop: `2px solid ${CRIMSON}85`,
                height: timeLabelHeight,
              }}>
                {renderTimeCells()}
              </Box>

              {/* NOW-viiva */}
              {showCurrentLine && currentTimeIndex !== null && currentTimeIndex > 0 && (
                <Box sx={{
                  ...nowLineSx(0, currentTimeIndex, timeColWidth, verticalLinesH),
                  left: currentTimeIndex * timeColWidth,
                }}>
                  <Box sx={nowBadgeSx}>NOW</Box>
                  <Box sx={nowLineStemSx(CRIMSON, verticalLinesH)} />
                </Box>
              )}

            </Box>
          </Box>
        </Box>

        {/* Vahvistusdialogi */}
        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          PaperProps={{ sx: dialogPaperSx }}
        >
          <DialogTitle sx={dialogTitleSx}>
            Clear All Favorites
            <IconButton
              onClick={() => setConfirmOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8, color: `${CRIMSON}88` }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={dialogContentSx}>
            Are you sure you want to clear all favorite events? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} sx={dialogCancelBtnSx}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={() => { clearFavs(); setConfirmOpen(false); }}
              sx={dialogConfirmBtnSx}
            >
              Clear All
            </Button>
          </DialogActions>
        </Dialog>

        {/* Kasvava tyhjä tila joka työntää footerin alas */}
        <Box sx={{ flex: 1, minHeight: 80 }} />

        {/* Footer */}
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 3,
          px: 3,
          borderTop: `2px solid ${CRIMSON}45`,
          background: "rgba(2,0,0,0.95)",
        }}>
          <Typography sx={{ color: `${BEIGE}cc`, fontFamily: FONT, textAlign: "center" }}>
            This is a personal fan project and is not affiliated with or endorsed by Q-dance or ID&T!
          </Typography>
        </Box>

      </Box>
    </>
  );
}