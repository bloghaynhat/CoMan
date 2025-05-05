import { BookOpen, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

export default function CourseTable({ courses }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Tên khóa học</th>
            <th className="text-center p-2">Học viên</th>
            <th className="text-center p-2">Doanh thu</th>
            <th className="text-center p-2">Khởi tạo</th>
            <th className="text-center p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.course_id} className="border-b">
              <td className="p-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-gradient-to-r from-indigo-500 to-[#00c9ff] flex items-center justify-center text-white">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{course.title}</span>
                </div>
              </td>
              <td className="text-center p-2">{course.total_enrollments}</td>
              <td className="text-center p-2">{course.total_revenue}</td>
              <td className="text-center p-2 text-sm text-muted-foreground">
                {formatDate(course.created_at)}
              </td>
              <td className="text-center p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
