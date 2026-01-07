/**
 * Wishlist API Functions
 * Handles Firebase API calls for wishlist functionality
 * Uses the same pattern as cartApi.ts
 */

import { getAuthData } from "../../restapi/authHelpers";
import { firebaseRest } from "../../restapi/firebaseRest";
import type { WishlistItem } from "./wishlistSlice";

/**
 * Load wishlist from Firebase
 * Pattern: /wishlists/{userId}
 */
export async function loadWishlistFromApi(userId: string): Promise<WishlistItem[]> {
  const { idToken } = await getAuthData();
  const data = await firebaseRest(`wishlists/${userId}`, "GET", undefined, idToken);
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
  await firebaseRest(`wishlists/${userId}`, "PUT", items, idToken);
}
