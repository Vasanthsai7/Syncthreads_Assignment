import axios from "axios";

const API_BASE_URL = "https://syncthreads-backend-hvh6.onrender.com/api";

export const login = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const fetchDashboardData = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchMapData = async (token, location) => {
  const response = await axios.get(`${API_BASE_URL}/map/${location}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const register = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            username,
            password
        });

        return response.data;
    } catch (error) {
        console.error("Registration API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || "Registration failed");
    }
};

