import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserTable from "@/components/UserTable";

export default function NguoiDung() {
  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      courses: 3,
      joined: "15/01/2023",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      courses: 2,
      joined: "22/02/2023",
      status: "active",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@example.com",
      courses: 1,
      joined: "10/03/2023",
      status: "inactive",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      courses: 4,
      joined: "05/01/2023",
      status: "active",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      courses: 2,
      joined: "18/02/2023",
      status: "active",
    },
    {
      id: 6,
      name: "Ngô Thị F",
      email: "ngothif@example.com",
      courses: 0,
      joined: "30/03/2023",
      status: "inactive",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tất cả người dùng</CardTitle>
          <CardDescription>
            Quản lý tất cả người dùng trên hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
