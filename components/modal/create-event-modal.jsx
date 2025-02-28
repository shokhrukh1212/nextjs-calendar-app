"use client";

import Modal from "./modal";
import CreateEventForm from "../create-event-form/create-event-form";
import * as styles from "./create-event-modal.module.css";
import { useRouter } from "next/navigation";

const CreateEventModal = ({ defaultDate = new Date(), onClose }) => {
  const router = useRouter();

  const handleClose = () => {
    // If used after clicking the create event button
    if (onClose) return onClose();
    // If used in intercepting route
    router.back();
  };

  return (
    <>
      <Modal onClose={handleClose}>
        <CreateEventForm defaultDate={defaultDate} isModal={true} />

        <div className={styles["button-group-modal"]}>
          <button
            type="button"
            onClick={handleClose}
            className={styles["cancel-button"]}
          >
            Cancel
          </button>
          <button className={styles["submit-button"]} form="event-form">
            Create Event
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CreateEventModal;
