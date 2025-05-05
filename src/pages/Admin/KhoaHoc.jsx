import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { getRevenueCourses } from "../../api/admin";
import CourseTable from "@/components/CourseTable";
import AddCourseModal from "@/components/CreateCourse/Modals/AddCourseModal";


export default function KhoaHoc() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getRevenueCourses();
      if (data) {
        setCourses(data);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý khóa học</h2>
        <AddCourseModal
          onAdd={(newCourse) => {
            const formatted = {
              id: newCourse.id,
              title: newCourse.title,
              students: 0,
              revenue: newCourse.price + "đ",
              lastUpdated: new Date(newCourse.created_at).toLocaleDateString("vi-VN"),
            };
            setCourses((prev) => [formatted, ...prev]);
          }}
        >
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm khóa học mới
          </Button>
        </AddCourseModal>

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
