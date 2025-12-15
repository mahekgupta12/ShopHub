import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import type { RootStackParamList } from "../navigation/Types";
import { clearLastTab } from "./TabPersistence";

type RouteName = keyof RootStackParamList;

export function useInitialRoute() {
  const [initialRoute, setInitialRoute] = useState<RouteName | null>(null);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
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
