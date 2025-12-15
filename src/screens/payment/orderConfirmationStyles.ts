import { StyleSheet } from "react-native";
import type { AppTheme } from "../profile/profileTheme";

const makeOrderConfirmationStyles = (colors: AppTheme) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    outer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 32,
      justifyContent: "center",
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 24,
      paddingHorizontal: 24,
      paddingVertical: 28,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      alignItems: "center",
    },
    iconCircleOuter: {
      padding: 4,
      borderRadius: 999,
      backgroundColor: "#DCFCE7",
      marginBottom: 16,
    },
    iconCircleInner: {
      height: 80,
      width: 80,
      borderRadius: 40,
      backgroundColor: "#ECFDF3",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: colors.text,
      marginTop: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
      marginBottom: 20,
    },
    infoBox: {
      width: "100%",
      backgroundColor: colors.background,
      borderRadius: 18,
      paddingHorizontal: 18,
      paddingVertical: 14,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 4,
    },
    infoLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: "500",
    },
    infoValue: {
      fontSize: 14,
      color: colors.text,
      fontWeight: "600",
    },
    infoTotal: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: "700",
    },
    primaryBtn: {
      width: "100%",
      backgroundColor: colors.primary,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: "center",
      marginBottom: 10,
    },
    primaryText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
    secondaryBtn: {
      width: "100%",
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: "center",
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondaryText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
  });

export default makeOrderConfirmationStyles;

