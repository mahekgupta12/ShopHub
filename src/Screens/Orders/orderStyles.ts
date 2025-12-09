import { StyleSheet } from "react-native";

export default function makeOrderStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 10,
    },

    title: {
      fontSize: 24,
      fontWeight: "800",
      color: colors.text,
      marginTop: 42,
      marginBottom: 20,
    },

    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },

    emptyText: {
      fontSize: 16,
      color: colors.subText,
      textAlign: "center",
      lineHeight: 22,
    },

    orderCard: {
      backgroundColor: colors.card,
      padding: 18,
      borderRadius: 18,
      marginBottom: 16,
      shadowColor: colors.shadowColor ?? "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 4,
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
      backgroundColor: colors.badgeBackground,
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
    },

    statusText: {
      color: colors.primary,
      fontWeight: "700",
      fontSize: 14,
    },

    orderDate: {
      marginTop: 6,
      color: colors.subText,
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
      color: colors.subText,
      marginTop: 2,
      fontSize: 14,
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
}
