import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppPressable from "../../componets/appPressables";
import type { ProfileStyles } from "./profileStyles";
import type { AppTheme } from "./profileTheme";
import { THEME_LABELS } from "../../constants/index";

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
    <AppPressable
      style={styles.actionCard}
      onPress={onToggle}
    >
      <View style={styles.actionLeft}>
        <Ionicons
          name={isDark ? "sunny-outline" : "moon-outline"}
          size={22}
          color={colors.primary}
        />
        <Text style={styles.actionLabel}>
          {isDark
            ? THEME_LABELS.SWITCH_TO_LIGHT
            : THEME_LABELS.SWITCH_TO_DARK}
        </Text>
      </View>

      <Text style={styles.modeTag}>
        {isDark ? THEME_LABELS.MODE_DARK : THEME_LABELS.MODE_LIGHT}
      </Text>
    </AppPressable>
  );
}
