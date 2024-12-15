import axios from "axios";
import { UserProfile } from "@/types/userTypes";
import { productType } from "@/types/productType";

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
};

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
};

const register = async (userData: UserProfile) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error in register API call:", error);
    throw new Error("Registration failed");
  }
};

const sellerProfile = async () => {
  const token = sessionStorage.getItem("authToken");
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

const addProduct = async (token: string | null, productData: productType) => {
  try {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("stock", productData.stock.toString());

    if (productData.image) {
      formData.append("image", productData.image);
    }

    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in addProduct API call:", error);
    throw new Error("Failed to add product");
  }
};

const confirmOrder = async (token: string | null, orderId: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/orders/${orderId}`,
      { status: "confirmed" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in confirmOrder API call:", error);
    throw new Error("Failed to confirm order");
  }
};

const cancelOrder = async (token: string | null, orderId: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/orders/${orderId}`,
      { status: "cancelled" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in cancelOrder API call:", error);
    throw new Error("Failed to cancel order");
  }
};

const shippedOrder = async (token: string | null, orderId: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/orders/${orderId}`,
      { status: "shipped" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in cancelOrder API call:", error);
    throw new Error("Failed to cancel order");
  }
};

const confirmCashPayment = async (token: string | null, orderId: string) => {
  try {
    const response = await axios.patch(
      `${GLOBAL_API_URL}/orders/${orderId}/payment-status`,
      { status: "success" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in confirmCashOrder API call:", error);
    throw new Error("Failed to confirm cash order");
  }
};

const refetchSellerData = async () => {
  const token = sessionStorage.getItem("authToken");
  try {
    const profile = await sellerProfile();

    const sellerData = {
      token: token,
      seller: {
        id: profile.data.id,
        name: profile.data.name,
        email: profile.data.email,
        phone: profile.data.phone,
        role: profile.data.role,
        profile_picture_url: profile.data.profile_picture_url,
        address: profile.data.address,
        operational_hours: profile.data.operational_hours,
        rating: profile.data.rating,
        review_count: profile.data.review_count,
        created_at: profile.data.created_at,
        updated_at: profile.data.updated_at,
      },
    };

    sessionStorage.setItem("seller_session", JSON.stringify(sellerData));
    if (token) {
      sessionStorage.setItem("authToken", token);
    }
    console.log("Session storage updated with seller data.");
  } catch (error) {
    console.error("Failed to refetch seller data:", error);
  }
};

export {
  fetchProducts,
  register,
  sellerProfile,
  fetchOrders,
  addProduct,
  cancelOrder,
  confirmOrder,
  confirmCashPayment,
  shippedOrder,
  refetchSellerData,
};
