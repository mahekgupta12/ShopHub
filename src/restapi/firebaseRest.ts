const FIREBASE_DB_URL =
  "https://shophub-f4dfe-default-rtdb.firebaseio.com";

export async function firebaseRest(
  path: string,
  method: string = "GET",
  body?: any,
  idToken?: string
) {
  const url = `${FIREBASE_DB_URL}/${path}.json${
    idToken ? `?auth=${idToken}` : ""
  }`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || "Firebase REST error");
  }

  return res.json();
}
