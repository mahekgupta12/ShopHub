/**
 * Application Constants
 * Centralized location for all constants used throughout the application
 */

// ============================================================================
// Payment Methods
// ============================================================================
export const PAYMENT_METHODS = {
  CARD: "card",
  UPI: "upi",
  COD: "cod",
} as const;

export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CARD]: "Credit/Debit Card",
  [PAYMENT_METHODS.UPI]: "UPI",
  [PAYMENT_METHODS.COD]: "Cash on Delivery",
} as const;

export const PAYMENT_METHOD_OPTIONS = [
  { key: PAYMENT_METHODS.CARD, label: PAYMENT_METHOD_LABELS[PAYMENT_METHODS.CARD] },
  { key: PAYMENT_METHODS.UPI, label: PAYMENT_METHOD_LABELS[PAYMENT_METHODS.UPI] },
  { key: PAYMENT_METHODS.COD, label: PAYMENT_METHOD_LABELS[PAYMENT_METHODS.COD] },
] as const;

// ============================================================================
// Categories
// ============================================================================
export const CATEGORIES = {
  ALL: "All",
  FRAGRANCES: "Fragrances",
  GROCERIES: "Groceries",
  FURNITURE: "Furniture",
  BEAUTY: "Beauty",
} as const;

export const CATEGORY_OPTIONS = [
  CATEGORIES.ALL,
  CATEGORIES.FRAGRANCES,
  CATEGORIES.GROCERIES,
  CATEGORIES.FURNITURE,
  CATEGORIES.BEAUTY,
] as const;

// ============================================================================
// UPI Handles
// ============================================================================
export const ALLOWED_UPI_HANDLES = [
  // Google Pay
  "@okhdfcbank",
  "@okaxis",
  "@okicici",

  // PhonePe
  "@ybl",
  "@ibl",
  "@axl",

  // Paytm
  "@paytm",

  // BHIM / Common
  "@upi",
  "@sbi",
  "@pnb",
  "@boi",

  // ICICI
  "@icici",

  // HDFC
  "@hdfcbank",

  // Axis
  "@axisbank",

  // Bank of Baroda
  "@barodampay",

  // Kotak
  "@kotak",

  // DBS
  "@dbs",

  // Groww
  "@yesg",

  // Amazon Pay
  "@apl",
  "@yapl",
] as const;

// ============================================================================
// Navigation Routes
// ============================================================================
export const ROUTES = {
  // Root Stack
  LOGIN: "Login",
  MAIN_TABS: "MainTabs",

  // Bottom Tabs
  HOME: "Home",
  CART: "Cart",
  ORDERS: "Orders",
  PROFILE: "Profile",

  // Cart Stack
  CART_MAIN: "CartMain",
  CHECKOUT: "Checkout",
  PAYMENT: "Payment",
  ORDER_CONFIRMATION: "OrderConfirmation",
} as const;

// ============================================================================
// Error Messages
// ============================================================================
export const ERROR_MESSAGES = {
  FAILED_TO_LOAD_PRODUCTS: "Failed to load products",
  FAILED_TO_LOAD: "Failed to load",
  INVALID_PAYMENT_DETAILS: "Invalid Payment Details",
  LOGIN_REQUIRED: "Login required",
  PAYMENT_FAILED: "Payment failed",
  PLEASE_TRY_AGAIN: "Please try again.",
  PLEASE_CHECK_DETAILS: "Please check your details.",
  PLEASE_LOG_IN: "Please log in to continue.",
} as const;

// ============================================================================
// Validation Rules
// ============================================================================
export const VALIDATION = {
  CARD: {
    NAME_MIN_LENGTH: 2,
    NUMBER_LENGTH: 16,
    CVV_MIN_LENGTH: 3,
    CVV_MAX_LENGTH: 4,
    EXPIRY_FORMAT: /^\d{2}\/\d{2}$/,
  },
  PHONE: {
    LENGTH: 10,
  },
  ZIP: {
    LENGTH: 6,
  },
  UPI: {
    ID_PATTERN: /^[a-z0-9._-]{2,}$/,
  },
} as const;

// ============================================================================
// Order Constants
// ============================================================================
export const ORDER = {
  ID_PREFIX: "ORD-",
} as const;

// ============================================================================
// Default Values
// ============================================================================
export const DEFAULTS = {
  PAYMENT_METHOD: PAYMENT_METHODS.CARD,
  CATEGORY: CATEGORIES.ALL,
  PRICE_RANGE: {
    min: 0,
    max: 2000,
  },
  TAB: ROUTES.HOME,
} as const;

// ============================================================================
// Screen Titles
// ============================================================================
export const SCREEN_TITLES = {
  LOGIN: "Login",
  CHECKOUT: "Checkout",
  PAYMENT: "Payment",
  CART: "Cart",
  ORDERS: "Orders",
  PROFILE: "Profile",
} as const;

// ============================================================================
// Form Placeholders
// ============================================================================
export const PLACEHOLDERS = {
  FULL_NAME: "John Doe",
  PHONE: "10 digit phone number",
  STREET: "123 Main St",
  CITY: "Nagpur",
  ZIP: "6 digit ZIP",
  CARD_NAME: "John Doe",
  CARD_NUMBER: "1234567812345678",
  EXPIRY: "MM/YY",
  CVV: "123",
  UPI_ID: "987654321@icici",
} as const;

// ============================================================================
// Firebase Collections
// ============================================================================
export const FIREBASE_COLLECTIONS = {
  CARTS: "carts",
  ORDERS: "orders",
  USER_ORDERS: "userOrders",
  ITEMS: "items",
} as const;

