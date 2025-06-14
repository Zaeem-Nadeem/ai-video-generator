import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/real-estate';

export const validateRealEstateParams = async (params) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/validate-parameters`, params);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to validate parameters');
  }
};

export const generateRealEstateVideo = async (params) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-video`, params);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to generate video');
  }
}; 