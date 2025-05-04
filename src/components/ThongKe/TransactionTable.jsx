import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TransactionTable({ transactions }) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Giao dịch gần đây</CardTitle>
        <CardDescription>Danh sách các giao dịch mới nhất</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Người dùng</th>
                <th className="text-left p-2">Khóa học</th>
                <th className="text-center p-2">Số tiền</th>
                <th className="text-center p-2">Ngày</th>
                <th className="text-center p-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32&text=${transaction.user.charAt(
                            0
                          )}`}
                          alt={transaction.user}
                        />
                        <AvatarFallback>
                          {transaction.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{transaction.user}</span>
                    </div>
                  </td>
                  <td className="p-2">{transaction.course}</td>
                  <td className="text-center p-2 font-medium">
                    {transaction.amount}
                  </td>
                  <td className="text-center p-2 text-sm text-muted-foreground">
                    {transaction.date}
                  </td>
                  <td className="text-center p-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {transaction.status === "completed"
                        ? "Hoàn thành"
                        : "Đang xử lý"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Xem tất cả giao dịch
        </Button>
      </CardFooter>
    </Card>
  );
}
