import { UserContext } from "../context/UserContext";
import axios from "axios";
import axiosInstance from "./axiosInstance";

// ===============================
// HÀM LOGIN
// ===============================
export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/api/token/", {
      username,
      password,
    });

    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("role", response.data.role);

    axiosInstance.defaults.headers[
      "Authorization"
    ] = `Bearer ${response.data.access}`;

    await getUserInfo();

    return {
      access: response.data.access,
      refresh: response.data.refresh,
      role: response.data.role,
    };
  } catch (error) {
    console.error("Error during login: ", error);
    throw new Error("Login failed. Please check your credentials.");
  }
};

// ===============================
// HÀM REFRESH TOKEN
// ===============================
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token found.");
  }

  const response = await axiosInstance.post("/api/token/refresh/", {
    refresh: refreshToken,
  });

  const access = response.data.access;
  localStorage.setItem("access_token", access);
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${access}`;

  return { access };
};

// ===============================
// HÀM LOGOUT
// ===============================
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");
  localStorage.removeItem("first_name");
  localStorage.removeItem("last_name");
  localStorage.removeItem("id");
};

// ===============================
// HÀM LẤY THÔNG TIN NGƯỜI DÙNG
// ===============================
export const getUserInfo = async () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("Access token not found.");

  const response = await axiosInstance.get("/api/auth/user/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const user = response.data;
  localStorage.setItem("first_name", user.first_name);
  localStorage.setItem("last_name", user.last_name);
  localStorage.setItem("id", user.id);

  return user;
};
