import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { ALLOWED_DATE_DAYS } from "../../../utils/config.js";
import { timeToIndex } from "../../../utils/timeUtils.js";

export function useNowLine(selectedDay, dayStart) {
  const [currentTimeIndex, setCurrentTimeIndex] = useState(null);
  const [showCurrentLine,  setShowCurrentLine]  = useState(false);

  useEffect(() => {
    const update = () => {
      const now      = DateTime.now().setZone("Europe/Amsterdam");
      const todayISO = now.toISODate();
      const key      = `${todayISO}_${selectedDay}`;

      if (ALLOWED_DATE_DAYS.has(key)) {
        const timeStr = `${now.hour.toString().padStart(2, "0")}:${now.minute.toString().padStart(2, "0")}`;
        setCurrentTimeIndex(timeToIndex(timeStr, dayStart));
        setShowCurrentLine(true);
      } else {
        setCurrentTimeIndex(null);
        setShowCurrentLine(false);
      }
    };

    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [selectedDay, dayStart]);

  return { currentTimeIndex, showCurrentLine };
}