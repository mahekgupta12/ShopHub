import React from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";

import LoginScreen from "../Screens/Auth/LoginScreen";
import BottomTabs from "./BottomTabs";

import { useSelector } from "react-redux";
import { RootState } from "../Screens/Cart/cartStore";
import { getProfileTheme } from "../Screens/Profile/profileTheme";

import { useInitialRoute } from "../persistence/authPersistence";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);

  const initialRoute = useInitialRoute();

  if (!initialRoute) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
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
