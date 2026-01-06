import { getJson, setJson, removeItem } from "./storage";
import type { AppDispatch } from "../screens/cart/cartStore";
import type { WishlistItem } from "../screens/wishlist/wishlistSlice";
import { setWishlist, clearWishlist } from "../screens/wishlist/wishlistSlice";

const WISHLIST_KEY = "shophub_wishlist";

export async function saveWishlist(wishlistItems: unknown) {
  await setJson(WISHLIST_KEY, wishlistItems);
}

export async function loadWishlist(): Promise<WishlistItem[] | null> {
  return getJson<WishlistItem[]>(WISHLIST_KEY);
}

export async function deleteWishlist() {
  await removeItem(WISHLIST_KEY);
}

export function bootstrapWishlist(dispatch: AppDispatch) {
  loadWishlist()
    .then((wishlist) => {
      dispatch(setWishlist(wishlist));
    })
    .catch(() => {
      dispatch(clearWishlist());
    });
}

export function watchWishlistChanges(store: any) {
  let previousWishlist = store.getState().wishlist.items;

  const unsubscribe = store.subscribe(() => {
    const currentWishlist = store.getState().wishlist.items;

    if (previousWishlist !== currentWishlist) {
      previousWishlist = currentWishlist;
      saveWishlist(currentWishlist);
    }
  });

  return unsubscribe;
}
