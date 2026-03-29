import React from "react";
import { Box } from "@mui/material";
import { EventCard } from "../ui/EventCard";

const M_TOP = 0.5;
const M_BOT = 0.5;

export const StageRow = ({
  stage, index, timeLabels, timeColWidth, stageRowHeight,
  dayStart, selectedDay, favorites, showOnlyFav, onToggleFav,
  isMobile, makeEventId, wasDragged,
}) => {
  const stageTotalHeight = stageRowHeight + (M_TOP + M_BOT) * 8;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${timeLabels.length}, ${timeColWidth}px)`,
        height: stageTotalHeight,
        pt: `${M_TOP * 8}px`,
        pb: `${M_BOT * 8}px`,
        background: index % 2 === 0 ? "rgba(4,0,0,0.62)" : "rgba(10,2,2,0.62)",
        position: "relative",
      }}
    >
      {stage.events.map((event, j) => {
        const eid   = makeEventId(selectedDay, stage.name, event.name, event.start);
        const isFav = favorites.includes(eid);
        return (
          <EventCard
            key={j}
            event={event}
            dayStart={dayStart}
            stageColor={stage.color}
            isFavorite={isFav}
            showOnlyFav={showOnlyFav}
            onToggle={() => onToggleFav(eid)}
            isMobile={isMobile}
            wasDragged={wasDragged}
          />
        );
      })}
    </Box>
  );
};