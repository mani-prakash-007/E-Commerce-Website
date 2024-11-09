// cartSlice.js
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

//Fetch Cart Items
export const fetchAllCartProducts = createAsyncThunk(
  "cartProducts/fetchAllCartProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}fake-store/cart/`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
          },
        }
      );
      return response.data.cartProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allCartProducts: [],
  loading: false,
  error: "",
};

//Slice
export const cartProducts = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.allCartProducts = action.payload;
    },
    removeProductFromCart: (state, action) => {
      return state.allCartProducts.filter(
        (product) => product.product_id !== action.payload
      );
    },
    clearCart: (state, action) => {
      state.allCartProducts = []; // Clears the cart
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCartProducts.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allCartProducts = action.payload;
      })
      .addCase(fetchAllCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//Actions
export const { addProductToCart, removeProductFromCart, clearCart } =
  cartProducts.actions;

//Default Export
export default cartProducts.reducer;
