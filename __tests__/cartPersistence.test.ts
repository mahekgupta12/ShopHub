/**
 * @format
 */

import { saveCart, loadCart, deleteCart, bootstrapCart, watchCartChanges } from '../src/persistence/cartPersistence';
import * as storage from '../src/persistence/storage';
import { setCart, clearCart } from '../src/screens/cart/cartSlice';

jest.mock('../src/persistence/storage');
jest.mock('../src/screens/cart/cartSlice');

describe('cartPersistence', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveCart', () => {
    // Save should persist items under a fixed storage key.
    it('should call setJson with CART_KEY and items', async () => {
      const mockSetJson = storage.setJson as jest.MockedFunction<typeof storage.setJson>;
      mockSetJson.mockResolvedValueOnce();

      const cartItems = [{ id: 1, name: 'Item' }];
      await saveCart(cartItems);

      expect(mockSetJson).toHaveBeenCalledWith('shophub_cart', cartItems);
    });

    it('should handle array of items', async () => {
      const mockSetJson = storage.setJson as jest.MockedFunction<typeof storage.setJson>;
      mockSetJson.mockResolvedValueOnce();

      const items = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
      ];
      await saveCart(items);

      expect(mockSetJson).toHaveBeenCalledWith('shophub_cart', items);
    });

    it('should handle empty array', async () => {
      const mockSetJson = storage.setJson as jest.MockedFunction<typeof storage.setJson>;
      mockSetJson.mockResolvedValueOnce();

      await saveCart([]);

      expect(mockSetJson).toHaveBeenCalledWith('shophub_cart', []);
    });
  });

  describe('loadCart', () => {
    it('should call getJson with CART_KEY', async () => {
      const mockGetJson = storage.getJson as jest.MockedFunction<typeof storage.getJson>;
      mockGetJson.mockResolvedValueOnce(null);

      await loadCart();

      expect(mockGetJson).toHaveBeenCalledWith('shophub_cart');
    });

    it('should return cart items', async () => {
      const mockGetJson = storage.getJson as jest.MockedFunction<typeof storage.getJson>;
      const cartItems = [{ id: 1, name: 'Item' }];
      mockGetJson.mockResolvedValueOnce(cartItems as any);

      const result = await loadCart();

      expect(result).toEqual(cartItems);
    });

    it('should return null if cart does not exist', async () => {
      const mockGetJson = storage.getJson as jest.MockedFunction<typeof storage.getJson>;
      mockGetJson.mockResolvedValueOnce(null);

      const result = await loadCart();

      expect(result).toBeNull();
    });
  });

  describe('deleteCart', () => {
    it('should call removeItem with CART_KEY', async () => {
      const mockRemoveItem = storage.removeItem as jest.MockedFunction<typeof storage.removeItem>;
      mockRemoveItem.mockResolvedValueOnce();

      await deleteCart();

      expect(mockRemoveItem).toHaveBeenCalledWith('shophub_cart');
    });
  });

  describe('bootstrapCart', () => {
    it('should dispatch setCart with loaded items', async () => {
      const mockGetJson = storage.getJson as jest.MockedFunction<typeof storage.getJson>;
      const mockSetCart = setCart as jest.MockedFunction<typeof setCart>;
      const cartItems = [{ id: 1 }];
      mockGetJson.mockResolvedValueOnce(cartItems as any);
      mockSetCart.mockReturnValueOnce({ type: 'cart/setCart' } as any);

      const dispatch = jest.fn();
      await bootstrapCart(dispatch);

      // Wait for promise to resolve
      await new Promise((resolve: any) => setTimeout(resolve, 0));

      expect(mockSetCart).toHaveBeenCalledWith(cartItems);
    });

    it('should dispatch clearCart on error', async () => {
      const mockGetJson = storage.getJson as jest.MockedFunction<typeof storage.getJson>;
      const mockClearCart = clearCart as jest.MockedFunction<typeof clearCart>;
      mockGetJson.mockRejectedValueOnce(new Error('Load failed'));
      mockClearCart.mockReturnValueOnce({ type: 'cart/clearCart' } as any);

      const dispatch = jest.fn();
      bootstrapCart(dispatch);

      // Wait for promise to resolve
      await new Promise((resolve: any) => setTimeout(resolve, 10));

      expect(mockClearCart).toHaveBeenCalled();
    });
  });

  describe('watchCartChanges', () => {
    it('should return unsubscribe function', () => {
      const store = {
        getState: jest.fn().mockReturnValue({ cart: { items: [] } }),
        subscribe: jest.fn().mockReturnValue(() => {}),
      };

      const unsubscribe = watchCartChanges(store);

      expect(typeof unsubscribe).toBe('function');
    });

    it('should subscribe to store changes', () => {
      const store = {
        getState: jest.fn().mockReturnValue({ cart: { items: [] } }),
        subscribe: jest.fn().mockReturnValue(() => {}),
      };

      watchCartChanges(store);

      expect(store.subscribe).toHaveBeenCalled();
    });

    it('should call saveCart when cart items change', async () => {
      const mockSetJson = storage.setJson as jest.MockedFunction<typeof storage.setJson>;
      mockSetJson.mockResolvedValueOnce();

      const newItems = [{ id: 1 }];
      let subscriberCallback: any;

      const store = {
        getState: jest
          .fn()
          .mockReturnValueOnce({ cart: { items: [] } })
          .mockReturnValueOnce({ cart: { items: newItems } }),
        subscribe: jest.fn((callback) => {
          subscriberCallback = callback;
          return () => {};
        }),
      };

      watchCartChanges(store);

      // Trigger the subscriber to simulate a store update.
      if (subscriberCallback) {
        subscriberCallback();
      }

      expect(mockSetJson).toHaveBeenCalledWith('shophub_cart', newItems);
    });
  });
});
