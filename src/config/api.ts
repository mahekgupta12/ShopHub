export const API_BASE_URL = "https://dummyjson.com";

export const API_ENDPOINTS = {
  PRODUCTS: "/products",
} as const;

export const API_URLS = {
  PRODUCTS: `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`,
} as const;

