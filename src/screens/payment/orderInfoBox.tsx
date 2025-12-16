import React from "react";
import { View, Text } from "react-native";

import { useSelector } from "react-redux";
import { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";
import makeOrderConfirmationStyles from "./orderConfirmationStyles";

type Props = {
  orderId: string;
  total: string;
  date: string;
};

export default function OrderInfoBox({ orderId, total, date }: Props) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeOrderConfirmationStyles(colors);

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

