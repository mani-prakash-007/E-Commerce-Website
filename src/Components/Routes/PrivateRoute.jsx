import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = () => {
  //Getting Login Flag from session Storage
  const isLoggedIn = useSelector((state) => state.loginDetails.isLoggedin);

  //Navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  //If not logedin , redirect to login page
  return isLoggedIn ? <Outlet /> : <Navigate to={"login"} />;
};
