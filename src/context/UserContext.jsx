import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { refreshToken, getUserInfo, logout } from "../api/auth";

// Tạo context
export const UserContext = createContext();

// Cung cấp context cho ứng dụng
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user: { firstname, lastname, role }

  // Lấy dữ liệu người dùng từ localStorage khi app load
  useEffect(() => {
    const first_name = localStorage.getItem("first_name");
    const last_name = localStorage.getItem("last_name");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");

    if (first_name && last_name && role && id) {
      setUser({ first_name, last_name, role, id });
    }
  }, []);

  // Hàm loginUser để lưu thông tin người dùng vào context và localStorage
  const loginUser = (userData) => {
    setUser(userData);

    localStorage.setItem("first_name", userData.first_name);
    localStorage.setItem("last_name", userData.last_name);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("id", userData.id);
    localStorage.setItem("access_token", userData.access_token);
    localStorage.setItem("refresh_token", userData.refresh_token);
  };

  // Hàm logoutUser để xóa thông tin người dùng và localStorage
  const logoutUser = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = "/"; // Điều hướng về trang chủ và tải lại trang
  };

  // Hàm cập nhật thông tin người dùng sau khi refresh token
  const tryRefreshUser = async () => {
    try {
      // Refresh token
      const { access_token } = await refreshToken();

      // Lưu token mới vào axios instance
      axios.defaults.headers["Authorization"] = `Bearer ${access_token}`;

      // Lấy thông tin người dùng
      const userInfo = await getUserInfo();

      // Lưu thông tin người dùng vào context và localStorage
      setUser(userInfo);
      localStorage.setItem("first_name", userInfo.first_name);
      localStorage.setItem("last_name", userInfo.last_name);
      localStorage.setItem("role", userInfo.role);
      localStorage.setItem("id", userInfo.id);
    } catch (error) {
      logoutUser(); // Nếu không refresh được, đăng xuất
      console.error("Error refreshing user info: ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loginUser, logoutUser, tryRefreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
