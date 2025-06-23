import React, { useState, useEffect } from "react";
import scheduleData from "../data/scheduleData";
import backgroundImage from "../images/20240630_225308_dq1_24_album_chronologisch.jpg";
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
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DateTime } from "luxon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";

const DayLabel = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(30, 30, 30, 0.8)",
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

  const [selectedDay, setSelectedDay] = useState(() => {
    const savedDay = localStorage.getItem("selectedDay");
    return savedDay && scheduleData[savedDay] ? savedDay : DEFAULT_DAY;
  });

  const { stages = [], dayStart } = scheduleData[selectedDay] || {};
  const timeLabels = generateTimeLabels(dayStart);

  const LEFT_LABEL_WIDTH = 150;
  const timeLabelHeight = 60;
  const stageRowHeight = 90;
  const stageRowMarginTop = 0.5;
  const stageRowMarginBottom = 0.5;

  const stageTotalHeight =
    stageRowHeight + (stageRowMarginTop + stageRowMarginBottom) * 8;


  const verticalLinesHeight =
    stages.length * stageTotalHeight + 2 * timeLabelHeight;

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

  useEffect(() => {
    localStorage.setItem("selectedDay", selectedDay);
  }, [selectedDay]);

  const getEventId = (stageName, eventName, startTime) =>
    `${selectedDay}-${stageName}-${eventName}-${startTime}`;

  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
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
    <>
      {/* Background Image + Overlay */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* UI Controls */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minWidth: `${LEFT_LABEL_WIDTH + totalWidth}px`,
          fontSize: "1rem",
          color: "#e0e0e0",
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
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#888" },
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

        {/* Timetable Grid */}
        <Box
          sx={{
            position: "relative",
            width: LEFT_LABEL_WIDTH + totalWidth,
            overflowX: "visible",
          }}
        >
          {/* Time Labels (Top) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `${LEFT_LABEL_WIDTH}px repeat(${timeLabels.length}, ${TIME_COLUMN_WIDTH_PX}px)`,
              borderBottom: "2px solid #555",
              backgroundColor: "rgba(30, 30, 30, 0.8)",
              zIndex: 10,
            }}
          >
            <DayLabel>{selectedDay}</DayLabel>
            {timeLabels.map((time, i) => {
              const [, m] = time.split(":");
              return (
                <Box
                  key={i}
                  sx={{
                    height: timeLabelHeight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Number(m) % 30 === 0 && (
                    <Typography sx={{ color: "#bbb", fontWeight: 600 }}>{time}</Typography>
                  )}
                </Box>
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
                gridTemplateColumns: `${LEFT_LABEL_WIDTH}px repeat(${timeLabels.length}, ${TIME_COLUMN_WIDTH_PX}px)`,
                height: stageRowHeight + (stageRowMarginTop + stageRowMarginBottom) * 8, // account for padding
                pt: stageRowMarginTop,
                pb: stageRowMarginBottom,
                backgroundColor: "rgba(30, 30, 30, 0.8)",
                position: "relative",
                zIndex: 1,
              }}
            >


                {/* Stage Label */}
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

                {/* Events */}
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
                        gridColumn: `${Math.floor(colStart) + 2} / ${Math.ceil(colEnd) + 2}`,
                        backgroundColor: shouldGrayOut ? "#555" : stage.color,
                        color: shouldGrayOut ? "#999" : "#fff",
                        opacity: shouldGrayOut ? 0.5 : 1,
                        p: 2,
                        fontWeight: "bold",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        borderRadius: "6px",
                        border: shouldGrayOut ? "2px solid #444" : "2px solid #000",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        filter: shouldGrayOut
                          ? "grayscale(80%) drop-shadow(0 0 1px black)"
                          : "drop-shadow(0 0 1px black)",
                        zIndex: 10,
                        position: "relative",
                      }}
                      onClick={() => toggleFavorite(eventId)}
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
                        textAlign: "center",
                      }}
                    >
                      {event.start} - {event.end}
                    </Typography>


                      {isFavorited ? (
                        <FavoriteIcon
                          sx={{
                            color: "white",
                            position: "absolute",
                            bottom: 6,
                            right: 6,
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          sx={{
                            color: "white",
                            position: "absolute",
                            bottom: 6,
                            right: 6,
                          }}
                        />
                      )}
                    </Paper>
                  );
                })}
              </Box>
            );
          })}

          {/* Time Labels (Bottom) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `${LEFT_LABEL_WIDTH}px repeat(${timeLabels.length}, ${TIME_COLUMN_WIDTH_PX}px)`,
              borderTop: "2px solid #555",
              backgroundColor: "rgba(30, 30, 30, 0.8)",
              zIndex: 10,
            }}
          >
            <DayLabel>{selectedDay}</DayLabel>
            {timeLabels.map((time, i) => {
              const [, m] = time.split(":");
              return (
                <Box key={i} sx={{ height: timeLabelHeight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {Number(m) % 30 === 0 && (
                    <Typography sx={{ color: "#bbb", fontWeight: 600 }}>{time}</Typography>
                  )}
                </Box>
              );
            })}
          </Box>

          {/* Vertical Grid Lines */}
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
              <Box key={i} sx={{ borderLeft: i === 0 ? "none" : "1px solid #444", height: "100%" }} />
            ))}
          </Box>

          {/* Current Time Red Line */}
          {showCurrentLine && currentTimeIndex !== null && currentTimeIndex > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: -24,
                left: LEFT_LABEL_WIDTH + currentTimeIndex * TIME_COLUMN_WIDTH_PX,
                zIndex: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: "translateX(-50%)",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "red",
                  color: "#fff",
                  px: 1,
                  py: 0.25,
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  mb: "2px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.5)",
                }}
              >
                NOW
              </Box>
              <Box sx={{ width: "4px", height: verticalLinesHeight, backgroundColor: "red", border: "1px solid #444" }} />
            </Box>
          )}
        </Box>

        {/* Confirmation Dialog */}
        <Dialog open={confirmOpen} onClose={closeConfirm}>
          <DialogTitle>
            Clear All Favorites
            <IconButton
              aria-label="close"
              onClick={closeConfirm}
              sx={{ position: "absolute", right: 8, top: 8, color: "#aaa" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            Are you sure you want to clear all favorite events? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={closeConfirm} color="primary">
              Cancel
            </Button>
            <Button onClick={clearAllFavorites} color="error" variant="contained">
              Clear All
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
