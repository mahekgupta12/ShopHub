import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { cartStore } from "./src/screens/cart/cartStore";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigation/rootStack";
import Toast from "react-native-toast-message";

import { NavigationLoaderProvider } from "./src/constants/navigationLoader";
import { startNetworkMonitoring } from "./src/utils/networkStatus";

export default function App() {
  useEffect(() => {
    // Start network monitoring for the whole app lifecycle so status updates are immediate
    startNetworkMonitoring();
  }, []);
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
