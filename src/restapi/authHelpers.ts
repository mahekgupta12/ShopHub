import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  USER_ID_KEY,
  ID_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ID_TOKEN_EXP_KEY,
} from "./authKeys";
import { FIREBASE_API_KEY } from "../constants/api";

const REFRESH_ENDPOINT = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`;

async function refreshIdTokenIfNeeded(idToken: string | null, refreshToken: string | null, expTsStr: string | null) {
  const now = Date.now();
  const expTs = expTsStr ? Number(expTsStr) : 0;

  if (!idToken || !refreshToken) return null;

  // If token still valid, return existing idToken
  if (expTs && now < expTs) return idToken;

  // Token expired or missing/invalid expiry -> refresh
  try {
    const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`;
    const res = await fetch(REFRESH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error_description || data.error || "Failed to refresh token");
    }

    // Response contains: id_token, refresh_token, expires_in, user_id
    const newIdToken = data.id_token;
    const newRefreshToken = data.refresh_token;
    const expiresIn = Number(data.expires_in) || 3600;
    const newExpTs = Date.now() + expiresIn * 1000 - 60000; // refresh 60s early

    // Persist new tokens
    await AsyncStorage.multiSet([
      [ID_TOKEN_KEY, newIdToken],
      [REFRESH_TOKEN_KEY, newRefreshToken || ""],
      [ID_TOKEN_EXP_KEY, newExpTs.toString()],
    ]);

    return newIdToken;
  } catch {
    await AsyncStorage.multiRemove([USER_ID_KEY, ID_TOKEN_KEY, REFRESH_TOKEN_KEY, ID_TOKEN_EXP_KEY]);
    return null;
  }
}

export async function getAuthData() {
  const userId = await AsyncStorage.getItem(USER_ID_KEY);
  const idToken = await AsyncStorage.getItem(ID_TOKEN_KEY);
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  const expTsStr = await AsyncStorage.getItem(ID_TOKEN_EXP_KEY);

  if (!userId) throw new Error("User not authenticated");

  const validIdToken = await refreshIdTokenIfNeeded(idToken, refreshToken, expTsStr);
  if (!validIdToken) throw new Error("User not authenticated");

  return { userId, idToken: validIdToken };
}
