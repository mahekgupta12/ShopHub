// src/Screens/Home/HomeScreens.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import SearchBar from "./SearchBar";
import FilterIcon from "../../Navigation/Filter";
import { useProducts, Product } from "./Api";

export default function HomeScreens() {
  const [query, setQuery] = useState("");
  const { products, loading, error } = useProducts();

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />

      <View style={styles.cardBody}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FBBF24" />
          <Text style={styles.ratingText}>
            {item.rating ? item.rating.toFixed(1) : "-"}
          </Text>
        </View>

        <View style={styles.cardFooterRow}>
          <Text style={styles.priceText}>
            ${item.price ? item.price.toFixed(2) : "0.00"}
          </Text>

          <TouchableOpacity style={styles.addButton} activeOpacity={0.85}>
            <Ionicons name="add" size={16} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const showEmpty =
    !loading && !error && filteredProducts.length === 0 && query.length > 0;

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

      {/* Search + Filter */}
      <SearchBar
        query={query}
        onChangeQuery={setQuery}
        RightElement={<FilterIcon />}
      />

      {/* Products list / states */}
      {loading && products.length === 0 ? (
        <View style={styles.stateWrapper}>
          <ActivityIndicator size="small" />
        </View>
      ) : error ? (
        <View style={styles.stateWrapper}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : showEmpty ? (
        <View style={styles.stateWrapper}>
          <Text style={styles.emptyText}>No products found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
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

  /* List */
  listContent: {
    paddingBottom: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  productImage: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    marginRight: 12,
  },
  cardBody: {
    flex: 1,
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#6B7280",
  },
  cardFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 4,
  },

  /* States */
  stateWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 14,
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
  },
});
