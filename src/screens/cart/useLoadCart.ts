import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
import {
  loadCartFromApi,
  saveCartToApi,
} from "./cartApi";
import { loadCart as loadPersistedCart, saveCart as savePersistedCart } from "../../persistence/cartPersistence";
import { subscribeNetworkStatus } from "../../utils/networkStatus";

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

        const persisted = await loadPersistedCart();

        let finalItems: any[] = [];

        if ((persisted && persisted.length) || (savedItems && savedItems.length)) {
          const map = new Map<number, any>();

          if (persisted && persisted.length) {
            persisted.forEach((it: any) => map.set(it.id, it));
          }

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
    const unsubNet = subscribeNetworkStatus((isOnline) => {
      if (isOnline) {
        load().catch(() => {});
      }
    });

    return () => {
      initialLoadDone.current = true;
      try { unsubNet(); } catch {}
    };
  }, [dispatch]);
 
  // Sync cart on change
  useEffect(() => {
    const sync = async () => {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      if (!userId || !initialLoadDone.current) return;

      try {
        await saveCartToApi(userId, items);
      } catch (error) {
        console.warn("Failed to save cart to API, persisting locally for offline:", error);
        try {
          await savePersistedCart(items);
        } catch (e) {
          console.warn("Failed to persist cart locally:", e);
        }
      }
    };
 
    sync();
  }, [items]);
};
 