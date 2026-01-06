/**
 * Wishlist Feature Exports
 * Central hub for all wishlist-related exports
 */

// State & Reducers
export {
  type WishlistItem,
  addToWishlist,
  removeFromWishlist,
  setWishlist,
  clearWishlist,
  increaseWishlistQty,
  decreaseWishlistQty,
} from "./wishlistSlice";

// Components
export { default as WishlistScreen } from "./wishlistScreen";

// Hooks
export { useWishlist } from "./useWishlist";
export { useLoadWishlist } from "./useLoadWishlist";

// Styles
export { default as makeWishlistStyles } from "./wishlistStyles";

// Messages
export { WISHLIST_MESSAGES } from "./wishlistMessages";

// API
export {
  loadWishlistFromApi,
  saveWishlistToApi,
} from "./wishlistApi";
