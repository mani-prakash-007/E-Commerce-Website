import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { registerUser } from "../../Utils/jwtAuthentication";
import { ClipLoader } from "react-spinners";

export const Register = () => {
  //State
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  //Spinner State
  const [loading, setLoading] = useState(false);

  //Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 != password2) {
      toast.error("Password doesn't match", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }
    setLoading(true);
    const registerRequest = await registerUser(
      firstName,
      lastName,
      email,
      password1,
      phoneNumber
    );
    if (registerRequest.data) {
      toast.success("Registered Successfully. Please Login", {
        position: "top-right",
        autoClose: 4000,
      });
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword1("");
      setPassword2("");
      setPhoneNumber("");
      // setLoading(false);
    } else if (registerRequest.response) {
      toast.error(
        registerRequest.response.data.error ||
          registerRequest.response.data.ErrorMessage ||
          "Something Went Wrong",
        {
          position: "top-right",
          autoClose: 4000,
        }
      );
      // setLoading(false);
    } else if (registerRequest.message) {
      toast.error(registerRequest.message, {
        position: "top-right",
        autoClose: 4000,
      });
      // setLoading(false);
    }
    setLoading(false);
  };
  return (
    <>
      <ToastContainer />
      <div className="relative pt-32 my-5 border mx-10 pb-64 flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <ClipLoader className="border border-blue-100" />
            <p className="mt-5 font-bold">
              Backend is deployed for free. So, First API call will take upto 2
              Mins for Response.
            </p>
            <p>Please wait...</p>
          </div>
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
                    Sign Up
                  </h3>
                  <p className="text-gray-400">
                    Have an account?{" "}
                    <Link
                      to={"/login"}
                      className="text-sm text-blue-600 hover:text-violet-700"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-80 text-lg px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-80 text-lg px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="10-Digit Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-80 text-lg px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
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
                      type={showPassword1 ? "text" : "password"}
                      placeholder="Password"
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                      className="w-80 text-lg px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                    <div
                      className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer"
                      onClick={() => setShowPassword1(!showPassword1)}
                    >
                      {showPassword1 ? (
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
                  <div className="relative">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      placeholder="Re-Enter Password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      className="w-80 text-lg px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                    <div
                      className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer"
                      onClick={() => setShowPassword2(!showPassword2)}
                    >
                      {showPassword2 ? (
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
                    {password2 != null && password1 != password2 && (
                      <p className="text-red-600">Password Doesn't Match</p>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-blue-800 hover:bg-blue-500 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                    >
                      Sign up
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
