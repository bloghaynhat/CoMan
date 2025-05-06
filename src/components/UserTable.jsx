import DataTable from "react-data-table-component";
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
import dayjs from "dayjs";
import { ChangeUserStatus } from "@/api/admin";

// Skeleton component
function SkeletonRow() {
  return (
    <div className="space-y-2 p-4">
      {[...Array(10)].map((_, idx) => (
        <div
          key={idx}
          className="h-6 bg-gray-200 animate-pulse rounded w-full"
        ></div>
      ))}
    </div>
  );
}

export default function UserTable({ users, setUsers, isLoadingUser }) {
  const handleToggleStatus = async (userId, currentStatus) => {
    const isSuccess = await ChangeUserStatus(userId, currentStatus);

    if (isSuccess) {
      // Cập nhật lại trạng thái của người dùng trong danh sách
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, is_active: !currentStatus } : user
      );
      // Cập nhật lại state users
      setUsers(updatedUsers);
    } else {
      alert("Không thể thay đổi trạng thái người dùng.");
    }
  };
  const columns = [
    {
      name: "Tên người dùng",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`/placeholder.svg?height=32&width=32&text=${row.last_name.charAt(
                0
              )}`}
              alt={`${row.first_name} ${row.last_name}`}
            />
            <AvatarFallback>{row.first_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">
            {row.first_name} {row.last_name}
          </span>
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Khóa học",
      selector: (row) => row.course_count,
      center: true,
      sortable: true,
    },
    {
      name: "Ngày tham gia",
      selector: (row) => row.date_joined,
      center: true,
      sortable: true,
      cell: (row) => (
        <span className="text-sm text-muted-foreground">
          {dayjs(row.date_joined).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      name: "Trạng thái",
      selector: (row) => row.is_active,
      center: true,
      sortable: true,
      cell: (row) => (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            row.is_active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.is_active ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
    {
      name: "Thao tác",
      center: true,
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => handleToggleStatus(row.id, row.is_active)}
            >
              Đổi trạng thái
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      pagination
      highlightOnHover
      responsive
      striped
      progressPending={isLoadingUser}
      progressComponent={<SkeletonRow />}
    />
  );
}
