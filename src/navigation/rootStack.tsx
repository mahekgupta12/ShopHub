import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./Types";

import LoginScreen from "../screens/auth/loginScreen";
import BottomTabs from "./bottomTabs";
import WishlistStack from "./wishlistStack";
import { ROUTES, SCREEN_TITLES } from "../constants/index";

import { useSelector } from "react-redux";
import { RootState } from "../screens/cart/cartStore";
import { getProfileTheme } from "../screens/profile/profileTheme";
import { useInitialRoute } from "../persistence/authPersistence";

import { useNavigationLoader } from "../constants/navigationLoader";

const Stack = createNativeStackNavigator<RootStackParamList>();

const makeStyles = (colors: any) => StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function RootStack() {
  const { show, hide } = useNavigationLoader();

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeStyles(colors);

  const initialRoute = useInitialRoute();

  if (!initialRoute) {
    return (
      <View style={styles.loaderContainer}>
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
      <Stack.Group screenOptions={{ presentation: "card" }}>
        <Stack.Screen
          name={ROUTES.WISHLIST}
          component={WishlistStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
