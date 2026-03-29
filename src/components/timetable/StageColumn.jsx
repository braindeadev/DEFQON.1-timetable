import React from "react";
import { Box, Typography } from "@mui/material";
import { stageNameSx } from "../../styles/stageRowStyles";
import { BEIGE, BEIGE_D, CRIMSON, FONT } from "../../styles/palette";

const M_TOP = 0.5;
const M_BOT = 0.5;

const TRIANGLE_H = 13;
const TRIANGLE_W = 20;
const GAP = 2;

const TriangleRow = ({ color, width, pointing }) => {
  const count = Math.floor(width / (TRIANGLE_W + GAP));
  const totalW = count * TRIANGLE_W + (count - 1) * GAP;
  const offsetX = (width - totalW) / 2;

  return (
    <svg width={width} height={TRIANGLE_H} style={{ display: "block", flexShrink: 0 }}>
      {Array.from({ length: count }, (_, i) => {
        const x = offsetX + i * (TRIANGLE_W + GAP);
        const points = pointing === "down"
          ? `${x},0 ${x + TRIANGLE_W},0 ${x + TRIANGLE_W / 2},${TRIANGLE_H}`
          : `${x},${TRIANGLE_H} ${x + TRIANGLE_W},${TRIANGLE_H} ${x + TRIANGLE_W / 2},0`;
        return <polygon key={i} points={points} fill={color} opacity="0.85" />;
      })}
    </svg>
  );
};

export const StageColumn = ({ stages, selectedDay, stageRowHeight, timeLabelHeight, isMobile }) => {
  const stageTotalHeight = stageRowHeight + (M_TOP + M_BOT) * 8;
  const boxWidth = isMobile ? 64 : 134;

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
      <Box sx={{
        height: timeLabelHeight,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(4,0,0,0.95)",
        borderBottom: `2px solid ${CRIMSON}85`,
        borderTop: `2px solid ${CRIMSON}85`,
        flexShrink: 0,
      }}>
        <DayLabel />
      </Box>

      {stages.map((stage, i) => (
        <Box key={i} sx={{
          height: stageTotalHeight,
          background: i % 2 === 0 ? "rgba(4,0,0,0.88)" : "rgba(10,2,2,0.88)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          px: isMobile ? "4px" : "8px",
        }}>
          <Box sx={{
            ...stageNameSx(stage.color),
            width: "100%",
            height: stageRowHeight,
            marginRight: 0,
            fontSize: isMobile ? "0.75rem" : undefined,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            py: "4px",
          }}>
            {/* Yläreunan kolmiot — kärki alas */}
            <TriangleRow color={BEIGE_D} width={boxWidth} pointing="down" />

            {/* Stage-nimi */}
            <Box sx={{
              fontFamily: FONT,
              fontSize: isMobile ? "0.75rem" : "1.50rem",
              fontWeight: "bold",
              letterSpacing: "0.1em",
              textShadow: "0 1px 5px rgba(0,0,0,0.60)",
              color: "#fff",
              textAlign: "center",
              lineHeight: 1,
            }}>
              {stage.name}
            </Box>

            {/* Alareunan kolmiot — kärki ylös */}
            <TriangleRow color={BEIGE_D} width={boxWidth} pointing="up" />          </Box>
        </Box>
      ))}

      <Box sx={{
        height: timeLabelHeight,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(4,0,0,0.95)",
        borderTop: `2px solid ${CRIMSON}85`,
        borderBottom: `2px solid ${CRIMSON}85`,
        flexShrink: 0,
      }}>
        <DayLabel />
      </Box>
    </Box>
  );
};