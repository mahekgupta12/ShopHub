import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "./Header";
import Tabs from "./Tabs";
import Form from "./Form";

import styles from "./loginStyles";
import { handleSubmit as authHandleSubmit } from "./authHandlers";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  const onSubmit = () =>
    authHandleSubmit({
      fullName,
      email,
      password,
      activeTab,
      navigation,
      setLoading,
    });

  return (
    <View style={styles.container}>
      <Header />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <Form
        activeTab={activeTab}
        fullName={fullName}          // 👈 NEW
        email={email}
        password={password}
        setFullName={setFullName}    // 👈 NEW
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={onSubmit}
        loading={loading}
      />
    </View>
  );
}
