import React, { useState } from "react";
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
const scheduleData = {
  Thursday: {
    dayStart: "18:00",
    stages: [
      {
        name: "BLUE",
        color: "#0ADDF0",
        events: [
          { name: "Vertile", start: "18:00", end: "19:00" },
          { name: "Wildstylez", start: "19:00", end: "20:00" },
          { name: "Sub Zero Project", start: "20:00", end: "21:00" },
          { name: "Warface & Rooler", start: "21:00", end: "22:00" },
          { name: "TNT", start: "22:00", end: "22:45" },
        ],
      },
      {
        name: "BLACK",
        color: "#808080",
        events: [
          { name: "Angerfist", start: "18:00", end: "19:00" },
          { name: "Endymion & The Viper", start: "19:00", end: "20:00" },
          { name: "Hysta", start: "20:00", end: "21:00" },
          { name: "N-Vitral", start: "21:00", end: "22:00" },
          { name: "Dimitri K & MC Robs", start: "22:00", end: "23:00" },
        ],
      },
      {
        name: "INDIGO",
        color: "#3641D7",
        events: [
          { name: "Vexxed", start: "18:00", end: "18:45" },
          { name: "Adaro & Unresolved", start: "18:45", end: "19:30" },
          { name: "Rejecta & Deluzion", start: "19:30", end: "20:15" },
          { name: "The Saints", start: "20:15", end: "21:15" },
          { name: "Coldax", start: "21:15", end: "22:00" },
          { name: "Lunakorpz & Amigo", start: "22:00", end: "22:45" },
        ],
      },
      {
        name: "BROWN - SILENT",
        color: "#8B4D10",
        events: [
          { name: "Ricardo Moreno", start: "18:00", end: "19:00" },
          { name: "Bass Chaserz & Hans Glock", start: "19:00", end: "20:00" },
          { name: "Noiseflow", start: "20:00", end: "21:00" },
          { name: "Mr. Bassmeister", start: "21:00", end: "22:00" },
          { name: "Opgekonkerd", start: "22:00", end: "23:00" },
        ],
      },
      {
        name: "MAGENTA - SILENT",
        color: "#FF008B",
        events: [
          { name: "Zelecter", start: "18:00", end: "19:00" },
          { name: "EMS", start: "19:00", end: "20:00" },
          { name: "Mickyg & Twstd", start: "20:00", end: "21:00" },
          { name: "Ephoric", start: "21:00", end: "22:15" },
          { name: "Act of Rage & Wasted Penguinz", start: "22:15", end: "23:15" },
          { name: "Invector & Demi Kanon", start: "23:15", end: "00:30" },
          { name: "Psyko Punkz", start: "00:30", end: "02:00" },
        ],
      },
    ],
  },
  Friday: {
    dayStart: "11:00",
    stages: [
      {
        name: "RED",
        color: "#FF0000",
        events: [
          { name: "The Opening Ceremony with DR Peacock", start: "13:00", end: "14:00" },
          { name: "Galactixx", start: "14:00", end: "15:00" },
          { name: "Atmozfears & Adrenalize", start: "15:00", end: "16:00" },
          { name: "D-Sturb & Aversion", start: "16:00", end: "16:45" },
          { name: "Dual Damage", start: "16:45", end: "17:15" },
          { name: "Coone", start: "17:15", end: "18:00" },
          { name: "Red Race Winner", start: "18:00", end: "18:30" },
          { name: "Sound Rush", start: "18:30", end: "19:15" },
          { name: "Zatox", start: "19:15", end: "20:00" },
          { name: "Brennen Heart", start: "20:00", end: "20:45" },
          { name: "Outsiders", start: "20:45", end: "21:30" },
          { name: "B-Front", start: "21:30", end: "22:30" },
          { name: "THE SPOTLIGHT D-BLOCK & S-TE-FAN", start: "22:30", end: "23:00" }
        ]
      },
      {
        name: "BLUE",
        color: "#0ADDF0",
        events: [
          { name: "Radianze & Sub Sonik", start: "11:00", end: "12:30" },
          { name: "Jason Payne Presents Dark Energy", start: "12:30", end: "13:00" },
          { name: "Wolv", start: "13:00", end: "13:30" },
          { name: "Crypsis pres. My i'll style", start: "13:30", end: "14:15" },
          { name: "Cryex", start: "14:15", end: "15:00" },
          { name: "Act Of Rage", start: "15:00", end: "16:00" },
          { name: "Rooler", start: "16:00", end: "17:00" },
          { name: "Rejecta", start: "17:00", end: "18:00" },
          { name: "E-Force", start: "18:00", end: "18:45" },
          { name: "Warface", start: "18:45", end: "19:45" },
          { name: "Unresolved", start: "19:45", end: "20:45" },
          { name: "Multilator", start: "20:45", end: "21:30" },
          { name: "Cybergore: Nightmare Engine", start: "21:30", end: "22:00" },
          { name: "END OF LINE: BLOODLUST, D-Sturb, Warface", start: "23:30", end: "01:00" }

        ],
      },
      {
        name: "BLACK",
        color: "#808080",
        events: [
          { name: "Karun", start: "11:00", end: "12:30" },
          { name: "Hardcore Confessions with Audiofreq", start: "12:30", end: "13:30" },
          { name: "Never Surrender", start: "13:30", end: "14:30" },
          { name: "Promo", start: "14:30", end: "15:45" },
          { name: "Restrained: Rulebreaking Rampage LIVE", start: "15:45", end: "16:30" },
          { name: "Dither is G.A.B.B.E.R", start: "16:30", end: "17:00" },
          { name: "Nosferatu & Tha Playah - Combined Forces", start: "17:00", end: "18:00" },
          { name: "Spitnoise", start: "18:00", end: "19:00" },
          { name: "Lunakorpz Live", start: "19:00", end: "19:30" },
          { name: "Deadly Guns", start: "19:30", end: "20:30" },
          { name: "Lil Texas", start: "20:30", end: "21:30" },
          { name: "Major Conspiracy", start: "21:30", end: "22:30" },
          { name: "THE SPOTLIGHT PARTYRAISER", start: "22:30", end: "23:00" }
        ],
      },
      {
        name: "UV",
        color: "#D492FF",
        events: [
          { name: "Sephyx", start: "11:00", end: "12:00" },
          { name: "Demi Kanon", start: "12:00", end: "13:00" },
          { name: "Refuzion", start: "13:00", end: "14:00" },
          { name: "Wasted Penguinz", start: "14:00", end: "15:00" },
          { name: "Bass Modulators", start: "15:00", end: "16:00" },
          { name: "Mandy", start: "16:00", end: "17:00" },
          { name: "Melo-3 By Ecstatic, Jay Reeve & Solstice", start: "17:00", end: "17:45" },
          { name: "Bioweapon", start: "17:45", end: "18:15" },
          { name: "Devin Wild", start: "18:15", end: "19:00" },
          { name: "Da Tweekaz", start: "19:00", end: "19:45" },
          { name: "Da Tweekaz & Darren Styles", start: "19:45", end: "20:30" },
          { name: "EZG Live", start: "20:30", end: "21:00" },
          { name: "Doris Presents The Final Elixir", start: "21:00", end: "21:30" },
          { name: "Gezeelige Uptempo Presents The Greatest Shitshow", start: "21:30", end: "22:15" }
        ],
      },
      {
        name: "MAGENTA",
        color: "#FF008A",
        events: [
          { name: "2Faced", start: "11:00", end: "12:30" },
          { name: "Alpha Twins", start: "12:30", end: "14:00" },
          { name: "Degos & Re-done", start: "14:00", end: "15:00" },
          { name: "Deetox", start: "15:00", end: "16:00" },
          { name: "Bass Chaserz", start: "16:00", end: "17:00" },
          { name: "Crypsis & Chain Reaction pres. Unlike Others", start: "17:00", end: "18:00" },
          { name: "Digital Punk", start: "18:00", end: "19:00" },
          { name: "Frequencerz", start: "19:00", end: "20:00" },
          { name: "Titan", start: "20:00", end: "20:45" },
          { name: "Dj Thera Pres. 25 years of Heartstyle", start: "20:45", end: "21:30" },
          { name: "Spoontech Classics", start: "21:30", end: "22:00" },
          { name: "CEM", start: "23:30", end: "0:15" },
          { name: "Bass-D", start: "0:15", end: "1:00" }

        ],
      },
      {
        name: "INDIGO",
        color: "#3842DA",
        events: [
          { name: "Viva La Fist", start: "11:00", end: "12:00" },
          { name: "PL4Y", start: "12:00", end: "13:00" },
          { name: "Required LIVE", start: "13:00", end: "13:30" },
          { name: "Udex", start: "13:30", end: "14:15" },
          { name: "Revolve & Cold Confusion", start: "14:15", end: "15:00" },
          { name: "Malice & Kenai", start: "15:00", end: "15:45" },
          { name: "Sanctuary", start: "15:45", end: "16:30" },
          { name: "Amduscias & Captivator", start: "16:30", end: "17:15" },
          { name: "Invector", start: "17:15", end: "18:00" },
          { name: "Dark Entities", start: "18:00", end: "19:00" },
          { name: "Element", start: "19:00", end: "20:00" },
          { name: "Infliction", start: "20:00", end: "20:45" },
          { name: "Sparkz", start: "20:45", end: "21:15" },
          { name: "Mortis & Spitfire [Album Showcase]", start: "21:15", end: "22:15" },
          { name: "Faceless", start: "22:15", end: "23:00" }
        ],
      },
      {
        name: "YELLOW",
        color: "#F1E300",
        events: [
          { name: "Revellers", start: "11:00", end: "12:00" },
          { name: "Aradia", start: "12:00", end: "12:45" },
          { name: "STV", start: "12:45", end: "13:45" },
          { name: "Roosterz", start: "13:45", end: "14:45" },
          { name: "Amigo", start: "14:45", end: "15:30" },
          { name: "Complex", start: "15:30", end: "16:30" },
          { name: "Irradiate", start: "16:30", end: "17:00" },
          { name: "Unproven", start: "17:00", end: "17:45" },
          { name: "Lekkerfaces & Rosbeek", start: "17:45", end: "18:30" },
          { name: "Dynamic Noise & Tukkertempo", start: "18:30", end: "19:15" },
          { name: "Aalst & Screecher pres/ Dragonized LIVE", start: "19:15", end: "19:45" },
          { name: "F.Noize & Mind Compressor", start: "19:45", end: "20:30" },
          { name: "Soulblast (Album showcase)", start: "20:30", end: "21:15" },
          { name: "Ditzkickz", start: "21:15", end: "22:00" }
        ],
      },
      {
        name: "GOLD",
        color: "#BB9551",
        events: [
          { name: "Zearø", start: "12:00", end: "13:00" },
          { name: "Gizmo", start: "13:00", end: "14:00" },
          { name: "DJ Ruffian", start: "14:00", end: "15:00" },
          { name: "Rob Gee", start: "15:00", end: "16:00" },
          { name: "Charly Lownoise", start: "16:00", end: "17:00" },
          { name: "The Viper", start: "17:00", end: "18:00" },
          { name: "Tommyknocker", start: "18:00", end: "19:00" },
          { name: "Painbringer", start: "19:00", end: "20:00" },
          { name: "Day-Mar 20 Years", start: "20:00", end: "21:00" },
          { name: "System Overload: Back To The Roots", start: "21:00", end: "22:00" }
        ],
      },
      {
        name: "ORANGE",
        color: "#FF6500",
        events: [
          { name: "Cro & Steenwolk", start: "12:00", end: "13:00" },
          { name: "Stoik", start: "13:00", end: "14:00" },
          { name: "Dj Thera Tranceparency set", start: "14:00", end: "15:00" },
          { name: "Geck-o Get On The Train", start: "15:00", end: "16:30" },
          { name: "Koarse pres. cut sphere", start: "16:30", end: "18:00" },
          { name: "Anderex & Desudo - Orange Heart", start: "18:00", end: "19:30" },
          { name: "Scot Project", start: "19:30", end: "21:00" },
          { name: "A*S*Y*S", start: "21:00", end: "22:15" }
        ],
      },
      {
        name: "PINK",
        color: "#EE81A0",
        events: [
          { name: "Themen", start: "11:00", end: "12:00" },
          { name: "Yussi", start: "12:00", end: "13:00" },
          { name: "Atmos", start: "13:00", end: "14:15" },
          { name: "Wes s & $avvy", start: "14:15", end: "15:45" },
          { name: "Arcando", start: "15:45", end: "17:00" },
          { name: "T & Sugah", start: "17:00", end: "18:30" },
          { name: "Pythius", start: "18:30", end: "20:00" },
          { name: "Murdock", start: "20:00", end: "21:00" },
          { name: "Used", start: "21:00", end: "22:00" }
        ],
      },
      {
        name: "STAMPKROEG",
        color: "#B6D7A8",
        events: [
          { name: "Fiesto", start: "12:00", end: "13:30" },
          { name: "Atjoow Show", start: "13:30", end: "15:30" },
          { name: "Zanger Bas (LIVE)", start: "15:30", end: "16:00" },
          { name: "FeestDJRuud Het Feestuurtje", start: "16:00", end: "17:00" },
          { name: "Galactixx classics set", start: "17:00", end: "17:30" },
          { name: "John Tana (LIVE)", start: "17:30", end: "18:00" },
          { name: "Gullie (LIVE)", start: "18:00", end: "18:30" },
          { name: "STYN", start: "18:30", end: "19:30" },
          { name: "Frok&Roll + Sdonnie", start: "19:30", end: "20:30" },
          { name: "FeeestDJRuthless", start: "20:30", end: "22:00" }
        ],
      },
    ],
  },
  Saturday: {
    dayStart: "11:00",
    stages: [],
  },
  Sunday: {
    dayStart: "11:00",
    stages: [],
  },
};

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
