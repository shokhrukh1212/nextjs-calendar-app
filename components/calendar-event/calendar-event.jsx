"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./calendar-event.module.css";
import CreateEventModal from "../modal/create-event-modal";
import { formatSelectedDate } from "@/lib/date-format";
import { Calendar } from "../calendar/calendar";

const CalendarEventPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();

  const handleDayClick = (date) => {
    const formattedDate = formatSelectedDate(date);
    if (formattedDate === selectedDate) {
      setShowModal(false);
      setTimeout(() => {
        setShowModal(true);
        router.push(`/dashboard/${formattedDate}`, {
          scroll: false,
        });
      }, 0);
      return;
    }
    setSelectedDate(formattedDate);
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
        <Calendar onClickDay={handleDayClick} selectedDate={selectedDate} />
      </div>

      {showModal && (
        <CreateEventModal
          isModalActive={showModal}
          setCloseModal={setShowModal}
        />
      )}
    </div>
  );
};
export default CalendarEventPage;
