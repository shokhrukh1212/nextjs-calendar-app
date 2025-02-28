import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;

  try {
    const db = client.db();
    const events = await db.collection("events").find({}).toArray();

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch events" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
