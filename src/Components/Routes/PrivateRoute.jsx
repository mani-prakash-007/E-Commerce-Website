import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  //Getting Login Flag from session Storage
  const isLoggedIn = sessionStorage.getItem("isLoggedin");

  //If not logedin , redirect to login page
  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};
