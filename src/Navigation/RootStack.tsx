import React from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";

import LoginScreen from "../Screens/Auth/LoginScreen";
import BottomTabs from "./BottomTabs";
import { ROUTES, SCREEN_TITLES } from "../constants";

import { useSelector } from "react-redux";
import { RootState } from "../Screens/Cart/cartStore";
import { getProfileTheme } from "../Screens/Profile/profileTheme";
import { useInitialRoute } from "../persistence/authPersistence";

import { useNavigationLoader } from "../constants/navigationLoader";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { show, hide } = useNavigationLoader();

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
      screenListeners={{
        transitionStart: () => show(),
        transitionEnd: () => hide(),
      }}
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
        options={{ title: SCREEN_TITLES.LOGIN }}
      />
      <Stack.Screen
        name={ROUTES.MAIN_TABS}
        component={BottomTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
