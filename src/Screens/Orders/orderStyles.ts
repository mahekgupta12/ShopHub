import { StyleSheet } from "react-native";
import type { AppTheme } from "../Profile/profileTheme";

const makeOrderStyles = (colors: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 16,
      color: colors.text,
    },

    orderBox: {
      width: "100%",
      maxWidth: 380,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    label: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
      fontWeight: "500",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 3,
    },
    key: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    value: {
      fontSize: 14,
      color: colors.text,
      fontWeight: "600",
    },
    total: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: "700",
    },
  });

export default makeOrderStyles;
