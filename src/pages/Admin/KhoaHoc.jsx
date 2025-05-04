import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CourseTable from "@/components/CourseTable";

export default function KhoaHoc() {
  const courses = [
    {
      id: 1,
      title: "Lập trình React JS từ cơ bản đến nâng cao",
      students: 128,
      revenue: "12,800,000đ",
      status: "active",
      lastUpdated: "12/04/2023",
    },
    {
      id: 2,
      title: "Thiết kế UI/UX chuyên nghiệp",
      students: 85,
      revenue: "8,500,000đ",
      status: "active",
      lastUpdated: "05/04/2023",
    },
    {
      id: 3,
      title: "Lập trình di động với Flutter",
      students: 64,
      revenue: "6,400,000đ",
      status: "draft",
      lastUpdated: "28/03/2023",
    },
    {
      id: 4,
      title: "NodeJS và ExpressJS cho backend",
      students: 92,
      revenue: "9,200,000đ",
      status: "active",
      lastUpdated: "15/03/2023",
    },
    {
      id: 5,
      title: "Python cho Data Science",
      students: 76,
      revenue: "7,600,000đ",
      status: "active",
      lastUpdated: "02/03/2023",
    },
    {
      id: 6,
      title: "Lập trình game với Unity",
      students: 58,
      revenue: "5,800,000đ",
      status: "draft",
      lastUpdated: "20/02/2023",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý khóa học</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm khóa học mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tất cả khóa học</CardTitle>
          <CardDescription>Quản lý tất cả các khóa học của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <CourseTable courses={courses} />
        </CardContent>
      </Card>
    </div>
  );
}
