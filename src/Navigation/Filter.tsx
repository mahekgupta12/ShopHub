import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../Screens/Cart/cartStore";
import { AppTheme, getProfileTheme } from "../Screens/Profile/profileTheme";

type Props = {
  onPress?: () => void;
};

export default function FilterIcon({ onPress }: Props) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const iconColor = mode === "dark" ? "#aaa5a5ff" : colors.muted;
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      style={styles.filterChip}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Ionicons name="options" size={30} color={iconColor} />
    </TouchableOpacity>
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

