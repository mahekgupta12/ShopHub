import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../screens/cart/cartStore";
import { AppTheme, getProfileTheme } from "../screens/profile/profileTheme";

type Props = {
  onPress?: () => void;
};

export default function FilterIcon({ onPress }: Props) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const iconColor = mode === "dark" ? "#aaa5a5ff" : colors.muted;
  const styles = makeStyles(colors);

  return (
    <Pressable style={styles.filterChip} onPress={onPress}>
      <Ionicons name="options" size={30} color={iconColor} />
    </Pressable>
  );
}

const makeStyles = (colors: AppTheme) =>
  StyleSheet.create({
  filterChip: {
    height: 40,
    width: 40,
    borderRadius: 22,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
});

