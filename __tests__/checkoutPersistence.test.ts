/**
 * @format
 */

import {
  loadCheckoutForm,
  saveCheckoutForm,
  clearCheckoutForm,
  CheckoutFormData,
} from '../src/persistence/checkoutPersistence';
import * as storage from '../src/persistence/storage';

jest.mock('../src/persistence/storage');

describe('checkoutPersistence', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadCheckoutForm', () => {
    // Checkout form data is stored under a versioned storage key.
    it('should call getJson with CHECKOUT_KEY', async () => {
      const mockGetJson = storage.getJson as jest.MockedFunction<typeof storage.getJson>;
      mockGetJson.mockResolvedValueOnce(null);

      await loadCheckoutForm();

      expect(mockGetJson).toHaveBeenCalledWith('CHECKOUT_FORM_V1');
    });

    it('should return checkout form data', async () => {
      const mockGetJson = storage.getJson as jest.MockedFunction<typeof storage.getJson>;
      const formData: CheckoutFormData = {
        fullName: 'John Doe',
        phone: '1234567890',
        street: '123 Main St',
        city: 'New York',
        zip: '10001',
      };
      mockGetJson.mockResolvedValueOnce(formData);

      const result = await loadCheckoutForm();

      expect(result).toEqual(formData);
    });

    it('should return null if form does not exist', async () => {
      const mockGetJson = storage.getJson as jest.MockedFunction<typeof storage.getJson>;
      mockGetJson.mockResolvedValueOnce(null);

      const result = await loadCheckoutForm();

      expect(result).toBeNull();
    });

    it('should handle form data with all fields', async () => {
      const mockGetJson = storage.getJson as jest.MockedFunction<typeof storage.getJson>;
      const completeForm: CheckoutFormData = {
        fullName: 'Jane Smith',
        phone: '9876543210',
        street: '456 Oak Ave',
        city: 'Los Angeles',
        zip: '90001',
      };
      mockGetJson.mockResolvedValueOnce(completeForm);

      const result = await loadCheckoutForm();

      expect(result?.fullName).toBe('Jane Smith');
      expect(result?.phone).toBe('9876543210');
      expect(result?.street).toBe('456 Oak Ave');
      expect(result?.city).toBe('Los Angeles');
      expect(result?.zip).toBe('90001');
    });
  });

  describe('saveCheckoutForm', () => {
    it('should call setJson with CHECKOUT_KEY and data', async () => {
      const mockSetJson = storage.setJson as jest.MockedFunction<typeof storage.setJson>;
      mockSetJson.mockResolvedValueOnce();

      const formData: CheckoutFormData = {
        fullName: 'John Doe',
        phone: '1234567890',
        street: '123 Main St',
        city: 'New York',
        zip: '10001',
      };

      await saveCheckoutForm(formData);

      expect(mockSetJson).toHaveBeenCalledWith('CHECKOUT_FORM_V1', formData);
    });

    it('should handle saving complete form data', async () => {
      const mockSetJson = storage.setJson as jest.MockedFunction<typeof storage.setJson>;
      mockSetJson.mockResolvedValueOnce();

      const formData: CheckoutFormData = {
        fullName: 'Alice Johnson',
        phone: '5555555555',
        street: '789 Pine Rd',
        city: 'Chicago',
        zip: '60601',
      };

      await saveCheckoutForm(formData);

      expect(mockSetJson).toHaveBeenCalledWith('CHECKOUT_FORM_V1', formData);
    });

    it('should persist form data correctly', async () => {
      const mockSetJson = storage.setJson as jest.MockedFunction<typeof storage.setJson>;
      mockSetJson.mockResolvedValueOnce();

      const testData: CheckoutFormData = {
        fullName: 'Bob Brown',
        phone: '1111111111',
        street: '321 Elm St',
        city: 'Boston',
        zip: '02101',
      };

      const result = await saveCheckoutForm(testData);

      expect(mockSetJson).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('clearCheckoutForm', () => {
    it('should call removeItem with CHECKOUT_KEY', async () => {
      const mockRemoveItem = storage.removeItem as jest.MockedFunction<typeof storage.removeItem>;
      mockRemoveItem.mockResolvedValueOnce();

      await clearCheckoutForm();

      expect(mockRemoveItem).toHaveBeenCalledWith('CHECKOUT_FORM_V1');
    });

    it('should clear the form without throwing', async () => {
      const mockRemoveItem = storage.removeItem as jest.MockedFunction<typeof storage.removeItem>;
      mockRemoveItem.mockResolvedValueOnce();

      const result = await clearCheckoutForm();

      expect(result).toBeUndefined();
      expect(mockRemoveItem).toHaveBeenCalled();
    });

    it('should handle removal errors', async () => {
      const mockRemoveItem = storage.removeItem as jest.MockedFunction<typeof storage.removeItem>;
      mockRemoveItem.mockRejectedValueOnce(new Error('Remove failed'));

      await clearCheckoutForm();

      expect(mockRemoveItem).toHaveBeenCalled();
    });
  });

  describe('CheckoutFormData type', () => {
    it('should have all required fields', () => {
      const form: CheckoutFormData = {
        fullName: 'Test User',
        phone: '1234567890',
        street: 'Street Address',
        city: 'City',
        zip: '12345',
      };

      expect(form.fullName).toBeDefined();
      expect(form.phone).toBeDefined();
      expect(form.street).toBeDefined();
      expect(form.city).toBeDefined();
      expect(form.zip).toBeDefined();
    });
  });
});
