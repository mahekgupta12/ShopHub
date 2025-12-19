import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useSelector } from "react-redux";
import { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";
import makeLoginStyles from "./loginStyles";
import { APP_BRAND } from "../../constants/app";
import { COLORS } from "../../constants/colors";
import { ICON_NAMES, ICON_SIZES } from "../../constants/ui";

export default function Header() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeLoginStyles(colors);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logo}>
        <Ionicons name={ICON_NAMES.BAG_HANDLE} size={ICON_SIZES.TITLE} color={COLORS.WHITE} />
      </View>
      <Text style={styles.appName}>{APP_BRAND.NAME}</Text>
      <Text style={styles.tagline}>{APP_BRAND.TAGLINE}</Text>
    </View>
  );
}
