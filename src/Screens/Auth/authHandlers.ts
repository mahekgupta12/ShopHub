import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { auth } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

type Props = {
  fullName?: string;
  email: string;
  password: string;
  activeTab: "login" | "signup";
  navigation: any;
  setLoading: (value: boolean) => void;
};

export const handleSubmit = async ({
  fullName,
  email,
  password,
  activeTab,
  navigation,
  setLoading,
}: Props) => {
  if (!email || !password || (activeTab === "signup" && !fullName?.trim())) {
    const msg =
      activeTab === "signup"
        ? "Full name, email and password are required."
        : "Email and Password are required.";
    Alert.alert("Missing Details", msg);
    return;
  }

  try {
    setLoading(true);

    if (activeTab === "signup") {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(cred.user, {
        displayName: fullName!.trim(),
      });

      Toast.show({
        type: "success",
        text1: "Account Created 🎉",
        text2: "Your account has been created successfully",
        position: "bottom",
        visibilityTime: 2500,
        autoHide: true,
      });
    } else {
      await signInWithEmailAndPassword(auth, email, password);

      Toast.show({
        type: "success",
        text1: "Welcome Back 👋",
        text2: "Logged in successfully",
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
      });
    }

    setLoading(false);
    navigation.navigate("MainTabs");
  } catch (error: any) {
    setLoading(false);

    let message = "Something went wrong. Please try again.";

    if (activeTab === "login") {
      switch (error.code) {
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;
        case "auth/invalid-credential":
          message = "Incorrect email or password.";
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
