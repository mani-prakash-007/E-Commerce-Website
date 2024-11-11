import React, { useEffect, useState } from "react";
import { MdShoppingCart, MdDelete } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  fetchAllCartProducts,
  removeProductFromCart,
} from "../../Redux/slice/cart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllProducts } from "../../Redux/slice/allProductsSlice";
import {
  removeProductfromUserCart,
  updateCartProducts,
} from "../../Utils/cartUtils";
import { placeOrder } from "../../Utils/orderUtils";

export const Cart = () => {
  //State
  const [cartItems, setCartItems] = useState([]);

  //Redux Store
  const { allCartProducts, loading, error } = useSelector(
    (state) => state.cartProducts
  );
  const { allProducts, isLoading, errors } = useSelector(
    (state) => state.allProducts
  );

  const dispatch = useDispatch();

  const handleRemoveCartItem = async (productId) => {
    const toastId = toast.loading("Removing Product", {
      position: "top-right",
    });
    const removeResponse = await removeProductfromUserCart(productId);
    if (removeResponse.data) {
      const updatedCartItems = cartItems.filter(
        (item) => item.product._id != productId
      );
      setCartItems(updatedCartItems);
      // Update the loading toast to success
      toast.update(toastId, {
        render: "Product removed successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      // Update the loading toast to error
      toast.update(toastId, {
        render: `${
          removeResponse.response.data.ErrorMessage ||
          removeResponse.response.data.error
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const updateQuantity = async (productId, quantityChange) => {
    const toastId = toast.loading("Updating quantity...", {
      position: "top-right",
    });
    const updateResponse = await updateCartProducts(productId, quantityChange);

    if (updateResponse.data) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.product._id === productId) {
          return { ...item, quantity: item.quantity + quantityChange };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      // Update the loading toast to success
      toast.update(toastId, {
        render: "Quantity updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      // Update the loading toast to error
      toast.update(toastId, {
        render: `${
          updateResponse.response.data.ErrorMessage ||
          updateResponse.response.data.error ||
          "Something went wrong"
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, product, index) =>
      acc + product.product.product_price * product.quantity,
    0
  );
  console.log("All Cart Prods : ", allCartProducts);
  console.log("All Cart Prods (State) : ", cartItems);

  //Place order from cart
  const handlePlaceOrder = async (products) => {
    console.log("Products Ip : ", products);
    if (products.length == 0) {
      toast.error("Your Cart is Empty", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    //Loading Screen
    const toastId = toast.loading("Placing orders...", {
      position: "top-right",
    });
    const orderedProductsId = [];
    //Place Order
    for (const product of products) {
      const orderResponse = await placeOrder(
        product.productId,
        product.quantity
      );
      if (orderResponse.data) {
        console.log(orderResponse.data);
        orderedProductsId.push(orderResponse.data.orderDetails.productId);
      }
    }
    if (products.length == orderedProductsId.length) {
      toast.update(toastId, {
        render: "Order placed for all cart products",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      toast.update(toastId, {
        render: `Order Placed for ${orderedProductsId.length} products`,
        type: "warning",
        isLoading: false,
        autoClose: 3000,
      });
    }
    console.log("Order Products IDs : ", orderedProductsId);
    // Remove ordered products from cart
    for (const productId of orderedProductsId) {
      const removeResponse = await removeProductfromUserCart(productId);
      if (removeResponse.data) {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.productId !== productId)
        );
      }
    }
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(fetchAllCartProducts());
    dispatch(fetchAllProducts());
  }, [dispatch]);
  useEffect(() => {
    if (allCartProducts.length > 0 && allProducts.length > 0) {
      const updatedCartItems = allCartProducts.map((cartItem) => {
        const product = allProducts.find(
          (product) => product._id === cartItem.productId
        );
        return { ...cartItem, product };
      });
      setCartItems(updatedCartItems);
    }
  }, [allProducts, allCartProducts]);

  return (
    <div className="my-5 flex justify-center">
      <div className="border h-svh flex w-4/5 p-5">
        <div className="w-2/3 h-6/5 border mx-4 rounded-lg p-8 overflow-y-scroll no-scrollbar">
          <div className="flex justify-between items-center">
            <h1 className="px-5 font-bold text-3xl flex items-center">
              Your Cart
              <div className="flex flex-row border border-gray items-center mx-4 rounded-xl">
                <MdShoppingCart className="mx-2 my-1" />{" "}
                <span className="text-green-600 mx-2 my-1">
                  {cartItems.length}
                </span>
              </div>
            </h1>
            <button
              onClick={() => handlePlaceOrder(cartItems)}
              className="border w-60 py-4 sticky rounded-lg text-lg font-medium bg-orange-600 text-white hover:bg-orange-700 active:scale-95"
            >
              Place Order
            </button>
          </div>
          {cartItems.length === 0 ? (
            <div className="w-full p-5 flex my-5 justify-center">
              <h1 className="font-bold text-2xl text-center">
                Your cart is Empty..!!
              </h1>
            </div>
          ) : (
            cartItems.map((product, index) => (
              <div key={index} className="border w-full p-5 flex my-5">
                <Link to={`/product/${product.product.product_id}`}>
                  <img
                    src={product.product.product_image_url}
                    alt="Product"
                    className="w-60 h-60"
                  />
                </Link>
                <div className="w-full mx-5 p-5 flex flex-col justify-between">
                  <div className="w-fit">
                    <h1 className="font-bold text-2xl">
                      {product.product.product_name}
                    </h1>
                    <h2 className="font-bold text-xl my-2 italic">
                      ${product.product.product_price}
                    </h2>
                    <h2 className="font-bold text-xl my-2">
                      Quantity: {product.quantity}
                    </h2>
                  </div>
                  <div className="my-2 flex flex-wrap justify-between">
                    <div className="flex items-center mx-3">
                      <button
                        onClick={() => updateQuantity(product.product._id, -1)}
                        className="border p-3 rounded-lg hover:bg-gray-300 active:scale-95 mx-3"
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="number"
                        value={product.quantity}
                        className="border rounded-md py-2 focus:outline-none no-spinner w-16 text-center"
                        disabled
                      />
                      <button
                        onClick={() => updateQuantity(product.product._id, 1)}
                        className="border p-3 rounded-lg hover:bg-gray-300 active:scale-95 mx-3"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveCartItem(product.product._id)}
                      className="border py-2 px-4 mx-5 rounded-lg text-red-600 hover:bg-red-600 hover:text-white active:scale-95"
                    >
                      <MdDelete className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w-1/3 h-2/3 border mx-4 rounded-lg p-5">
          <h1 className="font-bold text-2xl text-center pb-5">Price Details</h1>
          <hr />
          <div className="overflow-x-auto h-4/5">
            <table className="table">
              <thead>
                <tr className="text-base">
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No Items in Cart
                    </td>
                  </tr>
                ) : (
                  cartItems.map((product, index) => (
                    <tr key={product.product.product_id}>
                      <td>{product.product.product_name}</td>
                      <td className="pl-10">{product.quantity}</td>
                      <td>
                        {(
                          product.product.product_price * product.quantity
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="my-3 flex items-center justify-between">
            <h3 className="font-semibold text-xl py-2 px-5">Total Price</h3>
            <p className="text-lg px-10 font-semibold">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
