import React from "react";
import { View, Text } from "react-native";
import { PLACEHOLDERS, VALIDATION } from "../../constants/index";
import {
  PaymentInputField,
  paymentFormStyles,
  type Colors,
} from "./paymentMethodForm";

const onlyDigits = (s: string) => s.replace(/\D/g, "");

const formatExpiryLive = (raw: string) => {
  const d = onlyDigits(raw).slice(0, 4); // MMYY
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
};

type CardDetailsProps = {
  colors: Colors;
  loading: boolean;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  setCardName: (t: string) => void;
  setCardNumber: (t: string) => void;
  setExpiry: (t: string) => void;
  setCvv: (t: string) => void;
};

export function CardDetailsSection({
  colors,
  loading,
  cardName,
  cardNumber,
  expiry,
  cvv,
  setCardName,
  setCardNumber,
  setExpiry,
  setCvv,
}: CardDetailsProps) {
  return (
    <View
      style={[
        paymentFormStyles.card,
        { backgroundColor: colors.background, borderColor: colors.border },
      ]}
    >
      <Text style={{ fontSize: 16, fontWeight: "800", color: colors.text }}>
        Card Details
      </Text>

      <Text style={[paymentFormStyles.label, { color: colors.textSecondary }]}>
        Name on Card
      </Text>
      <PaymentInputField
        value={cardName}
        onChangeText={setCardName}
        placeholder={PLACEHOLDERS.CARD_NAME}
        editable={!loading}
        colors={colors}
      />

      <Text style={[paymentFormStyles.label, { color: colors.textSecondary }]}>
        Card Number
      </Text>
      <PaymentInputField
        value={cardNumber}
        onChangeText={(t) =>
          setCardNumber(onlyDigits(t).slice(0, VALIDATION.CARD.NUMBER_LENGTH))
        }
        placeholder={PLACEHOLDERS.CARD_NUMBER}
        editable={!loading}
        colors={colors}
        keyboardType="number-pad"
        maxLength={VALIDATION.CARD.NUMBER_LENGTH}
      />

      <View style={paymentFormStyles.twoCol}>
        <View style={{ flex: 1 }}>
          <Text
            style={[paymentFormStyles.label, { color: colors.textSecondary }]}
          >
            Expiry (MM/YY)
          </Text>
          <PaymentInputField
            value={expiry}
            onChangeText={(t) => setExpiry(formatExpiryLive(t))}
            placeholder={PLACEHOLDERS.EXPIRY}
            editable={!loading}
            colors={colors}
            keyboardType="number-pad"
            maxLength={5}
          />
        </View>

        <View style={{ width: 12 }} />

        <View style={{ flex: 1 }}>
          <Text
            style={[paymentFormStyles.label, { color: colors.textSecondary }]}
          >
            CVV
          </Text>
          <PaymentInputField
            value={cvv}
            onChangeText={(t) => setCvv(onlyDigits(t).slice(0, 4))}
            placeholder={PLACEHOLDERS.CVV}
            editable={!loading}
            colors={colors}
            keyboardType="number-pad"
            maxLength={VALIDATION.CARD.CVV_MAX_LENGTH}
            secureTextEntry
          />
        </View>
      </View>
    </View>
  );
}

