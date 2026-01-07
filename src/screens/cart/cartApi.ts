import { getAuthData } from "../../restapi/authHelpers";
import { firebaseRest } from "../../restapi/firebaseRest";

export async function loadCartFromApi(userId: string) {
  try {
    const { idToken } = await getAuthData();
    const data = await firebaseRest(`carts/${userId}`, "GET", undefined, idToken);
    return data ? Object.values(data) : [];
  } catch (err) {
    console.warn("Failed to load cart from API:", err);
    return [];
  }
}

export async function saveCartToApi(userId: string, items: any[]) {
  const { idToken } = await getAuthData();
  await firebaseRest(`carts/${userId}`, "PUT", items, idToken);
}
 
