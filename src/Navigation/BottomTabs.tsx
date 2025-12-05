import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import type { BottomTabParamList } from "./types";

import HomeScreens from "../Screens/Home/HomeScreens";
import CartStack from "./CartStack";
import OrdersScreens from "../Screens/Orders/OrdersScreens";
import ProfileScreens from "../Screens/Profile/ProfileScreens";

import { useAppSelector } from "../Screens/Cart/cartStore";
import { getProfileTheme } from "../Screens/Profile/profileTheme";

const Tab = createBottomTabNavigator<BottomTabParamList>();

type IconArgs = { focused: boolean; color: string; size: number };

function getIconName(routeName: keyof BottomTabParamList, focused: boolean) {
  switch (routeName) {
    case "Home":
      return focused ? "home" : "home-outline";
    case "Cart":
      return focused ? "cart" : "cart-outline";
    case "Orders":
      return focused ? "cube" : "cube-outline";
    case "Profile":
      return focused ? "person" : "person-outline";
    default:
      return "ellipse-outline";
  }
}

function createTabBarIcon(routeName: keyof BottomTabParamList) {
  return ({ focused, color, size }: IconArgs) => {
    const s = Math.max(size, 22);
    const name = getIconName(routeName, focused);
    return <Ionicons name={name} size={s} color={color} />;
  };
}

export default function BottomTabs() {
  const insets = useSafeAreaInsets();

  const mode = useAppSelector((state) => state.theme.mode);
  const colors = getProfileTheme(mode);

  const baseTabBarStyle = {
    backgroundColor: colors.tabBar,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    paddingTop: 6,
    paddingBottom: Math.max(8, insets.bottom),
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: createTabBarIcon(route.name as keyof BottomTabParamList),
        tabBarStyle: baseTabBarStyle,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreens} />

      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={({ route }) => {
          const nestedRouteName =
            getFocusedRouteNameFromRoute(route) ?? "CartMain";
          const isOrderConfirmation = nestedRouteName === "OrderConfirmation";

          return {
            headerShown: false,
            tabBarStyle: isOrderConfirmation
              ? { ...baseTabBarStyle, display: "none" }
              : baseTabBarStyle,
          };
        }}
      />

      <Tab.Screen name="Orders" component={OrdersScreens} />
      <Tab.Screen name="Profile" component={ProfileScreens} />
    </Tab.Navigator>
  );
}
