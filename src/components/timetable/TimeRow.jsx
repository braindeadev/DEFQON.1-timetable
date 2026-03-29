import React, { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { BEIGE, CRIMSON, FONT } from "../../styles/palette";

export const TimeRow = ({ timeLabels, timeColWidth, timeLabelHeight, isMobile, position }) => {
  const sticky = position ?? "top";
  const renderCells = useCallback(() =>
    timeLabels.map((time, i) => {
      const min       = Number(time.split(":")[1]);
      const isHalf    = min % 30 === 0;
      const isQuarter = min % 15 === 0;
      return (
        <Box
          key={i}
          sx={{
            width: timeColWidth,
            flexShrink: 0,
            height: timeLabelHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            pr: "4px",
            ...(isQuarter && { borderLeft: `2px solid ${CRIMSON}65` }),
          }}
        >
          {isHalf && (
            <Typography sx={{
              color: `${BEIGE}cc`,
              fontFamily: FONT,
              fontSize: isMobile ? "0.75rem" : "1.25rem",
              letterSpacing: "0.03em",
              fontWeight: 500,
            }}>
              {time}
            </Typography>
          )}
        </Box>
      );
    }),
  [timeLabels, timeColWidth, timeLabelHeight, isMobile]);

  return (
    <Box sx={{
      position: "sticky",
      [sticky === "top" ? "top" : "bottom"]: 0,
      zIndex: 20,
      display: "flex",
      background: "rgba(4,0,0,0.95)",
      borderTop:    `2px solid ${CRIMSON}85`,
      borderBottom: `2px solid ${CRIMSON}85`,
      height: timeLabelHeight,
    }}>
      {renderCells()}
    </Box>
  );
};