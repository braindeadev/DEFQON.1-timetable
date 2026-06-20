import scheduleData from "../data/scheduleData";

// Initialize a stable list of all events in the schedule
const eventList = [];
const eventIdToIndexMap = {};

// Stable traversal of the schedule object
Object.entries(scheduleData).forEach(([day, dayData]) => {
  dayData.stages.forEach((stage) => {
    stage.events.forEach((event) => {
      // Build the standard event ID used throughout the app
      const eventId = `${day}-${stage.name}-${event.name}-${event.start}`;
      eventList.push({ id: eventId, day: day, artistName: event.name });
      eventIdToIndexMap[eventId] = eventList.length - 1;
    });
  });
});

/**
 * Encodes selected favorites for the specified days into a clean Hex bitmask string.
 * Trims trailing zero bytes to make the hex string as short as possible.
 * @param {string[]} favoritesList - List of favorited event IDs
 * @param {Set<string>} selectedDaysSet - Set of days to include in the share (e.g., 'Thursday', 'Friday')
 * @returns {string} Hexadecimal compressed string
 */
export const encodeFavorites = (favoritesList, selectedDaysSet) => {
  const totalEvents = eventList.length;
  if (totalEvents === 0) return "";

  const numBytes = Math.ceil(totalEvents / 8);
  const bytes = new Uint8Array(numBytes);

  favoritesList.forEach((eventId) => {
    const idx = eventIdToIndexMap[eventId];
    if (idx !== undefined) {
      const eventDay = eventList[idx].day;
      if (selectedDaysSet.has(eventDay)) {
        const byteIdx = Math.floor(idx / 8);
        const bitIdx = idx % 8;
        bytes[byteIdx] |= (1 << bitIdx);
      }
    }
  });

  // Find last non-zero byte to trim trailing zeroes and shorten the string
  let lastNonZero = -1;
  for (let i = bytes.length - 1; i >= 0; i--) {
    if (bytes[i] !== 0) {
      lastNonZero = i;
      break;
    }
  }

  if (lastNonZero === -1) return ""; // no favorites selected

  // Convert Uint8Array to Hex string up to lastNonZero
  let hex = "";
  for (let i = 0; i <= lastNonZero; i++) {
    hex += bytes[i].toString(16).padStart(2, '0');
  }
  return hex;
};

/**
 * Decodes a Hex bitmask string back into an array of event IDs.
 * @param {string} hexString - Compressed URL hex value
 * @returns {string[]} List of imported event IDs
 */
export const decodeFavorites = (hexString) => {
  if (!hexString || typeof hexString !== "string") return [];

  const hex = hexString.trim().toLowerCase();
  
  // Verify it is a valid hex string with even characters count
  if (!/^[0-9a-f]+$/.test(hex) || hex.length % 2 !== 0) {
    return [];
  }

  try {
    const numBytes = hex.length / 2;
    const bytes = new Uint8Array(numBytes);
    for (let i = 0; i < numBytes; i++) {
      bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
    }

    const favorites = [];
    const totalEvents = eventList.length;

    for (let idx = 0; idx < totalEvents; idx++) {
      const byteIdx = Math.floor(idx / 8);
      const bitIdx = idx % 8;
      if (byteIdx < bytes.length) {
        if ((bytes[byteIdx] & (1 << bitIdx)) !== 0) {
          favorites.push(eventList[idx].id);
        }
      }
    }
    return favorites;
  } catch (e) {
    console.error("Failed to decode favorites from Hex link", e);
    return [];
  }
};

/**
 * Helper to identify which days are represented in a set of decoded event IDs
 * @param {string[]} eventIds 
 * @returns {Set<string>}
 */
export const getDaysFromEventIds = (eventIds) => {
  const days = new Set();
  eventIds.forEach(id => {
    const parts = id.split("-");
    if (parts.length > 0) days.add(parts[0]);
  });
  return days;
};
