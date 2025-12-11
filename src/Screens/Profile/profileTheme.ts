export type ThemeMode = "light" | "dark";

export type AppTheme = {

  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  danger: string;
  muted: string;

  tabBar: string;
  tabActive: string;
  tabInactive: string;
};

const lightTheme: AppTheme = {
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  primary: "#2563EB",
  danger: "#DC2626",
  muted: "#9CA3AF",

  tabBar: "#FFFFFF",
  tabActive: "#2563EB",
  tabInactive: "#6B7280",
};

const darkTheme: AppTheme = {
  background: "#020617", 
  card: "#0F172A",        
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  border: "#1F2937",
  primary: "#60A5FA",
  danger: "#F97373",
  muted: "#6B7280",

  tabBar: "#020617",
  tabActive: "#60A5FA",
  tabInactive: "#6B7280",
};

export function getProfileTheme(mode: ThemeMode): AppTheme {
  return mode === "dark" ? darkTheme : lightTheme;
}
