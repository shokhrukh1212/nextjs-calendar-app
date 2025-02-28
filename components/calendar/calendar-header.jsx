import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import classes from "./calendar.module.css";

export const CalendarHeader = ({ prevMonth, nextMonth, currentMonth }) => {
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
