import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQty,
  decreaseQty,
  removeItem,
  type CartItem as CartItemType,
} from "./CartSlice";
import makeCartStyles from "./CartStyles";
import { RootState } from "./CartStore";
import { getProfileTheme } from "../profile/ProfileTheme";

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
    <View style={styles.card}>
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
      ) : null}

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>

        <View style={styles.counterRow}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => dispatch(decreaseQty(item.id))}
          >
            <Ionicons name="remove" size={18} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.qty}>{quantity}</Text>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => dispatch(increaseQty(item.id))}
          >
            <Ionicons name="add" size={18} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => dispatch(removeItem(item.id))}
          >
            <Ionicons name="trash-outline" size={22} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
