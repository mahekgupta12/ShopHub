import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabParamList } from "./types";

import HomeScreen from "../Screens/Home/HomeScreens";
import CartScreen from "../Screens/Cart/CartScreen";
import OrdersScreen from "../Screens/Orders/OrdersScreens";
import ProfileScreen from "../Screens/Profile/ProfileScreens"; // <-- lowercase p matches your file

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerTitleAlign: "center" }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
