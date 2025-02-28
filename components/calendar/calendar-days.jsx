import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import classes from "./calendar.module.css";

export const CalendarDays = ({ currentMonth }) => {
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
