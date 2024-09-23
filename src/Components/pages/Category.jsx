import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { fetchAllProducts } from "../../Redux/slice/allProductsSlice";
import { fetchCategory } from "../../Redux/slice/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { IoIosStar } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProductToCart } from "../../Redux/slice/cart";

export const Category = () => {
  //Params
  const { categoryName } = useParams();

  //State
  const [categoryList, setCategoryList] = useState();
  const [productList, setProductList] = useState();

  //Dispatch
  const dispatch = useDispatch();

  //Redux Store Access
  //Allproducts
  const { allProducts, isLoading, error } = useSelector(
    (state) => state.allProducts
  );
  //Category
  const { category, loading, errors } = useSelector(
    (state) => state.categories
  );

  //Cart Products
  const cartProducts = useSelector((state) => state.cartProducts);

  //Side Effects
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  //Side Effect when prod , category changes
  useEffect(() => {
    setProductList(allProducts);
  }, [allProducts]);

  useEffect(() => {
    setCategoryList(category);
  }, [category]);

  //Catergory Routes
  const categoryRoutes = (data) => {
    switch (data) {
      case "electronics":
        return "electronics";
      case "jewelery":
        return "jewelery";
      case "men's clothing":
        return "menClothing";
      case "women's clothing":
        return "womenClothing";
    }
  };

  //Category Filtering using route
  const categoryFilter = (category) => {
    switch (category) {
      case "electronics":
        return "electronics";
      case "jewelery":
        return "jewelery";
      case "menClothing":
        return "men's clothing";
      case "womenClothing":
        return "women's clothing";
    }
  };

  // Filtering the Category Products
  const categoryProducts = productList?.filter(
    (product) => product.category === categoryFilter(categoryName)
  );

  //Handling Add Cart
  const handleAddCart = (product) => {
    //Checking product is Exist in the cart array
    const isProductExist = cartProducts.some(
      (cartItem) => cartItem.id == product.id
    );

    if (!isProductExist) {
      dispatch(addProductToCart(product));
      toast.success("Product Added Successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      toast.error("Already in Cart", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border h-10 w-11/12 shadow-lg flex justify-center items-center">
        {categoryList &&
          categoryList.map((category, index) => {
            return (
              <div key={index} className={`py-2 px-4  hover:bg-gray-300`}>
                <NavLink
                  to={`/category/${categoryRoutes(category)}`}
                  className={({ isActive }) => {
                    return ` tracking-wider ${isActive && "text-blue-500"}`;
                  }}
                >
                  {categoryRoutes(category).toUpperCase()}
                </NavLink>
              </div>
            );
          })}
      </div>
      {categoryProducts &&
        categoryProducts.map((product, index) => {
          return (
            <div
              key={index}
              className="w-3/5 border min-h-60 my-5 flex flex-wrap items-center py-5 px-8"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-48 h-60 p-2 mx-2"
                />
              </Link>
              <div className=" h-60 w-1/2 p-3 mx-2">
                <h1 className="font-semibold text-xl">{product.title}</h1>
                <p className="my-2 overflow-y-scroll no-scrollbar h-36">
                  {product.description}
                </p>
              </div>
              <div className=" w-1/4 px-7 py-4 h-60 mx-2">
                <h1 className="font-bold text-4xl">${product.price}</h1>
                <p className="font-semibold text-lg py-1 my-2">Ratings</p>
                <div className="flex">
                  {Array(Math.floor(product.rating.rate))
                    .fill(0)
                    .map((_, index) => (
                      <IoIosStar
                        key={index}
                        className="text-yellow-500 text-xl"
                      />
                    ))}
                </div>
                <div className="flex flex-col my-5">
                  <Link
                    to={`/product/${product.id}`}
                    className="border py-2 text-center my-1 rounded-md bg-orange-600 text-white font-bold active:scale-95"
                  >
                    Buy Now
                  </Link>
                  <button
                    onClick={() => handleAddCart(product)}
                    className="border py-2 my-1 rounded-md bg-orange-400 text-white font-bold active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      <ToastContainer />
    </div>
  );
};
