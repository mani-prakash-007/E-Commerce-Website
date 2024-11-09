import axios from "axios";

export const placeOrder = async (productId, quantity) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}fake-store/order/`,
      {
        productId: productId,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("loginToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
