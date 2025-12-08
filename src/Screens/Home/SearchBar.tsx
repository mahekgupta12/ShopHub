import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useSelector } from "react-redux";
import { RootState } from "../Cart/cartStore";
import { getProfileTheme, type AppTheme } from "../Profile/profileTheme";

type Props = {
  query: string;
  onChangeQuery: (text: string) => void;
  RightElement?: React.ReactNode;
};

export default function SearchBar({ query, onChangeQuery, RightElement }: Props) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeStyles(colors);

  return (
    <View style={styles.searchWrap}>
      <Ionicons name="search" size={18} color={colors.textSecondary} />
      <TextInput
        placeholder="Search products..."
        value={query}
        onChangeText={onChangeQuery}
        placeholderTextColor={colors.textSecondary}
        style={styles.searchInput}
      />
      {RightElement}
    </View>
  );
}

const makeStyles = (colors: AppTheme) =>
  StyleSheet.create({
    searchWrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      paddingVertical: 2,
    },
  });
