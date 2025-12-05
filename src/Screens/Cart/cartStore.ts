import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import themeReducer from "../Profile/themeSlice";

import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

export const cartStore = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof cartStore.getState>;
export type AppDispatch = typeof cartStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
