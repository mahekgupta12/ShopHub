import React from "react";
import { View, Text } from "react-native";
import styles from "./orderConfirmationStyles";

type Props = {
  orderId: string;
  total: string;
  date: string;
};

export default function OrderInfoBox({ orderId, total, date }: Props) {
  return (
    <View style={styles.infoBox}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Order ID</Text>
        <Text style={styles.infoValue}>{orderId}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Date</Text>
        <Text style={styles.infoValue}>{date}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Total</Text>
        <Text style={styles.infoTotal}>${total}</Text>
      </View>
    </View>
  );
}
