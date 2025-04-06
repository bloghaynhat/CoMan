import React from 'react'

const SearchBox = () => {
  return (
    <div className="flex gap-1 items-center">
            <div className="bg-[#f3f4f6] px-2 py-0.5 flex gap-1 text-black items-center rounded-lg w-[300px] transition-all duration-300 focus-within:outline-1 focus-within:outline-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197M15.803 15.803A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                className="text-gray-600 focus:outline-none text-sm p-0.5 w-full"
                placeholder="Search ..."
              />
            </div>
          </div>
  )
}

export default SearchBox