/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabParamList } from "./types";

import HomeScreens from "../Screens/Home/HomeScreens";
import CartStack from "./CartStack";
import OrdersScreens from "../Screens/Orders/OrdersScreens";
import ProfileScreens from "../Screens/Profile/ProfileScreens";

import { useAppSelector } from "../Screens/Cart/cartStore";
import { getProfileTheme } from "../Screens/Profile/profileTheme";
import { useLastTab } from "../persistence/tabPersistence";

import { useNavigationLoader } from "../constants/navigationLoader";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  const { show, hide } = useNavigationLoader();

  const insets = useSafeAreaInsets();
  const mode = useAppSelector((state) => state.theme.mode);
  const colors = getProfileTheme(mode);

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const { initialTab, ready, handleTabChange } = useLastTab("Home");

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
            route.name === "Cart"
              ? focused
                ? "cart"
                : "cart-outline"
              : route.name === "Home"
              ? focused
                ? "home"
                : "home-outline"
              : route.name === "Orders"
              ? focused
                ? "cube"
                : "cube-outline"
              : focused
              ? "person"
              : "person-outline";

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === "Cart" && cartCount > 0 && (
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
          // ✅ show loader briefly for tab switch
          show();
          setTimeout(() => hide(), 250);

          handleTabChange(route.name as keyof BottomTabParamList);
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreens} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Orders" component={OrdersScreens} />
      <Tab.Screen name="Profile" component={ProfileScreens} />
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
