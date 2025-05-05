import axios from "axios";

// Cấu hình axios
const axiosInstance = axios.create({
  baseURL: "https://comanbe.onrender.com", // Địa chỉ server của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAllEvents = async () => {
  try {
    const response = await axiosInstance.get("/api/events/");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};