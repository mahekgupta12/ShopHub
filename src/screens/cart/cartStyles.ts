import { StyleSheet } from "react-native";
import type { AppTheme } from "../profile/profileTheme";

const makeCartStyles = (colors: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 10,
    },

    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },

    headerTitle: {
      fontSize: 26,
      fontWeight: "800",
      color: colors.text,
      marginTop: 40,
    },

    headerCount: {
      fontSize: 22,
      fontWeight: "600",
      marginLeft: 6,
      color: colors.textSecondary,
      marginTop: 40,
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
      color: colors.text,
      marginBottom: 8,
    },

    emptySubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 22,
    },

    card: {
      flexDirection: "row",
      backgroundColor: colors.card,
      padding: 12,
      borderRadius: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    },

    image: {
      width: 70,
      height: 70,
      borderRadius: 12,
      marginRight: 12,
    },

    info: {
      flex: 1,
      justifyContent: "space-between",
    },

    title: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },

    price: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.primary,
      marginVertical: 4,
    },

    counterRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    circleBtn: {
      height: 28,
      width: 28,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
    },

    qty: {
      fontSize: 16,
      marginHorizontal: 12,
      color: colors.text,
    },

    deleteBtn: {
      marginLeft: "auto",
    },

    footer: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 16,
      marginTop: 10,
    },

    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },

    totalLabel: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },

    totalValue: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.primary,
    },

    checkoutBtn: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
    },

    checkoutText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
  });

export default makeCartStyles;
