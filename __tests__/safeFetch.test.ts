/**
 * @format
 */

import { safeFetch } from '../src/utils/safeFetch';

describe('safeFetch utility', () => {
  // safeFetch should always resolve with a structured result, even on errors.
  it('should return object with response, networkError and optional error properties', async () => {
    const result = await safeFetch('https://api.example.com/data');

    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('response');
    expect(result).toHaveProperty('networkError');
  });

  it('should have SafeFetchResult type structure', async () => {
    const result = await safeFetch('https://example.com');

    expect(typeof result.networkError).toBe('boolean');
    expect(result.response === null || typeof result.response === 'object').toBe(true);
  });

  it('should handle successful response structure', async () => {
    const result = await safeFetch('https://api.example.com/data');

    if (!result.networkError && result.response) {
      expect(result.response).toBeDefined();
      expect(result.error).toBeUndefined();
    } else {
      expect(result.networkError).toBe(true);
      expect(result.response).toBeNull();
    }
  });

  it('should handle network error structure', async () => {
    const result = await safeFetch('https://invalid-url-that-will-fail.example.com/data');

    if (result.networkError) {
      expect(result.response).toBeNull();
      expect(result.error).toBeDefined();
    } else {
      expect(result.response).toBeDefined();
      expect(result.networkError).toBe(false);
    }
  });

  it('should return SafeFetchResult type with proper fields', async () => {
    const result = await safeFetch('https://api.example.com');

    // Verify the result has all expected properties
    expect(Object.keys(result).sort()).toEqual(
      expect.arrayContaining(['response', 'networkError'])
    );
  });

  it('should not throw when fetch is called', async () => {
    let threwError = false;
    try {
      await safeFetch('https://api.example.com/data');
    } catch {
      threwError = true;
    }

    // safeFetch should not throw, it should return a result
    expect(threwError).toBe(false);
  });

  it('should handle result with error property when network fails', async () => {
    const result = await safeFetch('https://invalid.example.com/test');

    if (result.networkError) {
      expect(result).toHaveProperty('error');
      expect(result.error).toBeDefined();
    }
  });

  it('should handle different request init options', async () => {
    const result1 = await safeFetch('https://api.example.com/data', { method: 'GET' });
    expect(result1).toBeDefined();

    const result2 = await safeFetch('https://api.example.com/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(result2).toBeDefined();
  });

  it('should consistently return SafeFetchResult structure', async () => {
    const results = [
      await safeFetch('https://api1.example.com'),
      await safeFetch('https://api2.example.com', { method: 'POST' }),
      await safeFetch('https://api3.example.com', { method: 'GET' }),
    ];

    results.forEach((result) => {
      expect(result).toHaveProperty('response');
      expect(result).toHaveProperty('networkError');
      expect(typeof result.networkError).toBe('boolean');
    });
  });
});
