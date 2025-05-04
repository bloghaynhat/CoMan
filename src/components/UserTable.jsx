import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserTable({ users }) {
  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2"> Tên người dùng </th>{" "}
            <th className="text-left p-2"> Email </th>{" "}
            <th className="text-center p-2"> Khóa học </th>{" "}
            <th className="text-center p-2"> Ngày tham gia </th>{" "}
            <th className="text-center p-2"> Trạng thái </th>{" "}
            <th className="text-center p-2"> Thao tác </th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32&text=${user.name.charAt(
                        0
                      )}`}
                      alt={user.name}
                    />{" "}
                    <AvatarFallback> {user.name.charAt(0)} </AvatarFallback>{" "}
                  </Avatar>{" "}
                  <span className="font-medium"> {user.name} </span>{" "}
                </div>{" "}
              </td>{" "}
              <td className="p-2"> {user.email} </td>{" "}
              <td className="text-center p-2"> {user.courses} </td>{" "}
              <td className="text-center p-2 text-sm text-muted-foreground">
                {" "}
                {user.joined}{" "}
              </td>{" "}
              <td className="text-center p-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status === "active" ? "Hoạt động" : "Không hoạt động"}{" "}
                </span>{" "}
              </td>{" "}
              <td className="text-center p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem> Chỉnh sửa </DropdownMenuItem>{" "}
                    <DropdownMenuItem> Xem chi tiết </DropdownMenuItem>{" "}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      {" "}
                      Xóa{" "}
                    </DropdownMenuItem>{" "}
                  </DropdownMenuContent>{" "}
                </DropdownMenu>{" "}
              </td>{" "}
            </tr>
          ))}{" "}
        </tbody>{" "}
      </table>{" "}
    </div>
  );
}
