import axios from "axios";

export const generateJWT = async (userEmail, userPassword) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}fake-store/user/login`,
      {
        email: userEmail,
        password: userPassword,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const verifyJwt = async (token) => {
  let verifiedToken = {
    isVerifiedUser: false,
    isAdmin: false,
  };
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}fake-store/user/current`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data) {
      verifiedToken.isVerifiedUser = true;
    }
    if (response.data.Current_User.isAdmin) {
      verifiedToken.isAdmin = true;
    }
  } catch (error) {
    verifiedToken.isVerifiedUser = false;
  }
  return verifiedToken;
};

export const registerUser = async (
  firstName,
  lastName,
  email,
  password,
  phone
) => {
  try {
    const respone = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}fake-store/user/register`,
      {
        fname: firstName,
        lname: lastName,
        email: email,
        password: password,
        phone: phone,
      }
    );
    return respone;
  } catch (error) {
    return error;
  }
};
