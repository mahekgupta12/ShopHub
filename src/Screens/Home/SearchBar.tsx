// src/Screens/Home/SearchBar.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  query: string;
  onChangeQuery: (text: string) => void;
  RightElement?: React.ReactNode;
};

export default function SearchBar({ query, onChangeQuery, RightElement }: Props) {
  return (
    <View style={styles.searchWrap}>
      <Ionicons name="search" size={18} color="#9CA3AF" />
      <TextInput
        placeholder="Search products..."
        value={query}
        onChangeText={onChangeQuery}
        placeholderTextColor="#9CA3AF"
        style={styles.searchInput}
      />
      {RightElement}
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    paddingVertical: 2,
  },
});
