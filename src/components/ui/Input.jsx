import React from "react";

const Input = ({ value, onChange, label, placeholder, type = "text" }) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
    );
};
export { Input };
