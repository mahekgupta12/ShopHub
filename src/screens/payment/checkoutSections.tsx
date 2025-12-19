import React from "react";
import { View, Text, TextInput } from "react-native";
import AppPressable from "../../components/appPressables";
import makeCheckoutStyles from "./checkoutStyles";
import type { PaymentMethod } from "../../constants/index";
import { PAYMENT_METHODS, PAYMENT_METHOD_LABELS, PLACEHOLDERS } from "../../constants/index";
import type { CartItem } from "../cart/cartSlice";

import { useSelector } from "react-redux";
import { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";

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
        placeholder={PLACEHOLDERS.FULL_NAME}
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        value={phone}
        onChangeText={onChangePhone}
        placeholder={PLACEHOLDERS.PHONE}
        keyboardType="number-pad"
        maxLength={10}
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>Street Address</Text>
      <TextInput
        value={street}
        onChangeText={onChangeStreet}
        placeholder={PLACEHOLDERS.STREET}
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
      />

      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>City</Text>
          <TextInput
            value={city}
            onChangeText={onChangeCity}
            placeholder={PLACEHOLDERS.CITY}
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
            placeholder={PLACEHOLDERS.ZIP}
            keyboardType="number-pad"
            maxLength={6}
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
    { key: PAYMENT_METHODS.CARD, label: PAYMENT_METHOD_LABELS[PAYMENT_METHODS.CARD] },
    { key: PAYMENT_METHODS.UPI, label: PAYMENT_METHOD_LABELS[PAYMENT_METHODS.UPI] },
    { key: PAYMENT_METHODS.COD, label: PAYMENT_METHOD_LABELS[PAYMENT_METHODS.COD] },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Payment Method</Text>

      {options.map((opt) => (
        <AppPressable
          key={opt.key}
          style={styles.paymentRow}
          onPress={() => onChange(opt.key)}
        >
          <View style={styles.radioOuter}>
            {paymentMethod === opt.key && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.paymentLabel}>{opt.label}</Text>
        </AppPressable>
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
