import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Product } from "./api";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  increaseQty,
  decreaseQty,
} from "../cart/cartSlice";

import { RootState } from "../cart/cartStore";
import { getProfileTheme, type AppTheme } from "../profile/profileTheme";

export default function ProductView({
  item,
  viewType,
}: {
  item: Product;
  viewType: "list" | "grid";
}) {
  const dispatch = useDispatch();

  const mode = useSelector((state: RootState) => state.theme.mode);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  //const cartItem = cartItems.find((i) => i.id === item.id);
  const cartItem = cartItems.find((i) => i && i.id === item.id);

  const quantity = cartItem?.quantity ?? 0;

  const colors = getProfileTheme(mode);
  const styles = makeStyles(colors);

  return (
    <View style={viewType === "grid" ? styles.gridCard : styles.listCard}>
      <Image
        source={{ uri: item.thumbnail }}
        style={viewType === "grid" ? styles.gridImage : styles.listImage}
      />

      <View style={styles.cardBody}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FBBF24" />
          <Text style={styles.ratingText}>
            {item.rating ? item.rating.toFixed(1) : "-"}
          </Text>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>

          {quantity === 0 ? (
            <Pressable
              style={styles.addButton}
              onPress={() => dispatch(addItem(item))}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          ) : (
            <View style={styles.qtyContainer}>
              <Pressable
                style={styles.qtyBtn}
                onPress={() => dispatch(decreaseQty(item.id))}
              >
                <Ionicons name="remove" size={16} color={colors.text} />
              </Pressable>

              <Text style={styles.qtyText}>{quantity}</Text>

              <Pressable
                style={styles.qtyBtn}
                onPress={() => dispatch(increaseQty(item.id))}
              >
                <Ionicons name="add" size={16} color={colors.text} />
              </Pressable>
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
    title: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 6,
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
      color: "#fff",
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
