import React, { useState, useEffect } from "react";
import scheduleData from "../data/scheduleData";
import {
  TIME_STEP_MINUTES,
  TIME_COLUMN_WIDTH_PX,
  DEFAULT_DAY,
  ALLOWED_DATE_DAYS,
} from "../../utils/config";
import { generateTimeLabels, timeToIndex } from "../../utils/timeUtils";
import {
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DateTime } from "luxon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const DayLabel = styled(Box)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "bold",
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.25rem",
  color: "#e0e0e0",
  userSelect: "none",
  filter: "drop-shadow(0 0 1px black)",
}));

export default function Timetable() {
  const today = DateTime.now().setZone("Europe/Amsterdam");
  const todayISO = today.toISODate();

  const [selectedDay, setSelectedDay] = useState(DEFAULT_DAY);
  const { stages = [], dayStart } = scheduleData[selectedDay] || {};
  const timeLabels = generateTimeLabels(dayStart);

  // Constants for layout — replace hardcoded values here:
  const LEFT_LABEL_WIDTH = 150;
  const timeLabelHeight = 60;
  const stageRowHeight = 90;
  const stageRowMarginTop = 0.5;
  const stageRowMarginBottom = 0.5;

  const stageTotalHeight =
    stageRowHeight + stageRowMarginTop * 4 + stageRowMarginBottom * 4;

  const verticalLinesHeight = stages.length * stageTotalHeight + 2 * timeLabelHeight;

  // For current time red line positioning and height
  const currentLineTop = 0;
  const currentLineHeight = stages.length * stageTotalHeight + 2 * timeLabelHeight;

  const [showCurrentLine, setShowCurrentLine] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const getEventId = (stageName, eventName, startTime) =>
    `${selectedDay}-${stageName}-${eventName}-${startTime}`;

  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const updateCurrentTime = () => {
    const key = `${todayISO}_${selectedDay}`;
    if (ALLOWED_DATE_DAYS.has(key)) {
      const currentTimeStr = `${today.hour.toString().padStart(2, "0")}:${today.minute
        .toString()
        .padStart(2, "0")}`;
      const idx = timeToIndex(currentTimeStr, dayStart);
      setCurrentTimeIndex(idx);
      setShowCurrentLine(true);
    } else {
      setShowCurrentLine(false);
      setCurrentTimeIndex(null);
    }
  };

  useEffect(() => {
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, [selectedDay, dayStart]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);
  const clearAllFavorites = () => {
    setFavorites([]);
    closeConfirm();
  };

  const totalWidth = timeLabels.length * TIME_COLUMN_WIDTH_PX;

  return (
    <Box
      sx={{
        minWidth: `${LEFT_LABEL_WIDTH + totalWidth}px`,
        fontSize: "1rem",
        color: "#e0e0e0",
        paddingBottom: 0,
        position: "relative",
        margin: "0 auto",
        overflowX: "visible",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 2 }}>
        <FormControl variant="outlined" sx={{ minWidth: 220 }}>
          <Select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            sx={{
              fontSize: "1.1rem",
              color: "#eee",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#888" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#90caf9" },
              "& .MuiSelect-icon": { color: "#90caf9" },
            }}
          >
            {Object.keys(scheduleData).map((day) => (
              <MenuItem key={day} value={day} sx={{ fontSize: "1rem", color: "#e0e0e0" }}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={showOnlyFavorites}
              onChange={(e) => setShowOnlyFavorites(e.target.checked)}
              color="warning"
            />
          }
          label="Show Only Favorites"
          sx={{ color: "#e0e0e0" }}
        />

        <Button variant="outlined" color="error" onClick={openConfirm}>
          Clear All Favorites
        </Button>
      </Box>

      {/* TIMETABLE WRAPPER STARTS HERE */}
      <Box
        className="timetable"
        sx={{
          position: "relative",
          width: LEFT_LABEL_WIDTH + totalWidth,
          overflowX: "visible",
        }}
      >
        {/* Top time labels */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ` ${LEFT_LABEL_WIDTH}px repeat(${timeLabels.length}, ${TIME_COLUMN_WIDTH_PX}px)`,
            top: 0,
            zIndex: 10,
            borderBottom: "2px solid #555",
          }}
        >
          <DayLabel sx={{ borderRadius: "4px 0 0 0" }}>{selectedDay}</DayLabel>
          {timeLabels.map((time, i) => {
            const [_, m] = time.split(":");
            const show = Number(m) % 30 === 0;
            return (
              <Box
                key={i}
                sx={{
                  height: timeLabelHeight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {show && (
                  <Typography sx={{ color: "#bbb", fontWeight: 600, userSelect: "none" }}>
                    {time}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Stages */}
        {stages.map((stage, i) => {
          const visibleEvents = stage.events;

          return (
            <Box
              key={i}
              sx={{
                display: "grid",
                gridTemplateColumns: ` ${LEFT_LABEL_WIDTH}px repeat(${timeLabels.length}, ${TIME_COLUMN_WIDTH_PX}px)`,
                alignItems: "center",
                position: "relative",
                height: stageRowHeight,
                mt: stageRowMarginTop,
                mb: stageRowMarginBottom,
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: stage.color,
                  color: "#fff",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.15rem",
                  borderRadius: "4px",
                  marginRight: "15px",
                  px: 1,
                  zIndex: 10,
                  textShadow: "0 0 3px rgba(0,0,0,0.9)",

                }}
              >
                {stage.name}
              </Box>

              {visibleEvents.map((event, j) => {
                const colStart = timeToIndex(event.start, dayStart);
                const colEnd = timeToIndex(event.end, dayStart);
                const eventId = getEventId(stage.name, event.name, event.start);
                const isFavorited = favorites.includes(eventId);
                const shouldGrayOut = showOnlyFavorites && !isFavorited;

                return (
                  <Paper
                    key={j}
                    elevation={4}
                    sx={{
                      position: "relative",
                      gridColumn: `${Math.floor(colStart) + 2} / ${Math.ceil(colEnd) + 2}`,
                      backgroundColor: shouldGrayOut ? "#555" : stage.color,
                      color: shouldGrayOut ? "#999" : "#fff",
                      opacity: shouldGrayOut ? 0.5 : 1,
                      p: 2,
                      textAlign: "center",
                      fontWeight: "bold",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                      borderRadius: "6px",
                      border: shouldGrayOut ? "2px solid #444" : "2px solid #000",
                      boxSizing: "border-box",
                      transition: "all 0.3s ease",
                      filter: shouldGrayOut
                        ? "grayscale(80%) drop-shadow(0 0 1px black)"
                        : "drop-shadow(0 0 1px black)",
                      zIndex: 10,
                    }}
                  >
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 700,
                      textShadow: "0 0 3px rgba(0,0,0,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    {event.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "0.85rem",
                      mt: 0.5,
                      textShadow: "0 0 3px rgba(0,0,0,0.9)",
                    }}
                  >
                    {event.start} - {event.end}
                  </Typography>

                    {isFavorited ? (
                      <FavoriteIcon
                        onClick={() => toggleFavorite(eventId)}
                        sx={{
                          cursor: "pointer",
                          color: "white",
                          filter: "drop-shadow(0 0 1px black)",
                          position: "absolute",
                          bottom: 6,
                          right: 6,
                        }}
                        aria-label="Unfavorite"
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={() => toggleFavorite(eventId)}
                        sx={{
                          cursor: "pointer",
                          color: "white",
                          filter: "drop-shadow(0 0 1px black)",
                          position: "absolute",
                          bottom: 6,
                          right: 6,
                        }}
                        aria-label="Favorite"
                      />
                    )}
                  </Paper>
                );
              })}
            </Box>
          );
        })}

        {/* Bottom time labels */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ` ${LEFT_LABEL_WIDTH}px repeat(${timeLabels.length}, ${TIME_COLUMN_WIDTH_PX}px)`,
            zIndex: 10,
            borderTop: "2px solid #555",
          }}
        >
          <DayLabel sx={{ borderRadius: "4px 0 0 0" }}>{selectedDay}</DayLabel>
          {timeLabels.map((time, i) => {
            const [_, m] = time.split(":");
            const show = Number(m) % 30 === 0;
            return (
              <Box
                key={i}
                sx={{
                  height: timeLabelHeight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {show && (
                  <Typography sx={{ color: "#bbb", fontWeight: 600, userSelect: "none" }}>
                    {time}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Vertical grid lines */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: LEFT_LABEL_WIDTH,
            width: totalWidth,
            height: verticalLinesHeight,
            display: "grid",
            gridTemplateColumns: `repeat(${timeLabels.length}, ${TIME_COLUMN_WIDTH_PX}px)`,
            zIndex: 0,
          }}
        >
          {timeLabels.map((_, i) => (
            <Box
              key={i}
              sx={{
                borderLeft: i === -1 ? "none" : "1px solid #444",
                height: "100%",
              }}
            />
          ))}
        </Box>

        {/* Current time red line */}
        {showCurrentLine && currentTimeIndex !== null && currentTimeIndex > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: LEFT_LABEL_WIDTH + currentTimeIndex * TIME_COLUMN_WIDTH_PX,
              width: "5px",
              height: currentLineHeight,
              backgroundColor: "red",
              zIndex: 20,
              border: "1px solid #444",
            }}
          />
        )}
      </Box>

      <Dialog open={confirmOpen} onClose={closeConfirm}>
        <DialogTitle>Clear All Favorites</DialogTitle>
        <DialogContent>
          Are you sure you want to clear all favorites? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>Cancel</Button>
          <Button color="error" onClick={clearAllFavorites}>
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
