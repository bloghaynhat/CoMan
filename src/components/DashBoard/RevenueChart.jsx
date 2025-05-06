import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function RevenueChart({ courses, isLoadingRevenue }) {
  const navigate = useNavigate();

  // Sắp xếp theo total_revenue (giảm dần)
  const sortedCourses = courses.sort(
    (a, b) => b.total_revenue - a.total_revenue
  );

  // Hàm format doanh thu
  const formatRevenue = (revenue) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(revenue || 0);
  };

  return (
    <Card className="col-span-1 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Doanh thu theo khóa học</CardTitle>
        <CardDescription>
          Thống kê doanh thu 5 khóa học hàng đầu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoadingRevenue
            ? // Skeleton loader for courses
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="space-y-4 animate-pulse">
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-1/3 bg-gray-200 rounded" />
                    <div className="h-4 w-1/4 bg-gray-200 rounded" />
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full bg-gray-200 rounded-full" />
                  </div>
                </div>
              ))
            : // Show course details after loading
              sortedCourses.slice(0, 5).map((course) => (
                <div key={course.course_id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{course.title}</p>
                    <p className="text-sm font-bold">
                      {formatRevenue(course.total_revenue)}
                    </p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-[#00c9ff]"
                      style={{
                        width: `${
                          course.total_revenue
                            ? (course.total_revenue / 10000000) * 100 // Tính tỷ lệ phần trăm doanh thu
                            : 0
                        }%`, // Nếu không có doanh thu, chiều rộng mặc định là 0%
                      }}
                    />
                  </div>
                </div>
              ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/admin/stats")}
        >
          Xem thống kê
        </Button>
      </CardFooter>
    </Card>
  );
}
