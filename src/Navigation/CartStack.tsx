import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { CartStackParamList } from "./types";

import CartScreen from "../Screens/Cart/CartScreen";
import CheckoutScreen from "../Screens/Cart/CheckoutScreen";
import OrderConfirmationScreen from "../Screens/Orders/OrderConfirmationScreen";

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartMain"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
