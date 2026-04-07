import React, { useId, memo } from "react";
import { Box, Typography } from "@mui/material";
import { stageNameSx } from "../../styles/stageRowStyles";
import { BEIGE, CRIMSON, FONT, getStageColor } from "../../styles/palette";

const M_TOP = 0.5;
const M_BOT = 0.5;

const TRIANGLE_H = 14;
const TRIANGLE_W = 23;
const TRIANGLE_COUNT = 5; 
const GAP = 2; 

// 1. Sinun antama ChevronBg taustakuvioksi
const ChevronBg = memo(() => {
  const id = useId();
  const patternId = `chev-${id}`;
  return (
    <svg 
      style={{ 
        position: "absolute", 
        inset: 0, 
        width: "100%", 
        height: "100%", 
        pointerEvents: "none",
        zIndex: 0 // Varmistetaan että pysyy taustalla
      }} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={patternId} x="0" y="0" width="60" height="36" patternUnits="userSpaceOnUse">
          <polygon points="0,18 30,0 60,18 60,36 30,18 0,36" fill="black" opacity="0.04"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`}/>
    </svg>
  );
});

// 2. Skaalautuva kolmiorivi ylä- ja alareunoihin
const TriangleRow = ({ color, pointing }) => {
  const totalWidth = (TRIANGLE_W * TRIANGLE_COUNT) + (GAP * (TRIANGLE_COUNT - 1));

  return (
    <Box sx={{
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      lineHeight: 0,
      position: "relative", // Nostaa kolmiot taustan yläpuolelle
      zIndex: 1
    }}>
      <svg 
        viewBox={`0 0 ${totalWidth} ${TRIANGLE_H}`} 
        style={{ 
          width: "100%", 
          height: "auto", 
          maxHeight: "18px", 
          display: "block" 
        }}
      >
        {Array.from({ length: TRIANGLE_COUNT }).map((_, i) => {
          const x = i * (TRIANGLE_W + GAP);
          const points = pointing === "down"
            ? `${x},0 ${x + TRIANGLE_W},0 ${x + TRIANGLE_W / 2},${TRIANGLE_H}`
            : `${x},${TRIANGLE_H} ${x + TRIANGLE_W},${TRIANGLE_H} ${x + TRIANGLE_W / 2},0`;
          
          return (
            <polygon key={i} points={points} fill={color} opacity="0.85" />
          );
        })}
      </svg>
    </Box>
  );
};

// 3. StageColumn, joka kokoaa kaiken
export const StageColumn = ({ stages, selectedDay, stageRowHeight, timeLabelHeight, isMobile, isLandscape }) => {
  const stageTotalHeight = stageRowHeight + (M_TOP + M_BOT) * 8;

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
            pt: 0, 
            pb: 0, 
            px: 0.5, 
            overflow: "hidden", 
            position: "relative" // TÄRKEÄÄ: Tämä pitää ChevronBg-taustan laatikon sisällä!
          }}>
            
            {/* Taustakuvio asettuu absoluuttisesti laatikon pohjalle */}
            <ChevronBg />

            {/* Kolmiot ja teksti asettuvat taustan päälle */}
            <TriangleRow color={BEIGE} pointing="down" />

            <Box sx={{
              fontFamily: FONT,
              fontSize: isLandscape ? "0.85rem" : (isMobile ? "0.95rem" : "1.15rem"),
              fontWeight: "bold",
              letterSpacing: "0.05em",
              textShadow: "0 1px 4px rgba(0,0,0,0.60)",
              color: "#fff",
              textAlign: "center",
              lineHeight: 1.1,
              overflowWrap: "break-word", 
              wordBreak: "normal",  
              position: "relative", // Nostaa tekstin taustakuvion yläpuolelle
              zIndex: 1      
            }}>
              {stage.name}
            </Box>

            <TriangleRow color={BEIGE} pointing="up" />
            
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
};