"use client";

import { useRouter } from "next/navigation";
import Modal from "./modal";
import CreateEventForm from "../create-event-form/create-event-form";

const CreateEventModal = ({ defaultDate = new Date(), setShowModal }) => {
  const router = useRouter();

  const handleModalClose = () => {
    // if modal opens after clicking a button
    if (setShowModal) setShowModal(false);
    // if modal opens after clicking a day, as an intercepting route
    else router.back();
  };

  return (
    <>
      <Modal onClose={handleModalClose}>
        <CreateEventForm
          defaultDate={defaultDate}
          handleModalClose={handleModalClose}
          isModal={true}
        />
      </Modal>
    </>
  );
};

export default CreateEventModal;
