// import {
//   doc,
//   setDoc,
//   getDocs,
//   collection,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../../firebase/firebaseConfig";
// import type { CartItem } from "./cartSlice";
// import { FIREBASE_COLLECTIONS } from "../../constants/index";

// export const loadCartFromFirestore = async (
//   userId: string
// ): Promise<CartItem[]> => {
//   const itemsRef = collection(db, FIREBASE_COLLECTIONS.CARTS, userId, FIREBASE_COLLECTIONS.ITEMS);
//   const snapshot = await getDocs(itemsRef);

//   const items: CartItem[] = [];
//   snapshot.forEach((docSnap) => {
//     items.push(docSnap.data() as CartItem);
//   });

//   return items;
// };

// export const saveCartToFirestore = async (
//   userId: string,
//   items: CartItem[]
// ) => {
//   const userCartRef = collection(db, FIREBASE_COLLECTIONS.CARTS, userId, FIREBASE_COLLECTIONS.ITEMS);

//   const existing = await getDocs(userCartRef);
//   existing.forEach(async (d) => {
//     await deleteDoc(d.ref);
//   });

//   for (const item of items) {
//     await setDoc(
//       doc(db, FIREBASE_COLLECTIONS.CARTS, userId, FIREBASE_COLLECTIONS.ITEMS, item.id.toString()),
//       item
//     );
//   }
// };


import type { CartItem } from "./cartSlice";
import { firebaseRest } from "../../restAPIs/firebaseRest";
import { getAuthData } from "../../restAPIs/authHelpers";

export const loadCartFromFirestore = async (
  userId: string
): Promise<CartItem[]> => {
  const { idToken } = await getAuthData();

  const data = await firebaseRest(
    `carts/${userId}`,
    "GET",
    undefined,
    idToken
  );

  if (!data) return [];

  return Object.values(data);
};

export const saveCartToFirestore = async (
  userId: string,
  items: CartItem[]
) => {
  const { idToken } = await getAuthData();

  const cartData: Record<string, CartItem> = {};
  items.forEach((item) => {
    cartData[item.id.toString()] = item;
  });

  await firebaseRest(
    `carts/${userId}`,
    "PUT",
    cartData,
    idToken
  );
};
