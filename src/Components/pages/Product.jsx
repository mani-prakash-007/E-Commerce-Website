import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/slice/allProductsSlice";
import { IoIosStar } from "react-icons/io";
import { addProductToCart, fetchAllCartProducts } from "../../Redux/slice/cart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { updateCartProducts } from "../../Utils/cartUtils";
import { placeOrder } from "../../Utils/orderUtils";

export const Product = () => {
  //Params
  const { productId } = useParams();

  //State
  const [productList, setProductList] = useState();
  const [quantity, setQuantity] = useState(1);

  //Dispatch
  const dispatch = useDispatch();
  //Redux Store Access
  //Allproducts
  const { allProducts, isLoading, error } = useSelector(
    (state) => state.allProducts
  );

  //Cart Products
  const { allCartProducts, loading, Error } = useSelector(
    (state) => state.cartProducts
  );

  //Side Effects
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCartProducts());
  }, [dispatch]);

  //Side Effect when prod , category changes
  useEffect(() => {
    setProductList(allProducts);
  }, [allProducts]);

  const product = productList?.filter((product) => {
    return product.product_id == productId;
  });

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
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      alert("Min Quantity is 1");
    }
  };

  //Function for Increment
  const handleIncrement = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
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
    <>
      <ToastContainer />
      <div className="border my-5 w-11/12 h-full flex justify-center mx-auto">
        {product &&
          product.map((product, index) => {
            return (
              <>
                <div
                  key={index}
                  className=" flex flex-col justify-center items-center h-full w-2/6 m-5"
                >
                  <img
                    src={product.product_image_url}
                    alt={product.product_name}
                    className="h-full w-4/5 p-10 my-5"
                  />
                  <div className="flex justify-center flex-wrap my-5">
                    <button
                      onClick={() => handleAddCart(product._id)}
                      className="border px-7 py-3 mx-5 w-44 rounded-md bg-orange-400 text-white font-bold active:scale-95"
                    >
                      ADD TO CART
                    </button>
                    <button
                      className="btn border px-7 py-3 mx-5 w-44 rounded-md  bg-orange-600 text-white font-bold active:scale-95"
                      onClick={() =>
                        document.getElementById("my_modal_4").showModal()
                      }
                    >
                      BUY NOW
                    </button>
                    <dialog id="my_modal_4" className="modal">
                      <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">
                          Order Comfirmation
                        </h3>
                        <table className="table">
                          {/* head */}
                          <thead>
                            <tr className="text-base">
                              <th>Product Name</th>
                              <th className="text-center">Quantity</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{product.product_name}</td>
                              <td className="flex items-center justify-center">
                                {" "}
                                <button
                                  onClick={handleDecrement}
                                  className="border p-1 mx-3 rounded-md hover:bg-gray-300 active:scale-90"
                                >
                                  <FaMinus />
                                </button>
                                {quantity}{" "}
                                <button
                                  onClick={handleIncrement}
                                  className="border p-1 mx-3 rounded-md hover:bg-gray-300 active:scale-90"
                                >
                                  <FaPlus />
                                </button>
                              </td>
                              <td>
                                ${(product.product_price * quantity).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Cancel Order</button>
                            <button
                              onClick={() =>
                                handlePlaceOrder(product._id, quantity)
                              }
                              type="button"
                              className="btn border px-7 py-3 mx-5 w-44 rounded-md  bg-orange-600 text-white font-bold active:scale-95"
                            >
                              Place Order
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
                <div className="h-full w-4/5 m-5 py-5">
                  {/* Heading and Rating  */}
                  <div className="">
                    <h1 className="font-bold text-2xl py-3">
                      {product.product_name}
                    </h1>
                    <div className="flex items-center">
                      <p className="font-semibold text-2xl flex items-center px-5 py-1 border-green-600 bg-green-600 mx-3 rounded-md">
                        {" "}
                        <IoIosStar className="mr-3" />
                        {product.product_ratings}
                      </p>
                      <p className="font-semibold text-gray-400 text-xl">
                        {product.product_reviews} Reviews{" "}
                      </p>
                    </div>
                  </div>
                  {/* Price Details  */}
                  <div className="my-8">
                    <h1 className="font-extrabold text-4xl italic">
                      $ {product.product_price}{" "}
                    </h1>
                  </div>
                  {/* product details  */}
                  <div className="">
                    <h1 className="font-semibold text-xl py-3">
                      Product Details
                    </h1>
                    <p className="text-lg">{product.product_description}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};
