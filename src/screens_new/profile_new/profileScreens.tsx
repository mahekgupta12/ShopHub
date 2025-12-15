import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { auth } from "../../firebase/FirebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../cart/CartStore";
import { toggleTheme } from "./ThemeSlice";
import { getProfileTheme } from "./ProfileTheme";
import { makeProfileStyles } from "./ProfileStyles";

import ProfileHeaderCard from "./profileHeaderCard";
import ThemeToggleRow from "./themeToggleRow";
import ProfileActionRow from "./profileActionRow";

import { clearLastTab } from "../../persistence/TabPersistence";
import { ROUTES, SCREEN_TITLES } from "../../constants/Index";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const isDark = mode === "dark";

  const styles = makeProfileStyles(colors);

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

    await clearLastTab();

    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.LOGIN }],
    });
  };

  const goToOrders = () => navigation.navigate(ROUTES.ORDERS);
  const goToHome = () => navigation.navigate(ROUTES.HOME);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.screenTitle}>{SCREEN_TITLES.PROFILE}</Text>

          <ProfileHeaderCard
            initial={initial}
            name={name}
            email={email}
            styles={styles}
          />

          <ThemeToggleRow
            isDark={isDark}
            colors={colors}
            styles={styles}
            onToggle={handleToggleTheme}
          />

          <ProfileActionRow
            icon="cube-outline"
            label="My Orders"
            colors={colors}
            styles={styles}
            onPress={goToOrders}
          />

          <ProfileActionRow
            icon="bag-handle-outline"
            label="Continue Shopping"
            colors={colors}
            styles={styles}
            onPress={goToHome}
          />
        </View>

        <View style={styles.bottomSection}>
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
