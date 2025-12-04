import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../Cart/cartStore";
import { clearCart } from "../Cart/cartSlice";
import { addOrder } from "../Orders/ordersSlice";

import { auth } from "../../firebase/firebaseConfig";

import styles from "./checkoutStyles";
import {
  DeliveryAddressCard,
  PaymentMethodCard,
  OrderSummaryCard,
} from "./CheckoutSections";

export type PaymentMethod = "card" | "upi" | "cod";

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const sanitizeText = (text: string, pattern: RegExp) =>
    text.replace(pattern, "");

  const handlePlaceOrder = () => {
    if (!fullName || !phone || !street || !city || !zip) {
      Alert.alert("Missing Details", "Please fill all address fields.");
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Login Required", "Please login to place an order.");
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    const date = new Date().toISOString().slice(0, 10);

    // Save order in Redux (user-specific)
        dispatch(
          addOrder({
            orderId,
            userId,
            items,
            total,
            date,
            paymentMethod,
          })
        );

    dispatch(clearCart());

   
    navigation.navigate("OrderConfirmation", {
      orderId,
      total,
      date,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={styles.headerRightSpacer} />
        </View>

        {/* Body */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <DeliveryAddressCard
            fullName={fullName}
            phone={phone}
            street={street}
            city={city}
            zip={zip}
            onChangeFullName={(t) => setFullName(sanitizeText(t, /[^A-Za-z\s]/g))}
            onChangePhone={(t) => setPhone(sanitizeText(t, /[^0-9+]/g))}
            onChangeStreet={(t) =>
              setStreet(sanitizeText(t, /[^A-Za-z0-9\s,.-]/g))
            }
            onChangeCity={(t) => setCity(sanitizeText(t, /[^A-Za-z\s]/g))}
            onChangeZip={(t) => setZip(sanitizeText(t, /\D/g))}
          />

          <PaymentMethodCard
            paymentMethod={paymentMethod}
            onChange={setPaymentMethod}
          />

          <OrderSummaryCard items={items} total={total} />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.placeOrderBtn}
            activeOpacity={0.9}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
