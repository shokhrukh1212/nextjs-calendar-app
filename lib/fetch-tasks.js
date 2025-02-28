export const fetchTasks = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-tasks`, {
      cache: "no-store",
    });

    if (!res.ok)
      return { message: "Failed to fetch data", statusCode: res.status };

    return await res.json();
  } catch (error) {
    return { message: error.message, statusCode: 500 };
  }
};
