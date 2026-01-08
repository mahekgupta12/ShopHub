import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  loadWishlistFromApi,
  saveWishlistToApi,
} from "./wishlistApi";
import { enqueueRequest } from "../../persistence/offlineQueue";
import { FIREBASE_DB_URL } from "../../constants/api";

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
        console.warn("Failed to load wishlist from Firebase, keeping local cache:", error);
        // Fail gracefully - keep existing (possibly persisted) wishlist in Redux
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
        // If saving fails (likely offline), enqueue the request so it will be retried later
        try {
          await enqueueRequest({
            url: `${FIREBASE_DB_URL}/wishlists/${userId}.json`,
            method: "PUT",
            body: items,
            needsAuth: true,
          });
        } catch (e) {
          console.warn("Failed to enqueue wishlist save request:", e);
        }
        // Don't throw - let app continue even if sync fails
      }
    };

    sync();
  }, [items]);
};
