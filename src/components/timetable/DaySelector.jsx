import React from "react";
import {
  Box, Select, MenuItem, FormControl, Typography,
  Switch, FormControlLabel, Button,
} from "@mui/material";
import { controlBarSx, selectSx, menuItemSx, clearBtnSx } from "../../styles/stageRowStyles";
import { BEIGE, CRIMSON, FONT, MENU_BG } from "../../styles/palette";
import sacredOathLogo from "../../assets/images/1773305430605_image.png";

export const DaySelector = ({ days, selectedDay, onDayChange, showOnlyFav, onToggleFav, onClearClick, isMobile }) => (
  <Box sx={{ ...controlBarSx, flexWrap: "wrap", gap: isMobile ? 1 : 2, p: isMobile ? 1 : 2 }}>
    <Box sx={{ flexShrink: 0, mr: 1 }}>
      <img
        src={sacredOathLogo}
        alt="Sacred Oath"
        style={{ height: isMobile ? 55 : 100, objectFit: "contain", display: "block" }}
      />
    </Box>

    <FormControl variant="outlined" sx={{ minWidth: isMobile ? 140 : 220 }}>
      <Select
        value={selectedDay}
        onChange={e => onDayChange(e.target.value)}
        sx={selectSx}
        MenuProps={{
          PaperProps: {
            sx: {
              background: MENU_BG,
              border: `2px solid ${CRIMSON}45`,
              borderRadius: "4px",
              mt: "4px",
            },
          },
        }}
      >
        {days.map(day => (
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
          onChange={e => onToggleFav(e.target.checked)}
          sx={{
            "& .MuiSwitch-thumb": { backgroundColor: showOnlyFav ? CRIMSON : "#444" },
            "& .MuiSwitch-track": { backgroundColor: showOnlyFav ? `${CRIMSON}55` : "#333" },
          }}
        />
      }
      label="Favorites Only"
      sx={{
        color: `${BEIGE}cc`,
        "& .MuiFormControlLabel-label": { fontFamily: FONT, fontSize: "1rem", letterSpacing: "0.1em" },
      }}
    />

    <Button variant="outlined" onClick={onClearClick} sx={clearBtnSx}>
      Clear Favorites
    </Button>
  </Box>
);
