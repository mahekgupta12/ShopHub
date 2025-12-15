import React from "react";
import { View, Text } from "react-native";
import { paymentFormStyles, type Colors } from "./paymentMethodForm";

type CodDetailsProps = {
  colors: Colors;
};

export function CodDetailsSection({ colors }: CodDetailsProps) {
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
        Cash on Delivery
      </Text>
      <Text style={{ marginTop: 8, color: colors.textSecondary }}>
        Cash on Delivery selected. You will pay when the order is delivered.
      </Text>
    </View>
  );
}

