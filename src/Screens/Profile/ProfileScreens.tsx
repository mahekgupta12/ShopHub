import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

/**
 * Buttons (in order):
 * 1) My Orders  -> Orders tab
 * 2) Back to Home -> Home tab
 * 3) Logout -> reset to Login screen
 */
export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const goToOrders = () => {
    navigation.navigate("Orders");
  };

  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>
      <Text style={styles.subtitle}>Update your details here.</Text>

      <View style={styles.buttons}>
        {/* 1) My Orders */}
        <TouchableOpacity style={styles.button} onPress={goToOrders} activeOpacity={0.85}>
          <Text style={styles.buttonText}>My Orders</Text>
        </TouchableOpacity>

        {/* 2) Back to Home */}
        <TouchableOpacity style={styles.button} onPress={goToHome} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>

        {/* 3) Logout (at the end) */}
        <TouchableOpacity style={[styles.button, styles.logout]} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 14, opacity: 0.8, marginBottom: 24, textAlign: "center" },
  buttons: { width: "100%", gap: 12 },
  button: {
    alignSelf: "center",
    width: "90%",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "600" },
  logout: { borderColor: "#c62828", backgroundColor: "#ffebee" },
  logoutText: { color: "#c62828" },
});
