/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import CartItem from "./cartItem";
import CartFooter from "./cartFooter";
import { RootState } from "./cartStore";
import { useLoadCart } from "./useLoadCart";
import { safeFetch } from "../../utils/safeFetch";
import { API_BASE_URL } from "../../config/api";

import makeCartStyles from "./cartStyles";
import { getProfileTheme } from "../profile/profileTheme";
import {
  SCREEN_TITLES,
  EMPTY_STATE_MESSAGES,
} from "../../constants/index";
import EmptyState from "../../components/emptyState";

export default function CartScreen() {
  useLoadCart();

  const { items } = useSelector((state: RootState) => state.cart);

  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCartStyles(colors);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [items]);

  const checkNetwork = useCallback(async () => {
    try {
      const res = await safeFetch(`${API_BASE_URL}/products/1`);
      if (res.networkError || !res.response || !res.response.ok) {
        setIsOnline(false);
      } else {
        setIsOnline(true);
      }
    } catch {
      setIsOnline(false);
    }
  }, []);

  // Check on focus so UI updates when network returns
  useFocusEffect(
    useCallback(() => {
      checkNetwork();
    }, [checkNetwork])
  );

  // Also check once on mount
  useEffect(() => {
    checkNetwork();
  }, [checkNetwork]);

  if (loading || isOnline === null) {
    return (
      <SafeAreaView style={styles.safe}>
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{SCREEN_TITLES.CART}</Text>
          <Text style={styles.headerCount}>({isOnline ? items.length : 0})</Text>
        </View>
        {!isOnline ? (
          <EmptyState
            title={"Offline"}
            subtitle={"Cart is not available while offline."}
            colors={colors}
          />
        ) : items.length === 0 ? (
          <EmptyState
            title={EMPTY_STATE_MESSAGES.CART_TITLE}
            subtitle={EMPTY_STATE_MESSAGES.CART_SUBTITLE}
            colors={colors}
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

        {isOnline && items.length > 0 && <CartFooter />}
      </View>
    </SafeAreaView>
  );
}
