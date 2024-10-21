import { createSlice } from "@reduxjs/toolkit";

//Session storage
let initialLoginStatus;

if (sessionStorage.getItem("isLoggedin") === "true") {
  initialLoginStatus = sessionStorage.getItem("isLoggedin");
} else {
  initialLoginStatus = sessionStorage.setItem("isLoggedin", "false");
}

const initialState = {
  isLoggedin: initialLoginStatus,
  isAdmin: false,
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
    adminAuthentication: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { authenticate , adminAuthentication } = loginDetails.actions;

export default loginDetails.reducer;
