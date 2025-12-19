import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { CartStackParamList } from "./types";

import CartScreen from "../screens/cart/cartScreen";
import CheckoutScreen from "../screens/payment/checkoutScreen";
import PaymentScreen from "../screens/payment/paymentScreen";
import OrderConfirmationScreen from "../screens/payment/orderConfirmationScreen";
import { ROUTES } from "../constants/index";

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
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
          gestureEnabled: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </Stack.Navigator>
  );
}
