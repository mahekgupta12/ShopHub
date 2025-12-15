import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";
import { RootState } from "../cart/CartStore";
import { getProfileTheme } from "../profile/ProfileTheme";
import makeLoginStyles from "./LoginStyles";

type Props = {
  activeTab: "login" | "signup";
  setActiveTab: React.Dispatch<React.SetStateAction<"login" | "signup">>;
};

export default function Tabs({ activeTab, setActiveTab }: Props) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeLoginStyles(colors);

  const isLogin = activeTab === "login";
  const isSignup = activeTab === "signup";

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, isLogin && styles.activeTab]}
        onPress={() => setActiveTab("login")}
      >
        <Text
          style={[
            styles.tabText,
            isLogin && styles.activeTabText,
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, isSignup && styles.activeTab]}
        onPress={() => setActiveTab("signup")}
      >
        <Text
          style={[
            styles.tabText,
            isSignup && styles.activeTabText,
          ]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
