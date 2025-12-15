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

import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { clearCart } from "../cart/cartSlice";
import { clearCheckoutForm } from "../../persistence/checkoutPersistence";
import {
  ALLOWED_UPI_HANDLES,
  PAYMENT_METHODS,
  ROUTES,
  ERROR_MESSAGES,
  VALIDATION,
  ORDER,
  SCREEN_TITLES,
  FIREBASE_COLLECTIONS,
  type PaymentMethod,
} from "../../constants/index";
import { OrderSummarySection } from "./paymentMethodForm";
import { CardDetailsSection } from "./cardDetailsSection";
import { UpiDetailsSection } from "./upiDetailsSection";
import { CodDetailsSection } from "./codDetailsSection";

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

const isValidExpiry = (mmYY: string) => {
  if (!VALIDATION.CARD.EXPIRY_FORMAT.test(mmYY)) return false;

  const mm = +mmYY.slice(0, 2);
  const yy = +mmYY.slice(3, 5);
  if (mm < 1 || mm > 12) return false;

  const now = new Date();
  const cYY = now.getFullYear() % 100;
  const cMM = now.getMonth() + 1;

  return yy > cYY || (yy === cYY && mm >= cMM);
};

const validateUpiId = (value: string) => {
  const v = value.trim().toLowerCase();
  const at = v.lastIndexOf("@");
  if (at <= 0) return false;

  const left = v.slice(0, at);
  const handle = v.slice(at);

  if (!VALIDATION.UPI.ID_PATTERN.test(left)) return false;

  return ALLOWED_UPI_HANDLES.includes(handle as any);
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
    (cvv.length === VALIDATION.CARD.CVV_MIN_LENGTH || cvv.length === VALIDATION.CARD.CVV_MAX_LENGTH);

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
      if (cardName.trim().length < VALIDATION.CARD.NAME_MIN_LENGTH) return "Enter name on card (min 2 letters).";
      if (cardNumber.length !== VALIDATION.CARD.NUMBER_LENGTH) return "Card number must be exactly 16 digits.";
      if (!isValidExpiry(expiry)) return "Expiry must be valid MM/YY and not expired.";
      if (!(cvv.length === VALIDATION.CARD.CVV_MIN_LENGTH || cvv.length === VALIDATION.CARD.CVV_MAX_LENGTH)) return "CVV must be 3 or 4 digits.";
      return "";
    }

    if (params.paymentMethod === PAYMENT_METHODS.UPI) {
      if (!normalizedUpi) return "Enter a UPI ID.";
      if (!isUpiValid) return "Enter a valid UPI ID with supported handle.";
      return "";
    }

    return "";
  }, [params.paymentMethod, cardName, cardNumber, expiry, cvv, normalizedUpi, isUpiValid]);

  const handleBack = () => navigation.goBack();

  const handleConfirmPayment = async () => {
    if (!canProceed || loading) return;

    try {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) {
        Alert.alert(ERROR_MESSAGES.LOGIN_REQUIRED, ERROR_MESSAGES.PLEASE_LOG_IN);
        return;
      }

      const now = new Date();
      const orderId = `${ORDER.ID_PREFIX}${now.getTime()}`;

      const orderData = {
        id: orderId,
        userId: user.uid,
        items: params.items,
        total: params.total,
        createdAt: now.toISOString(),
        paymentMethod: params.paymentMethod,
        address: {
          fullName: params.fullName,
          phone: params.phone,
          street: params.street,
          city: params.city,
          zip: params.zip,
        },
      };

      await Promise.all([
        setDoc(doc(db, FIREBASE_COLLECTIONS.ORDERS, orderId), orderData),
        setDoc(
          doc(db, FIREBASE_COLLECTIONS.USER_ORDERS, `${user.uid}_${orderId}`),
          {
            orderId,
            userId: user.uid,
            total: params.total,
            createdAt: now.toISOString(),
          }
        ),
      ]);

      dispatch(clearCart());
      clearCheckoutForm();

      const date = now.toLocaleDateString();

      navigation.navigate(ROUTES.ORDER_CONFIRMATION, {
        orderId,
        total: params.total,
        date,
      });
    } catch (e) {
      console.warn(e);
      Alert.alert(ERROR_MESSAGES.PAYMENT_FAILED, ERROR_MESSAGES.PLEASE_TRY_AGAIN);
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
            <OrderSummarySection colors={colors} items={params.items} total={params.total} />

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
                    ? "Confirm Order"
                    : "Pay & Place Order"}
                </Text>
              )}
            </Pressable>

            {!canProceed && !loading ? (
              <Text style={{ marginTop: 10, color: colors.textSecondary, textAlign: "center" }}>
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
