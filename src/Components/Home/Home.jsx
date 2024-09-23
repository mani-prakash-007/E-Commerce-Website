import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/slice/allProductsSlice";
import { fetchCategory } from "../../Redux/slice/categorySlice";
import Electronics from "../../assets/Category/Electronics.jpg";
import Jewelery from "../../assets/Category/Jewelery.jpg";
import MenClothing from "../../assets/Category/Men_Clothing.jpg";
import WomenClothing from "../../assets/Category/Women_Clothing.jpg";
import { Link } from "react-router-dom";

export const Home = () => {
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

  //Generate Random Number
  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 12);
    return randomNumber;
  };

  //Random start index
  const randomStartIndex = generateRandomNumber();
  // //Swith Case for Category to Show category image
  const categoryImage = (data) => {
    switch (data) {
      case "electronics":
        return Electronics;
      case "jewelery":
        return Jewelery;
      case "men's clothing":
        return MenClothing;
      case "women's clothing":
        return WomenClothing;
    }
  };

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

  return (
    <div className="mx-10 ">
      {/* Category */}
      <div className="border min-h-32 my-3 rounded-lg p-2">
        <h1 className="font-semibold text-xl">Category</h1>
        <div className="flex overflow-y-auto no-scrollbar my-3 ">
          {!categoryList ? (
            <p className="text-center">Loading...</p>
          ) : (
            categoryList.map((data, index) => {
              return (
                <Link
                  key={index}
                  to={`/category/${categoryRoutes(data)}`}
                  className="border min-h-28 w-28 rounded-xl mx-5 my-3"
                >
                  <img
                    src={categoryImage(data)}
                    alt={data}
                    className="w-full h-20  rounded-t-xl object-cover object-center"
                  />
                  <p className="text-wrap overflow-hidden text-center rounded-lg py-2">
                    {data.toUpperCase()}
                  </p>
                </Link>
              );
            })
          )}
        </div>
      </div>

      {/* Best of All Products */}
      <div className="border my-3 p-3 min-h-60">
        <h1 className="font-semibold text-xl">Best of All products</h1>
        <div className="flex flex-wrap my-3">
          {!productList ? (
            <h1 className="text-center text-xl">Loading...</h1>
          ) : (
            productList
              .slice(randomStartIndex, randomStartIndex + 8)
              .map((product, index) => {
                return (
                  <>
                    <Link key={index} to={`/product/${product.id}`}>
                      <div className="card bg-base-100 w-96 shadow-xl m-5 border">
                        <figure className="my-5">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-40 w-40"
                          />
                        </figure>
                        <div className="card-body">
                          <div className="flex items-center justify-between ">
                            <h2 className="card-title truncate">
                              {product.title}
                            </h2>
                            <div className="badge badge-secondary mx-5 bg-blue-600 border-blue-600">
                              NEW
                            </div>
                          </div>
                          <div className="card-actions justify-between items-center">
                            <div className="font-bold text-2xl italic">
                              {" "}
                              ${product.price}
                            </div>
                            <div className="badge badge-outline mx-2">
                              {product.category}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};
