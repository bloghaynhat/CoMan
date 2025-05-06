import axios from "axios";
import { refreshToken } from "@/api/auth";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

// Tạo axios instance
const axiosInstance = axios.create({
  baseURL: "https://comanbe.onrender.com/",
});

export default axiosInstance;
