import React, { memo } from "react";
import {
  Box, Select, MenuItem, FormControl, Typography,
  Switch, FormControlLabel, TextField, InputAdornment,
  Autocomplete, IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { controlBarSx, selectSx, menuItemSx } from "../../styles/stageRowStyles";
import { BEIGE, CRIMSON, FONT, MENU_BG, BLACK } from "../../styles/palette";
import sacredOathLogo from "../../assets/images/1773305430605_image.png";

export const DaySelector = memo(({ 
  days, selectedDay, onDayChange, showOnlyFav, onToggleFav, 
  onSettingsClick, isMobile, isLandscape,
  artists = [], onArtistSelect
}) => (
  <Box sx={{ ...controlBarSx, flexWrap: "wrap", gap: isLandscape ? 1 : (isMobile ? 1 : 2), p: isLandscape ? 1 : (isMobile ? 1 : 2) }}>
    <Box sx={{ flexShrink: 0, mr: 1 }}>
      <img
        src={sacredOathLogo}
        alt="Sacred Oath"
        style={{ height: isLandscape ? 40 : (isMobile ? 55 : 90), objectFit: "contain", display: "block" }}
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

    <Autocomplete
      options={artists}
      getOptionLabel={(option) => option.name || ""}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionKey={(option) => option.id}
      filterOptions={(options, state) => {
        const input = state.inputValue.trim().toLowerCase();
        if (!input) return options;

        const filtered = options.filter(opt => opt.name.toLowerCase().includes(input));

        const getScore = (name) => {
          if (name === input) return 3;
          if (name.startsWith(input)) return 2;
          const escapedInput = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          if (new RegExp(`(?:^|[^a-z0-9])${escapedInput}`, 'i').test(name)) return 1;
          return 0;
        };

        return filtered.sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();

          const scoreDiff = getScore(bName) - getScore(aName);
          if (scoreDiff !== 0) return scoreDiff;

          return aName.localeCompare(bName);
        });
      }}
      renderOption={(props, option) => {
        const { ...otherProps } = props;
        return (
          <Box key={option.id} component="li" {...otherProps} sx={{ fontSize: '0.9rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontFamily: FONT, fontWeight: 'bold' }}>{option.name}</Typography>
              <Typography sx={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {option.day} • {option.stage} • {option.start}
              </Typography>
            </Box>
          </Box>
        );
      }}
      onChange={(event, newValue) => {
        onArtistSelect(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search artist..."
          variant="outlined"
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: `${BEIGE}88` }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%",
            background: `${BLACK}88`,
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              color: BEIGE,
              fontFamily: FONT,
              fontSize: "1.1rem",
              letterSpacing: "0.05em",
              "& fieldset": { borderColor: `${CRIMSON}44` },
              "&:hover fieldset": { borderColor: `${CRIMSON}88` },
              "&.Mui-focused fieldset": { borderColor: CRIMSON },
            },
          }}
        />
      )}
      PaperComponent={({ children }) => (
        <Box sx={{ background: MENU_BG, border: `1px solid ${CRIMSON}44`, color: BEIGE, fontFamily: FONT }}>
          {children}
        </Box>
      )}
      sx={{
        width: (isMobile && !isLandscape) ? "100%" : (isMobile ? 180 : 250),
        order: (isMobile && !isLandscape) ? 2 : 0,
        "& .MuiAutocomplete-option": {
          fontFamily: FONT,
          fontSize: "1rem",
          '&[aria-selected="true"]': { background: `${CRIMSON}33` },
          '&.Mui-focused': { background: `${CRIMSON}22` },
        }
      }}
    />

    <Box sx={{ display: "flex", alignItems: "center", gap: 2, order: (isMobile && !isLandscape) ? 3 : 0 }}>
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

      <IconButton 
        onClick={onSettingsClick} 
        sx={{ 
          color: CRIMSON, 
          border: `1px solid ${CRIMSON}44`,
          borderRadius: "4px",
          p: 1,
          "&:hover": { background: `${CRIMSON}22`, borderColor: CRIMSON }
        }}
      >
        <SettingsIcon />
      </IconButton>
    </Box>
  </Box>
));
