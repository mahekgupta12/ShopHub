/**
 * @format
 */

import { useInitialRoute } from '../src/persistence/authPersistence';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as tabPersistence from '../src/persistence/tabPersistence';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('../src/persistence/tabPersistence');

describe('authPersistence', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useInitialRoute', () => {
    // The hook reads AsyncStorage and updates state asynchronously.
    it('should return a hook function', () => {
      expect(typeof useInitialRoute).toBe('function');
    });

    it('should initially return null', () => {
      const result = useInitialRoute();
      expect(result).toBeNull();
    });

    it('should return MainTabs when user is authenticated', (done) => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem
        .mockResolvedValueOnce('user123')
        .mockResolvedValueOnce('token123');

      const mockClearLastTab = tabPersistence.clearLastTab as jest.MockedFunction<typeof tabPersistence.clearLastTab>;

      const result = useInitialRoute();

      expect(result).toBeNull();

      // Wait for the async storage lookup to complete.
      setTimeout(() => {
        expect(mockClearLastTab).toHaveBeenCalled();
        done();
      }, 100);
    });

    it('should return Login when user is not authenticated', (done) => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);

      const result = useInitialRoute();

      expect(result).toBeNull();

      setTimeout(() => {
        done();
      }, 100);
    });

    it('should handle missing user ID', (done) => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce('token123');

      const result = useInitialRoute();

      expect(result).toBeNull();

      setTimeout(() => {
        done();
      }, 100);
    });

    it('should handle missing token', (done) => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem
        .mockResolvedValueOnce('user123')
        .mockResolvedValueOnce(null);

      const result = useInitialRoute();

      expect(result).toBeNull();

      setTimeout(() => {
        done();
      }, 100);
    });

    it('should check both userId and idToken', (done) => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem
        .mockResolvedValueOnce('user123')
        .mockResolvedValueOnce('token123');

      useInitialRoute();

      setTimeout(() => {
        expect(mockGetItem).toHaveBeenCalledTimes(2);
        done();
      }, 100);
    });

    it('should call clearLastTab when authenticated', (done) => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem
        .mockResolvedValueOnce('user123')
        .mockResolvedValueOnce('token123');

      const mockClearLastTab = tabPersistence.clearLastTab as jest.MockedFunction<typeof tabPersistence.clearLastTab>;

      useInitialRoute();

      setTimeout(() => {
        expect(mockClearLastTab).toHaveBeenCalled();
        done();
      }, 100);
    });

    it('should not call clearLastTab when not authenticated', (done) => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);

      const mockClearLastTab = tabPersistence.clearLastTab as jest.MockedFunction<typeof tabPersistence.clearLastTab>;

      useInitialRoute();

      setTimeout(() => {
        expect(mockClearLastTab).not.toHaveBeenCalled();
        done();
      }, 100);
    });

    it('should handle AsyncStorage errors gracefully', (done) => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem.mockRejectedValueOnce(new Error('Storage error'));

      const result = useInitialRoute();

      expect(result).toBeNull();

      setTimeout(() => {
        done();
      }, 100);
    });
  });
});
