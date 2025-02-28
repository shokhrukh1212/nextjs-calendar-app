export const fetchTasks = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-tasks`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
