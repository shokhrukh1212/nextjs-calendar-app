import CreateEventModal from "@/components/modal/create-event-modal";

export default async function DashboardPage({ params }) {
  const { dateslug } = await params;
  return <CreateEventModal defaultDate={new Date(dateslug)} />;
}
