import axios from "axios";

// Cấu hình axios
const axiosInstance = axios.create({
  baseURL: "https://comanbe.onrender.com/", // Địa chỉ server của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchDashboardStats = async () => {
  try {
    const response = await axiosInstance.get("/api/dashboard-stats/");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API thống kê:", error);
    throw error;
  }
};

export const fetchTotalStudentByCourse = async () => {
  try {
    const response = await axiosInstance.get("/api/courses/student-counts/");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API lấy tổng số học viên:", error);
    throw error;
  }
};

export const fetchTotalStudentCourseByDate = async (num) => {
  try {
    const response = await axiosInstance.get(
      `/api/courses/latest-with-students/?top=${num}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi gọi API lấy tổng số học viên theo top course:",
      error
    );
    throw error;
  }
};

export const fetchRevenueByCourse = async (num) => {
  try {
    const response = await axiosInstance.get(
      `/api/courses/top-revenue/?top=${num}`
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API lấy top revenue course:", error);
    throw error;
  }
};
