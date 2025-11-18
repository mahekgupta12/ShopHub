// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import Ionicons from "react-native-vector-icons/Ionicons";

// export default function LoginScreen() {
//   const [activeTab, setActiveTab] = useState("login");
//   const navigation = useNavigation<any>();

//   const handleSubmit = () => {
//     navigation.navigate("MainTabs");
//   };
  
//   return (
//     <View style={styles.container}>
      
//       {/* Logo & App Name */}
//       <View style={styles.headerContainer}>
//         <View style={styles.logo}>
//           <Ionicons name="bag-handle-outline" size={35} color="#ffffff" />
//         </View>
//         <Text style={styles.appName}>ShopHub</Text>
//         <Text style={styles.tagline}>Your ultimate Shopping Hub</Text>
//       </View>

//       {/* Toggle Buttons */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tabButton, activeTab === "login" && styles.activeTab]}
//           onPress={() => setActiveTab("login")}
//         >
//           <Text style={[styles.tabText, activeTab === "login" && styles.activeTabText]}>
//             Login
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.tabButton, activeTab === "signup" && styles.activeTab]}
//           onPress={() => setActiveTab("signup")}
//         >
//           <Text style={[styles.tabText, activeTab === "signup" && styles.activeTabText]}>
//             Sign Up
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Form */}
//       <View style={styles.formBox}>
//         {activeTab === "signup" && (
//           <Text style={styles.title}>Create Account</Text>
//         )}

//         {activeTab === "login" && (
//           <Text style={styles.title}>Welcome Back! We missed you.</Text>
//         )}

//         <Text style={styles.subtitle}>
//           {activeTab === "signup"
//             ? "Sign up to start shopping"
//             : "Login to continue"}
//         </Text>

//         {activeTab === "signup" && (
//           <>
//             <TextInput
//               placeholder="Full Name"
//               style={styles.input}
//             />
//           </>
//         )}

//         <TextInput
//           placeholder="Email"
//           keyboardType="email-address"
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Password"
//           secureTextEntry
//           style={styles.input}
//         />

//         {/* Submit Button → now navigates to HomeScreen */}
//         <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
//           <Text style={styles.submitText}>
//             {activeTab === "signup" ? "Sign Up" : "Login"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f6f4f5ff", padding: 20 },
  
//   headerContainer: {
//     alignItems: "center",
//     marginTop: 50,
//   },

//   logo: {
//     backgroundColor: "#4169E1",
//     padding: 18,
//     borderRadius: 20,
//     marginBottom: 10,
//   },

//   appName: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#1a1a1a",
//   },

//   tagline: {
//     fontSize: 14,
//     color: "#6c6c6c",
//     marginTop: 4,
//   },

//   tabContainer: {
//     flexDirection: "row",
//     backgroundColor: "#e7ebf4",
//     padding: 5,
//     borderRadius: 12,
//     marginTop: 25,
//     alignSelf: "center",
//   },

//   tabButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 35,
//     borderRadius: 10,
//   },

//   activeTab: {
//     backgroundColor: "#ffffff",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },

//   tabText: {
//     fontSize: 15,
//     color: "#555",
//   },

//   activeTabText: {
//     color: "#1a1a1a",
//     fontWeight: "600",
//   },

//   formBox: {
//     marginTop: 30,
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 15,
//     elevation: 2,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#1a1a1a",
//   },

//   subtitle: {
//     fontSize: 14,
//     color: "#7b7b7b",
//     marginTop: 5,
//     marginBottom: 20,
//   },

//   input: {
//     backgroundColor: "#f2f4f6",
//     padding: 14,
//     borderRadius: 10,
//     marginVertical: 8,
//   },

//   submitBtn: {
//     backgroundColor: "#4169E1",
//     padding: 14,
//     borderRadius: 10,
//     marginTop: 15,
//   },

//   submitText: {
//     color: "#fff",
//     fontSize: 16,
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState("login");
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Email & Password are required");
      return;
    }

    try {
      if (activeTab === "signup") {
        // 🔥 Create User
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // 🔥 Login User
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigation.navigate("MainTabs"); // redirect after success
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Logo & App Name */}
      <View style={styles.headerContainer}>
        <View style={styles.logo}>
          <Ionicons name="bag-handle-outline" size={35} color="#ffffff" />
        </View>
        <Text style={styles.appName}>ShopHub</Text>
        <Text style={styles.tagline}>Your ultimate Shopping Hub</Text>
      </View>

      {/* Toggle Buttons */}
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

      {/* Form */}
      <View style={styles.formBox}>
        {activeTab === "signup" ? (
          <Text style={styles.title}>Create Account</Text>
        ) : (
          <Text style={styles.title}>Welcome Back! We missed you.</Text>
        )}

        <Text style={styles.subtitle}>
          {activeTab === "signup" ? "Sign up to start shopping" : "Login to continue"}
        </Text>

        {activeTab === "signup" && (
          <TextInput placeholder="Full Name" style={styles.input} />
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

        {errorMsg ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <Text style={{ color: "red", textAlign: "center", marginTop: 8 }}>
            {errorMsg}
          </Text>
        ) : null}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {activeTab === "signup" ? "Sign Up" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f4f5ff", padding: 20 },

  headerContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  logo: {
    backgroundColor: "#4169E1",
    padding: 18,
    borderRadius: 20,
    marginBottom: 10,
  },

  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  tagline: {
    fontSize: 14,
    color: "#6c6c6c",
    marginTop: 4,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#e7ebf4",
    padding: 5,
    borderRadius: 12,
    marginTop: 25,
    alignSelf: "center",
  },

  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  tabText: {
    fontSize: 15,
    color: "#555",
  },

  activeTabText: {
    color: "#1a1a1a",
    fontWeight: "600",
  },

  formBox: {
    marginTop: 30,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  subtitle: {
    fontSize: 14,
    color: "#7b7b7b",
    marginTop: 5,
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#f2f4f6",
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },

  submitBtn: {
    backgroundColor: "#4169E1",
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
