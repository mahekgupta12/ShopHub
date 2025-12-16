const FIREBASE_DB_URL =
  "https://shophub-f4dfe-default-rtdb.firebaseio.com";

export const firebaseRest = async (
  path: string,
  method: string = "GET",
  body?: any,
  idToken?: string
) => {
  const url = `${FIREBASE_DB_URL}/${path}.json${
    idToken ? `?auth=${idToken}` : ""
  }`;

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || "Firebase REST error");
  }

  return response.json();
};
