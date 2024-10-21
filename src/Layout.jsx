import React from "react";
import { Header } from "./Components/Header/Header";
import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "./Components/Footer/Footer";
import { useSelector } from "react-redux";

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
