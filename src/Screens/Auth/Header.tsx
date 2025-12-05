import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useSelector } from "react-redux";
import { RootState } from "../Cart/cartStore";
import { getProfileTheme } from "../Profile/profileTheme";
import makeLoginStyles from "./loginStyles";

export default function Header() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeLoginStyles(colors);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logo}>
        <Ionicons name="bag-handle-outline" size={35} color="#ffffff" />
      </View>
      <Text style={styles.appName}>ShopHub</Text>
      <Text style={styles.tagline}>Your ultimate Shopping Hub</Text>
    </View>
  );
}
