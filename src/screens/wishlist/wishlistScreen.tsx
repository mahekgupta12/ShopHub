import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import WishlistItem from "./wishlistItem";
import { RootState } from "../cart/cartStore";
import { useLoadWishlist } from "./useLoadWishlist";

import makeWishlistStyles from "./wishlistStyles";
import { getProfileTheme } from "../profile/profileTheme";
import {
  SCREEN_TITLES,
  EMPTY_STATE_MESSAGES,
} from "../../constants/index";
import EmptyState from "../../components/emptyState";

export default function WishlistScreen() {
  const navigation = useNavigation();
  useLoadWishlist();

  const { items } = useSelector((state: RootState) => state.wishlist);

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeWishlistStyles(colors);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [items]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={[styles.container, styles.centerContent]}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={colors.text}
            />
          </Pressable>
          <Text style={styles.headerTitle}>{SCREEN_TITLES.WISHLIST}</Text>
          <Text style={styles.headerCount}>({items.length})</Text>
        </View>

        {items.length === 0 ? (
          <EmptyState
            title={EMPTY_STATE_MESSAGES.WISHLIST_TITLE}
            subtitle={EMPTY_STATE_MESSAGES.WISHLIST_SUBTITLE}
            colors={colors}
          />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <WishlistItem item={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
