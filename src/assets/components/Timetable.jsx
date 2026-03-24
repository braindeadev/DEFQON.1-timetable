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
import { BEIGE, BEIGE_L, CRIMSON, FONT, DARK_BG, MENU_BG } from "../components/styles/palette";
import {dayLabelSx} from "../components/styles/stageRowStyles";

import sacredOathLogo from "../images/1773305430605_image.png";
import bgImage from "../images/20240630_225308_dq1_24_album_chronologisch.jpg";

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

// ── Yhteinen aikarivi-komponentti (ylä- ja alarivi) ────────────
function TimeRow({ timeLabels, leftLabelWidth, timeColumnWidth, timeLabelHeight, borderSide, label }) {
  return (
    <Box sx={{ ...timeRowSx(timeLabels.length, leftLabelWidth, timeColumnWidth, borderSide), overflow: "hidden" }}>
      <Box sx={{ ...dayLabelSx, width: leftLabelWidth, flexShrink: 0 }}>{label ?? ""}</Box>
      {timeLabels.map((time, i) => {
        const min = Number(time.split(":")[1]);
        const isHalf = min % 30 === 0;
        const isQuarter = min % 15 === 0;
        return (
          <Box
            key={i}
            sx={{
              height: timeLabelHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...(isQuarter && { borderLeft: `2px solid ${CRIMSON}65`, paddingLeft: 1.5}),
            }}
          >
            {isHalf && (
              <Typography sx={{ color: `${BEIGE}cc`, fontFamily: FONT, fontSize: "1.25rem", letterSpacing: "0.03em", fontWeight: 500 }}>
                {time}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

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
      {/* Taustakuva */}
      <Box sx={{
        position: "fixed", inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        zIndex: 0,
      }} />
      {/* Tumma peite kuvan päällä */}
      <Box sx={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.72)",
        zIndex: 1, pointerEvents: "none",
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

          {/* Grid-alue: ylä-timerow + stagerivet + ala-timerow */}
          <Box sx={{ position: "relative" }}>

            {/* AIKA-AKSELI (Yläpalkki) */}
            <TimeRow
              timeLabels={timeLabels}
              leftLabelWidth={LEFT_LABEL_WIDTH}
              timeColumnWidth={TIME_COLUMN_WIDTH_PX}
              timeLabelHeight={TIME_LABEL_HEIGHT}
              borderSide="bottom"
              label={selectedDay}
            />

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
            <TimeRow
              timeLabels={timeLabels}
              leftLabelWidth={LEFT_LABEL_WIDTH}
              timeColumnWidth={TIME_COLUMN_WIDTH_PX}
              timeLabelHeight={TIME_LABEL_HEIGHT}
              borderSide="top"
              label={selectedDay}
            />

            {/* NOW-viiva: alkaa gridin yläreunasta (top=0), kattaa koko grid-alueen */}
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

        {/* Footer */}
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 3,
          px: 3,
          mt: 50,
          borderTop: `2px solid ${CRIMSON}45`,
          background: "rgba(2,0,0,0.95)",
          gap: 2,
        }}>
          {["left", "center", "right"].map(align => (
            <Typography key={align} sx={{ color: `${BEIGE}66`, fontFamily: FONT, textAlign: align, flex: 1 }}>
              This is a personal fan project and is not affiliated with or endorsed by Q-dance or ID&T!
            </Typography>
          ))}
        </Box>

      </Box>
    </>
  );
}