import axios from 'axios';
import instance from '@/lib/axios';

const API_URL_AUTH = "https://api-beli-galon.vercel.app/api/auth";
const API_URL = "https://api-beli-galon.vercel.app/api";

const reqForgotPassword = async (email: string, role = "user") => {
    try {
      const response = await axios.post(`${API_URL_AUTH}/request-reset-password`, { email, role });
      return response.data;
    } catch (error) {
      console.error("Error in reqResetPassword API call:", error);
      throw new Error("Failed to request password reset");
    }
  };
  
  const reqForgotPasswordVerify = async (email: string, code: string, role = "user") => {
    try {
      const response = await axios.post(`${API_URL_AUTH}/verify-reset-code`, { email, code, role });
      return response.data;
    } catch (error) {
      console.error("Error in reqResetPassword API call:", error);
      throw new Error("Failed to request password reset");
    }
  }
  
  const reqForgotPasswordCreateNew = async (email: string, newPassword: string, role = "user") => {
    try {
      const response = await axios.post(`${API_URL_AUTH}/reset-password`, { email, newPassword, role });
      return response.data;
    } catch (error) {
      console.log("Error in reqCreateNewPassword API call:", error);
      throw new Error("Failed to create new password");
    }
  }

  const searchProducts = async (search: string) => {
    try {
      const response = await axios.get(`${API_URL}/search/products`, {
        params: { keyword: search },
      });
      return response.data;
    } catch (error) {
      console.error("Error in searchProducts API call:", error);
      throw new Error("Failed to search products");
    }
  };
  
  
  export {reqForgotPassword, reqForgotPasswordVerify, reqForgotPasswordCreateNew, searchProducts }