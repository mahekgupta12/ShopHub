import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import { loadCartFromFirestore, saveCartToFirestore } from "./cartFirestore";
import { setCart } from "./cartSlice";
import { RootState } from "./cartStore";

export const useLoadCart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const hasLoadedInitial = useRef(false);

  //Load cart on login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(setCart([]));
        return;
      }

      const saved = await loadCartFromFirestore(user.uid);
      dispatch(setCart(saved));
      hasLoadedInitial.current = true;
    });

    return unsubscribe;
  }, [dispatch]);

  //Sync cart to Firestore whenever items change
  useEffect(() => {
    const userId = auth.currentUser?.uid;

    if (!userId) return;

    // Avoid syncing on FIRST load (prevents overwriting backend with empty array)
    if (!hasLoadedInitial.current) return;

    saveCartToFirestore(userId, items);
  }, [items]);
};
