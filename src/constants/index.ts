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

export type Category = (typeof CATEGORY_OPTIONS)[number];


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


export const ORDER = {
  ID_PREFIX: "ORD-",
} as const;


export const DEFAULTS = {
  PAYMENT_METHOD: PAYMENT_METHODS.CARD,
  CATEGORY: CATEGORIES.ALL,
  PRICE_RANGE: {
    min: 0,
    max: 1000,
  },
  TAB: ROUTES.HOME,
} as const;

export type PriceRange = {
  min: number;
  max: number;
};


export const SCREEN_TITLES = {
  LOGIN: "Login",
  CHECKOUT: "Checkout",
  PAYMENT: "Payment",
  CART: "Cart",
  ORDERS: "Orders",
  PROFILE: "Profile",
} as const;


export const EMPTY_STATE_MESSAGES = {
  CART_TITLE: "Hey, it feels so light! 🎒",
  CART_SUBTITLE: "There is nothing in your bag.\nLet's add some items.",
  ORDERS_TITLE: "No Orders Yet! 🙁",
  ORDERS_SUBTITLE:
    "Your past orders will appear here.\nStart shopping now!",
} as const;


export const PROFILE_LABELS = {
  MY_ORDERS: "My Orders",
  CONTINUE_SHOPPING: "Continue Shopping",
  LOGOUT: "Logout",
} as const;


export const THEME_LABELS = {
  SWITCH_TO_LIGHT: "Switch to Light Theme",
  SWITCH_TO_DARK: "Switch to Dark Theme",
  MODE_DARK: "Dark",
  MODE_LIGHT: "Light",
} as const;


export const ORDER_CONFIRMATION_TEXT = {
  TITLE: "Order Confirmed!",
  SUBTITLE: "Thank you for your purchase",
  VIEW_ORDERS: "View Orders",
  CONTINUE_SHOPPING: "Continue Shopping",
} as const;


export const PLACEHOLDERS = {
  FULL_NAME: "John Doe",
  PHONE: "10 digit phone number",
  STREET: "123 Main St",
  CITY: "City",
  ZIP: "6 digit ZIP",
  CARD_NAME: "John Doe",
  CARD_NUMBER: "1234567812345678",
  EXPIRY: "MM/YY",
  CVV: "123",
  UPI_ID: "987654321@icici",
} as const;


export const FIREBASE_COLLECTIONS = {
  CARTS: "carts",
  ORDERS: "orders",
  USER_ORDERS: "userOrders",
  ITEMS: "items",
} as const;

