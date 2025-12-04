import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import ordersReducer from "../Orders/ordersSlice";

export const cartStore = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof cartStore.getState>;
export type AppDispatch = typeof cartStore.dispatch;
