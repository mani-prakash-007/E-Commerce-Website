import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/slice/allProductsSlice";
import { IoIosStar } from "react-icons/io";
import { addProductToCart } from "../../Redux/slice/cart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMinus, FaPlug, FaPlus } from "react-icons/fa6";

export const Product = () => {
  //Params
  const { productId } = useParams();

  //State
  const [productList, setProductList] = useState();
  const [productQuantity, setProductQuantity] = useState(1);

  //Dispatch
  const dispatch = useDispatch();

  //Redux Store Access
  //Allproducts
  const { allProducts, isLoading, error } = useSelector(
    (state) => state.allProducts
  );

  //Cart Products
  const cartProducts = useSelector((state) => state.cartProducts);

  //Side Effects
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  //Side Effect when prod , category changes
  useEffect(() => {
    setProductList(allProducts);
  }, [allProducts]);

  const product = productList?.filter((product) => {
    return product.id == productId;
  });

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

  //Function for Increment
  const handleDecrement = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    } else {
      alert("Min Quantity is 1");
    }
  };
  //Function for Increment
  const handleIncrement = () => {
    if (productQuantity < 5) {
      setProductQuantity(productQuantity + 1);
    } else {
      alert("Max Quantity is 5");
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
                    src={product.image}
                    alt={product.title}
                    className="h-full w-4/5 p-10 my-5"
                  />
                  <div className="flex justify-center flex-wrap my-5">
                    <button
                      onClick={() => handleAddCart(product)}
                      className="border px-7 py-3 mx-5 w-44 rounded-md bg-orange-400 text-white font-bold active:scale-95"
                    >
                      ADD TO CART
                    </button>
                    {/* <button className="border px-7 py-3 mx-5 w-44 rounded-md  bg-orange-600 text-white font-bold active:scale-95">
                      BUY NOW
                    </button> */}
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
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
                              <td>{product.title}</td>
                              <td className="flex items-center justify-center">
                                {" "}
                                <button
                                  onClick={handleDecrement}
                                  className="border p-1 mx-3 rounded-md hover:bg-gray-300 active:scale-90"
                                >
                                  <FaMinus />
                                </button>
                                {productQuantity}{" "}
                                <button
                                  onClick={handleIncrement}
                                  className="border p-1 mx-3 rounded-md hover:bg-gray-300 active:scale-90"
                                >
                                  <FaPlus />
                                </button>
                              </td>
                              <td>
                                ${(product.price * productQuantity).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Cancel Order</button>
                            <button
                              type="button"
                              className="border px-7 py-3 mx-5 w-44 rounded-md  bg-orange-600 text-white font-bold active:scale-95"
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
                    <h1 className="font-bold text-2xl py-3">{product.title}</h1>
                    <div className="flex items-center">
                      <p className="font-semibold text-2xl flex items-center px-5 py-1 border-green-600 bg-green-600 mx-3 rounded-md">
                        {" "}
                        <IoIosStar className="mr-3" />
                        {product.rating.rate}
                      </p>
                      <p className="font-semibold text-gray-400 text-xl">
                        {product.rating.count} Reviews & Ratings{" "}
                      </p>
                    </div>
                  </div>
                  {/* Price Details  */}
                  <div className="my-8">
                    <h1 className="font-extrabold text-4xl italic">
                      $ {product.price}{" "}
                    </h1>
                  </div>
                  {/* product details  */}
                  <div className="">
                    <h1 className="font-semibold text-xl py-3">
                      Product Details
                    </h1>
                    <p className="text-lg">{product.description}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};
