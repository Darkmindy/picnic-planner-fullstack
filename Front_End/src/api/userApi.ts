import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export type Role = "user" | "admin";

export const signUp = async (userData: {
  name: string;
  email: string;
  password: string;
  role: Role;
}) => {
  try {
    const response = await apiClient.post("/signup", userData);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to sign up");
  }
};

export const adminSignUp = async (userData: {
  name: string;
  email: string;
  password: string;
  role: Role;
}) => {
  try {
    const response = await apiClient.post("/admin-signup", userData);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to sign up");
  }
};

export const signIn = async (userData: { email: string; password: string }) => {
  try {
    const response = await apiClient.post("/login", {
      ...userData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return [response.data, response.headers["authorization"]];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to sign in");
  }
};

export const adminSignIn = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post("/admin-login", userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sign in");
  }
};

export const logOut = async (accessToken: string) => {
  try {
    const response = await apiClient.get("/logout", {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sign out");
  }
};


export const fetchNewToken = async (refreshToken: string) => {
  try {
    const response = await apiClient.get("/token", {
      headers: {
        "refresh-token": refreshToken,
      },
    });
    console.log(response.data);
    return [response.data, response.headers["authorization"]];
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async (userData: { email: string }) => {
  try {
    const response = await apiClient.post("/fetch-user", userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user");
  }
};


