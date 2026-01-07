import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { cartStore } from "./src/screens/cart/cartStore";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigation/rootStack";
import Toast from "react-native-toast-message";

import { NavigationLoaderProvider } from "./src/constants/navigationLoader";
import { processQueue } from "./src/persistence/offlineQueue";

export default function App() {
  useEffect(() => {
    // Attempt to process any queued offline requests on app start
    processQueue().catch(() => {
      // ignore errors - they'll remain in queue
    });
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
