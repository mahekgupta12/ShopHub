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

// Dimensions & Spacing
export const DIMENSIONS = {
  // Padding & Margins
  PADDING_XS: 4,
  PADDING_SM: 8,
  PADDING_MD: 12,
  PADDING_LG: 16,
  PADDING_XL: 20,
  PADDING_2XL: 30,

  MARGIN_XS: 4,
  MARGIN_SM: 6,
  MARGIN_MD: 8,
  MARGIN_LG: 12,
  MARGIN_XL: 16,
  MARGIN_2XL: 40,

  // Border Radius
  BORDER_RADIUS_SM: 8,
  BORDER_RADIUS_MD: 12,
  BORDER_RADIUS_LG: 16,
  BORDER_RADIUS_PILL: 22,

  // Image/Avatar Sizes
  IMAGE_SMALL: 32,
  IMAGE_MEDIUM: 70,
  IMAGE_LARGE: 100,

  // Button Sizes
  BUTTON_SMALL: 28,
  BUTTON_MEDIUM: 32,
  BUTTON_LARGE: 44,
  BUTTON_PILL: 22,

  // Icon Sizes (for UI elements)
  ICON_CONTROL_SIZE: 18,
  ICON_ACTION_SIZE: 20,
  ICON_DELETE_SIZE: 22,

  // Container Sizes
  HEADER_PADDING_HORIZONTAL: 16,
  HEADER_PADDING_VERTICAL: 10,
  CONTAINER_PADDING_HORIZONTAL: 16,
  CONTAINER_PADDING_TOP: 16,
  EMPTY_STATE_PADDING: 20,

  // Shadow Dimensions
  SHADOW_OFFSET_HEIGHT: 4,
  SHADOW_RADIUS: 10,
  SHADOW_OPACITY: 0.04,
} as const;

// Shadow Effects
export const SHADOWS = {
  CARD: {
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  SUBTLE: {
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
} as const;
