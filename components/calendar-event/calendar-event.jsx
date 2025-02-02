"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import styles from "./calendar-event.module.css";
import CreateEventModal from "../modal/create-event-modal";
import { createTileContent } from "@/lib/calendar-tile-content";
import { formatSelectedDate } from "@/lib/date-format";

const CalendarEventPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();

  // Events will be fetched from database later
  const events = {
    "2025-02-15": [
      { id: 1, title: "Team Meeting", time: "10:00 AM" },
      { id: 2, title: "Client Call", time: "02:30 PM" },
      { id: 3, title: "Review Docs", time: "04:00 PM" },
    ],
  };

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
        <Calendar
          onClickDay={handleDayClick}
          value={selectedDate}
          className={styles.calendar}
          tileClassName={styles.tile}
          minDate={new Date()}
          tileContent={createTileContent.bind(null, events)}
          locale="en-US"
        />
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
