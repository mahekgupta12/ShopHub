import React, { createContext, useContext, useMemo, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

type NavLoaderContextValue = {
  show: () => void;
  hide: () => void;
  isLoading: boolean;
};

const NavLoaderContext = createContext<NavLoaderContextValue | null>(null);

export function NavigationLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(
    () => ({
      isLoading,
      show: () => setIsLoading(true),
      hide: () => setIsLoading(false),
    }),
    [isLoading]
  );

  return (
    <NavLoaderContext.Provider value={value}>
      {children}
      <NavigationLoaderOverlay />
    </NavLoaderContext.Provider>
  );
}

export function useNavigationLoader() {
  const ctx = useContext(NavLoaderContext);
  if (!ctx) {
    throw new Error("useNavigationLoader must be used inside NavigationLoaderProvider");
  }
  return ctx;
}

function NavigationLoaderOverlay() {
  const ctx = useContext(NavLoaderContext);
  if (!ctx?.isLoading) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.box}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 80,
    width: 80,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
});
