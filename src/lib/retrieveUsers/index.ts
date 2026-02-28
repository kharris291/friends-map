export const retrieveUsers = async () => {
  const response = await fetch("/api/users");
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to retrieve users");
  }
  const data = await response.json();
  console.log({ data });
  return data;
};
