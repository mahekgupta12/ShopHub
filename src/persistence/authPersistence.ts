import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RootStackParamList } from "../navigation/types";
import { clearLastTab } from "./tabPersistence";
import { USER_ID_KEY, ID_TOKEN_KEY } from "../restAPIs/authKeys";

type RouteName = keyof RootStackParamList;

export function useInitialRoute() {
  const [initialRoute, setInitialRoute] =
    useState<RouteName | null>(null);

  useEffect(() => {
    const check = async () => {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      const token = await AsyncStorage.getItem(ID_TOKEN_KEY);

      if (userId && token) {
        clearLastTab();
        setInitialRoute("MainTabs");
      } else {
        setInitialRoute("Login");
      }
    };

    check();
  }, []);

  return initialRoute;
}
