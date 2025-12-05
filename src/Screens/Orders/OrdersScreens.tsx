import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./ordersStyles";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export default function OrdersScreen() {
  const userId = auth.currentUser?.uid;
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const ordersRef = collection(db, "orders", userId, "userOrders");

    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      let list: any[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));

      // Sort by timestamp (latest first)
      list.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));

      setOrders(list);
    });

    return () => unsubscribe();
  }, [userId]);

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>No Orders Yet! 🙁</Text>
        <Text style={styles.emptyText}>
          Your past orders will appear here.{"\n"} Start shopping now!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Orders</Text>

      {orders.map((order: any) => (
        <View key={order.orderId} style={styles.orderCard}>

          {/* Header: Order ID + Confirmed Badge */}
          <View style={styles.headerRow}>
            <Text style={styles.orderIdText}>{order.orderId}</Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Confirmed</Text>
            </View>
          </View>

          {/* Date */}
          <Text style={styles.orderDate}>{order.date}</Text>

          {/* Order Items */}
          {order.items.map((item: any) => (
            <View key={item.id} style={styles.productRow}>
              <Image source={{ uri: item.thumbnail }} style={styles.productImage} />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.qtyText}>Qty: {item.quantity}</Text>
              </View>

              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
          ))}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${order.total}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
