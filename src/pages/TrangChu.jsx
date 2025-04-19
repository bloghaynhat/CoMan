import React from "react";
import CourseSection from "../components/CourseSection";
import Banner from "../components/Banner";

const TrangChu = () => {
  // Dữ liệu mô phỏng (mock data)
  const freeCourses = [
    {
      id: 1,
      title: "HTML & CSS Cơ bản",
      instructor: "Nguyễn Văn A",
      rating: 4.5,
      type: "free",
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "JavaScript cho người mới",
      instructor: "Trần Thị B",
      rating: 4.7,
      type: "free",
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Giới thiệu về ReactJS",
      instructor: "Lê Văn C",
      rating: 4.3,
      type: "free",
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Lập trình Python cơ bản",
      instructor: "Phạm Thị D",
      rating: 4.6,
      type: "free",
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const paidCourses = [
    {
      id: 1,
      title: "ReactJS Nâng cao",
      price: 500000,
      instructor: "Nguyễn Văn A",
      rating: 4.8,
      type: "paid",
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Node.js & Express",
      price: 700000,
      instructor: "Trần Thị B",
      rating: 4.9,
      type: "paid",
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Thiết kế UI/UX",
      price: 600000,
      instructor: "Lê Văn C",
      rating: 4.5,
      type: "paid",
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Machine Learning Cơ bản",
      price: 800000,
      instructor: "Phạm Thị D",
      rating: 4.7,
      type: "paid",
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const popularCourses = [
    {
      id: 1,
      title: "Lập trình Full-stack",
      price: 1200000,
      purchases: 1500,
      rating: 4.9,
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Data Science với Python",
      price: 900000,
      purchases: 1200,
      rating: 4.8,
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Lập trình Android",
      price: 1000000,
      purchases: 1000,
      rating: 4.6,
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Học DevOps từ A-Z",
      price: 1100000,
      purchases: 900,
      rating: 4.7,
      image:
        "https://plus.unsplash.com/premium_photo-1731951687921-4b2029496c98?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div>
      <Banner />
      <CourseSection
        title="Khóa học miễn phí"
        courses={freeCourses}
        type="free"
      />
      <CourseSection
        title="Khóa học trả phí"
        courses={paidCourses}
        type="paid"
      />
      <CourseSection
        title="Khóa học được mua nhiều"
        courses={popularCourses}
        type="popular"
      />
    </div>
  );
};

export default TrangChu;
