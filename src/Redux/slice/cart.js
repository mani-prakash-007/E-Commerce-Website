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
      return state.filter((product) => {
        return product.id !== action.payload;
      });
    },
  },
});

//Actions
export const { addProductToCart, removeProductFromCart } = cartProducts.actions;

//Default Export
export default cartProducts.reducer;
