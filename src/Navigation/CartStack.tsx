import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { CartStackParamList } from "./Types";

import CartScreen from "../screens/cart/CartScreen";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import PaymentScreen from "../screens/cart/PaymentScreen";
import OrderConfirmationScreen from "../screens/orders/OrderConfirmationScreen";
import { ROUTES } from "../constants/Index";

import { useNavigationLoader } from "../constants/NavigationLoader";

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
