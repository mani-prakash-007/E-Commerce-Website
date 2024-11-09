import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { verifyJwt } from "../../Utils/jwtAuthentication";
import { useDispatch } from "react-redux";
import { adminAuthentication, authenticate } from "../../Redux/slice/login";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
  //Redux Store
  const loginDetails = useSelector((state) => state.loginDetails);
  //Dispatch
  const dispatch = useDispatch();
  //Nav Location
  const location = useLocation();

  // Getting Login Flag from sessionStorage
  const isLoggedIn = loginDetails.isLoggedin;
  const jwtToken = sessionStorage.getItem("loginToken");

  const verifyLogin = async (token) => {
    if (token) {
      const isVerified = await verifyJwt(token);
      dispatch(authenticate(isVerified.isVerifiedUser));
      dispatch(adminAuthentication(isVerified.isAdmin));
    }
  };

  useEffect(() => {
    verifyLogin(jwtToken);
  }, [jwtToken, location]);
  // If not logged in, redirect to the login page
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
