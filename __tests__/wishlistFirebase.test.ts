/**
 * @format
 */

import {
  saveWishlistToFirebase,
  fetchWishlistFromFirebase,
  deleteWishlistFromFirebase,
  addItemToFirebaseWishlist,
} from '../src/restapi/wishlistFirebase';
import { firebaseRest, FirebaseError } from '../src/restapi/firebaseRest';

jest.mock('../src/restapi/firebaseRest');

describe('wishlistFirebase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveWishlistToFirebase', () => {
    // firebaseRest is mocked to verify parameters without real network calls.
    it('should call firebaseRest with correct parameters', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      mockFirebaseRest.mockResolvedValueOnce({});

      const userId = 'user123';
      const wishlist = [{ id: 1, name: 'Item' }];
      const token = 'token123';

      await saveWishlistToFirebase(userId, wishlist as any, token);

      expect(mockFirebaseRest).toHaveBeenCalledWith(
        `wishlists/${userId}`,
        'PUT',
        wishlist,
        token
      );
    });

    it('should handle permission denied error', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      const error = new FirebaseError('Permission denied', 'PERMISSION_DENIED', {});
      mockFirebaseRest.mockRejectedValueOnce(error);

      // Permission errors should be logged but not thrown.
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      await expect(
        saveWishlistToFirebase('user123', [], 'token123')
      ).resolves.toBeUndefined();

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should throw on non-permission errors', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      const error = new FirebaseError('Network error', 'NETWORK_ERROR', {});
      mockFirebaseRest.mockRejectedValueOnce(error);

      await expect(
        saveWishlistToFirebase('user123', [], 'token123')
      ).rejects.toThrow('Network error');
    });
  });

  describe('fetchWishlistFromFirebase', () => {
    it('should call firebaseRest with correct parameters', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      mockFirebaseRest.mockResolvedValueOnce([{ id: 1 }]);

      const userId = 'user123';
      const token = 'token123';

      await fetchWishlistFromFirebase(userId, token);

      expect(mockFirebaseRest).toHaveBeenCalledWith(
        `wishlists/${userId}`,
        'GET',
        undefined,
        token
      );
    });

    it('should return wishlist data', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      const wishlistData = [{ id: 1, name: 'Item' }];
      mockFirebaseRest.mockResolvedValueOnce(wishlistData);

      const result = await fetchWishlistFromFirebase('user123', 'token123');

      expect(result).toEqual(wishlistData);
    });

    it('should return null if Firebase returns null', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      mockFirebaseRest.mockResolvedValueOnce(null);

      const result = await fetchWishlistFromFirebase('user123', 'token123');

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      mockFirebaseRest.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchWishlistFromFirebase('user123', 'token123');

      expect(result).toBeNull();
    });
  });

  describe('deleteWishlistFromFirebase', () => {
    it('should call firebaseRest with DELETE method', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      mockFirebaseRest.mockResolvedValueOnce({});

      const userId = 'user123';
      const token = 'token123';

      await deleteWishlistFromFirebase(userId, token);

      expect(mockFirebaseRest).toHaveBeenCalledWith(
        `wishlists/${userId}`,
        'DELETE',
        undefined,
        token
      );
    });

    it('should not throw on error', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      mockFirebaseRest.mockRejectedValueOnce(new Error('Delete failed'));

      await expect(
        deleteWishlistFromFirebase('user123', 'token123')
      ).resolves.toBeUndefined();
    });
  });

  describe('addItemToFirebaseWishlist', () => {
    it('should call firebaseRest with correct path and item', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      mockFirebaseRest.mockResolvedValueOnce({});

      const userId = 'user123';
      const item = { id: 1, name: 'Item' } as any;
      const token = 'token123';

      await addItemToFirebaseWishlist(userId, item, token);

      expect(mockFirebaseRest).toHaveBeenCalledWith(
        `wishlists/${userId}/${item.id}`,
        'PUT',
        item,
        token
      );
    });

    it('should handle permission denied error gracefully', async () => {
      const mockFirebaseRest = firebaseRest as jest.MockedFunction<typeof firebaseRest>;
      const error = new FirebaseError('Permission denied', 'PERMISSION_DENIED', {});
      mockFirebaseRest.mockRejectedValueOnce(error);

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      await addItemToFirebaseWishlist('user123', { id: 1 } as any, 'token123');

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
