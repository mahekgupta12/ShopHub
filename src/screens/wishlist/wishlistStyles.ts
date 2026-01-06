import { StyleSheet } from "react-native";
import type { AppTheme } from "../profile/profileTheme";
import { makeCommonStyles } from "../../components/commonStyles";
import { DIMENSIONS, SHADOWS } from "../../constants/ui";

const makeWishlistStyles = (colors: AppTheme) => {
  const common = makeCommonStyles(colors);

  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },

    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: DIMENSIONS.CONTAINER_PADDING_HORIZONTAL,
      paddingTop: DIMENSIONS.HEADER_PADDING_VERTICAL,
    },

    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: DIMENSIONS.MARGIN_2XL,
      paddingTop: DIMENSIONS.PADDING_SM,
      paddingBottom: DIMENSIONS.PADDING_MD,
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
      marginRight: DIMENSIONS.MARGIN_MD,
    },

    headerTitle: {
      ...common.screenTitle,
    },

    headerCount: {
      fontSize: 22,
      fontWeight: "600",
      marginLeft: DIMENSIONS.MARGIN_SM,
      color: colors.textSecondary,
    },

    card: {
      flexDirection: "row",
      backgroundColor: colors.card,
      padding: DIMENSIONS.PADDING_MD,
      borderRadius: DIMENSIONS.BORDER_RADIUS_LG,
      marginBottom: DIMENSIONS.MARGIN_LG,
      ...SHADOWS.CARD,
    },

    image: {
      width: DIMENSIONS.IMAGE_MEDIUM,
      height: DIMENSIONS.IMAGE_MEDIUM,
      borderRadius: DIMENSIONS.BORDER_RADIUS_MD,
      marginRight: DIMENSIONS.MARGIN_LG,
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
      width: DIMENSIONS.BUTTON_MEDIUM,
      height: DIMENSIONS.BUTTON_MEDIUM,
      borderRadius: DIMENSIONS.BUTTON_PILL,
      backgroundColor: "#F5F5F5",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: DIMENSIONS.MARGIN_XS,
    },

    qty: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      minWidth: DIMENSIONS.IMAGE_SMALL,
      textAlign: "center",
    },

    deleteBtn: {
      padding: DIMENSIONS.PADDING_SM,
      justifyContent: "center",
      alignItems: "center",
    },

    moveToCartBtn: {
      width: DIMENSIONS.BUTTON_LARGE,
      height: DIMENSIONS.BUTTON_LARGE,
      borderRadius: DIMENSIONS.BUTTON_PILL,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: DIMENSIONS.MARGIN_SM,
    },

    actionButtons: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
    },

    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: DIMENSIONS.EMPTY_STATE_PADDING,
    },

    centerContent: {
      justifyContent: "center",
      alignItems: "center",
    },

    listContent: {
      paddingBottom: DIMENSIONS.PADDING_2XL,
    },

    actionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
};

export default makeWishlistStyles;
