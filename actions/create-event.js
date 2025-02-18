"use server";

import clientPromise from "@/lib/mongodb";

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

    // checking if there are already 3 events for the day
    const existingDay = await collection.findOne({ date: dateWithoutTime });

    if (existingDay && existingDay.events.length >= 3) {
      return {
        success: false,
        error: "You can only have up to 3 events per day",
      };
    }

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

    return {
      success: true,
      message: "Event created successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create event. Please try again.",
    };
  }
}
