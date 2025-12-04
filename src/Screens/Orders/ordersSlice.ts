import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../Cart/cartSlice";

export interface Order {
  orderId: string;
  userId: string; 
  items: CartItem[];
  total: string;
  date: string;
  paymentMethod: string;
}

interface OrdersState {
  orderHistory: Order[];
}

const initialState: OrdersState = {
  orderHistory: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orderHistory.push(action.payload);
    },
    clearOrdersForUser: (state, action: PayloadAction<string>) => {
      state.orderHistory = state.orderHistory.filter(
        (order) => order.userId !== action.payload
      );
    },
  },
});

export const { addOrder, clearOrdersForUser } = ordersSlice.actions;
export default ordersSlice.reducer;
