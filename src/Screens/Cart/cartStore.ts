import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import themeReducer from "../profile/ThemeSlice";
import ordersReducer from "../orders/OrdersSlice";

import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import {
  bootstrapTheme,
  watchThemeChanges,
} from "../../persistence/ThemePersistence";

export const cartStore = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    orders: ordersReducer,
  },
});

watchThemeChanges(cartStore);
bootstrapTheme(cartStore);

export type RootState = ReturnType<typeof cartStore.getState>;
export type AppDispatch = typeof cartStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
