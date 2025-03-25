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
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Registration failed");

    return response.json();
  } catch (error) {
    console.error("Registration API Error:", error);
    throw error;
  }
};
