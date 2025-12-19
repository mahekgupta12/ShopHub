/**
 * Checkout & Validation Messages
 * Centralized place for all checkout-related validation and error messages
 */

export const CHECKOUT_MESSAGES = {
  // Validation Error Messages
  ALERT_TITLE: "Fix these details",
  STREET_ADDRESS_REQUIRED: "• Street Address is required",
  CITY_REQUIRED: "• City is required",
  ZIP_CODE_REQUIRED: "• ZIP Code is required",
  PHONE_LENGTH_ERROR: (length: number) => `• Phone Number must be exactly ${length} digits`,
  ZIP_LENGTH_ERROR: (length: number) => `• ZIP Code must be exactly ${length} digits`,

  // Order Status Messages
  FAILED_TO_FETCH_ORDERS: "Failed to fetch orders",

  // Toast Position
  TOAST_POSITION: "bottom",
} as const;

export const CHECKOUT_VALIDATION_ERRORS = {
  // Form Field Errors
  INVALID_PAYMENT_DETAILS: "Invalid Payment Details",
  STREET_ADDRESS_REQUIRED: "Street Address is required",
  CITY_REQUIRED: "City is required",
  ZIP_CODE_REQUIRED: "ZIP Code is required",
  PHONE_REQUIRED: "Phone number is required",
} as const;
