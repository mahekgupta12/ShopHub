import { StyleSheet } from "react-native";
import { type AppTheme } from "../profile/profileTheme";

export const makeStyles = (colors: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 60,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
      alignItems: "center",
    },
    brand: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
    },
    headerActions: { flexDirection: "row", gap: 10 },

    iconChip: {
      height: 36,
      width: 36,
      borderRadius: 12,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeChip: {
      backgroundColor: colors.primary,
    },

    badge: {
      position: "absolute",
      right: -6,
      top: -4,
      backgroundColor: "#EF4444",
      borderRadius: 10,
      paddingHorizontal: 5,
      minWidth: 16,
      alignItems: "center",
    },
    badgeText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "700",
    },

    listContent: { paddingBottom: 20 },

    stateWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: { color: colors.danger },
    emptyText: { color: colors.textSecondary },
  });
