import React from "react";
import { View, Text, type TextStyle, type ViewStyle } from "react-native";
import type { AppTheme } from "../screens/profile/profileTheme";
import { makeCommonStyles } from "./commonStyles";

type Props = {
  title: string;
  subtitle: string;
  colors: AppTheme;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
};

export default function EmptyState({
  title,
  subtitle,
  colors,
  containerStyle,
  titleStyle,
  subtitleStyle,
}: Props) {
  const styles = makeCommonStyles(colors);

  return (
    <View style={[styles.emptyStateContainer, containerStyle]}>
      <Text style={[styles.emptyStateTitle, titleStyle]}>{title}</Text>
      <Text style={[styles.emptyStateSubtitle, subtitleStyle]}>{subtitle}</Text>
    </View>
  );
}

