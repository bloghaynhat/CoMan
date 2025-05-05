import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function UserMenu({ user, logoutUser }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="hidden lg:block">
        <span className="text-white font-medium">
          {user.first_name} {user.last_name}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-white/10 transition-colors"
          >
            <Avatar className="h-9 w-9 ring-2 ring-white/30">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt={`${user.first_name} ${user.last_name}`}
              />
              <AvatarFallback className="bg-indigo-700 text-white">
                {user.first_name?.[0]}
                {user.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.role === "admin" ? "Quản trị viên" : "Học viên"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Cài đặt tài khoản</span>
          </DropdownMenuItem>
          {user.role === "admin" && (
            <DropdownMenuItem asChild>
              <Link to="/admin/dashboard">
                <span className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Bảng điều khiển
                </span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logoutUser}
            className="text-red-500 focus:text-red-500"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
