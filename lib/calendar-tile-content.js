export const createTileContent = (events, { date, view }) => {
  if (view !== "month") return null;

  const dateStr = date.toISOString().split("T")[0];
  const dayEvents = events[dateStr] || [];

  return (
    <div className="tile-events">
      {dayEvents.slice(0, 3).map((event) => (
        <div key={event.id} className="event-item">
          <div className="event-time">{event.time}</div>
          <div className="event-title">{event.title}</div>
        </div>
      ))}
    </div>
  );
};
