import React, { memo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { BEIGE, CRIMSON, FONT } from "../../styles/palette";

export const TimeRow = memo(({ timeLabels, timeColWidth, timeLabelHeight, isMobile, isLandscape, position }) => {
  const sticky = position ?? "top";
  
  const renderCells = useCallback(() =>
    timeLabels.map((time, i) => {
      const min = Number(time.split(":")[1]);
      const isHalf = min % 30 === 0;
      const isQuarter = min % 15 === 0;

      return (
        <Box
          key={i}
          sx={{
            width: timeColWidth,
            flexShrink: 0,
            height: timeLabelHeight,
            position: "relative",
            boxSizing: "border-box",
            // Piirretään viiva solun vasempaan reunaan
            ...(i !== 0 && isQuarter && { 
              borderLeft: `2px solid ${CRIMSON}65`,
            }),
          }}
        >
          {isHalf && (
            <Typography sx={{
              position: "absolute",
              // Asetetaan teksti alkamaan viivan oikealta puolelta (4px irti viivasta)
              left: "4px", 
              top: "50%",
              // Keskitetään ainoastaan pystysuunnassa (Y-akseli)
              transform: "translate(0, -50%)", 
              
              color: `${BEIGE}cc`,
              fontFamily: FONT,
              fontSize: isLandscape ? "0.7rem" : (isMobile ? "0.8rem" : "1.1rem"),
              letterSpacing: "0.03em",
              fontWeight: 500,
              whiteSpace: "nowrap",
              zIndex: 2,
              
              // Taustaväriä ei enää tarvita, koska teksti ei ole viivan päällä
              backgroundColor: "transparent",
            }}>
              {time}
            </Typography>
          )}
        </Box>
      );
    }),
  [timeLabels, timeColWidth, timeLabelHeight, isMobile, isLandscape]);

  return (
    <Box sx={{
      position: "sticky",
      [sticky === "top" ? "top" : "bottom"]: 0,
      display: "flex",
      overflow: "hidden", 
      background: "rgba(4,0,0,0.95)",
      borderTop: `2px solid ${CRIMSON}85`,
      borderBottom: `2px solid ${CRIMSON}85`,
      height: timeLabelHeight,
      zIndex: 10,
    }}>
      {renderCells()}
    </Box>
  );
});
