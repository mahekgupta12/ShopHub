import { useAppDispatch, useAppSelector, RootState } from "../cart/cartStore";
import { addToWishlist, removeFromWishlist, increaseWishlistQty, decreaseWishlistQty } from "./wishlistSlice";
import { addItem } from "../cart/cartSlice";
import type { Product } from "../home/api";

export function useWishlist() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items
  );

  const isInWishlist = (productId: number): boolean => {
    return wishlistItems.some((item) => item && item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const addToCart = (product: Product) => {
    dispatch(addItem(product));
  };

  const removeFromWishlistList = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };

  const increaseQty = (productId: number) => {
    dispatch(increaseWishlistQty(productId));
  };

  const decreaseQty = (productId: number) => {
    dispatch(decreaseWishlistQty(productId));
  };

  return {
    wishlistItems,
    isInWishlist,
    toggleWishlist,
    addToCart,
    removeFromWishlistList,
    increaseQty,
    decreaseQty,
  };
}
