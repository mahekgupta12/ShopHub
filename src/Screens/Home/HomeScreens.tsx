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

import FilterDrawer from "./FilterDrawer";

import { useSelector } from "react-redux";
import { RootState } from "../Cart/cartStore";
import { getProfileTheme, type AppTheme } from "../Profile/profileTheme";

export default function HomeScreens() {
  const [query, setQuery] = useState("");
  const [viewType, setViewType] = useState<"list" | "grid">("list");

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  const { products, loading, error } = useProducts();

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeStyles(colors);

  let filteredProducts = products;


  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }


  filteredProducts = filteredProducts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );


  filteredProducts = filteredProducts.filter(
    (p) => p.price >= priceRange.min && p.price <= priceRange.max
  );

  const showEmpty =
    !loading && !error && filteredProducts.length === 0 && query.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.brand}>ShopHub</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[
              styles.iconChip,
              viewType === "list" && styles.activeChip,
            ]}
            onPress={() => setViewType("list")}
          >
            <Ionicons
              name="list"
              size={18}
              color={viewType === "list" ? "#FFFFFF" : colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconChip,
              viewType === "grid" && styles.activeChip,
            ]}
            onPress={() => setViewType("grid")}
          >
            <Ionicons
              name="grid"
              size={18}
              color={viewType === "grid" ? "#FFFFFF" : colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>


      <SearchBar
        query={query}
        onChangeQuery={setQuery}
        RightElement={<FilterIcon onPress={() => setDrawerVisible(true)} />}
      />


      {loading ? (
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
          key={viewType}
          numColumns={viewType === "grid" ? 2 : 1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductView item={item} viewType={viewType} />
          )}
          columnWrapperStyle={
            viewType === "grid"
              // eslint-disable-next-line react-native/no-inline-styles
              ? { justifyContent: "space-between" }
              : undefined
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}


      <FilterDrawer
        visible={drawerVisible}
        selectedCategory={selectedCategory}
        onClose={() => setDrawerVisible(false)}
        onApply={(cat, min, max) => {
          setSelectedCategory(cat);
          setPriceRange({ min, max });
          setDrawerVisible(false);
        }}
      />
    </View>
  );
}

const makeStyles = (colors: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      color: colors.text,
    },
    headerActions: { flexDirection: "row", gap: 10 },
    iconChip: {
      height: 36,
      width: 36,
      borderRadius: 12,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeChip: { backgroundColor: colors.primary },
    listContent: { paddingBottom: 20 },
    stateWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: { color: colors.danger },
    emptyText: { color: colors.textSecondary },
  });
