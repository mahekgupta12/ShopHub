import React from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { useSelector } from "react-redux";
import { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";
import makeLoginStyles from "./loginStyles";
import PrimaryButton from "../../componets/primaryButton";

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

  // const [emailError, setEmailError] = React.useState("");

  // React.useEffect(() => {
  //   if (email) {
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailRegex.test(email)) {
  //       setEmailError("Please enter a valid email address.");
  //     } else {
  //       setEmailError("");
  //       // Email is valid, you can perform further actions if needed
  //     }
  //   }
  // }, [email]);


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
      {/* {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null} */}

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
        <PrimaryButton style={styles.submitBtn} onPress={handleSubmit} disabled={loading || !email || !password || (activeTab === "signup" && !fullName)}>
          <Text style={styles.submitText}>
            {activeTab === "signup" ? "Sign Up" : "Login"}
          </Text>
        </PrimaryButton>
      )}
    </View>
  );
}
