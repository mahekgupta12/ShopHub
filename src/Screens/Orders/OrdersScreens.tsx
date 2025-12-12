import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";

import { auth, db } from "../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "../Cart/cartStore";
import { getProfileTheme } from "../Profile/profileTheme";
import makeOrderStyles from "./orderStyles";

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

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeOrderStyles(colors);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const ordersRef = collection(db, "orders", userId, "userOrders");

    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      const list: Order[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as any;
        return {
          orderId: data.orderId ?? docSnap.id,
          date: data.date ?? "",
          total: data.total ?? "0.00",
          items: data.items ?? [],
          timestamp: data.timestamp,
        };
      });

      list.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
      setOrders(list);
    });

    return () => unsubscribe();
  }, [userId]);

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

  if (!orders || orders.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Orders Yet! 🙁</Text>
          <Text style={styles.emptySubtitle}>
            Your past orders will appear here.{"\n"}Start shopping now!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Orders</Text>

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
