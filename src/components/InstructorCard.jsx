import React from 'react';

const InstructorCard = ({ image, name, position}) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-purple-100 rounded-md"> {/* Bố cục flex */}
      <div className="flex-1 text-left"> {/* Phần văn bản bên trái */}
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{position}</p>
      </div>
      <img src={image} alt={name} className="w-24 h-24 rounded-full" /> {/* Hình ảnh bên phải */}
    </div>
  );
};

export default InstructorCard;