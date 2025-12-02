import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./orderConfirmationStyles";
import OrderInfoBox from "./OrderInfoBox";

type RouteParams = {
  orderId: string;
  total: string;
  date: string;
};

export default function OrderConfirmationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { orderId, total, date } = route.params as RouteParams;

  const resetCartStackToMain = () => {
    navigation.popToTop();
  };

  const goToOrders = () => {
    resetCartStackToMain();
    navigation.getParent()?.navigate("Orders", {
      orderId,
      total,
      date,
    });
  };

  const goToHome = () => {
    resetCartStackToMain();
    navigation.getParent()?.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.outer}>
        <View style={styles.card}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Ionicons name="checkmark" size={32} color="#16A34A" />
            </View>
          </View>

          <Text style={styles.title}>Order Confirmed!</Text>
          <Text style={styles.subtitle}>Thank you for your purchase</Text>

          <OrderInfoBox orderId={orderId} total={total} date={date} />

          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.9}
            onPress={goToOrders}
          >
            <Text style={styles.primaryText}>View Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            activeOpacity={0.9}
            onPress={goToHome}
          >
            <Text style={styles.secondaryText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
