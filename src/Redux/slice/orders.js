// ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const placedOrders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    confirmOrder: (state, action) => {
      state.push(action.payload); // Add order object
    },
  },
});

//Action
export const { confirmOrder } = placedOrders.actions;

//Default Reducer
export default placedOrders.reducer;
