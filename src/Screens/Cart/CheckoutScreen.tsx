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
import { RootState } from "./cartStore";

import styles from "./checkoutStyles";
import {
  DeliveryAddressCard,
  PaymentMethodCard,
  OrderSummaryCard,
} from "./CheckoutSections";
import { clearCart } from "./cartSlice";

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

  const onChangeFullName = (text: string) => {
    const cleaned = text.replace(/[^A-Za-z\s]/g, "");
    setFullName(cleaned);
  };

  const onChangePhone = (text: string) => {
    const cleaned = text.replace(/[^0-9+]/g, "");
    setPhone(cleaned);
  };

  const onChangeStreet = (text: string) => {
    const cleaned = text.replace(/[^A-Za-z0-9\s,.-]/g, "");
    setStreet(cleaned);
  };

  const onChangeCity = (text: string) => {
    const cleaned = text.replace(/[^A-Za-z\s]/g, "");
    setCity(cleaned);
  };

  const onChangeZip = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    setZip(cleaned);
  };

  const handlePlaceOrder = () => {
    if (!fullName || !phone || !street || !city || !zip) {
      Alert.alert("Missing Details", "Please fill all address fields.");
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    const today = new Date();
    const date = today.toISOString().slice(0, 10);

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
            onChangeFullName={onChangeFullName}
            onChangePhone={onChangePhone}
            onChangeStreet={onChangeStreet}
            onChangeCity={onChangeCity}
            onChangeZip={onChangeZip}
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
