// App.tsx
import React from "react";
import { Provider } from "react-redux";
import { cartStore } from "./src/Screens/Cart/cartStore";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/Navigation/RootStack";

export default function App() {
  return (
    <Provider store={cartStore}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
