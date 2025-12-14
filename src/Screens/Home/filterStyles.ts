import { StyleSheet } from "react-native";
import type { AppTheme } from "../Profile/profileTheme";

export const makeStyles = (colors: AppTheme) =>
  StyleSheet.create({
    overlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      flexDirection: "row",
      justifyContent: "flex-end",
    },

    drawer: {
      width: "82%",
      backgroundColor: colors.card,
      padding: 22,
      borderTopLeftRadius: 24,
      borderBottomLeftRadius: 24,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    title: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
    },

    subHeader: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
      marginBottom: 20,
    },

    sectionTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: colors.text,
      marginTop: 8,
    },

    categoriesContainer: {
      marginTop: 10,
    },

    radioRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },

    radioOuter: {
      height: 18,
      width: 18,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.muted,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },

    radioOuterActive: {
      borderColor: colors.primary,
    },

    radioInner: {
      height: 9,
      width: 9,
      borderRadius: 10,
      backgroundColor: colors.primary,
    },

    radioText: {
      fontSize: 15,
      color: colors.text,
    },

    priceContainer: {
      marginTop: 12,
      gap: 18,
    },

    priceRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    priceButton: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
    },

    priceButtonText: {
      fontSize: 22,
      fontWeight: "600",
      color: colors.text,
    },

    priceValueBox: {
      flex: 1,
      marginHorizontal: 20,
      alignItems: "center",
    },

    priceValue: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },

    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 32,
    },

    closeText: {
      fontSize: 16,
      color: colors.textSecondary,
    },

    applyBtn: {
      backgroundColor: colors.primary,
      paddingHorizontal: 22,
      paddingVertical: 10,
      borderRadius: 14,
    },

    applyText: {
      color: colors.card,
      fontSize: 16,
      fontWeight: "600",
    },
  });
