import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";
import {
  loadCartFromFirestore,
  saveCartToFirestore,
} from "./cartFirestore";
import { setCart } from "./cartSlice";
import type { RootState } from "./cartStore";

export const useLoadCart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {

        dispatch(setCart([]));
        initialLoadDone.current = false;
        return;
      }

      const savedItems = await loadCartFromFirestore(user.uid);
      dispatch(setCart(savedItems));
      initialLoadDone.current = true;
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;

    if (!userId) return;
    if (!initialLoadDone.current) return;

    saveCartToFirestore(userId, items);
  }, [items]);
};
