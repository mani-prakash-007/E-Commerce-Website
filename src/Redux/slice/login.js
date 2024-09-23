import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "manip8072@gmail.com",
  password: "Mani@2003",
  isLoggedin: false,
};
//Slice
export const loginDetails = createSlice({
  name: "login",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isLoggedin = action.payload;
      sessionStorage.setItem("isLoggedin", action.payload);
    },
  },
});

export const { authenticate } = loginDetails.actions;

export default loginDetails.reducer;
