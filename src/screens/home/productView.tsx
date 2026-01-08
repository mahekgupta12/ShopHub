import React from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Product } from "./api";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  increaseQty,
  decreaseQty,
} from "../cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../wishlist/wishlistSlice";
import { getNetworkStatus } from "../../utils/networkStatus";

import { RootState } from "../cart/cartStore";
import { getProfileTheme, type AppTheme } from "../profile/profileTheme";
import AppPressable from "../../components/appPressables";
import {
  COLORS,
  ICON_NAMES,
  ICON_SIZES,
  MONEY,
  PRODUCT_MESSAGES,
  VIEW_TYPES,
  type ViewType,
} from "../../constants/index";

export default function ProductView({
  item,
  viewType,
}: {
  item: Product;
  viewType: ViewType;
}) {
  const dispatch = useDispatch();

  const mode = useSelector((state: RootState) => state.theme.mode);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const cartItem = cartItems.find((i) => i && i.id === item.id);
  const isInWishlist = wishlistItems.find((i) => i && i.id === item.id);

  const quantity = cartItem?.quantity ?? 0;

  const colors = getProfileTheme(mode);
  const styles = makeStyles(colors);

  const handleWishlistToggle = () => {
    const online = getNetworkStatus() ?? true;
    if (!online) {
      Alert.alert("Network unavailable", "Cannot modify wishlist while offline. Please try again when network is connected.");
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(item.id));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  return (
    <View style={viewType === VIEW_TYPES.GRID ? styles.gridCard : styles.listCard}>
      <Image
        source={{ uri: item.thumbnail }}
        style={viewType === VIEW_TYPES.GRID ? styles.gridImage : styles.listImage}
      />

      <View style={styles.cardBody}>
        <View style={styles.headerWithWishlist}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <AppPressable onPress={handleWishlistToggle} style={styles.wishlistBtn}>
            <Ionicons
              name={isInWishlist ? "heart" : "heart-outline"}
              size={ICON_SIZES.MEDIUM}
              color={isInWishlist ? COLORS.HEART_RED : colors.textSecondary}
            />
          </AppPressable>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons
            name={ICON_NAMES.STAR}
            size={ICON_SIZES.SMALL}
            color={COLORS.STAR_YELLOW}
          />
          <Text style={styles.ratingText}>
            {item.rating
              ? item.rating.toFixed(MONEY.RATING_DECIMALS)
              : PRODUCT_MESSAGES.RATING_FALLBACK}
          </Text>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.price}>
            {MONEY.CURRENCY_SYMBOL}
            {item.price.toFixed(MONEY.PRICE_DECIMALS)}
          </Text>

          {quantity === 0 ? (
            <AppPressable
              style={styles.addButton}
              onPress={() => {
                const online = getNetworkStatus() ?? true;
                if (!online) {
                  Alert.alert("Network unavailable", "Cannot add to cart while offline. Please try again when network is connected.");
                  return;
                }

                dispatch(addItem(item));
              }}
            >
              <Text style={styles.addButtonText}>{PRODUCT_MESSAGES.ADD_BUTTON}</Text>
            </AppPressable>
          ) : (
            <View style={styles.qtyContainer}>
              <AppPressable
                style={styles.qtyBtn}
                onPress={() => dispatch(decreaseQty(item.id))}
              >
                <Ionicons name={ICON_NAMES.REMOVE} size={ICON_SIZES.MEDIUM} color={colors.text} />
              </AppPressable>

              <Text style={styles.qtyText}>{quantity}</Text>

              <AppPressable
                style={styles.qtyBtn}
                onPress={() => {
                  const online = getNetworkStatus() ?? true;
                  if (!online) {
                    Alert.alert("Network unavailable", "Cannot change cart quantity while offline.");
                    return;
                  }

                  dispatch(increaseQty(item.id));
                }}
              >
                <Ionicons name={ICON_NAMES.ADD} size={ICON_SIZES.MEDIUM} color={colors.text} />
              </AppPressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const makeStyles = (colors: AppTheme) =>
  StyleSheet.create({
    listCard: {
      flexDirection: "row",
      padding: 12,
      backgroundColor: colors.card,
      borderRadius: 16,
      marginBottom: 12,
    },
    gridCard: {
      width: "48%",
      backgroundColor: colors.card,
      padding: 10,
      borderRadius: 16,
      marginBottom: 12,
    },
    listImage: {
      width: 72,
      height: 72,
      borderRadius: 12,
      marginRight: 12,
    },
    gridImage: {
      width: "100%",
      height: 120,
      borderRadius: 12,
      marginBottom: 10,
    },
    cardBody: { flex: 1 },
    headerWithWishlist: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    title: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      flex: 1,
    },
    wishlistBtn: {
      marginLeft: 8,
      padding: 4,
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    ratingText: {
      marginLeft: 4,
      color: colors.textSecondary,
    },
    footerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    price: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },

    addButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
    },
    addButtonText: {
      color: COLORS.WHITE,
      fontWeight: "600",
    },

    qtyContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    qtyBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    qtyText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
  });
