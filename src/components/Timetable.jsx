import React, { useState } from "react";
import scheduleData from "./scheduleData";
import {
  Box,
  Paper,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";

// Generate time labels based on a starting time and fixed end time (03:00 next day)
const generateTimeLabels = (startTime) => {
  const labels = [];
  const [startHour] = startTime.split(":").map(Number);

  // From startHour (e.g., 18) to 23:45
  for (let h = startHour; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      labels.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    }
  }

  // From 00:00 to 03:00
  for (let h = 0; h < 3; h++) {
    for (let m = 0; m < 60; m += 15) {
      labels.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    }
  }

  return labels;
};

// Convert HH:mm to index in the labels array based on dayStart
const timeToIndex = (time, dayStart) => {
  const [startH, startM] = dayStart.split(":").map(Number);
  const [h, m] = time.split(":").map(Number);

  const startMinutes = startH * 60 + startM;
  const currentMinutes = (h < startH ? h + 24 : h) * 60 + m;

  const diff = currentMinutes - startMinutes;
  return Math.floor(diff / 15); // 15-min interval index
};

// Schedule data with dayStart per day
// Fixed schedule data

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState("Thursday");
  const { stages = [], dayStart } = scheduleData[selectedDay] || {};
  const timeLabels = generateTimeLabels(dayStart);

  return (
    <Box sx={{ minWidth: `${150 + timeLabels.length * 100}px`, fontFamily: "Arial" }}>
      <Box sx={{ p: 2 }}>
        <FormControl>
          <InputLabel id="day-label">Day</InputLabel>
          <Select
            labelId="day-label"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            {Object.keys(scheduleData).map((day) => (
              <MenuItem key={day} value={day}>
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
          gridTemplateColumns: `150px repeat(${timeLabels.length}, 100px)`,
          borderBottom: "2px solid black",
          borderTop: "2px solid black",
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
            borderRight: "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selectedDay}
        </Box>
        {timeLabels.map((time, i) => (
          <Box
            key={i}
            sx={{
              textAlign: "center",
              borderLeft: "1px solid black",
              fontSize: "0.75rem",
              py: 1,
              fontWeight: 500,
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
            gridTemplateColumns: `150px repeat(${timeLabels.length}, 100px)`,
            borderBottom: "1px solid black",
            minHeight: 50,
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
              borderRight: "1px solid black",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
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
                elevation={2}
                sx={{
                  gridColumn: `${colStart + 2} / ${colEnd + 2}`,
                  backgroundColor: stage.color,
                  color: "#fff",
                  p: 1,
                  borderRadius: 0,
                  textAlign: "center",
                  fontWeight: "bold",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  border: "1px solid #000",
                }}
              >
                {event.name}
              </Paper>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}
