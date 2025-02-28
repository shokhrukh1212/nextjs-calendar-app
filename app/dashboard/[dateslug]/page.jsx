import CreateEventForm from "@/components/create-event-form/create-event-form";
import Link from "next/link";
import styles from "./page.module.css";

export default async function DashboardDatePage({ params }) {
  const { dateslug } = await params;
  return (
    <div className={styles.container}>
      <CreateEventForm defaultDate={new Date(dateslug)} />
      <div className={styles["button-group"]}>
        <Link href="/dashboard" className={styles["dashboard-link"]}>
          ⬅️ Dashboard
        </Link>

        <button className={styles["submit-button"]} form="event-form">
          Create Event
        </button>
      </div>
    </div>
  );
}
