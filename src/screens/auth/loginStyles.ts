import { StyleSheet } from "react-native";
import type { AppTheme } from "../profile/profileTheme";

const makeLoginStyles = (colors: AppTheme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 20 },

    headerContainer: {
      alignItems: "center",
      marginTop: 50,
    },

    logo: {
      backgroundColor: colors.primary,
      padding: 18,
      borderRadius: 20,
      marginBottom: 10,
    },

    appName: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
    },

    tagline: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },

    tabContainer: {
      flexDirection: "row",
      backgroundColor: colors.card,
      padding: 5,
      borderRadius: 12,
      marginTop: 25,
      alignSelf: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },

    tabButton: {
      paddingVertical: 10,
      paddingHorizontal: 35,
      borderRadius: 10,
    },

    activeTab: {
      backgroundColor: colors.primary,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 3,
    },

    tabText: {
      fontSize: 15,
      color: colors.textSecondary,
    },

    activeTabText: {
      color: "#FFFFFF",
      fontWeight: "600",
    },

    formBox: {
      marginTop: 30,
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 15,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },

    title: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },

    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 5,
      marginBottom: 20,
    },

    input: {
      backgroundColor: colors.background,
      padding: 14,
      borderRadius: 10,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.text,
    },

    submitBtn: {
      backgroundColor: colors.primary,
      padding: 14,
      borderRadius: 10,
      marginTop: 15,
      alignItems: "center",
      justifyContent: "center",
    },

    submitText: {
      color: "#fff",
      fontSize: 16,
      textAlign: "center",
      fontWeight: "600",
    },

    loader: {
      marginTop: 15,
    },
  });

export default makeLoginStyles;
