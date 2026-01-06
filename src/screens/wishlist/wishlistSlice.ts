import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../home/api";

export interface WishlistItem extends Product {
  quantity?: number;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    setWishlist(state, action: PayloadAction<WishlistItem[] | null | undefined>) {
      state.items = Array.isArray(action.payload)
        ? action.payload.filter(
            (item): item is WishlistItem =>
              item !== null &&
              item !== undefined &&
              typeof item.id === "number"
          )
        : [];
    },

    addToWishlist: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);

      if (!existing) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseWishlistQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity = (item.quantity ?? 1) + 1;
      }
    },

    decreaseWishlistQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;

      if ((item.quantity ?? 1) > 1) {
        item.quantity = (item.quantity ?? 1) - 1;
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  setWishlist,
  addToWishlist,
  removeFromWishlist,
  increaseWishlistQty,
  decreaseWishlistQty,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
