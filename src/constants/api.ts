/**
 * API Configuration Constants
 * Centralized location for all API-related hardcoded values
 */

// Firebase API Configuration
export const FIREBASE_API_KEY = "AIzaSyBT0BETZxtheIggDmUVfQEe83graJHt1IU";
export const FIREBASE_DB_URL = "https://shophub-f4dfe-default-rtdb.firebaseio.com";

// Firebase Authentication Endpoints
export const FIREBASE_AUTH_ENDPOINTS = {
  SIGNUP: "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
  LOGIN: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
  UPDATE_PROFILE: "https://identitytoolkit.googleapis.com/v1/accounts:update",
} as const;

// HTTP Methods
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;
