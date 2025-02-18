import styles from "./modal.module.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <button className={styles["close-button"]} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
