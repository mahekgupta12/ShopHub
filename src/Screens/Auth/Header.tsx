import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./loginStyles";

export default function Header() {
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
