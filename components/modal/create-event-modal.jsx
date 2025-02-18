"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Modal from "./modal";
import CreateEventForm from "../create-event-form/create-event-form";

const CreateEventModal = ({
  defaultDate = new Date(),
  isModalActive = false,
  setCloseModal = null,
}) => {
  const [showModal, setShowModal] = useState(isModalActive);

  const handleModalClose = () => {
    if (setCloseModal) setCloseModal(false);
    setShowModal(false);
    redirect("/dashboard");
  };

  return (
    <>
      {showModal && (
        <Modal onClose={handleModalClose}>
          <CreateEventForm
            key={defaultDate.toISOString()}
            setShowModal={setShowModal}
            defaultDate={defaultDate}
            handleModalClose={handleModalClose}
            isModal={true}
          />
        </Modal>
      )}
    </>
  );
};

export default CreateEventModal;
