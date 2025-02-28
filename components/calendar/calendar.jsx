"use client";

import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import { useState } from "react";
import classes from "./calendar.module.css";
import { CalendarHeader } from "./calendar-header";
import { CalendarDays } from "./calendar-days";
import { CalendarCells } from "./calendar-cells";

export const Calendar = ({ onClickDay, data }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className={classes.calendar}>
      <CalendarHeader
        prevMonth={() => prevMonth()}
        nextMonth={() => nextMonth()}
        currentMonth={currentMonth}
      />
      <CalendarDays currentMonth={currentMonth} />
      <CalendarCells
        onClickDay={onClickDay}
        data={data}
        currentMonth={currentMonth}
      />
    </div>
  );
};
