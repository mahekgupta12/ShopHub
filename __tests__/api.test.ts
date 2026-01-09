/**
 * @format
 */

import { API_BASE_URL, API_ENDPOINTS, API_URLS } from '../src/config/api';

describe('API Configuration', () => {
  // Ensure base URL and endpoint constants are stable and consistent.
  it('should export API_BASE_URL', () => {
    expect(API_BASE_URL).toBeDefined();
    expect(typeof API_BASE_URL).toBe('string');
  });

  it('should have correct API_BASE_URL value', () => {
    expect(API_BASE_URL).toBe('https://dummyjson.com');
  });

  it('should export API_ENDPOINTS object', () => {
    expect(API_ENDPOINTS).toBeDefined();
    expect(typeof API_ENDPOINTS).toBe('object');
  });

  it('should have PRODUCTS endpoint', () => {
    expect(API_ENDPOINTS.PRODUCTS).toBeDefined();
    expect(API_ENDPOINTS.PRODUCTS).toBe('/products');
  });

  it('should export API_URLS object', () => {
    expect(API_URLS).toBeDefined();
    expect(typeof API_URLS).toBe('object');
  });

  it('should have PRODUCTS URL composed correctly', () => {
    expect(API_URLS.PRODUCTS).toBeDefined();
    expect(API_URLS.PRODUCTS).toBe('https://dummyjson.com/products');
  });

  it('should compose API_URLS from base URL and endpoints', () => {
    expect(API_URLS.PRODUCTS).toBe(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`);
  });

  it('should have consistent URL format', () => {
    expect(API_URLS.PRODUCTS).toMatch(/^https?:\/\//);
  });

  it('should not be empty', () => {
    expect(Object.keys(API_ENDPOINTS).length).toBeGreaterThan(0);
    expect(Object.keys(API_URLS).length).toBeGreaterThan(0);
  });

  it('should match endpoint keys with URL keys', () => {
    const endpointKeys = Object.keys(API_ENDPOINTS).sort();
    const urlKeys = Object.keys(API_URLS).sort();
    expect(endpointKeys).toEqual(urlKeys);
  });
});
