import React, { useState, useCallback } from "react";
import scheduleData from "../data/scheduleData";
import {
  TIME_COLUMN_WIDTH_PX,
  DEFAULT_DAY,
} from "../../utils/config";
import { generateTimeLabels } from "../../utils/timeUtils";
import {
  Box, Select, MenuItem, FormControl, Typography,
  Switch, FormControlLabel, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import { EventCard } from "./EventCard";
import { useFavorites } from "./hooks/useFavorites";
import { useNowLine } from "./hooks/useNowLine";
import {
  stageNameSx,
  stageRowSx,
  timeRowSx,
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
} from "../components/styles/stageRowStyles";
import { BEIGE, BEIGE_L, CRIMSON, FONT, DARK_BG } from "../components/styles/palette";
import {dayLabelSx} from "../components/styles/stageRowStyles";

import sacredOathLogo from "../images/1773305430605_image.png";

// ── Layout-vakiot ──────────────────────────────────────────────
const LEFT_LABEL_WIDTH  = 150;
const TIME_LABEL_HEIGHT = 60;
const STAGE_ROW_HEIGHT  = 90;
const M_TOP = 0.5;
const M_BOT = 0.5;
const STAGE_TOTAL_HEIGHT = STAGE_ROW_HEIGHT + (M_TOP + M_BOT) * 8;

// ── Apufunktio: tapahtuma-ID ───────────────────────────────────
const makeEventId = (selectedDay, stageName, eventName, start) =>
  `${selectedDay}-${stageName}-${eventName}-${start}`;

// ══════════════════════════════════════════════════════════════
export default function Timetable() {
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
  const totalWidth = timeLabels.length * TIME_COLUMN_WIDTH_PX;
  const verticalLinesH = stages.length * STAGE_TOTAL_HEIGHT + 2 * TIME_LABEL_HEIGHT;

  const { favorites, toggle: toggleFav, clear: clearFavs } = useFavorites();
  const { currentTimeIndex, showCurrentLine } = useNowLine(selectedDay, dayStart);

  const [showOnlyFav, setShowOnlyFav] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      {/* Taustaväri */}
      <Box sx={{
        position: "fixed", inset: 0,
        background: "radial-gradient(ellipse at 50% 0%, #220404 0%, #0e0101 40%, #000 100%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* ── Sisältö ── */}
      <Box sx={{
        position: "relative", zIndex: 2,
        minWidth: `${LEFT_LABEL_WIDTH + totalWidth}px`,
        fontSize: "1rem", color: BEIGE, margin: "0 auto",
      }}>

        {/* Kontrollipalkki */}
        <Box sx={controlBarSx}>
          <Box sx={{flexShrink: 0, mr: 1 }}>
            <img src={sacredOathLogo} alt="Sacred Oath" style={{ height: 100, objectFit: "contain", display: "block" }} />
          </Box>

          <FormControl variant="outlined" sx={{ minWidth: 220 }}>
            <Select
              value={selectedDay}
              onChange={e => handleDayChange(e.target.value)}
              sx={selectSx}
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

        {/* Taulukkoruudukko */}
        <Box sx={{ position: "relative", width: LEFT_LABEL_WIDTH + totalWidth, overflowX: "visible" }}>

          {/* Aikaleima-rivi (ylhäällä) */}
          <Box sx={timeRowSx(timeLabels.length, LEFT_LABEL_WIDTH, TIME_COLUMN_WIDTH_PX, "bottom")}>
            <Box sx={dayLabelSx}>{selectedDay}</Box>
            {timeLabels.map((time, i) => {
              const [, m] = time.split(":");
              return (
                <Box key={i} sx={{ height: TIME_LABEL_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {Number(m) % 30 === 0 && (
                    <Typography sx={{ color: `${BEIGE}cc`, fontFamily: FONT, fontSize: "1.25rem", letterSpacing: "0.03em", fontWeight: 500, marginLeft: 1.5, }}>
                      {time}
                    </Typography>
                  )}  
                </Box>
              );
            })}
          </Box>

          {/* Vaiheiden rivit */}
          {stages.map((stage, i) => (
            <Box
              key={i}
              sx={stageRowSx(i % 2 === 0, timeLabels.length, LEFT_LABEL_WIDTH, TIME_COLUMN_WIDTH_PX, STAGE_TOTAL_HEIGHT, M_TOP, M_BOT)}
            >
              <Box sx={stageNameSx(stage.color)}>
                {stage.name}
              </Box>

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
                  />
                );
              })}
            </Box>
          ))}

          {/* Aikaleima-rivi (alhaalla) */}
          <Box sx={timeRowSx(timeLabels.length, LEFT_LABEL_WIDTH, TIME_COLUMN_WIDTH_PX, "top")}>
            <Box sx={dayLabelSx}>{selectedDay}</Box>
            {timeLabels.map((time, i) => {
              const [, m] = time.split(":");
              return (
                <Box key={i} sx={{ height: TIME_LABEL_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {Number(m) % 30 === 0 && (
                    <Typography sx={{ color: `${BEIGE}cc`, fontFamily: FONT, fontSize: "1.25rem", letterSpacing: "0.03em", fontWeight: 500, marginLeft: 1.5, }}>
                      {time}
                    </Typography>
                  )}  
                </Box>
              );
            })}
          </Box>

          {/* Vertikaalit ruudukkoviivat */}
          <Box sx={{
            position: "absolute", top: 0, left: LEFT_LABEL_WIDTH,
            width: totalWidth, height: verticalLinesH,
            display: "grid",
            gridTemplateColumns: `repeat(${timeLabels.length},${TIME_COLUMN_WIDTH_PX}px)`,
            zIndex: 0,
          }}>
            {timeLabels.map((time, i) => {
              const [, m] = time.split(":");
              return (
                <Box key={i} sx={{
                  borderLeft: i === 0 ? "none" : `2px solid ${Number(m) === 0 ? `${CRIMSON}2e` : `${CRIMSON}10`}`,
                  height: "100%",
                }} />
              );
            })}
          </Box>

          {/* NOW-viiva */}
          {showCurrentLine && currentTimeIndex !== null && currentTimeIndex > 0 && (
            <Box sx={nowLineSx(LEFT_LABEL_WIDTH, currentTimeIndex, TIME_COLUMN_WIDTH_PX, verticalLinesH)}>
              <Box sx={nowBadgeSx}>NOW</Box>
              <Box sx={nowLineStemSx(CRIMSON, verticalLinesH)} />
            </Box>
          )}
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
      </Box>
    </>
  );
}