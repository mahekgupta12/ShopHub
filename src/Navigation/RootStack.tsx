import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";

import LoginScreen from "../Screens/Auth/LoginScreen";
import BottomTabs from "./BottomTabs";

import { useSelector } from "react-redux";
import { RootState } from "../Screens/Cart/cartStore";
import { getProfileTheme } from "../Screens/Profile/profileTheme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
