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
import { RootState } from "./cartStore";
import { getProfileTheme } from "../Profile/profileTheme";

import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { clearCart } from "./cartSlice";
import { clearCheckoutForm } from "../../persistence/checkoutPersistence";
import { allowedUpiHandles } from "../../constants/upiHandles";


const onlyDigits = (s: string) => s.replace(/\D/g, "");

const formatExpiryLive = (raw: string) => {
  const d = onlyDigits(raw).slice(0, 4); // MMYY
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
};

const isValidExpiry = (mmYY: string) => {
  if (!/^\d{2}\/\d{2}$/.test(mmYY)) return false;

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


  if (!/^[a-z0-9._-]{2,}$/.test(left)) return false;

  return allowedUpiHandles.includes(handle as any);
};

type RouteParams = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  paymentMethod: "card" | "upi" | "cod";
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
    cardName.trim().length >= 2 &&
    cardNumber.length === 16 &&
    isValidExpiry(expiry) &&
    (cvv.length === 3 || cvv.length === 4);

  const isUpiValid = validateUpiId(normalizedUpi);

  const canProceed =
    params.paymentMethod === "cod"
      ? true
      : params.paymentMethod === "card"
      ? isCardValid
      : isUpiValid;

  const disableReason = useMemo(() => {
    if (params.paymentMethod === "cod") return "";

    if (params.paymentMethod === "card") {
      if (cardName.trim().length < 2) return "Enter name on card (min 2 letters).";
      if (cardNumber.length !== 16) return "Card number must be exactly 16 digits.";
      if (!isValidExpiry(expiry)) return "Expiry must be valid MM/YY and not expired.";
      if (!(cvv.length === 3 || cvv.length === 4)) return "CVV must be 3–4 digits.";
      return "";
    }

    
    if (!normalizedUpi) return "Enter UPI ID (example: 987654321@icici).";
    if (!validateUpiId(normalizedUpi)) return "UPI handle not supported. Check @bank part.";
    return "";
  }, [params.paymentMethod, cardName, cardNumber, expiry, cvv, normalizedUpi]);

  const handleConfirmPayment = async () => {
    
    if (!canProceed) {
      Alert.alert("Invalid Payment Details", disableReason || "Please check your details.");
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Login required", "Please log in to continue.");
      return;
    }

    try {
      setLoading(true);

      const orderId = `ORD-${Date.now()}`;
      const date = new Date().toISOString().slice(0, 10);

      await setDoc(doc(db, "orders", userId, "userOrders", orderId), {
        orderId,
        userId,
        items: params.items,
        total: params.total,
        date,
        paymentMethod: params.paymentMethod,
        paymentDetails:
          params.paymentMethod === "card"
            ? {
                cardName: cardName.trim(),
                last4: cardNumber.slice(-4),
                expiry,
              }
            : params.paymentMethod === "upi"
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

      navigation.navigate("OrderConfirmation", {
        orderId,
        total: params.total,
        date,
      });
    } catch (e) {
      console.warn(e);
      Alert.alert("Payment failed", "Please try again.");
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
              Payment
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


            {params.paymentMethod === "card" && (
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
                  placeholder="John Doe"
                  editable={!loading}
                  colors={colors}
                />

                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Card Number (16 digits)
                </Text>
                <InputField
                  value={cardNumber}
                  onChangeText={(t) => setCardNumber(onlyDigits(t).slice(0, 16))}
                  placeholder="1234567812345678"
                  editable={!loading}
                  colors={colors}
                  keyboardType="number-pad"
                  maxLength={16}
                />

                <View style={styles.twoCol}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.label, { color: colors.textSecondary }]}>
                      Expiry (MM/YY)
                    </Text>
                    <InputField
                      value={expiry}
                      onChangeText={(t) => setExpiry(formatExpiryLive(t))}
                      placeholder="MM/YY"
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
                      placeholder="123"
                      editable={!loading}
                      colors={colors}
                      keyboardType="number-pad"
                      maxLength={4}
                      secureTextEntry
                    />
                  </View>
                </View>
              </View>
            )}


            {params.paymentMethod === "upi" && (
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
                  UPI ID (example: 987654321@icici)
                </Text>

                <InputField
                  value={upiId}
                  onChangeText={setUpiId}
                  placeholder="987654321@icici"
                  editable={!loading}
                  colors={colors}
                />

                <Text style={{ marginTop: 10, color: colors.textSecondary, fontSize: 12 }}>
                  Supported handles: {allowedUpiHandles.join(" ")}
                </Text>
              </View>
            )}


            {params.paymentMethod === "cod" && (
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
                  {params.paymentMethod === "cod"
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
