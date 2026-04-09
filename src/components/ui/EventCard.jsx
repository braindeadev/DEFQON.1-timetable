// src/components/ui/EventCard.jsx

import React, { memo, useId } from "react";
import { Paper, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { timeToIndex } from "../../utils/timeUtils";
import { eventCardSx, eventNameSx, eventTimeSx, favIconSx, favBorderIconSx } from "../../styles/stageRowStyles";
import { WHITE } from "../../styles/palette";

const ChevronBg = memo(() => {
  const id = useId();
  const patternId = `chev-${id}`;
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id={patternId} x="0" y="0" width="60" height="36" patternUnits="userSpaceOnUse"><polygon points="0,18 30,0 60,18 60,36 30,18 0,36" fill="black" opacity="0.04"/></pattern></defs><rect width="100%" height="100%" fill={`url(#${patternId})`}/>
    </svg>
  );
});

export const EventCard = memo(({ id, event, dayStart, stageColor, isFavorite, showOnlyFav, onToggle, isMobile, isLandscape, wasDragged }) => {
  const colStart = timeToIndex(event.start, dayStart);
  const colEnd   = timeToIndex(event.end,   dayStart);
  const gray     = showOnlyFav && !isFavorite;

  const handleClick = () => {
    if (wasDragged?.current) return;
    onToggle();
  };

  return (
    <Paper
      id={id}
      elevation={0}
      onClick={handleClick}
      sx={{
        gridColumn: `${Math.floor(colStart) + 1} / ${Math.ceil(colEnd) + 1}`,
        position: "relative",
        overflow: "hidden",
        padding: isLandscape ? "2px 4px" : "4px 8px",
        minHeight: 0, 
        ...eventCardSx(stageColor, gray),
      }}
    >
      {!gray && <ChevronBg />}
      
      {/* 1. ARTISTIN NIMI - KASVATETTU KOKO */}
      <Typography noWrap sx={{ 
        ...eventNameSx, 
        fontSize: isLandscape ? "0.8rem" : (isMobile ? "0.95rem" : "1.05rem"),
        lineHeight: 1.1
      }}>
        {event.name}
      </Typography>
      
      {/* 2. KELLONAIKA - KASVATETTU KOKO */}
      <Typography sx={{ 
        ...eventTimeSx, 
        fontSize: isLandscape ? "0.65rem" : (isMobile ? "0.8rem" : "0.9rem") 
      }}>
        {event.start} – {event.end}
      </Typography>
      
      {!isLandscape && (isFavorite
        ? <FavoriteIcon sx={{ ...favIconSx(WHITE), fontSize: isMobile ? "1rem" : "1.2rem" }} />
        : <FavoriteBorderIcon sx={{ ...favBorderIconSx, fontSize: isMobile ? "1rem" : "1.2rem" }} />
      )}
    </Paper>
  );
});