import CreateEventForm from "@/components/create-event-form/create-event-form";

export default async function DashboardDatePage({ params }) {
  const { dateslug } = await params;
  return <CreateEventForm defaultDate={new Date(dateslug)} />;
}
