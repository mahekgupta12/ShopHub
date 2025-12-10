import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { CartItem } from "./cartSlice";

// Load user's cart from Firestore
export const loadCartFromFirestore = async (userId: string): Promise<CartItem[]> => {
  const itemsRef = collection(db, "carts", userId, "items");
  const snapshot = await getDocs(itemsRef);

  const items: CartItem[] = [];
  snapshot.forEach((docSnap) => items.push(docSnap.data() as CartItem));

  return items;
};

// Save all items into Firestore
export const saveCartToFirestore = async (userId: string, items: CartItem[]) => {
  const userCartRef = collection(db, "carts", userId, "items");

  // Delete previous items to avoid duplicates
  const existing = await getDocs(userCartRef);
  existing.forEach(async (d) => await deleteDoc(d.ref));

  // Save each item as its own doc
  for (const item of items) {
    await setDoc(doc(db, "carts", userId, "items", item.id.toString()), item);
  }
};
