import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_ID_KEY, ID_TOKEN_KEY } from "./authKeys";

export async function getAuthData() {
  const userId = await AsyncStorage.getItem(USER_ID_KEY);
  const idToken = await AsyncStorage.getItem(ID_TOKEN_KEY);

  if (!userId || !idToken) {
    throw new Error("User not authenticated");
  }

  return { userId, idToken };
}
