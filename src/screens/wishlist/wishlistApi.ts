/**
 * Wishlist API Functions
 * Handles Firebase API calls for wishlist functionality
 * Uses the same pattern as cartApi.ts
 */

import { getAuthData } from "../../restapi/authHelpers";
import { FIREBASE_DB_URL } from "../../constants/api";
import type { WishlistItem } from "./wishlistSlice";

/**
 * Load wishlist from Firebase
 * Pattern: /wishlists/{userId}
 */
export async function loadWishlistFromApi(userId: string): Promise<WishlistItem[]> {
  const { idToken } = await getAuthData();

  const res = await fetch(
    `${FIREBASE_DB_URL}/wishlists/${userId}.json?auth=${idToken}`
  );

  if (!res.ok) {
    throw new Error("Failed to load wishlist");
  }

  const data = await res.json();
  return data ? Object.values(data) : [];
}

/**
 * Save wishlist to Firebase
 * Pattern: /wishlists/{userId}
 */
export async function saveWishlistToApi(
  userId: string,
  items: WishlistItem[]
): Promise<void> {
  const { idToken } = await getAuthData();

  await fetch(
    `${FIREBASE_DB_URL}/wishlists/${userId}.json?auth=${idToken}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    }
  );
}
