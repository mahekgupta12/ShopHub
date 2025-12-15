import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import type { ProfileStyles } from "./ProfileStyles";
import type { AppTheme } from "./ProfileTheme";

type Props = {
  isDark: boolean;
  colors: AppTheme;
  styles: ProfileStyles;
  onToggle: () => void;
};

export default function ThemeToggleRow({
  isDark,
  colors,
  styles,
  onToggle,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.actionCard}
      activeOpacity={0.85}
      onPress={onToggle}
    >
      <View style={styles.actionLeft}>
        <Ionicons
          name={isDark ? "sunny-outline" : "moon-outline"}
          size={22}
          color={colors.primary}
        />
        <Text style={styles.actionLabel}>
          {isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
        </Text>
      </View>

      <Text style={styles.modeTag}>{isDark ? "Dark" : "Light"}</Text>
    </TouchableOpacity>
  );
}
