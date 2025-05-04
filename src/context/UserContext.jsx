import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user: { firstname, lastname, role }

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi app load
    const first_name = localStorage.getItem("first_name");
    const last_name = localStorage.getItem("last_name");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");

    if (first_name && last_name && role && id) {
      setUser({ first_name, last_name, role, id });
    }
  }, []);

  const loginUser = (userData) => {
    // Lưu vào context
    setUser(userData);

    // Lưu vào localStorage
    localStorage.setItem("first_name", userData.first_name);
    localStorage.setItem("last_name", userData.last_name);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("id", userData.id);
    localStorage.setItem("access_token", userData.access_token);
    localStorage.setItem("refresh_token", userData.refresh_token);
    localStorage.setItem("id", userData.id);

  };

  const logoutUser = () => {
    setUser(null);
    localStorage.clear(); // hoặc chỉ xóa các key liên quan

    window.location.href = "/"; // Điều hướng về trang chủ và tải lại trang
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {" "}
      {children}{" "}
    </UserContext.Provider>
  );
};

export { UserProvider };
