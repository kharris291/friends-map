export const createConnection = async (p0: {
  broughtBy?: string;
  groupIntro?: string;
  from?: string;
  to?: string;
}) => {
  const response = await fetch("/api/connection/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(p0),
  });
  return await response.json();
};
