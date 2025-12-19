/**
 * UI Component Constants
 * Centralized place for component display modes and variants
 */

// Product View Types
export const VIEW_TYPES = {
  LIST: "list",
  GRID: "grid",
} as const;

export type ViewType = typeof VIEW_TYPES[keyof typeof VIEW_TYPES];

// Icon Names (Used with Ionicons)
export const ICON_NAMES = {
  // Navigation Icons
  HOME: "home",
  CART: "cart",
  CUBE: "cube",
  PERSON: "person",
  LIST: "list",
  GRID: "grid",

  // Action Icons
  REMOVE: "remove",
  ADD: "add",
  TRASH_OUTLINE: "trash-outline",
  STAR: "star",
  CLOSE_CIRCLE: "close-circle-outline",
  OPTIONS: "options",
  CHECKMARK: "checkmark",
  BAG_HANDLE: "bag-handle-outline",
  ARROW_BACK: "arrow-back",

  // Status Icons
  CHEVRON_FORWARD: "chevron-forward",
} as const;

// Size Constants (for icons)
export const ICON_SIZES = {
  SMALL: 14,
  MEDIUM: 16,
  LARGE: 18,
  CLOSE: 26,
  EXTRA_LARGE: 22,
  HUGE: 30,
  TITLE: 35,
  CHECKMARK: 32,
} as const;

// Pressable/Button States
export const BUTTON_STATES = {
  ENABLED: "enabled",
  DISABLED: "disabled",
  LOADING: "loading",
  PRESSED: "pressed",
} as const;

export type ButtonState = typeof BUTTON_STATES[keyof typeof BUTTON_STATES];

// Font Weights
export const FONT_WEIGHTS = {
  LIGHT: "300",
  NORMAL: "400",
  MEDIUM: "500",
  SEMI_BOLD: "600",
  BOLD: "700",
  EXTRA_BOLD: "800",
} as const;
