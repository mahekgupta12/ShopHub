/**
 * Wishlist Screen Labels & Messages
 */

export const WISHLIST_MESSAGES = {
  ADD_TO_CART: "Add to Cart",
  REMOVE_FROM_WISHLIST: "Remove",
  MOVE_TO_CART_TOOLTIP: "Move to cart",
  REMOVE_TOOLTIP: "Remove from wishlist",
  EMPTY_HEART: "Your wishlist is empty",
  START_SHOPPING: "Start adding products to your wishlist!",
  ADDED_TO_WISHLIST: "Added to wishlist ❤️",
  REMOVED_FROM_WISHLIST: "Removed from wishlist 💔",
  MOVED_TO_CART: "Moved to cart 🛒",
  WISHLIST_COUNT: (count: number) => `${count} item${count !== 1 ? "s" : ""}`,
} as const;
