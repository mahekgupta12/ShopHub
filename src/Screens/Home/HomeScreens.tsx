// src/Screens/Home/HomeScreens.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchBar from "./SearchBar";

export default function HomeScreens() {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.brand}>ShopHub</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconChip} activeOpacity={0.8}>
            <Ionicons name="list" size={18} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconChip} activeOpacity={0.8}>
            <Ionicons name="grid" size={18} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search (without FilterIcon now) */}
      <SearchBar
        query={query}
        onChangeQuery={setQuery}
      />

      {/* Content area (empty for now) */}
      <View style={styles.emptyArea}>
        {/* keep this container for future sections (filters, categories, etc.) */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 60,
  },

  /* Header */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  brand: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },
  headerActions: { flexDirection: "row", gap: 10 },
  iconChip: {
    height: 36,
    width: 36,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyArea: {
    flex: 1,
  },
});
