import { createSlice } from "@reduxjs/toolkit";

//Session storage
let initialLoginStatus;

if (sessionStorage.getItem("isLoggedin") === "true") {
  initialLoginStatus = sessionStorage.getItem("isLoggedin");
} else {
  initialLoginStatus = sessionStorage.setItem("isLoggedin", "false");
}

const initialState = {
  email: "manip8072@gmail.com",
  password: "Mani@2003",
  isLoggedin: initialLoginStatus,
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
