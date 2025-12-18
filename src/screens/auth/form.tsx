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

type Props = {
  activeTab: "login" | "signup";
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
      {activeTab === "signup" ? (
        <Text style={styles.title}>Create Account</Text>
      ) : (
        <Text style={styles.title}>Welcome Back! We missed you.</Text>
      )}

      <Text style={styles.subtitle}>
        {activeTab === "signup"
          ? "Sign up to start shopping"
          : "Login to continue"}
      </Text>

      {activeTab === "signup" && (
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor={colors.textSecondary}
        />
      )}

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={colors.textSecondary}
      />

      <TextInput
        placeholder="Password"
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
          style={{ marginTop: 15 }}
        />
      ) : (
        <AppPressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {activeTab === "signup" ? "Sign Up" : "Login"}
          </Text>
        </AppPressable>
      )}
    </View>
  );
}
