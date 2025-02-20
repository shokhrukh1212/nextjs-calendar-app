import CalendarEventPage from "@/components/calendar-event/calendar-event";

export default async function DashboardPage() {
  let data = null;
  let isLoading = true;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-tasks`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    data = await res.json();
    isLoading = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    isLoading = false;
  }

  return <CalendarEventPage data={data} isLoading={isLoading} />;
}
