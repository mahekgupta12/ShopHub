import React from "react";
import { View, Text } from "react-native";

import { useSelector } from "react-redux";
import { RootState } from "../Cart/cartStore";
import { getProfileTheme } from "../Profile/profileTheme";
import makeOrderStyles from "./orderStyles";

export default function OrdersScreen() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeOrderStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Orders</Text>
    </View>
  );
}
