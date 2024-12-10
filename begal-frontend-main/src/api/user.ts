import axios from "axios";

const APIS_URL = "https://api-beli-galon.vercel.app/api/users";

const token = sessionStorage.getItem("authToken");



const refetchUserData = async () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found.");
    return;
  }

  try {
    const response = await fetch(
      `${APIS_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
    console.log("Session storage updated with new user data.");
  } catch (error) {
    console.error("Error refetching user data:", error);
  }
};

const reqChangeAddress = async (address: object) => {
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
  } catch (error: any) {
    console.error(
      "Error updating profile picture:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const updateProfile = async (profile: any) => {
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
  try {
    const response = await axios.patch(
      `${APIS_URL}/orders/${orderId}`,{
        "status" : "delivered" 
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
}

const cancelOrder = async (orderId: string) => {
  try {
    const response = await axios.patch(
      `${APIS_URL}/orders/${orderId}`,{
        "status" : "cancelled" 
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
}

const addToWishlist = async (productId: string) => {
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
}

const getWishlist = async () => {
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
}

const removeWishlist = async (productId: string) => {
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
  productDelivered,
  addToWishlist,
  getWishlist,
  removeWishlist,
  cancelOrder
};
