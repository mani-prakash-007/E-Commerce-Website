// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

//Slice
export const cartProducts = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.push(action.payload);
    },
    removeProductFromCart: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    clearCart: () => {
      return []; // Clears the cart
    },
  },
});

//Actions
export const { addProductToCart, removeProductFromCart, clearCart } =
  cartProducts.actions;

//Default Export
export default cartProducts.reducer;
