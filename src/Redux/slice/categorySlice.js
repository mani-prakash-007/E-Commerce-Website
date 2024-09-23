import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Fetch Category
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (_, { rejecWithValue }) => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      return response.data;
    } catch (error) {
      return rejecWithValue(error.message);
    }
  }
);


const initialState = {
  category: [],
  loading: false,
  error: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//Actions
export const {} = categorySlice.actions;

//Default Export

export default categorySlice.reducer;
