import scheduleData from "../data/scheduleData";

export const getAllArtists = () => {
  const artists = [];
  
  Object.entries(scheduleData).forEach(([day, dayData]) => {
    dayData.stages.forEach((stage) => {
      stage.events.forEach((event) => {
        artists.push({
          label: event.name, 
          day: day,
          stage: stage.name,
          start: event.start,
          end: event.end
        });
      });
    });
  });

  return artists.sort((a, b) => a.label.localeCompare(b.label));
};