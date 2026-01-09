/**
 * @format
 */

import { setJson, getJson, removeItem } from '../src/persistence/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');

describe('storage utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setJson', () => {
    // Persist values as JSON strings in AsyncStorage.
    it('should call AsyncStorage.setItem with stringified JSON', async () => {
      const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<
        typeof AsyncStorage.setItem
      >;
      mockSetItem.mockResolvedValueOnce();

      const key = 'test_key';
      const value = { test: 'data' };

      await setJson(key, value);

      expect(mockSetItem).toHaveBeenCalledWith(key, JSON.stringify(value));
    });

    it('should handle string values', async () => {
      const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<
        typeof AsyncStorage.setItem
      >;
      mockSetItem.mockResolvedValueOnce();

      await setJson('key', 'string value');

      expect(mockSetItem).toHaveBeenCalledWith('key', '"string value"');
    });

    it('should handle array values', async () => {
      const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<
        typeof AsyncStorage.setItem
      >;
      mockSetItem.mockResolvedValueOnce();

      const array = [1, 2, 3];
      await setJson('key', array);

      expect(mockSetItem).toHaveBeenCalledWith('key', JSON.stringify(array));
    });

    it('should handle null values', async () => {
      const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<
        typeof AsyncStorage.setItem
      >;
      mockSetItem.mockResolvedValueOnce();

      await setJson('key', null);

      expect(mockSetItem).toHaveBeenCalledWith('key', 'null');
    });

    it('should log warning on error', async () => {
      const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<
        typeof AsyncStorage.setItem
      >;
      const error = new Error('Storage error');
      mockSetItem.mockRejectedValueOnce(error);

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      await setJson('key', { data: 'test' });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getJson', () => {
    it('should parse and return JSON data', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<
        typeof AsyncStorage.getItem
      >;
      const testData = { test: 'data' };
      mockGetItem.mockResolvedValueOnce(JSON.stringify(testData));

      const result = await getJson('key');

      expect(result).toEqual(testData);
    });

    it('should return null if item does not exist', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<
        typeof AsyncStorage.getItem
      >;
      mockGetItem.mockResolvedValueOnce(null);

      const result = await getJson('key');

      expect(result).toBeNull();
    });

    it('should return null on parse error', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<
        typeof AsyncStorage.getItem
      >;
      mockGetItem.mockResolvedValueOnce('invalid json{');

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      const result = await getJson('key');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should handle array data', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<
        typeof AsyncStorage.getItem
      >;
      const arrayData = [1, 2, 3];
      mockGetItem.mockResolvedValueOnce(JSON.stringify(arrayData));

      const result = await getJson('key');

      expect(result).toEqual(arrayData);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should call AsyncStorage.getItem with correct key', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<
        typeof AsyncStorage.getItem
      >;
      mockGetItem.mockResolvedValueOnce(null);

      await getJson('test_key');

      expect(mockGetItem).toHaveBeenCalledWith('test_key');
    });
  });

  describe('removeItem', () => {
    it('should call AsyncStorage.removeItem', async () => {
      const mockRemoveItem = AsyncStorage.removeItem as jest.MockedFunction<
        typeof AsyncStorage.removeItem
      >;
      mockRemoveItem.mockResolvedValueOnce();

      await removeItem('key');

      expect(mockRemoveItem).toHaveBeenCalledWith('key');
    });

    it('should handle removal errors gracefully', async () => {
      const mockRemoveItem = AsyncStorage.removeItem as jest.MockedFunction<
        typeof AsyncStorage.removeItem
      >;
      mockRemoveItem.mockRejectedValueOnce(new Error('Remove failed'));

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      await removeItem('key');

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should call with correct key', async () => {
      const mockRemoveItem = AsyncStorage.removeItem as jest.MockedFunction<
        typeof AsyncStorage.removeItem
      >;
      mockRemoveItem.mockResolvedValueOnce();

      await removeItem('test_key');

      expect(mockRemoveItem).toHaveBeenCalledWith('test_key');
    });
  });
});
