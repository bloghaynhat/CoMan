import { cn } from "@/lib/utils";
import { LogOut, Settings } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Kết hợp cả desktop và mobile navigation
export function NavigationMenu({
  navItems,
  user,
  logoutUser,
  isMobile,
  onItemClick,
}) {
  // Render menu phù hợp với desktop hoặc mobile
  if (isMobile) {
    return (
      <nav className="flex flex-col divide-y divide-indigo-500/20">
        {user && (
          <div className="flex items-center space-x-3 p-4 border-b border-indigo-500/30">
            <Avatar className="h-10 w-10 ring-2 ring-white/20">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt={`${user.first_name} ${user.last_name}`}
              />
              <AvatarFallback className="bg-indigo-700 text-white">
                {user.first_name?.[0]}
                {user.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-indigo-200">
                {user.role === "admin" ? "Quản trị viên" : "Học viên"}
              </p>
            </div>
          </div>
        )}

        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "px-4 py-3 hover:bg-indigo-700/50 transition-colors flex items-center justify-between",
                isActive ? "font-medium bg-indigo-700/30" : ""
              )
            }
            onClick={onItemClick}
          >
            {({ isActive }) => (
              <>
                <span>{item.name}</span>
                {isActive && (
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Auth buttons or user actions */}
        {!user ? (
          <div className="px-4 py-3 flex flex-col space-y-2">
            <Link
              to="/login"
              className="w-full py-2 text-center border border-indigo-400 rounded-md hover:bg-indigo-700/50 transition-colors"
              onClick={onItemClick}
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="w-full py-2 text-center bg-white text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors font-medium"
              onClick={onItemClick}
            >
              Đăng ký
            </Link>
          </div>
        ) : (
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/settings"
              className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-indigo-700/50 transition-colors w-full"
              onClick={onItemClick}
            >
              <Settings className="h-4 w-4" />
              <span>Cài đặt tài khoản</span>
            </Link>
            <button
              onClick={() => {
                logoutUser();
                onItemClick();
              }}
              className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-indigo-700/50 transition-colors text-red-300 w-full"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        )}
      </nav>
    );
  }

  // Desktop navigation
  return (
    <div className="flex items-center">
      {/* Navigation links */}
      <nav className="flex space-x-8 mr-12">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "text-white hover:text-white/90 transition-all duration-200 relative py-1 group",
                isActive ? "font-semibold" : "font-medium"
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User menu or auth buttons */}
      <div className="ml-4">
        {user ? (
          <UserMenu user={user} logoutUser={logoutUser} />
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 text-white border-2 border-white/80 rounded-full hover:bg-white/10 transition-all duration-200 font-medium"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-50 transition-all duration-200 font-medium shadow-md"
            >
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
