import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllOrders } from "../../Redux/slice/orders";
import { fetchAllProducts } from "../../Redux/slice/allProductsSlice";

export const Orders = () => {
  //Redux Store
  const { allOrders, loading, error } = useSelector((state) => state.orders);
  const { allProducts, Loading, errors } = useSelector(
    (state) => state.allProducts
  );

  //State
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Dispatch
  const dispatch = useDispatch();

  // Total Amount for allOrders
  const totalAmount = orders.reduce((acc, { product, quantity }) => {
    return product && product.product_price
      ? acc + product.product_price * quantity
      : acc;
  }, 0);

  // Filtered allOrders based on search term
  const filteredOrders = orders.filter(
    ({ product }) =>
      product &&
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts.length > 0 && allOrders.length > 0) {
      const updatedOrderItems = allOrders.map((orderItem) => {
        const product = allProducts.find(
          (product) => product._id === orderItem.productId
        );
        return { ...orderItem, product };
      });
      setOrders(updatedOrderItems);
    }
  }, [allProducts, allOrders]);


  return (
    <div className="border h-screen my-5 shadow-xl mx-10 flex justify-around p-10">
      <div className="border h-2/3 w-80 mx-3 p-8">
        <h1 className="text-center font-bold text-2xl">All Order Details</h1>
        <p className="my-5 font-medium text-lg">
          Total Orders: {orders.length}
        </p>
        <p className="my-5 font-medium text-lg">
          Total Amount: ${totalAmount.toFixed(2)}
        </p>
      </div>
      <div className="border w-3/4 px-5">
        {/* Search */}
        <div className="p-5 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border w-3/4 rounded-lg py-3 px-5 placeholder:text-gray-700 hover:bg-gray-200 focus:outline-none"
            placeholder="Search by product name"
          />
          <button className="border px-7 py-3 mx-5 w-44 rounded-md bg-blue-600 hover:bg-blue-500 tracking-wide text-white font-bold active:scale-95">
            Search
          </button>
        </div>

        {/* Order List */}
        <div className="border my-2 px-5 h-4/5 overflow-y-scroll shadow-inner">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col justify-center items-center my-10">
              <h1 className="font-bold text-xl text-center my-5">No Orders</h1>
              <Link
                to={"/home"}
                className="px-5 border rounded-lg py-2 bg-blue-600 hover:bg-blue-500 text-white mx-2 w-32 text-center"
              >
                <p className="font-medium text-xl">Home</p>
              </Link>
            </div>
          ) : (
            filteredOrders.map(
              ({ product, quantity, _id }, index) =>
                product && (
                  <div
                    key={index}
                    className="border h-64 my-5 rounded-xl p-5 flex"
                  >
                    <div className="w-1/3">
                      <img
                        src={product.product_image_url}
                        alt={product.product_name}
                        className="h-52 w-60"
                      />
                    </div>
                    <div className="w-2/3 p-5 flex flex-col justify-evenly">
                      <h1 className="font-bold text-xl">
                        {product.product_name}
                      </h1>
                      <h2 className="text-lg font-medium text-blue-600">
                        Order ID:{" "}
                        <span className="font-normal mx-4 italic">{_id}</span>
                      </h2>
                      <h2 className="text-lg font-medium">
                        Ordered Quantity:{" "}
                        <span className="font-normal mx-4">{quantity}</span>
                      </h2>
                      <h2 className="text-lg font-medium">
                        Total Price:{" "}
                        <span className="font-normal mx-4 italic">
                          $
                          {(quantity * (product.product_price || 0)).toFixed(2)}
                        </span>
                      </h2>
                    </div>
                  </div>
                )
            )
          )}
        </div>
      </div>
    </div>
  );
};
