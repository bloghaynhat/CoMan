import { BookOpen, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { deleteCourse } from '@/api/admin';

export default function CourseTable({ courses }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const customStyles = {
    rows: {
      style: {
        minHeight: '60px',
        fontSize: '16px',
      },
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '12px 16px',
      },
    },
    cells: {
      style: {
        fontSize: '15px',
        padding: '12px 16px',
      },
    },
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    return date.toLocaleDateString();
  };

  const columns = [
    {
      name: 'Tên khóa học',
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img className='h-15 w-25 rounded' src={row.image} alt="" srcset="" />
          <span className="font-medium">{row.title}</span>
        </div>
      ),
    },
    {
      name: 'Học viên',
      selector: (row) => row.total_enrollments,
      sortable: true,
      right: true,
    },
    {
      name: 'Doanh thu',
      selector: (row) => row.total_revenue,
      sortable: true,
      right: true,
    },
    {
      name: 'Khởi tạo',
      selector: (row) => formatDate(row.created_at),
      sortable: true,
      right: true,
    },
    {
      name: 'Thao tác',
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/admin/courses/${row.course_id}/edit`)}>
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/admin/courses/${row.course_id}/view`)}>
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={async () => {
                if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
                  try {
                    await deleteCourse(row.course_id, user.access_token);
                    alert("Xóa thành công!");
                    window.location.reload();
                  } catch (err) {
                    console.error("Lỗi xóa khóa học:", err);
                    alert("Xóa khóa học thất bại.");
                  }
                }
              }}
            >
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      right: true,
    },
  ];

  return (
    <div className="overflow-auto">
      <DataTable
        title="Danh sách khóa học"
        columns={columns}
        data={courses}
        pagination
        customStyles={customStyles}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 8, 10]}
        highlightOnHover
        striped
      />
    </div>
  );
}
