import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { verifyJwt } from "../../Utils/jwtAuthentication";
import axios from "axios";

export const AddProducts = () => {
  const [productName, setProductName] = useState();
  const [productId, setProductId] = useState();
  const [productImageUrl, setProductImageUrl] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productRating, setProductRating] = useState();
  const [productReview, setProductReview] = useState();
  const [productDescription, setProductDescription] = useState();

  console.log(
    productCategory,
    productDescription,
    productId,
    productImageUrl,
    productName,
    productPrice,
    productRating,
    productReview
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}fake-store/product/`,
        {
          name: productName,
          id: productId,
          price: productPrice,
          category: productCategory,
          description: productDescription,
          imageUrl: productImageUrl,
          ratings: productRating,
          reviews: productReview,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
          },
        }
      );

      console.log(response.data); // Debugging step to check what data is returned

      // Trigger success toast only if response data exists or meets your expectations
      if (response.data && response.data.status) {
        toast.success(response.data.status, {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        // Fallback success message in case 'status' is missing
        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      // Error handling with fallback messages
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.ErrorMessage ||
          "Add Product Request Failed",
        { position: "top-right", autoClose: 1000 }
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-5 ">
        <div className="border border-gray-300 h-full rounded-xl p-5">
          <section class="max-w-4xl p-6 mx-auto bg-blue-500 rounded-md shadow-md dark:bg-gray-800 my-10">
            <h1 class="text-xl font-bold text-white capitalize dark:text-white">
              New Product
            </h1>
            <form>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="productName"
                  >
                    Product Name
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    id="productName"
                    type="text"
                    onChange={(e) => setProductName(e.target.value)}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    required
                  />
                </div>

                <div>
                  <label class="text-white dark:text-gray-200" for="productId">
                    Product ID
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    id="productId"
                    type="number"
                    min={1}
                    onChange={(e) => setProductId(e.target.value)}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    required
                  />
                </div>

                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="productImage"
                  >
                    Product Image URL
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    id="productImage"
                    type="text"
                    onChange={(e) => setProductImageUrl(e.target.value)}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    required
                  />
                </div>

                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="productPrice"
                  >
                    Product Price
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    id="productPrice"
                    type="number"
                    min={1}
                    onChange={(e) => setProductPrice(e.target.value)}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    required
                  />
                </div>
                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="productCategory"
                  >
                    Product Category
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    id="productCategory"
                    type="text"
                    onChange={(e) => setProductCategory(e.target.value)}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    required
                  />
                </div>

                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="productRating"
                  >
                    Product Rating
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    id="productRating"
                    type="number"
                    min={1}
                    onChange={(e) => setProductRating(e.target.value)}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    required
                  />
                </div>
                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="productReview"
                  >
                    Product Review
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <input
                    id="productReview"
                    type="number"
                    min={1}
                    onChange={(e) => setProductReview(e.target.value)}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    required
                  />
                </div>
                <div>
                  <label class="text-white dark:text-gray-200" for="textarea">
                    Product Description
                    <span className="text-red-600 font-bold text-xl"> *</span>
                  </label>
                  <textarea
                    id="textarea"
                    type="textarea"
                    onChange={(e) => setProductDescription(e.target.value)}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    required
                  ></textarea>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onClick={handleSubmit}
                  class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                >
                  Add Product
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};
