import axios from "axios";

const API_URL = "https://www.emsifa.com/api-wilayah-indonesia/api";

export const getProvinces = async () => {
  try {
    const response = await axios.get(`${API_URL}/provinces.json`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch provinces:", error);
    throw new Error("Failed to fetch provinces");
  }
};

export const getRegencies = async (provinceId: number) => {
  try {
    const response = await axios.get(`${API_URL}/regencies/${provinceId}.json`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch regencies:", error);
    throw new Error("Failed to fetch regencies");
  }
};

export const getDistricts = async (regencyId: number) => {
  try {
    const response = await axios.get(`${API_URL}/districts/${regencyId}.json`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch districts:", error);
    throw new Error("Failed to fetch districts");
  }
};

export const getVillages = async (districtId: number) => {
  try {
    const response = await axios.get(`${API_URL}/villages/${districtId}.json`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch villages:", error);
    throw new Error("Failed to fetch villages");
  }
};
