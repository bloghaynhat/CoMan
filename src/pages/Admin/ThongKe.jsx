import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MonthlyChart from "@/components/ThongKe/MonthlyChart";
import TransactionTable from "@/components/ThongKe/TransactionTable";
import { useEffect, useState } from "react";
import { fetchTransaction } from "@/api/admin";

export default function ThongKe() {
  // Thêm title cho trang
  useEffect(() => {
    document.title = "Thống kê";
    return () => {
      document.title = "Coman"; // Reset title khi unmount
    };
  }, []);
  const monthlyRevenue = [
    { month: "Tháng 1", revenue: 32500000 },
    { month: "Tháng 2", revenue: 36800000 },
    { month: "Tháng 3", revenue: 42500000 },
    { month: "Tháng 4", revenue: 38900000 },
    { month: "Tháng 5", revenue: 45200000 },
    { month: "Tháng 6", revenue: 52100000 },
  ];

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetchTransaction().then((data) => {
      setTransactions(data);
    });
  }, []);

  const recentTransactions = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      course: "Lập trình React JS từ cơ bản đến nâng cao",
      amount: "1,000,000đ",
      date: "12/04/2023",
      status: "completed",
    },
    {
      id: 2,
      user: "Trần Thị B",
      course: "Thiết kế UI/UX chuyên nghiệp",
      amount: "1,000,000đ",
      date: "11/04/2023",
      status: "completed",
    },
    {
      id: 3,
      user: "Lê Văn C",
      course: "NodeJS và ExpressJS cho backend",
      amount: "1,000,000đ",
      date: "10/04/2023",
      status: "completed",
    },
    {
      id: 4,
      user: "Phạm Thị D",
      course: "Python cho Data Science",
      amount: "1,000,000đ",
      date: "09/04/2023",
      status: "pending",
    },
    {
      id: 5,
      user: "Hoàng Văn E",
      course: "Lập trình React JS từ cơ bản đến nâng cao",
      amount: "1,000,000đ",
      date: "08/04/2023",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-6 w-10/12 m-auto my-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Báo cáo doanh thu</h2>
        <Button variant="outline">
          <BarChart3 className="mr-2 h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <MonthlyChart monthlyRevenue={monthlyRevenue} />
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
