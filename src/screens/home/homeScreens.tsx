import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchBar from "./searchBar";
import FilterIcon from "../../navigation/filter";
import { useProducts, type Product } from "./api";
import ProductView from "./productView";

import FilterDrawer from "./filterDrawer";

import { useSelector } from "react-redux";
import { RootState } from "../cart/cartStore";
import { getProfileTheme, type AppTheme } from "../profile/profileTheme";
import {
  APP_BRAND,
  CATEGORIES,
  COLORS,
  DEFAULTS,
  HOME_MESSAGES,
  ICON_NAMES,
  ICON_SIZES,
  VIEW_TYPES,
  type Category,
  type PriceRange,
  type ViewType,
} from "../../constants/index";

export default function HomeScreens() {
  const [query, setQuery] = useState("");
  const [viewType, setViewType] = useState<ViewType>(VIEW_TYPES.LIST);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    DEFAULTS.CATEGORY
  );
  const [priceRange, setPriceRange] = useState<PriceRange>({
    ...DEFAULTS.PRICE_RANGE,
  });

  const { products, loading, error } = useProducts();

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeStyles(colors);

  let filteredProducts: Product[] = products;


  if (selectedCategory !== CATEGORIES.ALL) {
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
        <Text style={styles.brand}>{APP_BRAND.NAME}</Text>

        <View style={styles.headerActions}>
          <Pressable
            style={[
              styles.iconChip,
              viewType === VIEW_TYPES.LIST && styles.activeChip,
            ]}
            onPress={() => setViewType(VIEW_TYPES.LIST)}
          >
            <Ionicons
              name={ICON_NAMES.LIST}
              size={ICON_SIZES.LARGE}
              color={viewType === VIEW_TYPES.LIST ? COLORS.WHITE : colors.textSecondary}
            />
          </Pressable>

          <Pressable
            style={[
              styles.iconChip,
              viewType === VIEW_TYPES.GRID && styles.activeChip,
            ]}
            onPress={() => setViewType(VIEW_TYPES.GRID)}
          >
            <Ionicons
              name={ICON_NAMES.GRID}
              size={ICON_SIZES.LARGE}
              color={viewType === VIEW_TYPES.GRID ? COLORS.WHITE : colors.textSecondary}
            />
          </Pressable>
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
          <Text style={styles.emptyText}>{HOME_MESSAGES.NO_PRODUCTS_FOUND}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          key={viewType}
          numColumns={viewType === VIEW_TYPES.GRID ? 2 : 1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductView item={item} viewType={viewType} />
          )}
          columnWrapperStyle={
            viewType === VIEW_TYPES.GRID ? styles.gridColumnWrapper : undefined
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
    gridColumnWrapper: { justifyContent: "space-between" },
    stateWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: { color: colors.danger },
    emptyText: { color: colors.textSecondary },
  });
