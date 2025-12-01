import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => sub();
  }, []);

  const email = user?.email ?? "guest@example.com";
  const nameFromEmail = email.split("@")[0];
  const name = user?.displayName ?? nameFromEmail;
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await signOut(auth);

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const goToOrders = () => navigation.navigate("Orders");
  const goToHome = () => navigation.navigate("Home");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.screenTitle}>Profile</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <View style={styles.profileTextBlock}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actionCard}
          activeOpacity={0.85}
          onPress={goToOrders}
        >
          <View style={styles.actionLeft}>
            <Ionicons name="cube-outline" size={22} color="#2563EB" />
            <Text style={styles.actionLabel}>My Orders</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          activeOpacity={0.85}
          onPress={goToHome}
        >
          <View style={styles.actionLeft}>
            <Ionicons name="bag-handle-outline" size={22} color="#2563EB" />
            <Text style={styles.actionLabel}>Continue Shopping</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        <View style={{ marginTop: 32 }}>
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.9}
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#ffffff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 18,
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 9999,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
  profileTextBlock: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#6B7280",
  },

  actionCard: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionLabel: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: 14,
    backgroundColor: "#DC2626",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
