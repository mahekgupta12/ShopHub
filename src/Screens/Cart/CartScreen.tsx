import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import { RootState } from "./cartStore";

import makeCartStyles from "./cartStyles";
import { getProfileTheme } from "../Profile/profileTheme";

export default function CartScreen() {
  const { items } = useSelector((state: RootState) => state.cart);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCartStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Cart</Text>
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
