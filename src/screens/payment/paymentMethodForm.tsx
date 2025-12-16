import React, { memo } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export type Colors = {
  primary: string;
  text: string;
  textSecondary: string;
  background: string;
  border: string;
};

type InputFieldProps = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  editable: boolean;
  colors: Colors;
  keyboardType?: any;
  maxLength?: number;
  secureTextEntry?: boolean;
};

export const PaymentInputField = memo(function PaymentInputField({
  value,
  onChangeText,
  placeholder,
  editable,
  colors,
  keyboardType,
  maxLength,
  secureTextEntry,
}: InputFieldProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      editable={editable}
      autoCorrect={false}
      autoCapitalize="none"
      selectionColor={colors.primary}
      placeholderTextColor={colors.textSecondary}
      keyboardType={keyboardType}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      style={[
        styles.input,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          color: colors.text,
        },
      ]}
    />
  );
});

type OrderSummaryProps = {
  colors: Colors;
  items: any[];
  total: string;
};

export function OrderSummarySection({ colors, items, total }: OrderSummaryProps) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.background, borderColor: colors.border },
      ]}
    >
      <Text style={{ fontSize: 16, fontWeight: "800", color: colors.text }}>
        Order Summary
      </Text>

      <View style={{ marginTop: 10 }}>
        {items.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <Text style={{ color: colors.textSecondary }}>
              {item.title} x {item.quantity}
            </Text>
            <Text style={{ color: colors.text }}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: colors.border,
          marginVertical: 12,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700", color: colors.text }}>Total</Text>
        <Text
          style={{
            fontWeight: "800",
            color: colors.primary,
            fontSize: 16,
          }}
        >
          ${total}
        </Text>
      </View>
    </View>
  );
}

export const paymentFormStyles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    marginTop: 14,
  },
  sectionTitle: { fontSize: 16, fontWeight: "800" },
  label: { marginTop: 12 },
  input: {
    marginTop: 6,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  twoCol: { flexDirection: "row", marginTop: 6 },
});

const styles = paymentFormStyles;
