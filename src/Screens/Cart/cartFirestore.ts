import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { CartItem } from "./cartSlice";

export const saveCartToFirestore = async (userId: string, items: CartItem[]) => {
  if (!userId) return; 
  try {
    await setDoc(
      doc(db, "carts", userId), 
      { items }, 
      { merge: true } // merge with existing fields, don't overwrite entire document
    );
  } catch (e) {
    console.log("Error saving cart:", e);
  }
};

// Load cart items for a specific user
export const loadCartFromFirestore = async (userId: string) => {
  if (!userId) return []; 
  try {
    const snap = await getDoc(doc(db, "carts", userId));
    if (snap.exists()) {
      const data = snap.data();
      return data?.items || [];
    } else {
      return [];
    }
  } catch (e) {
    console.log("Error loading cart:", e);
    return [];
  }
};

