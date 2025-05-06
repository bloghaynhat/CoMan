import { BookOpen, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

export default function CourseTable({ courses }) {
  const navigate = useNavigate();
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
          <div className="h-10 w-10 rounded bg-gradient-to-r from-indigo-500 to-[#00c9ff] flex items-center justify-center text-white">
            <BookOpen className="h-5 w-5" />
          </div>
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
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
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
