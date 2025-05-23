import React, { useEffect, useState } from "react";
import CourseSection from "../components/CourseSection";
import Banner from "../components/Banner";
import axios from "axios";

const TrangChu = () => {
  // Thêm title cho trang
  useEffect(() => {
    document.title = "Trang chủ";
    return () => {
      document.title = "Coman"; // Reset title khi unmount
    };
  }, []);
  const [freeCourse, setFreeCourse] = useState([]);
  const [paidCourse, setPaidCourse] = useState([]);
  useEffect(() => {
    axios
      .get("https://comanbe.onrender.com/api/courses/")
      .then((response) => {
        const allCourses = response.data;

        // Phân loại khóa học
        const free = allCourses.filter((course) => course.is_paid === false);
        const paid = allCourses.filter((course) => course.is_paid === true);

        setFreeCourse(free);
        setPaidCourse(paid);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);

  return (
    <div>
      <Banner />
      <CourseSection title="Khóa học miễn phí" courses={freeCourse} />
      <CourseSection title="Khóa học trả phí" courses={paidCourse} />
    </div>
  );
};

export default TrangChu;
