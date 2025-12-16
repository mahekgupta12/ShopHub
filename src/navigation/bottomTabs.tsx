/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabParamList } from "./types";

import HomeScreens from "../screens/home/homeScreens";
import CartStack from "./cartStack";
import OrdersScreens from "../screens/orders/ordersScreens";
import ProfileScreens from "../screens/profile/profileScreens";

import { useAppSelector } from "../screens/cart/cartStore";
import { getProfileTheme } from "../screens/profile/profileTheme";
import { useLastTab } from "../persistence/tabPersistence";
import { ROUTES, DEFAULTS } from "../constants/index";

import { useNavigationLoader } from "../constants/navigationLoader";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  const { show, hide } = useNavigationLoader();

  const insets = useSafeAreaInsets();
  const mode = useAppSelector((state) => state.theme.mode);
  const colors = getProfileTheme(mode);

  // const cartCount = useAppSelector((state) =>
  //   state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  // );
  const cartCount = useAppSelector((state) =>
  state.cart.items.reduce((sum, item) => {
    if (!item) return sum;
    return sum + (item.quantity ?? 0);
  }, 0)
);

  const { initialTab, ready, handleTabChange } = useLastTab(DEFAULTS.TAB);

  const baseTabBarStyle = {
    backgroundColor: colors.tabBar,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    paddingTop: 6,
    paddingBottom: Math.max(8, insets.bottom),
  };

  if (!ready) return null;

  return (
    <Tab.Navigator
      initialRouteName={initialTab}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: baseTabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName =
            route.name === ROUTES.CART
              ? focused
                ? "cart"
                : "cart-outline"
              : route.name === ROUTES.HOME
              ? focused
                ? "home"
                : "home-outline"
              : route.name === ROUTES.ORDERS
              ? focused
                ? "cube"
                : "cube-outline"
              : focused
              ? "person"
              : "person-outline";

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === ROUTES.CART && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          );
        },
      })}
      screenListeners={({ route }) => ({
        tabPress: () => {
  
          show();
          setTimeout(() => hide(), 250);

          handleTabChange(route.name as keyof BottomTabParamList);
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreens} />
      <Tab.Screen name={ROUTES.CART} component={CartStack} />
      <Tab.Screen name={ROUTES.ORDERS} component={OrdersScreens} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreens} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -4,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 16,
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});
