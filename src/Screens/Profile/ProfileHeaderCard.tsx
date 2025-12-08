import React from "react";
import { View, Text } from "react-native";
import type { ProfileStyles } from "./profileStyles";

type Props = {
  initial: string;
  name: string;
  email: string;
  styles: ProfileStyles;
};

export default function ProfileHeaderCard({
  initial,
  name,
  email,
  styles,
}: Props) {
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
