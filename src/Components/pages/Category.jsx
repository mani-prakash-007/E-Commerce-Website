import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { fetchAllProducts } from "../../Redux/slice/allProductsSlice";
import { fetchCategory } from "../../Redux/slice/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { IoIosStar } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProductToCart, fetchAllCartProducts } from "../../Redux/slice/cart";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { updateCartProducts } from "../../Utils/cartUtils";
import { placeOrder } from "../../Utils/orderUtils";

export const Category = () => {
  //Params
  const { categoryName } = useParams();
  console.log(categoryName);

  //State
  const [categoryList, setCategoryList] = useState();
  const [productList, setProductList] = useState();
  const [orderItem, setOrderItem] = useState({
    product: "",
    quantity: 1,
  });

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
  const { allCartProducts, Loading, Error } = useSelector(
    (state) => state.cartProducts
  );

  //Cart Products
  const cartProducts = useSelector((state) => state.cartProducts);

  //Side Effects
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchAllProducts());
    dispatch(fetchAllCartProducts());
  }, [dispatch]);

  //Side Effect when prod , category changes
  useEffect(() => {
    setProductList(allProducts);
  }, [allProducts]);

  useEffect(() => {
    setCategoryList(category);
  }, [category]);

  // Filtering the Category Products
  const categoryProducts = productList?.filter(
    (product) => product.product_category === categoryName
  );
  console.log(categoryProducts);

  //Handling Add Cart
  const handleAddCart = async (productId) => {
    //Toast on Loading
    const toastId = toast.loading("Adding Product to Cart...", {
      position: "top-right",
    });
    //Checking product is Exist in the cart array
    const isProductExist = allCartProducts.some(
      (cartItem) => cartItem.productId == productId
    );
    if (isProductExist) {
      toast.update(toastId, {
        render: "Product already in cart..!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }
    //API Call to Add product to cart
    const addProductToCartResponse = await updateCartProducts(productId, 1);
    if (addProductToCartResponse.data) {
      dispatch(
        addProductToCart(addProductToCartResponse.data.Details.products)
      );
      toast.update(toastId, {
        render: "Product added to cart...",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      toast.update(toastId, {
        render: `${
          addProductToCartResponse.response.data.ErrorMessage ||
          addProductToCartResponse.response.data.error ||
          "Something went wrong"
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  //Function for Increment
  const handleDecrement = () => {
    if (orderItem.quantity > 1) {
      setOrderItem((previousValue) => {
        return {
          ...previousValue,
          quantity: previousValue.quantity - 1,
        };
      });
    } else {
      alert("Min Quantity is 1");
    }
  };

  //Function for Increment
  const handleIncrement = () => {
    if (orderItem.quantity < 5) {
      setOrderItem((previousValue) => {
        return {
          ...previousValue,
          quantity: previousValue.quantity + 1,
        };
      });
    } else {
      alert("Max Quantity is 5");
    }
  };

  //Function for place Order...
  const handlePlaceOrder = async (productId, quantity) => {
    // Close the dialog after placing the order
    document.getElementById("my_modal_4").close();
    //Toast on Loading
    const toastId = toast.loading("Placing Order...", {
      position: "top-right",
    });

    const placeOrderResponse = await placeOrder(productId, quantity);
    if (placeOrderResponse.data) {
      toast.update(toastId, {
        render: "Order Placed...",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      toast.update(toastId, {
        render: `${
          placeOrderResponse.response.data.ErrorMessage ||
          placeOrderResponse.response.data.error ||
          "Something went wrong"
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
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
                  to={`/category/${category}`}
                  className={({ isActive }) => {
                    return ` tracking-wider ${isActive && "text-blue-500"}`;
                  }}
                >
                  {category.toUpperCase()}
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
              <Link to={`/product/${product.product_id}`}>
                <img
                  src={product.product_image_url}
                  alt={product.product_name}
                  className="w-48 h-60 p-2 mx-2"
                />
              </Link>
              <div className="h-60 w-1/2 p-3 mx-2">
                <h1 className="font-semibold text-xl">
                  {product.product_name}
                </h1>
                <p className="my-2 overflow-y-scroll no-scrollbar h-36">
                  {product.product_description}
                </p>
              </div>
              <div className="w-1/4 px-7 py-4 h-60 mx-2">
                <h1 className="font-bold text-4xl">${product.product_price}</h1>
                <p className="font-semibold text-lg py-1 my-2">Ratings</p>
                <div className="flex">
                  {Array(Math.floor(product.product_ratings))
                    .fill(0)
                    .map((_, index) => (
                      <IoIosStar
                        key={index}
                        className="text-yellow-500 text-xl"
                      />
                    ))}
                </div>
                <div className="flex flex-col my-5">
                  <button
                    onClick={() => handleAddCart(product._id)}
                    className="border py-2 my-1 rounded-md bg-orange-400 text-white font-bold active:scale-95"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      setOrderItem((prev) => ({
                        ...prev,
                        product, // Set the selected product here
                      }));
                      document.getElementById("my_modal_4").showModal();
                    }}
                    className="border py-2 text-center my-1 rounded-md bg-orange-600 text-white font-bold active:scale-95"
                  >
                    Buy Now
                  </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <h3 className="font-bold text-lg">Order Confirmation</h3>
                      <table className="table">
                        <thead>
                          {console.log(
                            typeof orderItem.product._id,
                            orderItem.product._id
                          )}
                          {console.log(orderItem)}
                          <tr className="text-base">
                            <th>Product Name</th>
                            <th className="text-center">Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{orderItem.product.product_name}</td>{" "}
                            {/* Use orderItem.product.title */}
                            <td className="flex items-center justify-center">
                              <button
                                onClick={handleDecrement}
                                className="border p-1 mx-3 rounded-md hover:bg-gray-300 active:scale-90"
                              >
                                <FaMinus />
                              </button>
                              {orderItem.quantity}
                              <button
                                onClick={handleIncrement}
                                className="border p-1 mx-3 rounded-md hover:bg-gray-300 active:scale-90"
                              >
                                <FaPlus />
                              </button>
                            </td>
                            <td>
                              $
                              {(
                                orderItem.product.product_price *
                                orderItem.quantity
                              ).toFixed(2)}{" "}
                              {/* Use orderItem.product.price */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Cancel Order</button>
                          <button
                            onClick={() =>
                              handlePlaceOrder(
                                orderItem.product._id,
                                orderItem.quantity
                              )
                            } // Pass the selected product
                            type="button"
                            className="btn border px-7 py-3 mx-5 w-44 rounded-md bg-orange-600 text-white font-bold active:scale-95"
                          >
                            Place Order
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          );
        })}
      <ToastContainer />
    </div>
  );
};
