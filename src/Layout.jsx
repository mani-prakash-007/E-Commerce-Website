import React from "react";
import { Header } from "./Components/Header/Header";
import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "./Components/Footer/Footer";

export const Layout = () => {
  // //getting login status
  // const isLoggedIn = sessionStorage.getItem("isLoggedin");

  // //Redirect if not Logged in
  // if (!isLoggedIn) {
  //   return <Navigate to={"/login"} />;
  // }

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
