import { configureStore } from "@reduxjs/toolkit";
import allProductsReducer from "../slice/allProductsSlice";
import categoryReducer from "../slice/categorySlice";
import cartReducer from "../slice/cart";
import loginReducer from "../slice/login";
import orderReducer from "../slice/orders";

//Store Configuration
export const store = configureStore({
  reducer: {
    allProducts: allProductsReducer,
    categories: categoryReducer,
    cartProducts: cartReducer,
    loginDetails: loginReducer,
    orders: orderReducer,
  },
});
