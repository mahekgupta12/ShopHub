/**
 * @format
 */

import {
  USER_ID_KEY,
  ID_TOKEN_KEY,
  EMAIL_KEY,
  DISPLAY_NAME_KEY,
  REFRESH_TOKEN_KEY,
  ID_TOKEN_EXP_KEY,
} from '../src/restapi/authKeys';

describe('authKeys', () => {
  // These constants define AsyncStorage keys used across auth flows.
  it('should export USER_ID_KEY', () => {
    expect(USER_ID_KEY).toBeDefined();
    expect(typeof USER_ID_KEY).toBe('string');
  });

  it('should export ID_TOKEN_KEY', () => {
    expect(ID_TOKEN_KEY).toBeDefined();
    expect(typeof ID_TOKEN_KEY).toBe('string');
  });

  it('should export EMAIL_KEY', () => {
    expect(EMAIL_KEY).toBeDefined();
    expect(typeof EMAIL_KEY).toBe('string');
  });

  it('should export DISPLAY_NAME_KEY', () => {
    expect(DISPLAY_NAME_KEY).toBeDefined();
    expect(typeof DISPLAY_NAME_KEY).toBe('string');
  });

  it('should export REFRESH_TOKEN_KEY', () => {
    expect(REFRESH_TOKEN_KEY).toBeDefined();
    expect(typeof REFRESH_TOKEN_KEY).toBe('string');
  });

  it('should export ID_TOKEN_EXP_KEY', () => {
    expect(ID_TOKEN_EXP_KEY).toBeDefined();
    expect(typeof ID_TOKEN_EXP_KEY).toBe('string');
  });

  it('should have correct USER_ID_KEY value', () => {
    expect(USER_ID_KEY).toBe('USER_ID');
  });

  it('should have correct ID_TOKEN_KEY value', () => {
    expect(ID_TOKEN_KEY).toBe('ID_TOKEN');
  });

  it('should have correct EMAIL_KEY value', () => {
    expect(EMAIL_KEY).toBe('USER_EMAIL');
  });

  it('should have correct DISPLAY_NAME_KEY value', () => {
    expect(DISPLAY_NAME_KEY).toBe('DISPLAY_NAME');
  });

  it('should have correct REFRESH_TOKEN_KEY value', () => {
    expect(REFRESH_TOKEN_KEY).toBe('REFRESH_TOKEN');
  });

  it('should have correct ID_TOKEN_EXP_KEY value', () => {
    expect(ID_TOKEN_EXP_KEY).toBe('ID_TOKEN_EXP');
  });

  it('should all be unique keys', () => {
    const keys = [
      USER_ID_KEY,
      ID_TOKEN_KEY,
      EMAIL_KEY,
      DISPLAY_NAME_KEY,
      REFRESH_TOKEN_KEY,
      ID_TOKEN_EXP_KEY,
    ];
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(keys.length);
  });
});
