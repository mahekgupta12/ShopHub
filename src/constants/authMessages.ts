/**
 * Authentication Messages & Labels
 * Centralized place for all auth-related strings and messages
 */

export const AUTH_MESSAGES = {
  // Validation Messages
  MISSING_DETAILS: "Missing Details",
  SIGNUP_MISSING_DETAILS: "Full name, email and password are required.",
  LOGIN_MISSING_DETAILS: "Email and Password are required.",

  // Error Messages
  SIGNUP_FAILED: "Signup Failed",
  LOGIN_FAILED: "Login Failed",
  SOMETHING_WENT_WRONG: "Something went wrong",
  AUTHENTICATION_FAILED: "Authentication failed",

  // Success Messages
  SIGNUP_SUCCESS: "Your account has been created successfully",
  LOGIN_SUCCESS: "Logged in successfully",

  // Tab Labels
  TAB_LOGIN: "Login",
  TAB_SIGNUP: "Sign Up",

  // Form Labels
  FORM_SIGNUP_TITLE: "Sign up to start shopping",
  FORM_LOGIN_TITLE: "Login to continue",

  // Form Placeholders
  PLACEHOLDER_FULL_NAME: "Full Name",
  PLACEHOLDER_EMAIL: "Email",
  PLACEHOLDER_PASSWORD: "Password",

  // Navigation
  NAVIGATE_TO_MAIN_TABS: "MainTabs",
} as const;

// Auth Tab Types
export const AUTH_TABS = {
  LOGIN: "login",
  SIGNUP: "signup",
} as const;

export type AuthTab = typeof AUTH_TABS[keyof typeof AUTH_TABS];
