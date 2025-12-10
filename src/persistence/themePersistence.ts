import { Store } from "@reduxjs/toolkit";
import { setTheme, type ThemeMode } from "../Screens/Profile/themeSlice";
import { getJson, setJson } from "./storage";

const THEME_KEY = "APP_THEME_MODE";

export async function bootstrapTheme(store: Store) {
  const stored = await getJson<ThemeMode>(THEME_KEY);
  if (stored === "light" || stored === "dark") {
    store.dispatch(setTheme(stored));
  }
}

export function watchThemeChanges(store: Store) {
  let currentMode = (store.getState() as any).theme.mode as ThemeMode;

  store.subscribe(() => {
    const state = store.getState() as any;
    const nextMode = state.theme.mode as ThemeMode;

    if (nextMode !== currentMode) {
      currentMode = nextMode;
      setJson(THEME_KEY, nextMode);
    }
  });
}
