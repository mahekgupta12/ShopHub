import { StyleSheet } from "react-native";
import type { AppTheme } from "../profile/ProfileTheme";

const makeCheckoutStyles = (colors: AppTheme) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },

    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 8,
      paddingBottom: 12,
    },
    backBtn: {
      height: 36,
      width: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: 24,
      fontWeight: "800",
      color: colors.text,
    },
    headerRightSpacer: {
      width: 36,
    },

    scrollContent: {
      paddingBottom: 24,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.03,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 12,
      color: colors.text,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textSecondary,
      marginTop: 8,
      marginBottom: 4,
    },
    input: {
      borderRadius: 12,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      color: colors.text,
    },

    row: {
      flexDirection: "row",
      marginTop: 8,
    },
    half: {
      flex: 1,
    },
    spacer: {
      width: 12,
    },

    paymentRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    radioOuter: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    radioInner: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    paymentLabel: {
      fontSize: 15,
      color: colors.text,
    },

    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 6,
    },
    summaryText: {
      fontSize: 15,
      color: colors.textSecondary,
    },
    summaryPrice: {
      fontSize: 15,
      color: colors.text,
      fontWeight: "500",
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 10,
    },
    totalLabel: {
      fontSize: 17,
      fontWeight: "700",
      color: colors.text,
    },
    totalValue: {
      fontSize: 17,
      fontWeight: "800",
      color: colors.primary,
    },

    footer: {
      paddingBottom: 16,
      paddingTop: 8,
    },
    placeOrderBtn: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: "center",
    },
    placeOrderText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });

export default makeCheckoutStyles;
