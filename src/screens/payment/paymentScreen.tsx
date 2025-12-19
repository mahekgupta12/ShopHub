/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";

import { clearCart } from "../cart/cartSlice";
import { clearCheckoutForm } from "../../persistence/checkoutPersistence";

import { getAuthData } from "../../restapi/authHelpers";

import {
  PAYMENT_METHODS,
  ROUTES,
  ERROR_MESSAGES,
  VALIDATION,
  ORDER,
  SCREEN_TITLES,
  PAYMENT_TEXT,
  type PaymentMethod,
} from "../../constants/index";

import { OrderSummarySection } from "./paymentMethodForm";
import { CardDetailsSection, isValidExpiry } from "./cardDetailsSection";
import { UpiDetailsSection, validateUpiId } from "./upiDetailsSection";
import { CodDetailsSection } from "./codDetailsSection";

const FIREBASE_DB_URL =
  "https://shophub-f4dfe-default-rtdb.firebaseio.com";

type RouteParams = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  paymentMethod: PaymentMethod;
  items: any[];
  total: string;
};

export default function PaymentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = route.params as RouteParams;

  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);

  const [loading, setLoading] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [upiId, setUpiId] = useState("");
  const normalizedUpi = useMemo(() => upiId.trim().toLowerCase(), [upiId]);

  const isCardValid =
    cardName.trim().length >= VALIDATION.CARD.NAME_MIN_LENGTH &&
    cardNumber.length === VALIDATION.CARD.NUMBER_LENGTH &&
    isValidExpiry(expiry) &&
    (cvv.length === VALIDATION.CARD.CVV_MIN_LENGTH ||
      cvv.length === VALIDATION.CARD.CVV_MAX_LENGTH);

  const isUpiValid = useMemo(
    () => validateUpiId(normalizedUpi),
    [normalizedUpi]
  );

  const canProceed =
    params.paymentMethod === PAYMENT_METHODS.COD
      ? true
      : params.paymentMethod === PAYMENT_METHODS.CARD
      ? isCardValid
      : isUpiValid;

  const disableReason = useMemo(() => {
    if (params.paymentMethod === PAYMENT_METHODS.COD) return "";

    if (params.paymentMethod === PAYMENT_METHODS.CARD) {
      if (cardName.trim().length < VALIDATION.CARD.NAME_MIN_LENGTH)
        return PAYMENT_TEXT.DISABLE_NAME_ON_CARD;
      if (cardNumber.length !== VALIDATION.CARD.NUMBER_LENGTH)
        return PAYMENT_TEXT.DISABLE_CARD_NUMBER;
      if (!isValidExpiry(expiry)) return PAYMENT_TEXT.DISABLE_EXPIRY;
      if (
        !(
          cvv.length === VALIDATION.CARD.CVV_MIN_LENGTH ||
          cvv.length === VALIDATION.CARD.CVV_MAX_LENGTH
        )
      )
        return PAYMENT_TEXT.DISABLE_CVV;
      return "";
    }

    if (params.paymentMethod === PAYMENT_METHODS.UPI) {
      if (!normalizedUpi) return PAYMENT_TEXT.DISABLE_UPI_EMPTY;
      if (!isUpiValid) return PAYMENT_TEXT.DISABLE_UPI_INVALID;
      return "";
    }

    return "";
  }, [
    params.paymentMethod,
    cardName,
    cardNumber,
    expiry,
    cvv,
    normalizedUpi,
    isUpiValid,
  ]);

  const handleBack = () => navigation.goBack();

  const handleConfirmPayment = async () => {
    if (!canProceed || loading) return;

    try {
      setLoading(true);

      const { userId, idToken } = await getAuthData();

      const now = new Date();
      const orderId = `${ORDER.ID_PREFIX}${now.getTime()}`;
      const date = now.toLocaleDateString();
      const timestamp = now.getTime();

      await fetch(
        `${FIREBASE_DB_URL}/orders/${userId}/${orderId}.json?auth=${idToken}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            userId,
            total: params.total,
            date,
            items: params.items,
            timestamp,
            paymentMethod: params.paymentMethod,
            address: {
              fullName: params.fullName,
              phone: params.phone,
              street: params.street,
              city: params.city,
              zip: params.zip,
            },
          }),
        }
      );


      await fetch(
        `${FIREBASE_DB_URL}/carts/${userId}.json?auth=${idToken}`,
        { method: "DELETE" }
      );

      dispatch(clearCart());
      clearCheckoutForm();

      navigation.reset({
        index: 1,
        routes: [
          { name: ROUTES.CART_MAIN },
          {
            name: ROUTES.ORDER_CONFIRMATION,
            params: { orderId, total: params.total, date },
          },
        ],
      });
    } catch (e) {
      console.warn(e);

      Alert.alert(
        ERROR_MESSAGES.LOGIN_REQUIRED,
        ERROR_MESSAGES.PLEASE_LOG_IN
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ flex: 1, padding: 16 }}>
          <View style={styles.headerRow}>
            <Pressable
              onPress={handleBack}
              style={[
                styles.backBtn,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Ionicons name="chevron-back" size={22} color={colors.text} />
            </Pressable>

            <Text style={[styles.headerTitle, { color: colors.text }]}>
              {SCREEN_TITLES.PAYMENT}
            </Text>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 18 }}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            <OrderSummarySection
              colors={colors}
              items={params.items}
              total={params.total}
            />

            {params.paymentMethod === PAYMENT_METHODS.CARD && (
              <CardDetailsSection
                colors={colors}
                loading={loading}
                cardName={cardName}
                cardNumber={cardNumber}
                expiry={expiry}
                cvv={cvv}
                setCardName={setCardName}
                setCardNumber={setCardNumber}
                setExpiry={setExpiry}
                setCvv={setCvv}
              />
            )}

            {params.paymentMethod === PAYMENT_METHODS.UPI && (
              <UpiDetailsSection
                colors={colors}
                loading={loading}
                upiId={upiId}
                setUpiId={setUpiId}
              />
            )}

            {params.paymentMethod === PAYMENT_METHODS.COD && (
              <CodDetailsSection colors={colors} />
            )}
          </ScrollView>

          <View style={{ paddingTop: 12 }}>
            <Pressable
              disabled={!canProceed || loading}
              onPress={handleConfirmPayment}
              style={[
                styles.primaryBtn,
                {
                  backgroundColor: colors.primary,
                  opacity: !canProceed || loading ? 0.55 : 1,
                },
              ]}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.primaryText}>
                  {params.paymentMethod === PAYMENT_METHODS.COD
                    ? PAYMENT_TEXT.CONFIRM_ORDER_BUTTON
                    : PAYMENT_TEXT.PAY_AND_PLACE_ORDER_BUTTON}
                </Text>
              )}
            </Pressable>

            {!canProceed && !loading && disableReason ? (
              <Text
                style={{
                  marginTop: 10,
                  color: colors.textSecondary,
                  textAlign: "center",
                }}
              >
                {disableReason}
              </Text>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", alignItems: "center" },
  backBtn: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
  },
  primaryBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
