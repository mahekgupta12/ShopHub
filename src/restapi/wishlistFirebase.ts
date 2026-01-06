import { firebaseRest } from "./firebaseRest";
import type { WishlistItem } from "../screens/wishlist/wishlistSlice";

/**
 * Save wishlist to Firebase Realtime Database
 * Each user's wishlist is stored at /wishlists/{userId}
 */
export async function saveWishlistToFirebase(
  userId: string,
  wishlistItems: WishlistItem[],
  idToken: string
): Promise<void> {
  try {
    await firebaseRest(
      `wishlists/${userId}`,
      "PUT",
      wishlistItems,
      idToken
    );
  } catch (error) {
    console.error("Error saving wishlist to Firebase:", error);
    throw error;
  }
}

/**
 * Fetch wishlist from Firebase Realtime Database
 * Returns null if user has no wishlist yet
 */
export async function fetchWishlistFromFirebase(
  userId: string,
  idToken: string
): Promise<WishlistItem[] | null> {
  try {
    const response = await firebaseRest(
      `wishlists/${userId}`,
      "GET",
      undefined,
      idToken
    );
    
    // Firebase returns null if path doesn't exist
    return response || null;
  } catch (error) {
    console.error("Error fetching wishlist from Firebase:", error);
    // Return null on error instead of throwing
    // This allows app to continue with empty wishlist
    return null;
  }
}

/**
 * Delete wishlist from Firebase (e.g., on logout)
 */
export async function deleteWishlistFromFirebase(
  userId: string,
  idToken: string
): Promise<void> {
  try {
    await firebaseRest(
      `wishlists/${userId}`,
      "DELETE",
      undefined,
      idToken
    );
  } catch (error) {
    console.error("Error deleting wishlist from Firebase:", error);
    // Don't throw - logout should succeed even if Firebase delete fails
  }
}

/**
 * Add single item to wishlist in Firebase
 */
export async function addItemToFirebaseWishlist(
  userId: string,
  item: WishlistItem,
  idToken: string
): Promise<void> {
  try {
    await firebaseRest(
      `wishlists/${userId}/${item.id}`,
      "PUT",
      item,
      idToken
    );
  } catch (error) {
    console.error("Error adding item to Firebase wishlist:", error);
    throw error;
  }
}

/**
 * Remove single item from wishlist in Firebase
 */
export async function removeItemFromFirebaseWishlist(
  userId: string,
  itemId: string,
  idToken: string
): Promise<void> {
  try {
    await firebaseRest(
      `wishlists/${userId}/${itemId}`,
      "DELETE",
      undefined,
      idToken
    );
  } catch (error) {
    console.error("Error removing item from Firebase wishlist:", error);
    throw error;
  }
}
