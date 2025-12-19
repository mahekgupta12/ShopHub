import React from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { useSelector } from "react-redux";
import type { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";
import makeLoginStyles from "./loginStyles";
import AppPressable from "../../componets/appPressables";
import { AUTH_MESSAGES, AUTH_TABS, type AuthTab } from "../../constants/authMessages";

type Props = {
  activeTab: AuthTab;
  fullName: string;
  email: string;
  password: string;
  setFullName: (val: string) => void;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  handleSubmit: () => void;
  loading: boolean;
};

export default function Form({
  activeTab,
  fullName,
  email,
  password,
  setFullName,
  setEmail,
  setPassword,
  handleSubmit,
  loading,
}: Props) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeLoginStyles(colors);

  return (
    <View style={styles.formBox}>
      {activeTab === AUTH_TABS.SIGNUP ? (
        <Text style={styles.title}>{AUTH_MESSAGES.FORM_HEADER_SIGNUP}</Text>
      ) : (
        <Text style={styles.title}>{AUTH_MESSAGES.FORM_HEADER_LOGIN}</Text>
      )}

      <Text style={styles.subtitle}>
        {activeTab === AUTH_TABS.SIGNUP
          ? AUTH_MESSAGES.FORM_SIGNUP_TITLE
          : AUTH_MESSAGES.FORM_LOGIN_TITLE}
      </Text>

      {activeTab === AUTH_TABS.SIGNUP && (
        <TextInput
          placeholder={AUTH_MESSAGES.PLACEHOLDER_FULL_NAME}
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor={colors.textSecondary}
        />
      )}

      <TextInput
        placeholder={AUTH_MESSAGES.PLACEHOLDER_EMAIL}
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={colors.textSecondary}
      />

      <TextInput
        placeholder={AUTH_MESSAGES.PLACEHOLDER_PASSWORD}
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={colors.textSecondary}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : (
        <AppPressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {activeTab === AUTH_TABS.SIGNUP
              ? AUTH_MESSAGES.TAB_SIGNUP
              : AUTH_MESSAGES.TAB_LOGIN}
          </Text>
        </AppPressable>
      )}
    </View>
  );
}
