import { createSlice } from "@reduxjs/toolkit";

//Session storage
const initialState = {
  isLoggedin: false,
  isAdmin: false,
};
//Slice
export const loginDetails = createSlice({
  name: "login",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isLoggedin = action.payload;
    },
    adminAuthentication: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { authenticate, adminAuthentication } = loginDetails.actions;

export default loginDetails.reducer;
