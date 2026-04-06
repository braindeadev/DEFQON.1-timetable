import React, { memo } from "react";
import { Box } from "@mui/material";
import { EventCard } from "../ui/EventCard";
import { getStageColor } from "../../styles/palette";

const M_TOP = 0.5;
const M_BOT = 0.5;

// memo() estää turhat uudelleenrenderöinnit skrollatessa tai kun toisen rivin suosikkeja painetaan!
export const StageRow = memo(({
  stage, index, timeLabels, timeColWidth, stageRowHeight,
  dayStart, selectedDay, favorites, showOnlyFav, onToggleFav,
  isMobile, isLandscape, makeEventId, wasDragged,
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
        willChange: "transform" // Renderöinti-optimaatio laitteiston kiihdytykselle
      }}
    >
      {stage.events.map((event) => {
        const eid   = makeEventId(selectedDay, stage.name, event.name, event.start);
        const isFav = favorites.includes(eid);
        return (
          <EventCard
            key={eid} // Tärkeä korjaus: Unikkin avain indeksin 'j' sijaan
            event={event}
            dayStart={dayStart}
            stageColor={getStageColor(stage.name)}
            isFavorite={isFav}
            showOnlyFav={showOnlyFav}
            onToggle={() => onToggleFav(eid)}
            isMobile={isMobile}
            isLandscape={isLandscape}
            wasDragged={wasDragged}
          />
        );
      })}
    </Box>
  );
});