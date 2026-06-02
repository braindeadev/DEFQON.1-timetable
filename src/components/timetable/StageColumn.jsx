import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { stageNameSx } from "../../styles/stageRowStyles";
import { BEIGE, CRIMSON, FONT, getStageColor } from "../../styles/palette";

const M_TOP = 0.5;
const M_BOT = 0.5;

// Uudistettu, automaattisesti tilaan skaalautuva kolmiorivi!
const TriangleRow = memo(({ color, pointing, h }) => {
  return (
    <Box sx={{
      width: "100%",
      height: h,
      flexShrink: 0,
      lineHeight: 0,
      display: "block"
    }}>
      <svg 
        viewBox="0 0 600 100" 
        width="100%" 
        height="100%" 
        preserveAspectRatio="none" 
        style={{ display: "block" }}
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const x = i * 100;
          const points = pointing === "down"
            ? `${x},0 ${x + 100},0 ${x + 50},100`
            : `${x},100 ${x + 100},100 ${x + 50},0`;
          return <polygon key={i} points={points} fill={color} opacity="0.85" />;
        })}
      </svg>
    </Box>
  );
});

export const StageColumn = memo(({ stages, selectedDay, stageRowHeight, timeLabelHeight, isMobile, isLandscape }) => {
  const stageTotalHeight = stageRowHeight + (M_TOP + M_BOT) * 8;
  
  // Dynaamiset kolmion koot
  const th = isLandscape ? 6 : (isMobile ? 8 : 10);

  const DayLabel = () => (
    <Typography sx={{
      fontFamily: FONT,
      fontSize: isLandscape ? "0.85rem" : (isMobile ? "1.0rem" : "1.4rem"), 
      fontWeight: "bold",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: BEIGE,
      userSelect: "none",
      textAlign: "center",
    }}>
      {selectedDay}
    </Typography>
  );

  return (
    <Box sx={{ position: "sticky", left: 0, zIndex: 30, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {/* Ylä-DayLabel */}
      <Box sx={{
        height: timeLabelHeight,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(4,0,0,0.95)",
        borderBottom: `2px solid ${CRIMSON}85`,
        borderTop: `2px solid ${CRIMSON}85`,
        borderRight: `2px solid ${CRIMSON}65`,
        borderLeft: `2px solid ${CRIMSON}65`,
        flexShrink: 0,
      }}>
        <DayLabel />
      </Box>

      {/* Staget */}
      {stages.map((stage, i) => (
        <Box key={i} sx={{
          height: stageTotalHeight,
          background: i % 2 === 0 ? "rgba(4,0,0,0.88)" : "rgba(10,2,2,0.88)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          px: isLandscape ? "2px" : (isMobile ? "4px" : "8px"), 
        }}>
          <Box sx={{
            ...stageNameSx(getStageColor(stage.name)),
            width: "100%",
            height: stageRowHeight,
            marginRight: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between", 
            py: 0, 
            overflow: "hidden", 
          }}>
            <TriangleRow color={BEIGE} pointing="down" h={th} />

            <Box sx={{
              flex: 1, 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT,
              fontSize: isLandscape ? "0.70rem" : (isMobile ? "0.75rem" : "1.15rem"), 
              fontWeight: "bold",
              letterSpacing: "0.05em",
              textShadow: "0 1px 4px rgba(0,0,0,0.60)",
              color: "#fff",
              textAlign: "center",
              lineHeight: 1.1,
              wordBreak: "break-word", 
              px: 0.5,
            }}>
              {stage.name}
            </Box>

            <TriangleRow color={BEIGE} pointing="up" h={th} />
          </Box>
        </Box>
      ))}

      {/* Ala-DayLabel */}
      <Box sx={{
        height: timeLabelHeight,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(4,0,0,0.95)",
        borderBottom: `2px solid ${CRIMSON}85`,
        borderTop: `2px solid ${CRIMSON}85`,
        borderRight: `2px solid ${CRIMSON}65`,
        borderLeft: `2px solid ${CRIMSON}65`,
        flexShrink: 0,
      }}>
        <DayLabel />
      </Box>
    </Box>
  );
});
