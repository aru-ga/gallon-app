import axios from "axios";

// Default to hardcoded baseURL if environment variable is not set
const instance = axios.create({
  baseURL: "https://api-beli-galon.vercel.app/api/",
});

export default instance;
