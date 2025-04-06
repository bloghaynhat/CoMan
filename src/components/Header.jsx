import React from 'react'
import SearchBox from './SearchBox'

const Header = () => {
  return (
    <div className="sticky top-0 w-full z-50 bg-white shadow-sm flex justify-between items-center border-b pb-2 px-4 h-16">

      {/* Logo */}
        <div>
          <h1>Coman</h1>
        </div>
        {/* Ô tìm kiếm */}
        <SearchBox/>
        {/* Thông tin cá nhân */}
        <div>
          <button>Đăng kí</button>
          <button>Đăng nhập</button>
        </div>
    </div>
  )
}

export default Header