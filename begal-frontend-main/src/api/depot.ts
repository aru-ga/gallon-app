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


const sellerProfile = async (token: string) => {
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

const addProduct = async (token: string, productData: any) => {
  try {
    // Create a new FormData instance
    const formData = new FormData();

    // Append the fields to FormData
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);

    // If there's an image, append it to the FormData
    if (productData.image) {
      formData.append("image", productData.image);
    }

    // Send the FormData to the server
    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Set content type for file uploads
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error in addProduct API call:", error);
    throw new Error("Failed to add product");
  }
}


export { fetchProducts, register, sellerProfile, fetchOrders, addProduct };