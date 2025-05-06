import axios from "axios";
import axiosInstance from "./axiosInstance";

export const fetchDashboardStats = async() => {
    try {
        const response = await axiosInstance.get("/api/dashboard-stats/");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API thống kê:", error);
        throw error;
    }
};

export const fetchTotalStudentByCourse = async() => {
    try {
        const response = await axiosInstance.get("/api/courses/student-counts/");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API lấy tổng số học viên:", error);
        throw error;
    }
};

export const fetchTotalStudentCourseByDate = async(num) => {
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

export const fetchRevenueByCourse = async() => {
    try {
        const response = await axiosInstance.get(`/api/courses/top-revenue/`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API lấy top revenue course:", error);
        throw error;
    }
};

export const getRevenueCourses = async() => {
    try {
        const response = await axiosInstance.get("/api/courses/top-revenue/?top=100");
        const topRevenueCourses = response.data;
        return topRevenueCourses;
    } catch (error) {
        console.error("Lỗi khi gọi API lấy top revenue course: ", error);
        return null;
    }
};

export const getCourseById = async(id) => {
    try {
        const response = await axiosInstance.get(`/api/courses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin khóa học:", error.response ?.data || error.message);
        throw error;
    }
};


export const createCourse = async(courseData, token) => {
    try {
        const response = await axiosInstance.post(
            "/api/courses/",
            courseData, {
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

export const fetchAllUser = async() => {
    try {
        const response = await axiosInstance.get(`/api/users`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API lấy danh sách user:", error);
        throw error;
    }
};

export const createSection = async(sectionData, token) => {
    console.log("Section gửi đi:", sectionData);
    try {
        const response = await axiosInstance.post(
            "/api/sections/",
            sectionData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi tạo section:", error.response ?.data || error.message);
        throw error;
    }
};

export const createLesson = async(lessonData, token) => {
    console.log("lesson gửi đi:", lessonData);
    try {
        const response = await axiosInstance.post(
            "/api/lessons/",
            lessonData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi tạo lesson:", error.response ?.data || error.message);
        throw error;
    }
};

export const fetchUserById = async(id) => {
    try {
        const response = await axiosInstance.get(`/api/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API lấy top revenue course:", error);
        throw error;
    }
};

// Hàm thay đổi trạng thái của người dùng
export const ChangeUserStatus = async(userId, currentStatus) => {
    try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("access_token");

        if (!token) {
            throw new Error("No access token found.");
        }

        // Gửi request PATCH để cập nhật trạng thái is_active
        const response = await axiosInstance.patch(
            `/api/users/${userId}/`, { is_active: !currentStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            }
        );

        // Nếu thành công, trả về true
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error updating user status:", error);
        return false;
    }
};
export const getchSectionsWithLessons = async(courseId, token) => {
    try {
        const response = await axiosInstance.get(
            `/api/courses/${courseId}/sections-with-lessons/`, {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API lấy danh sách sections:", error);
        throw error;
    }
};

export const deleteSection = async(sectionId, token) => {
    try {
        const response = await axiosInstance.delete(`/api/sections/${sectionId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa section:", error.response ?.data || error.message);
        throw error;
    }
};

export const deleteLesson = async(lessonId, token) => {
    try {
        const response = await axiosInstance.delete(`/api/lessons/${lessonId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa section:", error.response ?.data || error.message);
        throw error;
    }
};