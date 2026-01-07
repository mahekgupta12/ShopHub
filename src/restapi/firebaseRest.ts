import { FIREBASE_DB_URL } from "../constants/api";
import { safeFetch } from "../utils/safeFetch";

export class FirebaseError extends Error {
  code?: string;
  details?: any;

  constructor(message: string, code?: string, details?: any) {
    super(message);
    this.name = "FirebaseError";
    this.code = code;
    this.details = details;
  }
}

export async function firebaseRest(
  path: string,
  method: string = "GET",
  body?: any,
  idToken?: string
) {
  const url = `${FIREBASE_DB_URL}/${path}.json${
    idToken ? `?auth=${idToken}` : ""
  }`;

  const result = await safeFetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (result.networkError) {
    // Normalize network failure as a FirebaseError so callers can handle it
    throw new FirebaseError("Network request failed", "NETWORK_ERROR", result.error);
  }

  const res = result.response as Response;

  if (!res.ok) {
    let parsed: any = null;
    try {
      parsed = await res.json();
    } catch {
      // Non-JSON error body
    }

    const message = parsed?.error || `Firebase REST error (${res.status})`;
    const code = parsed?.error === "Permission denied" ? "PERMISSION_DENIED" : "FIREBASE_ERROR";
    // include parsed body as details when available
    throw new FirebaseError(message, code, parsed || { status: res.status });
  }

  return res.json();
}
