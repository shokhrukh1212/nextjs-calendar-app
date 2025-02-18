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
import { formatSelectedDate } from "@/lib/date-format";

export const Calendar = ({ onClickDay, data, isLoading }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (isLoading) return <div>Loading...</div>;

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
                    <div
                      key={`event-${index}`}
                      className={classes["event-item"]}
                    >
                      <div className={classes["event-time"]}>{event.time}</div>
                      <div className={classes["event-title"]}>
                        {event.title}
                      </div>
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

  return (
    <div className={classes.calendar}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};
