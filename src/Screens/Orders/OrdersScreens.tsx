import React from "react";
import { View, Text } from "react-native";
import styles from "./orderStyles";

export default function OrdersScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Orders</Text>
    </View>
  );
}
