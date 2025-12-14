import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../Cart/cartStore";
import { getProfileTheme } from "../Profile/profileTheme";
import makeOrderStyles from "./orderStyles";

type Props = {
  orderId: string;
  total: string;
  date: string;
};

export default function LatestOrderCard({ orderId, total, date }: Props) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeOrderStyles(colors);

  return (
    <View style={styles.orderBox}>
      <Text style={styles.label}>Latest Order</Text>

      <View style={styles.row}>
        <Text style={styles.key}>Order ID</Text>
        <Text style={styles.value}>{orderId}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.key}>Date</Text>
        <Text style={styles.value}>{date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.key}>Total</Text>
        <Text style={styles.total}>${total}</Text>
      </View>
    </View>
  );
}
