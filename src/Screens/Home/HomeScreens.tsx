import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color="#9CA3AF" />
        <TextInput
          placeholder="Search products..."
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterChip} activeOpacity={0.8}>
          <Ionicons name="options" size={18} color="#4B5563" />
        </TouchableOpacity>
      </View>

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

  /* Search */
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
  searchInput: { flex: 1, fontSize: 16, color: "#111827", paddingVertical: 2 },
  filterChip: {
    height: 36,
    width: 36,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Empty content placeholder */
  emptyArea: {
    flex: 1,
    // add future content here
  },
});
