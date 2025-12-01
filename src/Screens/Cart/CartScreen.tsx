import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import styles from "./cartStyles";
import { RootState } from "./cartStore";

export default function CartScreen() {
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Cart</Text>
        <Text style={styles.headerCount}>({items.length})</Text>
      </View>

      {/* Empty Cart Message */}
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
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {items.length > 0 && <CartFooter />} 
    </View>
  );
}
