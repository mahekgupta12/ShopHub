import type { CartItem } from "./cartSlice";
import { firebaseRest } from "../../restapi/firebaseRest";
import { getAuthData } from "../../restapi/authHelpers";

export async function loadCartFromFirestore(
  userId: string
): Promise<CartItem[]> {
  const { idToken } = await getAuthData();

  const data = await firebaseRest(
    `carts/${userId}`,
    "GET",
    undefined,
    idToken
  );

  if (!data) return [];
  return Object.values(data);
}

export async function saveCartToFirestore(
  userId: string,
  items: CartItem[]
) {
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
}
