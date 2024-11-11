import axios from 'axios';
import {userRegisterSchemas} from '@/schemas/userSchema';
import { UserProfile } from '@/types/userTypes';

const API_URL = "https://api-beli-galon.vercel.app/api/users";

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

const register = async (userData: UserProfile) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
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
    throw new Error("Failed to fetch user profile");
  }
};
export default userProfile;

export { login, register, userProfile };