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
import { useEffect, useState } from "react";
import { fetchAllUser } from "@/api/admin";

export default function NguoiDung() {
  const [users, setUsers] = useState([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    fetchAllUser()
      .then((data) => {
        setUsers(data);
        setIsLoadingUser(false);
      })
      .finally(() => setIsLoadingUser(false));
  }, []);

  return (
    <div className="space-y-6 w-10/12 m-auto my-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tất cả người dùng</CardTitle>
          <CardDescription>
            Quản lý tất cả người dùng trên hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable users={users} isLoadingUser={isLoadingUser} />
        </CardContent>
      </Card>
    </div>
  );
}
