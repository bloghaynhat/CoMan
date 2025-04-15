import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Cấu hình axios
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Địa chỉ server của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Hàm đăng nhập
export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/api/token/", {
      username,
      password,
    });
    // Giải mã token để lấy role
    const decodedToken = jwtDecode(response.data.access);
    const role = decodedToken.role; // Giả sử token chứa thông tin role

    return {
      access: response.data.access,
      refresh: response.data.refresh,
      role: role,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Login failed. Please check your credentials.");
  }
};

// Hàm làm mới token
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token found.");
  }

  try {
    const response = await axiosInstance.post("/api/token/refresh/", {
      refresh: refreshToken,
    });

    // Giải mã access token để lấy thông tin user (bao gồm role)
    const decodedToken = jwt_decode(response.data.access);
    const role = decodedToken.role; // Giả sử token chứa thông tin role

    // Lưu lại access token mới vào localStorage và cập nhật role
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("role", role); // Cập nhật role vào localStorage

    return response.data; // Trả về dữ liệu token mới
  } catch (error) {
    throw error;
  }
};

// Hàm lấy role từ localStorage
export const getRole = () => {
  return localStorage.getItem("role");
};

// Hàm lấy access token từ localStorage
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

// Hàm đăng xuất, xóa token và role khỏi localStorage
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role"); // Xóa role khỏi localStorage
};
