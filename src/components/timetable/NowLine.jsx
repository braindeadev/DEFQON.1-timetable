import React, { memo } from "react";
import { Box } from "@mui/material";
import { nowLineSx } from "../../styles/stageRowStyles";
import { CRIMSON } from "../../styles/palette";

export const NowLine = memo(({ currentTimeIndex, timeColWidth, verticalLinesH }) => {
  if (currentTimeIndex === null || currentTimeIndex <= 0) return null;

  return (
    <Box sx={{
      ...nowLineSx(0, currentTimeIndex, timeColWidth, verticalLinesH),
      left: currentTimeIndex * timeColWidth,
      transition: "left 0.5s linear",
      top: 0, 
      zIndex: 1000,
      overflow: "visible",
      transform: "translateX(-50%)",
      pointerEvents: "none",
      height: verticalLinesH,
      position: "absolute",
    }}>
      {/* Vain pystyviiva (Solid 4px) - Koko pituudella */}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "4px",
        height: "100%",
        background: CRIMSON,
        boxShadow: `0 0 10px rgba(0,0,0,0.5)`,
        zIndex: 1
      }} />
    </Box>
  );
});
