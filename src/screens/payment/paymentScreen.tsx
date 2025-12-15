/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState, memo } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Pressable,
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
  PLACEHOLDERS,
  FIREBASE_COLLECTIONS,
  type PaymentMethod,
} from "../../constants/index";


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

            <View
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.text }}>
                Order Summary
              </Text>

              <View style={{ marginTop: 10 }}>
                {params.items.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <Text style={{ color: colors.textSecondary }}>
                      {item.title} × {item.quantity}
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
                  ${params.total}
                </Text>
              </View>
            </View>


            {params.paymentMethod === PAYMENT_METHODS.CARD && (
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text style={{ fontSize: 16, fontWeight: "800", color: colors.text }}>
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
                  Card Number
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

