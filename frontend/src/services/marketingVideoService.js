import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/marketing';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
});

export const generateMarketingVideo = async (params) => {
  try {
    const response = await api.post('/generate-video', params);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Video generation failed');
  }
};

export const validateMarketingParams = async (params) => {
  try {
    const response = await api.post('/validate-parameters', params);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Validation failed');
  }
};