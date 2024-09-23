import React, { useState } from "react";
import { MdShoppingCart, MdDelete } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "../../Redux/slice/cart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Cart = () => {
  //Redux Store
  const cartProducts = useSelector((state) => state.cartProducts);
  console.log(cartProducts);

  //State
  const [itemQuantity, setItemQuantity] = useState(cartProducts.map(() => 1));

  //Dispatch
  const dispatch = useDispatch();

  //handle delete cartItem
  const handleRomoveCartItem = (productId) => {
    console.log(productId);
    dispatch(removeProductFromCart(productId));
    toast.success("Product Removed Successfully", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  //Function for Increse the Quantity
  const incrementQuantity = (index) => {
    setItemQuantity((prevQuantity) => {
      const newQuatity = [...prevQuantity];
      if (newQuatity[index] < 5) {
        newQuatity[index]++;
      } else {
        alert("Max Quantity is 5");
      }
      return newQuatity;
    });
  };
  //Function for Increse the Quantity
  const decrementQuantity = (index) => {
    setItemQuantity((prevQuantity) => {
      const newQuatity = [...prevQuantity];
      if (newQuatity[index] > 1) {
        newQuatity[index]--;
      } else {
        alert("Min Quantity is 1");
      }
      return newQuatity;
    });
  };

  console.log(itemQuantity);

  //Fuction for Calculate Total Price.
  const totalPrice = cartProducts.reduce((acc, product, index) => {
    return acc + product.price * itemQuantity[index];
  }, 0);

  return (
    <div className="my-5 flex justify-center">
      <div className="border h-svh flex w-4/5 p-5">
        <div className="w-2/3 h-6/5  border mx-4 rounded-lg p-8 overflow-y-scroll no-scrollbar">
          <div className="flex justify-between items-center">
            <h1 className="px-5 font-bold text-3xl flex items-center">
              Your Cart <MdShoppingCart className="mx-5" />
            </h1>
            <button className="border w-60 py-4 sticky rounded-lg text-lg font-medium bg-orange-600 text-white hover:bg-orange-700 active:scale-95">
              Place Order
            </button>
          </div>
          {cartProducts.length == 0 ? (
            <>
              <div className="w-full p-5 flex my-5 justify-center">
                <h1 className="font bold text-2xl text-center">
                  Your cart is Empty..!!
                </h1>
              </div>
            </>
          ) : (
            cartProducts.map((product, index) => {
              return (
                <>
                  <div key={index} className="border w-full p-5 flex my-5">
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt="Product Image"
                          className="w-60 h-60"
                        />
                      </Link>
                    </div>
                    <div className="w-full mx-5 p-5 flex flex- flex-col justify-between">
                      <div className="w-fit">
                        <h1 className="font-bold text-2xl">{product.title}</h1>
                        <h2 className="font-bold text-xl my-2 italic">
                          ${product.price}
                        </h2>
                        <h2 className="font-bold text-xl my-2">
                          Quantity : {itemQuantity[index]}
                        </h2>
                      </div>
                      <div className="my-2 flex flex-wrap justify-between">
                        <div className="flex items-center mx-3">
                          <button
                            onClick={() => decrementQuantity(index)}
                            className="border p-3 rounded-lg hover:bg-gray-300 active:scale-95 mx-3"
                          >
                            {" "}
                            <FaMinus />
                          </button>
                          <input
                            type="number"
                            value={itemQuantity[index]}
                            className="border rounded-md py-2 focus:outline-none no-spinner w-16 text-center"
                            required
                            disabled
                          />
                          <button
                            onClick={() => incrementQuantity(index)}
                            className="border p-3 rounded-lg hover:bg-gray-300 active:scale-95 mx-3"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRomoveCartItem(product.id)}
                          className="border py-2 px-4 mx-5 rounded-lg text-red-600 hover:bg-red-600 hover:text-white active:scale-95"
                        >
                          {" "}
                          <MdDelete className="text-2xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
        <div className="w-1/3 h-2/3 border mx-4 rounded-lg p-5">
          <h1 className="font-bold text-2xl text-center pb-5">Price Details</h1>
          <hr />
          <div className="overflow-x-auto h-4/5">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-base">
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cartProducts.length == 0 ? (
                  <>
                    <h1 className="font-bold text-xl my-10">
                      No Items in Cart
                    </h1>
                  </>
                ) : (
                  cartProducts.map((product, index) => {
                    return (
                      <tr>
                        <td>{product.title}</td>
                        <td className="pl-10">{itemQuantity[index]}</td>
                        <td>
                          {(product.price * itemQuantity[index]).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <hr />
          <div className=" my-3 flex items-center justify-between">
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
