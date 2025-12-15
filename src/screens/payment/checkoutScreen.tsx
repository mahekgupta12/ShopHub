import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../cart/cartStore";

import makeCheckoutStyles from "./checkoutStyles";
import {
  DeliveryAddressCard,
  PaymentMethodCard,
  OrderSummaryCard,
} from "./checkoutSections";
import { getProfileTheme } from "../profile/profileTheme";

import {
  loadCheckoutForm,
  saveCheckoutForm,
  type CheckoutFormData,
} from "../../persistence/checkoutPersistence";
import { VALIDATION } from "../../constants/index";

import { PaymentMethod, PAYMENT_METHODS, ROUTES, SCREEN_TITLES } from "../../constants/index";

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const { items } = useSelector((state: RootState) => state.cart);

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCheckoutStyles(colors);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PAYMENT_METHODS.CARD);

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

  const handleBack = () => navigation.navigate(ROUTES.CART_MAIN);

  const onChangeFullName = (text: string) => {
    const cleaned = text.replace(/[^A-Za-z\s]/g, "");
    setFullName(cleaned);
    persistForm({ fullName: cleaned });
  };

  const onChangePhone = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    const trimmed = digitsOnly.slice(0, 10);
    setPhone(trimmed);
    persistForm({ phone: trimmed });
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
    const digitsOnly = text.replace(/\D/g, "");
    const trimmed = digitsOnly.slice(0, 6);
    setZip(trimmed);
    persistForm({ zip: trimmed });
  };

  const handlePlaceOrder = async () => {
    const errors: string[] = [];

    const fullNameTrim = fullName.trim();
    const streetTrim = street.trim();
    const cityTrim = city.trim();

    if (!fullNameTrim) errors.push("• Full Name is required");
    if (!phone) errors.push("• Phone Number is required");
    if (!streetTrim) errors.push("• Street Address is required");
    if (!cityTrim) errors.push("• City is required");
    if (!zip) errors.push("• ZIP Code is required");

    if (phone && phone.length !== VALIDATION.PHONE.LENGTH)
      errors.push(`• Phone Number must be exactly ${VALIDATION.PHONE.LENGTH} digits`);
    if (zip && zip.length !== VALIDATION.ZIP.LENGTH)
      errors.push(`• ZIP Code must be exactly ${VALIDATION.ZIP.LENGTH} digits`);

    if (errors.length > 0) {
      Alert.alert("Fix these details", errors.join("\n"));
      return;
    }

    navigation.navigate(ROUTES.PAYMENT, {
      fullName: fullNameTrim,
      phone,
      street: streetTrim,
      city: cityTrim,
      zip,
      paymentMethod,
      items,
      total,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={handleBack} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>

          <Text style={styles.headerTitle}>{SCREEN_TITLES.CHECKOUT}</Text>
          <View style={styles.headerRightSpacer} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
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

          <PaymentMethodCard paymentMethod={paymentMethod} onChange={setPaymentMethod} />
          <OrderSummaryCard items={items} total={total} />
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderText}>Proceed to Payment</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

