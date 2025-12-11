import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import type { RootStackParamList } from "../Navigation/types";

type RouteName = keyof RootStackParamList;

export function useInitialRoute() {
  const [initialRoute, setInitialRoute] = useState<RouteName | null>(null);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setInitialRoute("MainTabs");
      } else {
        setInitialRoute("Login");
      }
    });

    return () => sub();
  }, []);

  return initialRoute;
}
