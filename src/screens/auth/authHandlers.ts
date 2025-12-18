import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  USER_ID_KEY,
  ID_TOKEN_KEY,
  EMAIL_KEY,
  DISPLAY_NAME_KEY,
} from "../../restapi/authKeys";

import { FIREBASE_API_KEY, FIREBASE_AUTH_ENDPOINTS, HTTP_METHODS } from "../../constants/api";
import { AUTH_MESSAGES, AUTH_TABS } from "../../constants/authMessages";

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
      AUTH_MESSAGES.MISSING_DETAILS,
      activeTab === AUTH_TABS.SIGNUP
        ? AUTH_MESSAGES.SIGNUP_MISSING_DETAILS
        : AUTH_MESSAGES.LOGIN_MISSING_DETAILS
    );
    return;
  }

  try {
    setLoading(true);

    const authEndpoint =
      activeTab === "signup"
        ? `${FIREBASE_AUTH_ENDPOINTS.SIGNUP}?key=${FIREBASE_API_KEY}`
        : `${FIREBASE_AUTH_ENDPOINTS.LOGIN}?key=${FIREBASE_API_KEY}`;

    const authRes = await fetch(authEndpoint, {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const authData = await authRes.json();

    if (!authRes.ok) {
      throw new Error(authData.error?.message || AUTH_MESSAGES.AUTHENTICATION_FAILED);
    }

    const { idToken, localId } = authData;

    if (activeTab === "signup") {
      await fetch(
        `${FIREBASE_AUTH_ENDPOINTS.UPDATE_PROFILE}?key=${FIREBASE_API_KEY}`,
        {
          method: HTTP_METHODS.POST,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken,
            displayName: fullName.trim(),
            returnSecureToken: true,
          }),
        }
      );
    }

    const lookupRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
      {
        method: HTTP_METHODS.POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );

    const lookupData = await lookupRes.json();

    let displayName =
      lookupData?.users?.[0]?.displayName?.trim() ||
      email.split("@")[0];

    await AsyncStorage.multiSet([
      [USER_ID_KEY, localId],
      [ID_TOKEN_KEY, idToken],
      [EMAIL_KEY, email],
      [DISPLAY_NAME_KEY, displayName],
    ]);

    Toast.show({
      type: "success",
      text1:
        activeTab === AUTH_TABS.SIGNUP
          ? "Account Created 🎉"
          : "Welcome Back 👋",
      text2:
        activeTab === AUTH_TABS.SIGNUP
          ? AUTH_MESSAGES.SIGNUP_SUCCESS
          : AUTH_MESSAGES.LOGIN_SUCCESS,
      position: "bottom",
      visibilityTime: 2500,
    });

    navigation.reset({
      index: 0,
      routes: [{ name: AUTH_MESSAGES.NAVIGATE_TO_MAIN_TABS }],
    });
  } catch (error: any) {
    Alert.alert(
      activeTab === AUTH_TABS.SIGNUP ? AUTH_MESSAGES.SIGNUP_FAILED : AUTH_MESSAGES.LOGIN_FAILED,
      error.message || AUTH_MESSAGES.SOMETHING_WENT_WRONG
    );
  } finally {
    setLoading(false);
  }
}
