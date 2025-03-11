import axios from "axios";
 
// const API_URL = "http://localhost:3200/customer";
const API_URL = process.env.REACT_APP_API_URL

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/customer/sign-in`, { email, password });
  return response.data;
};

export const signupUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/customer/sign-up`, { name, email, password });
  return response.data;
};

export const logoutUser = async () => {
  await axios.post(`${API_URL}/customer/log-out`, {}, { withCredentials: true });
};
