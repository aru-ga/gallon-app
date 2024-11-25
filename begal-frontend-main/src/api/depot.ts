import axios from 'axios';
import { UserProfile } from '@/types/userTypes';

const API_URL = "https://api-beli-galon.vercel.app/api/sellers";
const GLOBAL_API_URL = "https://api-beli-galon.vercel.app/api";

const fetchProducts = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetchProducts API call:", error);
    throw new Error("Failed to fetch products");
  }
}

const fetchOrders = async (token: string) => {
  try {
    const response = await axios.get(`${GLOBAL_API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetchOrders API call:", error);
    throw new Error("Failed to fetch orders");
  }
}

const register = async (userData: UserProfile) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return (response.data);
  } catch (error) {
    console.error("Error in register API call:", error); 
    throw new Error("Registration failed");
  }
};


const userProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in register API call:", error); 
    throw new Error("Failed to fetch user profile");
  }
};
export default userProfile;

export { fetchProducts, register, userProfile, fetchOrders };