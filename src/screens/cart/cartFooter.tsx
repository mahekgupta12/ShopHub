import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AppPressable from "../../components/appPressables";
import { RootState } from "./cartStore";

import makeCartStyles from "./cartStyles";
import { getProfileTheme } from "../profile/profileTheme";
import { ROUTES } from "../../constants/index";

export default function CartFooter() {
  const { items } = useSelector((state: RootState) => state.cart);
  const navigation = useNavigation<any>();

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCartStyles(colors);

  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <View style={styles.footer}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total}</Text>
      </View>

      <AppPressable
        style={styles.checkoutBtn}
        onPress={() => navigation.navigate(ROUTES.CHECKOUT)}
      >
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </AppPressable>
    </View>
  );
}
