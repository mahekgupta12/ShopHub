import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
import {
  loadCartFromApi,
  saveCartToApi,
} from "./cartApi";
import { loadCart as loadPersistedCart } from "../../persistence/cartPersistence";
import { enqueueRequest } from "../../persistence/offlineQueue";
import { FIREBASE_DB_URL } from "../../constants/api";

import { setCart } from "./cartSlice";
import type { RootState } from "./cartStore";
import { USER_ID_KEY } from "../../restapi/authKeys";
export const useLoadCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const initialLoadDone = useRef(false);
 
  // Load cart on app start / login
  useEffect(() => {
    const load = async () => {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      if (!userId) return;

      try {
        const savedItems = await loadCartFromApi(userId);

        // If there is a locally persisted cart, prefer local entries (user actions while offline)
        // Merge server and local by keeping local quantities when conflicts occur.
        const persisted = await loadPersistedCart();

        let finalItems: any[] = [];

        if ((persisted && persisted.length) || (savedItems && savedItems.length)) {
          const map = new Map<number, any>();

          // Put persisted items first (take precedence)
          if (persisted && persisted.length) {
            persisted.forEach((it: any) => map.set(it.id, it));
          }

          // Add server items only if not present locally
          if (savedItems && savedItems.length) {
            savedItems.forEach((it: any) => {
              if (!map.has(it.id)) map.set(it.id, it);
            });
          }

          finalItems = Array.from(map.values());
        }

        dispatch(setCart(finalItems));
      } catch (error) {
        console.warn("Failed to load cart from API, keeping local state:", error);
        // leave existing cart state (possibly persisted) as-is
      } finally {
        initialLoadDone.current = true;
      }
    };
 
    load();
  }, [dispatch]);
 
  // Sync cart on change
  useEffect(() => {
    const sync = async () => {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      if (!userId || !initialLoadDone.current) return;

      try {
        await saveCartToApi(userId, items);
      } catch (error) {
        console.warn("Failed to save cart to API, enqueueing for retry:", error);
        try {
          await enqueueRequest({
            url: `${FIREBASE_DB_URL}/carts/${userId}.json`,
            method: "PUT",
            body: items,
            needsAuth: true,
          });
        } catch (e) {
          console.warn("Failed to enqueue cart save request:", e);
        }
      }
    };
 
    sync();
  }, [items]);
};
 