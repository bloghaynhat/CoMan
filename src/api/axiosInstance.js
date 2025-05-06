import axios from "axios";
import { refreshToken } from "@/api/auth";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

// Tạo axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default axiosInstance;
