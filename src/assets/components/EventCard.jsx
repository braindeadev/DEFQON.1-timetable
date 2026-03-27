import React from "react";
import { Paper, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { timeToIndex } from "../../utils/timeUtils";
import {
  eventCardSx,
  eventNameSx,
  eventTimeSx,
  favIconSx,
  favBorderIconSx,
} from "./styles/stageRowStyles";
import { WHITE } from "./styles/palette";

export const EventCard = ({ event, dayStart, stageColor, isFavorite, showOnlyFav, onToggle, isMobile }) => {
  const colStart = timeToIndex(event.start, dayStart);
  const colEnd   = timeToIndex(event.end,   dayStart);
  const gray     = showOnlyFav && !isFavorite;

  return (
    <Paper
      elevation={0}
      sx={{
        gridColumn: `${Math.floor(colStart) + 1} / ${Math.ceil(colEnd) + 1}`,
        position: "relative",
        overflow: "hidden",
        ...eventCardSx(stageColor, gray),
      }}
    >
      <Typography noWrap sx={{ ...eventNameSx, fontSize: isMobile ? "0.7rem" : undefined }}>
        {event.name}
      </Typography>
      <Typography sx={{ ...eventTimeSx, fontSize: isMobile ? "0.6rem" : undefined }}>
        {event.start} – {event.end}
      </Typography>
      {isFavorite
        ? <FavoriteIcon sx={{ ...favIconSx(WHITE), cursor: "pointer" }} onMouseDown={e => e.stopPropagation()} onClick={onToggle} />
        : <FavoriteBorderIcon sx={{ ...favBorderIconSx, cursor: "pointer" }} onMouseDown={e => e.stopPropagation()} onClick={onToggle} />
      }
    </Paper>
  );
};