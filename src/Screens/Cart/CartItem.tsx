import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeItem } from "./cartSlice";
import styles from "./cartStyles";

type CartItemType = {
  id: number | string;
  thumbnail?: string;
  title?: string;
  price?: number;
  quantity?: number;
};

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.counterRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={() => dispatch(decreaseQty(item.id))}>
            <Ionicons name="remove" size={18} />
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity style={styles.circleBtn} onPress={() => dispatch(increaseQty(item.id))}>
            <Ionicons name="add" size={18} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={() => dispatch(removeItem(item.id))}>
            <Ionicons name="trash-outline" size={22} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
