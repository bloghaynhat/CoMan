import { Menu, Search, X } from "lucide-react";
import { NavigationMenu } from "./HeaderComponents/NavigationMenu";
import { SearchBar } from "./HeaderComponents/SearchBar";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";

function Header() {
  const { user, logoutUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const commonNavItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Lộ trình", path: "/roadmaps" },
    { name: "Sự kiện", path: "/events" },
    { name: "Về chúng tôi", path: "/about" },
  ];

  const adminNavItems = [
    { name: "Tổng quan", path: "/admin/dashboard" },
    { name: "Quản lý người dùng", path: "/admin/users" },
    { name: "Quản lý khóa học", path: "/admin/courses" },
    { name: "Thống kê", path: "/admin/stats" },
  ];

  const navItems = user?.role === "admin" ? adminNavItems : commonNavItems;

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-[#00c9ff] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight relative group shrink-0"
        >
          Coman
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-6 max-w-xl lg:max-w-xl xl:max-w-xl">
          <SearchBar className="w-full" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block shrink-0">
          <NavigationMenu
            navItems={navItems}
            user={user}
            logoutUser={logoutUser}
            isMobile={false}
          />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Tìm kiếm"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden bg-indigo-600 px-4 py-3 border-t border-indigo-400/30 animate-in slide-in-from-top duration-300">
          <SearchBar isMobile onClose={() => setIsSearchOpen(false)} />
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-600 text-white shadow-lg animate-in slide-in-from-top duration-300">
          <NavigationMenu
            navItems={navItems}
            user={user}
            logoutUser={logoutUser}
            isMobile={true}
            onItemClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
