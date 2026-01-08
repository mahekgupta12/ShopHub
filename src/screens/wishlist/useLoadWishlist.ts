import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  loadWishlistFromApi,
  saveWishlistToApi,
} from "./wishlistApi";
import { saveWishlist } from "../../persistence/wishlistPersistence";
import { subscribeNetworkStatus } from "../../utils/networkStatus";

import { setWishlist } from "./wishlistSlice";
import type { RootState } from "../cart/cartStore";
import { USER_ID_KEY } from "../../restapi/authKeys";

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
    const unsubNet = subscribeNetworkStatus((isOnline) => {
      if (isOnline) {
        load().catch(() => {});
      }
    });

    return () => {
      try { unsubNet(); } catch {}
    };
  }, [dispatch]);

  // Sync wishlist changes to Firebase
  useEffect(() => {
    const sync = async () => {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      if (!userId || !initialLoadDone.current) return;

      try {
        await saveWishlistToApi(userId, items);
      } catch (error) {
          console.warn("Failed to save wishlist to Firebase, persisting locally:", error);
          try {
            await saveWishlist(items);
          } catch (e) {
            console.warn("Failed to persist wishlist locally:", e);
          }
      }
    };

    sync();
  }, [items]);
};
