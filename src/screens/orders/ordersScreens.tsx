import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";
import makeOrderStyles from "./orderStyles";

import {
  SCREEN_TITLES,
  EMPTY_STATE_MESSAGES,
} from "../../constants/index";

import { getAuthData } from "../../restapi/authHelpers";
import { firebaseRest } from "../../restapi/firebaseRest";
import { loadOrders as loadOrdersCache } from "../../persistence/ordersPersistence";
import EmptyState from "../../components/emptyState";

type OrderItem = {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
};

type Order = {
  orderId: string;
  date: string;
  total: string;
  items: OrderItem[];
  timestamp?: number;
};

export default function OrdersScreens() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeOrderStyles(colors);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const { userId, idToken } = await getAuthData();

      try {
        const data = await firebaseRest(`orders/${userId}`, "GET", undefined, idToken);

        if (!data) {
          setOrders([]);
          return;
        }

        const list: Order[] = Object.keys(data).map((key) => {
          const order = data[key];
          return {
            orderId: order.orderId ?? key,
            date: order.date ?? "",
            total: order.total ?? "0.00",
            items: order.items ?? [],
            timestamp: order.timestamp,
          };
        });

        list.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
        setOrders(list);

        // persist fetched orders for offline access
        try {
          // persistence import is asynchronous/fast; ignore errors
          const cache = list as any;
          await (await import("../../persistence/ordersPersistence")).saveOrders(cache);
        } catch (e) {
          console.warn("Failed to cache orders locally:", e);
        }
      } catch (err) {
        console.warn("Failed to load orders from network, loading cached orders:", err);
        try {
          const cached = await loadOrdersCache();
          if (cached && cached.length) {
            setOrders(cached as any);
            return;
          }
        } catch (e) {
          console.warn("Failed to load cached orders:", e);
        }

        setOrders([]);
      }
    } catch (e) {
      console.warn("Failed to load orders", e);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [fetchOrders])
  );

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <View style={styles.headerRow}>
        <Text style={styles.orderIdText}>{item.orderId}</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Confirmed</Text>
        </View>
      </View>

      <Text style={styles.orderDate}>{item.date}</Text>

      {item.items?.map((prod) => (
        <View key={prod.id} style={styles.productRow}>
          {prod.thumbnail ? (
            <Image
              source={{ uri: prod.thumbnail }}
              style={styles.productImage}
            />
          ) : null}

          <View style={styles.productInfo}>
            <Text style={styles.productName}>{prod.title}</Text>
            <Text style={styles.qtyText}>Qty: {prod.quantity}</Text>
          </View>

          <Text style={styles.productPrice}>
            ${prod.price.toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${item.total}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.title}>{SCREEN_TITLES.ORDERS}</Text>

          <EmptyState
            title={EMPTY_STATE_MESSAGES.ORDERS_TITLE}
            subtitle={EMPTY_STATE_MESSAGES.ORDERS_SUBTITLE}
            colors={colors}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>{SCREEN_TITLES.ORDERS}</Text>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId}
          renderItem={renderOrder}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}
