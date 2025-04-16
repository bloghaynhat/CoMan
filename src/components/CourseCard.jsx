import React from "react";

const CourseCard = ({ course, type }) => {
  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600">{course.instructor}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-gray-700">{course.rating}</span>
        </div>
        {type === "paid" && (
          <p className="mt-2 text-indigo-600 font-semibold">
            {course.price.toLocaleString()} VNĐ
          </p>
        )}
        {type === "popular" && (
          <p className="mt-2 text-gray-600 text-sm">
            {course.purchases} lượt mua
          </p>
        )}
        {type === "free" && (
          <p className="mt-2 text-green-600 font-semibold">Miễn phí</p>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
