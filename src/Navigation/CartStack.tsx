import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { CartStackParamList } from "./types";

import CartScreen from "../Screens/Cart/CartScreen";
import CheckoutScreen from "../Screens/Cart/CheckoutScreen";
import PaymentScreen from "../Screens/Cart/PaymentScreen";
import OrderConfirmationScreen from "../Screens/Orders/OrderConfirmationScreen";
import { ROUTES } from "../constants";

import { useNavigationLoader } from "../constants/navigationLoader";

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartStack() {
  const { show, hide } = useNavigationLoader();

  return (
    <Stack.Navigator
      screenListeners={{
        transitionStart: () => show(),
        transitionEnd: () => hide(),
      }}
    >
      <Stack.Screen
        name={ROUTES.CART_MAIN}
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CHECKOUT}
        component={CheckoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.PAYMENT}
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ORDER_CONFIRMATION}
        component={OrderConfirmationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
