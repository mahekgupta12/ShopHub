import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./orderStyles";

export default function OrdersScreen() {
  const userId = auth.currentUser?.uid;
  const allOrders = useSelector((state: any) => state.orders.orderHistory);

  const orders = allOrders.filter((order: any) => order.userId === userId);

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Orders Yet!</Text>
        <Text style={styles.emptyText}>
          Your past orders will appear here. Start shopping now!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Orders</Text>

      {orders.map((order: any) => (
        <View key={order.orderId} style={styles.orderBox}>
          <Text style={styles.label}>Order ID: {order.orderId}</Text>
          <Text style={styles.label}>Date: {order.date}</Text>

          {order.items.map((item: any) => (
            <View key={item.id} style={styles.row}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <View>
                <Text>{item.title}</Text>
                <Text>Qty: {item.quantity}</Text>
              </View>
              <Text>${item.price.toFixed(2)}</Text>
            </View>
          ))}

          <Text style={styles.total}>Total: ${order.total}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
