import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { UserContext } from "../context/UserContext";

function Header() {
  const { user, logoutUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Lộ trình", path: "/roadmaps" },
    { name: "Sự kiện", path: "/events" },
    { name: "Về chúng tôi", path: "/about" },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-[#00c9ff] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-2 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Coman
        </Link>

        {/* Thanh tìm kiếm (Desktop) */}
        <div className="hidden md:flex flex-1 mx-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-200" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học, sự kiện..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            />
          </div>
        </div>

        {/* Menu điều hướng và nút Đăng nhập/Đăng ký (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-white hover:text-indigo-200 transition-colors ${
                    isActive ? "font-bold text-indigo-100" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          {/* Nút Đăng nhập và Đăng ký */}
          {user ? (
            <div>
              <span className="text-red-400 font-semibold text-xl">
                Xin chào, {user.first_name} {user.last_name}
              </span>
              <button
                className="mx-4 px-4 py-2 text-white border border-white rounded-full hover:bg-indigo-700 hover:border-indigo-700 transition-colors"
                onClick={logoutUser}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-white border border-white rounded-full hover:bg-indigo-700 hover:border-indigo-700 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        {/* Icon tìm kiếm và Hamburger menu (Mobile) */}
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={() => setIsSearchOpen(true)}>
            <Search className="w-6 h-6 text-white" />
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm (Mobile) */}
      {isSearchOpen && (
        <div className="md:hidden bg-white px-4 py-2 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học, sự kiện..."
              className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 text-white shadow-md">
          <nav className="flex flex-col px-4 py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `py-2 hover:text-indigo-200 transition-colors ${
                    isActive ? "font-bold text-indigo-100" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            {/* Nút Đăng nhập và Đăng ký (Mobile) */}
            <Link
              to="/login"
              className="py-2 text-white hover:text-indigo-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="py-2 text-white hover:text-indigo-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Đăng ký
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
