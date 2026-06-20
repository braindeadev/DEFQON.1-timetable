import { useState, useEffect, useCallback, useRef } from "react";
import { DateTime } from "luxon";
import { ALLOWED_DATE_DAYS } from "../utils/config";
import scheduleData from "../data/scheduleData";

export function useAlerts(favorites, selectedDay) {
  // Load initial settings
  const [alertsEnabled, setAlertsEnabled] = useState(() => {
    return localStorage.getItem("alertsEnabled") === "true";
  });

  const [alertOffset, setAlertOffset] = useState(() => {
    const val = localStorage.getItem("alertOffset");
    return val ? parseInt(val, 10) : 15; // default 15 mins
  });

  // Track fired alerts to avoid duplicates
  const [firedAlerts, setFiredAlerts] = useState(() => {
    try {
      const val = localStorage.getItem("firedAlerts");
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  });

  // Synchronous ref to track fired alerts across intervals/render updates immediately and avoid double notifications
  const firedAlertsRef = useRef(firedAlerts);
  firedAlertsRef.current = firedAlerts;

  // Keep a ref to avoid recreating the interval effect
  const stateRef = useRef({ favorites, selectedDay, alertsEnabled, alertOffset });
  stateRef.current = { favorites, selectedDay, alertsEnabled, alertOffset };

  // Save settings on change
  useEffect(() => {
    localStorage.setItem("alertsEnabled", alertsEnabled.toString());
  }, [alertsEnabled]);

  useEffect(() => {
    localStorage.setItem("alertOffset", alertOffset.toString());
  }, [alertOffset]);

  useEffect(() => {
    localStorage.setItem("firedAlerts", JSON.stringify(firedAlerts));
  }, [firedAlerts]);

  // Request notification permissions
  const handleToggleAlerts = useCallback(async (enabled) => {
    if (enabled) {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notifications.");
        setAlertsEnabled(false);
        return;
      }

      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          alert("Notification permission denied. Please enable them in browser settings.");
          setAlertsEnabled(false);
          return;
        }
      }
      setAlertsEnabled(true);
    } else {
      setAlertsEnabled(false);
    }
  }, []);

  // Helper to trigger system notification
  const sendNotification = useCallback(async (title, body, tag = undefined) => {
    if (!("Notification" in window) || Notification.permission !== "granted") {
      return;
    }

    // Try to show notification using service worker (recommended for PWAs)
    if ("serviceWorker" in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && "showNotification" in reg) {
          reg.showNotification(title, {
            body,
            icon: "/DEFQON.1-timetable/pwa-192x192.png",
            badge: "/DEFQON.1-timetable/pwa-192x192.png",
            vibrate: [200, 100, 200],
            tag: tag || "dq1-alert",
            renotify: true,
          });
          return;
        }
      } catch (e) {
        console.error("SW showNotification failed, falling back to window.Notification", e);
      }
    }

    // Fallback
    const notification = new Notification(title, {
      body,
      icon: "/DEFQON.1-timetable/pwa-192x192.png",
      tag: tag || "dq1-alert",
    });
    notification.onclick = () => {
      window.focus();
    };
  }, []);

  // Interval check
  useEffect(() => {
    const checkAlerts = () => {
      const { favorites: favs, selectedDay: day, alertsEnabled: enabled, alertOffset: offset } = stateRef.current;
      if (!enabled || favs.length === 0) return;

      const now = DateTime.now().setZone("Europe/Amsterdam");
      const todayISO = now.toISODate();
      const key = `${todayISO}_${day}`;

      // Only alert if we are on the actual day matching the schedule
      if (!ALLOWED_DATE_DAYS.has(key)) return;

      const dayData = scheduleData[day];
      if (!dayData) return;

      const [dayStartHour] = dayData.dayStart.split(":").map(Number);
      const firedSet = new Set(firedAlertsRef.current);
      let updatedFired = false;

      // Find all events for the current day
      dayData.stages.forEach((stage) => {
        stage.events.forEach((event) => {
          // Generate event ID consistent with Timetable.jsx
          const eventId = `${day}-${stage.name}-${event.name}-${event.start}`;

          // Check if this event is favorited and not already notified
          if (favs.includes(eventId) && !firedSet.has(eventId)) {
            const [startH, startM] = event.start.split(":").map(Number);
            
            // Construct target date-time
            let targetTime = now.set({ hour: startH, minute: startM, second: 0, millisecond: 0 });
            
            // If the start hour is smaller than the day start, it's after midnight (next day)
            if (startH < dayStartHour) {
              targetTime = targetTime.plus({ days: 1 });
            }

            const alertTime = targetTime.minus({ minutes: offset });

            // Fire alert if current time is within alert target and not older than 5 mins
            const diffMin = now.diff(alertTime, "minutes").minutes;
            if (diffMin >= 0 && diffMin <= 5) {
              sendNotification(
                "Artist Starting Soon!",
                `${event.name} starts in ${offset} minutes on the ${stage.name} stage!`,
                eventId
              );
              firedSet.add(eventId);
              firedAlertsRef.current = Array.from(firedSet); // Synchronous update to immediately block duplicate calls
              updatedFired = true;
            }
          }
        });
      });

      if (updatedFired) {
        setFiredAlerts(Array.from(firedSet));
      }
    };

    checkAlerts(); // run immediately
    const interval = setInterval(checkAlerts, 45_000); // check every 45s
    return () => clearInterval(interval);
  }, [sendNotification]);

  return {
    alertsEnabled,
    alertOffset,
    setAlertOffset,
    setAlertsEnabled: handleToggleAlerts,
  };
}
