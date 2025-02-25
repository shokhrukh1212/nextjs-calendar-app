"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./calendar-event.module.css";
import CreateEventModal from "../modal/create-event-modal";
import { formatSelectedDate } from "@/lib/date-format";
import { Calendar } from "../calendar/calendar";

const CalendarEventPage = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDayClick = (date) => {
    const formattedDate = formatSelectedDate(date);
    router.push(`/dashboard/${formattedDate}`, {
      scroll: false,
    });
  };

  const handleCreateEventClick = () => {
    setShowModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Create New Event</h1>
        <button
          onClick={handleCreateEventClick}
          className={styles["create-event-button"]}
        >
          Create Event
        </button>
      </div>

      <div className={styles["calendar-container"]}>
        <Calendar onClickDay={handleDayClick} data={data} />
      </div>

      {showModal && <CreateEventModal setShowModal={setShowModal} />}
    </div>
  );
};
export default CalendarEventPage;
