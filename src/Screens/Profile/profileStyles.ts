import { StyleSheet } from "react-native";
import type { AppTheme } from "./profileTheme";

export const makeProfileStyles = (colors: AppTheme) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 24,
    },

    topSection: {
      flex: 1,
    },

    bottomSection: {
      paddingBottom: 24,
    },

    screenTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 20,
    },

    profileCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 18,
      borderRadius: 18,
      backgroundColor: colors.card,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      marginBottom: 18,
    },
    avatar: {
      height: 64,
      width: 64,
      borderRadius: 9999,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    avatarText: {
      color: "#FFFFFF",
      fontSize: 28,
      fontWeight: "700",
    },
    profileTextBlock: {
      flex: 1,
    },
    profileName: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 14,
      color: colors.textSecondary,
    },

    actionCard: {
      paddingHorizontal: 18,
      paddingVertical: 14,
      borderRadius: 16,
      backgroundColor: colors.card,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionLabel: {
      marginLeft: 12,
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    modeTag: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: "500",
    },

    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 16,
      paddingVertical: 14,
      backgroundColor: colors.danger,
    },
    logoutText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });

export type ProfileStyles = ReturnType<typeof makeProfileStyles>;
