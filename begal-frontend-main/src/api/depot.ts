import axios from 'axios';
import { UserProfile } from '@/types/userTypes';

const API_URL = "https://api-beli-galon.vercel.app/api/sellers";
const GLOBAL_API_URL = "https://api-beli-galon.vercel.app/api";

const fetchProducts = async (token: string | null) => {
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

const fetchOrders = async (token: string | null) => {
  if (!token) {
    throw new Error("Token is required for authentication");
  }
  try {
    const response = await axios.get(`${GLOBAL_API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
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

const addProduct = async (token: string | null, productData: any) => {
  try {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);

    if (productData.image) {
      formData.append("image", productData.image);
    }

    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error in addProduct API call:", error);
    throw new Error("Failed to add product");
  }
}

const confirmOrder = async (token: string | null, orderId: string) => {
  try {
    const response = await axios.patch(`${GLOBAL_API_URL}/orders/${orderId}`, {"status": "confirmed"}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in confirmOrder API call:", error);
    throw new Error("Failed to confirm order");
  }
}

const cancelOrder = async (token: string | null, orderId: string) => {
  try {
    const response = await axios.patch(`${GLOBAL_API_URL}/orders/${orderId}`, {"status": "cancelled"}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in cancelOrder API call:", error);
    throw new Error("Failed to cancel order");
  }
}

const confirmCashPayment = async (token: string | null, orderId: string) => {
  try{
    const response = await axios.patch(`${GLOBAL_API_URL}/orders/${orderId}/payment-status`, {"status": "success"}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  catch (error) {
    console.error("Error in confirmCashOrder API call:", error);
    throw new Error("Failed to confirm cash order");
  }
}



export { fetchProducts, register, sellerProfile, fetchOrders, addProduct,cancelOrder, confirmOrder, confirmCashPayment };