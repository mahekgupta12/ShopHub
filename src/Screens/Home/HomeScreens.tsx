import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchBar from "./SearchBar";
import FilterIcon from "../../Navigation/Filter";
import { useProducts } from "./Api";
import ProductView from "./ProductView";

export default function HomeScreens() {
  const [query, setQuery] = useState("");
  const [viewType, setViewType] = useState<"list" | "grid">("list");

  const { products, loading, error } = useProducts();

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const showEmpty =
    !loading && !error && filteredProducts.length === 0 && query.length > 0;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.brand}>ShopHub</Text>

        <View style={styles.headerActions}>
          {/* List View Button */}
          <TouchableOpacity
            style={[
              styles.iconChip,
              viewType === "list" && styles.activeChip,
            ]}
            onPress={() => setViewType("list")}
          >
            <Ionicons name="list" size={18} color="#4B5563" />
          </TouchableOpacity>

          {/* Grid View Button */}
          <TouchableOpacity
            style={[
              styles.iconChip,
              viewType === "grid" && styles.activeChip,
            ]}
            onPress={() => setViewType("grid")}
          >
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

      {/* Products Section */}
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
          key={viewType} // re-render flatlist
          numColumns={viewType === "grid" ? 2 : 1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductView item={item} viewType={viewType} />
          )}
          columnWrapperStyle={
            // eslint-disable-next-line react-native/no-inline-styles
            viewType === "grid" ? { justifyContent: "space-between" } : undefined
          }
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  brand: {
    fontSize: 28,
    fontWeight: "800",
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
  activeChip: {
    backgroundColor: "#DBEAFE",
  },

  listContent: { paddingBottom: 20 },

  stateWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: { color: "#B91C1C" },
  emptyText: { color: "#6B7280" },
});
