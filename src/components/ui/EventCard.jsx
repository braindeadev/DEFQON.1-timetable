import React from "react";
import { Paper, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { timeToIndex } from "../../utils/timeUtils";
import { eventCardSx, eventNameSx, eventTimeSx, favIconSx, favBorderIconSx } from "../../styles/stageRowStyles";
import { WHITE } from "../../styles/palette";

const ChevronBg = () => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="chev" x="0" y="0" width="60" height="36" patternUnits="userSpaceOnUse">
        <polygon points="0,18 30,0 60,18 60,36 30,18 0,36" fill="black" opacity="0.04"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#chev)"/>
  </svg>
);

export const EventCard = ({ event, dayStart, stageColor, isFavorite, showOnlyFav, onToggle, isMobile, wasDragged }) => {
  const colStart = timeToIndex(event.start, dayStart);
  const colEnd   = timeToIndex(event.end,   dayStart);
  const gray     = showOnlyFav && !isFavorite;

  const handleClick = () => {
    if (wasDragged?.current) return;
    onToggle();
  };

return (
    <Paper
      elevation={0}
      onClick={handleClick}
      sx={{
        gridColumn: `${Math.floor(colStart) + 1} / ${Math.ceil(colEnd) + 1}`,
        position: "relative",
        overflow: "hidden",
        ...eventCardSx(stageColor, gray),
      }}
    >
      {!gray && <ChevronBg />}
      <Typography noWrap sx={{ ...eventNameSx, fontSize: isMobile ? "0.7rem" : undefined }}>
        {event.name}
      </Typography>
      <Typography sx={{ ...eventTimeSx, fontSize: isMobile ? "0.6rem" : undefined }}>
        {event.start} – {event.end}
      </Typography>
      {isFavorite
        ? <FavoriteIcon sx={{ ...favIconSx(WHITE) }} />
        : <FavoriteBorderIcon sx={{ ...favBorderIconSx }} />
      }
    </Paper>
  );
};