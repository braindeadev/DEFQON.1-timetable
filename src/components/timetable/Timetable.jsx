import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import scheduleData from "../../data/scheduleData";
import { DEFAULT_DAY, TIME_COLUMN_WIDTH_PX } from "../../utils/config";
import { generateTimeLabels, timeToIndex } from "../../utils/timeUtils";
import { useFavorites } from "../../hooks/useFavorites";
import { useNowLine } from "../../hooks/useNowLine";
import { useDragScroll } from "../../hooks/useDragScroll";
import { useZoom } from "../../hooks/useZoom";
import { useAlerts } from "../../hooks/useAlerts";
import { decodeFavorites, getDaysFromEventIds } from "../../utils/shareUtils";
import { DaySelector } from "./DaySelector";
import { StageColumn } from "./StageColumn";
import { StageRow } from "./StageRow";
import { TimeRow } from "./TimeRow";
import { NowLine } from "./NowLine";
import { SettingsDialog } from "./SettingsDialog";
import { getStageColor, BEIGE, CRIMSON, FONT, WHITE } from "../../styles/palette";
import bgImage from "../../assets/images/20240630_225308_dq1_24_album_chronologisch.jpg";

const makeEventId = (day, stage, event, start) => `${day}-${stage}-${event}-${start}`;

