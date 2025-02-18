"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import styles from "./calendar-event.module.css";
import CreateEventModal from "../modal/create-event-modal";
import { formatSelectedDate } from "@/lib/date-format";
import { Calendar } from "../calendar/calendar";

const fetcher = (url) => fetch(url).then((r) => r.json());

const CalendarEventPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { data, isLoading } = useSWR("/api/get-tasks", fetcher);
  const router = useRouter();

  const handleDayClick = (date) => {
    const formattedDate = formatSelectedDate(date);
    const formattedSelectedDate = formatSelectedDate(selectedDate);
    if (formattedDate === formattedSelectedDate) {
      setTimeout(() => {
        router.push(`/dashboard/${formattedDate}`, {
          scroll: false,
        });
        setShowModal(true);
      }, 0);
      return;
    }
    setSelectedDate(date);
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
          data={data}
          isLoading={isLoading}
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
