"use client";

import { useState } from "react";
import { formatSelectedDate } from "@/lib/date-format";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import classes from "./calendar.module.css";
import Modal from "../modal/modal";

export const CalendarCells = ({ onClickDay, data, currentMonth }) => {
  const [isShowMoreModalOpen, setIsShowMoreModalOpen] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

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

  const handleMoreClick = (events, day) => {
    setSelectedDayEvents(events);
    setSelectedDay(day);
    setIsShowMoreModalOpen(true);
  };

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
                if (index < 3)
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
              {filteredEvents.length > 3 && (
                <span
                  className={classes["more-events"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoreClick(filteredEvents.slice(3), cloneDay);
                  }}
                >
                  {filteredEvents.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className={classes.row} key={day.toISOString()}>
        {days}
        {isShowMoreModalOpen && (
          <Modal
            onClose={() => setIsShowMoreModalOpen(false)}
            isMoreEventsModal
          >
            <h3 className={classes["modal-title"]}>
              {format(selectedDay, "MMMM d, yyyy")}
            </h3>
            <div className={classes["modal-container"]}>
              <ul>
                {selectedDayEvents.map((event, index) => (
                  <li key={index} className={classes["modal-event"]}>
                    <span className={classes["modal-event-time"]}>
                      {event.time}
                    </span>
                    <span className={classes["modal-event-title"]}>
                      {" "}
                      {event.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Modal>
        )}
      </div>
    );
    days = [];
  }
  return <div className={classes.body}>{rows}</div>;
};
