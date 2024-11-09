// ordersSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}fake-store/order/`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
          },
        }
      );
      return response.data.details;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allOrders: [],
  loading: false,
  error: "",
};

const placedOrders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrder: (state, action) => {
      state.allOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//Action
export const { clearOrder } = placedOrders.actions;

//Default Reducer
export default placedOrders.reducer;
