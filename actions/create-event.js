"use server";

export async function createEvent(prevState, formData) {
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
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { success: true };
}
