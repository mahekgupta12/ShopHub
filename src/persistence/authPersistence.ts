// src/persistence/authPersistence.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import type { RootStackParamList } from "../Navigation/types";

type RouteName = keyof RootStackParamList;

/**
 * Decides whether we should start on Login or MainTabs
 * based on Firebase's current user.
 */
export function useInitialRoute() {
  const [initialRoute, setInitialRoute] = useState<RouteName | null>(null);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // user is already logged in → go to MainTabs
        setInitialRoute("MainTabs");
      } else {
        // no user → show Login
        setInitialRoute("Login");
      }
    });

    return () => sub();
  }, []);

  return initialRoute;
}
