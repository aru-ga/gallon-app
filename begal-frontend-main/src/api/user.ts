import axios from "axios";
import { UserProfile } from "@/types/userTypes";
import instance from "@/lib/axios";

const APIS_URL = "https://api-beli-galon.vercel.app/api/users";

const refetchUserData = async () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found.");
    return;
  }

  try {
    const response = await fetch(`${APIS_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch updated user data.");
    }

    const updatedUserData = await response.json();

    const userData = {
      token: token,
      user: {
        id: updatedUserData.data.id,
        email: updatedUserData.data.email,
        name: updatedUserData.data.name,
        phone: updatedUserData.data.phone,
        role: updatedUserData.data.role,
        profile_picture_url: updatedUserData.data.profile_picture_url,
        address: updatedUserData.data.address,
        created_at: updatedUserData.data.created_at,
        updated_at: updatedUserData.data.updated_at,
      },
    };

    sessionStorage.setItem("user_session", JSON.stringify(userData));
    sessionStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error refetching user data:", error);
  }
};


const getTransaction = async () => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    try {
      const response = await instance.get("orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  }
};

const reqChangeAddress = async (address: object) => {
  const token = sessionStorage.getItem("authToken");

  try {
    const response = await axios.patch(
      `${APIS_URL}/profile`,
      { address },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in reqChangeAddress API call:", error);
    throw new Error("Failed to change address");
  }
};

const reqChangePassword = async (oldPassword: string, newPassword: string) => {
  const token = sessionStorage.getItem("authToken");

  try {
    const response = await axios.patch(
      `${APIS_URL}/change-password`,
      {
        old_password: oldPassword,
        new_password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in reqChangePassword API call:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.errors;
    }
    throw new Error("Failed to change password");
  }
};

const updateProfilePicture = async (imageFile: File) => {
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    throw new Error("No authorization token found");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.patch(`${APIS_URL}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error updating profile picture:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

const updateProfile = async (profile: UserProfile) => {
  const token = sessionStorage.getItem("authToken");

  try {
    const response = await axios.patch(
      `${APIS_URL}/profile`,
      { ...profile },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
    throw new Error("Failed to update profile");
  }
};

const productDelivered = async (orderId: string) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.patch(
      `${APIS_URL}/orders/${orderId}`,
      {
        status: "delivered",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error marking order as delivered:", error);
    throw new Error("Failed to mark order as delivered");
  }
};

const cancelOrder = async (orderId: string) => {
  const token = sessionStorage.getItem("authToken");

  try {
    const response = await axios.patch(
      `${APIS_URL}/orders/${orderId}`,
      {
        status: "cancelled",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw new Error("Failed to cancel order");
  }
};

const addToWishlist = async (productId: string) => {
  const token = sessionStorage.getItem("authToken");

  try {
    const response = await axios.post(
      `${APIS_URL}/wishlist`,
      {
        product_id: productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw new Error("Failed to add to wishlist");
  }
};

const getWishlist = async () => {
  const token = sessionStorage.getItem("authToken");

  try {
    const response = await axios.get(`${APIS_URL}/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw new Error("Failed to fetch wishlist");
  }
};

const removeWishlist = async (productId: number) => {
  const token = sessionStorage.getItem("authToken");

  try {
    const response = await axios.delete(`${APIS_URL}/wishlist/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw new Error("Failed to remove from wishlist");
  }
};

export {
  refetchUserData,
  reqChangePassword,
  reqChangeAddress,
  updateProfilePicture,
  updateProfile,
  getTransaction,
  productDelivered,
  addToWishlist,
  getWishlist,
  removeWishlist,
  cancelOrder,
};
