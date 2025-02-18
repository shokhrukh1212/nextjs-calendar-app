import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Organize Your Events with Ease</h1>
      <p className={styles.subtitle}>
        Create, manage, and share events effortlessly with our intuitive event
        management platform.
      </p>

      <div className={styles.features}>
        <div className={styles["feature-card"]}>
          <h3>Simple Scheduling</h3>
          <p>
            Easily create and manage events with our intuitive calendar
            interface.
          </p>
        </div>
        <div className={styles["feature-card"]}>
          <h3>Share & Collaborate</h3>
          <p>
            Invite participants and collaborate on event details in real-time.
          </p>
        </div>
        <div className={styles["feature-card"]}>
          <h3>Reminders</h3>
          <p>Automated reminders ensure you never miss an important event.</p>
        </div>
      </div>
    </div>
  );
}
