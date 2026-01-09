/**
 * @format
 */

import { getAuthData } from '../src/restapi/authHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');

describe('authHelpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAuthData', () => {
    // AsyncStorage is mocked so we can control auth values for each test.
    it('should return user ID and valid token', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;

      // The helper reads multiple keys in sequence, so we queue values in order.
      mockGetItem
        .mockResolvedValueOnce('user123')
        .mockResolvedValueOnce('valid_token')
        .mockResolvedValueOnce('refresh_token')
        .mockResolvedValueOnce(Date.now().toString());

      const result = await getAuthData();

      expect(result.userId).toBe('user123');
      expect(result.idToken).toBe('valid_token');
    });

    it('should throw error when userId is missing', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem.mockResolvedValueOnce(null);

      await expect(getAuthData()).rejects.toThrow('User not authenticated');
    });

    it('should return idToken when not expired', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      const futureExpiry = (Date.now() + 3600000).toString();

      mockGetItem
        .mockResolvedValueOnce('user123')
        .mockResolvedValueOnce('current_token')
        .mockResolvedValueOnce('refresh_token')
        .mockResolvedValueOnce(futureExpiry);

      const result = await getAuthData();
      expect(result.idToken).toBe('current_token');
    });

    it('should handle missing refresh token', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;

      mockGetItem
        .mockResolvedValueOnce('user123')
        .mockResolvedValueOnce('token')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce((Date.now() + 3600000).toString());

      const result = await getAuthData();
      expect(result).toBeDefined();
    });

    it('should retrieve all required auth keys', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      const futureExpiry = (Date.now() + 3600000).toString();

      mockGetItem
        .mockResolvedValueOnce('user123')
        .mockResolvedValueOnce('token')
        .mockResolvedValueOnce('refresh_token')
        .mockResolvedValueOnce(futureExpiry);

      await getAuthData();
      expect(mockGetItem).toHaveBeenCalledTimes(4);
    });

    it('should validate auth data structure', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;

      mockGetItem
        .mockResolvedValueOnce('user123')
        .mockResolvedValueOnce('token')
        .mockResolvedValueOnce('refresh_token')
        .mockResolvedValueOnce((Date.now() + 3600000).toString());

      const result = await getAuthData();
      expect(result).toHaveProperty('userId');
      expect(result).toHaveProperty('idToken');
      expect(typeof result.userId).toBe('string');
      expect(typeof result.idToken).toBe('string');
    });

    it('should require both userId and idToken for authentication', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;

      mockGetItem
        .mockResolvedValueOnce('user123')
        .mockResolvedValueOnce(null);

      await expect(getAuthData()).rejects.toThrow('User not authenticated');
    });
  });
});
