import React, { useState, useEffect } from "react";
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

import makeCheckoutStyles from "./checkoutStyles";
import {
  DeliveryAddressCard,
  PaymentMethodCard,
  OrderSummaryCard,
} from "./CheckoutSections";
import { clearCart } from "./cartSlice";
import { getProfileTheme } from "../Profile/profileTheme";

import {
  loadCheckoutForm,
  saveCheckoutForm,
  clearCheckoutForm,
  type CheckoutFormData,
} from "../../persistence/checkoutPersistence";

import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export type PaymentMethod = "card" | "upi" | "cod";

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCheckoutStyles(colors);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const persistForm = (partial?: Partial<CheckoutFormData>) => {
    const data: CheckoutFormData = {
      fullName: partial?.fullName ?? fullName,
      phone: partial?.phone ?? phone,
      street: partial?.street ?? street,
      city: partial?.city ?? city,
      zip: partial?.zip ?? zip,
    };
    saveCheckoutForm(data);
  };

  useEffect(() => {
    const load = async () => {
      const data = await loadCheckoutForm();
      if (data) {
        setFullName(data.fullName ?? "");
        setPhone(data.phone ?? "");
        setStreet(data.street ?? "");
        setCity(data.city ?? "");
        setZip(data.zip ?? "");
      }
    };
    load();
  }, []);

  const handleBack = () => {
    navigation.navigate("CartMain");
  };

  const onChangeFullName = (text: string) => {
    const cleaned = text.replace(/[^A-Za-z\s]/g, "");
    setFullName(cleaned);
    persistForm({ fullName: cleaned });
  };

  const onChangePhone = (text: string) => {
    const cleaned = text.replace(/[^0-9+]/g, "");
    setPhone(cleaned);
    persistForm({ phone: cleaned });
  };

  const onChangeStreet = (text: string) => {
    const cleaned = text.replace(/[^A-Za-z0-9\s,.-]/g, "");
    setStreet(cleaned);
    persistForm({ street: cleaned });
  };

  const onChangeCity = (text: string) => {
    const cleaned = text.replace(/[^A-Za-z\s]/g, "");
    setCity(cleaned);
    persistForm({ city: cleaned });
  };

  const onChangeZip = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    setZip(cleaned);
    persistForm({ zip: cleaned });
  };

  const handlePlaceOrder = async () => {
    if (!fullName || !phone || !street || !city || !zip) {
      Alert.alert("Missing Details", "Please fill all address fields.");
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Not Logged In", "Please log in to place an order.");
      return;
    }

    try {
      const orderId = `ORD-${Date.now()}`;
      const today = new Date();
      const date = today.toISOString().slice(0, 10);

      await setDoc(
        doc(db, "orders", userId, "userOrders", orderId),
        {
          orderId,
          userId,
          items,
          total,
          date,
          paymentMethod,
          timestamp: Date.now(),
        }
      );

      dispatch(clearCart());
      await clearCheckoutForm();

      navigation.navigate("OrderConfirmation", {
        orderId,
        total,
        date,
      });
    } catch (e) {
      console.warn("Failed to place order", e);
      Alert.alert(
        "Order Failed",
        "We couldn't place your order. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backBtn}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
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
