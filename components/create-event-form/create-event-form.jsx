"use client";
import { useActionState, useEffect, useState } from "react";
import { createEvent } from "@/actions/create-event";
import styles from "./create-event-form.module.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-clock/dist/Clock.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateEventForm = ({
  defaultDate,
  handleModalClose = null,
  isModal = false,
}) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date(defaultDate));
  const [state, action, isPending] = useActionState(createEvent, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      if (isModal) handleModalClose();
      else router.back();

      toast.success("Event created successfully");
    }
  }, [state?.success]);

  const handleCancelClick = () => {
    if (isModal) handleModalClose();
    else router.back();
  };

  return (
    <form
      action={action}
      className={
        isModal
          ? styles["modal-form-container-modal"]
          : styles["modal-form-container"]
      }
    >
      <h2>New Event</h2>
      <div className={styles["form-group"]}>
        <input
          type="text"
          id="event-title"
          name="event-title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Event title"
        />
        {state?.errors?.title && (
          <p className={isModal ? styles["error-modal"] : styles["error"]}>
            {state?.errors?.title}
          </p>
        )}

        <input
          type="text"
          id="event-description"
          name="event-description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Event description"
        />
        {state?.errors?.description && (
          <p className={isModal ? styles["error-modal"] : styles["error"]}>
            {state?.errors?.description}
          </p>
        )}
      </div>

      <div className={styles["datetime-container"]}>
        <DateTimePicker
          onChange={setSelectedDate}
          value={selectedDate}
          name="event-date"
          format="MM/dd/yyyy h:mm a"
          minDate={new Date()}
          clearIcon="✖"
          calendarIcon="📅"
          className={
            isModal
              ? styles["custom-datetime-picker-modal"]
              : styles["custom-datetime-picker"]
          }
        />
        {state?.errors?.date && (
          <p className={isModal ? styles["error-modal"] : styles["error"]}>
            {state?.errors?.date}
          </p>
        )}
      </div>

      {state?.error && (
        <p className={isModal ? styles["error-modal"] : styles["error"]}>
          {state?.error}
        </p>
      )}

      <div
        className={
          isModal ? styles["button-group-modal"] : styles["button-group"]
        }
      >
        <button
          type="button"
          onClick={handleCancelClick}
          className={styles["cancel-button"]}
          disabled={isPending}
        >
          Cancel
        </button>
        <button className={styles["submit-button"]} disabled={isPending}>
          {isPending ? "Creating..." : " Create Event"}
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;
