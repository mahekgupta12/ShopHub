import { getJson, setJson, removeItem } from "./storage";
import type { AppDispatch } from "../screens/cart/cartStore";
import type { CartItem } from "../screens/cart/cartSlice";
import { setCart, clearCart } from "../screens/cart/cartSlice";

const CART_KEY = "shophub_cart";

export async function saveCart(cartItems: unknown) {
  await setJson(CART_KEY, cartItems);
}

export async function loadCart(): Promise<CartItem[] | null> {
  return getJson<CartItem[]>(CART_KEY);
}

export async function deleteCart() {
  await removeItem(CART_KEY);
}

export function bootstrapCart(dispatch: AppDispatch) {
  loadCart()
    .then((cart) => {
      dispatch(setCart(cart));
    })
    .catch(() => {
      dispatch(clearCart());
    });
}

export function watchCartChanges(store: any) {
  let previousCart = store.getState().cart.items;

  const unsubscribe = store.subscribe(() => {
    const currentCart = store.getState().cart.items;

    if (previousCart !== currentCart) {
      previousCart = currentCart;
      saveCart(currentCart);
    }
  });

  return unsubscribe;
}
