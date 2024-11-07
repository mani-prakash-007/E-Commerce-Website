import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adminAuthentication, authenticate } from "../../Redux/slice/login";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { generateJWT, verifyJwt } from "../../Utils/jwtAuthentication";
import { ClipLoader } from "react-spinners";

export const Login = () => {
  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Spinner State
  const [loading, setLoading] = useState(false);

  //Dispatch
  const dispatch = useDispatch();
  //Navigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = await generateJWT(email, password);
    if (token.data) {
      sessionStorage.setItem("loginToken", `${token.data.Details.loginToken}`);
      const verifyUser = await verifyJwt(sessionStorage.getItem("loginToken"));
      dispatch(authenticate(verifyUser.isVerifiedUser));
      dispatch(adminAuthentication(verifyUser.isAdmin));
      if (verifyUser) {
        toast.success("Login Success", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else {
        console.log("Error message");
        toast.error("Login Failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else if (token.response) {
      toast.error(
        token.response.data.error ||
          token.response.data.ErrorMessage ||
          "Something Went Wrong",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } else if (token.message) {
      toast.error(token.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="relative pt-32 my-5 border mx-10 pb-64 flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        {loading ? (
          <ClipLoader />
        ) : (
          <>
            <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
              <div className="self-start hidden lg:flex flex-col text-gray-300">
                <h1 className="my-3 font-semibold text-4xl text-blue-500">
                  Welcome back...!!
                </h1>
                <p className="pr-3 text-sm opacity-75 text-black">
                  Welcome to our E-commerce platform. Log in to explore a vast
                  collection of products, track orders, manage your account, and
                  enjoy a seamless shopping experience. Whether you're looking
                  for the latest trends, essential items, or exclusive deals,
                  logging in will unlock a personalized experience just for you.
                </p>
              </div>
            </div>
            <div className="flex border mx-20 rounded-xl shadow-xl justify-center self-center z-10">
              <div className="p-12 bg-white mx-auto rounded-3xl w-96">
                <div className="mb-7">
                  <h3 className="font-semibold text-2xl text-gray-800">
                    Sign In
                  </h3>
                  <p className="text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      to={"/register"}
                      className="text-sm text-blue-600 hover:text-violet-700"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-80 text-lg px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-80 text-lg px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                    <div
                      className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          className="h-4 text-blue-600"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 text-blue-600"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path
                            fill="currentColor"
                            d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm ml-auto">
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-blue-800 hover:bg-blue-500 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
