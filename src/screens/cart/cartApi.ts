import { getAuthData } from "../../restapi/authHelpers";
import { FIREBASE_DB_URL } from "../../constants/api";
 
export async function loadCartFromApi(userId: string) {
  const { idToken } = await getAuthData();
 
  const res = await fetch(
    `${FIREBASE_DB_URL}/carts/${userId}.json?auth=${idToken}`
  );
 
  if (!res.ok) {
    throw new Error("Failed to load cart");
  }
 
  const data = await res.json();
  return data ? Object.values(data) : [];
}
 

export async function saveCartToApi(
  userId: string,
  items: any[]
) {
  const { idToken } = await getAuthData();
 
  await fetch(
    `${FIREBASE_DB_URL}/carts/${userId}.json?auth=${idToken}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    }
  );
}
 
