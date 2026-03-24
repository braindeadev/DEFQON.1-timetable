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
} from "../components/styles/stageRowStyles";
import { CRIMSON, BEIGE_L, WHITE } from "../components/styles/palette";

export const EventCard = ({ event, dayStart, stageColor, isFavorite, showOnlyFav, onToggle }) => {
  const colStart = timeToIndex(event.start, dayStart);
  const colEnd   = timeToIndex(event.end,   dayStart);
  const gray     = showOnlyFav && !isFavorite;

  return (
    <Paper
      elevation={0}
      sx={{
        gridColumn: `${Math.floor(colStart) + 2} / ${Math.ceil(colEnd) + 2}`,
        position: "relative", // FIX: needed so the absolute fav icons render inside the card
        overflow: "hidden",   // FIX: clip the icon if the card is very narrow
        ...eventCardSx(stageColor, gray),
      }}
      onClick={onToggle}
    >
      <Typography noWrap sx={eventNameSx}>
        {event.name}
      </Typography>
      <Typography sx={eventTimeSx}>
        {event.start} – {event.end}
      </Typography>
      {isFavorite
        ? <FavoriteIcon sx={favIconSx(WHITE)} />
        : <FavoriteBorderIcon sx={favBorderIconSx} />
      }
    </Paper>
  );
};