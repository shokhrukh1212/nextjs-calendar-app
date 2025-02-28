"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

export async function createEvent(prevState, formData) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("events");

    const title = formData.get("event-title");
    const description = formData.get("event-description");
    const date = formData.get("event-date");

    if (!title || title.length < 3) {
      return {
        errors: {
          title: "Title must be at least 3 characters long",
        },
      };
    }

    if (!description || description.length < 8) {
      return {
        errors: {
          description: "Description must be at least 8 characters long",
        },
      };
    }

    if (!date) {
      return {
        errors: {
          date: "Date is required",
        },
      };
    }

    // will be stored in database
    const dateWithoutTime = date.split("T")[0];
    const time = date.split("T")[1];

    const newEvent = {
      title,
      description,
      time,
    };

    await collection.updateOne(
      { date: dateWithoutTime },
      { $push: { events: newEvent } },
      { upsert: true }
    );
    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create event. Please try again.",
    };
  }
}
