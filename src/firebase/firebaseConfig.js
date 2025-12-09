// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBT0BETZxtheIggDmUVfQEe83graJHt1IU",
  authDomain: "shophub-f4dfe.firebaseapp.com",
  projectId: "shophub-f4dfe",
  storageBucket: "shophub-f4dfe.firebasestorage.app",
  messagingSenderId: "833568434080",
  appId: "1:833568434080:web:25737f033ba21c419926c5",
};

const app = initializeApp(firebaseConfig);

// 🔑 React Native ke liye persistence setup
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
