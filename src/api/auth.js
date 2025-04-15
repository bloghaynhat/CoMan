import axios from "axios";

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
    return response.data; // Trả về dữ liệu token
  } catch (error) {
    throw error; // Ném lỗi nếu có
  }
};

// Hàm làm mới token
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  try {
    const response = await axiosInstance.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
