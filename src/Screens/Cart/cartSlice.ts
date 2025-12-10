import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart(state, action) {
      state.items = action.payload;
    },

    addItem(state, action) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    increaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else state.items = state.items.filter((i) => i.id !== item.id);
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addItem, increaseQty, decreaseQty, removeItem, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
