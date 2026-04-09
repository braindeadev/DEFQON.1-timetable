import React, { useState, useCallback, useEffect } from "react";
import { Box, Typography, useMediaQuery, IconButton } from "@mui/material"; // Lisätty IconButton
import SettingsIcon from "@mui/icons-material/Settings"; // UUSI IKONI
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
import { SearchBar } from "./SearchBar"; 
import { SettingsDialog } from "./SettingsDialog"; // UUSI KOMPONENTTI
import { BEIGE, CRIMSON, FONT } from "../../styles/palette";
import bgImage from "../../assets/images/20240630_225308_dq1_24_album_chronologisch.jpg";

const makeEventId = (day, stage, event, start) => `${day}-${stage}-${event}-${start}`;

export default function Timetable() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");
  const isLandscape = useMediaQuery("(max-height:500px) and (orientation: landscape)");

  const leftLabelWidth  = isLandscape ? 80 : (isMobile ? 70 : (isTablet ? 100 : 120));
  const timeLabelHeight = isLandscape ? 30 : (isMobile ? 40 : (isTablet ? 50 : 45));
  const stageRowHeight  = isLandscape ? 45 : (isMobile ? 55 : (isTablet ? 70 : 65));
  const timeColWidth    = isLandscape ? 20 : (isMobile ? 22 : (isTablet ? 26 : TIME_COLUMN_WIDTH_PX));

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
  
  // UUSI: Asetusikkunan tila
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [searchedEventId, setSearchedEventId] = useState(null);

  const handleSearchSelect = useCallback((eventInfo) => {
    const eid = makeEventId(eventInfo.day, eventInfo.stage, eventInfo.label, eventInfo.start);
    setSearchedEventId(eid);

    if (eventInfo.day !== selectedDay) {
      handleDayChange(eventInfo.day);
    }
  }, [selectedDay, handleDayChange]);

  useEffect(() => {
    if (searchedEventId) {
      const timeout = setTimeout(() => {
        const element = document.getElementById(searchedEventId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
          element.classList.add("highlight-flash");
          setTimeout(() => element.classList.remove("highlight-flash"), 2500);
        }
        setSearchedEventId(null); 
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [searchedEventId, selectedDay]);

  return (
    <>
      <Box sx={{
        position: "relative",
        zIndex: 2,
        color: BEIGE,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.78)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
      }}>

        <DaySelector
          days={Object.keys(scheduleData)}
          selectedDay={selectedDay}
          onDayChange={handleDayChange}
          showOnlyFav={showOnlyFav}
          onToggleFav={setShowOnlyFav}
          // Poistin onClearClickin täältä, koska toiminto siirrettiin asetuksiin
          isMobile={isMobile}
          isLandscape={isLandscape}
        />

        {/* PÄIVITETTY: Haku vasemmalla, Asetukset-nappi oikealla */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', // Jakaa tilan reunoille
          alignItems: 'center',
          py: 2, 
          px: isMobile ? 2 : 3, 
          position: 'relative', 
          zIndex: 10 
        }}>
          <SearchBar onSelectEvent={handleSearchSelect} />
          
          <IconButton 
            onClick={() => setSettingsOpen(true)} 
            sx={{ 
              color: BEIGE, 
              backgroundColor: 'rgba(0,0,0,0.4)',
              border: `1px solid rgba(192, 25, 42, 0.3)`,
              '&:hover': { backgroundColor: 'rgba(192, 25, 42, 0.2)', borderColor: '#C0192A' }
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: `${leftLabelWidth}px 1fr`, flex: 1 }}>
          <StageColumn
            stages={stages}
            selectedDay={selectedDay}
            stageRowHeight={stageRowHeight}
            timeLabelHeight={timeLabelHeight}
            isMobile={isMobile}
            isLandscape={isLandscape}
          />

          <Box
            ref={scrollRef}
            sx={{
              flex: 1, overflowX: "auto", overflowY: "hidden",
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.3)", borderRadius: 4 },
              "&::-webkit-scrollbar-thumb": { background: `${CRIMSON}88`, borderRadius: 4, "&:hover": { background: CRIMSON } },
              cursor: "grab",
            }}
          >
            <Box sx={{ width: totalWidth, position: "relative" }}>
              <TimeRow timeLabels={timeLabels} timeColWidth={timeColWidth} timeLabelHeight={timeLabelHeight} isMobile={isMobile} isLandscape={isLandscape} position="top" />

              {stages.map((stage, i) => (
                <StageRow
                  key={stage.name}
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
                  isLandscape={isLandscape}
                  makeEventId={makeEventId}
                  wasDragged={wasDragged}
                />
              ))}

              <TimeRow timeLabels={timeLabels} timeColWidth={timeColWidth} timeLabelHeight={timeLabelHeight} isMobile={isMobile} isLandscape={isLandscape} position="bottom" />

              {showCurrentLine && (
                <NowLine currentTimeIndex={currentTimeIndex} timeColWidth={timeColWidth} verticalLinesH={verticalLinesH} />
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ minHeight: 40 }} />

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 2, px: 3, borderTop: `2px solid ${CRIMSON}45`, background: "rgba(2,0,0,0.95)" }}>
          <Typography sx={{ color: `${BEIGE}cc`, fontFamily: FONT, textAlign: "center", fontSize: "0.85rem" }}>
            This is a personal fan project and is not affiliated with or endorsed by Q-dance or ID&T!
          </Typography>
        </Box>
      </Box>

      {/* UUSI ASETUSIKKUNA */}
      <SettingsDialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        onClearClick={() => setConfirmOpen(true)} 
      />

      <ClearDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => { clearFavs(); setConfirmOpen(false); }}
      />
    </>
  );
}