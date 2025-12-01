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
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        <View style={styles.counterRow}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => dispatch(decreaseQty(item.id))}
          >
            <Ionicons name="remove" size={16} color="#374151" />
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => dispatch(increaseQty(item.id))}
          >
            <Ionicons name="add" size={16} color="#374151" />
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
