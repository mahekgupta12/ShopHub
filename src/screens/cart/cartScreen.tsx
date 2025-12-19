/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import CartItem from "./cartItem";
import CartFooter from "./cartFooter";
import { RootState } from "./cartStore";
import { useLoadCart } from "./useLoadCart";

import makeCartStyles from "./cartStyles";
import { getProfileTheme } from "../profile/profileTheme";
import {
  SCREEN_TITLES,
  EMPTY_STATE_MESSAGES,
} from "../../constants/index";
import { EmptyStateView, LoadingState } from "../../components/sharedComponents";

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
      <SafeAreaView style={styles.safe}>
        <LoadingState colors={colors} containerStyle={styles.container} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{SCREEN_TITLES.CART}</Text>
          <Text style={styles.headerCount}>({items.length})</Text>
        </View>

        {items.length === 0 ? (
          <EmptyStateView
            title={EMPTY_STATE_MESSAGES.CART_TITLE}
            subtitle={EMPTY_STATE_MESSAGES.CART_SUBTITLE}
            colors={colors}
            containerStyle={styles.emptyContainer}
            titleStyle={styles.emptyTitle}
            subtitleStyle={styles.emptySubtitle}
          />
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
    </SafeAreaView>
  );
}
