import { formatSelectedDate } from "@/lib/date-format";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import classes from "../components/calendar/calendar.module.css";

// render header
export const renderHeader = (prevMonth, nextMonth, currentMonth) => {
  const dateFormat = "MMMM yyyy";
  const today = new Date();
  const day = startOfWeek(currentMonth, { weekStartsOn: 1 });

  const isPast = day < today.setHours(0, 0, 0, 0);

  return (
    <div
      className={`${classes.header} ${classes.row} ${classes["flex-middle"]}`}
    >
      <div className={`${classes.col} ${classes["col-start"]}`}>
        <div
          className={`${classes.icon} ${
            isPast ? classes["disabled-icon"] : ""
          }`}
          onClick={prevMonth}
        >
          chevron_left
        </div>
      </div>
      <div className={`${classes.col} ${classes["col-center"]}`}>
        <span>{format(currentMonth, dateFormat)}</span>
      </div>
      <div
        className={`${classes.col} ${classes["col-end"]}`}
        onClick={nextMonth}
      >
        <div className={classes.icon}>chevron_right</div>
      </div>
    </div>
  );
};

// render days
export const renderDays = (currentMonth) => {
  const dateFormat = "EEEE";
  const days = [];

  let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className={`${classes.col} ${classes["col-center"]}`} key={i}>
        {format(addDays(startDate, i), dateFormat)}
      </div>
    );
  }
  return <div className={`${classes.days} ${classes.row}`}>{days}</div>;
};

// render cells
export const renderCells = (onClickDay, data, currentMonth) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "d";
  const today = new Date();
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;

      const isPast = day < today.setHours(0, 0, 0, 0);

      const dateIndex = data?.findIndex(
        (item) => item.date === formatSelectedDate(day)
      );

      let filteredEvents = [];

      if (dateIndex !== -1 && dateIndex !== undefined)
        filteredEvents = data[dateIndex]?.events || [];

      days.push(
        <div
          key={day.toISOString()}
          className={`${classes.col} ${classes.cell} ${
            !isSameMonth(day, monthStart) ? classes.disabled : ""
          } ${isSameDay(day, new Date()) ? classes.selected : ""}
            ${isPast ? classes.disabled : ""}`}
          onClick={() => onClickDay(cloneDay)}
        >
          <span className={classes.number}>{formattedDate}</span>
          <span className={classes.bg}>{formattedDate}</span>

          {filteredEvents.length > 0 && (
            <div className={classes["tile-events"]}>
              {filteredEvents.map((event, index) => {
                return (
                  <div key={`event-${index}`} className={classes["event-item"]}>
                    <div className={classes["event-time"]}>{event.time}</div>
                    <div className={classes["event-title"]}>{event.title}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className={classes.row} key={day.toISOString()}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className={classes.body}>{rows}</div>;
};
