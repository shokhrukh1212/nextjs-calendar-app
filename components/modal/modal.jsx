import styles from "./modal.module.css";

const Modal = ({ children, onClose, isMoreEventsModal = false }) => {
  return (
    <div
      className={
        isMoreEventsModal
          ? styles["more-events-modal-overlay"]
          : styles["modal-overlay"]
      }
    >
      <div
        className={
          isMoreEventsModal
            ? styles["more-events-modal-content"]
            : styles["modal-content"]
        }
      >
        <button className={styles["close-button"]} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
