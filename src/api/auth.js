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
    // Gửi request để nhận token
    const response = await axiosInstance.post("/api/token/", {
      username,
      password,
    });

    // Lưu vào localStorage
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("role", response.data.role);

    getUserInfo();
    // Trả về thông tin gồm token và role
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

    // Lưu lại access token mới vào localStorage và cập nhật role
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("role", response.data.role); // Cập nhật role vào localStorage

    return response.data; // Trả về dữ liệu token mới
  } catch (error) {
    throw error;
  }
};

// Hàm đăng xuất, xóa token và role khỏi localStorage
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role"); // Xóa role khỏi localStorage
};

// Hàm lấy thông tin người dùng từ access token
export const getUserInfo = async () => {
    try {
        // Lấy access token từ localStorage
        const accessToken = localStorage.getItem("access_token");

        // Kiểm tra xem token có tồn tại không
        if (!accessToken) {
            throw new Error("Access token not found.");
        }

        // Gửi yêu cầu đến API để lấy thông tin người dùng, sử dụng token trong header
        const response = await axiosInstance.get("/api/auth/user/", {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Thêm token vào header Authorization
            },
        });
        // Lưu vào localStorage
        localStorage.setItem("first_name", response.data.first_name);
        localStorage.setItem("last_name", response.data.last_name);
        localStorage.setItem("id", response.data.id); // Cập nhật role vào localStorage
        // Trả về dữ liệu người dùng từ API
        return response.data;
    } catch (error) {
        console.error("Error getting user info: ", error);
        throw new Error("Failed to retrieve user information.");
    }

    // Gửi yêu cầu đến API để lấy thông tin người dùng, sử dụng token trong header
    const response = await axiosInstance.get("/api/auth/user/", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Thêm token vào header Authorization
      },
    });
    // Lưu vào localStorage
    localStorage.setItem("first_name", response.data.first_name);
    localStorage.setItem("last_name", response.data.last_name);
    localStorage.setItem("id", response.data.id);
    // Trả về dữ liệu người dùng từ API
    return response.data;
  } catch (error) {
    console.error("Error getting user info: ", error);
    throw new Error("Failed to retrieve user information.");
  }
};
