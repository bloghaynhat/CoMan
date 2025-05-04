import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course, type }) => {
  return (
    <Link
      to={`/course/${course.id}`}
      state={{ type }}
    >
      <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {course.title}
          </h3>
          {/* <p className="text-sm text-gray-600">{course.instructor}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-gray-700">{course.rating}</span>
          </div> */}
          {course.is_paid && (
            <p className="mt-2 text-indigo-600 font-semibold">
              {course.price.toLocaleString()} VNĐ
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
