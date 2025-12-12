import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../Cart/cartStore';
import { getProfileTheme, type AppTheme } from '../Profile/profileTheme';
import { CATEGORY_OPTIONS } from '../../constants/filterOptions';

// const categoriesList = [
//   'All',
//   'Fragrances',
//   'Groceries',
//   'Furniture',
//   'Beauty',
// ];

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (category: string, min: number, max: number) => void;
  selectedCategory: string;
};

export default function FilterDrawer({
  visible,
  onClose,
  onApply,
  selectedCategory,
}: Props) {
  const [category, setCategory] = useState(selectedCategory);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeStyles(colors);
  const categoriesList = CATEGORY_OPTIONS;

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.drawer}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close-circle-outline" size={26} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeader}>Refine your product search</Text>

        {/* CATEGORY SECTION */}
        <Text style={styles.sectionTitle}>Category</Text>

  <View style={styles.categoriesContainer}>
          {categoriesList.map(cat => (
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

        {/* PRICE RANGE */}
        <Text style={styles.sectionTitle}>Price Range</Text>

        <View style={styles.priceContainer}>
          {/* MIN PRICE */}
          <View style={styles.priceRow}>
            <TouchableOpacity
              onPress={() => setMinPrice(Math.max(minPrice - 50, 0))}
              style={styles.priceButton}
            >
              <Text style={styles.priceButtonText}>-</Text>
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

          {/* MAX PRICE */}
          <View style={styles.priceRow}>
            <TouchableOpacity
              onPress={() => setMaxPrice(Math.max(maxPrice - 50, minPrice))}
              style={styles.priceButton}
            >
              <Text style={styles.priceButtonText}>-</Text>
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

        {/* FOOTER BUTTONS */}
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

const makeStyles = (colors: AppTheme) =>
  StyleSheet.create({
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

    drawer: {
      width: '80%',
      height: '100%',
      backgroundColor: colors.card,
      padding: 22,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },

    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    title: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginTop: 36,
    },

    subHeader: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
      marginBottom: 20,
    },

    sectionTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
    },

    radioRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
    },

    categoriesContainer: {
      marginTop: 10,
    },

    radioOuter: {
      height: 18,
      width: 18,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.muted,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },

    radioOuterActive: {
      borderColor: colors.primary,
    },

    radioInner: {
      height: 9,
      width: 9,
      borderRadius: 10,
      backgroundColor: colors.primary,
    },

    radioText: {
      fontSize: 15,
      color: colors.text,
    },

    priceContainer: {
      marginTop: 10,
      gap: 18,
    },

    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    priceButton: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },

    priceButtonText: {
      fontSize: 22,
      fontWeight: '600',
      color: colors.text,
    },

    priceValueBox: {
      flex: 1,
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    priceValue: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },

    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 35,
    },

    closeText: {
      fontSize: 16,
      color: colors.textSecondary,
    },

    applyBtn: {
      backgroundColor: colors.primary,
      paddingHorizontal: 22,
      paddingVertical: 10,
      borderRadius: 14,
    },

    applyText: {
      color: colors.card,
      fontSize: 16,
      fontWeight: '600',
    },
  });
