import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import type { RootStackParamList } from "../Navigation/types";
import { clearLastTab } from "./tabPersistence";

type RouteName = keyof RootStackParamList;

export function useInitialRoute() {
  const [initialRoute, setInitialRoute] = useState<RouteName | null>(null);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // Clear the last saved tab so the app always starts from Home on cold start
        clearLastTab();
        setInitialRoute("MainTabs");
      } else {
        setInitialRoute("Login");
      }
    });

    return () => sub();
  }, []);

  return initialRoute;
}
