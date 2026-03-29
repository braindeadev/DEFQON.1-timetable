import React from "react";
import { Box } from "@mui/material";
import { nowLineSx, nowBadgeSx, nowLineStemSx } from "../../styles/stageRowStyles";
import { CRIMSON } from "../../styles/palette";

export const NowLine = ({ currentTimeIndex, timeColWidth, verticalLinesH }) => {
  if (currentTimeIndex === null || currentTimeIndex <= 0) return null;

  return (
    <Box sx={{
      ...nowLineSx(0, currentTimeIndex, timeColWidth, verticalLinesH),
      left: currentTimeIndex * timeColWidth,
    }}>
      <Box sx={nowBadgeSx}>NOW</Box>
      <Box sx={nowLineStemSx(CRIMSON, verticalLinesH)} />
    </Box>
  );
};
