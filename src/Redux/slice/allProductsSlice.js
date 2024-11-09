import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Fetch products
export const fetchAllProducts = createAsyncThunk(
  "allProducts/fetchAllProducts", //Action Type
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}fake-store/product/`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
          },
        }
      );
      return response.data.All_Products.details;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Initial State
const initialState = {
  allProducts: [],
  loading: false,
  error: "",
};

//Slice
export const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//Actions
export const {} = allProductsSlice.actions;

//Default Export
export default allProductsSlice.reducer;
