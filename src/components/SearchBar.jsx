import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="relative md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Tìm kiếm sự kiện..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    );
};


export default SearchBar;