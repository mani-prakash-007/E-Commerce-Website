import React from "react";
import { Link } from "react-router-dom";

export const Admin = () => {
  return (
    <div className="h-screen w-screen p-10">
      <div className="border border-gray-300 rounded-2xl h-full  p-5">
        <div className="border border-gray-300 mb-5">
          <h3 className="text-center font-mono text-lg my-5">
            Hello , Admin...👋
          </h3>
          <h1 className="lg:text-7xl font-extrabold font-serif text-center">
            Mani Prakash
          </h1>
        </div>
        <div className="border border-gray-300 p-3">
          <Link
            to={"/add-product"}
            className="border border-blue-500 m-2 p-2 rounded-xl bg-blue-500 font-bold text-white active:scale-95"
          >
            Add Product
          </Link>
        </div>
      </div>
    </div>
  );
};
