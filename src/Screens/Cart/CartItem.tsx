import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeItem } from "./cartSlice";

import makeCartStyles from "./cartStyles";
import { RootState } from "./cartStore";
import { getProfileTheme } from "../Profile/profileTheme";

export default function CartItem({ item }: any) {
  const dispatch = useDispatch();

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeCartStyles(colors);

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        <View style={styles.counterRow}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => dispatch(decreaseQty(item.id))}
          >
            <Ionicons name="remove" size={16} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => dispatch(increaseQty(item.id))}
          >
            <Ionicons name="add" size={16} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(removeItem(item.id))}
            style={styles.deleteBtn}
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
