import axios from "axios";

export const updateCartProducts = async (productId, quantityChange) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}fake-store/cart`,
      {
        productId: productId,
        quantity: quantityChange,
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

export const removeProductfromUserCart = async (productId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}fake-store/cart/${productId}`,
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