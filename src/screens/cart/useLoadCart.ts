import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
import {
  loadCartFromApi,
  saveCartToApi,
} from "./cartApi";
 
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
 
      const savedItems = await loadCartFromApi(userId);
      dispatch(setCart(savedItems as any));
      initialLoadDone.current = true;
    };
 
    load();
  }, [dispatch]);
 
  // Sync cart on change
  useEffect(() => {
    const sync = async () => {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      if (!userId || !initialLoadDone.current) return;
 
      await saveCartToApi(userId, items);
    };
 
    sync();
  }, [items]);
};
 