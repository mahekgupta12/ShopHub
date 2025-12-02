import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; 
import { RootState } from "./cartStore";
import styles from "./cartStyles";

export default function CartFooter() {
  const { items } = useSelector((state: RootState) => state.cart);
  const navigation = useNavigation<any>();         

  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <View style={styles.footer}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total}</Text>
      </View>

      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}


