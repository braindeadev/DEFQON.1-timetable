import React, { useState, useEffect } from "react"; 
import scheduleData from "./scheduleData";
import {
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { DateTime } from "luxon";

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
  const diff = currentMinutes - startMinutes;
  return diff / 15;
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

  return (
    <Box
      sx={{
        minWidth: `${150 + timeLabels.length * 110}px`,
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "1rem",
        lineHeight: 1.5,
        position: "relative",
        color: "#e0e0e0",
        paddingBottom: "2rem",
        margin: 0,
      }}
    >
      {/* Day Selector */}
      <Box sx={{ p: 2 }}>
        <FormControl variant="outlined" sx={{ minWidth: 220 }}>
          <InputLabel id="day-label" sx={{ color: "#ccc", textShadow: "0 0 1px rgba(0,0,0,0.6)" }}>
          </InputLabel>
          <Select
            labelId="day-label"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            sx={{
              fontSize: "1.1rem",
              color: "#eee",
              textShadow: "0 0 2px rgba(0,0,0,0.7)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#555",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#90caf9",
              },
              "& .MuiSelect-icon": {
                color: "#90caf9",
              },
            }}
          >
            {Object.keys(scheduleData).map((day) => (
              <MenuItem
                key={day}
                value={day}
                sx={{
                  fontSize: "1rem",
                  color: "#e0e0e0",
                }}
              >
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Header Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `150px repeat(${timeLabels.length}, 110px)`,
          top: 0,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            height: 60,
            color: "#e0e0e0",
            textShadow: "0 0 4px rgba(0,0,0,0.8)",
          }}
        >
          {selectedDay}
        </Box>
        {timeLabels.map((time, i) => {
          const [hour, minute] = time.split(":").map(Number);
          const show = minute % 30 === 0;

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
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    color: "#bbb",
                    fontWeight: 600,
                    textShadow: "0 0 2px rgba(0,0,0,0.6)",
                    zIndex: 5,
                    fontSize: "1.15rem",

                  }}
                >
                  {time}
                </Typography>
              )}
            </Box>
          );
        })}

      </Box>

      {/* Grid Overlay */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `150px repeat(${timeLabels.length}, 110px)`,
          position: "absolute",
          top: 130,
          bottom: 25,
        }}
      >
        <Box />
        {timeLabels.map((_, i) => (
          <Box
            key={i}
            sx={{
              borderRight: i === timeLabels.length - 1 ? "none" : "1px solid #444",
              borderLeft: i === 0 ? "1px solid #444" : "none",
            }}
          />
        ))}
      </Box>

      {/* Stage Rows */}
      {stages.map((stage, i) => (
        <Box
          key={i}
          sx={{
            display: "grid",
            gridTemplateColumns: `150px repeat(${timeLabels.length}, 110px)`,
            minHeight: 60,
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              backgroundColor: stage.color,
              color: "#fff",
              textShadow: "0 0 4px rgba(0,0,0,0.8)",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
              fontSize: "1.15rem",
              boxShadow: "inset 0 0 5px rgba(0,0,0,0.7)",
            }}
          >
            {stage.name}
          </Box>

          {stage.events.map((event, j) => {
            const colStart = timeToIndex(event.start, dayStart);
            const colEnd = timeToIndex(event.end, dayStart);
            return (
              <Paper
                key={j}
                elevation={4}
                sx={{
                  gridColumn: `${Math.floor(colStart) + 2} / ${Math.ceil(colEnd) + 2}`,
                  backgroundColor: stage.color,
                  color: "#fff",
                  textShadow: "0 0 3px rgba(0,0,0,0.7)",
                  p: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: "1rem",
                  height: 70,
                  borderRadius: "6px",
                  marginTop: "7px",
                  marginBottom: "7px",
                  border: "2px solid #000",
                  "&:hover": {
                    transform: "none",
                    boxShadow: "none",
                    cursor: "default",
                  },
                }}
              >
                <Typography noWrap sx={{ fontWeight: 700 }}>
                  {event.name}
                </Typography>
                <Typography sx={{ fontWeight: 400, fontSize: "0.85rem", mt: 0.5 }}>
                  {event.start} - {event.end}
                </Typography>
              </Paper>
            );
          })}

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
                animation: "pulse 1.2s infinite ease-in-out",
                "@keyframes pulse": {
                  "0%": { opacity: 1 },
                  "50%": { opacity: 0.5 },
                  "100%": { opacity: 1 },
                },
              }}
            />
          )}
        </Box>
      ))}

      {/* Bottom Time Labels */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `150px repeat(${timeLabels.length}, 110px)`,
          mt: 2,
        }}
      >
        <Box />
        {timeLabels.map((time, i) => {
          const [hour, minute] = time.split(":").map(Number);
          const show = minute % 30 === 0;

          return (
            <Box
              key={i}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {show && (
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    color: "#bbb",
                    fontWeight: 600,
                    textShadow: "0 0 2px rgba(0,0,0,0.6)",
                    fontSize: "1.15rem",
                  }}
                >
                  {time}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
