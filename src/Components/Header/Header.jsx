import React, { useEffect } from "react";
import ShoppingCartIcon from "../../assets/shoppingCart.png";
import { MdLogout, MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../Redux/slice/login";
import { toast, ToastContainer } from "react-toastify";

export const Header = () => {
  //Redux Store
  const cartProducts = useSelector((state) => state.cartProducts);
  const loginDetails = useSelector((state) => state.loginDetails);
  const isLoggedIn = loginDetails.isLoggedin;
  const isAdmin = loginDetails.isAdmin;

  //Navigate
  const navigate = useNavigate();
  //Dispatch
  const dispatch = useDispatch();

  const handleLogout = () => {
    setTimeout(() => {
      sessionStorage.removeItem("loginToken");
      dispatch(authenticate(false));
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {}, [loginDetails]);
  return (
    <>
      <div className="flex justify-between px-5 items-center h-20 border py-2 ">
        <div className="w-1/4 mx-2 ">
          <Link to={"home"} className="flex  items-center justify-start">
            {" "}
            <img
              src={ShoppingCartIcon}
              alt="Shopping Cart Icon "
              className=" max-w-20 max-h-20 "
            />
            <div className="min-w-10 mx-5 overflow-hidden flex-initial">
              <h1 className="font-bold text-2xl overflow-hidden text-nowrap">
                E - Commerce
              </h1>
              <p className="font-semibold text-lg italic overflow-hidden text-nowrap">
                Explore Products
              </p>
            </div>
          </Link>
        </div>
        <div className="w-1/2  mx-2">
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className=" border w-full rounded-lg py-3 px-5 placeholder:text-gray-700  hover:bg-gray-200 focus:outline-none"
          />
        </div>
        <div className="w-1/4  mx-2 flex justify-evenly items-center overflow-x-scroll no-scrollbar">
          {!isLoggedIn ? (
            <>
              {" "}
              <Link
                to={"/register"}
                className="px-5 border rounded-lg py-2 hover:bg-gray-200 mx-2 "
              >
                {" "}
                <p className="font-medium text-xl ">Register</p>
              </Link>
              <Link
                to={"/login"}
                className="px-5 border rounded-lg py-2 hover:bg-gray-200 mx-2 "
              >
                {" "}
                <p className="font-medium text-xl ">Login</p>
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/cart"}
                className="px-5 border rounded-lg py-2 hover:bg-gray-200 mx-2 flex items-center"
              >
                {" "}
                <MdShoppingCart className="text-2xl" />
                <p className="font-bold text-lg mx-2 text-green-500">
                  {cartProducts.length}
                </p>
              </Link>
              <Link
                to={"/orders"}
                className="px-5 border rounded-lg py-2 hover:bg-gray-200 mx-2 "
              >
                {" "}
                <p className="font-medium text-xl ">Orders</p>
              </Link>
              {isAdmin && (
                <Link
                  to={"/admin"}
                  className="px-5 border rounded-lg py-2 hover:bg-gray-200 mx-2"
                >
                  <MdAdminPanelSettings className="text-2xl" />
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-5 border rounded-lg py-2 hover:bg-gray-200 mx-2"
              >
                <MdLogout className="text-2xl" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
