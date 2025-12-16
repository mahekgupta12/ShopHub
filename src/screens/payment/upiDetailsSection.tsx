import React from "react";
import { View, Text } from "react-native";
import { ALLOWED_UPI_HANDLES, PLACEHOLDERS, VALIDATION } from "../../constants/index";
import {
  PaymentInputField,
  paymentFormStyles,
  type Colors,
} from "./paymentMethodForm";

type UpiDetailsProps = {
  colors: Colors;
  loading: boolean;
  upiId: string;
  setUpiId: (t: string) => void;
};

export const validateUpiId = (value: string) => {
  const v = value.trim().toLowerCase();
  const at = v.lastIndexOf("@");
  if (at <= 0) return false;

  const left = v.slice(0, at);
  const handle = v.slice(at);

  if (!VALIDATION.UPI.ID_PATTERN.test(left)) return false;

  return ALLOWED_UPI_HANDLES.includes(handle as any);
};

export function UpiDetailsSection({
  colors,
  loading,
  upiId,
  setUpiId,
}: UpiDetailsProps) {
  return (
    <View
      style={[
        paymentFormStyles.card,
        { backgroundColor: colors.background, borderColor: colors.border },
      ]}
    >
      <Text
        style={[paymentFormStyles.sectionTitle, { color: colors.text }]}
      >
        UPI Details
      </Text>

      <Text style={[paymentFormStyles.label, { color: colors.textSecondary }]}>
        UPI ID (example: {PLACEHOLDERS.UPI_ID})
      </Text>

      <PaymentInputField
        value={upiId}
        onChangeText={setUpiId}
        placeholder={PLACEHOLDERS.UPI_ID}
        editable={!loading}
        colors={colors}
      />

      <Text
        style={{ marginTop: 10, color: colors.textSecondary, fontSize: 12 }}
      >
        Supported handles: {ALLOWED_UPI_HANDLES.join(" ")}
      </Text>
    </View>
  );
}
