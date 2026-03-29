import React from "react";
import { Box, Typography } from "@mui/material";
import { stageNameSx } from "../../styles/stageRowStyles";
import { BEIGE, CRIMSON, FONT } from "../../styles/palette";

const M_TOP = 0.5;
const M_BOT = 0.5;

export const StageColumn = ({ stages, selectedDay, stageRowHeight, timeLabelHeight, isMobile }) => {
  const stageTotalHeight = stageRowHeight + (M_TOP + M_BOT) * 8;

  const DayLabel = () => (
    <Typography sx={{
      fontFamily: FONT,
      fontSize: isMobile ? "0.75rem" : "1.4rem",
      fontWeight: "bold",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: BEIGE,
      userSelect: "none",
    }}>
      {selectedDay}
    </Typography>
  );

  return (
    <Box sx={{ position: "sticky", left: 0, zIndex: 30, display: "flex", flexDirection: "column" }}>
      {/* Yläotsikko */}
      <Box sx={{
        height: timeLabelHeight,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(4,0,0,0.95)",
        borderBottom: `2px solid ${CRIMSON}85`,
        flexShrink: 0,
      }}>
        <DayLabel />
      </Box>

      {/* Stage-nimet */}
      {stages.map((stage, i) => (
        <Box
          key={i}
          sx={{
            height: stageTotalHeight,
            background: i % 2 === 0 ? "rgba(4,0,0,0.88)" : "rgba(10,2,2,0.88)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            px: isMobile ? "4px" : "8px",
          }}
        >
          <Box sx={{
            ...stageNameSx(stage.color),
            width: "100%",
            height: stageRowHeight,
            marginRight: 0,
            fontSize: isMobile ? "0.75rem" : undefined,
          }}>
            {stage.name}
          </Box>
        </Box>
      ))}

      {/* Alaotsikko */}
      <Box sx={{
        height: timeLabelHeight,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(4,0,0,0.95)",
        borderTop: `2px solid ${CRIMSON}85`,
        flexShrink: 0,
      }}>
        <DayLabel />
      </Box>
    </Box>
  );
};
