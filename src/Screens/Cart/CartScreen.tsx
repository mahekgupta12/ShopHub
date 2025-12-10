import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import styles from "./cartStyles";
import { RootState } from "./cartStore";
import { useLoadCart } from "./useLoadCart";

export default function CartScreen() {
  useLoadCart();
  
  const { items } = useSelector((state: RootState) => state.cart);
  const [loading, setLoading] = useState(true);

  // loading indicator until cart arrives
  useEffect(() => {
    setLoading(false);
  }, [items]);

  if (loading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Cart</Text>
        <Text style={styles.headerCount}>({items.length})</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Hey, it feels so light! 🎒</Text>
          <Text style={styles.emptySubtitle}>There is nothing in your bag.{"\n"}Let's add some items.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {items.length > 0 && <CartFooter />}
    </View>
  );
}
