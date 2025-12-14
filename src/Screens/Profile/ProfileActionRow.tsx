import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import type { ProfileStyles } from "./profileStyles";
import type { AppTheme } from "./profileTheme";

type Props = {
  icon: string;
  label: string;
  colors: AppTheme;
  styles: ProfileStyles;
  onPress: () => void;
};

export default function ProfileActionRow({
  icon,
  label,
  colors,
  styles,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.actionCard}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.actionLeft}>
        <Ionicons name={icon as any} size={22} color={colors.primary} />
        <Text style={styles.actionLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}
