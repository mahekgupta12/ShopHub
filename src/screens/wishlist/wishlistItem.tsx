import React from "react";
import { View, Text, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import AppPressable from "../../components/appPressables";

import {
  increaseWishlistQty,
  decreaseWishlistQty,
  removeFromWishlist,
  type WishlistItem as WishlistItemType,
} from "./wishlistSlice";
import { addItem } from "../cart/cartSlice";
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
  const quantity = item.quantity ?? 1;

  const handleMoveToCart = () => {
    // Add to cart with selected quantity
    for (let i = 0; i < quantity; i++) {
      dispatch(addItem(item));
    }
    // Remove from wishlist after moving to cart
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <View style={styles.card}>
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
      ) : null}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>

        <View style={styles.counterRow}>
          <AppPressable
            style={styles.circleBtn}
            onPress={() => dispatch(decreaseWishlistQty(item.id))}
          >
            <Ionicons name="remove" size={ICON_SIZES.MEDIUM} color={colors.text} />
          </AppPressable>

          <Text style={styles.qty}>{quantity}</Text>

          <AppPressable
            style={styles.circleBtn}
            onPress={() => dispatch(increaseWishlistQty(item.id))}
          >
            <Ionicons name="add" size={ICON_SIZES.MEDIUM} color={colors.text} />
          </AppPressable>
        </View>
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
          onPress={() => dispatch(removeFromWishlist(item.id))}
        >
          <Ionicons name="trash-outline" size={ICON_SIZES.EXTRA_LARGE} color={COLORS.DELETE_RED} />
        </AppPressable>
      </View>
    </View>
  );
}
