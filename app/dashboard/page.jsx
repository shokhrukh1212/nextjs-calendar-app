import CalendarEventPage from "@/components/calendar-event/calendar-event";
import { fetchTasks } from "@/lib/fetch-tasks";

export default async function DashboardPage() {
  const data = await fetchTasks();
  return <CalendarEventPage data={data} />;
}
