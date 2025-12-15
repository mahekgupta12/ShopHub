/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState, memo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./CartStore";
import { getProfileTheme } from "../profile/ProfileTheme";

import { auth, db } from "../../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { clearCart } from "./CartSlice";
import { clearCheckoutForm } from "../../persistence/CheckoutPersistence";
import {
  ALLOWED_UPI_HANDLES,
  PAYMENT_METHODS,
  ROUTES,
  ERROR_MESSAGES,
  VALIDATION,
  ORDER,
  SCREEN_TITLES,
  PLACEHOLDERS,
  FIREBASE_COLLECTIONS,
  type PaymentMethod,
} from "../../constants/Index";


const onlyDigits = (s: string) => s.replace(/\D/g, "");

const formatExpiryLive = (raw: string) => {
  const d = onlyDigits(raw).slice(0, 4); // MMYY
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
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


type InputFieldProps = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  editable: boolean;
  colors: any;
  keyboardType?: any;
  maxLength?: number;
  secureTextEntry?: boolean;
};

const InputField = memo(function InputField({
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

  const isUpiValid = validateUpiId(normalizedUpi);

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
      if (!(cvv.length === VALIDATION.CARD.CVV_MIN_LENGTH || cvv.length === VALIDATION.CARD.CVV_MAX_LENGTH)) return "CVV must be 3–4 digits.";
      return "";
    }

    
    if (!normalizedUpi) return `Enter UPI ID (example: ${PLACEHOLDERS.UPI_ID}).`;
    if (!validateUpiId(normalizedUpi)) return "UPI handle not supported. Check @bank part.";
    return "";
  }, [params.paymentMethod, cardName, cardNumber, expiry, cvv, normalizedUpi]);

  const handleConfirmPayment = async () => {
    
    if (!canProceed) {
      Alert.alert(ERROR_MESSAGES.INVALID_PAYMENT_DETAILS, disableReason || ERROR_MESSAGES.PLEASE_CHECK_DETAILS);
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert(ERROR_MESSAGES.LOGIN_REQUIRED, ERROR_MESSAGES.PLEASE_LOG_IN);
      return;
    }

    try {
      setLoading(true);

      const orderId = `${ORDER.ID_PREFIX}${Date.now()}`;
      const date = new Date().toISOString().slice(0, 10);

      await setDoc(doc(db, FIREBASE_COLLECTIONS.ORDERS, userId, FIREBASE_COLLECTIONS.USER_ORDERS, orderId), {
        orderId,
        userId,
        items: params.items,
        total: params.total,
        date,
        paymentMethod: params.paymentMethod,
        paymentDetails:
          params.paymentMethod === PAYMENT_METHODS.CARD
            ? {
                cardName: cardName.trim(),
                last4: cardNumber.slice(-4),
                expiry,
              }
            : params.paymentMethod === PAYMENT_METHODS.UPI
            ? { upiId: normalizedUpi }
            : { cod: true },
        address: {
          fullName: params.fullName,
          phone: params.phone,
          street: params.street,
          city: params.city,
          zip: params.zip,
        },
        timestamp: Date.now(),
      });

      dispatch(clearCart());
      await clearCheckoutForm();

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
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.backBtn,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Ionicons name="chevron-back" size={22} color={colors.text} />
            </TouchableOpacity>

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

            <View
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.text }}>
                Order Summary
              </Text>

              <Text style={{ marginTop: 10, color: colors.textSecondary }}>
                Total Amount
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "900",
                  color: colors.primary,
                  marginTop: 4,
                }}
              >
                ${params.total}
              </Text>
            </View>


            {params.paymentMethod === PAYMENT_METHODS.CARD && (
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Card Details
                </Text>

                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Name on Card
                </Text>
                <InputField
                  value={cardName}
                  onChangeText={setCardName}
                  placeholder={PLACEHOLDERS.CARD_NAME}
                  editable={!loading}
                  colors={colors}
                />

                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Card Number (16 digits)
                </Text>
                <InputField
                  value={cardNumber}
                  onChangeText={(t) => setCardNumber(onlyDigits(t).slice(0, VALIDATION.CARD.NUMBER_LENGTH))}
                  placeholder={PLACEHOLDERS.CARD_NUMBER}
                  editable={!loading}
                  colors={colors}
                  keyboardType="number-pad"
                      maxLength={VALIDATION.CARD.NUMBER_LENGTH}
                />

                <View style={styles.twoCol}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.label, { color: colors.textSecondary }]}>
                      Expiry (MM/YY)
                    </Text>
                    <InputField
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
                    <Text style={[styles.label, { color: colors.textSecondary }]}>
                      CVV
                    </Text>
                    <InputField
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
            )}


            {params.paymentMethod === PAYMENT_METHODS.UPI && (
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  UPI Details
                </Text>

                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  UPI ID (example: {PLACEHOLDERS.UPI_ID})
                </Text>

                <InputField
                  value={upiId}
                  onChangeText={setUpiId}
                  placeholder={PLACEHOLDERS.UPI_ID}
                  editable={!loading}
                  colors={colors}
                />

                <Text style={{ marginTop: 10, color: colors.textSecondary, fontSize: 12 }}>
                  Supported handles: {ALLOWED_UPI_HANDLES.join(" ")}
                </Text>
              </View>
            )}


            {params.paymentMethod === PAYMENT_METHODS.COD && (
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Cash on Delivery
                </Text>
                <Text style={{ marginTop: 8, color: colors.textSecondary }}>
                  Cash on Delivery selected. You will pay when the order is delivered.
                </Text>
              </View>
            )}
          </ScrollView>

          
          <View style={{ paddingTop: 12 }}>
            <TouchableOpacity
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
            </TouchableOpacity>

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

  primaryBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
