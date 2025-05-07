import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`}>
      {" "}
      <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {course.title}
          </h3>
          {course.is_paid && (
            <p className="mt-2 text-indigo-600 font-semibold">
              {new Intl.NumberFormat("vi-VN").format(course.price)} VNĐ
            </p>
          )}

          {!course.is_paid && (
            <p className="mt-2 text-green-600 font-semibold">Miễn phí</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
