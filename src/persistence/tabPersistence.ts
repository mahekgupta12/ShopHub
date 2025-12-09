import { useEffect, useState } from "react";
import { getJson, setJson, removeItem } from "./storage";
import type { BottomTabParamList } from "../Navigation/types";

const LAST_TAB_KEY = "LAST_TAB";

export type TabName = keyof BottomTabParamList;

export function useLastTab(defaultTab: TabName = "Home") {
  const [initialTab, setInitialTab] = useState<TabName>(defaultTab);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      const stored = await getJson<TabName>(LAST_TAB_KEY);
      if (stored) {
        setInitialTab(stored);
      }
      setReady(true);
    };
    load();
  }, []);

  const handleTabChange = (name: TabName) => {
    setInitialTab(name);
    setJson(LAST_TAB_KEY, name);
  };

  return { initialTab, ready, handleTabChange };
}

export async function clearLastTab() {
  try {
    await removeItem(LAST_TAB_KEY);
  } catch (e) {
    console.warn("Failed to clear last tab", e);
  }
}
