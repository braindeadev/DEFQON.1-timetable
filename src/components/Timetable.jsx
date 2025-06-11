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
  "2025-06-11_Thursday",
  "2025-06-11_Friday",
  "2025-06-11_Saturday",
  "2025-06-11_Sunday",
]);

const generateTimeLabels = (startTime) => {
  const labels = [];
  const [startHour] = startTime.split(":").map(Number);

  for (let h = startHour; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      labels.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
      );
    }
  }
  for (let h = 0; h < 3; h++) {
    for (let m = 0; m < 60; m += 15) {
      labels.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
      );
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
      const currentTimeStr = `${today.hour
        .toString()
        .padStart(2, "0")}:${today.minute.toString().padStart(2, "0")}`;
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
    const interval = setInterval(updateCurrentTime, 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedDay, dayStart]);

  return (
    <Box
      sx={{
        minWidth: `${150 + timeLabels.length * 110}px`, // wider time slots for bigger boxes
        fontFamily: "Arial, sans-serif",
        fontSize: "1rem", // bigger font overall
        lineHeight: 1.5,
      }}
    >
      <Box sx={{ p: 2 }}>
        <FormControl>
          <InputLabel id="day-label" sx={{ fontSize: "1.1rem" }}>
            Day
          </InputLabel>
          <Select
            labelId="day-label"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            sx={{ minWidth: 220, fontSize: "1.1rem" }}
          >
            {Object.keys(scheduleData).map((day) => (
              <MenuItem key={day} value={day} sx={{ fontSize: "1rem" }}>
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
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
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
            height: 60, // taller header
          }}
        >
          {selectedDay}
        </Box>
        {timeLabels.map((time, i) => (
          <Box
            key={i}
            sx={{
              textAlign: "left",
              paddingLeft: "8px",
              fontSize: "0.9rem",
              py: 1,
              fontWeight: 600,
              height: 60, // match header height
              display: "flex",
              alignItems: "center",

            }}
          >
            {time}
          </Box>
        ))}
      </Box>

      {/* Stage Rows */}
      {stages.map((stage, i) => (
        <Box
          key={i}
          sx={{
            display: "grid",
            gridTemplateColumns: `150px repeat(${timeLabels.length}, 110px)`,
            minHeight: 60, // taller rows
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
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
              fontSize: "1.15rem",
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
                elevation={3}
                  sx={{
                    gridColumn: `${Math.floor(colStart) + 2} / ${Math.ceil(colEnd) + 2}`,
                    backgroundColor: stage.color,
                    color: "#fff",
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
                    height: 60,
                    borderRadius: 0,
                  }}
              >
                <Typography noWrap sx={{ fontWeight: 700 }}>
                  {event.name}
                </Typography>
                <Typography
                  sx={{ fontWeight: 400, fontSize: "0.85rem", mt: 0.5 }}
                >
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
                width: 5,
                backgroundColor: "red",
                left: 150 + currentTimeIndex * 110,
                zIndex: 20,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
