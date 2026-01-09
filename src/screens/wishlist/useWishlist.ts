import { useAppDispatch, useAppSelector, RootState } from "../cart/cartStore";
import { addToWishlist, removeFromWishlist } from "./wishlistSlice";
import { addItem } from "../cart/cartSlice";
import { safeFetch } from "../../utils/safeFetch";
import { API_BASE_URL } from "../../config/api";
import { Alert } from "react-native";
import type { Product } from "../home/api";

/**
 * Custom hook to manage wishlist operations
 * Provides functions to add, remove, and manage wishlist items
 * Handles network connectivity checks before risky operations
 */
export function useWishlist() {
  // Redux dispatch for state updates
  const dispatch = useAppDispatch();

  // Get current wishlist items from Redux store
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items
  );

  /**
   * Check if a product exists in the wishlist
   * @param productId - The ID of the product to check
   * @returns true if product is in wishlist, false otherwise
   */
  const isInWishlist = (productId: number): boolean => {
    return wishlistItems.some((item) => item && item.id === productId);
  };

  /**
   * Toggle product in/out of wishlist
   * If product is in wishlist, remove it; otherwise add it
   * @param product - The product to toggle
   */
  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      // Product exists, so remove it
      dispatch(removeFromWishlist(product.id));
    } else {
      // Product doesn't exist, so add it
      dispatch(addToWishlist(product));
    }
  };

  /**
   * Move product from wishlist to shopping cart
   * Checks network connectivity before allowing the operation
   * @param product - The product to add to cart
   */
  const addToCart = async (product: Product) => {
    try {
      // Health check: verify network is available by hitting a test endpoint
      const healthUrl = `${API_BASE_URL}/products/1`;
      const result = await safeFetch(healthUrl, { method: "GET" });

      // If network error or response is not ok, show alert and exit
      if (result.networkError || !result.response || !result.response.ok) {
        Alert.alert(
          "Network unavailable",
          "Cannot move item to cart while offline. Please try again when network is connected."
        );
        return;
      }
    } catch {
      // Network error occurred, prevent operation
      Alert.alert(
        "Network unavailable",
        "Cannot move item to cart while offline. Please try again when network is connected."
      );
      return;
    }

    // Network is available, add product to cart Redux store
    dispatch(addItem(product));
  };

  /**
   * Remove product from wishlist
   * Checks network connectivity before allowing the operation
   * @param productId - The ID of the product to remove
   */
  const removeFromWishlistList = async (productId: number) => {
    try {
      // Health check: verify network is available by hitting a test endpoint
      const healthUrl = `${API_BASE_URL}/products/1`;
      const result = await safeFetch(healthUrl, { method: "GET" });

      // If network error or response is not ok, show alert and exit
      if (result.networkError || !result.response || !result.response.ok) {
        Alert.alert(
          "Network unavailable",
          "Cannot remove item from wishlist while offline. Please try again when network is connected."
        );
        return;
      }
    } catch {
      // Network error occurred, prevent operation
      Alert.alert(
        "Network unavailable",
        "Cannot remove item from wishlist while offline. Please try again when network is connected."
      );
      return;
    }

    // Network is available, remove product from wishlist Redux store
    dispatch(removeFromWishlist(productId));
  };

  // Return all wishlist operations for use in components
  return {
    wishlistItems,
    isInWishlist,
    toggleWishlist,
    addToCart,
    removeFromWishlistList,
  };
}
