import React from "react";
import { View, Text } from "react-native";
import { PAYMENT_TEXT } from "../../constants/index";
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
      <Text style={[paymentFormStyles.sectionTitle, { color: colors.text }]}>
        {PAYMENT_TEXT.COD_TITLE}
      </Text>
      <Text style={{ marginTop: 8, color: colors.textSecondary }}>
        {PAYMENT_TEXT.COD_DESCRIPTION}
      </Text>
    </View>
  );
}
