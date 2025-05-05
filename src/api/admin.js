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

export const getRevenueCourses = async () => {
  try {
    const response = await axiosInstance.get("/api/courses/top-revenue/?top=100");
    const topRevenueCourses = response.data;
    return topRevenueCourses;
  } catch (error) {
    console.error("Lỗi khi gọi API lấy top revenue course: ", error);
    return null;
  }
};

export const createCourse = async (courseData, token) => {
  try {
    const response = await axiosInstance.post(
      "/api/courses/",
      courseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm khóa học:", error);
    throw error;
  }
};

export const createSection = async (sectionData, token) => {
  console.log("Section gửi đi:", sectionData);
  try {
    const response = await axiosInstance.post(
      "/api/sections/",
      sectionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo section:", error.response?.data || error.message);
    throw error;
  }
};

export const createLesson = async (lessonData, token) => {
  console.log("lesson gửi đi:", lessonData);

  try {
    const response = await axiosInstance.post(
      "/api/lessons/",
      lessonData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo lesson:", error.response?.data || error.message);
    throw error;
  }
};
export const getCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(`api/courses/${courseId}/`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu khóa học:", error);
    throw error;
  }
};
export const getCourseData = async (courseId) => {
  try {
    const response = await axiosInstance.get(`api/courses/${courseId}/sections-with-lessons/`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu khóa học:", error);
    throw error;
  }
};

export const deleteSection = async (sectionId, token) => {
  const response = await fetch(`/api/sections/${sectionId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.json()
}

export const deleteLesson = async (lessonId, token) => {
  const response = await fetch(`/api/lessons/${lessonId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.json()
}

export const getSections = async (courseId, token) => {
  const response = await fetch(`/api/courses/${courseId}/sections`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.json()
}

export const getLessons = async (sectionId, token) => {
  const response = await fetch(`/api/sections/${sectionId}/lessons`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.json()
}

