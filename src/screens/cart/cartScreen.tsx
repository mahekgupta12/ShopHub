/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import CartItem from "./cartItem";
import CartFooter from "./cartFooter";
import { RootState } from "./cartStore";
import { useLoadCart } from "./useLoadCart";

import makeCartStyles from "./cartStyles";
import { getProfileTheme } from "../profile/profileTheme";
import { SCREEN_TITLES } from "../../constants/index";

export default function CartScreen() {
  useLoadCart();

  const { items } = useSelector((state: RootState) => state.cart);

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCartStyles(colors);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [items]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{SCREEN_TITLES.CART}</Text>
        <Text style={styles.headerCount}>({items.length})</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Hey, it feels so light! 🎒</Text>
          <Text style={styles.emptySubtitle}>
            There is nothing in your bag.{"\n"}Let's add some items.
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {items.length > 0 && <CartFooter />}
    </View>
  );
}
