import React from "react";
import { Box, Typography } from "@mui/material";
import { stageNameSx } from "../../styles/stageRowStyles";
import { BEIGE, CRIMSON, FONT, getStageColor } from "../../styles/palette";

const M_TOP = 0.5;
const M_BOT = 0.5;

const TRIANGLE_H = 14;
const TRIANGLE_W = 23;

// Uudistettu, automaattisesti tilaan skaalautuva kolmiorivi!
const TriangleRow = ({ color, pointing }) => {
  return (
    <Box sx={{
      display: "flex",
      width: "100%",
      overflow: "hidden", // Piilottaa yli menevät kolmiot täydellisesti reunoilta!
      justifyContent: "center",
      height: TRIANGLE_H,
      gap: "1px"
    }}>
      {/* Luodaan riittävästi kolmioita peittämään työpöytä-leveydetkin */}
      {Array.from({ length: 10 }).map((_, i) => {
        const points = pointing === "down"
          ? `0,0 ${TRIANGLE_W},0 ${TRIANGLE_W / 2},${TRIANGLE_H}`
          : `0,${TRIANGLE_H} ${TRIANGLE_W},${TRIANGLE_H} ${TRIANGLE_W / 2},0`;
        return (
          <svg key={i} width={TRIANGLE_W} height={TRIANGLE_H} style={{ flexShrink: 0 }}>
            <polygon points={points} fill={color} opacity="0.85" />
          </svg>
        );
      })}
    </Box>
  );
};

export const StageColumn = ({ stages, selectedDay, stageRowHeight, timeLabelHeight, isMobile, isLandscape }) => {
  const stageTotalHeight = stageRowHeight + (M_TOP + M_BOT) * 8;

  const DayLabel = () => (
    <Typography sx={{
      fontFamily: FONT,
      fontSize: isLandscape ? "0.85rem" : (isMobile ? "1.0rem" : "1.4rem"), // Skaalautuva DayLabel
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
          px: isLandscape ? "2px" : (isMobile ? "4px" : "8px"), // Reagoi näytön tilaan
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
            py: "4px",
            overflow: "hidden", // Estää tekstin ja kolmioiden karkaamisen grid-solun ulkopuolelle
          }}>
            <TriangleRow color={BEIGE} pointing="down" />

            <Box sx={{
              fontFamily: FONT,
              fontSize: isLandscape ? "0.60rem" : (isMobile ? "0.75rem" : "1.15rem"), // Skaalautuva Stagen nimi
              fontWeight: "bold",
              letterSpacing: "0.05em",
              textShadow: "0 1px 4px rgba(0,0,0,0.60)",
              color: "#fff",
              textAlign: "center",
              lineHeight: 1.1,
              wordBreak: "break-word", // Katkaisee esim. "MAGENTA - SILENT" useammalle riville jos ahdasta!
              px: 0.5,
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