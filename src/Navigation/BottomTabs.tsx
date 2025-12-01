import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabParamList } from "./types";

import HomeScreens from "../Screens/Home/HomeScreens";
import CartScreen from "../Screens/Cart/CartScreen";
import OrdersScreens from "../Screens/Orders/OrdersScreens";
import ProfileScreens from "../Screens/Profile/ProfileScreens"; 

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,               
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: { fontSize: 12 },

        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#E5E7EB",
          paddingTop: 6,
          paddingBottom: Math.max(8, insets.bottom), 
         
        },

        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused, color, size }) => {
          const s = Math.max(size, 22);
          let name: string;
          switch (route.name) {
            case "Home":    name = focused ? "home" : "home-outline"; break;
            case "Cart":    name = focused ? "cart" : "cart-outline"; break;
            case "Orders":  name = focused ? "cube" : "cube-outline"; break;
            case "Profile": name = focused ? "person" : "person-outline"; break;
            default:        name = "ellipse-outline";
          }
          return <Ionicons name={name} size={s} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreens} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreens} />
      <Tab.Screen name="Profile" component={ProfileScreens} />
    </Tab.Navigator>
  );
}
