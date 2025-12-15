import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
          <TouchableOpacity onPress={onClose}>
            <Ionicons
              name="close-circle-outline"
              size={26}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeader}>Refine your product search</Text>


        <Text style={styles.sectionTitle}>Category</Text>

        <View style={styles.categoriesContainer}>
          {categoriesList.map((cat) => (
            <TouchableOpacity
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
            </TouchableOpacity>
          ))}
        </View>


        <Text style={styles.sectionTitle}>Price Range</Text>

        <View style={styles.priceContainer}>

          <View style={styles.priceRow}>
            <TouchableOpacity
              onPress={() => setMinPrice(Math.max(minPrice - 50, 0))}
              style={styles.priceButton}
            >
              <Text style={styles.priceButtonText}>−</Text>
            </TouchableOpacity>

            <View style={styles.priceValueBox}>
              <Text style={styles.priceValue}>${minPrice}</Text>
            </View>

            <TouchableOpacity
              onPress={() => setMinPrice(minPrice + 50)}
              style={styles.priceButton}
            >
              <Text style={styles.priceButtonText}>+</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.priceRow}>
            <TouchableOpacity
              onPress={() => setMaxPrice(Math.max(maxPrice - 50, minPrice))}
              style={styles.priceButton}
            >
              <Text style={styles.priceButtonText}>−</Text>
            </TouchableOpacity>

            <View style={styles.priceValueBox}>
              <Text style={styles.priceValue}>${maxPrice}</Text>
            </View>

            <TouchableOpacity
              onPress={() => setMaxPrice(maxPrice + 50)}
              style={styles.priceButton}
            >
              <Text style={styles.priceButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.footer}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onApply(category, minPrice, maxPrice)}
            style={styles.applyBtn}
          >
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
