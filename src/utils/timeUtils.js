import { TIME_STEP_MINUTES } from "./config";

export const generateTimeLabels = (startTime) => {
  const labels = [];
  const [startHour] = startTime.split(":").map(Number);
  for (let h = startHour; h < 24; h++) {
    for (let m = 0; m < 60; m += TIME_STEP_MINUTES) {
      labels.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    }
  }
  for (let h = 0; h <= 3; h++) {
    for (let m = 0; m < 60; m += TIME_STEP_MINUTES) {
      if (h === 3 && m > 0) break;
      labels.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    }
  }
  return labels;
};

export const timeToIndex = (time, dayStart) => {
  const [startH, startM] = dayStart.split(":").map(Number);
  const [h, m] = time.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const currentMinutes = (h < startH ? h + 24 : h) * 60 + m;
  return (currentMinutes - startMinutes) / TIME_STEP_MINUTES;
};
