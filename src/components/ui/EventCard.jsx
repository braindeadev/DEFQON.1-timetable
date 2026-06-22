// src/components/ui/EventCard.jsx

import React, { memo, useCallback, useMemo } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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

  const cardStyle = useMemo(() => {
    const gridColumn = `${Math.floor(colStart) + 1} / ${Math.ceil(colEnd) + 1}`;
    const padding = isLandscape ? "2px 4px" : "4px 8px";
    const isSpecialBg = typeof stageColor === "string" && (stageColor.includes("gradient") || stageColor.includes("svg") || stageColor.includes("data:"));
    const solidColor = isSpecialBg ? "#D04401" : stageColor;
    const color = gray ? "#999" : "#fff";
    const opacity = gray ? 0.45 : 1;
    const filter = gray ? "grayscale(80%) brightness(0.7)" : "none";
    const zIndex = isSelected ? 100 : 10;
    
    const style = {
      gridColumn,
      position: "relative",
      overflow: "hidden",
      padding,
      minHeight: 0,
      color,
      opacity,
      filter,
      zIndex,
      transition: "opacity 0.15s ease, filter 0.15s ease",
    };

    if (gray) {
      style.background = "#3a3a3a";
      style.border = "2px solid #555";
    } else if (isSpecialBg) {
      // Stampkroeg: Split border by clipping background to border-box and padding-box
      style.border = "2px solid transparent";
      style.background = `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)) padding-box, ${stageColor} border-box`;
    } else {
      style.background = stageColor;
      style.border = `2px solid ${solidColor}99`;
    }

    if (isSelected) {
      style.opacity = 1;
      style.border = `3px solid color-mix(in srgb, ${solidColor} 80%, #ffffff)`;
      style.boxShadow = `0 0 15px color-mix(in srgb, ${solidColor} 50%, #ffffff)`;
      style.filter = "none";
      style.animation = "flashHighlight 1.0s ease-in-out forwards";
    }

    return style;
  }, [colStart, colEnd, isLandscape, stageColor, gray, isSelected]);

  return (
    <div
      onClick={handleClick}
      className="event-card"
      style={cardStyle}
    >
      {!gray && <ChevronBg />}
      
      <div 
        className="event-name" 
        style={{ 
          fontSize: isLandscape ? "0.85rem" : (isMobile ? "0.95rem" : "1.05rem")
        }}
      >
        {event.name}
      </div>
      
      <div 
        className="event-time" 
        style={{ 
          fontSize: isLandscape ? "0.75rem" : (isMobile ? "0.8rem" : "0.9rem") 
        }}
      >
        {event.start} – {event.end}
      </div>
      
      {isFavorite ? (
        <FavoriteIcon 
          style={{ 
            color: WHITE, 
            position: "absolute", 
            bottom: 4, 
            right: 4, 
            fontSize: isLandscape ? "0.9rem" : (isMobile ? "1rem" : "1.2rem"), 
            zIndex: 10 
          }} 
        />
      ) : (
        <FavoriteBorderIcon 
          style={{ 
            color: "rgba(255, 255, 255, 0.9)", 
            position: "absolute", 
            bottom: 4, 
            right: 4, 
            fontSize: isLandscape ? "0.9rem" : (isMobile ? "1rem" : "1.2rem"), 
            zIndex: 10 
          }} 
        />
      )}
    </div>
  );
});
