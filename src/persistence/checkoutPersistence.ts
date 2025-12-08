// src/persistence/checkoutPersistence.ts
import { getJson, setJson, removeItem } from "./storage";

export type CheckoutFormData = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
};

const CHECKOUT_KEY = "CHECKOUT_FORM_V1";

export async function loadCheckoutForm() {
  return getJson<CheckoutFormData>(CHECKOUT_KEY);
}

export async function saveCheckoutForm(data: CheckoutFormData) {
  return setJson(CHECKOUT_KEY, data);
}

export async function clearCheckoutForm() {
  return removeItem(CHECKOUT_KEY);
}
