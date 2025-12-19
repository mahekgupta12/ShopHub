import { StyleSheet } from "react-native";
import type { AppTheme } from "../screens/profile/profileTheme";


export const makeCommonStyles = (colors: AppTheme) =>
  StyleSheet.create({
    // Layout
    screenSafe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    screenContainer: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
    },

    // Cards & surfaces
    cardBase: {
      backgroundColor: colors.card,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    },
    cardElevated: {
      shadowOpacity: 0.08,
      shadowRadius: 12,
    },
    cardOutlined: {
      borderWidth: 1,
      borderColor: colors.border,
    },

    // Typography
    titleLg: {
      fontSize: 26,
      fontWeight: "800",
      color: colors.text,
    },
    screenTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
    },
    titleMd: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },

    // Buttons
    primaryButton: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
    },
    primaryButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },
    dangerButton: {
      backgroundColor: colors.danger,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
    },
    dangerButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },

    // Inputs
    textInput: {
      backgroundColor: colors.background,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      color: colors.text,
    },

    // Empty-state helpers
    emptyStateContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    emptyStateTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
      textAlign: "center",
    },
    emptyStateSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 22,
    },


    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 8,
      color: colors.text,
    },
    emptySubtitle: {
      fontSize: 14,
      fontWeight: "400",
      textAlign: "center",
      opacity: 0.7,
      color: colors.textSecondary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    sharedCardBase: {
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      backgroundColor: colors.card,
    },
    rowBase: {
      flexDirection: "row",
      alignItems: "center",
    },
    divider: {
      height: 1,
      width: "100%",
      marginVertical: 12,
      backgroundColor: colors.border,
    },
  });
