import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./loginStyles";
import { ActivityIndicator } from "react-native";

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
          value={fullName}                // 👈 controlled
          onChangeText={setFullName}      // 👈 update state
        />
      )}

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4169E1"
          style={{ marginTop: 15 }}
        />
      ) : (
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {activeTab === "signup" ? "Sign Up" : "Login"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
