import axios from "axios";

const APIS_URL = "https://api-beli-galon.vercel.app/api/users";

const reqChangeAddress = async (address: object) => {
  const token = localStorage.getItem("authToken");
  console.log("ADDRESS FROM THE API", address);
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
  const token = localStorage.getItem("authToken");
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
  const token = localStorage.getItem("authToken");

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
  const token = localStorage.getItem("authToken");
  console.log("PROFILE FROM THE API", profile);
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

export {
  reqChangePassword,
  reqChangeAddress,
  updateProfilePicture,
  updateProfile,
};
