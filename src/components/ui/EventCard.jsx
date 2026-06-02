// src/components/ui/EventCard.jsx

import React, { memo, useCallback, useMemo } from "react";
import { Paper, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { eventCardSx, eventNameSx, eventTimeSx, favIconSx, favBorderIconSx } from "../../styles/stageRowStyles";
import { WHITE } from "../../styles/palette";

const ChevronBg = memo(() => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="chev" x="0" y="0" width="60" height="36" patternUnits="userSpaceOnUse"><polygon points="0,18 30,0 60,18 60,36 30,18 0,36" fill="black" opacity="0.04"/></pattern></defs><rect width="100%" height="100%" fill="url(#chev)"/>
  </svg>
));

export const EventCard = memo(({ eventId, event, stageColor, colStart, colEnd, isFavorite, showOnlyFav, searchQuery, onToggleFav, isMobile, isLandscape, wasDragged }) => {
  // Suodatusehdot
  const isFavMatch = !showOnlyFav || isFavorite;
  const isSelected = searchQuery && event.name === searchQuery;
  const gray = !isFavMatch;

  const handleClick = useCallback(() => {
    if (wasDragged?.current) return;
    onToggleFav(eventId);
  }, [eventId, onToggleFav, wasDragged]);

  const cardSx = useMemo(() => ({
    gridColumn: `${Math.floor(colStart) + 1} / ${Math.ceil(colEnd) + 1}`,
    position: "relative",
    overflow: "hidden",
    padding: isLandscape ? "2px 4px" : "4px 8px",
    minHeight: 0, 
    ...eventCardSx(stageColor, gray),
    opacity: gray ? 0.45 : 1,
    ...(isSelected && {
      opacity: 1,
      zIndex: 100,
      border: `3px solid ${WHITE}`,
      boxShadow: `0 0 20px ${WHITE}, 0 0 10px ${stageColor}`,
      filter: "none",
      animation: "flashHighlight 1.2s ease-in-out forwards",
    }),
    transition: "all 0.3s ease",
  }), [colStart, colEnd, isLandscape, stageColor, gray, isSelected]);

  return (
    <Paper
      elevation={0}
      onClick={handleClick}
      sx={cardSx}
    >
      {!gray && <ChevronBg />}
      
      <Typography noWrap sx={{ 
        ...eventNameSx, 
        fontSize: isLandscape ? "0.85rem" : (isMobile ? "0.95rem" : "1.05rem"),
        lineHeight: 1.1
      }}>
        {event.name}
      </Typography>
      
      <Typography sx={{ 
        ...eventTimeSx, 
        fontSize: isLandscape ? "0.75rem" : (isMobile ? "0.8rem" : "0.9rem") 
      }}>
        {event.start} – {event.end}
      </Typography>
      
      {isFavorite
        ? <FavoriteIcon sx={{ ...favIconSx(WHITE), fontSize: isLandscape ? "0.9rem" : (isMobile ? "1rem" : "1.2rem"), zIndex: 10 }} />
        : <FavoriteBorderIcon sx={{ ...favBorderIconSx, fontSize: isLandscape ? "0.9rem" : (isMobile ? "1rem" : "1.2rem"), zIndex: 10 }} />
      }
    </Paper>
  );
});
