export const retrieveUserConnections = async (userId: string | undefined) => {
  const response = await fetch(`/api/connection/${userId}/retrieve`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to retrieve user connections", {
      cause: response.statusText,
    });
  }
  return response.json();
};
