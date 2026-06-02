import { TIME_STEP_MINUTES } from "./config";

/**
 * Generoi aikalabelit listana, alkaen startTime:sta ja jatkuen seuraavaan aamuun (klo 06:00).
 * Käyttää absoluuttista minuuttilaskentaa vikatilanteiden välttämiseksi.
 */
export const generateTimeLabels = (startTime) => {
  if (!startTime) return [];
  
  const labels = [];
  const [startH, startM] = startTime.split(":").map(Number);
  
  // Lasketaan kuinka monta 5 minuutin askelta päivässä on klo 06:00 asti.
  // Jos aloitus on esim. 11:00, ja loppu on seuraavan päivän 06:00 (eli 30:00).
  // 30h - 11h = 19 tuntia. 19 * 12 = 228 askelta.
  
  const startTotalMinutes = startH * 60 + startM;
  const endTotalMinutes = 32 * 60; // Seuraavan päivän klo 08:00 (24 + 8)
  
  for (let m = startTotalMinutes; m <= endTotalMinutes; m += TIME_STEP_MINUTES) {
    const currentH = Math.floor(m / 60) % 24;
    const currentM = m % 60;
    labels.push(`${currentH.toString().padStart(2, "0")}:${currentM.toString().padStart(2, "0")}`);
  }
  
  return labels;
};

/**
 * Laskee grid-indeksin (0-n) annetulle kellonajalle suhteessa päivän aloitukseen.
 */
export const timeToIndex = (time, dayStart) => {
  if (!time || !dayStart) return 0;
  
  const [startH, startM] = dayStart.split(":").map(Number);
  const [h, m] = time.split(":").map(Number);
  
  const startTotal = startH * 60 + startM;
  let currentTotal = h * 60 + m;
  
  // Jos kellonaika on pienempi kuin aloitusaika, oletetaan sen olevan seuraavan vuorokauden puolella
  if (currentTotal < startTotal) {
    currentTotal += 24 * 60;
  }
  
  return (currentTotal - startTotal) / TIME_STEP_MINUTES;
};