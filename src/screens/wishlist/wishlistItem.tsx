import React from "react";
import { View, Text, Alert } from "react-native";
import ImageWithPlaceholder from "../../components/ImageWithPlaceholder";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import AppPressable from "../../components/appPressables";

import {
  removeFromWishlist,
  type WishlistItem as WishlistItemType,
} from "./wishlistSlice";
import { addItem } from "../cart/cartSlice";
import { safeFetch } from "../../utils/safeFetch";
import { API_BASE_URL } from "../../config/api";
import makeWishlistStyles from "./wishlistStyles";
import { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";
import { ICON_SIZES } from "../../constants/ui";
import { COLORS } from "../../constants/colors";

interface WishlistItemProps {
  item: WishlistItemType;
}

export default function WishlistItem({ item }: WishlistItemProps) {
  const dispatch = useDispatch();

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeWishlistStyles(colors);

  const price = item.price ?? 0;

  const handleMoveToCart = async () => {
    // Quick network check before moving wishlist item into cart.
    // If offline or network fails, show alert and do not move the item.
    try {
      const healthUrl = `${API_BASE_URL}/products/1`;
      const result = await safeFetch(healthUrl, { method: "GET" });
      if (result.networkError || !result.response || !result.response.ok) {
        Alert.alert("Network unavailable", "Cannot move item to cart while offline. Please try again when network is connected.");
        return;
      }
    } catch {
      Alert.alert("Network unavailable", "Cannot move item to cart while offline. Please try again when network is connected.");
      return;
    }

    // Add product to cart (just 1 unit)
    dispatch(addItem(item));
    // Remove from wishlist after moving to cart
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <View style={styles.card}>
      <ImageWithPlaceholder uri={item.thumbnail} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>

      <View style={styles.actionButtons}>
        <AppPressable
          style={[styles.moveToCartBtn, { backgroundColor: colors.primary }]}
          onPress={handleMoveToCart}
        >
          <Ionicons name="cart" size={ICON_SIZES.LARGE} color={COLORS.WHITE} />
        </AppPressable>

        <AppPressable
          style={styles.deleteBtn}
          onPress={async () => {
            // Prevent deleting wishlist items when offline
            try {
              const healthUrl = `${API_BASE_URL}/products/1`;
              const result = await safeFetch(healthUrl, { method: "GET" });
              if (result.networkError || !result.response || !result.response.ok) {
                Alert.alert("Network unavailable", "Cannot remove item from wishlist while offline. Please try again when network is connected.");
                return;
              }
            } catch {
              Alert.alert("Network unavailable", "Cannot remove item from wishlist while offline. Please try again when network is connected.");
              return;
            }

            dispatch(removeFromWishlist(item.id));
          }}
        >
          <Ionicons name="trash-outline" size={ICON_SIZES.EXTRA_LARGE} color={COLORS.DELETE_RED} />
        </AppPressable>
      </View>
    </View>
  );
}
