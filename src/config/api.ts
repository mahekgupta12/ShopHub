/**
 * API Configuration
 * Centralized location for all API endpoints and base URLs
 */

// Base API URL
export const API_BASE_URL = "https://dummyjson.com";

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: "/products",
} as const;

// Full API URLs
export const API_URLS = {
  PRODUCTS: `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`,
} as const;

