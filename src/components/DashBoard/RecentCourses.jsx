import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";

export default function RecentCourses({ courses, isLoadingCourse }) {
  const navigate = useNavigate();
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Khóa học gần đây</CardTitle>
        <CardDescription>
          Danh sách các khóa học mới nhất của bạn
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {isLoadingCourse
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between animate-pulse"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-gray-200" />
                    <div className="space-y-2">
                      <div className="h-3 w-36 bg-gray-200 rounded" />
                      <div className="h-2 w-20 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
              ))
            : courses.map((course) => (
                <div
                  key={course.course_id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={course.image}
                      alt=""
                      className=" w-20 rounded flex items-center justify-center"
                    />

                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.student_count} học viên
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                      {dayjs(course.created_at).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          disabled={isLoadingCourse}
          onClick={() => navigate("/admin/courses")}
        >
          Xem tất cả khóa học
        </Button>
      </CardFooter>
    </Card>
  );
}
