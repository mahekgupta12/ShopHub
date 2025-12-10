import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeItem } from "./cartSlice";
import styles from "./cartStyles";

export default function CartItem({ item }: any) {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.counterRow}>
          <TouchableOpacity onPress={() => dispatch(decreaseQty(item.id))}>
            <Ionicons name="remove-circle-outline" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity onPress={() => dispatch(increaseQty(item.id))}>
            <Ionicons name="add-circle-outline" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={() => dispatch(removeItem(item.id))}>
            <Ionicons name="trash-outline" size={22} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
