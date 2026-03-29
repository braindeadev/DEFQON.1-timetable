import React, { useState, useCallback } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import scheduleData from "../../data/scheduleData";
import { DEFAULT_DAY, TIME_COLUMN_WIDTH_PX } from "../../utils/config";
import { generateTimeLabels } from "../../utils/timeUtils";
import { useFavorites } from "../../hooks/useFavorites";
import { useNowLine } from "../../hooks/useNowLine";
import { useDragScroll } from "../../hooks/useDragScroll";
import { DaySelector } from "./DaySelector";
import { StageColumn } from "./StageColumn";
import { StageRow } from "./StageRow";
import { TimeRow } from "./TimeRow";
import { NowLine } from "./NowLine";
import { ClearDialog } from "./ClearDialog";
import { BEIGE, CRIMSON, FONT } from "../../styles/palette";
import bgImage from "../../assets/images/20240630_225308_dq1_24_album_chronologisch.jpg";

const LEFT_LABEL_WIDTH  = 150;
const TIME_LABEL_HEIGHT = 60;
const STAGE_ROW_HEIGHT  = 90;

const makeEventId = (day, stage, event, start) => `${day}-${stage}-${event}-${start}`;

export default function Timetable() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");

  const leftLabelWidth  = isMobile ? 72  : isTablet ? 100 : LEFT_LABEL_WIDTH;
  const timeLabelHeight = isMobile ? 40  : isTablet ? 50  : TIME_LABEL_HEIGHT;
  const stageRowHeight  = isMobile ? 60  : isTablet ? 75  : STAGE_ROW_HEIGHT;
  const timeColWidth    = isMobile ? 22  : isTablet ? 28  : TIME_COLUMN_WIDTH_PX;

  const [selectedDay, setSelectedDay] = useState(() => {
    const s = localStorage.getItem("selectedDay");
    return s && scheduleData[s] ? s : DEFAULT_DAY;
  });
  const handleDayChange = useCallback((day) => {
    localStorage.setItem("selectedDay", day);
    setSelectedDay(day);
  }, []);

  const { stages = [], dayStart } = scheduleData[selectedDay] || {};
  const timeLabels      = generateTimeLabels(dayStart);
  const totalWidth      = timeLabels.length * timeColWidth;
  const verticalLinesH  = stages.length * (stageRowHeight + 8) + 2 * timeLabelHeight;

  const { favorites, toggle: toggleFav, clear: clearFavs } = useFavorites();
  const { currentTimeIndex, showCurrentLine } = useNowLine(selectedDay, dayStart);
  const { scrollRef, wasDragged } = useDragScroll();

  const [showOnlyFav, setShowOnlyFav] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Box sx={{
        position: "relative",
        zIndex: 2,
        color: BEIGE,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "scroll",
      }}>

        <DaySelector
          days={Object.keys(scheduleData)}
          selectedDay={selectedDay}
          onDayChange={handleDayChange}
          showOnlyFav={showOnlyFav}
          onToggleFav={setShowOnlyFav}
          onClearClick={() => setConfirmOpen(true)}
          isMobile={isMobile}
        />

        {/* Grid: sticky vasen sarake + scrollattava oikea osa */}
        <Box sx={{ display: "grid", gridTemplateColumns: `${leftLabelWidth}px 1fr` }}>
          <StageColumn
            stages={stages}
            selectedDay={selectedDay}
            stageRowHeight={stageRowHeight}
            timeLabelHeight={timeLabelHeight}
            isMobile={isMobile}
          />

          <Box
            ref={scrollRef}
            sx={{
              flex: 1, overflowX: "auto", overflowY: "hidden",
              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.3)" },
              "&::-webkit-scrollbar-thumb": { background: `${CRIMSON}88`, borderRadius: 3 },
              cursor: "grab",
            }}
          >
            <Box sx={{ width: totalWidth, position: "relative" }}>
              <TimeRow timeLabels={timeLabels} timeColWidth={timeColWidth} timeLabelHeight={timeLabelHeight} isMobile={isMobile} position="top" />

              {stages.map((stage, i) => (
                <StageRow
                  key={i}
                  stage={stage}
                  index={i}
                  timeLabels={timeLabels}
                  timeColWidth={timeColWidth}
                  stageRowHeight={stageRowHeight}
                  dayStart={dayStart}
                  selectedDay={selectedDay}
                  favorites={favorites}
                  showOnlyFav={showOnlyFav}
                  onToggleFav={toggleFav}
                  isMobile={isMobile}
                  makeEventId={makeEventId}
                  wasDragged={wasDragged}
                />
              ))}

              <TimeRow timeLabels={timeLabels} timeColWidth={timeColWidth} timeLabelHeight={timeLabelHeight} isMobile={isMobile} position="bottom" />

              {showCurrentLine && (
                <NowLine currentTimeIndex={currentTimeIndex} timeColWidth={timeColWidth} verticalLinesH={verticalLinesH} />
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, minHeight: 80 }} />

        {/* Footer */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 3, px: 3, borderTop: `2px solid ${CRIMSON}45`, background: "rgba(2,0,0,0.95)" }}>
          <Typography sx={{ color: `${BEIGE}cc`, fontFamily: FONT, textAlign: "center" }}>
            This is a personal fan project and is not affiliated with or endorsed by Q-dance or ID&T!
          </Typography>
        </Box>
      </Box>

      <ClearDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => { clearFavs(); setConfirmOpen(false); }}
      />
    </>
  );
}