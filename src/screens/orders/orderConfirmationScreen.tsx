import React from "react";
import { View, Text, Pressable } from "react-native";
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
} from "../../constants/index";

type RouteParams = {
  orderId: string;
  total: string;
  date: string;
};

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

          <Pressable
            style={styles.primaryBtn}
            activeOpacity={0.9}
            onPress={handleViewOrders}
          >
            <Text style={styles.primaryText}>
              {ORDER_CONFIRMATION_TEXT.VIEW_ORDERS}
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryBtn}
            activeOpacity={0.9}
            onPress={handleContinueShopping}
          >
            <Text style={styles.secondaryText}>
              {ORDER_CONFIRMATION_TEXT.CONTINUE_SHOPPING}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
