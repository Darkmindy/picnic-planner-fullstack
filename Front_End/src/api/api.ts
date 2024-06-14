// src/api/api.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUp = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post("/signup", userData);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    // Gestione degli errori
    if (axios.isAxiosError(error)) {
      // Errore di Axios
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data || "Failed to sign up");
    } else {
      // Errore generico
      console.error("General error:", error);
      throw new Error("Failed to sign up");
    }
  }
};

export const signIn = async (userData: { email: string; password: string }) => {
  const response = await apiClient.post("/login", userData);
  return response.data;
};

export const logOut = async (userData: { email: string; password: string }) => {
  const response = await apiClient.post("/logout", userData);
  return response.data;
};
