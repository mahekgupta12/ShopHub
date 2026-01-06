import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import themeReducer from "../profile/themeSlice";
import ordersReducer from "../orders/ordersSlice";
import wishlistReducer from "../wishlist/wishlistSlice";

import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import {
  bootstrapTheme,
  watchThemeChanges,
} from "../../persistence/themePersistence";
import {
  bootstrapWishlist,
  watchWishlistChanges,
} from "../../persistence/wishlistPersistence";

export const cartStore = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    orders: ordersReducer,
    wishlist: wishlistReducer,
  },
});

watchThemeChanges(cartStore);
bootstrapTheme(cartStore);
watchWishlistChanges(cartStore);
bootstrapWishlist(cartStore.dispatch);

export type RootState = ReturnType<typeof cartStore.getState>;
export type AppDispatch = typeof cartStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
