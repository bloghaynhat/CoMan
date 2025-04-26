
import React from 'react';
const CategoryFilter = ({ categories, selectedCategory, handleCategoryChange }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === category.name ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};
export default CategoryFilter;