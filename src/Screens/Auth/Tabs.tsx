import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./loginStyles";

type Props = {
  activeTab: "login" | "signup";
  setActiveTab: React.Dispatch<React.SetStateAction<"login" | "signup">>;
};

export default function Tabs({ activeTab, setActiveTab }: Props) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "login" && styles.activeTab]}
        onPress={() => setActiveTab("login")}
      >
        <Text style={[styles.tabText, activeTab === "login" && styles.activeTabText]}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === "signup" && styles.activeTab]}
        onPress={() => setActiveTab("signup")}
      >
        <Text style={[styles.tabText, activeTab === "signup" && styles.activeTabText]}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
