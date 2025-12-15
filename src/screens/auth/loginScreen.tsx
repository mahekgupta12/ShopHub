import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "./header";
import Tabs from "./tabs";
import Form from "./form";

import { handleSubmit as authHandleSubmit } from "./authHandlers";

import { useSelector } from "react-redux";
import { RootState } from "../cart/cartStore";
import { getProfileTheme } from "../profile/profileTheme";
import makeLoginStyles from "./loginStyles";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  const mode = useSelector((state: RootState) => state.theme.mode);
  const colors = getProfileTheme(mode);
  const styles = makeLoginStyles(colors);

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
        fullName={fullName}
        email={email}
        password={password}
        setFullName={setFullName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={onSubmit}
        loading={loading}
      />
    </View>
  );
}
