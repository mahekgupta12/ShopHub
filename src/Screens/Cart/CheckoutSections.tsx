import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import makeCheckoutStyles from "./checkoutStyles";
import type { PaymentMethod } from "./CheckoutScreen";
import type { CartItem } from "./cartSlice";

import { useSelector } from "react-redux";
import { RootState } from "./cartStore";
import { getProfileTheme } from "../Profile/profileTheme";

type AddressProps = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  onChangeFullName: (t: string) => void;
  onChangePhone: (t: string) => void;
  onChangeStreet: (t: string) => void;
  onChangeCity: (t: string) => void;
  onChangeZip: (t: string) => void;
};

export function DeliveryAddressCard(props: AddressProps) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCheckoutStyles(colors);

  const {
    fullName,
    phone,
    street,
    city,
    zip,
    onChangeFullName,
    onChangePhone,
    onChangeStreet,
    onChangeCity,
    onChangeZip,
  } = props;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Delivery Address</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        value={fullName}
        onChangeText={onChangeFullName}
        placeholder="John Doe"
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        value={phone}
        onChangeText={onChangePhone}
        placeholder="+1 234 567 8900"
        keyboardType="phone-pad"
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>Street Address</Text>
      <TextInput
        value={street}
        onChangeText={onChangeStreet}
        placeholder="123 Main St"
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
      />

      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>City</Text>
          <TextInput
            value={city}
            onChangeText={onChangeCity}
            placeholder="New York"
            style={styles.input}
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.spacer} />

        <View style={styles.half}>
          <Text style={styles.label}>ZIP Code</Text>
          <TextInput
            value={zip}
            onChangeText={onChangeZip}
            placeholder="10001"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>
    </View>
  );
}

type PaymentProps = {
  paymentMethod: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
};

export function PaymentMethodCard({ paymentMethod, onChange }: PaymentProps) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCheckoutStyles(colors);

  const options: { key: PaymentMethod; label: string }[] = [
    { key: "card", label: "Credit/Debit Card" },
    { key: "upi", label: "UPI" },
    { key: "cod", label: "Cash on Delivery" },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Payment Method</Text>

      {options.map((opt) => (
        <TouchableOpacity
          key={opt.key}
          style={styles.paymentRow}
          activeOpacity={0.8}
          onPress={() => onChange(opt.key)}
        >
          <View style={styles.radioOuter}>
            {paymentMethod === opt.key && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.paymentLabel}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

type SummaryProps = {
  items: CartItem[];
  total: string;
};

export function OrderSummaryCard({ items, total }: SummaryProps) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCheckoutStyles(colors);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Order Summary</Text>

      {items.map((item) => (
        <View key={item.id} style={styles.summaryRow}>
          <Text style={styles.summaryText}>
            {item.title} × {item.quantity}
          </Text>
          <Text style={styles.summaryPrice}>
            {(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total}</Text>
      </View>
    </View>
  );
}