export default function Timetable() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");
  // Nostetaan max-height 600px:iin jotta useammat nykypuhelimet tunnistetaan landscape-tilassa
  const isLandscape = useMediaQuery("(max-height:600px) and (orientation: landscape)");

  // 1. Alustetaan Hookit heti alussa
  const { favorites, favoritesSet, toggle: toggleFav, clear: clearFavs, setFavorites } = useFavorites();
  const { scrollRef, wasDragged } = useDragScroll();
  const { zoomRef, zoomStyle } = useZoom();
  const [selectedDay, setSelectedDay] = useState(() => {
    const s = localStorage.getItem("selectedDay");
    return s && scheduleData[s] ? s : DEFAULT_DAY;
  });

  const { 
    alertsEnabled, 
    alertOffset, 
    setAlertsEnabled, 
    setAlertOffset 
  } = useAlerts(favorites, selectedDay);

  const { dayStart } = scheduleData[selectedDay] || {};
  const { currentTimeIndex, showCurrentLine } = useNowLine(selectedDay, dayStart);

  // Pre-processed data for high-performance rendering
  const processedStages = useMemo(() => {
    const raw = scheduleData[selectedDay];
    if (!raw) return [];
    return raw.stages.map(stage => ({
      ...stage,
      events: stage.events.map(event => ({
        ...event,
        id: makeEventId(selectedDay, stage.name, event.name, event.start),
        colStart: timeToIndex(event.start, raw.dayStart),
        colEnd: timeToIndex(event.end, raw.dayStart),
        stageColor: getStageColor(stage.name)
      }))
    }));
  }, [selectedDay]);

  const [showOnlyFav, setShowOnlyFav] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  // URL-pohjainen import (jos sivu ladataan share-linkillä)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const favsParam = params.get("favs");
    if (favsParam) {
      try {
        let importedFavs = [];

        // 1. Kokeillaan purkaa vanha b64 JSON-taulukko (backwards compatibility)
        try {
          const rawDecode = atob(favsParam.replace(/-/g, '+').replace(/_/g, '/'));
          if (rawDecode.trim().startsWith("[")) {
            importedFavs = JSON.parse(rawDecode);
          }
        } catch (e) {
          // Ei ollut vanhaa JSON-b64-koodausta, jatketaan uudella bitmaskilla
        }

        // 2. Jos ei ollut vanhaa muotoa, käytetään uutta pakattua bitmaskia
        if (importedFavs.length === 0) {
          importedFavs = decodeFavorites(favsParam);
        }

        if (Array.isArray(importedFavs) && importedFavs.length > 0) {
          const daysSet = getDaysFromEventIds(importedFavs);
          const daysStr = Array.from(daysSet).join(", ");

          if (window.confirm(`Import ${importedFavs.length} favorites (${daysStr}) from shared link?`)) {
            // Yhdistetään olemassa oleviin suosikkeihin (merge), jotta aiemmat omat suosikit eivät pyyhkiydy pois
            setFavorites(prev => {
              const merged = new Set([...prev, ...importedFavs]);
              return Array.from(merged);
            });
          }
        }
        // Tyhjennetään URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {
        console.error("Failed to import from URL", e);
      }
    }
  }, [setFavorites]);

  // Skaalautuvat koot (suurennettu landscape-kokoja luettavuuden parantamiseksi)
  const leftLabelWidth  = isLandscape ? 95 : (isMobile ? 85 : (isTablet ? 100 : 125));
  const timeLabelHeight = isLandscape ? 45 : (isMobile ? 50 : (isTablet ? 60 : 60));
  const stageRowHeight  = isLandscape ? 50 : (isMobile ? 55 : (isTablet ? 65 : 65));
  const timeColWidth    = isLandscape ? 24 : (isMobile ? 24 : (isTablet ? 26 : TIME_COLUMN_WIDTH_PX));

  const timeLabels = useMemo(() => generateTimeLabels(dayStart), [dayStart]);
  const totalWidth = useMemo(() => timeLabels.length * timeColWidth, [timeLabels.length, timeColWidth]);
  
  // Koko aikataulun korkeus: ylä-aikarivi + staget + ala-aikarivi
  const verticalLinesH = useMemo(() => 
    (processedStages.length * (stageRowHeight + 8)) + 2 * timeLabelHeight,
    [processedStages.length, stageRowHeight, timeLabelHeight]
  ); 

  // Kerätään KAIKKI artistit kaikilta päiviltä ehdotuksia varten
  const allArtists = useMemo(() => {
    const artists = [];
    Object.entries(scheduleData).forEach(([day, data]) => {
      data.stages.forEach(stage => {
        stage.events.forEach(event => {
          artists.push({
            id: makeEventId(day, stage.name, event.name, event.start),
            name: event.name,
            start: event.start,
            stage: stage.name,
            day: day
          });
        });
      });
    });
    return artists.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handleDayChange = useCallback((day) => {
    localStorage.setItem("selectedDay", day);
    setSelectedDay(day);
  }, []);

  const jumpToTime = useCallback((time, day, stageName) => {
    if (scrollRef.current) {
      const targetDayStart = scheduleData[day]?.dayStart;
      const labels = generateTimeLabels(targetDayStart);
      const timeIndex = labels.indexOf(time);
      if (timeIndex !== -1) {
        const targetScroll = timeIndex * timeColWidth - (scrollRef.current.clientWidth / 3);
        scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
      }

      if (stageName) {
        // Etsitään vaiheen indeksi kuluvan päivän tiedoista
        const dayStages = scheduleData[day]?.stages || [];
        const stageIndex = dayStages.findIndex(s => s.name === stageName);
        
        if (stageIndex !== -1) {
          const sRowH = isLandscape ? 50 : (isMobile ? 55 : (isTablet ? 65 : 65));
          const tLabH = isLandscape ? 45 : (isMobile ? 50 : (isTablet ? 60 : 60));
          const stageTotalH = sRowH + 8;
          
          const verticalOffset = tLabH + stageIndex * stageTotalH;
          const gridElement = scrollRef.current.parentElement;
          
          if (gridElement) {
            const rect = gridElement.getBoundingClientRect();
            // Lasketaan sijainti ikkunassa ja lisätään pieni marginaali
            const absoluteTop = window.pageYOffset + rect.top + verticalOffset - 100;
            window.scrollTo({ top: absoluteTop, behavior: "smooth" });
          }
        }
      }
    }
  }, [timeColWidth, scrollRef, isMobile, isTablet, isLandscape]);

  const jumpToNow = useCallback(() => {
    if (scrollRef.current && currentTimeIndex !== null) {
      const targetScroll = currentTimeIndex * timeColWidth - (scrollRef.current.clientWidth / 2);
      scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  }, [currentTimeIndex, timeColWidth, scrollRef]);

  const footerBg = "rgba(2,0,0,0.95)";
  const triangleH = "12px";

  return (
    <>
      <Box sx={{
        position: "relative",
        zIndex: 2,
        color: BEIGE,
        minHeight: "100dvh", // Käytetään dvh (dynamic viewport height) jotta mobiiliselaimen alapalkki ei peitä sisältöä
        display: "flex",
        flexDirection: "column",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.78)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed", 
      }}>
        {/* 1. YLÄREUNA: Beige-kolmiot (alas) - LÄPINÄKYVÄ TAUSTA */}
        <Box sx={{
          width: "100%",
          height: triangleH,
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"><path d="M0 0 L10 12 L20 0 Z" fill="%23BC9B5E" fill-opacity="0.8"/></svg>')`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top left",
          flexShrink: 0
        }} />

        <DaySelector
          days={Object.keys(scheduleData)}
          selectedDay={selectedDay}
          onDayChange={handleDayChange}
          showOnlyFav={showOnlyFav}
          onToggleFav={setShowOnlyFav}
          onSettingsClick={() => setSettingsOpen(true)}
          isMobile={isMobile}
          isLandscape={isLandscape}
          artists={allArtists}
          onArtistSelect={(artist) => {
            if (artist) {
              // 1. Vaihdetaan päivä heti jos tarpeen
              if (artist.day !== selectedDay) {
                handleDayChange(artist.day);
                // Pieni viive jotta DOM päivittyy uudelle päivälle
                setTimeout(() => jumpToTime(artist.start, artist.day, artist.stage), 100);
              } else {
                jumpToTime(artist.start, selectedDay, artist.stage);
              }

              // 2. Odotetaan että skrollaus on "alueella" ja sitten väläytetään
              setTimeout(() => {
                setSelectedArtist(artist.name);
                
                // 3. Palataan normaaliksi (poistetaan korostus ja tyhjennetään haku)
                setTimeout(() => {
                  setSelectedArtist(null);
                }, 1000); // Välähdys kestää hetken
              }, 700); // Skrollauksen odotusaika
            } else {
              setSelectedArtist(null);
            }
          }}
        />

        <Box 
          ref={zoomRef}
          sx={{ 
          display: "grid", 
          gridTemplateColumns: `${leftLabelWidth}px 1fr`, 
          flex: 1,
          alignItems: "start", // Estää sisältöä venymästä turhaan, jolloin scrollbar nousee ylös
          minHeight: 0,
          ...zoomStyle
        }}>
          <StageColumn
            stages={processedStages}
            selectedDay={selectedDay}
            stageRowHeight={stageRowHeight}
            timeLabelHeight={timeLabelHeight}
            isMobile={isMobile}
            isLandscape={isLandscape}
          />

          <Box
            ref={scrollRef}
            sx={{
              width: "100%",
              maxHeight: "100%", 
              overflowX: "auto", 
              overflowY: "auto", 
              WebkitOverflowScrolling: "touch", // Sulava momentum-vieritys iOS:llä
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.3)", borderRadius: 4 },
              "&::-webkit-scrollbar-thumb": { background: `${CRIMSON}88`, borderRadius: 4, "&:hover": { background: CRIMSON } },
              cursor: "grab",
              minWidth: 0,
              // Laitteistokiihdytys ja suorituskykyoptimoinnit
              transform: "translateZ(0)",
              willChange: "scroll-position",
              backfaceVisibility: "hidden",
            }}
          >
            <Box sx={{ width: totalWidth, minWidth: totalWidth, position: "relative" }}>
              <TimeRow timeLabels={timeLabels} timeColWidth={timeColWidth} timeLabelHeight={timeLabelHeight} isMobile={isMobile} isLandscape={isLandscape} position="top" />

              {processedStages.map((stage, i) => (
                <StageRow
                  key={stage.name}
                  stage={stage}
                  index={i}
                  timeLabels={timeLabels}
                  timeColWidth={timeColWidth}
                  stageRowHeight={stageRowHeight}
                  dayStart={dayStart}
                  selectedDay={selectedDay}
                  favoritesSet={favoritesSet}
                  showOnlyFav={showOnlyFav}
                  searchQuery={selectedArtist}
                  onToggleFav={toggleFav}
                  isMobile={isMobile}
                  isLandscape={isLandscape}
                  makeEventId={makeEventId}
                  wasDragged={wasDragged}
                />
              ))}

              <TimeRow timeLabels={timeLabels} timeColWidth={timeColWidth} timeLabelHeight={timeLabelHeight} isMobile={isMobile} isLandscape={isLandscape} position="bottom" />

              {showCurrentLine && (
                <NowLine 
                  currentTimeIndex={currentTimeIndex} 
                  timeColWidth={timeColWidth} 
                  verticalLinesH={verticalLinesH} 
                  topOffset={timeLabelHeight} 
                />
              )}
            </Box>
          </Box>
        </Box>

        {showCurrentLine && (
          <Box
            onClick={jumpToNow}
            sx={{
              position: "fixed",
              bottom: isMobile ? 80 : 40,
              right: 20,
              zIndex: 100,
              background: CRIMSON,
              color: WHITE,
              px: 2, py: 1,
              borderRadius: "20px",
              fontFamily: FONT,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.05)" },
              border: `2px solid ${BEIGE}44`
            }}
          >
            <Typography sx={{ fontFamily: FONT, fontWeight: "bold" }}>NOW</Typography>
          </Box>
        )}

        {/* 2. FOOTERIN YLÄPUOLI: Beige-kolmiot (ylös) - LÄPINÄKYVÄ TAUSTA */}
        <Box sx={{
          width: "100%",
          height: triangleH,
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"><path d="M0 12 L10 0 L20 12 Z" fill="%23BC9B5E" fill-opacity="0.8"/></svg>')`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom left",
          flexShrink: 0,
          mt: 4
        }} />

        {/* Footer-teksti omalla mustalla taustallaan */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          py: 3, 
          px: 3, 
          borderTop: `2px solid ${CRIMSON}45`,
          background: footerBg
        }}>
          <Typography sx={{ color: `${BEIGE}cc`, fontFamily: FONT, textAlign: "center", fontSize: "0.85rem" }}>
            This is a personal fan project and is not affiliated with or endorsed by Q-dance or ID&T!
          </Typography>
        </Box>

        {/* 3. ALAREUNA: Crimson-kolmiot (ylös) - TÄLLÄ ON MUSTA TAUSTA */}
        <Box sx={{
          width: "100%",
          height: triangleH,
          backgroundColor: footerBg,
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"><path d="M0 12 L10 0 L20 12 Z" fill="%23910101" fill-opacity="0.9"/></svg>')`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom left",
          flexShrink: 0
        }} />
      </Box>

      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        favorites={favorites}
        onClearClick={() => { clearFavs(); setSettingsOpen(false); }}
        onImportFavorites={(newFavs) => {
          setFavorites(newFavs);
          setSettingsOpen(false);
        }}
        alertsEnabled={alertsEnabled}
        onToggleAlerts={setAlertsEnabled}
        alertOffset={alertOffset}
        onChangeAlertOffset={setAlertOffset}
      />
    </>
  );
}
