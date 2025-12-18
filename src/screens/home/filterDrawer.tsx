import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppPressable from "../../componets/appPressables";

import { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";
import {
  CATEGORY_OPTIONS,
  DEFAULTS,
  type Category,
} from "../../constants/index";
import { makeStyles } from "./filterStyles";

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (category: Category, min: number, max: number) => void;
  selectedCategory: Category;
};

export default function FilterDrawer({
  visible,
  onClose,
  onApply,
  selectedCategory,
}: Props) {
  const [category, setCategory] = useState<Category>(selectedCategory);
  const [minPrice, setMinPrice] = useState<number>(DEFAULTS.PRICE_RANGE.min);
  const [maxPrice, setMaxPrice] = useState<number>(DEFAULTS.PRICE_RANGE.max);

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeStyles(colors);

  const insets = useSafeAreaInsets();
  const categoriesList = CATEGORY_OPTIONS;
  const drawerInsetsStyle = useMemo(
    () => ({
      top: insets.top,
      paddingBottom: insets.bottom,
    }),
    [insets.bottom, insets.top]
  );

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View
        style={[styles.drawer, styles.drawerFullHeight, drawerInsetsStyle]}
      >

        <View style={styles.headerRow}>
          <Text style={styles.title}>Filters</Text>
          <AppPressable onPress={onClose}>
            <Ionicons
              name="close-circle-outline"
              size={26}
              color={colors.textSecondary}
            />
          </AppPressable>
        </View>

        <Text style={styles.subHeader}>Refine your product search</Text>


        <Text style={styles.sectionTitle}>Category</Text>

        <View style={styles.categoriesContainer}>
          {categoriesList.map((cat) => (
            <AppPressable
              key={cat}
              onPress={() => setCategory(cat)}
              style={styles.radioRow}
            >
              <View
                style={[
                  styles.radioOuter,
                  category === cat && styles.radioOuterActive,
                ]}
              >
                {category === cat && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>{cat}</Text>
            </AppPressable>
          ))}
        </View>


        <Text style={styles.sectionTitle}>Price Range</Text>

        <View style={styles.priceContainer}>

          <View style={styles.priceRow}>
            <AppPressable
              onPress={() => setMinPrice(Math.max(minPrice - 50, 0))}
              style={styles.priceButton}
            >
              <Text style={styles.priceButtonText}>−</Text>
            </AppPressable>

            <View style={styles.priceValueBox}>
              <Text style={styles.priceValue}>${minPrice}</Text>
            </View>

            <AppPressable
              onPress={() => setMinPrice(minPrice + 50)}
              style={styles.priceButton}
            >
              <Text style={styles.priceButtonText}>+</Text>
            </AppPressable>
          </View>


          <View style={styles.priceRow}>
            <AppPressable
              onPress={() => setMaxPrice(Math.max(maxPrice - 50, minPrice))}
              style={styles.priceButton}
            >
              <Text style={styles.priceButtonText}>−</Text>
            </AppPressable>

            <View style={styles.priceValueBox}>
              <Text style={styles.priceValue}>${maxPrice}</Text>
            </View>

            <AppPressable
              onPress={() => setMaxPrice(maxPrice + 50)}
              style={styles.priceButton}
            >
              <Text style={styles.priceButtonText}>+</Text>
            </AppPressable>
          </View>
        </View>


        <View style={styles.footer}>
          <AppPressable onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </AppPressable>

          <AppPressable
            onPress={() => onApply(category, minPrice, maxPrice)}
            style={styles.applyBtn}
          >
            <Text style={styles.applyText}>Apply</Text>
          </AppPressable>
        </View>
      </View>
    </View>
  );
}
