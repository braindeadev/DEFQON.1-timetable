import React, { memo } from "react";
import {
  Box, Select, MenuItem, FormControl, Typography,
  TextField, InputAdornment, Autocomplete, IconButton, Switch
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { selectSx, menuItemSx } from "../../styles/stageRowStyles";
import { BEIGE, CRIMSON, FONT, MENU_BG, BLACK, WHITE } from "../../styles/palette";
import sacredOathLogo from "../../assets/images/1773305430605_image.png";

export const DaySelector = memo(({ 
  days, selectedDay, onDayChange, showOnlyFav, onToggleFav, 
  onSettingsClick, isMobile, isLandscape,
  artists = [], onArtistSelect
}) => {
  const isMobilePortrait = isMobile && !isLandscape;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: isMobilePortrait
          ? "1fr 1fr"
          : "auto auto auto 1fr auto",
        alignItems: "center",
        gap: isLandscape ? 1 : (isMobile ? 1.5 : 2),
        p: isLandscape ? 1 : (isMobile ? 1.5 : 2),
        width: "100%",
        boxSizing: "border-box",
        background: "transparent",
      }}
    >
      {/* 1. LOGO */}
      <Box 
        sx={{ 
          gridColumn: isMobilePortrait ? "1" : "auto", 
          gridRow: isMobilePortrait ? "1" : "auto", 
          justifySelf: "start",
          flexShrink: 0, 
          mr: isMobilePortrait ? 0 : 1 
        }}
      >
        <img
          src={sacredOathLogo}
          alt="Sacred Oath"
          style={{ height: isLandscape ? 40 : (isMobile ? 55 : 90), objectFit: "contain", display: "block" }}
        />
      </Box>

      {/* 2. DAY SELECT */}
      <FormControl 
        variant="outlined" 
        sx={{ 
          gridColumn: isMobilePortrait ? "1" : "auto", 
          gridRow: isMobilePortrait ? "2" : "auto", 
          width: "100%",
          minWidth: isMobilePortrait ? "auto" : (isMobile ? 140 : 220) 
        }}
      >
        <Select
          value={selectedDay}
          onChange={e => onDayChange(e.target.value)}
          sx={{ ...selectSx, height: 54 }}
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

      {/* 3. FAVORITES ONLY SWITCH CONTAINER */}
      <Box
        onClick={() => onToggleFav(!showOnlyFav)}
        sx={{
          gridColumn: isMobilePortrait ? "2" : "auto",
          gridRow: isMobilePortrait ? "2" : "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: FONT,
          fontSize: isMobilePortrait ? "0.95rem" : "1.3rem",
          letterSpacing: "0.1em",
          height: 54,
          border: `1px solid ${CRIMSON}44`,
          background: "rgba(13, 1, 1, 0.4)",
          borderRadius: "4px",
          px: isMobilePortrait ? 1 : 2,
          gap: isMobilePortrait ? 0.5 : 1,
          cursor: "pointer",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography sx={{ fontFamily: FONT, fontSize: "inherit", letterSpacing: "inherit", color: `${BEIGE}cc` }}>
          FAVOURITES ONLY
        </Typography>

        <Switch
          checked={showOnlyFav}
          onChange={(e) => onToggleFav(e.target.checked)}
          onClick={(e) => e.stopPropagation()} // Prevent double-triggering from parent Box click
          size={isMobilePortrait ? "small" : "medium"}
          sx={{
            "& .MuiSwitch-thumb": { backgroundColor: showOnlyFav ? CRIMSON : "#555" },
            "& .MuiSwitch-track": { backgroundColor: showOnlyFav ? `${CRIMSON}77` : "#222" },
          }}
        />
      </Box>

      {/* 4. SEARCH (AUTOCOMPLETE) */}
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
                height: 54,
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
          gridColumn: isMobilePortrait ? "1 / 3" : "auto",
          gridRow: isMobilePortrait ? "3" : "auto",
          width: "100%",
          maxWidth: isMobilePortrait ? "none" : (isMobile ? "none" : 350),
          justifySelf: isMobilePortrait ? "stretch" : (isMobile ? "stretch" : "start"),
          "& .MuiAutocomplete-option": {
            fontFamily: FONT,
            fontSize: "1rem",
            '&[aria-selected="true"]': { background: `${CRIMSON}33` },
            '&.Mui-focused': { background: `${CRIMSON}22` },
          }
        }}
      />

      {/* 5. SETTINGS BUTTON */}
      <Box 
        sx={{ 
          gridColumn: isMobilePortrait ? "2" : "auto", 
          gridRow: isMobilePortrait ? "1" : "auto", 
          justifySelf: "end" 
        }}
      >
        <IconButton 
          onClick={onSettingsClick} 
          sx={{ 
            color: CRIMSON, 
            border: `1px solid ${CRIMSON}44`,
            borderRadius: "4px",
            height: 54,
            width: 54,
            background: `${BLACK}88`,
            "&:hover": { background: `${CRIMSON}22`, borderColor: CRIMSON }
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
});
