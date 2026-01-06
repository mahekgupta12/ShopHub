import { useEffect } from "react";
import { useAppDispatch } from "../screens/cart/cartStore";
import { setWishlist, clearWishlist } from "../screens/wishlist/wishlistSlice";
import { loadWishlist } from "./wishlistPersistence";

/**
 * Hook to initialize wishlist when user logs in or app starts
 * Loads wishlist from Firebase if user is logged in
 * Falls back to local storage if offline
 */
export function useInitializeWishlist() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeWishlist = async () => {
      try {
        const wishlist = await loadWishlist();
        if (wishlist && wishlist.length > 0) {
          dispatch(setWishlist(wishlist));
        } else {
          // Empty wishlist or no data found
          dispatch(setWishlist([]));
        }
      } catch (error) {
        console.error("Error initializing wishlist:", error);
        dispatch(clearWishlist());
      }
    };

    initializeWishlist();
  }, [dispatch]);
}

/**
 * Hook to reset wishlist on logout
 * Call this when user logs out
 */
export function useResetWishlistOnLogout() {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(clearWishlist());
  };
}
