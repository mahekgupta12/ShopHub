import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { WishlistStackParamList } from "./types";

import WishlistScreen from "../screens/wishlist/wishlistScreen";
import { ROUTES } from "../constants/index";

import { useNavigationLoader } from "../constants/navigationLoader";

const Stack = createNativeStackNavigator<WishlistStackParamList>();

export default function WishlistStack() {
  const { show, hide } = useNavigationLoader();

  return (
    <Stack.Navigator
      screenListeners={{
        transitionStart: () => show(),
        transitionEnd: () => hide(),
      }}
    >
      <Stack.Screen
        name={ROUTES.WISHLIST_MAIN}
        component={WishlistScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
