import axios from "axios";
import { refreshToken } from "@/api/auth";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

// Tạo axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Interceptor cho việc refresh token khi gặp lỗi 401
axiosInstance.interceptors.response.use(
  (response) => response, // Trả về phản hồi thành công
  async (error) => {
    const originalRequest = error.config;

    // Chỉ xử lý lỗi 401 (Unauthorized) và đảm bảo không retry nhiều lần
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token")
    ) {
      originalRequest._retry = true; // Đánh dấu request này đã retry

      try {
        // Gọi API refresh token
        const { access_token } = await refreshToken();
        // Lưu lại token mới vào localStorage
        localStorage.setItem("access_token", access_token);
        // Thêm lại header Authorization cho request retry
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

        // Retry request với token mới
        return axiosInstance(originalRequest);
      } catch (err) {
        // Nếu không thể refresh token, logout người dùng
        logoutUser();
        return Promise.reject(err);
      }
    }

    // Trả về lỗi nếu không phải lỗi 401
    return Promise.reject(error);
  }
);

export default axiosInstance;
