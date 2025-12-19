import { StyleSheet } from "react-native";
import type { AppTheme } from "../profile/profileTheme";
import { makeCommonStyles } from "../../components/commonStyles";

const makeOrderStyles = (colors: AppTheme) => {
  const common = makeCommonStyles(colors);

  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },

    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 16,
    },

    title: {
      ...common.screenTitle,
      marginBottom: 40,
    },

    // 🔹 Empty state
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: colors.background,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 22,
    },

    // 🔹 LatestOrderCard
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

    // 🔹 Orders list card
    orderCard: {
      backgroundColor: colors.card,
      padding: 18,
      borderRadius: 18,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      borderWidth: 1,
      borderColor: colors.border,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    orderIdText: {
      fontSize: 18,
      fontWeight: "800",
      color: colors.text,
    },

    statusBadge: {
      backgroundColor: colors.background,
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },

    statusText: {
      color: colors.primary,
      fontWeight: "700",
    },

    orderDate: {
      marginTop: 6,
      color: colors.textSecondary,
      fontSize: 14,
      marginBottom: 10,
    },

    productRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },

    productImage: {
      width: 55,
      height: 55,
      borderRadius: 10,
      marginRight: 12,
    },

    productInfo: {
      flex: 1,
    },

    productName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },

    qtyText: {
      color: colors.textSecondary,
      marginTop: 2,
    },

    productPrice: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },

    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 14,
    },

    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    totalLabel: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },

    totalAmount: {
      fontSize: 20,
      fontWeight: "800",
      color: colors.primary,
    },
  });
};

export default makeOrderStyles;
