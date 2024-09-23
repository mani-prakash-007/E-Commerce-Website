import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  // Getting Login Flag from sessionStorage
  const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";
  console.log("Private Route : ", isLoggedIn);

  // If not logged in, redirect to the login page
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
