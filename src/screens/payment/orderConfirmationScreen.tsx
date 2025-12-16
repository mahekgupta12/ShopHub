import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSelector } from "react-redux";
import { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";

import makeOrderConfirmationStyles from "./orderConfirmationStyles";
import OrderInfoBox from "./orderInfoBox";
import {
  ROUTES,
  ORDER_CONFIRMATION_TEXT,
  ERROR_MESSAGES,
  ORDER,
  FIREBASE_COLLECTIONS,
} from "../../constants/index";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { clearCart } from "../cart/cartSlice";
import { clearCheckoutForm } from "../../persistence/checkoutPersistence";

type PaymentRouteParams = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  paymentMethod: any;
  items: any[];
  total: string;
};

type RouteParams = {
  orderId: string;
  total: string;
  date: string;
};

export async function confirmOrderFromPayment({
  navigation,
  params,
  dispatch,
}: {
  navigation: any;
  params: PaymentRouteParams;
  dispatch: any;
}) {
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
}

export default function OrderConfirmationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { orderId, total, date } = route.params as RouteParams;

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeOrderConfirmationStyles(colors);

  const resetCartStackToMain = () => {
    navigation.popToTop();
  };

  const handleViewOrders = () => {
    resetCartStackToMain();
    navigation.getParent()?.navigate(ROUTES.ORDERS);
  };

  const handleContinueShopping = () => {
    resetCartStackToMain();
    navigation.getParent()?.navigate(ROUTES.HOME);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.outer}>
        <View style={styles.card}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Ionicons name="checkmark" size={32} color="#16A34A" />
            </View>
          </View>

          <Text style={styles.title}>{ORDER_CONFIRMATION_TEXT.TITLE}</Text>
          <Text style={styles.subtitle}>
            {ORDER_CONFIRMATION_TEXT.SUBTITLE}
          </Text>

          <OrderInfoBox orderId={orderId} total={total} date={date} />

          <Pressable style={styles.primaryBtn} onPress={handleViewOrders}>
            <Text style={styles.primaryText}>
              {ORDER_CONFIRMATION_TEXT.VIEW_ORDERS}
            </Text>
          </Pressable>

          <Pressable style={styles.secondaryBtn} onPress={handleContinueShopping}>
            <Text style={styles.secondaryText}>
              {ORDER_CONFIRMATION_TEXT.CONTINUE_SHOPPING}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
