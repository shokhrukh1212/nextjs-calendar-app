"use client";

import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import { useState } from "react";
import classes from "./calendar.module.css";
import { renderCells, renderDays, renderHeader } from "@/lib/calendar-utils";

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
      {renderHeader(prevMonth, nextMonth, currentMonth)}
      {renderDays(currentMonth)}
      {renderCells(onClickDay, data, currentMonth)}
    </div>
  );
};
