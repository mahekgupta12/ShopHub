import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  USER_ID_KEY,
  ID_TOKEN_KEY,
  EMAIL_KEY,
  DISPLAY_NAME_KEY,
} from "../../restAPIs/authKeys";

const API_KEY = "AIzaSyBT0BETZxtheIggDmUVfQEe83graJHt1IU";

type Params = {
  fullName: string;
  email: string;
  password: string;
  activeTab: "login" | "signup";
  navigation: any;
  setLoading: (v: boolean) => void;
};

export async function handleSubmit({
  fullName,
  email,
  password,
  activeTab,
  navigation,
  setLoading,
}: Params) {
  if (
    !email ||
    !password ||
    (activeTab === "signup" && !fullName?.trim())
  ) {
    Alert.alert(
      "Missing Details",
      activeTab === "signup"
        ? "Full name, email and password are required."
        : "Email and Password are required."
    );
    return;
  }

  try {
    setLoading(true);

    /* 🔐 AUTH */
    const authEndpoint =
      activeTab === "signup"
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    const authRes = await fetch(authEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const authData = await authRes.json();

    if (!authRes.ok) {
      throw new Error(authData.error?.message || "Authentication failed");
    }

    const { idToken, localId } = authData;

    /* ✅ SAVE DISPLAY NAME TO FIREBASE (CRITICAL FIX) */
    if (activeTab === "signup") {
      await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken,
            displayName: fullName.trim(),
            returnSecureToken: true,
          }),
        }
      );
    }

    /* 🔍 FETCH PROFILE (ALWAYS AFTER LOGIN) */
    const lookupRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );

    const lookupData = await lookupRes.json();

    let displayName =
      lookupData?.users?.[0]?.displayName?.trim() ||
      email.split("@")[0];

    /* 💾 PERSIST */
    await AsyncStorage.multiSet([
      [USER_ID_KEY, localId],
      [ID_TOKEN_KEY, idToken],
      [EMAIL_KEY, email],
      [DISPLAY_NAME_KEY, displayName],
    ]);

    Toast.show({
      type: "success",
      text1:
        activeTab === "signup"
          ? "Account Created 🎉"
          : "Welcome Back 👋",
      text2:
        activeTab === "signup"
          ? "Your account has been created successfully"
          : "Logged in successfully",
      position: "bottom",
      visibilityTime: 2500,
    });

    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  } catch (error: any) {
    Alert.alert(
      activeTab === "signup" ? "Signup Failed" : "Login Failed",
      error.message || "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
}
