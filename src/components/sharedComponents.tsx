import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import type { AppTheme } from "../screens/profile/profileTheme";

export const getSharedComponentStyles = (colors: AppTheme) =>
  StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 8,
      color: colors.text,
    },
    emptySubtitle: {
      fontSize: 14,
      fontWeight: "400",
      textAlign: "center",
      opacity: 0.7,
      color: colors.textSecondary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    cardBase: {
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      backgroundColor: colors.card,
    },
    rowBase: {
      flexDirection: "row",
      alignItems: "center",
    },
    divider: {
      height: 1,
      width: "100%",
      marginVertical: 12,
      backgroundColor: colors.border,
    },
  });


interface EmptyStateViewProps {
  title: string;
  subtitle: string;
  colors: AppTheme;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

export function EmptyStateView({
  title,
  subtitle,
  colors,
  containerStyle,
  titleStyle,
  subtitleStyle,
}: EmptyStateViewProps) {
  const styles = getSharedComponentStyles(colors);
  return (
    <View style={[styles.emptyContainer, containerStyle]}>
      <Text style={[styles.emptyTitle, titleStyle]}>{title}</Text>
      <Text style={[styles.emptySubtitle, subtitleStyle]}>{subtitle}</Text>
    </View>
  );
}


interface LoadingStateProps {
  colors: AppTheme;
  containerStyle?: ViewStyle;
}

export function LoadingState({ colors, containerStyle }: LoadingStateProps) {
  const styles = getSharedComponentStyles(colors);
  return (
    <View
      style={[
        styles.loadingContainer,
        containerStyle,
      ]}
    >
      <ActivityIndicator size="large" color={colors.text} />
    </View>
  );
}


interface CardContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  colors: AppTheme;
}

export function CardContainer({ children, style, colors }: CardContainerProps) {
  const styles = getSharedComponentStyles(colors);
  return (
    <View
      style={[
        styles.cardBase,
        style,
      ]}
    >
      {children}
    </View>
  );
}


interface RowContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  space?: number;
}

export function RowContainer({ children, style, space = 8 }: RowContainerProps) {
  const baseStyles = StyleSheet.create({ rowBase: { flexDirection: "row", alignItems: "center" } });
  return (
    <View style={[baseStyles.rowBase, { gap: space }, style]}>
      {children}
    </View>
  );
}

import Ionicons from "react-native-vector-icons/Ionicons";
import AppPressable from "./appPressables";

interface ActionRowProps {
  icon: string;
  label: string;
  rightElement?: React.ReactNode;
  colors: AppTheme;
  styles: any;
  onPress: () => void;
}

export function ActionRow({
  icon,
  label,
  rightElement,
  colors,
  styles,
  onPress,
}: ActionRowProps) {
  return (
    <AppPressable style={styles.actionCard} onPress={onPress}>
      <View style={styles.actionLeft}>
        <Ionicons name={icon as any} size={22} color={colors.primary} />
        <Text style={styles.actionLabel}>{label}</Text>
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      )}
    </AppPressable>
  );
}


interface ProfileHeaderCardProps {
  initial: string;
  name: string;
  email: string;
  styles: any;
}

export function ProfileHeaderCard({
  initial,
  name,
  email,
  styles,
}: ProfileHeaderCardProps) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>

      <View style={styles.profileTextBlock}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>
    </View>
  );
}


interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  colors: AppTheme;
  styles: any;
  containerStyle?: ViewStyle;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  colors,
  styles,
  containerStyle,
}: QuantitySelectorProps) {
  return (
    <View style={[styles.counterRow, containerStyle]}>
      <AppPressable style={styles.circleBtn} onPress={onDecrease}>
        <Ionicons name="remove" size={18} color={colors.text} />
      </AppPressable>

      <Text style={styles.qty}>{quantity}</Text>

      <AppPressable style={styles.circleBtn} onPress={onIncrease}>
        <Ionicons name="add" size={18} color={colors.text} />
      </AppPressable>
    </View>
  );
}


interface ProductInfoProps {
  title: string;
  price: string;
  rating?: number;
  ratingText?: string;
  colors: AppTheme;
  styles: any;
}

export function ProductInfo({
  title,
  price,
  rating,
  ratingText,
  colors,
  styles,
}: ProductInfoProps) {
  return (
    <View style={styles.cardBody}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {rating !== undefined && (
        <View style={styles.ratingRow}>
          <Ionicons
            name="star"
            size={16}
            color={colors.primary}
          />
          <Text style={styles.ratingText}>{ratingText || rating.toFixed(1)}</Text>
        </View>
      )}

      <Text style={styles.price}>{price}</Text>
    </View>
  );
}

import { ImageStyle } from "react-native";

interface ImageCardProps {
  imageUri?: string;
  imageStyle?: ImageStyle;
  children?: React.ReactNode;
  _colors?: AppTheme;
  containerStyle?: ViewStyle;
}

export function ImageCard({
  imageUri,
  imageStyle,
  children,
  _colors,
  containerStyle,
}: ImageCardProps) {
  const styles = _colors ? getSharedComponentStyles(_colors) : StyleSheet.create({ cardBase: { borderRadius: 12, padding: 12, marginBottom: 12 } });
  return (
    <View
      style={[
        styles.cardBase,
        containerStyle,
      ]}
    >
      {imageUri && <Image source={{ uri: imageUri }} style={imageStyle} />}
      {children}
    </View>
  );
}


interface DividerProps {
  colors: AppTheme;
  style?: ViewStyle;
}

export function Divider({ colors, style }: DividerProps) {
  const styles = getSharedComponentStyles(colors);
  return (
    <View
      style={[
        styles.divider,
        style,
      ]}
    />
  );
}


interface TotalRowProps {
  label: string;
  amount: string;
  _colors?: AppTheme;
  styles: any;
  containerStyle?: ViewStyle;
}

export function TotalRow({
  label,
  amount,
  _colors,
  styles,
  containerStyle,
}: TotalRowProps) {
  return (
    <View style={[styles.totalRow, containerStyle]}>
      <Text style={styles.totalLabel}>{label}</Text>
      <Text style={styles.totalAmount}>{amount}</Text>
    </View>
  );
}

