"use client";

import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import { useState } from "react";
import classes from "./calendar.module.css";

// Events will be fetched from database later
const events = {
  "2025-02-28": [
    { id: 1, title: "Team Meeting", time: "10:00 AM" },
    { id: 2, title: "Client Call", time: "02:30 PM" },
    { id: 3, title: "Review Docs", time: "04:00 PM" },
  ],
  "2025-02-18": [
    { id: 4, title: "Team Meeting", time: "10:00 AM" },
    { id: 5, title: "Client Call", time: "02:30 PM" },
  ],
  "2025-03-10": [
    { id: 6, title: "Team Meeting", time: "10:00 AM" },
    { id: 7, title: "Client Call", time: "02:30 PM" },
  ],
};

export const Calendar = ({ onClickDay, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
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

  const renderDays = () => {
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

  const renderCells = () => {
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
        console.log("formattedDate - ", formattedDate);
        const cloneDay = day;

        const isPast = day < today.setHours(0, 0, 0, 0);

        const isDateExist = Object.keys(events).find((e) =>
          isSameDay(new Date(e), day)
        );
        let filteredEvents = [];

        if (isDateExist) filteredEvents = events[isDateExist];

        console.log("filteredEvents - ", filteredEvents);

        days.push(
          <div
            className={`${classes.col} ${classes.cell} ${
              !isSameMonth(day, monthStart) ? classes.disabled : ""
            } ${isSameDay(day, selectedDate) ? classes.selected : ""}
            ${isPast ? classes.disabled : ""}`}
            key={day.toISOString()}
            onClick={() => !isPast && onClickDay(cloneDay)}
          >
            <span className={classes.number}>{formattedDate}</span>
            <span className={classes.bg}>{formattedDate}</span>

            {filteredEvents.length > 0 && (
              <div className="tile-events">
                {filteredEvents.map((event) => {
                  return (
                    <div key={event.id} className="event-item">
                      <div className="event-time">{event.time}</div>
                      <div className="event-title">{event.title}</div>
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
        <div className={classes.row} key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className={classes.body}>{rows}</div>;
  };

  return (
    <div className={classes.calendar}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};
