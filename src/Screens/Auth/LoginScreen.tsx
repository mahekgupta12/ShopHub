// this is login screenimport React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Navigation/types"; // <-- capital N

type Nav = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();

  const goToHome = () => {
    // after “login”, go to the tab navigator
    navigation.replace("MainTabs");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Sign in</Text>

      <TouchableOpacity style={styles.button} onPress={goToHome} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Go to Home (Tabs)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24 },
  button: { paddingVertical: 12, paddingHorizontal: 28, borderRadius: 10, borderWidth: 1 },
  buttonText: { fontSize: 16, fontWeight: "600" },
});
