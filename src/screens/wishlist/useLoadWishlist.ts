import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  loadWishlistFromApi,
  saveWishlistToApi,
} from "./wishlistApi";

import { setWishlist } from "./wishlistSlice";
import type { RootState } from "../cart/cartStore";
import { USER_ID_KEY } from "../../restapi/authKeys";

/**
 * Hook to load wishlist from Firebase on app start/login
 * and sync changes automatically
 * Same pattern as useLoadCart
 */
export const useLoadWishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.wishlist.items);
  const initialLoadDone = useRef(false);

  // Load wishlist on app start / login
  useEffect(() => {
    const load = async () => {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      if (!userId) return;

      try {
        const savedItems = await loadWishlistFromApi(userId);
        dispatch(setWishlist(savedItems));
        initialLoadDone.current = true;
      } catch (error) {
        console.warn("Failed to load wishlist from Firebase:", error);
        // Fail gracefully - use empty wishlist
        dispatch(setWishlist([]));
        initialLoadDone.current = true;
      }
    };

    load();
  }, [dispatch]);

  // Sync wishlist changes to Firebase
  useEffect(() => {
    const sync = async () => {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      if (!userId || !initialLoadDone.current) return;

      try {
        await saveWishlistToApi(userId, items);
      } catch (error) {
        console.warn("Failed to save wishlist to Firebase:", error);
        // Don't throw - let app continue even if sync fails
      }
    };

    sync();
  }, [items]);
};
