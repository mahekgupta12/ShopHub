import { Alert } from "react-native";
import { auth } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

type Props = {
  email: string;
  password: string;
  activeTab: "login" | "signup";
  navigation: any;
  setLoading: (value: boolean) => void;
};

export const handleSubmit = async ({
  email,
  password,
  activeTab,
  navigation,
  setLoading,
}: Props) => {
  if (!email || !password) {
    Alert.alert("Missing Details", "Email and Password are required.");
    return;
  }

  try {
    setLoading(true); // 🔹 SHOW LOADER

    if (activeTab === "signup") {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false); // 🔹 HIDE LOADER
      Alert.alert("Success", "Account created successfully!");
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false); // 🔹 HIDE LOADER
      Alert.alert("Welcome!", "Logged in successfully!");
    }

    navigation.navigate("MainTabs");
  } catch (error: any) {
    setLoading(false); // 🔹 HIDE LOADER WHEN ERROR

    let message = "Something went wrong. Please try again.";

    if (activeTab === "login") {
      switch (error.code) {
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;
        case "auth/invalid-credential":
          message =
            "Incorrect credentials. Please provide valid email and password.";
          break;
        default:
          message = error.message;
      }
      Alert.alert("Login Failed", message);
    }

    if (activeTab === "signup") {
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "This email is already registered.";
          break;
        case "auth/weak-password":
          message = "Password must be at least 6 characters long.";
          break;
        default:
          message = error.message;
      }
      Alert.alert("Signup Failed", message);
    }
  }
};
