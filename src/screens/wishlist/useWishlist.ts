import { useAppDispatch, useAppSelector, RootState } from "../cart/cartStore";
import { addToWishlist, removeFromWishlist, increaseWishlistQty, decreaseWishlistQty } from "./wishlistSlice";
import { addItem } from "../cart/cartSlice";
import { safeFetch } from "../../utils/safeFetch";
import { API_BASE_URL } from "../../config/api";
import { Alert } from "react-native";
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

  const addToCart = async (product: Product) => {
    try {
      const healthUrl = `${API_BASE_URL}/products/1`;
      const result = await safeFetch(healthUrl, { method: "GET" });
      if (result.networkError || !result.response || !result.response.ok) {
        Alert.alert("Network unavailable", "Cannot move item to cart while offline. Please try again when network is connected.");
        return;
      }
    } catch {
      Alert.alert("Network unavailable", "Cannot move item to cart while offline. Please try again when network is connected.");
      return;
    }

    dispatch(addItem(product));
  };

  const removeFromWishlistList = async (productId: number) => {
    try {
      const healthUrl = `${API_BASE_URL}/products/1`;
      const result = await safeFetch(healthUrl, { method: "GET" });
      if (result.networkError || !result.response || !result.response.ok) {
        Alert.alert("Network unavailable", "Cannot remove item from wishlist while offline. Please try again when network is connected.");
        return;
      }
    } catch {
      Alert.alert("Network unavailable", "Cannot remove item from wishlist while offline. Please try again when network is connected.");
      return;
    }

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
