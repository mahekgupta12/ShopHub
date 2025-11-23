// src/Navigation/filter.tsx
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  onPress?: () => void;
};

export default function FilterIcon({ onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.filterChip}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Ionicons name="options" size={18} color="#4B5563" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filterChip: {
    height: 36,
    width: 36,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
});
