import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setJson(key: string, value: unknown) {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch (e) {
    console.warn("Failed to save", key, e);
  }
}

export async function getJson<T>(key: string): Promise<T | null> {
  try {
    const json = await AsyncStorage.getItem(key);
    if (!json) return null;
    return JSON.parse(json) as T;
  } catch (e) {
    console.warn("Failed to load", key, e);
    return null;
  }
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn("Failed to remove", key, e);
  }
}
