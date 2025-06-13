import React, { useState, useEffect } from "react";
import scheduleData from "./scheduleData";
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
import { DateTime } from "luxon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const allowedDateDays = new Set([
  "2025-06-12_Thursday",
  "2025-06-12_Friday",
  "2025-06-12_Saturday",
  "2025-06-12_Sunday",
]);

const generateTimeLabels = (startTime) => {
  const labels = [];
  const [startHour] = startTime.split(":").map(Number);
  for (let h = startHour; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      labels.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    }
  }
  for (let h = 0; h <= 3; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 3 && m > 0) break;
      labels.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    }
  }
  return labels;
};

const timeToIndex = (time, dayStart) => {
  const [startH, startM] = dayStart.split(":").map(Number);
  const [h, m] = time.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const currentMinutes = (h < startH ? h + 24 : h) * 60 + m;
  return (currentMinutes - startMinutes) / 15;
};

export default function Timetable() {
  const today = DateTime.now().setZone("Europe/Amsterdam");
  const todayISO = today.toISODate();
  const defaultDay = "Thursday";

  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const { stages = [], dayStart } = scheduleData[selectedDay] || {};
  const timeLabels = generateTimeLabels(dayStart);

  const [showCurrentLine, setShowCurrentLine] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(null);

  // Favorites
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

  // Show Only Favorites toggle
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const updateCurrentTime = () => {
    const key = `${todayISO}_${selectedDay}`;
    if (allowedDateDays.has(key)) {
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

  // Confirmation dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);

  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);

  const clearAllFavorites = () => {
    setFavorites([]);
    closeConfirm();
  };

  // Calculate total width of time columns area for vertical lines
  const totalWidth = timeLabels.length * 110;

  // Shared style for day label (top and bottom)
  const dayLabelStyle = {
    textAlign: "center",
    fontWeight: "bold",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
    borderRadius: "4px 0 0 0",
    color: "#e0e0e0",
    userSelect: "none",
    filter: "drop-shadow(0 0 1px black)",
  };

  return (
    <Box
      sx={{
        minWidth: `${150 + totalWidth}px`,
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "1rem",
        color: "#e0e0e0",
        paddingBottom: "2rem",
        position: "relative",
      }}
    >
      {/* Controls */}
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

      {/* Header Row (top time labels) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `150px repeat(${timeLabels.length}, 110px)`,
          top: 0,
          zIndex: 10,
        }}
      >
        <Box sx={dayLabelStyle}>{selectedDay}</Box>
        {timeLabels.map((time, i) => {
          const [_, m] = time.split(":");
          const show = Number(m) % 30 === 0;
          return (
            <Box
              key={i}
              sx={{
                position: "relative",
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {show && (
                <Typography sx={{ position: "absolute", top: 10, color: "#bbb", fontWeight: 600 }}>
                  {time}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Vertical grid lines behind events */}
      <Box
        sx={{
          position: "absolute",
          top: 100,
          left: 150,
          height: stages.length * 107,
          width: totalWidth,
          pointerEvents: "none",
          display: "flex",
          zIndex: 0,
        }}
      >
        {timeLabels.map((_, i) => {
          if (i === 0) return null;
          return (
            <Box
              key={i}
              sx={{
                width: 110,
                borderLeft: "1px solid #666",
                boxSizing: "border-box",
                height: "100%",
              }}
            />
          );
        })}
      </Box>

      {/* Stage Rows */}
      {stages.map((stage, i) => {
        const visibleEvents = stage.events;

        return (
          <Box
            key={i}
            sx={{
              display: "grid",
              gridTemplateColumns: `150px repeat(${timeLabels.length}, 110px)`,
              alignItems: "center",
              position: "relative",
              height: 90,
              mb: 1,
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
                borderRadius: "4px 0 0 4px",
                px: 1,
                filter: "drop-shadow(0 0 1px black)",
                zIndex: 10,
              }}
            >
              {stage.name}
            </Box>

            {visibleEvents.length > 0 ? (
              visibleEvents.map((event, j) => {
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
              })
            ) : (
              <Box
                sx={{
                  gridColumn: `2 / span ${timeLabels.length}`,
                  height: "100%",
                }}
              />
            )}

            {showCurrentLine && currentTimeIndex !== null && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: 4,
                  backgroundColor: "red",
                  left: 150 + currentTimeIndex * 110,
                  zIndex: 20,
                  animation: "pulse 0.1s infinite ease-in-out",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
            )}
          </Box>
        );
      })}

      {/* Bottom time labels with day label */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `150px repeat(${timeLabels.length}, 110px)`,
          borderTop: "1px solid #555",
          marginTop: 1,
          height: 60,
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Day label at bottom left using same style as top label but with bottom border radius */}
        <Box
          sx={{
            ...dayLabelStyle,
            borderRadius: "0 0 0 4px",
            height: 60,
          }}
        >
          {selectedDay}
        </Box>

        {/* Time labels */}
        {timeLabels.map((time, i) => {
          const [_, m] = time.split(":");
          const show = Number(m) % 30 === 0;
          return (
            <Box
              key={i}
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.85rem",
                color: "#bbb",
                fontWeight: 600,
                lineHeight: "60px",
                userSelect: "none",
              }}
            >
              {show && time}
            </Box>
          );
        })}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={closeConfirm}>
        <DialogTitle>Clear All Favorites?</DialogTitle>
        <DialogContent>
          Are you sure you want to clear all your favorite sets? This action cannot be undone lol.
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={clearAllFavorites} color="error">
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
