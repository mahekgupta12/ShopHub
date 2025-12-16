import { getAuthData } from "./authHelpers";
import { firebaseRest } from "./firebaseRest";

export const placeOrder = async (orderData: any) => {
  const { userId, idToken } = await getAuthData();

  // Save order
  await firebaseRest(
    `orders/${userId}`,
    "POST",
    {
      ...orderData,
      timestamp: Date.now(),
    },
    idToken
  );

  // Clear cart
  await firebaseRest(
    `carts/${userId}`,
    "DELETE",
    undefined,
    idToken
  );
};
