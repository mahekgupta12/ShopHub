import React from "react";
import { View, Text, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import AppPressable from "../../components/appPressables";

import {
  increaseQty,
  decreaseQty,
  removeItem,
  type CartItem as CartItemType,
} from "./cartSlice";
import makeCartStyles from "./cartStyles";
import { RootState } from "./cartStore";
import { getProfileTheme } from "../profile/profileTheme";
import { CardContainer, QuantitySelector } from "../../components/sharedComponents";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCartStyles(colors);

  const price = item.price ?? 0;
  const quantity = item.quantity ?? 0;

  return (
    <CardContainer colors={colors} style={styles.card}>
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
      ) : null}

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => dispatch(decreaseQty(item.id))}
            onIncrease={() => dispatch(increaseQty(item.id))}
            colors={colors}
            styles={styles}
          />

          <AppPressable
            style={styles.deleteBtn}
            onPress={() => dispatch(removeItem(item.id))}
          >
            <Ionicons name="trash-outline" size={22} color="#EF4444" />
          </AppPressable>
        </View>
      </View>
    </CardContainer>
  );
}
