import React from "react";
import { Provider } from "react-redux";
import { cartStore } from "./src/screens/cart/CartStore";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigation/RootStack";
import Toast from "react-native-toast-message";

import { NavigationLoaderProvider } from "./src/constants/NavigationLoader";

export default function App() {
  return (
    <Provider store={cartStore}>
      <NavigationLoaderProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>

        <Toast position="bottom" />
      </NavigationLoaderProvider>
    </Provider>
  );
}
